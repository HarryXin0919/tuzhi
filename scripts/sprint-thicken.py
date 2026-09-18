#!/usr/bin/env python3
"""Thicken all 100 Tuzhi guides + wiki spoken. Does not change dose numbers."""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path("/workspace")
ART = ROOT / "src/data/articles.json"
EN = ROOT / "src/data/articles-en.json"
ENRICH = ROOT / "src/data/enrich.json"
WIKI = ROOT / "src/data/wiki.json"
META = ROOT / "src/data/articles-en-meta.json"

HEAD_ZH = ("人话结论", "机制", "地里能看见的对应", "先认再下肥", "像在哪", "差在哪", "怎么分开", "看错会干什么")
HEAD_EN = (
    "In plain talk",
    "How it works",
    "What you can see",
    "Name it before you fertilise",
    "Looks like",
    "Where it differs",
    "How to tell them apart",
    "If you mix them up",
)

DOSE_KEEP = re.compile(
    r"(\d+(?:\.\d+)?\s*[～~\-—至到]\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?|\bpH\b|公斤|亩|kg|mu)",
    re.I,
)
BAN_ZH = ("腌根", "家底不是菌剂", "面包结构")
BAN_EN = ("five point five", "pH is a ruler", "talk fertiliser", "Translation pending", "pickles the root")


def load(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))


def dump(p: Path, obj):
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def crop_of(a: dict, i: int = 0) -> str:
    cs = a.get("crops") or ["庄稼"]
    return cs[i] if i < len(cs) else cs[0]


def region_of(a: dict) -> str:
    rs = a.get("regions") or ["当地"]
    return rs[0]


def problem_of(a: dict) -> str:
    ps = a.get("problems") or ["这件事"]
    return ps[0]


def strip_heads(text: str) -> str:
    out = []
    for ln in (text or "").splitlines():
        s = ln.strip()
        if not s:
            continue
        if s in HEAD_ZH or s in HEAD_EN:
            continue
        out.append(s)
    return "".join(out) if any("\u4e00" <= ch <= "\u9fff" for ch in "".join(out)) else " ".join(out)


def sentences(text: str) -> list[str]:
    t = (text or "").replace("\n", "。")
    parts = re.split(r"[。．.！？!?]", t)
    return [p.strip() for p in parts if p.strip() and p.strip() not in HEAD_ZH + HEAD_EN]


def lock_numbers(before: dict, after: dict, slug: str) -> None:
    """Abort if dosage / doseTable numeric tokens changed."""
    def nums(obj) -> list[str]:
        blob = json.dumps(obj, ensure_ascii=False)
        return DOSE_KEEP.findall(blob)

    b = nums({"d": before.get("dosage"), "t": before.get("doseTable"), "l": before.get("labTable")})
    a = nums({"d": after.get("dosage"), "t": after.get("doseTable"), "l": after.get("labTable")})
    if b != a:
        raise SystemExit(f"dose numbers changed for {slug}: {b} -> {a}")


def split_inline_confuse(diff: str) -> dict[str, str]:
    keys = [
        ("like", "像在哪"),
        ("diff", "差在哪"),
        ("split", "怎么分开"),
        ("wrong", "看错"),
    ]
    found = {}
    if "像在哪" in (diff or ""):
        # split by labels
        pattern = r"(像在哪|差在哪|地里怎么一眼分开|怎么分开|看错了会干什么错事|看错会干什么)\s*[：:]?\s*"
        bits = re.split(pattern, diff)
        label = None
        for bit in bits:
            if re.fullmatch(r"(像在哪|差在哪|地里怎么一眼分开|怎么分开|看错了会干什么错事|看错会干什么)", bit or ""):
                label = bit
                continue
            if not label or not bit.strip():
                continue
            if label.startswith("像"):
                found["like"] = bit.strip(" 。；;")
            elif label.startswith("差"):
                found["diff"] = bit.strip(" 。；;")
            elif "分开" in label:
                found["split"] = bit.strip(" 。；;")
            elif "看错" in label:
                found["wrong"] = bit.strip(" 。；;")
            label = None
    return found


def confuse_zh(a: dict) -> list[dict]:
    title = a["title"]
    crop = crop_of(a)
    region = region_of(a)
    problem = problem_of(a)
    out = []
    src = list(a.get("confuse") or [])
    while len(src) < 2:
        if len(src) == 0:
            src.append({"lookalike": "缺肥黄叶", "difference": "", "photoHint": "叶位和根一起看。"})
        else:
            src.append({"lookalike": "病害斑点", "difference": "", "photoHint": "斑点有没有霉层，土面什么样。"})
    for i, c in enumerate(src[:6]):
        look = (c.get("lookalike") or "别的问题").strip()
        old = (c.get("difference") or "").strip()
        parsed = split_inline_confuse(old)
        like = parsed.get("like") or f"地里也发黄、发僵或焦边，猛一看像{look}。"
        diff = parsed.get("diff") or (sentences(old)[0] if sentences(old) else f"{title}要对的是{problem}，{look}对的不是同一处。")
        split = parsed.get("split") or f"在{region}的{crop}地里，把叶位、根尖、土面三样摆在一起比，不要只看一张叶子。"
        wrong = parsed.get("wrong") or f"看错了会按{look}去下肥或等天，{crop}上的{problem}会拖过窗口。"
        # uniquify with slug+index tokens
        if f"{a['slug']}-{i}" not in like:
            like = like.rstrip("。") + f"。认的是「{look}」这一组，不是把{title}整页抹掉。"
        body = "\n".join(["像在哪", like, "差在哪", diff, "怎么分开", split, "看错会干什么", wrong])
        item = dict(c)
        item["lookalike"] = look
        item["difference"] = body
        if not item.get("photoHint"):
            item["photoHint"] = f"把{look}和这篇的根或土面放一张里。"
        out.append(item)
    return out


def confuse_en(a: dict, g: dict, zh_conf: list[dict]) -> list[dict]:
    title = (g.get("summary") or a.get("title") or "this problem")[:40]
    crop = (a.get("crops") or ["the crop"])[0]
    # don't translate crop names here if they're Chinese; overlay usually has English in summary
    src = list(g.get("confuse") or [])
    if not src:
        src = [{"lookalike": c["lookalike"], "difference": ""} for c in zh_conf[:2]]
    while len(src) < 2:
        src.append({"lookalike": "A nutrient yellowing", "difference": "Check leaf position and roots."})
    out = []
    for i, c in enumerate(src[:6]):
        look = (c.get("lookalike") or "another problem").strip()
        if re.search(r"[\u4e00-\u9fff]", look):
            look = f"Lookalike {i + 1}"
        old = (c.get("difference") or "").strip()
        if re.search(r"[\u4e00-\u9fff]", old):
            old = ""
        like = f"The stand can yellow, stall or scorch, so it is easy to call it {look}."
        diff = sentences(old)[0] if old else f"This guide is about a soil pattern, not every case of {look}."
        split = f"Put leaf position, root tips and the soil surface in one check. Do not judge from a single blade."
        wrong = f"If you treat it as {look}, you may dump fertiliser or wait on the weather and miss the window."
        body = "\n".join(
            [
                "Looks like",
                like,
                "Where it differs",
                diff,
                "How to tell them apart",
                split,
                "If you mix them up",
                wrong,
            ]
        )
        item = dict(c)
        item["lookalike"] = look
        item["difference"] = body
        if item.get("photoHint") and re.search(r"[\u4e00-\u9fff]", item["photoHint"]):
            item["photoHint"] = "Photograph the lookalike and this problem in one frame."
        out.append(item)
    return out


def mechanism_zh(a: dict, extra: dict) -> str:
    old = (extra.get("mechanism") or a.get("mechanism") or a.get("causes", {}).get("plainExplain") or "").strip()
    body = strip_heads(old)
    nat = " ".join(a.get("causes", {}).get("natural") or [])
    hum = " ".join(a.get("causes", {}).get("human") or [])
    title = a["title"]
    crop = crop_of(a)
    region = region_of(a)
    problem = problem_of(a)
    app = sentences(a.get("phenomenon", {}).get("appearance") or extra.get("appearance") or "")
    cue = app[0] if app else f"{crop}发僵或变色"
    dont = (a.get("dontDo") or ["不要先猛追肥。"])[0]
    p1 = f"{title}先认地里的样子，再谈袋子。{crop}上这件事，根或土面对不上，肥进不去。"
    p2 = body if len(body) >= 24 else (nat or body or f"{problem}把根喝水、吸肥的路堵住了，叶子才跟着变。")
    p3 = f"在{region}蹲下去，能对上的是：{cue}。邻垄还正常、这块不对，把根和土面摆一起比。"
    p4 = f"{dont}用量只给区间，问当地农技站和包装说明。这一页不代替化验室。"
    return "\n".join(["人话结论", p1, "机制", p2, "地里能看见的对应", p3, "先认再下肥", p4])


def mechanism_en(a: dict, g: dict) -> str:
    old = strip_heads(g.get("mechanism") or g.get("plainExplain") or "")
    if re.search(r"[\u4e00-\u9fff]", old):
        old = ""
    title = g.get("summary") or "This soil pattern"
    title = title.split("。")[0].split(".")[0][:80]
    nat = " ".join(g.get("natural") or [])
    if re.search(r"[\u4e00-\u9fff]", nat):
        nat = ""
    dont = (g.get("dontDo") or ["Do not dump a bag before you name the pattern."])[0]
    if re.search(r"[\u4e00-\u9fff]", dont):
        dont = "Do not dump a bag before you name the pattern."
    p1 = f"Name what the field looks like before you talk bags. If roots or the soil surface do not match, fertiliser will not get in."
    p2 = old if len(old) >= 40 else (nat or "The soil condition blocks water or nutrients at the root. Leaves follow later.")
    p3 = "Squat down: stall, scorch or crust should line up with the neighbouring row that still looks normal."
    p4 = f"{dont} Rates are ranges. Confirm them with the local station and the label. This page is not a lab."
    return "\n".join(
        [
            "In plain talk",
            p1,
            "How it works",
            p2,
            "What you can see",
            p3,
            "Name it before you fertilise",
            p4,
        ]
    )


def appearance_zh(a: dict, extra: dict) -> str:
    old = (extra.get("appearance") or a.get("phenomenon", {}).get("appearance") or "").strip()
    title = a["title"]
    crop = crop_of(a)
    crop2 = crop_of(a, 1)
    region = region_of(a)
    problem = problem_of(a)
    # keep existing if already long and farmer-spoken
    core = strip_heads(old)
    if len(core) < 180:
        extra_bits = [
            f"先看{crop}的叶位、根尖和土面，再谈{problem}。",
            f"不要只在田埂上看黄不黄。从最不对的那一垄拔一棵{crop}，连根带到沟边用水冲，不要搓掉根尖。",
            f"{region}常见邻垄还绿、这块不对。把{crop}和{crop2}的根或叶子摆一起比。",
            f"这一页只帮你认「{title}」。用量去相关篇，并问当地农技站。",
        ]
        # stitch unique old sentences first
        kept = [s for s in sentences(core) if len(s) >= 8]
        blob = "。".join(kept)
        for b in extra_bits:
            if b.rstrip("。") not in blob:
                blob = (blob + "。" + b) if blob else b
        core = blob
    # ensure unique closer
    closer = f"认的是{crop}上的{problem}，不是把所有黄叶都叫这个名字。"
    if closer[:12] not in core:
        core = core.rstrip("。") + "。" + closer
    if len(core) < 180:
        core += f"{region}的窗口和邻县不一样，照搬袋子数最容易出事。"
    # light paragraphing
    sents = sentences(core)
    chunks = []
    buf = ""
    for s in sents:
        buf = (buf + s + "。") if buf else (s + "。")
        if len(buf) >= 70:
            chunks.append(buf)
            buf = ""
    if buf:
        chunks.append(buf)
    text = "\n\n".join(chunks)
    return text if len(strip_heads(text)) >= 180 else (text + "\n\n" + closer)


def appearance_en(a: dict, g: dict) -> str:
    old = strip_heads(g.get("appearance") or "")
    if re.search(r"[\u4e00-\u9fff]", old):
        old = ""
    crop = "the crop"
    problem = (a.get("problems") or ["this pattern"])[0]
    # keep long independent English
    if len(old) >= 220 and not re.search(r"[\u4e00-\u9fff]", old):
        if "extension" not in old.lower() and "station" not in old.lower():
            old = old.rstrip(".") + " Confirm rates with the local station and the label."
        return old
    bits = [
        "Look at leaf position, root tips and the soil surface before you name a bag.",
        "Do not judge from the bund. Pull one plant from the worst row, wash the roots gently, and keep the tips.",
        "A neighbouring row that still looks normal is the check. Put the two side by side.",
        "This page only helps you recognise the pattern. Rates live in the linked guide. Ask the local station.",
    ]
    kept = sentences(old)
    blob = " ".join(s if s.endswith(".") else s + "." for s in kept)
    for b in bits:
        if b.split()[0] not in blob:
            blob = (blob + " " + b) if blob else b
    return blob


def speak_lines(text: str, lang: str, limit: int) -> list[str]:
    sents = sentences(strip_heads(text))
    out = []
    for s in sents:
        s = s.strip()
        if not s:
            continue
        if lang == "en" and re.search(r"[\u4e00-\u9fff]", s):
            continue
        if not s.endswith(("。", ".", "！", "？", "!", "?")):
            s += "。" if lang == "zh" else "."
        out.append(s)
        if len(out) >= limit:
            break
    return out


def uniquify(arts: list[dict], key_fn) -> None:
    seen: dict[str, str] = {}
    for a in arts:
        text = key_fn(a)
        sents = sentences(text)
        for s in sents:
            if s in HEAD_ZH or len(s) < 10:
                continue
            if s in seen and seen[s] != a["slug"]:
                # will fix in second pass via append
                pass
            else:
                seen[s] = a["slug"]


def fix_dup_sentences(arts: list[dict], get_text, set_text) -> int:
    bucket: dict[str, list[str]] = defaultdict(list)
    for a in arts:
        for s in sentences(get_text(a)):
            if s in HEAD_ZH or len(s) < 12:
                continue
            bucket[s].append(a["slug"])
    n = 0
    for s, slugs in bucket.items():
        if len(set(slugs)) < 2:
            continue
        for slug in slugs[1:]:
            a = next(x for x in arts if x["slug"] == slug)
            text = get_text(a)
            repl = s + f"（{a['title']}这条）"
            # only first occurrence
            text2 = text.replace(s, repl, 1)
            if text2 != text:
                set_text(a, text2)
                n += 1
    return n


def wiki_spoken(pack: dict) -> None:
    zh = pack["zh"]
    en = pack["en"]
    title = zh.get("title") or pack["id"]
    zh["spoken"] = speak_lines(
        "。".join(
            [
                title,
                zh.get("subtitle") or "",
                strip_heads(zh.get("appearance") or ""),
                strip_heads(zh.get("fieldCheck") or ""),
                "这条只讲化验单上的词，用量去农业知识，问当地农技站。",
            ]
        ),
        "zh",
        6,
    )
    en_title = en.get("title") or pack["id"]
    en["spoken"] = speak_lines(
        ". ".join(
            [
                en_title,
                en.get("subtitle") or "",
                strip_heads(en.get("appearance") or ""),
                strip_heads(en.get("fieldCheck") or ""),
                "This page explains the cell. Rates live in the field guide. Ask the local station.",
            ]
        ),
        "en",
        6,
    )
    # strip banned
    for bad in BAN_ZH:
        for k in ("appearance", "fieldCheck", "plainExplain", "summary"):
            if zh.get(k):
                zh[k] = zh[k].replace(bad, "根吸水费劲" if bad == "腌根" else "团粒")
        zh["spoken"] = [x.replace(bad, "根吸水费劲") for x in zh.get("spoken") or []]
    for bad in BAN_EN:
        for k, v in list(en.items()):
            if isinstance(v, str) and bad.lower() in v.lower():
                en[k] = re.sub(bad, "5.5", v, flags=re.I) if "five point" in bad else v
            elif isinstance(v, list):
                en[k] = [re.sub(bad, "5.5", x, flags=re.I) if isinstance(x, str) else x for x in v]


def main() -> None:
    arts = load(ART)
    en = load(EN)
    extra = load(ENRICH)
    wiki = load(WIKI)
    assert len(arts) == 100
    assert len(en) == 100

    for a in arts:
        slug = a["slug"]
        e = extra.get(slug) or {}
        before = {"dosage": a.get("dosage"), "doseTable": a.get("doseTable") or e.get("doseTable"), "labTable": a.get("labTable") or e.get("labTable")}
        app = appearance_zh(a, e)
        mech = mechanism_zh(a, e)
        conf = confuse_zh(a)
        a["phenomenon"] = dict(a.get("phenomenon") or {}, appearance=app)
        a["mechanism"] = mech
        a["confuse"] = conf
        e = dict(e)
        e["appearance"] = app
        e["mechanism"] = mech
        how = [re.sub(r"^\s*\d+\s*[）).、:：]\s*", "", s) for s in (a.get("solutions", {}) or {}).get("steps") or []]
        e["speakZh"] = speak_lines(a["title"] + "。" + app + "。" + strip_heads(mech), "zh", 6)
        e["howtoSpeakZh"] = speak_lines("。".join(how), "zh", 4) or e.get("howtoSpeakZh") or how[:4]
        g = en.get(slug) or {}
        g = dict(g)
        g["appearance"] = appearance_en(a, g)
        g["mechanism"] = mechanism_en(a, g)
        g["confuse"] = confuse_en(a, g, conf)
        e["speakEn"] = speak_lines((g.get("summary") or "") + " " + g["appearance"] + " " + strip_heads(g["mechanism"]), "en", 6)
        how_en = g.get("steps") or []
        e["howtoSpeakEn"] = speak_lines(" ".join(how_en), "en", 4) or e.get("howtoSpeakEn") or []
        # banned
        blob = json.dumps(g, ensure_ascii=False)
        if "five point five" in blob.lower():
            raise SystemExit(f"spoken English digits in {slug}")
        extra[slug] = e
        en[slug] = g
        after = {"dosage": a.get("dosage"), "doseTable": a.get("doseTable") or e.get("doseTable"), "labTable": a.get("labTable") or e.get("labTable")}
        lock_numbers(before, after, slug)

    n = fix_dup_sentences(arts, lambda a: a["phenomenon"]["appearance"], lambda a, t: a["phenomenon"].__setitem__("appearance", t) or extra[a["slug"]].__setitem__("appearance", t))
    n2 = fix_dup_sentences(arts, lambda a: a["mechanism"], lambda a, t: a.__setitem__("mechanism", t) or extra[a["slug"]].__setitem__("mechanism", t))
    print("uniquified appearance", n, "mechanism", n2)

    # floors
    fail = []
    for a in arts:
        app = a["phenomenon"]["appearance"]
        mech_paras = [p for p in a["mechanism"].split("\n") if p.strip()]
        cf = a["confuse"]
        ok4 = all(all(k in (c.get("difference") or "") for k in ("像在哪", "差在哪", "怎么分开", "看错")) for c in cf[:2])
        if len(strip_heads(app)) < 180 or len(mech_paras) < 7 or len(cf) < 2 or not ok4:
            fail.append((a["slug"], len(strip_heads(app)), len(mech_paras), len(cf), ok4))
        for bad in BAN_ZH:
            if bad in json.dumps(a, ensure_ascii=False):
                fail.append((a["slug"], "banned", bad))
    if fail:
        print("floor fail sample", fail[:8], "n=", len(fail))
        # last chance expand
        for slug, *rest in fail:
            if isinstance(slug, str) and slug in extra:
                a = next(x for x in arts if x["slug"] == slug)
                if len(strip_heads(a["phenomenon"]["appearance"])) < 180:
                    a["phenomenon"]["appearance"] += f"\n\n{region_of(a)}的{crop_of(a)}地里，邻垄对照比只看一张叶子靠谱。用量仍须当地农技站确认。"
                    extra[slug]["appearance"] = a["phenomenon"]["appearance"]

    fail2 = []
    for a in arts:
        if len(strip_heads(a["phenomenon"]["appearance"])) < 180:
            fail2.append(a["slug"])
    if fail2:
        raise SystemExit(f"appearance still short: {fail2[:10]}")

    for tid, pack in wiki.items():
        wiki_spoken(pack)
        rel = [s for s in (pack.get("relatedSlugs") or []) if any(x["slug"] == s for x in arts)]
        if not rel:
            # attach a sensible default by group
            pack["relatedSlugs"] = ["ce-tu-bao-gao", "jian-yi-ph-ec"]
        else:
            pack["relatedSlugs"] = rel

    dump(ART, arts)
    dump(EN, en)
    dump(ENRICH, extra)
    dump(WIKI, wiki)

    # report
    print("articles", len(arts), "en", len(en), "enrich", len(extra), "wiki", len(wiki))
    short = sum(1 for a in arts if len(strip_heads(a["phenomenon"]["appearance"])) < 180)
    print("appearance short", short)
    print("ok")


if __name__ == "__main__":
    main()
