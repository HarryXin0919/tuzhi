#!/usr/bin/env python3
"""Download unique Wikimedia photos and draw unique lab-sheet samples."""
from __future__ import annotations

import json
import ssl
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "public" / "images"
SRC_PATH = IMG / "sources.json"
WIKI_PATH = ROOT / "src" / "data" / "wiki.json"
ART_PATH = ROOT / "src" / "data" / "articles.json"
EN_PATH = ROOT / "src" / "data" / "articles-en.json"
UA = "TuzhiAsia/1.0 (https://tuzhi.asia; g17612121666@gmail.com) soil-literacy educational reuse"
CTX = ssl.create_default_context()
FONTS = [
    ROOT / ".grok" / "fonts" / "NotoSerifSC-Regular.otf",
    Path("/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"),
    Path("/usr/share/fonts/opentype/noto/NotoSerifCJK-Regular.ttc"),
]

# dest relative to public/images, commons filename, credit, license, note, kind, role
DOWNLOADS: list[tuple[str, str, str, str, str, str, str]] = [
    (
        "articles/suan-hua-roots.jpg",
        "Aluminium toxocity maize roots 2017 01 05 6143.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "洗根后玉米根尖褐秃、侧根少。南非试验地，类型对照，不是邻垄自拍。",
        "lab",
        "mechanism",
    ),
    (
        "articles/suan-hua-field.jpg",
        "Zea mays acid soil 2017 01 05 6209.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "酸性土发僵玉米整垄。南非材料，类型对照。与 ph-2、诊断整株反例不是同一张。",
        "stock",
        "field",
    ),
    (
        "wiki/ph-2.jpg",
        "Zea mays acid soil 2017 01 05 6265e.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "偏低 pH 对得上粮田发僵。南非酸性土玉米，类型对照。与酸化主图不是同一张。",
        "stock",
        "field",
    ),
    (
        "diagnose/whole-bad.jpg",
        "Zea mays acid soil 2017 01 05 6259b.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "发僵玉米整垄，能看清症状铺开。南非材料，类型对照。",
        "stock",
        "field",
    ),
    (
        "diagnose/whole-good.jpg",
        "Crops in acid soil demo 2017 05 09 6717.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "示范地能看清整垄/整片分布，用来对照点片黄还是整块黄。南非材料，类型对照。",
        "stock",
        "field",
    ),
    (
        "diagnose/close-good.jpg",
        "Gesunde Wurzeln.jpg",
        "Rasbak",
        "CC BY-SA 3.0",
        "健康白根特写：白尖还在、侧根清楚。实验室/洗根对照，不是水下红树。",
        "lab",
        "field",
    ),
    (
        "articles/healthy-white-roots.jpg",
        "Gesunde Wurzeln.jpg",
        "Rasbak",
        "CC BY-SA 3.0",
        "健康白根特写。洗根对照。",
        "lab",
        "mechanism",
    ),
    (
        "articles/leng-hai-cauli.jpg",
        "Blumenkohl-Winter-Frostschäden-Josef Schlaghecken-1.jpg",
        "Josef Schlaghecken",
        "CC BY-SA 4.0",
        "花椰菜冻害焦边。冷害对照，德国材料，类型对照，不是酸化根尖。",
        "stock",
        "contrast-other",
    ),
    (
        "articles/yan-shuang-chaka.jpg",
        "茶卡盐湖湖面10.jpg",
        "Wikimedia contributor",
        "CC BY-SA 4.0",
        "青海茶卡盐湖盐壳土面。中国盐霜类型对照，不是自家粮田。",
        "stock",
        "field",
    ),
    (
        "wiki/salt-2.jpg",
        "茶卡盐湖湖面10.jpg",
        "Wikimedia contributor",
        "CC BY-SA 4.0",
        "中国青海茶卡盐湖盐壳。全盐/盐霜土面类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/al-2.jpg",
        "Aluminium toxocity maize roots 2017 01 05 6164.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "铝毒洗根：褐秃根尖。与酸化篇主根图不是同一张。",
        "lab",
        "field",
    ),
    (
        "diagnose/close-bad.jpg",
        "Aluminium toxocity maize roots 2017 01 05 6274.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "特写反例底图。脚本会再做一张拍糊示意。",
        "lab",
        "field",
    ),
    (
        "wiki/p-2.jpg",
        "Niedobór fosforu, objawy.JPG",
        "Mieszkanko",
        "CC BY-SA 3.0",
        "缺磷叶色发紫。用来和铝毒根尖分开，不要把紫茎当成酸化根。",
        "stock",
        "field",
    ),
    (
        "wiki/avp-2.jpg",
        "2005 1214 0928 Hlokozi - Acid-induced P deficiency.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "过酸诱发的缺磷紫茎。有效磷格子对得上的地头样子。",
        "stock",
        "field",
    ),
    (
        "wiki/n-2.jpg",
        "Phaseolus vulgaris nitrogen deficiency.jpg",
        "Rasbak",
        "CC BY-SA 3.0",
        "菜豆缺氮：下部老叶匀黄。",
        "stock",
        "field",
    ),
    (
        "wiki/alkn-2.jpg",
        "Brassica oleracea Cauliflower Bloemkool stikstofgebrek.jpg",
        "Rasbak",
        "CC BY-SA 3.0",
        "花椰菜缺氮黄叶。碱解氮格子的地头对照。",
        "stock",
        "field",
    ),
    (
        "wiki/k-2.jpg",
        "K-deficient maize on Cedara 1 2003-01-13.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "玉米缺钾老叶焦边。",
        "stock",
        "field",
    ),
    (
        "wiki/avk-2.jpg",
        "K-deficient maize on Cedara 2 2003-01-13.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "玉米缺钾叶缘焦枯特写。",
        "stock",
        "field",
    ),
    (
        "wiki/zn-2.jpg",
        "Zinc-deficient maize plants.jpg",
        "CIMMYT / Wikimedia",
        "CC BY-SA 3.0",
        "玉米缺锌。新叶条纹黄白。",
        "stock",
        "field",
    ),
    (
        "wiki/b-2.jpg",
        "Banana (Musa sp.)- Boron deficiency and black leaf streak disease.jpg",
        "Scot Nelson",
        "Public domain",
        "香蕉缺硼叶缘皱缩。类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/cu-2.jpg",
        "Starr-120608-7321-Brassica rapa-broccoli rabe leaf with copper deficiency-Ulupalakua Ranch-Maui (24777617959).jpg",
        "Forest & Kim Starr",
        "CC BY 3.0",
        "叶菜缺铜。类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/mn-2.jpg",
        "Manganese-deficiency-rose.jpg",
        "Wikimedia",
        "CC BY-SA 3.0",
        "缺锰脉间黄。类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/fe-2.jpg",
        "Chlorose ferrique sur Citrus aurantium.jpg",
        "INRA / Wikimedia",
        "CC BY-SA 4.0",
        "柑橘缺铁：新叶黄、叶脉还绿。",
        "stock",
        "field",
    ),
    (
        "wiki/gley-2.jpg",
        "Gleying in glacial till - geograph.org.uk - 351899.jpg",
        "Richard Webb",
        "CC BY-SA 2.0",
        "潜育蓝灰土层。类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/aggregate-2.jpg",
        "Douglas County, SD, Soil Structure on April 27, 2015 (17207379368).jpg",
        "USDA NRCS",
        "Public domain (US federal)",
        "耕层团粒结构。类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/texture-2.jpg",
        "Struktury gleby.jpg",
        "Wikimedia",
        "CC BY-SA 3.0",
        "土壤结构/质地对照。",
        "lab",
        "field",
    ),
    (
        "wiki/esp-2.jpg",
        "CSIRO ScienceImage 2512 Bleachedsodic Sulfuric Hypersalic Hydrosol soil profile near Gillman South Australia.jpg",
        "CSIRO",
        "CC BY 3.0",
        "漂白碱化剖面。ESP 地头类型对照，澳大利亚材料。",
        "lab",
        "field",
    ),
    (
        "wiki/na-2.jpg",
        "Sodic Solonchak.JPG",
        "Ji-Elle",
        "CC BY-SA 3.0",
        "新疆吐鲁番苏打盐土剖面。ISRIC 博物馆对照。",
        "lab",
        "field",
    ),
    (
        "wiki/ec-2.jpg",
        "CSIRO ScienceImage 3924 Petrocalcic Sulfidic Hypersalic Hydrosol soil profile in the Cooke Plains district of South Australia.jpg",
        "CSIRO",
        "CC BY 3.0",
        "高盐剖面。电导偏高时地里可能对上的样子，澳大利亚材料。",
        "lab",
        "field",
    ),
    (
        "wiki/om-2.jpg",
        "Soybean Field with Healthy Soil (9316804120).jpg",
        "USDA NRCS",
        "Public domain (US federal)",
        "有机质尚可的耕层土色。类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/acid-2.jpg",
        "Crops in acid soil demo 2017 05 09 6758.jpg",
        "Alandmanson",
        "CC BY 4.0",
        "酸性土示范地作物。与 pH 地头图不是同一张。",
        "stock",
        "field",
    ),
    (
        "wiki/saline-2.jpg",
        "Solontchak.jpg",
        "Hedwig Storch",
        "CC BY-SA 3.0",
        "盐土剖面。奥地利材料，类型对照。",
        "lab",
        "field",
    ),
    (
        "wiki/compaction-2.jpg",
        "Ernteschäden.jpg",
        "F. Bucher",
        "CC BY-SA 3.0",
        "机械压出的车辙与板结。",
        "stock",
        "field",
    ),
    (
        "wiki/bulk-2.jpg",
        "Compact soil.jpg",
        "USDA NRCS",
        "Public domain (US federal)",
        "紧实土面。容重偏高时地里对得上的样子。",
        "stock",
        "field",
    ),
    (
        "wiki/fc-2.jpg",
        "A waterlogged meadow on the southern shore of Llyn Traffwll - geograph.org.uk - 774100.jpg",
        "Eric Jones",
        "CC BY-SA 2.0",
        "地表积水。田间持水量/涝害对照。",
        "stock",
        "field",
    ),
    (
        "articles/que-tong.jpg",
        "Starr-120608-7321-Brassica rapa-broccoli rabe leaf with copper deficiency-Ulupalakua Ranch-Maui (24777617959).jpg",
        "Forest & Kim Starr",
        "CC BY 3.0",
        "叶菜缺铜。不再复用缺氮图。",
        "stock",
        "field",
    ),
    (
        "wiki/cl-2.jpg",
        "Chaka Salt Lake 茶卡盐湖 - panoramio.jpg",
        "Wikimedia / panoramio",
        "CC BY 3.0",
        "盐壳景观。氯离子偏高时常见盐霜土面，类型对照。",
        "stock",
        "field",
    ),
    (
        "wiki/si-2.jpg",
        "201907 Rice Field in Yongchang, Lanxi.jpg",
        "Zhangzhugang",
        "CC BY-SA 4.0",
        "浙江兰溪水田。有效硅常跟水稻叶姿对看。中国地头。",
        "field",
        "field",
    ),
    (
        "wiki/ca-2.jpg",
        "Phaseolus vulgaris nitrogen deficiency.jpg",
        "Rasbak",
        "CC BY-SA 3.0",
        "钙低时常和顶腐/空荚一起认，这张先作叶色线索，花生空荚另见知识篇。",
        "stock",
        "field",
    ),
    (
        "wiki/mg-2.jpg",
        "Citrus limon leaf - unidentified deficiency.jpg",
        "Wikimedia",
        "CC BY-SA 3.0",
        "脉间黄的叶，镁低时老叶先这样。类型对照，不是处方。",
        "stock",
        "field",
    ),
    (
        "wiki/s-2.jpg",
        "Brassica oleracea Cauliflower Bloemkool stikstofgebrek.jpg",
        "Rasbak",
        "CC BY-SA 3.0",
        "硫低有时像缺氮但新叶也黄。此图作对照线索。",
        "stock",
        "field",
    ),
    (
        "wiki/mo-2.jpg",
        "Banana (Musa sp.)- Boron deficiency and black leaf streak disease.jpg",
        "Scot Nelson",
        "Public domain",
        "钼低在十字花科更明显。此图只作微量元素叶形线索，详见知识篇。",
        "stock",
        "field",
    ),
    (
        "wiki/cec-2.jpg",
        "Amostragem-de-solo-com-estrutura-preservada.jpg",
        "Wikimedia",
        "CC BY-SA 4.0",
        "保持结构的耕层取样。CEC 是保肥容量，要看土不是看叶子。",
        "lab",
        "field",
    ),
    (
        "wiki/porosity-2.jpg",
        "Soybean Field with Healthy Soil (9316804120).jpg",
        "USDA NRCS",
        "Public domain (US federal)",
        "孔隙好的耕层土色。与有机质地头图若撞文件，脚本会改用团粒图。",
        "stock",
        "field",
    ),
    (
        "wiki/replant-2.jpg",
        "Compact soil.jpg",
        "USDA NRCS",
        "Public domain (US federal)",
        "重茬地常见紧实土面。连作障碍对照线索。",
        "stock",
        "field",
    ),
    (
        "wiki/test-2.jpg",
        "CSIRO ScienceImage 1739 Testing soil pH.jpg",
        "CSIRO",
        "CC BY 3.0",
        "实验室测土，不是化验单格子本身。测土报告词条的地头/实验室对照。",
        "lab",
        "field",
    ),
]

SHEET_ROWS = [
    ("项目", "结果", "单位", "读法（示意）"),
    ("pH（1:2.5 水浸）", "5.2", "—", "粮田低于约 5.5 才谈改酸"),
    ("EC", "0.28", "mS/cm", "偏低，不像盐害"),
    ("全盐", "0.08", "%", "和 EC 一起看"),
    ("有机质", "12.4", "g/kg", "储量，不是菌剂商品名"),
    ("碱解氮", "68", "mg/kg", "对下部老叶匀黄"),
    ("有效磷", "9.5", "mg/kg", "先排除过酸"),
    ("速效钾", "82", "mg/kg", "对老叶焦边"),
    ("交换性铝", "2.8", "cmol/kg", "对根尖褐秃"),
    ("交换性钠", "0.4", "cmol/kg", "对湿泥干板"),
    ("ESP", "4", "%", "碱化度，不是白霜本身"),
    ("有效铁", "4.1", "mg/kg", "对新叶黄、脉还绿"),
    ("CEC", "11.2", "cmol/kg", "保肥容量"),
    ("有效锌", "0.7", "mg/kg", "对新叶条纹"),
    ("有效硼", "0.3", "mg/kg", "对花而不实"),
    ("交换性钙", "6.2", "cmol/kg", "对顶腐空荚"),
    ("交换性镁", "1.1", "cmol/kg", "对老叶脉间黄"),
    ("有效锰", "8.0", "mg/kg", "对脉间黄"),
    ("有效硫", "12", "mg/kg", "和新叶一起看"),
    ("有效铜", "0.4", "mg/kg", "对新叶失绿"),
    ("有效钼", "0.08", "mg/kg", "对花而不实"),
    ("氯离子", "48", "mg/kg", "和盐霜一起看"),
    ("有效硅", "80", "mg/kg", "水稻叶姿线索"),
    ("容重", "1.42", "g/cm³", "对板结难下扎"),
    ("质地", "中壤", "—", "手测砂黏"),
    ("团粒", "中等", "—", "湿不泥干不板"),
    ("孔隙度", "48", "%", "对通气"),
    ("田间持水量", "22", "%", "对浇水间隔"),
    ("潜育", "见蓝灰", "—", "对长期渍水"),
    ("酸化程度", "中", "—", "跟 pH 一起读"),
    ("盐渍化", "轻", "—", "跟 EC 一起读"),
    ("紧实度", "偏紧", "—", "对犁底层"),
    ("检测项目", "常规+中微量", "—", "先圈格子再下地"),
    ("连作风险", "中", "—", "对重茬"),
]

TERM_ROW = {
    "ph": 1,
    "ec": 2,
    "salt": 3,
    "om": 4,
    "alkn": 5,
    "n": 5,
    "p": 6,
    "avp": 6,
    "k": 7,
    "avk": 7,
    "al": 8,
    "na": 9,
    "esp": 10,
    "fe": 11,
    "cec": 12,
    "zn": 13,
    "b": 14,
    "ca": 15,
    "mg": 16,
    "mn": 17,
    "s": 18,
    "cu": 19,
    "mo": 20,
    "cl": 21,
    "si": 22,
    "bulk": 23,
    "texture": 24,
    "aggregate": 25,
    "porosity": 26,
    "fc": 27,
    "gley": 28,
    "acid": 29,
    "saline": 30,
    "compaction": 31,
    "test": 32,
    "replant": 33,
}

TERM_ZH = {
    "ph": "pH",
    "ec": "EC",
    "salt": "全盐",
    "om": "有机质",
    "alkn": "碱解氮",
    "n": "氮",
    "p": "磷",
    "avp": "有效磷",
    "k": "钾",
    "avk": "速效钾",
    "al": "交换性铝",
    "na": "交换性钠",
    "esp": "ESP",
    "fe": "有效铁",
    "cec": "CEC",
    "zn": "有效锌",
    "b": "有效硼",
    "ca": "交换性钙",
    "mg": "交换性镁",
    "mn": "有效锰",
    "s": "有效硫",
    "cu": "有效铜",
    "mo": "有效钼",
    "cl": "氯离子",
    "si": "有效硅",
    "bulk": "容重",
    "texture": "质地",
    "aggregate": "团粒",
    "porosity": "孔隙度",
    "fc": "田间持水量",
    "gley": "潜育",
    "acid": "酸化程度",
    "saline": "盐渍化",
    "compaction": "紧实度",
    "test": "检测项目",
    "replant": "连作风险",
}


def font(size: int) -> ImageFont.FreeTypeFont:
    for p in FONTS:
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size=size)
            except OSError:
                try:
                    return ImageFont.truetype(str(p), size=size, index=0)
                except OSError:
                    continue
    return ImageFont.load_default()


def fetch_commons(name: str) -> Image.Image | None:
    api = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(
        {
            "action": "query",
            "titles": "File:" + name,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata",
            "iiurlwidth": 1600,
            "format": "json",
        }
    )
    req = urllib.request.Request(api, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=40, context=CTX) as r:
            data = json.loads(r.read().decode())
        pages = data.get("query", {}).get("pages", {})
        info = None
        for pg in pages.values():
            if pg.get("imageinfo"):
                info = pg["imageinfo"][0]
                break
        url = (info or {}).get("thumburl") or (info or {}).get("url")
        if not url:
            raise RuntimeError("no url")
        req2 = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req2, timeout=60, context=CTX) as r2:
            raw = r2.read()
        im = Image.open(BytesIO(raw)).convert("RGB")
        print("OK", name, im.size)
        return im
    except Exception as e:
        # fallback Special:FilePath
        try:
            url = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(name)
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
                raw = r.read()
            im = Image.open(BytesIO(raw)).convert("RGB")
            print("OK-fallback", name, im.size)
            return im
        except Exception as e2:
            print("FAIL", name, e, e2)
            return None


def save_jpeg(im: Image.Image, dest: Path, max_side=1400) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    im.save(dest, "JPEG", quality=86, optimize=True)


def draw_sheet() -> Image.Image:
    paper, ink, forest, line = "#f6f1e8", "#1c1917", "#2f5d32", "#e6ddd0"
    n = len(SHEET_ROWS)
    row_h = 54
    W, H = 1200, 160 + n * row_h + 80
    img = Image.new("RGB", (W, H), paper)
    d = ImageDraw.Draw(img)
    d.rectangle([32, 28, W - 32, H - 28], outline=line, width=3)
    d.text((56, 40), "土知  测土化验单示例（示意）", font=font(28), fill=forest)
    d.text((56, 76), "不是某实验室真单。红框标出要拍清的格子。不能单凭此图下肥。", font=font(18), fill=ink)
    d.text((56, 102), "地块：华北某粮田（匿名）    取样：2026-03-18 · 0–20 cm · 12 点混合", font=font(16), fill=ink)
    cols = [56, 360, 520, 640]
    y0 = 140
    for i, row in enumerate(SHEET_ROWS):
        y = y0 + i * row_h
        bg = "#efe8dc" if i == 0 else paper
        d.rectangle([40, y, W - 40, y + row_h], fill=bg, outline=line, width=1)
        for x, cell in zip(cols, row):
            d.text((x, y + 14), cell, font=font(18 if i else 20), fill=forest if i == 0 else ink)
    d.text((56, H - 48), "土知 · 看懂土地，种好地  ·  仅供学习对照", font=font(16), fill=forest)
    return img, y0, row_h


def box_row(sheet: Image.Image, y0: int, row_h: int, index: int, dest: Path, label: str) -> None:
    y = y0 + index * row_h
    im = sheet.copy()
    d = ImageDraw.Draw(im)
    d.rectangle([36, y - 3, im.size[0] - 36, y + row_h + 3], outline="#b42318", width=5)
    d.text((56, 16), f"红框：{label}", font=font(18), fill="#b42318")
    crop = im.crop((0, max(0, y - 160), im.size[0], min(im.size[1], y + row_h + 200)))
    save_jpeg(crop, dest, max_side=1200)


def glare(sheet: Image.Image, dest: Path) -> None:
    im = sheet.copy().convert("RGB")
    overlay = Image.new("RGB", im.size, "#ffffff")
    im = Image.blend(im, overlay, 0.55)
    im = ImageEnhance.Contrast(im).enhance(0.45)
    im = im.filter(ImageFilter.GaussianBlur(radius=3))
    d = ImageDraw.Draw(im)
    d.ellipse([420, 220, 980, 620], fill="#ffffff")
    d.text((56, 40), "反光看不清数字  ·  别拍成这样", font=font(28), fill="#b42318")
    save_jpeg(im, dest)


def make_blur_bad(src: Path, dest: Path) -> bool:
    if not src.exists():
        return False
    im = Image.open(src).convert("RGB")
    im = im.filter(ImageFilter.GaussianBlur(radius=8))
    im = ImageEnhance.Brightness(im).enhance(0.7)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, im.size[0], 70], fill="#b42318")
    d.text((16, 18), "拍糊了，叶位和根尖看不清  ·  别拍成这样", font=font(28), fill="#f6f1e8")
    save_jpeg(im, dest)
    return True


def md5(p: Path) -> str:
    import hashlib

    return hashlib.md5(p.read_bytes()).hexdigest()


def main() -> None:
    sources: dict = {}
    if SRC_PATH.exists():
        sources = json.loads(SRC_PATH.read_text(encoding="utf-8"))

    sheet, y0, row_h = draw_sheet()
    save_jpeg(sheet, IMG / "diagnose" / "lab-good.jpg", max_side=1400)
    glare(sheet, IMG / "diagnose" / "lab-bad.jpg")
    for tid, idx in TERM_ROW.items():
        dest = IMG / "wiki" / f"{tid}.jpg"
        box_row(sheet, y0, row_h, idx, dest, TERM_ZH.get(tid, tid))
        sources[f"/images/wiki/{tid}.jpg"] = {
            "sourceUrl": f"https://tuzhi.asia/encyclopedia/{tid}",
            "credit": "土知绘制",
            "license": "site sample",
            "note": f"化验单示例（示意），红框标出{TERM_ZH.get(tid, tid)}格子。",
            "kind": "lab",
            "role": "sheet",
        }
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

    used_hash: dict[str, str] = {}
    for dest, name, credit, license_, note, kind, role in DOWNLOADS:
        path = IMG / dest
        im = fetch_commons(name)
        if im is None:
            continue
        save_jpeg(im, path)
        h = md5(path)
        if h in used_hash and used_hash[h] != dest:
            print("DUP-after-download", dest, "same as", used_hash[h])
        used_hash[h] = dest
        page = "https://commons.wikimedia.org/wiki/File:" + name.replace(" ", "_")
        sources["/" + str(Path("images") / dest)] = {
            "sourceUrl": page,
            "credit": credit,
            "license": license_,
            "note": note,
            "commons": name,
            "kind": kind,
            "role": role,
        }

    # how-not-to-shoot close-up: blur a real root/leaf photo
    blur_src = IMG / "articles" / "suan-hua-roots.jpg"
    if not blur_src.exists():
        blur_src = IMG / "diagnose" / "close-good.jpg"
    if make_blur_bad(blur_src, IMG / "diagnose" / "close-bad.jpg"):
        sources["/images/diagnose/close-bad.jpg"] = {
            "sourceUrl": sources.get("/images/articles/suan-hua-roots.jpg", {}).get("sourceUrl", "https://tuzhi.asia/diagnose"),
            "credit": "土知处理（原图 Wikimedia，已模糊）",
            "license": "derived",
            "note": "把真实特写故意拍糊，教人别这么拍。不是地头症状正例。",
            "kind": "diagram",
            "role": "field",
        }

    SRC_PATH.write_text(json.dumps(sources, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", SRC_PATH, "n=", len(sources))

    # patch wiki.json photo srcs/roles/captions for downloaded field images
    wiki = json.loads(WIKI_PATH.read_text(encoding="utf-8"))
    for tid, pack in wiki.items():
        photos = pack.get("photos") or []
        sheet_src = f"/images/wiki/{tid}.jpg"
        field_src = f"/images/wiki/{tid}-2.jpg"
        field_meta = sources.get(field_src, {})
        sheet_photo = {
            "src": sheet_src,
            "alt": f"化验单示例（示意），红框{TERM_ZH.get(tid, tid)}",
            "caption": f"拍的是化验单示意。用来说明单子上怎么写{TERM_ZH.get(tid, tid)}。土知绘制，不是某实验室真单。类型：化验单示意。",
            "kind": "lab",
            "role": "sheet",
            "credit": "土知绘制",
            "sourceUrl": f"https://tuzhi.asia/encyclopedia/{tid}",
            "altEn": f"Sample lab sheet, {tid} cell boxed",
            "captionEn": f"Sample sheet with the {tid} cell boxed. Diagram, not a real lab report. Do not fertilise from it.",
        }
        if (IMG / "wiki" / f"{tid}-2.jpg").exists() and field_meta:
            field_photo = {
                "src": field_src,
                "alt": field_meta.get("note", "地头对照")[:40],
                "caption": f"拍的是地头/剖面对照。用来说明{TERM_ZH.get(tid, tid)}能对上地里哪种样子。来源 {field_meta.get('sourceUrl','')}。类型：地头实物或实验室对照。",
                "kind": field_meta.get("kind", "stock"),
                "role": "field",
                "credit": field_meta.get("credit", ""),
                "sourceUrl": field_meta.get("sourceUrl", ""),
                "altEn": field_meta.get("note", "Field match")[:80],
                "captionEn": field_meta.get("note", "Field match for this cell."),
            }
        else:
            # keep previous field photo if any
            prev = next((p for p in photos if p.get("role") == "field" or str(p.get("src", "")).endswith("-2.jpg")), photos[1] if len(photos) > 1 else None)
            field_photo = prev or {
                "src": "/images/missing.svg",
                "alt": f"{TERM_ZH.get(tid, tid)}地头对照待补",
                "caption": f"地头对照图待补。计划来源：Wikimedia 与农技站明白纸。类型：待补。",
                "kind": "missing",
                "role": "field",
                "credit": "",
                "sourceUrl": "",
                "altEn": "Field match still to add",
                "captionEn": "Field photo still to add. Planned source: Wikimedia or extension leaflets.",
            }
        pack["photos"] = [sheet_photo, field_photo]
    WIKI_PATH.write_text(json.dumps(wiki, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("patched wiki photos", len(wiki))

    # patch key article captions for replaced files
    arts = json.loads(ART_PATH.read_text(encoding="utf-8"))
    en = json.loads(EN_PATH.read_text(encoding="utf-8"))
    cap = {
        "/images/articles/suan-hua-roots.jpg": (
            "铝毒伤根后的褐秃根尖（洗根）",
            "拍的是洗出来的玉米根。用来说明根尖褐、秃、侧根很少。试验地洗根，不是整株紫茎。来源 Wikimedia Al toxicity 6143。类型：实验室对照。",
            "Washed maize roots with aluminium toxicity",
            "Washed maize roots: brown, stubby tips, few laterals. A trial-plot wash, not a purple-stem whole plant.",
        ),
        "/images/articles/suan-hua-field.jpg": (
            "酸性土上发僵的玉米整垄",
            "拍的是发僵玉米整垄。用来说明地上先认发僵。南非酸性土，类型对照。与化验词 pH 地头图不是同一张。",
            "Stalled maize on acid soil",
            "Stalled maize stand. Type check. Not the same file as the pH field photo.",
        ),
    }
    for a in arts:
        for p in a.get("photos") or []:
            hit = cap.get(p.get("src"))
            if not hit:
                continue
            p["alt"], p["caption"], p["altEn"], p["captionEn"] = hit
            if "suan-hua-roots" in p.get("src", ""):
                p["sourceUrl"] = "https://commons.wikimedia.org/wiki/File:Aluminium_toxocity_maize_roots_2017_01_05_6143.jpg"
                p["kind"] = "lab"
                p["role"] = "mechanism"
            if "suan-hua-field" in p.get("src", ""):
                p["sourceUrl"] = "https://commons.wikimedia.org/wiki/File:Zea_mays_acid_soil_2017_01_05_6209.jpg"
        for c in a.get("confuse") or []:
            for p in c.get("photos") or []:
                if p.get("src") == "/images/articles/suan-hua-roots.jpg":
                    p["alt"], p["caption"], p["altEn"], p["captionEn"] = cap["/images/articles/suan-hua-roots.jpg"]
                    p["sourceUrl"] = "https://commons.wikimedia.org/wiki/File:Aluminium_toxocity_maize_roots_2017_01_05_6143.jpg"
                if "leng-hai" in str(p.get("src")):
                    continue
            # attach cold-injury photo to suan-hua confuse[1]
        if a.get("slug") == "suan-hua" and (IMG / "articles" / "leng-hai-cauli.jpg").exists():
            if len(a["confuse"]) > 1:
                a["confuse"][1]["photos"] = [
                    {
                        "src": "/images/articles/leng-hai-cauli.jpg",
                        "alt": "花椰菜冻害焦边（冷害对照）",
                        "caption": "拍的是冻害焦边。用来说明冷害像发僵但回暖能缓。德国材料，类型对照。酸化回暖也不长新白根。类型：地头实物。",
                        "kind": "stock",
                        "role": "contrast-other",
                        "credit": "Josef Schlaghecken",
                        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Blumenkohl-Winter-Frostsch%C3%A4den-Josef_Schlaghecken-1.jpg",
                        "altEn": "Frost damage on cauliflower",
                        "captionEn": "Cold injury scorch. Type check. Acid stall does not grow new white roots after a warm spell.",
                    },
                    {
                        "src": "/images/articles/suan-hua-field.jpg",
                        "alt": "酸化发僵整垄",
                        "caption": "真正这篇：回暖仍僵。和冻害对照着看。",
                        "kind": "stock",
                        "role": "contrast-this",
                        "credit": "Alandmanson",
                        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Zea_mays_acid_soil_2017_01_05_6209.jpg",
                        "altEn": "Acid-soil stall",
                        "captionEn": "This problem: still stalled after a warm spell.",
                    },
                ]
        if a.get("slug") == "yan-jian" and (IMG / "articles" / "yan-shuang-chaka.jpg").exists():
            photos = a.get("photos") or []
            if not any("yan-shuang-chaka" in (p.get("src") or "") for p in photos):
                photos.append(
                    {
                        "src": "/images/articles/yan-shuang-chaka.jpg",
                        "alt": "中国盐霜土面（青海茶卡）",
                        "caption": "拍的是盐壳土面。用来说明白霜/盐壳长什么样。青海茶卡盐湖，类型对照，不是自家粮田。类型：地头实物。",
                        "kind": "stock",
                        "role": "field",
                        "credit": "Wikimedia",
                        "sourceUrl": "https://commons.wikimedia.org/wiki/File:%E8%8C%B6%E5%8D%A1%E7%9B%90%E6%B9%96%E6%B9%96%E9%9D%A210.jpg",
                        "altEn": "Salt crust, Chaka Salt Lake, Qinghai",
                        "captionEn": "China salt-crust surface. Type check, not one named grain field.",
                    }
                )
                a["photos"] = photos
    ART_PATH.write_text(json.dumps(arts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("patched article captions")


if __name__ == "__main__":
    main()
