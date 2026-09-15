#!/usr/bin/env python3
"""2026-09-16 A–G remaining punch: Chinese lab-sheet diagram, slogans, unique appearance, speakEn vs steps."""
from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path("/workspace")
FONT = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"
PAPER = (244, 239, 230)
INK = (28, 22, 18)
FOREST = (31, 107, 74)
LINE = (196, 184, 168)
WHITE = (255, 255, 255)


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size=size, index=0)


def draw_sheet(path: Path, *, crop: bool = False) -> None:
    w, h = (1200, 1600) if not crop else (1200, 1100)
    im = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(im)
    d.rectangle([36, 36, w - 36, h - 36], outline=FOREST, width=4)
    d.rectangle([36, 36, w - 36, 168], fill=FOREST)
    d.text((60, 58), "土壤检测报告（示意图）", font=font(44), fill=WHITE)
    d.text((60, 118), "仅供学习对照 · 不是处方 · 数字来自酸化明白纸示例", font=font(22), fill=PAPER)

    meta = [
        "委托：华北某粮田（匿名示意）",
        "取样：2026-03-18　0–20 cm　12 点混合",
        "方法：pH 水浸 1:2.5；养分单位 mg/kg 或 g/kg",
    ]
    y = 196
    for line in meta:
        d.text((64, y), line, font=font(26), fill=INK)
        y += 40

    headers = ["检测项目", "结果", "单位", "备注"]
    rows = [
        ["pH（水浸 1:2.5）", "5.2", "—", "粮田低于约 5.5 才谈改酸"],
        ["有机质", "12.4", "g/kg", "储量，不是菌剂商品名"],
        ["电导率 EC", "0.28", "mS/cm", "看土水有多咸"],
        ["碱解氮", "68", "mg/kg", "当季能用的氮"],
        ["有效磷", "9.5", "mg/kg", "根能摸到的磷"],
        ["速效钾", "82", "mg/kg", "根能摸到的钾"],
        ["CEC", "11.2", "cmol/kg", "能留住养分的座位"],
        ["有效铁", "4.1", "mg/kg", "pH 偏高时易被锁"],
    ]
    col_x = [56, 360, 560, 700]
    table_top = y + 16
    row_h = 72
    d.rectangle([48, table_top, w - 48, table_top + row_h], fill=FOREST)
    for i, head in enumerate(headers):
        d.text((col_x[i] + 8, table_top + 20), head, font=font(26), fill=WHITE)
    for r, row in enumerate(rows):
        top = table_top + row_h * (r + 1)
        bg = WHITE if r % 2 == 0 else (236, 230, 218)
        d.rectangle([48, top, w - 48, top + row_h], fill=bg, outline=LINE)
        for i, cell in enumerate(row):
            d.text((col_x[i] + 8, top + 20), cell, font=font(24), fill=INK)

    foot_y = table_top + row_h * (len(rows) + 1) + 28
    foot = [
        "示意图。单位是 mg/kg 或 g/kg，不是 lb/acre。",
        "请以自家中文测土单为准。本图不能单凭下肥。",
    ]
    for line in foot:
        d.text((64, foot_y), line, font=font(24), fill=FOREST)
        foot_y += 40
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "JPEG", quality=90, optimize=True)


def walk_replace(obj, repls: list[tuple[str, str]]):
    if isinstance(obj, dict):
        return {k: walk_replace(v, repls) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk_replace(v, repls) for v in obj]
    if isinstance(obj, str):
        out = obj
        for a, b in repls:
            out = out.replace(a, b)
        return out
    return obj


def split_sents(text: str) -> list[str]:
    text = (text or "").strip()
    if not text:
        return []
    parts = re.split(r"(?<=[.!?])\s+", text)
    return [p.strip() for p in parts if len(p.strip()) > 8]


def merge_frags(lines: list[str]) -> list[str]:
    out: list[str] = []
    for s in lines:
        s = s.strip()
        if not s:
            continue
        if out and (out[-1].endswith(";") or (s[:1].islower())):
            out[-1] = (out[-1].rstrip("; ") + " " + s).replace("  ", " ")
        else:
            out.append(s)
    return out


def build_speak_en(g: dict, steps: list[str]) -> list[str]:
    step_norm = {re.sub(r"^\s*\d+\s*[).、]\s*", "", s).strip().lower() for s in steps if s}
    lines: list[str] = []

    def add(s: str | None) -> None:
        if not s:
            return
        s = re.sub(r"^\s*\d+\s*[).、]\s*", "", s.strip())
        if len(s) < 12:
            return
        if re.search(r"[\u4e00-\u9fff]", s):
            return
        if re.search(r"translation pending", s, re.I):
            return
        if s.lower() in step_norm:
            return
        if s.lower() in {x.lower() for x in lines}:
            return
        lines.append(s)

    for s in split_sents(g.get("appearance") or ""):
        add(s)
    for c in (g.get("confuse") or [])[:2]:
        add(c.get("difference"))
    add(g.get("fieldCheck") or "")
    for d in (g.get("dontDo") or [])[:3]:
        add(d)
    for d in (g.get("dosage") or [])[:1]:
        add(f"{d.get('name') or 'Rate'}: {d.get('range') or ''}. {d.get('note') or ''}".strip(" :."))
    for p in (g.get("prevention") or [])[:2]:
        add(p)
    for block in g.get("longform") or []:
        for part in split_sents(block):
            add(part)
            if len(lines) >= 8:
                break
        if len(lines) >= 8:
            break
    if len(lines) < 6:
        for part in split_sents(g.get("mechanism") or ""):
            add(part)
            if len(lines) >= 6:
                break
    if len(lines) < 6:
        for part in split_sents(g.get("plainExplain") or ""):
            add(part)
            if len(lines) >= 6:
                break
    merged = merge_frags(lines)
    merged = [s for s in merged if s.lower() not in step_norm]
    # keep ≥6 unique oral lines, cap 10
    seen = set()
    out = []
    for s in merged:
        k = s.lower()
        if k in seen:
            continue
        seen.add(k)
        out.append(s)
        if len(out) >= 10:
            break
    return out


def howto_en(g: dict) -> list[str]:
    out = []
    for s in g.get("steps") or []:
        t = re.sub(r"^\s*\d+\s*[).、]\s*", "", s).strip()
        if t and t not in out:
            out.append(t)
    return out[:7]


def load(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))


def dump(p: Path, data) -> None:
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


REPL = [
    ("不是抄邻县的石灰账", "先测这块地的 pH，再谈石灰"),
    ("南方红土发酸，不是抄邻县的石灰账", "南方红土发酸，先测这块地的 pH，再谈石灰"),
    ("邻县石灰账", "别人地的石灰用量"),
    ("邻县的石灰账", "别人地的石灰用量"),
    ("邻县石灰袋子", "别人地的石灰用量"),
    ("按北方麦田石灰账抄", "按北方麦田的石灰用量抄"),
    ("北方麦田石灰账", "北方麦田的石灰用量"),
    ("邻县高产密度", "别人的高产密度"),
    ("数字不能直接抄邻县", "水土比不同，数字不能直接对打"),
    ("不能抄邻县实验室", "不能跨实验室对打"),
    ("数字不能抄邻县实验室", "水土比不同，数字不能跨实验室对打"),
    ("抄到邻县表上", "抄到另一张表上"),
    ("别按邻县黏土袋数抄", "别按别的黏土地袋数抄"),
    ("按邻县黏土袋数抄", "按别的黏土地袋数抄"),
    ("别按邻县灌量抄", "别按别的地的灌量抄"),
    ("后面的配方都是邻县的账", "数字不准，后面的配方就站不住"),
    ("黑土家底厚", "黑土有机质高"),
    ("都靠这层肉", "都靠这层有机质"),
    ("把肉养厚", "把有机质慢慢养起来"),
    ("田间持水量是土的水杯刻度。浇水浇到过线就是涝。", "田间持水量是排干后土还能握住的水。浇过了这条线就是涝。"),
    ("田间持水量是土的水杯刻度", "田间持水量是排干后土还能握住的水"),
    ("It wakes up when pH is low", "It becomes active when pH is low"),
    ("hold a bigger meal", "hold more at once"),
    ("pickles the root", "stresses the roots"),
    ("house and the meal", "structure and organic matter"),
    ("loaf structure", "crumb structure"),
    ("season’s plate", "this season’s supply"),
    ("season's plate", "this season’s supply"),
    ("breathing road", "pore space"),
    ("cup mark", "held-water line"),
    ("aluminium woke up", "aluminium became active"),
    ("Lime grain land only below", "On grain land, lime only below"),
]

APP = {
    "que-xin": "对着光捏一片新叶：脉间发白、叶脉还绿，节间像被按短，顶上几片挤成一撮。下部老叶若还绿，不要先当缺氮。",
    "wei-sheng-wu": "抓一把土：秸秆过了一年还不烂，土发黏发臭、捏不出孔隙。养分单子不低、苗却没劲，先问气路和水路，不先问哪袋菌剂。",
    "que-peng": "花开了不坐果、蕾铃往下掉，茎里空心或纵向裂开，生长点皱着不伸。先问花期墒，再问硼，不要两件事并成一袋肥。",
    "shui-tian-huan-yuan": "长期深水捂着的田，一踩发臭，拔起的根是黑的、不见新白尖，有时有硫化氢味。先落干让根喘气，不要在深水里猛追肥。",
    "hong-huang-rang-gai-suan": "红土或黄泥土上，苗发僵、叶发黄、根尖发褐。先把土色和根摆在一起看，再测这块地的 pH，不要直接搬别人的石灰用量。",
    "suan-yu-que-gai": "番茄脐部发黑、果面裂、心叶焦边。叶面喷钙只能挡住这一茬的脸，土里钙走不到尖，还要问水和铵态氮。",
    "shen-song-shi-ji": "想深松时地是泥的或干硬的，松完翻出大坷垃，苗比松前更差。适墒才松，刚过硬盖就停，不要把松土当成天天的活。",
    "sha-tu-zeng-you-ji-zhi": "沙土漏得快，一次堆一座粪山，第二天浇水还是往下漏。少量多次把有机质养厚，覆盖挡住雨点，不要按黏土袋数抄。",
    "ye-cai-xiao-xing-yuan-su": "心叶焦边、叶柄裂、新叶黄而脉绿。喷一次叶面肥好像好了，过几天又回来。微量元素是救急，土里的锁没打开还会反复。",
    "shui-dao-jiang-miao": "返青后不发棵。进水口一条黄僵、田中间更绿，要先分水温、锈水、根色，不要整田当缺肥猛追。",
    "yu-mi-miao-huang": "玉米苗黄要分开看：下部老叶匀黄像缺氮；新叶条纹失绿像缺锌；叶片扭曲像药害；根湿发臭像涝。一张黄叶不够下肥。",
}


def main() -> None:
    draw_sheet(ROOT / "public/images/articles/ce-tu-bao-gao.jpg")
    draw_sheet(ROOT / "public/images/articles/ce-tu-bao-gao-2.jpg")
    draw_sheet(ROOT / "public/images/wiki/test.jpg")
    draw_sheet(ROOT / "public/images/wiki/test-2.jpg", crop=True)

    arts_p = ROOT / "src/data/articles.json"
    idx_p = ROOT / "src/data/articles-index.json"
    en_p = ROOT / "src/data/articles-en.json"
    enrich_p = ROOT / "src/data/enrich.json"
    wiki_p = ROOT / "src/data/wiki.json"
    posts_p = ROOT / "src/data/posts.json"
    units_p = ROOT / "src/data/lab-units.json"
    unique_p = ROOT / "src/data/en-unique-strings.json"

    articles = walk_replace(load(arts_p), REPL)
    overlay = walk_replace(load(en_p), REPL)
    enrich = walk_replace(load(enrich_p), REPL)
    wiki = walk_replace(load(wiki_p), REPL)
    posts = walk_replace(load(posts_p), REPL)
    units = walk_replace(load(units_p), REPL)
    unique = walk_replace(load(unique_p), REPL)

    overlay["suan-hua"]["photos"] = [
        {
            "alt": "Lab wheat seedlings: white healthy roots versus brown bald tips",
            "caption": "Lab root check, not a neighbour ridge.",
        },
        {
            "alt": "Lab wheat seedlings with injured root tips on paper",
            "caption": "Lab root check, not a neighbour ridge.",
        },
    ]
    overlay["ce-tu-bao-gao"]["photos"] = [
        {
            "alt": "Chinese soil-test sheet: pH, organic matter, available N, P, K in mg/kg or g/kg",
            "caption": "A Chinese lab-sheet diagram. Not your own field.",
        },
        {
            "alt": "Chinese soil-test nutrient table",
            "caption": "To add: photograph your own Chinese sheet.",
        },
    ]
    overlay["ban-jie"]["photos"] = [
        {
            "alt": "Soil pit: darker topsoil over a tighter layer",
            "caption": "A soil-pit profile. Not your own field.",
        },
        {
            "alt": "Surface crust still to photograph",
            "caption": "To add: rain-cap and a hoe that will not bite.",
        },
    ]
    overlay["yan-jian"]["photos"] = [
        {
            "alt": "White salt crust on a dry field",
            "caption": "White crust on the soil. Read it with seedlings and leaf margins.",
        },
        {
            "alt": "Whole-row white crust still to photograph",
            "caption": "To add: a full row of white crust and patchy emergence.",
        },
    ]

    gold_speak = None
    for a in articles:
        slug = a["slug"]
        if slug in APP:
            a["phenomenon"]["appearance"] = APP[slug]
        if slug == "hong-huang-rang-gai-suan":
            a["subtitle"] = "南方红土发酸，先测这块地的 pH，再谈石灰。"
        if slug == "ce-tu-bao-gao":
            a["photos"][0] = {
                "src": "/images/articles/ce-tu-bao-gao-2.jpg",
                "kind": "diagram",
                "alt": "中文测土单示意图：pH、有机质、碱解氮、有效磷、速效钾",
                "caption": "中文测土单示意图：pH、有机质、碱解氮、有效磷、速效钾。示意图，不是自家地头。",
            }
        if slug == "ban-jie":
            a["photos"][0]["kind"] = "diagram"
            a["photos"][0]["alt"] = "田间剖面：上层较暗，下面土层更紧"
            a["photos"][0]["caption"] = "田间剖面：上层较暗，下面土层更紧。剖面对照，不是自家地头。"
        g = overlay.get(slug) or {}
        steps = (g.get("steps") or []) + ((a.get("solutions") or {}).get("steps") or [])
        if slug == "suan-hua":
            gold_speak = a.get("spokenEn") or (enrich.get(slug) or {}).get("speakEn")
            speak = gold_speak
            how = a.get("spokenHowEn") or (enrich.get(slug) or {}).get("howtoSpeakEn")
        else:
            speak = build_speak_en(g, steps)
            how = howto_en(g) or (enrich.get(slug) or {}).get("howtoSpeakEn") or a.get("spokenHowEn") or []
            if len(speak) < 6:
                existing = merge_frags((enrich.get(slug) or {}).get("speakEn") or a.get("spokenEn") or [])
                step_norm = {re.sub(r"^\s*\d+\s*[).、]\s*", "", s).strip().lower() for s in steps if s}
                extra = [s for s in existing if s.strip().lower() not in step_norm and not re.search(r"[\u4e00-\u9fff]", s)]
                for s in extra:
                    if s not in speak:
                        speak.append(s)
                    if len(speak) >= 6:
                        break
        a["spokenEn"] = speak
        a["speakEn"] = speak
        a["spokenHowEn"] = how
        a["howtoSpeakEn"] = how
        slot = enrich.setdefault(slug, {})
        if slug != "suan-hua":
            slot["speakEn"] = speak
            slot["howtoSpeakEn"] = how
            slot.pop("spokenEn", None)
        scripts = ROOT / "public/audio/scripts"
        scripts.mkdir(parents=True, exist_ok=True)
        (scripts / f"{slug}.en.txt").write_text("\n".join(speak) + "\n", encoding="utf-8")
        zh = a.get("spoken") or a.get("speakZh") or []
        (scripts / f"{slug}.zh.txt").write_text("\n".join(zh) + "\n", encoding="utf-8")

    index = load(idx_p)
    by = {a["slug"]: a for a in articles}
    for card in index:
        a = by.get(card["slug"])
        if not a:
            continue
        card["subtitle"] = a["subtitle"]
        card["summary"] = a["summary"]
        card["photos"] = [{"src": p.get("src") or "", "alt": p.get("alt") or ""} for p in a.get("photos") or [] if p.get("kind") != "missing"]

    for term in ("test", "si"):
        w = wiki.get(term) or {}
        photos = w.get("photos") or []
        for p in photos:
            if "test.jpg" in (p.get("src") or "") or "test-2.jpg" in (p.get("src") or ""):
                p["kind"] = "diagram"
                p["alt"] = "中文测土单示意图"
                p["caption"] = "中文测土单示意图，不是自家地头。"
        w["photos"] = photos
        wiki[term] = w

    # drop leftover slogan keys in the unique-string table
    drop_keys = [k for k in unique if any(s in k for s in ("腌根", "膘掉了", "房改饭", "一包浆", "晴天像砖"))]
    for k in drop_keys:
        unique.pop(k, None)
    drop_vals = [k for k, v in unique.items() if any(s in str(v) for s in ("pickle the root", "house and the meal", "loaf structure", "the meat is gone"))]
    for k in drop_vals:
        unique.pop(k, None)

    dump(arts_p, articles)
    dump(idx_p, index)
    dump(en_p, overlay)
    dump(enrich_p, enrich)
    dump(wiki_p, wiki)
    dump(posts_p, posts)
    dump(units_p, units)
    dump(unique_p, unique)

    # verify
    arts2 = load(arts_p)
    e2 = load(enrich_p)
    short = []
    suan_n = 0
    for a in arts2:
        se = (e2.get(a["slug"]) or {}).get("speakEn") or a.get("speakEn") or []
        step_norm = {
            re.sub(r"^\s*\d+\s*[).、]\s*", "", s).strip().lower()
            for s in ((a.get("solutions") or {}).get("steps") or [])
        }
        kept = [s for s in se if s.strip().lower() not in step_norm]
        if a["slug"] == "suan-hua":
            suan_n = len(se)
        if a["slug"] != "suan-hua" and len(kept) < 6:
            short.append((a["slug"], len(kept)))
    print("speakEn after step-filter <6", len(short))
    for row in short[:12]:
        print(" ", row[0], row[1])
    print("suan-hua speakEn", suan_n)
    print("ce-tu image", (ROOT / "public/images/articles/ce-tu-bao-gao-2.jpg").stat().st_size)
    print("done")


if __name__ == "__main__":
    main()
