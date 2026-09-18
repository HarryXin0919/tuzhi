#!/usr/bin/env python3
"""Patch photos + thicken priority ZH/EN copy. Does not touch dosage numbers."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
ART = json.loads((ROOT / "src/data/articles.json").read_text(encoding="utf-8"))
EN = json.loads((ROOT / "src/data/articles-en.json").read_text(encoding="utf-8"))
ENR = json.loads((ROOT / "src/data/enrich.json").read_text(encoding="utf-8"))
WIKI = json.loads((ROOT / "src/data/wiki.json").read_text(encoding="utf-8"))
SRC = json.loads((ROOT / "public/images/sources.json").read_text(encoding="utf-8"))


def P(src: str, alt: str, cap: str, kind: str, role: str, alt_en: str, cap_en: str) -> dict:
    rec = SRC.get(src, {})
    return {
        "src": src,
        "alt": alt,
        "caption": cap,
        "kind": kind,
        "role": role,
        "credit": rec.get("credit") or "土知",
        "sourceUrl": rec.get("sourceUrl") or "",
        "altEn": alt_en,
        "captionEn": cap_en,
    }


def art(slug: str) -> dict:
    return next(a for a in ART if a["slug"] == slug)


# ---------- photos ----------
art("suan-hua")["photos"] = [
    P("/images/articles/suan-hua-field.jpg", "酸性土上发僵的玉米整垄", "拍的是发僵玉米整垄。用来说明地上先认发僵，不要只看黄叶。南非夸祖鲁-纳塔尔酸性土，类型对照，不是华北某一块地。", "stock", "field", "Stalled maize on acid soil", "Stalled maize stand. Type check from KwaZulu-Natal, not one named North China field."),
    P("/images/articles/suan-hua-roots.jpg", "铝毒伤根后的褐秃根尖", "拍的是洗出来的玉米根。用来说明根尖褐、秃、侧根很少。试验地洗根，不是邻垄自拍。", "lab", "mechanism", "Maize roots with aluminium toxicity", "Washed maize roots: brown, stubby tips, few laterals. A trial-plot wash, not your own ridge."),
    P("/images/articles/suan-hua.jpg", "实验室麦苗根部对照", "实验室根部对照，不是地头邻垄。只作辅图。", "lab", "mechanism", "Lab wheat roots", "Lab root check, not a neighbour ridge. Secondary image only."),
    P("/images/articles/shi-hui-yong-liang.jpg", "农用石灰包装", "看包装认农用石灰，不是建筑石灰。", "field", "material", "Agricultural lime bag", "Read the bag: agricultural lime, not builder’s lime."),
]
art("suan-hua")["confuse"][0]["photos"] = [
    P("/images/articles/que-dan-bean.jpg", "缺氮：下部老叶匀黄", "像在哪：下部老叶匀黄。差在哪：根往往还白，顶上新叶还绿。看错了会猛尿素。", "field", "contrast-other", "Nitrogen deficiency, old leaves yellow", "Old leaves evenly yellow — easy to mix with acid stall. Roots are usually still white."),
    P("/images/articles/suan-hua-roots.jpg", "酸化：根尖褐秃", "真正这篇：根尖褐秃、侧根很少。地里一眼分开就靠洗根。", "lab", "contrast-this", "Acid soil root tips", "This problem: brown stubby tips. Wash the roots to tell them apart."),
]
art("suan-hua")["confuse"][1]["photos"] = [
    P("/images/articles/suan-hua-field.jpg", "回暖后仍发僵的苗", "冷害回暖几天会缓。酸化回暖也不长新白根。这张是酸性土发僵，类型对照。冷害对照图待补。", "stock", "contrast-this", "Stand that stays stalled after a warm spell", "Acid-soil stall. A true cold-injury lookalike photo is still to be added."),
]

art("yan-jian")["photos"] = [
    P("/images/articles/yan-jian-sodic.jpg", "吐鲁番苏打盐土剖面", "拍的是新疆吐鲁番苏打盐土剖面。用来说明钠高、湿泥干板。ISRIC 博物馆剖面，实验室对照，不是自家地头。", "lab", "field", "Turpan sodic solonchak profile", "Turpan, Xinjiang sodic solonchak. Museum profile, not your own field."),
    P("/images/articles/yan-jian-solonchak.jpg", "盐土剖面类型对照", "盐土剖面。奥地利材料，类型对照，用来看白色盐积层，不是华北某一块地。", "stock", "mechanism", "Solonchak profile", "Solonchak profile (Austria). Type check for a salt horizon."),
    P("/images/diagnose/soil-bad.jpg", "盐分测定时的土面", "拍土面要能看清白霜或盐斑。澳大利亚盐分测定现场，类型对照。", "stock", "field", "Soil surface at a salinity test", "Shoot the surface so salt shows. CSIRO salinity test, type check."),
    P("/images/articles/yan-jian-2.jpg", "田里土面白霜", "田里土面白霜，要和出苗、叶缘一起看。", "field", "field", "White crust in the field", "White crust with patchy emergence."),
]
art("yan-jian")["confuse"][0]["photos"] = [
    P("/images/articles/que-jia-maize1.jpg", "缺钾焦边", "像在哪：叶缘焦。差在哪：缺钾土面不一定白，盐害常有白霜、浇完更蔫。", "field", "contrast-other", "Potassium scorch", "Margin scorch without a salt crust is closer to potassium."),
    P("/images/diagnose/soil-bad.jpg", "盐害土面", "真正盐害要先拍土面和出苗，不要先补钾。", "stock", "contrast-this", "Saline surface", "Salt: shoot the crust first, do not add potassium yet."),
]

art("ban-jie")["photos"] = [
    P("/images/articles/ban-jie-tracks.jpg", "收获机压出的车辙", "拍的是机械压出的车辙。用来说明湿土进车最容易板结。德国材料，类型对照。", "stock", "field", "Harvest traffic ruts", "Ruts from harvest traffic. Type check (Germany), not one named Chinese field."),
    P("/images/articles/ban-jie-erosion.jpg", "压实后径流冲刷", "拍的是压实后的侵蚀。用来说明孔隙少、水过不去。类型对照。", "stock", "mechanism", "Runoff on compacted soil", "Runoff after compaction. Type check."),
    P("/images/articles/ban-jie.jpg", "干了发硬的土面", "干了发硬的土面。锄头弹回来才像这篇。", "field", "field", "Hard dry cap", "A hard dry cap that bounces the hoe."),
    P("/images/articles/ban-jie-yu-gen-xi.jpg", "根碰到硬盖拐弯", "根横走。对照剖面。", "field", "mechanism", "Roots turning at a pan", "Roots running sideways at a pan."),
]

art("you-ji-zhi")["photos"] = [
    P("/images/articles/you-ji-zhi-sample.jpg", "耕层取样看土色和结构", "拍的是保持结构的耕层土。用来说明要看土色、能不能搓团。类型对照。", "stock", "field", "Plough-layer sample", "A structured plough-layer sample. Type check for colour and crumb."),
    P("/images/articles/you-ji-zhi.jpg", "浅色麦田土面发干", "浅色散土，一把就散。", "field", "field", "Pale dry cereal field", "Pale soil that will not hold a ball."),
    P("/images/articles/jie-gan-huan-tian.jpg", "秸秆还田", "还田是养有机质的路，不是一季堆满。", "field", "mechanism", "Straw return", "Straw return builds the reserve over years."),
    P("/images/articles/sha-tu-zeng-you-ji-zhi.jpg", "沙土留不住", "沙土少量多次。", "field", "mechanism", "Sandy soil", "Sandy soil will not hold a dump of organic matter."),
]

art("que-dan")["photos"] = [
    P("/images/articles/que-dan-bean.jpg", "菜豆下部老叶匀黄", "拍的是下部老叶匀黄。用来说明缺氮先看叶位。类型对照。", "field", "field", "Bean leaves yellow from the bottom", "Old leaves evenly yellow. Type check for nitrogen."),
    P("/images/articles/que-dan-cauli.jpg", "甘蓝缺氮下部黄", "下部老叶先黄、心叶还绿。类型对照。", "field", "field", "Cabbage nitrogen deficiency", "Old leaves yellow, heart still green. Type check."),
    P("/images/articles/que-dan.jpg", "叶位对上才开口", "先认老叶还是新叶黄。", "field", "mechanism", "Read leaf position", "Read which leaves yellow first."),
    P("/images/articles/suan-hua-roots.jpg", "酸化根尖对照", "根还白才更像缺氮；根尖褐秃要想酸化。实验室洗根对照。", "lab", "contrast-other", "Acid-soil roots for contrast", "White roots support nitrogen; brown tips point to acid soil."),
]
art("que-dan")["confuse"][0]["photos"] = [
    P("/images/articles/suan-hua-roots.jpg", "酸化根尖褐秃", "像在哪：地上也黄。差在哪：酸化根尖先伤。看错了会猛尿素。", "lab", "contrast-other", "Acid-soil roots", "Acid soil hurts the tips first."),
    P("/images/articles/que-dan-bean.jpg", "缺氮老叶匀黄根还白", "真正缺氮：下部匀黄、根还白。", "field", "contrast-this", "Nitrogen, white roots", "Nitrogen: old leaves yellow, roots still white."),
]

art("que-jia")["photos"] = [
    P("/images/articles/que-jia-maize1.jpg", "玉米缺钾老叶焦边", "拍的是玉米老叶焦边。用来说明缺钾从叶缘往里走。南非 Cedara，类型对照。", "field", "field", "Maize potassium deficiency", "Old-leaf margin scorch on maize. Cedara, type check."),
    P("/images/articles/que-jia-maize2.jpg", "缺钾叶缘焦枯特写", "焦从叶缘往里。土面没有白霜才更像钾。", "field", "mechanism", "Potassium scorch close-up", "Scorch walks in from the margin. No white crust."),
    P("/images/diagnose/soil-bad.jpg", "盐害土面对照", "有白霜先分盐害，不要直接补钾。", "stock", "contrast-other", "Saline surface for contrast", "A white crust means split salt from potassium first."),
    P("/images/articles/que-jia.jpg", "先拍土面再拍叶缘", "先拍土面，再拍叶缘。", "field", "field", "Surface then margin", "Photograph the surface, then the scorched margin."),
]
art("que-jia")["confuse"][0]["photos"] = [
    P("/images/diagnose/soil-bad.jpg", "盐害白霜", "像在哪：叶缘也焦。差在哪：盐害常有白霜、浇完更蔫。", "stock", "contrast-other", "Salt crust", "Salt often shows a crust and worse wilt after a light watering."),
    P("/images/articles/que-jia-maize1.jpg", "缺钾焦边无白霜", "真正缺钾：焦边而土面不一定白。", "field", "contrast-this", "Potassium without crust", "Potassium: margin scorch without a salt crust."),
]

art("que-tie")["photos"] = [
    P("/images/articles/que-tie-citrus.jpg", "柑橘新叶黄叶脉还绿", "拍的是柑橘缺铁：新叶黄、叶脉还绿。类型对照。", "field", "field", "Citrus iron chlorosis", "Newest leaves yellow, veins still green. Type check."),
    P("/images/wiki/fe.jpg", "化验单有效铁格子示意", "化验单示例（示意），红框有效铁。不是风景照。", "lab", "sheet", "Available iron cell on a sample sheet", "Sample sheet (diagram), available-Fe cell boxed."),
] + art("que-tie")["photos"][:2]

art("lao-hai")["photos"] = [
    P("/images/articles/lao-hai-wet.jpg", "地表积水", "拍的是地表积水。英国材料，类型对照，用来说明积水要拍清楚。", "stock", "field", "Standing water", "Standing water. Type check; shoot the surface."),
] + art("lao-hai")["photos"][:3]

art("ce-tu-bao-gao")["photos"] = [
    P("/images/diagnose/lab-good.jpg", "化验单示例（示意）", "化验单示例（示意），pH、EC、有机质那几行清楚。不是某实验室真单，不能单凭此图下肥。", "lab", "sheet", "Sample soil-test sheet", "Labelled sample sheet. Not a real lab report. Do not fertilise from it."),
    P("/images/diagnose/lab-bad.jpg", "反光看不清的化验单", "反光、数字看不清。别拍成这样。", "lab", "sheet", "Glare hiding the numbers", "Glare. Do not shoot it like this."),
] + art("ce-tu-bao-gao")["photos"][:2]

# ---------- ZH copy ----------
ENR["suan-hua"]["appearance"] = """先看根尖，再谈肥。

秧苗发僵，不是叶子黄一点就算。新叶出得慢、心叶打不开、蹲下去一看新根很少，才像这篇。不要只在田埂上看地上黄不黄。

从发僵最明显的那一垄拔一棵，连根带泥捧到沟边，用水轻轻冲，不要搓掉根尖。洗干净后先看三样：根尖还有没有白尖、侧根多不多、土面有没有锈水。

还在长的白尖多，根还能喝水。根尖褐、秃、侧根很少，才像铝毒伤根。浇水冒锈水、水面有油膜，只是加分项，不是每一块酸地都冒。

邻垄还绿、这块僵，把两处的根摆在一起比。粮田和茶园不能用同一套标准。

粮田耕层 pH 低于约 5.5 才谈改酸。茶园大约 4.5 到 6.0，不能照搬粮田改到中性。这一页只帮你认。石灰用多少，去「石灰怎么用」那篇，并问当地农技站。"""
ENR["suan-hua"]["mechanism"] = """人话结论
土太酸时，铝从矿物里溶出来，专伤正在伸的根尖。根尖一秃，水和养分进不去，地上就会像缺氮缺磷。再追尿素，肥进不去，还可能烧残根。

机制
铝毒先伤根尖分生组织，侧根长不出来。钙镁磷也抓不稳，但最先看见的是根，不是叶子上缺哪一种肥。改酸是给根尖重新长白尖，不是给叶子上一层肥。

地里能看见的对应
洗出来褐秃、少白尖；邻垄还绿；粮田 pH 掉到约 5.5 以下更常见。南方红黄壤本身缓冲弱。铵态氮连年当唯一氮源、雨水把钙镁淋走，都会把耕层 pH 往下推。茶树耐酸，粮田不是越酸越好。"""
art("suan-hua")["phenomenon"]["appearance"] = ENR["suan-hua"]["appearance"]
art("suan-hua")["causes"]["plainExplain"] = "土太酸，铝离子溶出来伤根尖。不是肥不够，是根吃不进去。改酸是给根尖重新长白尖，不是给叶子上一层肥。"
art("suan-hua")["confuse"][0]["difference"] = "像在哪：地上也发黄发僵。差在哪：缺氮是下部老叶匀黄、顶上新叶还绿，洗出来的根往往还白。酸化是根尖先伤，整株发僵。地里怎么一眼分开：把两处的根摆一起，褐秃少白尖还是白而多。看错了会干什么错事：根尖秃了再猛尿素，肥进不去还会烧残根。"
art("suan-hua")["confuse"][1]["difference"] = "像在哪：都发僵、不长。差在哪：低温发僵，回暖几天会缓过来；酸化回暖也不长新白根。地里怎么一眼分开：回暖一周仍僵，就把 pH 试纸带下地。看错了会干什么错事：当成冷害只等天，或者先加尿素。"

ENR["suan-hua"]["speakZh"] = [
    "秧苗发僵，先洗手洗根，不要先追尿素。",
    "根尖褐、秃、侧根很少，才像铝毒伤根。",
    "锈水只是加分项，不是每一块酸地都冒。",
    "粮田耕层 pH 低于约 5.5 才谈改酸。",
    "农用石灰常见每亩 50–150 公斤，分两次，沙土按下限。",
    "与尿素不同日，不用建筑石灰。",
    "茶园窗口大约 4.5 到 6.0，不能照搬粮田改到中性。",
    "这一页只帮你认。用量去石灰那篇，并问当地农技站。",
]
ENR["suan-hua"]["speakEn"] = [
    "If seedlings stall, wash the roots before you add fertilizer.",
    "Brown, stubby root tips with few laterals look like aluminum toxicity from acid soil.",
    "Rust-colored irrigation water can support the diagnosis, but not every acid field shows it.",
    "On grain land, consider agricultural lime only if topsoil pH is below about 5.5.",
    "Agricultural lime is commonly 50–150 kg/mu (about 750–2,250 kg/ha), split in two applications. Use the low end on sand.",
    "Do not use builder’s lime. Do not apply lime the same day as urea.",
    "Tea gardens should stay near pH 4.5–6.0; do not push them to neutral.",
    "This page helps you recognise the scene. Rates live in How to use lime, and with your local station.",
]

def thicken(slug, app, mech, speak_zh=None, speak_en=None):
    ENR.setdefault(slug, {})
    ENR[slug]["appearance"] = app
    ENR[slug]["mechanism"] = mech
    a = art(slug)
    a["phenomenon"]["appearance"] = app
    if speak_zh:
        ENR[slug]["speakZh"] = speak_zh
    if speak_en:
        ENR[slug]["speakEn"] = speak_en


thicken(
    "yan-jian",
    """先看土面，再谈灌。

蹲下去看土面：薄薄一层白粉，还是结成能揭起来的硬壳。出苗一块有一块没有，叶缘发焦发脆。小水浇完更蔫，不要当成旱了猛灌。

从出苗差的那一块和还绿的邻垄各拔一棵，对照根和叶缘。白霜是盐分的线索，不是处方。

盐害看电导，碱害看 pH 和交换性钠，两件事不要混着治。井水要是也咸，先问沟通不通，再谈灌。

没沟不要大水漫灌。这一页只帮你认。洗盐、石膏怎么用，去相关篇，并问当地农技站。""",
    """人话结论
盐把土水变咸，根吸水费劲，所以小水浇完更蔫。钠高还会把团粒拆散，湿时泥、干时板。

机制
小水勤浇等于把盐用电梯送到地表。石膏改的是钠高的碱化，不是所有白霜。干旱灌区、滨海、大棚滴口最常见。

地里能看见的对应
土面白霜或硬壳、出苗不齐、叶缘焦、浇完更蔫。湿泥干板要想钠高，不要只当盐害浇大水。""",
)

thicken(
    "ban-jie",
    """先看锄头和根，再谈肥。

拿锄试一下：雨后一层稀泥、干了发硬，锄下去弹回来。苗戴帽出土，根横着走，不肯往下扎。

在车辙和苗差处刨一个坑，看二十厘米下面有没有发亮、像刀切的硬盖。湿土脚印能印很深时不要进车。

邻垄还能下锄、这块弹回来，把两处的剖面摆一起看。板结是根的路被堵住，不是单纯缺肥。

根横走、苗戴帽才算这篇。只土面干裂、根还能往下，先别扣板结的帽子。""",
    """人话结论
反复碾压、湿耕、有机质薄，团粒被压扁，孔隙变少。根碰到硬盖就横走，水和气过不去。

机制
湿土进车最容易压出犁底层。机械深松只能在干到能裂、不抹泥的时候做，湿了只会把硬盖抹得更光。硬盖在二十厘米附近，松破一层就够，不要一次翻得又湿又深。

地里能看见的对应
雨后积水、锄头弹回、根横走、苗戴帽。车辙里最明显。""",
)

thicken(
    "you-ji-zhi",
    """先搓一把土，再谈肥。

搓一把耕层土：颜色浅、发粉、搓不成团，从指缝漏下去。肥下去一场雨又像没施。冬春裸地掉得最快。

邻垄还能搓团、这块散，并排放着看。颜色浅不是化验单，但浅了常常有机质薄。沙土更留不住，黏土能多留一点。

不要指望一袋菌剂一季补回掉的那层。有机质是储量，不是菌剂的商品名。

这一页只帮你认。还田、腐熟粪怎么用，去相关篇，按测土和当地农技站。""",
    """人话结论
有机质是土里的肉。薄了以后肥留不住，铝害、盐害也更明显。

机制
连年只拿走籽粒、秸秆不还、生粪乱埋，这一层会越来越薄。菌剂不是有机质的商品名。连续三年还田加腐熟粪，比一季堆满靠谱。沙土少量多次，一次倒全年留不住。

地里能看见的对应
土色浅、一把就散、雨后很快漏干。叶子黄只是加分，先认土有没有肉。""",
)

thicken(
    "que-dan",
    """先认叶位，再认根。

黄的是底下老叶还是顶上新叶。底下老叶匀黄、顶上新叶还绿，整株能往上长，洗出来的根是白的，才像缺氮。

新叶也黄，要想缺硫或缺铁。根黑臭、田里有明水，不要先扣缺氮的帽子。

从黄得最匀的那垄和还绿的邻垄各摘几片老叶、各拔一棵根对照。叶位对不上，不要急着下尿素。

尿素不是所有黄叶的名字。这一页只帮你认。用量按测土和当地农技站。""",
    """人话结论
氮在植物里会从老叶搬到新叶，所以缺了先黄老叶。根还白，才更像这篇。

机制
水太多、根呼吸差，也会黄，但根往往发黑发臭。缺硫常常整株偏黄。缺铁是新叶黄、叶脉还绿。先认叶位和根色，再谈氮。

地里能看见的对应
下部老叶匀黄、心叶还绿、根白。叶位对不上不要下尿素。""",
)

thicken(
    "que-jia",
    """先拍土面，再拍叶缘。

老叶叶缘先焦，像火燎过往里卷，茎发软，果不甜。从焦得最重的那垄摘几片老叶，看焦是不是从叶缘往里走。

土面不一定白。土面有白霜再加焦边，先分盐害和缺钾，不要直接补钾。

邻垄叶缘还绿、这块焦，并排放。洗根看看是不是还白。盐害常浇完更蔫，缺钾不一定。

这一页只帮你认。用量去相关篇，按测土和当地农技站。""",
    """人话结论
钾在植物里也能从老叶搬到新叶，所以缺了先焦老叶叶缘。

机制
盐害也会焦边，但常有白霜、滴口白圈、浇完更蔫。两件事搞混，钾肥会越补越咸。先看土面和电导，再谈钾。果不甜不是单独加钾的理由。

地里能看见的对应
老叶焦边、土面没有白霜、根还白。有白霜先当盐害。""",
)

# ---------- EN overlay ----------
def en_overlay(slug, **kw):
    EN.setdefault(slug, {})
    EN[slug].update(kw)


en_overlay(
    "suan-hua",
    appearance="""Wash the roots before you add fertilizer.

If seedlings stall, the newest leaves open slowly and new roots are scarce. Do not judge from a yellow tint at the field edge.

Pull one plant from the worst row, carry it to the ditch and rinse the mud. Do not rub the tips off. Then look: white growing tips, or brown stubby tips with few laterals.

Brown, stubby tips look like aluminum toxicity from acid soil. Rust-colored irrigation water can support the diagnosis, but not every acid field shows it.

Compare with the next ridge that is still green. Grain land and tea are not the same target.

On grain land, consider agricultural lime only if topsoil pH is below about 5.5. Tea gardens should stay near pH 4.5–6.0; do not push them to neutral. This page helps you recognise the scene. Rates live in How to use lime, and with your local station.""",
    mechanism="""The plain point
When the plough layer is too acid, aluminium comes off the minerals and burns the growing root tips. Once the tips are bald, water and nutrients stay out. The top looks like nitrogen or phosphorus shortage. More urea will not push through, and it can burn what roots are left.

How it works
Aluminium hits the meristem first, so laterals fail. Calcium, magnesium and phosphorus also sit badly, but the first thing you can see is the root, not a missing bag of leaf feed. Liming is to let white tips grow again, not to paint the leaves.

What you can see
Washed roots brown and stubby; the next ridge still green; grain-land pH often below about 5.5. Southern red-yellow soils buffer poorly. Year after year of ammonium-N, and rain washing calcium and magnesium, push pH down. Tea likes acid. Grain does not want it more acid every year.""",
    confuse=[
        {"lookalike": "Nitrogen yellowing", "difference": "Looks similar above ground. Nitrogen: old leaves evenly yellow, newest leaves still green, washed roots usually white. Acid soil: tips brown and stubby, the plant stalls. Tell them apart by washing roots. The wrong move is a heavy urea shot on bald tips."},
        {"lookalike": "Cold stall", "difference": "Both stall. Cold stall eases after a few warm days. Acid stall still grows no white tips. If a week of warmth changes nothing, take pH paper to the field. The wrong move is waiting on the weather, or adding urea first."},
    ],
    photos=[
        {"alt": "Stalled maize on acid soil", "caption": "Stalled maize stand. Type check from KwaZulu-Natal, not one named North China field."},
        {"alt": "Aluminium-toxic maize roots", "caption": "Washed maize roots: brown, stubby tips. A trial-plot wash, not your own ridge."},
        {"alt": "Lab wheat roots", "caption": "Lab root check, not a neighbour ridge. Secondary image only."},
        {"alt": "Agricultural lime bag", "caption": "Read the bag: agricultural lime, not builder’s lime."},
    ],
)

en_overlay(
    "yan-jian",
    appearance="""Read the soil surface before you irrigate.

Crouch: a thin white powder, or a crust you can peel. Emergence is patchy; leaf margins scorch and turn brittle. A light watering makes wilt worse — that is not drought.

Pull one plant from the poor patch and one from the green ridge. Compare roots and margins. A white crust is a clue, not a prescription.

Split salt from alkali. Salt is EC. Alkali is pH and exchangeable sodium. If the well is salty too, ask whether the drains work before you flood.

Do not flood without drains. This page helps you recognise the scene. Leaching and gypsum rates live in the matching guides, with your local station.""",
    mechanism="""The plain point
Salt makes the soil water harder to drink, so a light watering wilts plants more. High sodium also pulls crumbs apart: mud when wet, a board when dry.

How it works
Little and often is an elevator for salt to the surface. Gypsum is for sodic alkali, not for every white crust. Dry irrigation districts, the coast and greenhouse emitters see this most.

What you can see
White powder or a peelable crust, patchy emergence, scorched margins, worse wilt after a sip of water. Mud-then-board points to sodium — do not treat it as salt alone with a flood.""",
)

en_overlay(
    "ban-jie",
    appearance="""Try the hoe and the roots before you feed.

After rain, a slurry; when dry, a cap that bounces the blade. Seedlings wear a cap of soil; roots run sideways.

Dig in the wheel track and the poor patch. Look about 20 cm down for a shiny, knife-cut pan. If a footprint sinks deep in wet soil, keep the tractor off.

If the next ridge still takes the hoe, put the two profiles side by side. A pan blocks the road for roots. It is not simply a missing bag of fertiliser.""",
    mechanism="""The plain point
Repeated traffic, wet tillage and thin organic matter squash crumbs and close pores. Roots hit the pan and turn. Water and air do not pass.

How it works
Driving on wet soil is the fastest way to a plough pan. Deep loosening only when the soil fractures, not smears. One layer near 20 cm is enough — do not invert a wet profile.

What you can see
Water sitting after rain, a bouncing hoe, roots running sideways, seedlings in a soil cap. Worst in the ruts.""",
)

en_overlay(
    "you-ji-zhi",
    appearance="""Rub a handful before you talk fertiliser.

Plough-layer soil that is pale, powdery, will not hold a ball and runs through the fingers. Fertiliser after one rain looks as if you never applied it. Bare ground in winter and spring drops fastest.

If the next ridge still makes a ball, put the two handfuls together. Pale colour is not a lab sheet, but pale soil is often thin in organic matter. Sand holds even less.

Do not expect a packet of microbes to put the layer back in one season. Organic matter is a reserve, not a brand of inoculant.""",
    mechanism="""The plain point
Organic matter is the soil’s meat. When it is thin, fertiliser will not stay, and aluminium and salt problems show sooner.

How it works
Taking grain and leaving no straw, plus burying raw manure, thins the layer year after year. Inoculant is not the product name for organic matter. Three years of straw return plus composted manure beats one dump. On sand, little and often.

What you can see
Pale colour, a handful that falls apart, a field that dries through after rain. Yellow leaves are extra, not the first test.""",
)

en_overlay(
    "que-dan",
    appearance="""Read which leaves, then the roots.

Old leaves evenly yellow, newest leaves still green, the plant still extending, washed roots white: that looks like nitrogen.

If the newest leaves yellow too, think sulphur or iron. Black, smelly roots or standing water: do not call it nitrogen yet.

Pick old leaves from the yellowest row and the green ridge, and wash a root from each. If leaf position does not match, do not rush urea.

Urea is not the name of every yellow leaf.""",
    mechanism="""The plain point
Nitrogen moves from old leaves to new ones, so shortage yellows the old leaves first. White roots support this read.

How it works
Waterlogging yellows too, but those roots are often black and smelly. Sulphur often yellows the whole plant. Iron yellows the newest leaves with green veins. Read leaf position and root colour before you talk nitrogen.

What you can see
Even yellow on old leaves, a green heart, white roots. If that pattern fails, do not apply urea yet.""",
)

en_overlay(
    "que-jia",
    appearance="""Photograph the soil surface, then the leaf margin.

Old-leaf margins scorch first and roll inward; stems soften; fruit is bland. Pick the worst old leaves and see whether the scorch walks in from the edge.

The surface need not be white. A white crust plus scorched margins: split salt from potassium before you add K.

If the next ridge still has green margins, put the leaves together. Wash the roots. Salt often wilts more after a light watering; potassium need not.

This page helps you recognise the scene. Rates live in the matching guide, with a soil test and your local station.""",
    mechanism="""The plain point
Potassium also moves from old leaves to new ones, so shortage scorches old-leaf margins first.

How it works
Salt scorches margins too, but often with a white crust, a white ring at drip points, and worse wilt after a sip of water. Mix the two and extra K makes the field saltier. Read the surface and EC first. Bland fruit is not a reason to add potassium alone.

What you can see
Old-leaf margin scorch, no white crust, roots still white. A crust means treat salt first.""",
)

# ---------- wiki 5 ----------
def wiki_photos(term_id, sheet_src, field_src, field_alt, field_cap, field_alt_en, field_cap_en, field_kind="stock"):
    WIKI[term_id]["photos"] = [
        P(sheet_src, "化验单示例（示意）", "化验单示例（示意），红框标出这一格。不是园艺湿度计，不是风景照，不能单凭此图下肥。", "lab", "sheet", "Sample lab sheet (diagram)", "Sample sheet with this cell boxed. Not a moisture meter, not a landscape. Do not fertilise from it."),
        P(field_src, field_alt, field_cap, field_kind, "field", field_alt_en, field_cap_en),
    ]


wiki_photos("ph", "/images/wiki/ph.jpg", "/images/wiki/ph-2.jpg", "粮田发僵苗（酸性土类型对照）", "偏低 pH 对得上粮田发僵、根尖褐秃。南非酸性土玉米，类型对照，不是华北某一块地。", "Stalled maize on acid soil", "Low pH matches stalled grain and brown tips. Type check.")
wiki_photos("ec", "/images/wiki/ec.jpg", "/images/wiki/ec-2.jpg", "盐分测定时的土面", "EC / 全盐高时，土面常有白霜、出苗不齐、小水浇完更蔫。澳大利亚材料，类型对照。", "Soil surface at a salinity test", "High EC: crust, patchy emergence, worse wilt after a sip of water.")
wiki_photos("om", "/images/wiki/om.jpg", "/images/wiki/om-2.jpg", "耕层取样看土色", "有机质低：土色浅、一把就散、肥效短。类型对照。", "Plough-layer sample", "Low organic matter: pale colour, a handful that falls apart.")
wiki_photos("al", "/images/wiki/al.jpg", "/images/wiki/al-2.jpg", "铝毒伤根后的褐秃根尖", "交换性铝高：洗根后根尖褐秃、侧根很少。试验地洗根，不是邻垄自拍。", "Aluminium-toxic maize roots", "High exchangeable Al: brown stubby tips, few laterals.", "lab")
wiki_photos("na", "/images/wiki/na.jpg", "/images/wiki/na-2.jpg", "吐鲁番苏打盐土剖面", "交换性钠 / ESP 高：湿时泥、干时板。新疆吐鲁番剖面，实验室博物馆对照，不是自家地头。", "Turpan sodic solonchak", "High Na / ESP: mud when wet, a board when dry. Museum profile, not your field.", "lab")

WIKI["ph"]["zh"].update({
    "summary": "pH 说土水有多酸多碱，不是病名。粮田耕层低于约 5.5 才谈农用石灰；6.0–7.5 多数粮菜舒服；茶园大约 4.5–6.0，不能改到中性。这条不给袋数。",
    "appearance": "人话\npH 说的是土水有多酸多碱，不是某一种病的名字。\n\n单子上怎么写\n常写成 pH、酸碱度、水浸 pH。先看旁边有没有水土比。1:1、1:2.5、1:5 不能硬比。\n\n单位陷阱\n同一块地换水土比，小数点会动。不要跨实验室死盯一个小数。",
    "fieldCheck": "地里对得上什么\n偏低：粮田发僵苗、洗出来根尖褐秃。偏高：新叶黄、叶脉还绿。\n\n不要做什么\n不要一低就猛尿素。不要用建筑石灰。不要把茶园改到中性。\n\n该去哪篇看用量\n去酸化、石灰怎么用，按测土和当地农技站。这条不给袋数。",
    "longform": [
        "pH 只说土水有多酸多碱，不说缺哪一种肥。粮田耕层低于约 5.5，根尖容易褐秃，可以谈农用石灰。大约 6.0–7.5，多数粮菜比较舒服。高于约 8，铁容易被锁。",
        "茶园窗口大约 4.5 到 6.0，不能照搬粮田改到中性。用量去农业知识，按测土和当地农技站。",
    ],
    "plainExplain": "pH 是测量值，不是病名。改酸改碱都冲着这个数字。粮田和茶园目标不同。这条不给袋数。",
})
WIKI["ph"]["en"].update({
    "summary": "pH says how acid or alkaline the soil water is. It is not a disease name. On grain land, agricultural lime is only on the table below about 5.5. Most grain and vegetables sit near 6.0–7.5. Tea stays about 4.5–6.0; do not push it to neutral. This page does not hand you a bag count.",
    "appearance": "Plain speech\npH is how acid or alkaline the soil water is — not the name of a disease.\n\nOn the sheet\nIt may say pH, acidity, or water pH. Read the soil:water ratio first. 1:1, 1:2.5 and 1:5 are not the same number.\n\nUnit trap\nChange the ratio on the same field and the decimal moves. Do not freeze on one decimal across labs.",
    "fieldCheck": "What it matches in the field\nLow: stalled grain, brown root tips. High: newest leaves yellow, veins still green.\n\nDo not\nDo not answer a low number with a urea dump. Do not use builder’s lime. Do not push tea to neutral.\n\nWhere rates live\nAcid soil and How to use lime. Follow a soil test and your local station. No bag count here.",
    "longform": [
        "pH is a measurement, not a nutrient name. On grain land, root tips brown below about 5.5 and agricultural lime can be discussed. About 6.0–7.5 is comfortable for most grain and vegetables. Above about 8, iron locks.",
        "Tea should stay near 4.5–6.0. Do not copy a grain-land lime bill onto a tea garden. Rates live in the field guide.",
    ],
    "plainExplain": "pH is a measurement, not a disease. Lime or alkali amendments aim at this number. Grain and tea have different targets. No bag count on this page.",
    "spoken": [
        "pH is a measurement, not a disease.",
        "Read the soil:water ratio first. 1:1 and 1:2.5 are not the same number.",
        "On grain land, consider lime only below about 5.5.",
        "Tea gardens should stay near 4.5–6.0; do not push them to neutral.",
        "Above about 8, newest leaves yellow with green veins because iron locks.",
        "Rates live in the acid-soil and lime guides.",
    ],
})

WIKI["ec"]["zh"].update({
    "summary": "EC 说土水有多咸，不是“有肥”。偏高时土面常有白霜、出苗不齐、小水浇完更蔫。这条不给袋数。",
    "appearance": "人话\n电导率说土水有多咸，不是肥够不够。\n\n单子上怎么写\n常写成 EC、电导率，单位有 mS/cm、dS/m、μS/cm。先看单位，再看水土比。\n\n单位陷阱\nμS/cm 和 mS/cm 差一千倍。不要跨单位硬比。",
    "fieldCheck": "地里对得上什么\n土面白霜、出苗不齐、小水浇完更蔫。\n\n该去哪篇\n去盐碱地、洗盐相关篇。没沟不要大水漫灌。",
})
WIKI["ec"]["en"].update({
    "summary": "EC says how salty the soil water is, not how much fertiliser you have. High EC often matches a white crust, patchy emergence and worse wilt after a light watering. No bag count here.",
    "appearance": "Plain speech\nElectrical conductivity is how salty the soil water is — not whether you fed enough.\n\nOn the sheet\nEC or conductivity, in mS/cm, dS/m or μS/cm. Read the unit and the ratio first.\n\nUnit trap\nμS/cm and mS/cm differ by a thousand. Do not compare across units.",
    "fieldCheck": "What it matches\nWhite crust, patchy emergence, worse wilt after a sip of water.\n\nWhere to go\nSaline soil and leaching guides. Do not flood without drains.",
})

WIKI["om"]["zh"].update({
    "summary": "有机质是土里的肉，是储量，不是菌剂。低了土色浅、一把就散、肥效短。慢慢培，不要一季翻身。",
    "appearance": "人话\n有机质是土里已经腐解和正在腐解的有机物质，不是某袋菌剂的名字。\n\n单子上怎么写\n常写成有机质、OM，单位 g/kg 或 %。先看单位。\n\n低中高怎么读\n偏低时常对上浅色散土、肥留不住。具体分级跟当地实验室，不要跨省死套。",
    "fieldCheck": "地里对得上什么\n土色浅、搓不成团、一场雨肥就没了。\n\n该去哪篇\n去有机质下降、秸秆还田。菌剂不是有机质。",
})
WIKI["om"]["en"].update({
    "summary": "Organic matter is the soil’s meat — a reserve, not a packet of microbes. Low values match pale soil that will not hold a ball, and fertiliser that does not last. Build it over years.",
    "appearance": "Plain speech\nOrganic matter is decaying and already-decayed organic material. It is not the name of an inoculant.\n\nOn the sheet\nOM or organic matter, in g/kg or %. Read the unit.\n\nHow to read it\nLow often matches pale, powdery soil that will not hold fertiliser. Use the local lab’s classes.",
    "fieldCheck": "What it matches\nPale colour, a handful that falls apart, a feed that vanishes after rain.\n\nWhere to go\nThin organic matter and straw return. Inoculant is not organic matter.",
})

WIKI["al"]["zh"].update({
    "summary": "交换性铝高，专伤正在伸的根尖。洗出来褐秃、侧根很少，常对上偏低 pH。这条不给袋数。",
    "appearance": "人话\n交换性铝不是肥料，是会伤根的离子。\n\n单子上怎么写\n常写成交换性铝、Ex-Al，单位 cmol/kg 或 mg/kg。先看单位。",
    "fieldCheck": "地里对得上什么\n洗根后根尖褐秃、侧根很少、苗发僵。常和偏低 pH 一起出现。\n\n该去哪篇\n去酸化、铝毒伤根、石灰怎么用。不要先猛尿素。",
})
WIKI["al"]["en"].update({
    "summary": "High exchangeable aluminium burns growing root tips. Brown, stubby tips with few laterals often match low pH. No bag count here.",
    "appearance": "Plain speech\nExchangeable aluminium is not a fertiliser. It is an ion that hurts roots.\n\nOn the sheet\nEx-Al or exchangeable Al, in cmol/kg or mg/kg. Read the unit.",
    "fieldCheck": "What it matches\nWashed roots brown and stubby, few laterals, stalled seedlings. Often with low pH.\n\nWhere to go\nAcid soil, aluminium toxicity, How to use lime. Do not dump urea first.",
})

WIKI["na"]["zh"].update({
    "summary": "交换性钠高，团粒散、湿时泥、干时板。和单纯白霜的盐害要分开。看 ESP / SAR。这条不给袋数。",
    "appearance": "人话\n交换性钠说的是钠把团粒拆散，不只是嘴里尝到咸。\n\n单子上怎么写\n常写成交换性钠、Ex-Na，再看 ESP 或 SAR。",
    "fieldCheck": "地里对得上什么\n湿时泥、干时板，和只有白霜的盐斑要分开。\n\n该去哪篇\n去盐碱地、石膏改碱。没沟不要大水漫灌。",
})
WIKI["na"]["en"].update({
    "summary": "High exchangeable sodium pulls crumbs apart: mud when wet, a board when dry. Split it from a simple salt crust. Read ESP / SAR. No bag count here.",
    "appearance": "Plain speech\nExchangeable sodium is about crumbs falling apart, not only a salty taste.\n\nOn the sheet\nEx-Na, then ESP or SAR.",
    "fieldCheck": "What it matches\nMud when wet, a board when dry — different from a white salt crust alone.\n\nWhere to go\nSaline-sodic guides and gypsum. Do not flood without drains.",
})

# remaining articles: split long blobs, drop immediate duplicate sentences
dup_re = re.compile(r"(.{12,}?)。(?:\s*)\1。")

def split_paras(text: str) -> str:
    if not text or "\n" in text:
        return text
    sents = [s.strip() for s in re.split(r"(?<=。)", text) if s.strip()]
    out, buf = [], []
    for s in sents:
        buf.append(s)
        if len(buf) >= 2:
            out.append("".join(buf))
            buf = []
    if buf:
        out.append("".join(buf))
    return "\n\n".join(out)


def dedupe(text: str) -> str:
    if not text:
        return text
    prev = None
    lines = []
    for line in text.split("\n"):
        t = line.strip()
        if t and t == prev:
            continue
        lines.append(line)
        if t:
            prev = t
    joined = "\n".join(lines)
    return dup_re.sub(r"\1。", joined)


priority = {"suan-hua", "yan-jian", "ban-jie", "you-ji-zhi", "que-dan", "que-jia", "que-tie", "lao-hai", "shao-gen", "ce-tu-bao-gao", "lian-zuo"}
for a in ART:
    slug = a["slug"]
    app = a["phenomenon"].get("appearance") or ""
    if slug not in priority:
        app = split_paras(dedupe(app))
        a["phenomenon"]["appearance"] = app
    if slug in ENR:
        if slug not in priority:
            if ENR[slug].get("appearance"):
                ENR[slug]["appearance"] = split_paras(dedupe(ENR[slug]["appearance"]))
            if ENR[slug].get("mechanism"):
                ENR[slug]["mechanism"] = split_paras(dedupe(ENR[slug]["mechanism"]))
        else:
            ENR[slug]["mechanism"] = dedupe(ENR[slug].get("mechanism") or "")
            ENR[slug]["appearance"] = dedupe(ENR[slug].get("appearance") or "")

for slug, g in EN.items():
    if slug in priority:
        continue
    if g.get("appearance"):
        g["appearance"] = split_paras(dedupe(g["appearance"]))
    if g.get("mechanism"):
        g["mechanism"] = split_paras(dedupe(g["mechanism"]))

def dump(path, obj):
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

dump(ROOT / "src/data/articles.json", ART)
dump(ROOT / "src/data/articles-en.json", EN)
dump(ROOT / "src/data/enrich.json", ENR)
dump(ROOT / "src/data/wiki.json", WIKI)
print("patched articles", len(ART), "wiki", len(WIKI))
print("suan-hua app", len(art("suan-hua")["phenomenon"]["appearance"]), "mech", len(ENR["suan-hua"]["mechanism"]))
print("ph app", len(WIKI["ph"]["zh"]["appearance"]))
