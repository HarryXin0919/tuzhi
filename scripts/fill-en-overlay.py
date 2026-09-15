#!/usr/bin/env python3
"""Fill confuse / dosage / photos / indicators / commonCrops with whole-string English.

Never word-replaces leftover Chinese. Abort if any Han remains in extra fields.
Does not rewrite the 11 body overlay fields except stripping forbidden Sample wording.
"""
from __future__ import annotations

import importlib.util
import json
import re
import sys
from pathlib import Path

ROOT = Path("/workspace")
PAIR_DIR = ROOT / "scripts" / "en-strings"
HAN = re.compile(r"[\u4e00-\u9fff]")
SAMPLE = re.compile(r"\b[Ss]ample\b|\bSAMPLE\b")
SKETCH = "A sketch — don’t fertilise from the picture alone."
BODY = (
    "appearance",
    "conditions",
    "plainExplain",
    "natural",
    "human",
    "steps",
    "fieldCheck",
    "dontDo",
    "whenToTest",
    "prevention",
    "longform",
    "summary",
)

IND_NAME = {
    "pH（0～20 厘米）": "pH (0–20 cm)",
    "根尖颜色": "Root-tip colour",
    "EC / 全盐": "EC / total salt",
    "土面白霜": "White crust on the surface",
    "容重": "Bulk density",
    "雨后积水时间": "How long water sits after rain",
    "有机质": "Organic matter",
    "土色": "Soil colour",
    "碱解氮": "Alkaline-hydrolysable nitrogen",
    "叶位": "Which leaves",
    "速效钾": "Available potassium",
    "老叶缘": "Old-leaf margins",
    "有效磷": "Available phosphorus",
    "pH": "pH",
    "新叶脉间": "Between veins on new leaves",
    "有效锌": "Available zinc",
    "pH / 有机质 / 盐分": "pH / organic matter / salt",
    "田间对照": "A field check",
    "CEC": "CEC",
    "有效铁锌硼": "Available Fe / Zn / B",
    "交换性钙": "Exchangeable calcium",
    "浇水波动": "Watering swings",
    "交换性镁": "Exchangeable magnesium",
    "有效硼": "Available boron",
    "花器": "Flowers",
    "有效锰": "Available manganese",
    "有效硫": "Available sulphur",
    "有效铜": "Available copper",
    "有效钼": "Available molybdenum",
    "田间时间线": "The field timeline",
    "质地": "Texture",
    "根色": "Root colour",
    "EC": "EC",
    "土面": "The soil surface",
    "交换性铝": "Exchangeable aluminium",
    "ESP / 钠": "ESP / sodium",
    "地下水矿化度": "Groundwater salt",
    "灌溉水 EC": "Irrigation-water EC",
    "土壤 EC": "Soil EC",
    "膜边 EC": "EC at the film edge",
    "排水是否出水": "Whether the drain actually runs",
    "EC 前后对比": "EC before and after",
    "耕层厚度": "Topsoil thickness",
    "土壤含水量": "Soil moisture",
    "硬盖深度": "How deep the hard lid sits",
    "容重（辙内）": "Bulk density (in the wheel track)",
    "根系深度": "Rooting depth",
    "EC（肥料）": "EC (fertiliser)",
    "水分/温度": "Water / temperature",
    "黑土层厚度": "Black-layer thickness",
    "有效铁": "Available iron",
    "有效硼/钙/铁": "Available B / Ca / Fe",
    "水温/土温": "Water / soil temperature",
    "根结有无": "Root knots or not",
    "维管束颜色": "Vascular colour",
    "菌脓": "Bacterial ooze",
    "根结/维管束": "Root knots / vascular tissue",
    "残根/病根": "Old / diseased roots",
    "幼树根色": "Young-tree root colour",
    "土层温度": "Soil temperature",
    "地下水埋深": "How deep the groundwater sits",
    "结皮厚度": "Cap thickness",
    "灌溉水温": "Irrigation-water temperature",
    "潜育层深度": "How deep the gley layer sits",
    "肥液 EC": "Feed-solution EC",
    "浇出液 EC": "Leachate EC",
    "浇出液 pH": "Leachate pH",
    "安全间隔": "Pre-harvest interval",
    "pH（地头）": "pH (in the field)",
    "EC（地头）": "EC (in the field)",
    "化验单": "The soil-test sheet",
    "根色/气味": "Root colour / smell",
    "有效磷/锌": "Available P / Zn",
}


def load_names():
    spec = importlib.util.spec_from_file_location("fill_en_fields", ROOT / "scripts" / "fill-en-fields.py")
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader
    spec.loader.exec_module(mod)
    return mod.LOOK, mod.DOSE_NAME, mod.strip_sample


def load_pairs(name: str, suffix: bool = False) -> dict[str, str]:
    zh = (PAIR_DIR / f"{name}.txt").read_text().splitlines()
    en = (PAIR_DIR / f"{name}.en.txt").read_text().splitlines()
    if len(zh) != len(en):
        raise SystemExit(f"{name}: zh {len(zh)} vs en {len(en)}")
    out = {}
    for a, b in zip(zh, en):
        b = b.strip()
        if suffix:
            b = b.rstrip(" .")
            b = f"{b}. {SKETCH}" if b else SKETCH
        out[a] = b
    return out


def main() -> int:
    LOOK, DOSE_NAME, strip_sample = load_names()
    unique: dict[str, str] = {}
    unique.update(LOOK)
    unique.update(DOSE_NAME)
    unique.update(IND_NAME)
    unique.update(load_pairs("difference"))
    unique.update(load_pairs("photoHint"))
    unique.update(load_pairs("doseNote"))
    unique.update(load_pairs("doseRange"))
    unique.update(load_pairs("alt"))
    unique.update(load_pairs("caption", suffix=True))
    unique.update(load_pairs("indMeaning"))
    unique.update(load_pairs("indTypical"))
    unique.update(load_pairs("commonCrops"))

    arts = json.loads((ROOT / "src/data/articles.json").read_text())
    ov = json.loads((ROOT / "src/data/articles-en.json").read_text())
    leftover: list[tuple[str, str]] = []

    def tr(path: str, s: str) -> str:
        if not s:
            return s
        if s in unique:
            out = strip_sample(unique[s])
        else:
            out = strip_sample(s)
        if HAN.search(out) or SAMPLE.search(out):
            leftover.append((path, out[:180]))
        return out

    for a in arts:
        slug = a["slug"]
        g = ov.setdefault(slug, {})
        g["commonCrops"] = tr(f"{slug}.crops", a["phenomenon"]["commonCrops"])
        g["confuse"] = [
            {
                "lookalike": tr(f"{slug}.look", c["lookalike"]),
                "difference": tr(f"{slug}.diff", c["difference"]),
                **({"photoHint": tr(f"{slug}.hint", c["photoHint"])} if c.get("photoHint") else {}),
            }
            for c in a["confuse"]
        ]
        g["dosage"] = [
            {
                "name": tr(f"{slug}.dname", d["name"]),
                "range": tr(f"{slug}.drange", d["range"]),
                "note": tr(f"{slug}.dnote", d["note"]),
            }
            for d in a["dosage"]
        ]
        g["photos"] = [
            {"alt": tr(f"{slug}.alt", p["alt"]), "caption": tr(f"{slug}.cap", p["caption"])}
            for p in a["photos"]
        ]
        g["indicators"] = [
            {
                "name": tr(f"{slug}.iname", ind["name"]),
                "meaning": tr(f"{slug}.imean", ind["meaning"]),
                "typical": tr(f"{slug}.ityp", ind["typical"]),
            }
            for ind in a.get("indicators") or []
        ]

        def walk(obj):
            if isinstance(obj, str):
                return strip_sample(obj)
            if isinstance(obj, list):
                return [walk(x) for x in obj]
            if isinstance(obj, dict):
                return {k: walk(v) for k, v in obj.items()}
            return obj

        ov[slug] = walk(g)

    if leftover:
        print("leftover", len(leftover), file=sys.stderr)
        for p, s in leftover[:40]:
            print(" ", p, "=>", s, file=sys.stderr)
        return 1

    (ROOT / "src/data/articles-en.json").write_text(json.dumps(ov, ensure_ascii=False, indent=2) + "\n")
    (ROOT / "src/data/en-unique-strings.json").write_text(json.dumps(unique, ensure_ascii=False, indent=2) + "\n")
    print("ok extra-fields English, unique", len(unique))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
