#!/usr/bin/env python3
"""Generate neural TTS mp3s with edge-tts + 400ms ffmpeg gaps.

中文：zh-CN-XiaoxiaoNeural（女声讲解）
英文：en-US-JennyNeural
语速：-5%
输出：public/audio/{slug}.{zh,en}.mp3 与 {slug}.how.{zh,en}.mp3
"""
from __future__ import annotations

import asyncio
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENRICH = ROOT / "src/data/enrich.json"
SCRIPTS = ROOT / "public/audio/scripts"
OUT = ROOT / "public/audio"
TMP = Path("/tmp/tuzhi-tts")

SLUGS = [
    "suan-hua",
    "yan-jian",
    "ban-jie",
    "you-ji-zhi",
    "que-dan",
    "que-jia",
    "que-tie",
    "lao-hai",
    "shao-gen",
    "ce-tu-bao-gao",
]

VOICE = {"zh": "zh-CN-XiaoxiaoNeural", "en": "en-US-JennyNeural"}
RATE = "-5%"
SKIP = re.compile(r"translation pending|^土知$|^Tuzhi$|^李泽宇$|^Li Zeyu$|^Sources$|^依据$", re.I)
STEP_NO = re.compile(r"^\s*\d+\s*[）).、]")
HAN = re.compile(r"[\u4e00-\u9fff]")
SEM = asyncio.Semaphore(5)

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts missing. pip install edge-tts")


ZH_DIGITS = "零一二三四五六七八九"


def zh_int(n: int) -> str:
    if n < 0:
        return "负" + zh_int(-n)
    if n < 10:
        return ZH_DIGITS[n]
    if n < 20:
        return "十" if n == 10 else "十" + ZH_DIGITS[n % 10]
    if n < 100:
        tens, ones = divmod(n, 10)
        return ZH_DIGITS[tens] + "十" + (ZH_DIGITS[ones] if ones else "")
    if n < 1000:
        hun, rest = divmod(n, 100)
        return ZH_DIGITS[hun] + "百" + (("零" if rest < 10 else "") + zh_int(rest) if rest else "")
    return str(n)


def spoken_num(raw: str) -> str:
    try:
        n = float(raw)
    except ValueError:
        return raw
    if n.is_integer() and "." not in raw:
        return zh_int(int(n))
    a, _, b = raw.partition(".")
    return zh_int(int(a or "0")) + "点" + "".join(ZH_DIGITS[int(d)] if d.isdigit() else d for d in b)


def speak_prepare_zh(s: str) -> str:
    s = re.sub(
        r"(\d+(?:\.\d+)?)\s*[～~\-—至到]\s*(\d+(?:\.\d+)?)",
        lambda m: f"{spoken_num(m.group(1))}到{spoken_num(m.group(2))}",
        s,
    )
    s = re.sub(r"(\d+(?:\.\d+)?)\s*公斤", lambda m: f"{spoken_num(m.group(1))}公斤", s)
    s = re.sub(r"(\d+(?:\.\d+)?)\s*厘米", lambda m: f"{spoken_num(m.group(1))}厘米", s)
    s = re.sub(r"\bpH\s*([<>＜＞]?\s*\d+(?:\.\d+)?)", lambda m: "pH " + spoken_num(re.sub(r"[<>＜＞]", "", m.group(1)).strip()), s, flags=re.I)
    return s


def clean(lines: list[str] | None, lang: str, howto: bool) -> list[str]:
    out: list[str] = []
    for raw in lines or []:
        s = (raw or "").strip()
        if not s or SKIP.search(s):
            continue
        if not howto and STEP_NO.match(s):
            continue
        if lang == "en" and HAN.search(s):
            continue
        if lang == "zh":
            s = speak_prepare_zh(s)
        if not s.endswith(("。", ".", "!", "?", "！", "？")):
            s = s + ("." if lang == "en" else "。")
        out.append(s)
    return out


def from_txt(slug: str, lang: str) -> list[str]:
    p = SCRIPTS / f"{slug}.{lang}.txt"
    if not p.exists():
        return []
    return [ln.strip() for ln in p.read_text(encoding="utf-8").splitlines() if ln.strip()]


def lines_for(extra: dict, slug: str, lang: str, howto: bool) -> list[str]:
    e = extra.get(slug) or {}
    if howto:
        key = "howtoSpeakZh" if lang == "zh" else "howtoSpeakEn"
        alt = "spokenHow" if lang == "zh" else "spokenHowEn"
        got = e.get(key) or e.get(alt)
    else:
        key = "speakZh" if lang == "zh" else "speakEn"
        alt = "spoken" if lang == "zh" else "spokenEn"
        got = e.get(key) or e.get(alt)
    if not got:
        got = from_txt(slug, lang)
    return clean(got, lang, howto)


def silence_mp3(path: Path) -> None:
    if path.exists() and path.stat().st_size > 200:
        return
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "anullsrc=r=24000:cl=mono",
            "-t",
            "0.4",
            "-q:a",
            "9",
            str(path),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


async def synth(text: str, voice: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    last = None
    for attempt in range(3):
        async with SEM:
            try:
                comm = edge_tts.Communicate(text, voice, rate=RATE)
                await comm.save(str(dest))
                if dest.exists() and dest.stat().st_size > 400:
                    return
            except Exception as exc:  # noqa: BLE001
                last = exc
                await asyncio.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"tts failed {dest.name}: {last}")


def concat(parts: list[Path], dest: Path) -> None:
    tmp = Path(tempfile.mkdtemp(prefix="tts-concat-"))
    lst = tmp / "list.txt"
    lst.write_text("".join(f"file '{p}'\n" for p in parts), encoding="utf-8")
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(lst),
            "-ar",
            "24000",
            "-ac",
            "1",
            "-b:a",
            "48k",
            str(dest),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    shutil.rmtree(tmp, ignore_errors=True)


async def build_one(slug: str, lang: str, howto: bool, sentences: list[str], gap: Path) -> Path | None:
    if not sentences:
        print(f"skip empty {slug} {lang} howto={howto}")
        return None
    name = f"{slug}.how.{lang}.mp3" if howto else f"{slug}.{lang}.mp3"
    dest = OUT / name
    work = TMP / f"{slug}{'.how' if howto else ''}.{lang}"
    if work.exists():
        shutil.rmtree(work)
    work.mkdir(parents=True)
    voice = VOICE[lang]
    files: list[Path] = []
    for i, sentence in enumerate(sentences):
        piece = work / f"{i:02d}.mp3"
        await synth(sentence, voice, piece)
        files.append(piece)
        if i < len(sentences) - 1:
            files.append(gap)
    concat(files, dest)
    print(f"ok {dest.name} ({len(sentences)} lines, {dest.stat().st_size} bytes)")
    return dest


async def main() -> int:
    extra = json.loads(ENRICH.read_text(encoding="utf-8"))
    wiki = json.loads((ROOT / "src/data/wiki.json").read_text(encoding="utf-8"))
    slugs = list(extra.keys()) if "--all" in sys.argv else SLUGS
    skip = "--force" not in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    gap = TMP / "silence.mp3"
    silence_mp3(gap)

    def exists(name: str) -> bool:
        p = OUT / name
        return skip and p.exists() and p.stat().st_size > 8000

    jobs = []
    for slug in slugs:
        for lang in ("zh", "en"):
            if not exists(f"{slug}.{lang}.mp3"):
                jobs.append(build_one(slug, lang, False, lines_for(extra, slug, lang, False), gap))
            if not exists(f"{slug}.how.{lang}.mp3"):
                jobs.append(build_one(slug, lang, True, lines_for(extra, slug, lang, True), gap))
    for tid, pack in wiki.items():
        for lang in ("zh", "en"):
            name = f"{tid}.{lang}.mp3"
            if exists(name):
                continue
            copy = pack.get(lang) or {}
            raw = copy.get("spoken") or [copy.get("subtitle") or "", copy.get("appearance") or "", copy.get("fieldCheck") or ""]
            jobs.append(build_one(tid, lang, False, clean(raw, lang, False), gap))
    print(f"jobs {len(jobs)} slugs {len(slugs)} wiki {len(wiki)}")
    results = await asyncio.gather(*jobs, return_exceptions=True)
    failed = [r for r in results if isinstance(r, Exception)]
    for err in failed:
        print("ERR", err, file=sys.stderr)
    ok = [r for r in results if isinstance(r, Path)]
    print(f"wrote {len(ok)} files, {len(failed)} failed")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
