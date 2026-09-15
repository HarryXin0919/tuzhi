#!/usr/bin/env python3
"""Strip template captions/openings, add spoken[], wiki terms, aliases. Dosage numbers untouched."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace/src/data")

DISCLAIM = re.compile(r"示意图，不能单凭此图下肥。?")
OPENING = re.compile(r"^你先对上这一幕：[^。]{0,48}。")


def clip_spoken(lines: list[str], maxn: int = 28) -> list[str]:
    out: list[str] = []
    for raw in lines:
        s = DISCLAIM.sub("", raw or "").strip()
        if re.search(r"仅供学习|不能替代农技", s):
            continue
        if not s:
            continue
        parts = re.split(r"(?<=[。！？!?；;])", s)
        for p in parts:
            p = p.strip()
            if not p:
                continue
            chars = re.sub(r"[。！？!?；;\s]", "", p)
            if len(chars) <= maxn:
                if not re.search(r"[。！？!?]$", p):
                    p += "。"
                out.append(p)
                continue
            bits = re.split(r"[，,、]", p)
            buf = ""
            for b in bits:
                nxt = f"{buf}，{b}" if buf else b
                if buf and len(re.sub(r"[。！？\s，,]", "", nxt)) > maxn:
                    out.append(buf if re.search(r"[。！？!?]$", buf) else buf + "。")
                    buf = b
                else:
                    buf = nxt
            if buf.strip():
                out.append(buf if re.search(r"[。！？!?]$", buf) else buf + "。")
    return out


def auto_spoken(a: dict) -> list[str]:
    bits = [
        a.get("title", ""),
        a.get("subtitle", ""),
        (a.get("phenomenon") or {}).get("appearance", ""),
        *((a.get("solutions") or {}).get("steps") or [])[:3],
        *(a.get("dontDo") or [])[:2],
    ]
    for d in (a.get("dosage") or [])[:2]:
        bits.append(f"{d.get('name','')}，{d.get('range','')}")
    return clip_spoken(bits)[:16]


def strip_caption(cap: str, fallback: str) -> str:
    s = DISCLAIM.sub("", cap or "").strip()
    s = re.sub(r"\s+", " ", s).strip(" 。")
    if not s:
        s = DISCLAIM.sub("", fallback or "").strip() or "该拍什么：叶、根或土面。"
    if "待补" not in s and "该拍" not in s and "对照" not in s:
        s = s + "。该拍这个位置。"
    return s.replace("。。", "。")


PRIORITY_APPEAR = {
    "yang-fen-kang-kang": "化验单某一项极高，地里却像缺另一项。磷很高时新叶脉间失绿像缺锌；钾很高时老叶脉间黄像缺镁。先把过高的停下来。",
    "huang-ye-jian-bie": "黄叶先分三步：黄的是新叶还是老叶；匀黄还是脉间黄；再问最近喷药、积水、点片死棵。一张黄叶不够下肥。",
    "xi-yan-pai-shui": "沟口要看出水。灌了大水，田边更白、邻地开始返盐，就是把盐赶上来了。有灌没排，盐坐电梯上楼。",
    "li-di-ceng": "刨开剖面：十五到二十厘米下面一层发亮硬盖，根到那儿拐弯。上层雨后积水。旋耕只打上面，硬盖还在。",
    "que-dan": "底下老叶匀黄，顶上新叶还绿，洗出来的根是白的，才像缺氮。新叶也黄要想缺硫或缺铁。根黑臭时不要猛尿素。",
    "que-jia": "老叶叶缘先焦，像火燎过往里卷，茎软果不甜。土面不一定白。土面白霜加焦边，先分盐害和缺钾。",
    "jian-yi-ph-ec": "地头试纸和电导仪是尺子，不是判决书。土浆要按说明书做。EC 看清是毫西还是微西，看错一位会下错肥。",
}


def hash_day(slug: str) -> str:
    n = sum(ord(c) for c in slug) % 27
    d = 1 + n
    return f"2026-03-{d:02d}"


def main() -> None:
    arts_path = ROOT / "articles.json"
    arts = json.loads(arts_path.read_text())
    for a in arts:
        slug = a["slug"]
        appear = (a.get("phenomenon") or {}).get("appearance") or ""
        if slug in PRIORITY_APPEAR:
            a["phenomenon"]["appearance"] = PRIORITY_APPEAR[slug]
        else:
            a["phenomenon"]["appearance"] = OPENING.sub("", appear).strip() or appear
        for p in a.get("photos") or []:
            p["caption"] = strip_caption(p.get("caption", ""), p.get("alt", ""))
        a["spoken"] = auto_spoken(a)
        a["spokenHow"] = clip_spoken((a.get("solutions") or {}).get("steps") or [])[:12]
        if a.get("updatedAt") == "2026-09-01":
            a["updatedAt"] = hash_day(slug)
        a.setdefault("author", "李泽宇")
        a.setdefault("reviewer", "作者整理，用量须经当地农技站确认")
        a.setdefault("sources", ["田间对照 + 公开农技资料，用量须当地农技站和包装说明确认"])
        if slug == "huang-ye-jian-bie":
            a["doseRefSlug"] = "que-dan"
        if slug == "lv-du-shang-gen":
            a["doseRefSlug"] = "shi-hui-yong-liang"
    arts_path.write_text(json.dumps(arts, ensure_ascii=False, indent=2) + "\n")
    print("articles", len(arts), "spoken sample", arts[0]["slug"], arts[0]["spoken"][:3])

    aliases_path = ROOT / "aliases.json"
    aliases = json.loads(aliases_path.read_text())
    extra_alias = {
        "suan-hua": ["pH 5.2", "ph5.2", "碱解氮"],
        "shi-hui-yong-liang": ["pH 5.2", "ph5.2", "石灰用量"],
        "que-dan": ["碱解氮", "水解氮"],
        "que-jia": ["叶缘焦", "速效钾"],
        "que-tie": ["脉绿", "新叶黄脉绿"],
        "huang-ye-jian-bie": ["苗黄", "叶缘焦", "药害", "涝害"],
        "ce-tu-bao-gao": ["碱解氮", "pH 5.2", "ph5.2", "CEC", "交换性钠", "化验单"],
        "ce-tu-qu-yang": ["取样", "S形", "0-20"],
        "jian-yi-ph-ec": ["pH 5.2", "试纸", "电导仪"],
        "yan-jian": ["交换性钠", "ESP", "叶缘焦"],
        "lv-du-shang-gen": ["交换性铝", "铝毒"],
        "you-ji-zhi": ["有机质", "土瘦"],
    }
    for k, vs in extra_alias.items():
        cur = aliases.setdefault(k, [])
        for v in vs:
            if v not in cur:
                cur.append(v)
    aliases_path.write_text(json.dumps(aliases, ensure_ascii=False, separators=(",", ":")) + "\n")
    print("aliases patched")

    wiki_path = ROOT / "wiki.json"
    wiki = json.loads(wiki_path.read_text())
    for tid, term in wiki.items():
        for p in term.get("photos") or []:
            cap = DISCLAIM.sub("", p.get("caption") or "").strip()
            if not cap or cap == "示意图":
                close = "特写" in (p.get("alt") or "")
                cap = "特写对照，请以自家地为准。" if close else "化验单上这一格怎么认。待补田间照片。"
            p["caption"] = cap
        zh = term["zh"]
        en = term["en"]
        zh.setdefault("aka", term["zh"].get("title", ""))
        if tid == "ph":
            apply_ph(term)
        elif tid == "ec":
            apply_ec(term)
        elif tid == "om":
            apply_om(term)
        elif tid == "alkn":
            apply_alkn(term)
        else:
            zh["spoken"] = clip_spoken(
                [zh.get("title", ""), zh.get("subtitle", ""), zh.get("appearance", ""), zh.get("fieldCheck", "")]
                + (zh.get("dontDo") or [])[:2]
            )[:10]
            en["spoken"] = clip_spoken(
                [en.get("title", ""), en.get("subtitle", ""), en.get("appearance", ""), en.get("fieldCheck", "")],
                maxn=90,
            )[:10]
    add_wiki_terms(wiki)
    wiki_path.write_text(json.dumps(wiki, ensure_ascii=False) + "\n")
    print("wiki", len(wiki), "ids", sorted(wiki.keys())[-8:])

    groups_path = ROOT / "lab-groups.json"
    groups = json.loads(groups_path.read_text())
    for g in groups:
        if g["id"] == "ion":
            for x in ["na", "esp", "cl"]:
                if x not in g["ids"]:
                    g["ids"].append(x)
        if g["id"] == "nutrient" and "si" not in g["ids"]:
            g["ids"].append("si")
    groups_path.write_text(json.dumps(groups, ensure_ascii=False) + "\n")

    units_path = ROOT / "lab-units.json"
    units = json.loads(units_path.read_text())
    units["esp"] = {
        "zh": "碱化度 ESP 常用 %。SAR 无量纲。和交换性钠、CEC 一起看。",
        "en": "ESP is usually %. SAR is dimensionless. Read with exchangeable Na and CEC.",
    }
    units["cl"] = {
        "zh": "氯离子常见 mg/kg 或 cmol/kg。和全盐、EC 一起看咸。",
        "en": "Chloride often mg/kg or cmol/kg. Read with total salt and EC.",
    }
    units["si"] = {
        "zh": "有效硅常见 mg/kg。水稻、甘蔗更常看这一格。",
        "en": "Available Si often mg/kg. Rice and sugarcane look here more often.",
    }
    units_path.write_text(json.dumps(units, ensure_ascii=False) + "\n")
    print("lab groups/units patched")

    write_enrich()
    print("enrich.json written")


def apply_ph(term: dict) -> None:
    zh, en = term["zh"], term["en"]
    zh["aka"] = "酸碱度 / 水浸 pH / 水土比 1:2.5 pH / pH 5.2"
    en["aka"] = "acidity, water pH, 1:2.5 pH, pH 5.2"
    zh["appearance"] = "单子上可能写 pH、酸碱度、水浸 pH。都是同一把尺子，先看旁边有没有水土比。"
    en["appearance"] = "On the sheet it may say pH, acidity, or water pH. Same ruler. Read the soil:water ratio."
    zh["ratioNote"] = "1:1、1:2.5、1:5 的 pH 不能硬比。同一块地换水土比，数字会动。"
    en["ratioNote"] = "1:1, 1:2.5 and 1:5 pH are not the same number."
    zh["fieldCheck"] = "粮田根尖褐秃，常对上偏低的 pH；新叶黄、脉还绿，常对上偏高的 pH。茶园不是同一把尺子。"
    en["fieldCheck"] = "Brown bald root tips often match low pH on grain land; yellow new leaves with green veins often match high pH. Tea is a different ruler."
    zh["longform"] = [
        "pH 只说土水有多酸多碱，不说缺哪一种肥。粮田和茶园目标不同，别听赶集的人说改到七就好。",
        "数字和地里拧着，先认尺子和水土比，再打开农业知识里的酸化或石灰用量。这条不给袋数。",
    ]
    en["longform"] = [
        "pH says how acid or alkaline the soil water is, not which bag to buy. Grain and tea do not share a target.",
        "If the number and the field disagree, read the ruler and the soil:water ratio first. Rates live in the field guide.",
    ]
    zh["readTable"] = [
        {"label": "粮田水浸 pH（示意）", "low": "低于约 5.5，根尖易褐秃", "mid": "大约 6.0～7.5，多数粮菜舒服", "high": "高于约 8，铁易被锁"},
        {"label": "茶园", "low": "过低伤根", "mid": "大约 4.5～6.0 才是茶的窗口", "high": "改到中性会伤茶"},
    ]
    en["readTable"] = [
        {"label": "Grain, water pH (sketch)", "low": "Below about 5.5, root tips brown", "mid": "About 6.0–7.5 for most grain and veg", "high": "Above about 8, iron locks"},
        {"label": "Tea", "low": "Too low hurts roots", "mid": "About 4.5–6.0 is the tea window", "high": "Do not push tea to neutral"},
    ]
    zh["spoken"] = [
        "pH 是尺子，不是病名。",
        "单子上酸碱度、水浸 pH 都是它。",
        "先看水土比，一比一和二点五不能硬比。",
        "粮田低于大约五点五，才谈改酸。",
        "茶园不要按粮田改到中性。",
        "高于八，新叶黄、脉还绿，铁容易被锁。",
        "用量去酸化和石灰那两篇。",
    ]
    en["spoken"] = [
        "pH is a ruler, not a disease name.",
        "Acidity and water pH on the sheet are the same cell.",
        "Read the soil:water ratio before you compare labs.",
        "On grain land, talk lime only below about 5.5.",
        "Do not push tea to neutral.",
        "Above about 8, iron often locks.",
        "Rates live in the acid-soil and lime guides.",
    ]
    zh["dontDo"] = ["不要跨实验室、跨水土比硬比一个小数。", "茶园不要按粮田改到中性。", "pH 不是缺肥的名字，不要一低就猛尿素。"]
    en["dontDo"] = ["Don’t mix labs or soil:water ratios.", "Don’t push tea to neutral.", "pH is not a nutrient name."]


def apply_ec(term: dict) -> None:
    zh, en = term["zh"], term["en"]
    zh["aka"] = "电导率 / 电导 / 盐分电导 / mS/cm / μS/cm"
    en["aka"] = "electrical conductivity, salinity EC, mS/cm, µS/cm"
    zh["appearance"] = "单子上写 EC、电导率、电导。旁边一定有单位：毫西或微西，看错一位会把淡土当成咸土。"
    en["appearance"] = "The sheet says EC or conductivity. The unit — mS or µS — is the whole story."
    zh["ratioNote"] = "饱和浸提、1:1、1:5 的 EC 不能直接比。大棚滴口和露地也不是同一把尺子。"
    en["ratioNote"] = "Saturated paste, 1:1 and 1:5 EC are different numbers."
    zh["fieldCheck"] = "土面白霜、滴口一圈、小水浇完更蔫，常常是这个数上去了。咸看 EC，涩看 pH 和钠。"
    en["fieldCheck"] = "White crust, a ring at the dripper, worse wilt after a light watering — EC often went up. Salt is EC; alkali is pH and sodium."
    zh["longform"] = [
        "EC 说土水有多咸，不是缺水。苗期更敏感。单位看错，肥液会下反。",
        "白霜加焦边，先分盐害和缺钾，不要直接叫人撒石膏或补钾。用量去盐碱和洗盐那两篇。",
    ]
    en["longform"] = [
        "EC says how salty the soil water is, not that the plant is thirsty. Seedlings feel it first.",
        "White crust plus scorched margins: split salt from potassium. Rates live in the saline guides.",
    ]
    zh["readTable"] = [
        {"label": "耕层 EC（示意，1:5 常见）", "low": "很低，不是问题本身", "mid": "多数露地还能出苗", "high": "苗期敏感，滴口白圈、越浇越蔫"},
    ]
    en["readTable"] = [
        {"label": "Topsoil EC (sketch, often 1:5)", "low": "Very low is not itself a disease", "mid": "Most open fields still come up", "high": "Seedlings suffer; dripper rings, worse wilt after water"},
    ]
    zh["spoken"] = [
        "EC 是咸度计，不是旱情。",
        "先看单位，毫西和微西差一千倍。",
        "水土比不同，数字不能硬比。",
        "白霜加浇完更蔫，常常是它上去了。",
        "咸看电导，涩看酸碱和钠。",
        "不要见白霜就撒石膏。",
    ]
    en["spoken"] = [
        "EC is a salt meter, not a drought meter.",
        "Read the unit. mS and µS differ by a thousand.",
        "Different soil:water ratios are not comparable.",
        "White crust plus worse wilt after watering often means EC went up.",
        "Don’t spread gypsum on every white crust.",
    ]
    zh["dontDo"] = ["不要单位没看就把数字抄到邻县表上。", "不要见白霜一律石膏。", "没沟不要大水漫灌。"]
    en["dontDo"] = ["Don’t copy the number across units.", "Don’t gypsum every white crust.", "No drain, no flood."]


def apply_om(term: dict) -> None:
    zh, en = term["zh"], term["en"]
    zh["aka"] = "有机质 / 有机碳 / OM / 土里的肉"
    en["aka"] = "organic matter, organic carbon, OM"
    zh["appearance"] = "单子上写有机质或有机碳。有的实验室写克每千克，有的写百分数。百分数乘十大约等于克每千克，别把 1.2% 当成 1.2 克。"
    en["appearance"] = "Organic matter or organic carbon. g/kg versus % — 1.2% is not 1.2 g/kg."
    zh["ratioNote"] = "有机碳和有机质不是同一个数，有的单子用 1.724 去换。看清列名。"
    en["ratioNote"] = "Organic carbon and organic matter are not the same cell. Read the column name."
    zh["fieldCheck"] = "搓一把：浅、粉、团不住，一场雨肥就飘，常常是肉薄了。颜色深不是化验，但浅了常常肉薄。"
    en["fieldCheck"] = "A pale, dusty handful that will not clod, and fertiliser that vanishes after rain, often means thin organic matter."
    zh["longform"] = [
        "有机质是家底，不是一袋菌的名字。还田是年年的慢功夫，一季补不回来。",
        "沙土肉更薄，少量多次。生粪埋根边会烧苗。用量去有机质那篇，这条不给袋数。",
    ]
    en["longform"] = [
        "Organic matter is the soil’s savings, not a microbe bag. Residue return is slow work.",
        "Sandy soils hold less. Fresh manure against the root burns. Rates live in the organic-matter guide.",
    ]
    zh["readTable"] = [
        {"label": "耕层有机质（示意）", "low": "浅色散土，肥效年年飘", "mid": "能搓团又易散", "high": "黑土家底厚，仍要看盐和酸"},
    ]
    en["readTable"] = [
        {"label": "Topsoil OM (sketch)", "low": "Pale, dusty, fertiliser vanishes", "mid": "Clods then crumbles", "high": "Dark savings — still read salt and pH"},
    ]
    zh["spoken"] = [
        "有机质是家底，不是菌剂名。",
        "百分数和克每千克不要看串。",
        "浅、粉、一场雨肥就飘，肉薄了。",
        "还田是年年的慢功夫。",
        "不要指望一袋菌一季翻身。",
        "生粪埋根边会烧苗。",
    ]
    en["spoken"] = [
        "Organic matter is savings, not a microbe brand.",
        "Do not mix percent with grams per kilogram.",
        "Pale dusty soil that loses fertiliser after rain is thin.",
        "Residue return is year-by-year work.",
        "Fresh manure against the root burns.",
    ]
    zh["dontDo"] = ["不要把有机碳当成有机质硬比。", "不要指望一袋菌一季翻身。", "生粪不要埋根边。"]
    en["dontDo"] = ["Don’t mix carbon with matter.", "Don’t expect a microbe bag to rebuild a field in one season.", "Don’t bury fresh manure on the root."]


def apply_alkn(term: dict) -> None:
    zh, en = term["zh"], term["en"]
    zh["aka"] = "碱解氮 / 水解氮 / 有效氮 / 碱解氮 mg/kg"
    en["aka"] = "alkaline-hydrolysable N, available N, hydrolysable nitrogen"
    zh["appearance"] = "单子上写碱解氮或水解氮。这是当季能用的氮，不是全氮那一格。单位常见毫克每千克。"
    en["appearance"] = "Alkaline-hydrolysable or available nitrogen. This season’s N, not total N. Often mg/kg."
    zh["ratioNote"] = "全氮是仓库，碱解氮是当季饭量。两项对着看，才知道是缺还是被锁。"
    en["ratioNote"] = "Total N is the warehouse. This cell is this season’s meal. Read them together."
    zh["fieldCheck"] = "老叶匀黄、新叶还绿、根还白，才像氮不够。新叶黄脉绿不是这一格的事。"
    en["fieldCheck"] = "Old leaves evenly yellow, new leaves still greener, roots still white — that is the nitrogen look. New leaves yellow with green veins is not this cell."
    zh["longform"] = [
        "碱解氮过低容易脱肥黄叶，过高容易旺长倒伏。按本省分级读，此处为示意。",
        "见黄不要先冲尿素。先分叶位和根。用量去缺氮那篇。",
    ]
    en["longform"] = [
        "Too low: yellow old leaves. Too high: lush lodging. Use the provincial class. This table is a sketch.",
        "Don’t chase urea at the first yellow. Split leaf position and the root. Rates live in the nitrogen guide.",
    ]
    zh["readTable"] = [
        {"label": "碱解氮 mg/kg（示意）", "low": "当季饭不够，老叶易匀黄", "mid": "多数粮田够用一季", "high": "再猛氮容易旺长倒伏"},
    ]
    en["readTable"] = [
        {"label": "Available N mg/kg (sketch)", "low": "This season’s meal is short", "mid": "Enough for many grain fields", "high": "More N often lodges"},
    ]
    zh["spoken"] = [
        "碱解氮是当季饭量，不是全氮。",
        "两项对着看，才知道缺还是被锁。",
        "老叶匀黄、新叶还绿，才像缺氮。",
        "新叶黄脉绿，不要判缺氮。",
        "按本省分级，这里只是对照。",
        "用量去缺氮那篇。",
    ]
    en["spoken"] = [
        "This cell is this season’s nitrogen, not total N.",
        "Read it next to total N.",
        "Old leaves yellow, new leaves greener — that is the N look.",
        "New leaves yellow with green veins is not nitrogen.",
        "Rates live in the nitrogen guide.",
    ]
    zh["dontDo"] = ["不要把全氮和碱解氮看成同一格。", "不要新叶黄脉绿就判缺氮。", "根黑臭时不要猛尿素。"]
    en["dontDo"] = ["Don’t mix total N with this cell.", "Don’t call iron-lock a nitrogen gap.", "Don’t pour urea on black smelly roots."]


def copy_term(src: dict, new_id: str) -> dict:
    t = json.loads(json.dumps(src))
    t["id"] = new_id
    t.pop("bvid", None)
    t.pop("videoTitle", None)
    return t


def add_wiki_terms(wiki: dict) -> None:
    al = wiki["al"]
    salt = wiki["salt"]
    om = wiki["om"]

    na = copy_term(al, "na")
    na["relatedSlugs"] = ["yan-jian", "xi-yan-pai-shui", "fan-yan"]
    na["problem"] = "盐碱"
    na["group"] = "离子"
    na["photos"] = [
        {"src": "/images/wiki/salt.jpg", "alt": "交换性钠 对照", "caption": "待补田间照片。这一格看化验单上的钠，不看风景。"},
        {"src": "/images/wiki/salt-2.jpg", "alt": "交换性钠 特写", "caption": "待补田间照片。特写对照，请以自家地为准。"},
    ]
    na["zh"].update(
        {
            "title": "交换性钠",
            "subtitle": "涩不涩，先问钠，不要只看白霜。",
            "summary": "交换性钠说土里钠离子占了多少座位。白霜是盐的名片，钠高才是碱化。",
            "aka": "交换性钠 / Ex-Na / 钠离子",
            "appearance": "单子上写交换性钠、Ex-Na。单位常见厘摩尔每千克。别和全盐、EC 看成同一格。",
            "ratioNote": "要算碱化度，还要 CEC。钠高、CEC 也高，百分比才公平。",
            "fieldCheck": "土发涩发黏、结构差、不一定有很厚白霜，常常是钠在作怪。咸看 EC，涩看钠和 pH。",
            "longform": [
                "钠把团粒拆散，土又黏又板。石膏不是见白霜就撒，要钠高、钙相对低才谈。",
                "用量去盐碱那篇。这条不给袋数。",
            ],
            "readTable": [
                {"label": "交换性钠（示意）", "low": "座位少，不是碱化主因", "mid": "要和 CEC 一起看百分比", "high": "结构差、土发涩，先问排水再谈石膏"}
            ],
            "spoken": [
                "交换性钠说涩不涩。",
                "白霜是盐，钠高才是碱。",
                "要和 CEC 一起看百分比。",
                "见白霜不要一律石膏。",
                "用量去盐碱那篇。",
            ],
            "dontDo": ["不要把钠和全盐看成同一格。", "不要见白霜就撒石膏。", "没沟不要大水漫灌。"],
            "plainExplain": "钠高把土的团粒拆散。咸和涩是两件事。",
            "fieldCheck": "土发涩发黏、结构差、不一定有厚白霜。",
        }
    )
    na["en"].update(
        {
            "title": "Exchangeable sodium",
            "subtitle": "Alkali is sodium, not every white crust.",
            "summary": "Exchangeable sodium is how many seats Na occupies. White crust is salt; high Na is sodicity.",
            "aka": "Ex-Na, exchangeable Na",
            "appearance": "The sheet says exchangeable sodium or Ex-Na, often cmol/kg. Not the same cell as total salt or EC.",
            "ratioNote": "ESP needs CEC too. A high Na with a high CEC is a different percentage.",
            "fieldCheck": "Slick, sticky, poor structure, not always a thick crust — often sodium.",
            "longform": [
                "Sodium breaks crumbs. Gypsum is not for every white crust — only when Na is high and calcium is relatively low.",
                "Rates live in the saline-alkali guide.",
            ],
            "readTable": [
                {"label": "Exchangeable Na (sketch)", "low": "Few seats, not the alkali driver", "mid": "Read as a percentage of CEC", "high": "Poor structure; drain before gypsum"}
            ],
            "spoken": [
                "Exchangeable sodium is the alkali question.",
                "White crust is salt. High Na is sodicity.",
                "Read it with CEC.",
                "Don’t gypsum every white crust.",
            ],
            "dontDo": ["Don’t mix Na with total salt.", "Don’t gypsum every crust.", "No drain, no flood."],
        }
    )
    wiki["na"] = na

    esp = copy_term(salt, "esp")
    esp["relatedSlugs"] = ["yan-jian", "xi-yan-pai-shui"]
    esp["problem"] = "盐碱"
    esp["group"] = "离子"
    esp["photos"] = [
        {"src": "/images/wiki/saline.jpg", "alt": "ESP 对照", "caption": "待补田间照片。ESP 是算出来的百分比。"},
        {"src": "/images/wiki/saline-2.jpg", "alt": "ESP 特写", "caption": "待补田间照片。请以自家化验单为准。"},
    ]
    esp["zh"].update(
        {
            "title": "ESP / SAR（碱化度）",
            "subtitle": "钠占阳离子座位的百分比，不是白霜厚度。",
            "summary": "ESP 是交换性钠除以 CEC。SAR 用水里的钠钙镁来算。都是碱化尺子，不是盐尺子。",
            "aka": "碱化度 / ESP / SAR / 钠吸附比",
            "appearance": "有的单子直接写 ESP% 或碱化度，有的要你自己用钠和 CEC 去除。SAR 多出现在灌溉水化验。",
            "ratioNote": "ESP 和 SAR 不能当同一个数抄。没有 CEC，就算不出 ESP。",
            "fieldCheck": "结构差、湿时一包浆、干了硬块，比一层白霜更能对上碱化。",
            "longform": [
                "盐是 EC 和全盐，碱是 pH、钠和 ESP。两套尺子。高 ESP 先问排水和钙，不要先猛尿素。",
                "按区域分级，此处为对照。用量去盐碱篇。",
            ],
            "readTable": [
                {"label": "ESP%（示意）", "low": "钠座位不多", "mid": "开始伤结构", "high": "碱化，先排水再谈石膏"}
            ],
            "spoken": [
                "ESP 是钠占座位的百分比。",
                "没有 CEC 就算不出来。",
                "盐看电导，碱看 ESP。",
                "结构差比白霜更能对上碱化。",
                "用量去盐碱那篇。",
            ],
            "dontDo": ["不要把 ESP 当成 EC。", "没有 CEC 不要硬报一个碱化度。", "不要见白霜就按高 ESP 下石膏。"],
        }
    )
    esp["en"].update(
        {
            "title": "ESP / SAR",
            "subtitle": "How many cation seats sodium took — not crust thickness.",
            "summary": "ESP is exchangeable Na over CEC. SAR uses Na, Ca and Mg in water. Both are alkali rulers, not salt rulers.",
            "aka": "exchangeable sodium percentage, sodium adsorption ratio",
            "appearance": "Some sheets print ESP%. Others expect you to divide Na by CEC. SAR is more common on irrigation-water tests.",
            "ratioNote": "ESP and SAR are not the same number. No CEC, no ESP.",
            "fieldCheck": "Poor structure, slurry when wet, clods when dry — that matches sodicity better than a white film.",
            "longform": ["Salt is EC. Alkali is pH, Na and ESP. High ESP: drain and calcium first, not urea.", "Rates live in the saline-alkali guide."],
            "readTable": [{"label": "ESP% (sketch)", "low": "Few Na seats", "mid": "Structure starts to fail", "high": "Sodic — drain before gypsum"}],
            "spoken": ["ESP is sodium’s share of the seats.", "No CEC, no ESP.", "Salt is EC. Alkali is ESP.", "Rates live in the saline guide."],
            "dontDo": ["Don’t treat ESP as EC.", "Don’t invent ESP without CEC.", "Don’t gypsum every crust."],
        }
    )
    wiki["esp"] = esp

    cl = copy_term(salt, "cl")
    cl["relatedSlugs"] = ["yan-jian", "que-jia"]
    cl["problem"] = "盐碱"
    cl["group"] = "离子"
    cl["photos"] = [
        {"src": "/images/wiki/ec.jpg", "alt": "氯离子 对照", "caption": "待补田间照片。氯看化验单，不看土色。"},
        {"src": "/images/wiki/ec-2.jpg", "alt": "氯离子 特写", "caption": "待补田间照片。请以自家单子为准。"},
    ]
    cl["zh"].update(
        {
            "title": "氯离子",
            "subtitle": "咸的一种成分。忌氯作物要单独问这一格。",
            "summary": "氯离子是盐分里常见的阴离子。马铃薯、烟草、部分果树怕它。不是缺钾的名字。",
            "aka": "氯离子 / Cl- / 水溶性氯",
            "appearance": "单子上写氯离子、Cl⁻、水溶性氯。单位常见毫克每千克。",
            "ratioNote": "和 EC、全盐一起看咸。高氯不要用氯化钾去补钾。",
            "fieldCheck": "叶缘焦要先问土面白不白、最近用没用含氯化肥。忌氯作物更敏感。",
            "longform": [
                "氯高是盐害的一条线索，不是叫你立刻补钾。忌氯作物只用硫酸钾那一类。",
                "用量去盐碱或缺钾篇，先分清是盐还是钾。",
            ],
            "readTable": [
                {"label": "氯离子（示意）", "low": "多数作物不敏感", "mid": "问作物是否忌氯", "high": "盐害线索，忌氯作物先停含氯肥"}
            ],
            "spoken": [
                "氯离子是咸的一种成分。",
                "忌氯作物要单独问这一格。",
                "叶缘焦先分盐害和缺钾。",
                "高氯不要用氯化钾补钾。",
            ],
            "dontDo": ["不要把氯离子当成缺钾。", "忌氯作物不要用氯化钾。", "不要见焦边就当盐害猛洗。"],
        }
    )
    cl["en"].update(
        {
            "title": "Chloride",
            "subtitle": "One piece of the salt. Chloride-sensitive crops ask this cell on its own.",
            "summary": "Chloride is a common anion in salt. Potato, tobacco and some fruit dislike it. It is not the name of a potassium gap.",
            "aka": "Cl-, water-soluble chloride",
            "appearance": "The sheet says chloride or Cl-, often mg/kg.",
            "ratioNote": "Read with EC and total salt. High Cl: do not feed KCl.",
            "fieldCheck": "Scorched margins: ask if the soil is white, and whether a chloride fertiliser went on.",
            "longform": ["High chloride is a salt clue, not an order to add potassium.", "Rates live in the saline or potassium guides — split salt from K first."],
            "readTable": [{"label": "Chloride (sketch)", "low": "Most crops don’t mind", "mid": "Ask if the crop hates chloride", "high": "A salt clue; stop KCl on sensitive crops"}],
            "spoken": ["Chloride is one piece of the salt.", "Sensitive crops ask this cell alone.", "Scorched margins: split salt from potassium.", "Don’t feed KCl when Cl is already high."],
            "dontDo": ["Don’t treat Cl as a K gap.", "Don’t use KCl on chloride-sensitive crops.", "Don’t flood-wash at the first scorched edge."],
        }
    )
    wiki["cl"] = cl

    si = copy_term(om, "si")
    si["relatedSlugs"] = ["suan-hua", "ban-jie"]
    si["problem"] = "缺素"
    si["group"] = "养分"
    si["photos"] = [
        {"src": "/images/wiki/test.jpg", "alt": "有效硅 对照", "caption": "待补田间照片。有效硅看单子，水稻更常问。"},
        {"src": "/images/wiki/test-2.jpg", "alt": "有效硅 特写", "caption": "待补田间照片。请以自家单子为准。"},
    ]
    si["zh"].update(
        {
            "title": "有效硅",
            "subtitle": "水稻、甘蔗更常看。不是万能抗病药。",
            "summary": "有效硅是根能摸到的硅。禾本科更在乎。缺了茎叶偏软，不是一瓶叶面肥能代替改土。",
            "aka": "有效硅 / 速效硅 / Si",
            "appearance": "单子上写有效硅或速效硅，单位常见毫克每千克。方法写在单子上，跨实验室不要硬比。",
            "ratioNote": "全硅和有效硅不是同一格。酸土有效硅常常更低。",
            "fieldCheck": "稻株易倒、叶下披、病斑来得勤，有人会问硅。先仍要看氮、水和根。",
            "longform": [
                "硅是禾本科的帮手，不是包治。酸土、淋溶强的土这一格更容易低。",
                "补硅按登记说明和农技站，宁少勿多。这条不给袋数。",
            ],
            "readTable": [
                {"label": "有效硅 mg/kg（示意）", "low": "水稻茎叶易软", "mid": "多数田够用", "high": "再加也不是产量开关"}
            ],
            "spoken": [
                "有效硅，水稻更常看。",
                "全硅和有效硅不是同一格。",
                "酸土这一格更容易低。",
                "硅不是包治，先看氮水和根。",
            ],
            "dontDo": ["不要把有效硅当成农药。", "不要跨方法硬比数字。", "不要忽略氮水和根只补硅。"],
        }
    )
    si["en"].update(
        {
            "title": "Available silicon",
            "subtitle": "Rice and sugarcane ask more often. Not a cure-all.",
            "summary": "Available Si is what the root can touch. Grasses care more. Soft stems are a clue, not a spray that replaces the soil.",
            "aka": "available Si, available silica",
            "appearance": "The sheet says available silicon, often mg/kg. Methods differ — don’t mix labs.",
            "ratioNote": "Total Si and available Si are different cells. Acid soils often test lower.",
            "fieldCheck": "Rice that lodges and stays diseased is when people ask Si. Still read N, water and roots first.",
            "longform": ["Silicon helps grasses. It does not replace drainage or nitrogen.", "Rates from the label and the station. This page does not hand a bag count."],
            "readTable": [{"label": "Available Si mg/kg (sketch)", "low": "Rice stems go soft", "mid": "Enough for many paddies", "high": "More is not a yield switch"}],
            "spoken": ["Available silicon — rice asks more often.", "Total Si is a different cell.", "Acid soils often test lower.", "Silicon is not a pesticide."],
            "dontDo": ["Don’t treat Si as a pesticide.", "Don’t mix lab methods.", "Don’t skip N, water and roots."],
        }
    )
    wiki["si"] = si


def write_enrich() -> None:
    data = {
        "suan-hua": {
            "updatedAt": "2026-03-12",
            "author": "李泽宇",
            "sources": ["粮田改酸习惯用量区间，须当地农技站和包装确认", "茶园目标 pH 与粮田不同"],
            "mechanism": "土太酸，铝离子从矿物里出来咬根尖。根尖一秃，水肥进不去，地上看起来像缺肥。铵态氮连年当唯一氮源、雨水淋钙镁，都会把 pH 往下推。茶树耐酸，粮田不是越酸越好。",
            "example": "同一块粮田 pH 5.2，可以谈农用石灰，沙土按下限、分两次。茶园同样 5.2，窗口往往还在四点五到六，不能照搬粮田改到中性。",
            "doseTable": [
                {"crop": "粮田（水稻、玉米、花生）", "texture": "沙土", "rate": "农用石灰每亩 50 公斤量级，分两次", "note": "pH＜5.5 才改；与尿素不同日"},
                {"crop": "粮田", "texture": "黏土", "rate": "农用石灰每亩可看到 150 公斤量级上限，分两次", "note": "下一季再测，过了目标就停"},
                {"crop": "茶园", "texture": "任意", "rate": "不要按粮田改到中性", "note": "茶的窗口大约 4.5～6.0"},
                {"crop": "设施蔬菜", "texture": "任意", "rate": "设施减量，按下限", "note": "先测再改，不用建筑石灰"},
            ],
            "labTable": [
                {"id": "ph", "name": "pH", "low": "＜约 5.5，根尖易褐", "mid": "6.0～7.5 粮菜舒服", "high": "＞8 铁易被锁", "note": "按本省分级，此处为示意"},
                {"id": "al", "name": "交换性铝", "low": "几乎不咬根", "mid": "开始活跃", "high": "根尖褐秃", "note": "pH 低了它才出来"},
                {"id": "om", "name": "有机质", "low": "肉薄，铝更凶", "mid": "能络合一部分铝", "high": "改酸更稳", "note": "不是当季开关"},
            ],
            "spoken": [
                "秧苗发僵不长，先看根尖。",
                "根尖褐秃、少白尖，才像铝在咬。",
                "浇水冒锈水只是加分项。",
                "零到二十厘米测 pH。",
                "低于五点五才谈改酸。",
                "农用石灰每亩五十到一百五十公斤。",
                "分两次，沙土按下限。",
                "跟尿素不同日，不用建筑石灰。",
                "茶园不要按粮田改到中性。",
                "根秃时不要猛尿素。",
            ],
            "spokenHow": [
                "拔一棵，洗手洗根。",
                "先认根尖再谈肥。",
                "测零到二十厘米 pH。",
                "低于五点五才改。",
                "农用石灰分两次旋进。",
                "沙土按下限。",
                "与尿素错开，不用建筑石灰。",
            ],
            "spokenEn": [
                "Stunted seedlings: wash the root tips first.",
                "Brown bald tips look like aluminium.",
                "Rusty water is extra evidence, not required.",
                "Test pH at 0 to 20 centimetres.",
                "Talk lime only below about 5.5.",
                "Farm lime is often 50 to 150 kilograms per mu, split.",
                "Sandy soils take the low end.",
                "Not the same day as urea. No builder’s lime.",
                "Don’t push tea to neutral.",
            ],
            "spokenHowEn": [
                "Pull one plant and wash the roots.",
                "Read the tip before you feed.",
                "Test 0 to 20 centimetre pH.",
                "Lime only below 5.5, split, sandy soils low.",
            ],
        },
        "shi-hui-yong-liang": {
            "updatedAt": "2026-03-18",
            "author": "李泽宇",
            "sources": ["农用石灰习惯用量区间 50～150 公斤/亩", "须包装说明和当地农技站确认"],
            "mechanism": "石灰中和氢离子，也让铝沉淀，根尖才能重新长白尖。一次倒太多，表层过碱，微量元素被锁，苗会黄。所以分两次，沙土按下限。",
            "example": "粮田 pH 5.2、沙壤：先按每亩 50 公斤农用石灰旋进，与尿素错开一周，下一季再测。黏土同样 5.2 可以看上限，仍要分两次。",
            "doseTable": [
                {"crop": "粮田 pH＜5.5", "texture": "沙土", "rate": "农用石灰每亩 50 公斤量级，分两次", "note": "认包装，建筑石灰不行"},
                {"crop": "粮田 pH＜5.5", "texture": "黏土", "rate": "农用石灰每亩可到 150 公斤量级，分两次", "note": "过了目标就停"},
                {"crop": "粮田", "texture": "需镁时", "rate": "白云石粉与石灰相近，带镁", "note": "按测土"},
                {"crop": "茶园 / 设施", "texture": "任意", "rate": "不要按粮田改到中性；设施减量", "note": "生石灰不往苗上撒"},
            ],
            "labTable": [
                {"id": "ph", "name": "pH", "low": "＜5.5 才优先改", "mid": "5.5～6.0 先观察", "high": "不要再加石灰", "note": "取样 0～20 厘米"},
                {"id": "texture", "name": "质地", "low": "沙土按下限", "mid": "壤土居中", "high": "黏土略多仍分两次", "note": "邻县袋子对不上自家质地"},
            ],
            "spoken": [
                "已经决定改酸，才问用哪种灰。",
                "认包装，农用的才能下地。",
                "建筑石灰不行。",
                "粮田低于五点五才改。",
                "每亩五十到一百五十公斤，分两次。",
                "沙土按下限，黏土略多。",
                "跟尿素鲜粪错开一周。",
                "生石灰不往苗上撒。",
                "下一季再测，过了就停。",
            ],
            "spokenHow": [
                "认包装。",
                "测 pH，低于五点五才改。",
                "分两次旋进。",
                "沙土按下限。",
                "与尿素错开一周。",
            ],
            "doseRefSlug": None,
        },
        "lv-du-shang-gen": {
            "updatedAt": "2026-04-02",
            "author": "李泽宇",
            "doseRefSlug": "shi-hui-yong-liang",
            "mechanism": "pH 低了，铝离子带电出来，专咬根尖分生组织。地上再追氮，根没有嘴，肥进不去。缺肥的根还在，只是细；铝毒是尖被咬掉。",
            "example": "洗根看不见白尖、pH 5.0：先按石灰用量那篇改酸，让新嘴长出来，再薄肥。不要把尿素加倍。",
            "doseTable": [
                {"crop": "水稻 / 小麦 / 花生", "texture": "酸土", "rate": "用量见《石灰怎么用》", "note": "本篇是认症，不另开袋数"},
            ],
            "labTable": [
                {"id": "ph", "name": "pH", "low": "铝开始咬", "mid": "多数作物能长根", "high": "铝不是主因", "note": "先圈 pH 再圈铝"},
                {"id": "al", "name": "交换性铝", "low": "几乎不活跃", "mid": "开始伤根尖", "high": "褐秃、不发新根", "note": "按本省分级示意"},
            ],
            "spoken": [
                "根尖像被烫过：发褐、秃、不伸。",
                "这不是单纯缺肥。",
                "pH 低了铝才出来咬。",
                "先让新嘴长出来，再薄肥。",
                "用量去石灰那篇。",
                "根秃时不要猛尿素。",
            ],
            "spokenHow": [
                "测 pH。",
                "少量分次农用石灰降铝。",
                "用量打开石灰那篇。",
                "有机质能络合一部分铝。",
                "新根出来再薄肥。",
            ],
        },
        "yan-jian": {
            "updatedAt": "2026-03-21",
            "author": "李泽宇",
            "mechanism": "盐把土水变咸，根喝水费劲，像腌着。钠高还会把团粒拆散，土又黏又板。小水勤浇等于把盐用电梯送上来。咸看电导，涩看酸碱和钠，两码事。",
            "example": "土面白霜、叶缘焦、浇一小水更蔫：先停高盐肥，测 EC、pH、全盐。没沟不要大水漫灌。不要见白霜就撒石膏。",
            "doseTable": [
                {"crop": "小麦 / 玉米 / 棉花", "texture": "任意", "rate": "先分流：EC 高走洗盐；pH 高且钠高才考虑石膏", "note": "本篇先认症，洗盐定额按农技站"},
            ],
            "labTable": [
                {"id": "ec", "name": "EC / 全盐", "low": "不是盐害主因", "mid": "苗期开始敏感", "high": "出苗不齐、浇完更蔫", "note": "看清单位"},
                {"id": "ph", "name": "pH", "low": "偏酸，不是碱", "mid": "中性", "high": "涩，要问钠", "note": "咸和涩分开"},
                {"id": "na", "name": "交换性钠", "low": "不是碱化", "mid": "和 CEC 一起看", "high": "结构差，才谈石膏", "note": "不是见白霜就高"},
                {"id": "esp", "name": "ESP", "low": "钠座位不多", "mid": "开始伤结构", "high": "碱化", "note": "没有 CEC 算不出"},
            ],
            "spoken": [
                "蹲下去看土面：白粉还是硬壳。",
                "出苗一块有一块没有。",
                "叶边像开水烫过。",
                "小水浇完更蔫，不要当旱灌。",
                "咸看电导，涩看酸碱和钠。",
                "没沟不要大水漫灌。",
                "见白霜不要一律撒石膏。",
            ],
            "spokenHow": [
                "先停高盐肥。",
                "有排水再洗。",
                "覆盖断返盐。",
                "测电导、pH、全盐。",
                "分清是咸还是涩。",
            ],
        },
        "xi-yan-pai-shui": {
            "updatedAt": "2026-04-08",
            "author": "李泽宇",
            "mechanism": "盐随水走。灌进去的水如果没有出口，水位抬高，盐被抬到地表。沟口不出水，洗盐就是把盐赶上来。",
            "example": "灌了大水，田边更白、邻地开始返盐：先清沟看出水，再按农技站定额灌并排出。不要堵着沟灌。",
            "doseTable": [
                {"crop": "小麦 / 玉米 / 棉花 / 水稻", "texture": "盐碱土", "rate": "洗盐定额按农技站和水质，本篇不编毫米数", "note": "先看出水，再灌"},
            ],
            "labTable": [
                {"id": "ec", "name": "EC 洗前洗后", "low": "洗后应下来", "mid": "对照取样点", "high": "没降说明没排出去", "note": "同一水土比才可比"},
            ],
            "spoken": [
                "沟口要看出水。",
                "有灌没排，盐坐电梯上楼。",
                "田边更白，就是把盐赶上来了。",
                "先清淤，再按定额灌并排出。",
                "不要堵着沟灌大水。",
                "不要把咸水排到没出路的邻田。",
            ],
            "spokenHow": [
                "清田间沟和骨干沟。",
                "按当地定额灌并排出。",
                "洗后中耕覆盖。",
                "水位高的先降。",
            ],
        },
        "fan-yan": {
            "updatedAt": "2026-04-15",
            "author": "李泽宇",
            "mechanism": "水是电梯，盐是乘客。地表一干，水带着盐往上走，干湿交界最白。小水勤浇最会往上抬。覆盖和中耕能打断毛细管。",
            "example": "浇完再晒干，地表一层白、苗更焦边：灌就灌透并有出路，干了返白不要再加一把肥。",
            "doseTable": [
                {"crop": "小麦 / 棉花 / 设施蔬菜", "texture": "返盐土", "rate": "覆盖地膜或秸秆；灌后适墒中耕", "note": "不是再加一袋肥"},
            ],
            "labTable": [
                {"id": "ec", "name": "EC", "low": "返白也可能是薄盐霜", "mid": "对照浇前浇后", "high": "先问出路", "note": "田间时间线比一张单子重要"},
            ],
            "spoken": [
                "浇完再晒干看：地表一层白。",
                "干湿交界最白。",
                "小水勤浇最会把盐抬上来。",
                "有沟才洗，覆盖能断返盐。",
                "干了返白不要再加一把肥。",
            ],
            "spokenHow": [
                "灌就灌透并有出路。",
                "覆盖、中耕断毛细管。",
                "春季最要紧。",
            ],
        },
        "ban-jie": {
            "updatedAt": "2026-03-28",
            "author": "李泽宇",
            "mechanism": "雨滴砸、车碾、湿耕，都会把表层颗粒填进孔隙。湿时一泡烂泥，干了像砖。根横着走，苗戴帽出土。犁底层是另一层硬盖，别和表层帽子当成一件事。",
            "example": "雨后锄头弹回来、车辙里不出苗：土干到能裂再松，湿着松是抹一层新泥。深松隔年、适墒、刚过硬盖，大约二十五到四十厘米。",
            "doseTable": [
                {"crop": "小麦 / 玉米 / 蔬菜 / 水稻", "texture": "板结土", "rate": "隔年深松 25～40 厘米，刚过硬盖就停", "note": "配腐熟有机肥；泥里不进车"},
            ],
            "labTable": [
                {"id": "bulk", "name": "容重", "low": "松", "mid": "能出苗", "high": "根翻不上来", "note": "对着刨坑看，不单看数字"},
                {"id": "om", "name": "有机质", "low": "更易板", "mid": "有肉更好松", "high": "仍要适墒", "note": "有机肥按当地"},
            ],
            "spoken": [
                "雨后一包浆，晴天像砖。",
                "苗戴帽出土，根横着走。",
                "刨二十厘米看有没有发亮硬盖。",
                "车辙里常常不出苗。",
                "隔年深松，大约二十五到四十厘米。",
                "刚过硬盖就停。",
                "泥里不要进车。",
            ],
            "spokenHow": [
                "适墒隔年深松。",
                "刚过硬盖就停。",
                "配腐熟有机肥覆盖。",
                "别把旋一遍当成深松。",
            ],
        },
        "li-di-ceng": {
            "updatedAt": "2026-04-22",
            "author": "李泽宇",
            "mechanism": "年年旋耕同一深度，底下被压出一层发亮硬盖。水过不去，根到这儿拐弯。上层雨后积水，看起来像肥不够。",
            "example": "剖面十五到二十厘米发亮、根水平走：隔年深松超过硬盖，大约二十五到四十厘米，适墒。腐熟有机肥每亩一到两吨量级跟上。不要年年翻生土。",
            "doseTable": [
                {"crop": "小麦 / 玉米 / 水稻", "texture": "有犁底层", "rate": "深松一般 25～40 厘米；腐熟有机肥每亩 1～2 吨量级", "note": "隔年、适墒，不要只旋十几厘米"},
            ],
            "labTable": [
                {"id": "bulk", "name": "容重 / 剖面", "low": "能扎根", "mid": "对照硬盖上下", "high": "根拐弯", "note": "一把锹比一张单子快"},
            ],
            "spoken": [
                "刨开剖面看硬盖。",
                "十五到二十厘米下面发亮。",
                "根到那儿拐弯。",
                "上层雨后积水。",
                "隔年深松超过硬盖。",
                "大约二十五到四十厘米。",
                "有机肥跟上，不要年年翻生土。",
            ],
            "spokenHow": [
                "隔年深松超过硬盖。",
                "适墒。",
                "有机质跟上。",
            ],
        },
        "you-ji-zhi": {
            "updatedAt": "2026-05-03",
            "author": "李泽宇",
            "mechanism": "有机质是团粒的胶水，也是养分的慢仓库。掉了以后，沙土更漏、黏土更板，肥下去一场雨又像没施。一袋菌改变不了掉了的家底。",
            "example": "搓一把浅、粉、团不住：连续三年还田加腐熟粪，比一季堆满靠谱。沙土少量多次。生粪埋根边会烧苗。",
            "doseTable": [
                {"crop": "粮田", "texture": "沙土", "rate": "腐熟有机肥少量多次，按当地农技站吨级分年", "note": "不要一次堆山"},
                {"crop": "粮田", "texture": "黏土 / 壤土", "rate": "腐熟有机肥按当地，常见每亩吨级分年", "note": "覆盖少裸冬"},
            ],
            "labTable": [
                {"id": "om", "name": "有机质", "low": "浅色散土，肥效飘", "mid": "能搓团又易散", "high": "家底厚仍要看盐和酸", "note": "百分数和克每千克不要看串"},
            ],
            "spoken": [
                "搓一把：浅、粉、团不住。",
                "肥下去一场雨又像没施。",
                "一袋菌一季补不回掉的家底。",
                "连续三年还田加腐熟粪。",
                "沙土少量多次。",
                "生粪埋根边会烧苗。",
            ],
            "spokenHow": [
                "还田加腐熟粪，年年做。",
                "覆盖少裸冬。",
                "先别指望一袋菌翻身。",
            ],
        },
        "que-dan": {
            "updatedAt": "2026-04-11",
            "author": "李泽宇",
            "mechanism": "氮在植株里会从老叶搬到新叶。所以缺氮时底下先匀黄，顶上还绿。根黑臭、涝、铁被锁，都会黄，但叶位不同。",
            "example": "玉米下部老叶匀黄、新叶还绿、根白：玉米拔节，尿素每亩常见五到十五公斤量级分次，沙土按下限多一次。新叶黄脉绿不要走这篇。",
            "doseTable": [
                {"crop": "玉米拔节 / 叶菜旺长", "texture": "沙土", "rate": "尿素每亩常见 5 公斤量级分次，多一次", "note": "根白、确认缺氮后"},
                {"crop": "玉米拔节 / 叶菜旺长", "texture": "黏土 / 壤土", "rate": "尿素每亩常见 5～15 公斤量级分次", "note": "宁少勿多，按测土"},
            ],
            "labTable": [
                {"id": "alkn", "name": "碱解氮", "low": "当季饭不够", "mid": "多数粮田够一季", "high": "再猛易旺长", "note": "不是全氮"},
                {"id": "om", "name": "有机质", "low": "更不保氮", "mid": "能垫一垫", "high": "仍要看叶位", "note": "按本省分级示意"},
            ],
            "spoken": [
                "底下老叶匀黄，顶上新叶还绿。",
                "洗出来的根是白的，才像缺氮。",
                "新叶也黄，要想缺硫或缺铁。",
                "根黑臭时不要猛尿素。",
                "玉米拔节，尿素每亩五到十五公斤。",
                "分次，沙土按下限。",
            ],
            "spokenHow": [
                "先分叶位。",
                "根不坏才少量多次。",
                "叶面按说明救急。",
                "沙土分顿。",
            ],
        },
        "que-jia": {
            "updatedAt": "2026-05-09",
            "author": "李泽宇",
            "mechanism": "钾从老叶往新叶搬，所以老叶边缘先焦，像火燎往里卷。盐害也焦边，但土面常有白霜，浇完更蔫。两件事不要并成一袋钾肥。",
            "example": "老叶缘焦、土面不白、速效钾偏低：粮食作物钾肥每亩常见五到十五公斤量级。忌氯作物只用硫酸钾。土面白霜先走盐碱篇。",
            "doseTable": [
                {"crop": "水稻 / 玉米 / 蔬菜", "texture": "无白霜", "rate": "钾肥每亩常见 5～15 公斤量级", "note": "确认缺钾后；忌氯作物用硫酸钾"},
                {"crop": "果树等忌氯", "texture": "无白霜", "rate": "只用硫酸钾，按测土", "note": "中午不要喷浓钾"},
            ],
            "labTable": [
                {"id": "avk", "name": "速效钾", "low": "老叶缘易焦", "mid": "多数粮田够", "high": "再加会挤镁", "note": "白霜时先问盐"},
                {"id": "ec", "name": "EC", "low": "不像盐害", "mid": "对照土面", "high": "先分盐害", "note": "焦边不是钾的专利"},
            ],
            "spoken": [
                "老叶边缘先焦，像火燎往里卷。",
                "土面不一定白。",
                "白霜加焦边，先分盐害和缺钾。",
                "粮食作物钾肥每亩五到十五公斤。",
                "忌氯作物只用硫酸钾。",
                "中午不要喷浓钾。",
            ],
            "spokenHow": [
                "测速效钾。",
                "叶面磷酸二氢钾先小面积。",
                "秸秆能还就还。",
            ],
        },
        "que-tie": {
            "updatedAt": "2026-04-19",
            "author": "李泽宇",
            "mechanism": "铁在植株里几乎不从老叶搬到新叶。所以缺铁或铁被锁时，新叶黄、脉还绿，老叶相对还绿。高 pH、大水、石灰性土最爱把铁锁住。这不是缺氮。",
            "example": "花生新叶黄脉绿、老叶还绿、pH 偏高：叶面螯合铁按登记说明下限，新叶期重复几次，先小面积。不要猛撒硫酸亚铁当当季解决，也不要一黄就冲尿素。",
            "doseTable": [
                {"crop": "果树 / 花生 / 大豆", "texture": "石灰性土", "rate": "叶面螯合铁按登记说明下限，新叶期重复几次", "note": "先小面积；根际靠有机肥和稳定水分"},
            ],
            "labTable": [
                {"id": "ph", "name": "pH", "low": "铁较活泼", "mid": "看作物", "high": "铁易被锁", "note": "新叶脉间对这一格"},
                {"id": "fe", "name": "有效铁", "low": "可能缺", "mid": "仍要看 pH", "high": "高 pH 时根仍可能吃不到", "note": "按本省分级示意"},
            ],
            "spoken": [
                "先分黄的是新叶还是老叶。",
                "新叶黄、叶脉还绿，才像铁。",
                "老叶相对还绿。",
                "这不像缺氮。",
                "叶面螯合铁按说明救急。",
                "高 pH 不要猛撒硫酸亚铁当当季解决。",
                "不要一黄就冲尿素。",
            ],
            "spokenHow": [
                "掐顶端新叶：肉黄、脉还绿。",
                "叶面螯合铁按说明重复。",
                "根际靠有机肥和稳定水分。",
                "不要大水漫灌。",
            ],
        },
        "huang-ye-jian-bie": {
            "updatedAt": "2026-05-16",
            "author": "李泽宇",
            "doseRefSlug": "que-dan",
            "mechanism": "黄只是结果。氮从老叶搬走，铁几乎不搬，硫整株偏匀，涝伤根、药伤在喷后一两天、土传是点片死棵。叶位、根、土面三样对不上，不要下肥。",
            "example": "新叶黄脉绿走缺铁，不要走缺氮。喷药一两天突发斑扭走药害。白霜加焦边先分盐害和缺钾。点片死棵先看根。",
            "doseTable": [
                {"crop": "认症专篇", "texture": "—", "rate": "本篇不下肥，用量见缺氮、缺铁、缺钾各篇", "note": "先分清再打开对应篇"},
            ],
            "labTable": [
                {"id": "alkn", "name": "碱解氮", "low": "对上老叶匀黄", "mid": "—", "high": "—", "note": "新叶黄脉绿不要判氮"},
                {"id": "fe", "name": "有效铁 / pH", "low": "对上新叶脉间黄", "mid": "—", "high": "高 pH 铁被锁", "note": "先看叶位"},
                {"id": "ec", "name": "EC", "low": "不像盐", "mid": "—", "high": "白霜加焦边", "note": "先分盐和钾"},
            ],
            "spoken": [
                "黄叶先分新叶还是老叶。",
                "再分匀黄还是脉间黄。",
                "再问最近喷药、积水、点片死棵。",
                "一张黄叶不够下肥。",
                "新叶黄脉绿不要判缺氮。",
                "喷药一两天突发，先想药害。",
                "用量见缺氮或缺铁那篇。",
            ],
            "spokenHow": [
                "拍三张：全株、叶背、土面。",
                "对照邻行。",
                "拿不准测土或拍照问。",
                "不要按最贵的叶面肥先喷。",
            ],
        },
        "ce-tu-bao-gao": {
            "updatedAt": "2026-03-08",
            "author": "李泽宇",
            "mechanism": "化验单是尺子。单位看错一位，肥会下反：把百分数当成克每千克，有机质会差十倍；把微西当成毫西，盐会差一千倍。报告不是处方。",
            "example": "匿名粮田：pH 5.2、有机质 12.4 克每千克、EC 0.28。粮田 5.2 可以谈石灰；茶园同样 5.2 不能照搬改到中性。CEC 是阳离子交换量，不是电导。",
            "doseTable": [
                {"crop": "任何作物", "texture": "先读单", "rate": "阅读顺序：pH → 有机质 → 盐分 → 氮磷钾 → 微量", "note": "补肥按农技站配方区间，本篇不下袋数"},
            ],
            "labTable": [
                {"id": "ph", "name": "pH", "low": "粮田＜5.5 谈改酸", "mid": "看作物", "high": "铁易锁", "note": "第一格"},
                {"id": "om", "name": "有机质", "low": "家底薄", "mid": "能垫", "high": "仍要看盐", "note": "第二格"},
                {"id": "ec", "name": "EC / 盐分", "low": "不像盐害", "mid": "—", "high": "先问出路", "note": "第三格"},
                {"id": "cec", "name": "CEC", "low": "沙土留不住肥", "mid": "—", "high": "一次能多留", "note": "不是电导"},
            ],
            "spoken": [
                "单子拿回来先对地块名和日期。",
                "先圈 pH、有机质、盐分。",
                "再看氮磷钾，再看微量。",
                "单位看错一位会下错肥。",
                "粮田 pH 五点二，可以谈石灰。",
                "茶园五点二，不能改到中性。",
                "CEC 不是电导。",
                "报告是尺子不是处方。",
            ],
            "spokenHow": [
                "先圈极端项。",
                "过酸过碱、盐太高、肉太薄先改。",
                "氮磷钾按当地分级。",
                "已经过高的先停。",
            ],
        },
        "ce-tu-qu-yang": {
            "updatedAt": "2026-03-04",
            "author": "李泽宇",
            "mechanism": "一块地的土是花的。一个坑、粪堆边、田边，都代表不了这一块。混样是为了得到这块地的平均数，不是为了省事。",
            "example": "旱作常用零到二十厘米，S 形或棋盘八到十五个点混合，四分法留一袋，写清地块作物日期。施肥改土前取。表层和犁底层不要胡乱混。",
            "doseTable": [
                {"crop": "旱作粮田 / 菜田", "texture": "任意", "rate": "0～20 厘米，8～15 个点混合", "note": "避开田边粪堆；四分法留一袋"},
            ],
            "labTable": [
                {"id": "test", "name": "取样记录", "low": "一个坑＝瞎的", "mid": "8～15 点", "high": "点太多仍要混合均匀", "note": "深度写在袋上"},
            ],
            "spoken": [
                "取样错了，报告就是瞎的。",
                "不要只挖一个坑。",
                "不要挖粪堆边。",
                "八到十五个点，零到二十厘米。",
                "混合后再留一袋。",
                "写清地块、作物、日期。",
            ],
            "spokenHow": [
                "S 形或棋盘取点。",
                "避开田边粪堆。",
                "四分法留一袋。",
            ],
        },
        "jian-yi-ph-ec": {
            "updatedAt": "2026-05-21",
            "author": "李泽宇",
            "mechanism": "试纸和电导仪读的是土浆里的氢离子和盐。水土比一变，数字就变。它们是地头尺子，极端再送实验室。",
            "example": "土浆按说明书做。试纸比色在光线下。EC 看清毫西还是微西。记下点和日期。不要试纸一色就按最大量改土。",
            "doseTable": [
                {"crop": "地头工具", "texture": "按说明书土水比", "rate": "不施肥，只读数", "note": "EC 看清 mS 还是 μS"},
            ],
            "labTable": [
                {"id": "ph", "name": "地头 pH", "low": "对照粮田 5.5", "mid": "看作物", "high": "对照 8", "note": "不是判决书"},
                {"id": "ec", "name": "地头 EC", "low": "不像盐", "mid": "—", "high": "先问出路", "note": "没校不要信一位小数"},
            ],
            "spoken": [
                "试纸和电导仪是尺子，不是判决书。",
                "土浆要按说明书做。",
                "试纸比色在光线下。",
                "电导看清毫西还是微西。",
                "记下点和日期。",
                "极端再送实验室。",
                "不要试纸一色就按最大量改土。",
            ],
            "spokenHow": [
                "土水比按说明。",
                "EC 测饱和浸提或按仪器说明。",
                "记下点和日期。",
            ],
        },
        "yang-fen-kang-kang": {
            "updatedAt": "2026-05-27",
            "author": "李泽宇",
            "appearance": "化验单某一项极高，地里却像缺另一项。磷很高时新叶脉间失绿像缺锌；钾很高时老叶脉间黄像缺镁。先把过高的停下来。",
            "mechanism": "离子会抢同一扇门。磷太多，锌进不来；钾太多，镁被挤。看起来像缺素，其实是打架。",
            "example": "有效磷很高、新叶脉间失绿：先停磷，锌按叶面说明下限救急。不要缺什么加什么同时还在猛加已经过高的那项。",
            "spoken": [
                "化验单某一项极高，地里却像缺另一项。",
                "磷很高，锌进不来。",
                "钾很高，镁被挤。",
                "先把过高的停下来。",
                "被锁的那项叶面救急。",
            ],
        },
    }
    Path("/workspace/src/data/enrich.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
