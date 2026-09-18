#!/usr/bin/env python3
"""Download real Wikimedia photos + draw labelled lab-sheet samples. Record sources."""
from __future__ import annotations

import json
import ssl
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "public" / "images"
SRC_PATH = IMG / "sources.json"
UA = "TuzhiAsia/1.0 (https://tuzhi.asia; g17612121666@gmail.com) soil-literacy educational reuse"
CTX = ssl.create_default_context()
FONT = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"

FILES = [
    # dest, commons filename, credit, license, note
    ("diagnose/whole-good.jpg", "201907 Rice Field in Yongchang, Lanxi.jpg", "Zhangzhugang", "CC BY-SA 4.0", "浙江兰溪永昌水田，整垄在画面里。中国地头。"),
    ("diagnose/whole-bad.jpg", "Zea mays acid soil 2017 01 05 6259b.jpg", "Alandmanson", "CC BY 4.0", "酸性土上发僵的玉米。南非夸祖鲁-纳塔尔，类型对照，不是华北某一块地。"),
    ("diagnose/close-good.jpg", "CSIRO ScienceImage 1565 Base of Plant.jpg", "CSIRO", "CC BY 3.0", "作物基部与新根。实验室/试验地对照，不是自家地头。"),
    ("diagnose/close-bad.jpg", "Aluminium toxocity maize roots 2017 01 05 6274.jpg", "Alandmanson", "CC BY 4.0", "铝毒伤根：根尖褐秃、侧根很少。南非材料，类型对照。"),
    ("diagnose/soil-good.jpg", "A soil scientist examines soil health. (24816169900).jpg", "USDA NRCS South Dakota", "Public domain (US federal)", "耕层土色与结构。美国南达科他州，类型对照。"),
    ("diagnose/soil-bad.jpg", "CSIRO ScienceImage 1740 Testing soil salinity.jpg", "CSIRO", "CC BY 3.0", "盐分测定现场。澳大利亚材料，类型对照；用来说明要拍清土面，不是化验单。"),
    ("articles/suan-hua-field.jpg", "Zea mays acid soil 2017 01 05 6259.jpg", "Alandmanson", "CC BY 4.0", "酸性土玉米发僵。南非材料，类型对照。"),
    ("articles/suan-hua-roots.jpg", "Aluminium toxocity maize roots 2017 01 05 6274.jpg", "Alandmanson", "CC BY 4.0", "铝毒根尖褐秃。实验室/试验地洗根，不是邻垄自拍。"),
    ("articles/yan-jian-sodic.jpg", "Sodic Solonchak.JPG", "Ji-Elle", "CC BY-SA 3.0", "新疆吐鲁番苏打盐土剖面。ISRIC 博物馆剖面，实验室对照，不是自家地头。"),
    ("articles/yan-jian-solonchak.jpg", "Solontchak.jpg", "Hedwig Storch", "CC BY-SA 3.0", "盐土剖面。奥地利材料，类型对照。"),
    ("articles/ban-jie-tracks.jpg", "Ernteschäden.jpg", "F. Bucher", "CC BY-SA 3.0", "收获机械压出的车辙与板结。德国材料，类型对照。"),
    ("articles/ban-jie-compact.jpg", "Compact soil.jpg", "USDA NRCS", "Public domain (US federal)", "紧实土面。美国材料，类型对照。"),
    ("articles/ban-jie-erosion.jpg", "Erosion Verdichtung001.jpg", "Llez", "CC BY-SA 3.0", "压实后的侵蚀与径流。类型对照。"),
    ("articles/que-dan-bean.jpg", "Phaseolus vulgaris nitrogen deficiency.jpg", "Rasbak", "CC BY-SA 3.0", "菜豆缺氮：下部老叶匀黄。类型对照。"),
    ("articles/que-dan-cauli.jpg", "Brassica oleracea Cauliflower Bloemkool stikstofgebrek.jpg", "Rasbak", "CC BY-SA 3.0", "花椰菜缺氮黄叶。类型对照，先看叶位。"),
    ("articles/que-jia-maize1.jpg", "K-deficient maize on Cedara 1 2003-01-13.jpg", "Alandmanson", "CC BY 4.0", "玉米缺钾：老叶焦边。南非 Cedara，类型对照。"),
    ("articles/que-jia-maize2.jpg", "K-deficient maize on Cedara 2 2003-01-13.jpg", "Alandmanson", "CC BY 4.0", "玉米缺钾叶缘焦枯特写。类型对照。"),
    ("articles/que-tie-citrus.jpg", "Chlorose ferrique sur Citrus aurantium.jpg", "INRA / Wikimedia", "CC BY-SA 4.0", "柑橘缺铁：新叶黄、叶脉还绿。类型对照。"),
    ("articles/lao-hai-wet.jpg", "A waterlogged meadow on the southern shore of Llyn Traffwll - geograph.org.uk - 774100.jpg", "Eric Jones / geograph.org.uk", "CC BY-SA 2.0", "地表积水。英国材料，类型对照，用来说明积水要拍清楚。"),
    ("wiki/ph-meter.jpg", "CSIRO ScienceImage 1739 Testing soil pH.jpg", "CSIRO", "CC BY 3.0", "实验室测土水 pH，不是园艺三针湿度计，也不是化验单格子。"),
    ("wiki/ec-salinity.jpg", "CSIRO ScienceImage 1740 Testing soil salinity.jpg", "CSIRO", "CC BY 3.0", "盐分/电导测定。类型对照。"),
    ("wiki/om-sample.jpg", "Amostragem-de-solo-com-estrutura-preservada.jpg", "Wikimedia / soil sampling", "CC BY-SA 4.0", "保持结构的耕层取样。类型对照。"),
    ("articles/you-ji-zhi-sample.jpg", "Amostragem-de-solo-com-estrutura-preservada.jpg", "Wikimedia / soil sampling", "CC BY-SA 4.0", "耕层取样看土色和结构。类型对照。"),
    ("articles/rice-lanxi.jpg", "201907 Rice Field in Yongchang, Lanxi.jpg", "Zhangzhugang", "CC BY-SA 4.0", "浙江兰溪水田。中国地头。"),
]


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size=size, index=0)


def fetch_commons(name: str) -> Image.Image | None:
    url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(name)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=40, context=CTX) as r:
            data = r.read()
            final = r.geturl()
        im = Image.open(BytesIO(data)).convert("RGB")
        print("OK", name, im.size, "via", final[:80])
        return im
    except Exception as e:
        print("FAIL", name, e)
        return None


def save_jpeg(im: Image.Image, dest: Path, max_side=1400) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(dest, "JPEG", quality=86, optimize=True)


def draw_sheet() -> Image.Image:
    W, H = 1200, 1600
    paper, ink, forest, line, danger = "#f6f1e8", "#1c1917", "#2f5d32", "#e6ddd0", "#b42318"
    img = Image.new("RGB", (W, H), paper)
    d = ImageDraw.Draw(img)
    d.rectangle([40, 40, W - 40, H - 40], outline=line, width=3)
    d.text((70, 64), "土知  测土化验单示例（示意）", font=font(36), fill=forest)
    d.text((70, 114), "不是某实验室真单。红框标出要拍清的格子。不能单凭此图下肥。", font=font(22), fill=ink)
    d.text((70, 148), "地块：华北某粮田（匿名）    取样：2026-03-18 · 0–20 cm · 12 点混合", font=font(22), fill=ink)
    rows = [
        ("项目", "结果", "单位", "读法（示意）"),
        ("pH（1:2.5 水浸）", "5.2", "—", "粮田低于约 5.5 才谈改酸"),
        ("EC", "0.28", "mS/cm", "偏低，不像盐害"),
        ("全盐", "0.08", "%", "和 EC 一起看"),
        ("有机质", "12.4", "g/kg", "储量，不是菌剂"),
        ("碱解氮", "68", "mg/kg", "对下部老叶匀黄"),
        ("有效磷", "9.5", "mg/kg", "先排除过酸"),
        ("速效钾", "82", "mg/kg", "对老叶焦边"),
        ("交换性铝", "2.8", "cmol/kg", "对根尖褐秃"),
        ("交换性钠", "0.4", "cmol/kg", "对湿泥干板"),
        ("ESP", "4", "%", "碱化度，不是白霜本身"),
        ("有效铁", "4.1", "mg/kg", "对新叶黄、脉还绿"),
        ("CEC", "11.2", "cmol/kg", "保肥容量"),
    ]
    y0 = 200
    row_h = 92
    cols = [70, 420, 620, 760]
    for i, row in enumerate(rows):
        y = y0 + i * row_h
        bg = "#efe8dc" if i == 0 else paper
        d.rectangle([55, y, W - 55, y + row_h], fill=bg, outline=line, width=1)
        for x, cell in zip(cols, row):
            d.text((x, y + 28), cell, font=font(24 if i else 26), fill=forest if i == 0 else ink)
    d.text((70, H - 90), "土知 · 看懂土地，种好地  ·  仅供学习对照", font=font(20), fill=forest)
    return img


def box_row(sheet: Image.Image, index: int, dest: Path) -> None:
    """index is 1-based data row (pH=1)."""
    y0 = 200
    row_h = 92
    y = y0 + index * row_h
    im = sheet.copy()
    d = ImageDraw.Draw(im)
    d.rectangle([52, y - 4, im.size[0] - 52, y + row_h + 4], outline="#b42318", width=6)
    crop = im.crop((0, max(0, y - 180), im.size[0], min(im.size[1], y + row_h + 220)))
    save_jpeg(crop, dest, max_side=1200)


def glare(sheet: Image.Image, dest: Path) -> None:
    im = sheet.copy().convert("RGB")
    overlay = Image.new("RGB", im.size, "#ffffff")
    im = Image.blend(im, overlay, 0.55)
    im = ImageEnhance.Contrast(im).enhance(0.45)
    im = im.filter(ImageFilter.GaussianBlur(radius=3))
    d = ImageDraw.Draw(im)
    d.ellipse([420, 260, 980, 720], fill="#ffffff")
    d.text((80, 80), "反光看不清数字  ·  别拍成这样", font=font(36), fill="#b42318")
    save_jpeg(im, dest)


def main() -> None:
    import urllib.parse

    sources: dict = {}
    if SRC_PATH.exists():
        sources = json.loads(SRC_PATH.read_text(encoding="utf-8"))

    sheet = draw_sheet()
    save_jpeg(sheet, IMG / "diagnose" / "lab-good.jpg", max_side=1400)
    glare(sheet, IMG / "diagnose" / "lab-bad.jpg")
    box_row(sheet, 1, IMG / "wiki" / "ph.jpg")
    box_row(sheet, 2, IMG / "wiki" / "ec.jpg")
    box_row(sheet, 4, IMG / "wiki" / "om.jpg")
    box_row(sheet, 8, IMG / "wiki" / "al.jpg")
    box_row(sheet, 9, IMG / "wiki" / "na.jpg")
    box_row(sheet, 3, IMG / "wiki" / "salt.jpg")
    box_row(sheet, 5, IMG / "wiki" / "alkn.jpg")
    box_row(sheet, 7, IMG / "wiki" / "avk.jpg")
    box_row(sheet, 11, IMG / "wiki" / "fe.jpg")
    box_row(sheet, 10, IMG / "wiki" / "esp.jpg")
    sources["/images/diagnose/lab-good.jpg"] = {
        "sourceUrl": "https://tuzhi.asia/diagnose",
        "credit": "土知绘制",
        "license": "site sample",
        "note": "化验单示例（示意），不是某实验室真单。",
        "kind": "lab",
        "role": "sheet",
    }
    sources["/images/diagnose/lab-bad.jpg"] = {
        "sourceUrl": "https://tuzhi.asia/diagnose",
        "credit": "土知绘制",
        "license": "site sample",
        "note": "反光示意，教人别这么拍。",
        "kind": "lab",
        "role": "sheet",
    }
    for key, idx_name in [
        ("ph", "pH 格子"),
        ("ec", "EC 格子"),
        ("om", "有机质格子"),
        ("al", "交换性铝格子"),
        ("na", "交换性钠格子"),
        ("salt", "全盐格子"),
        ("alkn", "碱解氮格子"),
        ("avk", "速效钾格子"),
        ("fe", "有效铁格子"),
        ("esp", "ESP 格子"),
    ]:
        sources[f"/images/wiki/{key}.jpg"] = {
            "sourceUrl": "https://tuzhi.asia/encyclopedia/" + key,
            "credit": "土知绘制",
            "license": "site sample",
            "note": f"化验单示例（示意），红框标出{idx_name}。不是园艺湿度计，不是风景照。",
            "kind": "lab",
            "role": "sheet",
        }

    for dest, name, credit, license_, note in FILES:
        im = fetch_commons(name)
        if im is None:
            continue
        path = IMG / dest
        save_jpeg(im, path)
        page = "https://commons.wikimedia.org/wiki/File:" + name.replace(" ", "_")
        sources["/" + str(Path("images") / dest)] = {
            "sourceUrl": page,
            "credit": credit,
            "license": license_,
            "note": note,
            "commons": name,
        }

    SRC_PATH.write_text(json.dumps(sources, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", SRC_PATH, "n=", len(sources))


if __name__ == "__main__":
    main()
