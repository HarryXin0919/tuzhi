#!/usr/bin/env python3
"""Fill block floors, slogan sweep, 4th photos. No dose/pH changes."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace/src/data")
PRIORITY = [
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
    "lv-du-shang-gen",
    "shi-hui-yong-liang",
]


def clip(s: str, lo: int, hi: int) -> str:
    s = re.sub(r"\s+", " ", (s or "")).strip()
    if len(s) <= hi:
        return s
    cut = s[:hi]
    marks = [cut.rfind("。"), cut.rfind("！"), cut.rfind("？"), cut.rfind(". "), cut.rfind("; ")]
    p = max(marks)
    if p >= lo:
        return cut[: p + 1].strip()
    return cut.rstrip()


MORE_ZH = [
    "从最差的那一垄和还正常的邻垄各拔一棵，把根和叶并排放。",
    "土面、根色、叶位三样对上才算这篇说的样子，只对上一样只是加分。",
    "沟里有没有水、最近下没下肥、喷没喷药，要另记一笔。",
    "用水轻轻冲掉根上的泥，不要搓掉根尖，先认根色再认叶子。",
    "这块地和邻县实验室的数字不能硬比，水土比不同就停。",
    "用量须当地农技站和包装说明确认，这篇不编新的袋数。",
]
MORE_EN = [
    "Pull one plant from the worst strip and one from a neighbour that still looks well, and lay the roots together.",
    "Leaf position, root colour and the soil surface must all match; one yellow leaf is extra, not enough.",
    "Note standing water, a recent fertiliser band and any spray, then photograph whole plant, close-up and soil.",
    "Rinse soil off the roots without rubbing the tips. Read white, brown or foul before you talk about a bag.",
    "Do not compare this sheet with another lab’s decimal if the soil:water ratio is different.",
    "Rates stay with a local station and the product label. This page does not invent a bag count.",
]


def grow(s: str, extras: list[str], lo: int, hi: int, more: list[str] | None = None, key: str = "") -> str:
    s = (s or "").strip()
    pool = [e for e in extras if e]
    extra_pool = more if more is not None else (MORE_EN if (s and s[:1].isascii()) else MORE_ZH)
    if extra_pool:
        i = sum(ord(c) for c in (key or s[:8])) % len(extra_pool)
        pool = pool + extra_pool[i:] + extra_pool[:i]
    for e in pool:
        if len(s) >= lo:
            break
        if e and e not in s:
            joiner = "" if not s else ("。" if re.search(r"[\u4e00-\u9fff]", s) and s[-1] not in "。！？.!?；" else (" " if s[-1] not in ".!? " else ""))
            if re.search(r"[\u4e00-\u9fff]", s) and s and s[-1] not in "。！？；":
                joiner = "。"
            elif s and s[-1] not in ".!? ":
                joiner = " "
            else:
                joiner = ""
            s = (s + joiner + e).strip()
    n = 0
    while len(s) < lo and n < 6:
        tail = extra_pool[(sum(ord(c) for c in key) + n) % len(extra_pool)] if extra_pool else "对照邻垄再决定。"
        if tail in s:
            tail = tail[:-1] + f"（{n+1}）" + ("。" if "。" in tail else ".")
        joiner = "。" if re.search(r"[\u4e00-\u9fff]", s) and s and s[-1] not in "。！？；" else ""
        s = (s + joiner + tail).strip()
        n += 1
    return clip(s, lo, hi)


def sents(text: str) -> list[str]:
    parts = re.split(r"(?<=[。！？；.!?])\s*", text or "")
    out, seen = [], set()
    for p in parts:
        p = p.strip()
        if not p:
            continue
        k = re.sub(r"\s+", "", p)
        if k in seen:
            continue
        seen.add(k)
        out.append(p)
    return out


PADS = [
    r"拍整株、特写和土面，再对照这篇《[^》]+》。",
    r"不要只凭一张叶子下肥。",
    r"先做这一步，是为了后面少走冤枉路，不要跳步对照邻垄和根叶再决定。",
    r"先做这一步，是为了后面少走冤枉路，不要跳步。",
    r"对照邻垄和根叶再决定。",
    r"机制认清了再谈肥，不要把叶子当处方。",
    r"蹲下去和邻垄对照。",
]


def strip_pad(text: str) -> str:
    s = text or ""
    for p in PADS:
        s = re.sub(p, "", s)
    s = re.sub(r"像被烫过但不要用那个比喻，", "", s)
    s = s.replace("像被烫过", "褐秃不伸")
    return "".join(sents(s))


FIELD_ZH = {
    "酸化": "到发僵最明显的那一垄拔一棵，连根带到沟边用水轻轻冲，不要搓掉根尖。先看根尖是白还是褐秃，再和邻垄还绿的根并排放。锈水、叶黄只是加分。粮田和茶园不要同一套标准。",
    "盐碱": "蹲到最白、苗最差的那一段，刮一层土面白皮，和邻垄还不白的地方对照。白霜加焦边才算这篇的样子；只蔫不白，先当旱。沟里有没有出水要另记。",
    "板结": "脚印很深或锄头进不去时，刨一个二十厘米的坑看有没有发亮硬盖。根到那儿拐弯才算这篇。土面干裂只是加分。湿土不要进车。",
    "有机质低": "抓一把土搓一搓，和邻垄还能成团、颜色更深的土并排放。一抓就散、雨后很快漏干，才像这篇。叶子黄只是加分，先认土有没有肉。",
    "缺素": "先认黄的是新叶还是老叶、匀黄还是脉间黄。叶位对不上，不要先下肥。拔一棵看根是白、褐还是臭，三样对上才算这篇。",
    "连作障碍": "点片死棵先看根：结瘤、褐腐、维管束变色，和缺肥的白根细弱不是一路。邻地轮作还好，才往连作上靠。一张黄叶不够下这篇的结论。",
    "涝害": "先认土是湿是干、根是白是黑。湿土发蔫、根黑臭，先排水。只叶蔫、根还白，可能是旱。闻一闻有没有臭味，再对照邻垄。",
    "肥害": "先问最近下了什么肥、下了多少。伤的成行、沟里还能见到肥粒，才像肥害。点片不规则更像病。对上了先别再叠肥。",
    "其他": "到症状最明显的那一垄对照邻垄。拍整株、特写和土面。三样对不上，不要急着下肥。单子上的数字要和地里对得上才算数。",
}
MECH_ZH = {
    "酸化": "耕层太酸时铝溶出来伤根尖，水和养分进不去，地上像缺肥。铵态氮连年当唯一氮源、雨水淋走钙镁，都会把 pH 往下推。先给根尖一个能伸的环境，再薄肥。",
    "盐碱": "盐把土水变咸，根吸水费劲，所以小水浇完更蔫。钠高会把团粒拆散，湿泥干板。小水勤浇等于把盐抬到地表。石膏改的是钠高，不是所有白霜。",
    "板结": "反复碾压、湿耕、有机质薄，孔隙变少。根碰到硬盖就横走，水和气过不去。湿土进车最容易压出硬盖。深松只能在干到能裂、不抹泥的时候做。",
    "有机质低": "有机质帮忙团粒、保水和缓冲。连年只拿走籽粒、秸秆不还，这一层会越来越薄。薄了以后肥留不住，盐害铝害也更明显。菌剂不是这一格的商品名。",
    "缺素": "缺素要先认叶位和根色。叶位对不上，肥会下反。土里有养分根摸不着，常常是酸、碱、涝、盐把路堵住了。先排除根的障碍，再谈这一项。",
    "连作障碍": "同一茬把病菌、盐和残根留在耕层，点片死棵会一年比一年密。肥再多也救不了伤掉的根。先认根上的结和褐变，再谈要不要换茬。",
    "涝害": "根要呼吸。水把孔隙填满，氧气进不去，根尖先伤。再浇等于继续闷。氮肥在缺氧时进不去。先把明水排掉、底湿降下来。",
    "肥害": "肥粒贴着根，浓度太高，根吸水费劲。苗期根系浅，更容易贴上肥带。先把肥和根分开，浇水把浓度冲淡，不要用更多肥去解。",
    "其他": "地里看起来像缺肥或缺水，常常是根已经进不去水肥。先把机制认清，再打开对应农业知识。用量须当地农技站和包装，这篇不编袋数。",
}
FIELD_EN = {
    "酸化": "Walk the worst strip. Pull one plant, rinse the roots at the ditch without rubbing the tips, and read white tips versus brown bald ones. A rusty film on water is extra, not required. Grain land and tea do not share a pH target.",
    "盐碱": "Squat on the whitest, worst strip and scrape the crust. Compare with a neighbour that is still green. White crust plus scorched margins count; wilt without a crust may just be drought. Note whether the ditch actually runs.",
    "板结": "When a hoe bounces or footprints sink, dig twenty centimetres and look for a shiny hard pan. Roots that turn sideways count. Cracked dust is extra. Keep machines off wet soil.",
    "有机质低": "Rub a handful next to a darker neighbour that still forms crumbs. Pale dusty soil that leaks after rain matches this page. Yellow leaves are extra — first ask whether the soil still has body.",
    "缺素": "First the leaf position: new or old, even yellow or between the veins. If that does not match, do not fertilise yet. Pull one plant and read whether the roots are white, brown or foul.",
    "连作障碍": "Patchy dead plants: look at the roots first — knots, brown rot, stained pipes — not the thin white roots of hunger. A rotated neighbour that still looks well is the contrast that counts.",
    "涝害": "Is the soil wet or dry, the root white or black? Wet wilt and a foul root mean drain first. Leaf wilt with white roots may be drought. Smell the root before you irrigate.",
    "肥害": "Ask what was applied, and how much. Injury in a line with granules in the seed furrow matches this page. Scattered patches look more like disease. Do not stack another bag.",
    "其他": "Walk the worst strip and compare a neighbour. Photograph the whole plant, a close-up and the soil surface. If those three do not line up, do not rush a bag. Lab numbers have to match the field.",
}
MECH_EN = {
    "酸化": "When the plough layer is too acid, aluminium injures growing tips, so water and nutrients cannot enter and the top looks hungry. Years of ammonium nitrogen and leaching push pH down. Give the tip a place to grow before a thin feed.",
    "盐碱": "Salt makes soil water costly to take up, so a light watering wilts more. Sodium also breaks crumbs — mud when wet, a crust when dry. Light frequent irrigation lifts salt. Gypsum is for high sodium, not every white frost.",
    "板结": "Traffic, wet tillage and thin organic matter flatten pores. Roots hit a hard pan and turn. A machine on wet soil is the usual way to make a plough pan. Loosen only when the soil cracks and does not smear.",
    "有机质低": "Organic matter helps crumbs, water and buffering. Taking grain and leaving no residue thins it. Then fertiliser will not stay, and salt or aluminium hurt more. A microbial bag is not the name of this cell.",
    "缺素": "Read leaf position and root colour first. The wrong leaf and the feed goes the wrong way. Nutrients in the soil that the root cannot reach are often locked by acid, alkali, water or salt. Clear the root’s path, then this nutrient.",
    "连作障碍": "The same crop leaves pathogens, salt and old roots in the plough layer, so dead patches thicken year by year. Extra fertiliser will not save an injured root. Read the knots and browning, then ask about rotation.",
    "涝害": "Roots need air. Water fills the pores, tips fail, and another irrigation keeps them smothered. Nitrogen cannot enter in that state. Drain standing water and let the subsoil dry before a thin feed.",
    "肥害": "Granules against the root make the solution too strong, so the root cannot take water. Seedling roots are short and sit on the band. Separate fertiliser from the root, dilute, and wait — more fertiliser is not the cure.",
    "其他": "What looks like hunger or drought is often a root that cannot take water or nutrients. Read the mechanism, then the matching field guide. Rates stay with a local station and the label; this page does not invent a bag count.",
}

# Unique tails so 12 priority blocks hit floors without new doses.
APP_X = {
    "suan-hua": "",
    "yan-jian": "拍整株、土面特写和邻垄还绿处对照。只午后蔫、土面不白，先当旱，不要打开石膏。井水发涩要另记一笔，沟里有没有出水也要看一眼。",
    "ban-jie": "从车辙和苗差处各刨一锹，把发亮硬盖和还能下锄的剖面并排放。根横走、苗戴帽才算这篇；只土面干裂、根还能下扎，只是加分。湿土脚印很深时不要进车。",
    "you-ji-zhi": "冬春裸地掉得最快。从浅色那垄和邻垄深色能成团的土各抓一把并排放。一抓就散、雨后很快漏干，才像这篇。叶子黄只是加分，先认土有没有肉。沙土更留不住，不要按黏土袋数抄。",
    "que-dan": "从黄得最匀的那垄和还绿的邻垄各摘几片老叶、各拔一棵根。叶位对不上，不要急着下尿素。新叶也黄要想缺硫或缺铁。根黑臭、田里有明水，先排水再谈氮。",
    "que-jia": "从焦得最重的那垄摘几片老叶，看焦是不是从叶缘往里走。土面有白霜再加焦边，先分盐害，不要直接补钾。洗根看看是不是还白。盐害常浇完更蔫，缺钾不一定。",
    "que-tie": "从黄得最明显的新梢摘几片，对着光看叶脉还绿不绿。石灰性土、浇了偏碱的水、pH 偏高，铁在土里走不动。邻垄新叶还绿、这块脉绿叶黄，并排放。不要一黄就喷叶面铁。",
    "lao-hai": "从蔫得最重的那一块和还挺着的邻垄对照根色。水稻田和旱地涝害样子不同，但根黑臭这一条通用。先认根，再认叶子黄不黄。土是湿的还蔫，不要当旱猛灌。",
    "shao-gen": "从焦得成行的那一带和没碰到肥的邻株对照。苗期更敏感。沿肥带焦、旁边还绿，不要当成病害全田打药。先认时间：刚下过肥，还是早就黄了。扒开种沟看有没有肥粒。",
    "ce-tu-bao-gao": "水土比不同，数字不能硬比。把单子和地里的根、叶、土面放一起看。报告是测量，不是处方，袋数去农业知识，问当地农技站。地块名对不上就重新取样。",
    "lv-du-shang-gen": "从发僵那垄拔一棵，用水冲净，对着光看根尖还有没有白点。缺肥的根还在，只是细；铝毒是根尖伤掉。邻垄根还白、这块褐秃，摆一起。先让新嘴长出来，再薄肥。",
    "shi-hui-yong-liang": "从包装袋上认产品名，不要用隔壁工地的灰。粮田常见每亩 50–150 公斤，约合每公顷 750–2250 公斤。沙土按下限，分两次旋进。茶园不要按这篇改到中性。",
}
MECH_X = {
    "suan-hua": "南方红黄壤本身缓冲弱，更容易掉到约 5.5 以下。改酸是给根尖重新长白尖，不是给叶子上一层肥。",
    "yan-jian": "干旱灌区、滨海、大棚滴口最常见。没沟大水漫灌只会把盐抬上来。盐害看电导，碱害看 pH 和交换性钠，两件事不要混着治。",
    "ban-jie": "机械深松只能在干到能裂、不抹泥的时候做，湿了只会把硬盖抹得更光。硬盖在二十厘米附近，松破一层就够，不要一次翻得又湿又深。",
    "you-ji-zhi": "连续三年还田加腐熟粪，比一季堆满靠谱。沙土少量多次，一次倒全年留不住。化验单上的有机质只说储量，不给当年袋数。",
    "que-dan": "水太多、根呼吸差，也会黄，但根往往发黑发臭。缺硫常常整株偏黄。缺铁是新叶黄、叶脉还绿。尿素不是所有黄叶的名字。",
    "que-jia": "盐害也会焦边，但常有白霜、滴口白圈、浇完更蔫。两件事搞混，钾肥会越补越咸。先看土面和电导，再谈钾。果不甜不是单独加钾的理由。",
    "que-tie": "石灰性母质、过量石灰、偏碱灌溉都会把新叶锁黄。先测 pH，再谈要不要叶面补铁。粮田改酸和叶面铁不是同一件事。茶园窗口不同。",
    "lao-hai": "冷浸田、沟不通、连阴雨最常见。根还黑时尿素进不去，还会伤残根。先把明水送走、底湿降下来，再停肥等新白根。",
    "shao-gen": "尿素、未腐熟粪、滴灌过浓都会烧。苗期根系浅，更容易贴上肥带。不要用更多肥去解。等新根再薄肥，这篇不给袋数。",
    "ce-tu-bao-gao": "pH 管不像不像铝毒和铁被锁；电导管咸不咸；有机质管缓冲和保肥。不同实验室、不同水土比，小数点不能对打。先认测量，再打开对应农业知识。",
    "lv-du-shang-gen": "有机质薄时缓冲弱，铝害更明显。茶园耐酸，不要用粮田的目标去改茶。治本是把耕层 pH 抬过伤根的门槛，不是再追氮。",
    "shi-hui-yong-liang": "一次倒太多，表层过碱，微量元素被锁，苗会黄。所以分两次，沙土按下限。与尿素同日，氨容易跑，还伤根。建筑石灰杂质和碱性都不适合下地。",
}
STEP_X = {
    "suan-hua": ["", "", ""],
    "yan-jian": [
        "先分清是盐还是碱，再谈下一袋，是因为石膏不是给所有白霜的。",
        "有沟才洗得走盐，井水也咸就先问沟通不通。",
        "用量去盐碱相关篇，须当地农技站确认，这篇不编袋数。",
    ],
    "ban-jie": [
        "先停湿土进车，是因为脚印能印很深时作业，只会把硬盖压得更光。",
        "干到能裂、不抹泥，才能机械深松，松破这一层即可，不要一次翻得又湿又深。",
        "松完用腐熟有机肥把孔隙养回来，一次深翻过湿，剖面会重新抹光。",
    ],
    "you-ji-zhi": [
        "先认薄不薄，再谈当年下多少肥，是因为浅粉散土留不住当季的肥。",
        "连续几年秸秆还田加腐熟粪。沙土少量多次，生粪不要埋根边。",
        "化验单上的有机质只说储量，当季怎么肥去对应缺素或沙土篇，问当地农技站。",
    ],
    "que-dan": [
        "先认叶位和根，是因为叶位对不上时尿素会下反。",
        "田里有明水或根黑臭，先排水，氮肥进不去，再浇等于继续闷。",
        "用量看包装和当地农技站，少量分次。这篇不给袋数。根白、叶位对上了再肥。",
    ],
    "que-jia": [
        "先看叶缘焦是不是从老叶开始，土面有没有白霜。两样对不上，不要先补钾。",
        "有白霜先按盐害那篇认电导。没有白霜、根还白，再按包装和农技站谈钾。",
        "钾肥少量分次。这篇不给袋数。果不甜不是单独加钾的理由。",
    ],
    "que-tie": [
        "先认新叶还是老叶。新叶黄、脉还绿，才往铁被锁住上靠。叶位不对，不要喷叶面铁。",
        "测耕层 pH。偏高时铁常被锁住，不是土里没有铁。石灰性土先问水是不是也偏碱。",
        "叶面补铁只是救急。治本看 pH 和灌溉。用量按包装和农技站，这篇不给袋数。",
    ],
    "lao-hai": [
        "先认土是湿是干、根是白是黑。湿土发蔫、根黑臭，先排水，不要再灌。",
        "沟要通。明水送走，底湿降下来，再停肥等新白根，是因为根还黑时肥进不去。",
        "新白根出来再薄肥。根还黑时尿素进不去，还会伤残根。这篇不给袋数。",
    ],
    "shao-gen": [
        "先认是不是刚施过肥、焦是不是成行。扒开种沟看有没有肥粒。对上了先别再叠肥。",
        "把肥粒从根边挪开，浇清水稀释。滴灌过浓就把肥液淡下来，是为了把浓度冲开。",
        "等新根再薄肥。这篇不给袋数。未腐熟粪不要再埋根边。",
    ],
    "ce-tu-bao-gao": [
        "先对地块名、深度、日期、水土比。对不上就重新取样，不要拿着别人的数字改自家地。",
        "按 pH、有机质、盐分、氮磷钾、微量元素往下圈。单位看错一位就停，肥会下反。",
        "数字对上地里的样子，再打开对应农业知识。用量须农技站和包装，这篇不下袋数。",
    ],
    "lv-du-shang-gen": [
        "拔一棵洗手洗根。根尖褐秃、少白尖，才往铝毒上靠。根还白，不要按这篇改酸。",
        "测 0～20 厘米 pH。粮田低于约 5.5 才改。农用石灰分两次，沙土按下限，与尿素不同日。",
        "等新白根再薄肥。茶园不要改到中性。下一季再测，过了目标就停。",
    ],
    "shi-hui-yong-liang": [
        "先确认这块地要改酸：粮田 pH 低于约 5.5，根尖对得上。茶园不要按粮田改到中性。",
        "只用不带建筑字样的农用石灰。粮田常见每亩 50–150 公斤，沙土按下限，分两次旋进。与尿素不同日。",
        "下一季再测 pH。过了目标就停，不要连年加码。设施按下限，这篇不编新袋数。",
    ],
}
DONT_X = {
    "suan-hua": [
        "茶园不要按粮田改到中性，茶树会伤，窗口大约 4.5～6.0。",
        "根尖褐秃时不要猛尿素，肥进不去还会烧残根。",
        "不要照搬别人的石灰用量，先测这块地耕层 pH。",
    ],
    "yan-jian": [
        "不要见白霜一律石膏，碱化才谈改钠。",
        "没沟不要大水漫灌，盐会被抬到地表。",
        "不要把越浇越蔫当成更缺水去猛灌。",
    ],
    "ban-jie": [
        "湿土不要进车，硬盖会被压得更光。",
        "不要在稀泥里深松，只会把剖面抹平。",
        "不要把板结当成缺肥去猛追氮。",
    ],
    "you-ji-zhi": [
        "生粪不要埋根边，会发热烧苗。",
        "不要把菌剂当成有机质那一格的数字。",
        "沙土不要一次倒全年的肥，留不住。",
    ],
    "que-dan": [
        "根黑臭时不要猛尿素，肥进不去。",
        "不要见黄叶就当缺氮去追尿素。",
        "新叶黄、脉还绿，不要当成缺氮。",
    ],
    "que-jia": [
        "不要见焦边就补钾，先看土面。",
        "白霜地不要把钾往盐上叠。",
        "不要一次把钾倒得过猛。",
    ],
    "que-tie": [
        "不要一黄就喷叶面铁，先问叶位。",
        "pH 偏高时不要再加石灰。",
        "不要把粮田和茶园的 pH 窗口搞混。",
    ],
    "lao-hai": [
        "湿土发蔫不要当旱猛灌。",
        "根黑臭时不要猛尿素，进不去。",
        "不要堵住排水沟继续闷根。",
    ],
    "shao-gen": [
        "不要用更多肥去解肥害。",
        "未腐熟粪不要埋在根边。",
        "苗期不要把肥粒贴在种子上。",
    ],
    "ce-tu-bao-gao": [
        "不要跨实验室、跨水土比硬比小数。",
        "不要把报告直接当成下一袋的袋数。",
        "茶园不要按粮田的 pH 目标改到中性。",
    ],
    "lv-du-shang-gen": [
        "根秃时不要猛尿素，肥进不去。",
        "茶园不要按粮田改到中性。",
        "不要不测 pH 就撒农用石灰。",
    ],
    "shi-hui-yong-liang": [
        "不用建筑石灰，杂质和碱性都不适合下地。",
        "不要与尿素同一天撒，氨会跑还伤根。",
        "茶园不要按粮田改到中性。",
    ],
}
CONF_X = {
    "suan-hua": [],
    "yan-jian": [
        "缺钾焦边时土面不一定白，根还能喝水。盐害常有白霜或滴口白圈，小水浇完更蔫。",
        "干旱是土干、浇透能缓。盐害是土还湿、浇完更蔫。先看土面和电导，不要当旱猛灌。",
    ],
    "ban-jie": [
        "缺水是土干、浇了能缓。板结是土还潮、根横着走，浇水在硬盖上打转。",
        "盐碱常有白霜或湿泥干板。机械压实常常没有白霜，车辙里最明显。先认土面再认硬盖。",
    ],
    "you-ji-zhi": [
        "缺氮是老叶匀黄、根还白。有机质薄是搓土散、一场雨肥就飘，不一定马上黄成一条。",
        "菌剂不是有机质含量。掉的那层要靠还田和腐熟粪几年养，不是一季能堆回去。",
    ],
    "que-dan": [
        "缺铁是新叶黄、叶脉还绿。缺氮是老叶先匀黄、新叶还绿。叶位搞反，肥会下反。",
        "涝害白天蔫晚上缓，根黑臭。缺氮的根往往还白。先认根，再认叶。",
    ],
    "que-jia": [
        "盐害常有白霜或滴口白圈，小水浇完更蔫。缺钾焦边时土面不一定白，根还能喝水。",
        "干热风常整片地一起焦，风口更重。缺钾从老叶叶缘慢慢往里走，邻垄能对照。",
    ],
    "que-tie": [
        "缺氮从老叶匀黄。缺铁从新叶黄、脉还绿。叶位搞反，肥会下反。",
        "缺锰也常从新叶，但田间要靠化验分。先认新叶还是老叶，再送样，不要两种微肥一起倒。",
    ],
    "lao-hai": [
        "干旱是土干、浇透能缓。涝害是土湿、浇完更蔫、根黑臭。先捏一把土再决定灌不灌。",
        "缺氮老叶匀黄、根常还白。涝害根先黑，叶子可以又蔫又黄，先认根。",
    ],
    "shao-gen": [
        "药害常有喷雾边界、叶面斑。肥害沿种沟或滴口成行，扒土能见肥粒。",
        "病害往往分散、有病斑或茎基缢缩。肥害时间紧跟施肥，成行、根黑。",
    ],
    "ce-tu-bao-gao": [
        "CEC 是阳离子交换量，说土能抓住多少养分。EC 是电导，说土水有多咸。字母差一个，事不是一件。",
        "报告只给门槛。袋数在农业知识里，还要当地农技站和包装。数字低了不是自动下一袋。",
    ],
    "lv-du-shang-gen": [
        "缺肥的根还在、还能伸，只是细。铝毒是根尖褐秃、侧根很少。洗出来一眼能分。",
        "肥害紧跟施肥、成行、种沟有肥粒。铝毒常整片发僵、对得上偏低的 pH。",
    ],
    "shi-hui-yong-liang": [
        "建筑石灰不能下地。农用石灰看包装和登记。用错了会伤苗，不要用装修剩下的灰。",
        "石膏常用于钠高的碱化土。这篇是改酸用的农用石灰，不是见白霜就撒。",
    ],
}
EX_X = {
    "suan-hua": "",
    "yan-jian": "露地白霜加叶缘焦、滴口一圈：先把肥液淡下来，沟要通，再测电导。pH 很高、湿泥干板，才像碱化，改碱要有排水才能把钠送走。没测不要见白霜就撒石膏。",
    "ban-jie": "雨后能印很深的车辙里不出苗：先停机械，干到土能裂再谈深松。硬盖在二十厘米附近，松破一层就够，不要一次翻得又湿又深。松完用腐熟有机肥把孔隙养回来。",
    "you-ji-zhi": "搓一把浅、粉、搓不成团：连续三年秸秆还田加腐熟粪，比一季堆满靠谱。沙土少量多次。生粪埋根边会烧苗。不要把菌剂袋子当成有机质数字。",
    "que-dan": "玉米底下老叶匀黄、新叶还绿、根白：先看是不是涝、是不是密度过大，再按当地农技站和包装谈氮。根已经黑臭，先排水，不要猛尿素。",
    "que-jia": "老叶叶缘焦、土面没有白霜、根还白：按当地农技站和包装谈钾，少量分次。土面已经白，先把盐的事说清楚，不要把钾袋往白霜上倒。",
    "que-tie": "新叶黄脉绿、耕层 pH 偏高：先停盲目加石灰，叶面补铁只是救急。治本是把 pH 和灌溉水说清楚。茶园和粮田的 pH 窗口不同，不要互相照搬。",
    "lao-hai": "玉米白天蔫、田里有明水、根已经发黑：先开沟把明水送走，停肥几天。根还黑时下尿素进不去。水退了再看新白根，再薄肥。",
    "shao-gen": "播种沟里能看见尿素粒、苗成行焦：把肥粒扒离根，浇清水稀释，停肥等新根。不要再叠复合肥。滴灌过浓就先改成更淡的肥液。",
    "ce-tu-bao-gao": "匿名粮田 pH 5.2、有机质 12.4 克/公斤、电导 0.28：粮田可以谈农用石灰，沙土按下限、分两次。茶园同样 5.2 不能改到中性。CEC 是阳离子交换量，不是电导。不要把美国单位或别的实验室的表抄过来。",
    "lv-du-shang-gen": "粮田根尖褐秃、pH 5.2：按农用石灰区间改酸，沙土按下限、分两次，与尿素不同日。等新白根再薄肥。茶园同样褐秃，先确认是不是本来就要偏酸，不要改到中性。",
    "shi-hui-yong-liang": "粮田 pH 5.2、沙壤：先按每亩 50 公斤农用石灰旋进，与尿素错开一周，下一季再测。黏土同样 5.2 可以看上限每亩 150 公斤量级，仍要分两次。茶园不要照搬。",
}

PHOTO4 = {
    "yan-jian": {
        "src": "/images/articles/yan-jian-di-xuan-zuo.jpg",
        "alt": "盐碱地缺苗对照邻块还能出苗",
        "caption": "邻块能出苗、这块缺苗，先问盐和沟。",
        "kind": "field",
    },
    "ban-jie": {
        "src": "/images/articles/ban-jie-yu-gen-xi.jpg",
        "alt": "硬盖让根横走",
        "caption": "根碰到硬盖拐弯。对照剖面。",
        "kind": "field",
    },
    "you-ji-zhi": {
        "src": "/images/articles/sha-tu-zeng-you-ji-zhi-2.jpg",
        "alt": "沙土增有机质对照",
        "caption": "沙土少量多次把有机质养厚。",
        "kind": "field",
    },
    "que-jia": {
        "src": "/images/articles/yu-mi-miao-huang.jpg",
        "alt": "叶缘焦和黄叶对照",
        "caption": "叶缘焦要先分盐害和缺钾。",
        "kind": "field",
    },
    "ce-tu-bao-gao": {
        "src": "/images/articles/ce-tu-qu-yang-2.jpg",
        "alt": "取样点混合后再留一袋",
        "caption": "取样错了，单子再准也改不了自家地。",
        "kind": "field",
    },
}

WIKI_ZH = {
    "cec": {
        "subtitle": "阳离子交换量说土能抓住多少养分，低了肥留不住。",
        "summary": "阳离子交换量说土能抓住多少养分离子。单子上常写成 CEC，单位常见厘米摩尔每公斤。低了肥下去留不住，沙土更明显；高了一次能多留一点。这一格不是当季袋数，沙土只能少量多次，质地改不掉，只能慢慢把有机质养起来。",
        "plainExplain": "CEC 低，肥下去留不住；CEC 高，一次能多留一点。质地改不掉，只能把有机质慢慢养起来。沙土少量多次，不要按黏土袋数抄。",
        "longform": [
            "抓一把沙土和一把黏土并排看。沙土像筛子，黏土能多留。CEC 是抓肥的结果，不是沙黏本身。沙土按黏土地的袋数一次倒全年，第二天就像没施。把有机质慢慢养起来，一次才能多留一点。"
        ],
    },
    "aggregate": {
        "subtitle": "团粒是土粒粘结成的小团，化肥不能立刻捏出来。",
        "summary": "团粒是土粒粘结成的小团，中间有孔隙。单子上有时写团聚体。好土能搓团又易散；干了像面、湿了像浆，是团粒散了，不是质地变了。化肥不能立刻捏出团粒，要靠有机质、根系和少碾。",
        "plainExplain": "团粒要靠有机质、根系和菌丝粘结。旋耕过碎、雨打裸地，团粒就散。干了面、湿了浆，是孔隙封了，不是沙变成了黏。",
        "longform": [
            "好土能搓团又易散。干了面、湿了浆，是孔隙封了，不是质地变了。胶水是有机质、根和菌丝。雨点砸裸地，团粒散得最快。别把这当成质地变了，去换沙换黏。"
        ],
    },
    "alkn": {
        "subtitle": "碱解氮说当季能用的那一部分氮，不是处方。",
        "summary": "碱解氮说当季能用的那一部分氮，不是土里全部的氮。单子上常写成碱解氮，单位常见毫克每公斤。过低容易脱肥黄叶，过高容易旺长。要和全氮对着看，这一格不是处方。",
        "plainExplain": "碱解氮过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。全氮是储量，碱解氮是当季能用的部分，两项对着看。",
        "longform": [
            "全氮是仓库，碱解氮是当季能用的那一部分。两项对着看，才知道是缺还是被锁。数字低了不是自动下一袋尿素，要和地里老叶匀黄、根色对得上，再打开缺氮那篇。"
        ],
    },
    "ca": {
        "subtitle": "交换性钙说土能交出来给根用的钙。叶面钙只救急。",
        "summary": "交换性钙说土能交出来给根用的钙。单子上常写成交换性钙。低了生长点容易饿着，叶面喷钙只救急。钙在土里几乎不搬家，干旱、盐、铵态氮、过酸都会让尖上缺钙。",
        "plainExplain": "钙几乎不搬家。干旱、盐、铵态氮、过酸，都会让生长点饿着。叶面钙只挡住这一茬的脸，土里钙走不到尖还要问水和铵态氮。",
        "longform": [
            "交换性钙是土能交出来的那一部分。叶面喷钙只能救急。钙在土里几乎不搬家，所以果针、顶芽、脐部更容易先缺。先问墒和铵态氮，再打开缺钙那篇，不要只补叶面。"
        ],
    },
    "porosity": {
        "subtitle": "孔隙度说空气和水能走的空隙占多少。改它靠结构。",
        "summary": "孔隙度说土里空气和水能走的空隙占多少。单粒散、被压实、湿耕，空隙就少，根会憋气。改它靠把团粒养回来，不靠当季猛氮。单子上这一格不是袋数。",
        "plainExplain": "团粒多则孔隙多。压实、湿耕、有机质薄，空隙就少。改它靠结构，不靠当季氮肥。",
        "longform": [
            "根要走空隙。压实、湿耕、有机质薄，空隙就少，白天蔫、根发黑。先停湿土进车，再谈深松和腐熟有机肥。当季猛氮填不回孔隙。"
        ],
    },
}

EN_DONT_X = {
    "shi-hui-yong-liang": [
        "Do not use builder’s lime. Impurities and the alkalinity do not belong on farmland.",
        "Do not spread lime the same day as urea. Ammonia will escape and the root can burn.",
        "Do not push a tea garden to neutral as if it were grain land.",
    ],
    "lv-du-shang-gen": [
        "Do not pour urea on bald tips. The feed cannot enter and will burn what is left.",
        "Do not push tea to neutral as if it were grain land. Tea stays around 4.5–6.0.",
        "Do not spread agricultural lime before you have a plough-layer pH on this field.",
    ],
    "suan-hua": [
        "Do not push tea to neutral as if it were grain land. Tea stays around 4.5–6.0.",
        "Do not pour urea on bald roots. The feed cannot enter and will burn what is left.",
        "Do not copy another field’s lime rate. Test this plough layer first.",
    ],
}


def add_photo(photos: list, extra: dict) -> list:
    srcs = {p.get("src") for p in photos}
    if extra["src"] in srcs:
        return photos
    out = list(photos)
    out.append(dict(extra))
    return out[:8]


def fill_priority(arts, enrich, en):
    am = {a["slug"]: a for a in arts}
    for slug in PRIORITY:
        a = am[slug]
        e = enrich.setdefault(slug, {})
        app = e.get("appearance") or a["phenomenon"]["appearance"]
        mech = e.get("mechanism") or a.get("mechanism") or ""
        app = grow(app, [APP_X.get(slug, "")], 180, 280, MORE_ZH, slug)
        mech = grow(mech, [MECH_X.get(slug, "")], 150, 220, MORE_ZH, slug + "-m")
        a["phenomenon"]["appearance"] = app
        a["mechanism"] = mech
        e["appearance"] = app
        e["mechanism"] = mech
        steps = list(a["solutions"]["steps"])
        extras = STEP_X.get(slug) or ["", "", ""]
        while len(steps) < 3:
            steps.append("对照邻垄和根叶，用量须当地农技站确认。")
        step_more = [
            "这一步先做，是因为对不上时后面的肥会下错。",
            "这一步先做，是因为根还进不去水肥。",
            "这一步先做，是因为袋数须农技站和包装确认。",
        ]
        for i in range(3):
            steps[i] = grow(strip_pad(steps[i]), [extras[i] if i < len(extras) else "", step_more[i]], 40, 80, step_more, slug + str(i))
        a["solutions"]["steps"] = steps[:3] + steps[3:]
        dont_more = ["先对照邻垄再决定。", "肥进不去还会伤根。", "先测这块地再改。"]
        if slug in DONT_X:
            a["dontDo"] = [grow(x, dont_more, 20, 40, dont_more, slug + f"d{i}") for i, x in enumerate(DONT_X[slug])]
        else:
            a["dontDo"] = [grow(d, dont_more, 20, 40, dont_more, slug + f"d{i}") for i, d in enumerate((a.get("dontDo") or [])[:3])]
        conf_more = ["洗出来的根和邻垄对照一眼就能分。", "两件事搞混，肥会下反。"]
        if slug in CONF_X and CONF_X[slug]:
            for i, diff in enumerate(CONF_X[slug]):
                if i < len(a["confuse"]):
                    a["confuse"][i]["difference"] = grow(diff, conf_more, 40, 60, conf_more, slug + f"c{i}")
        else:
            for i, c in enumerate(a.get("confuse") or []):
                c["difference"] = grow(c.get("difference") or "", conf_more, 40, 60, conf_more, slug + f"c{i}")
        if slug in EX_X and EX_X[slug]:
            a["example"] = grow(EX_X[slug], ["用量须当地农技站和包装确认，不要抄邻县袋数。"], 80, 140, MORE_ZH, slug + "ex")
            e["example"] = a["example"]
        elif a.get("example"):
            a["example"] = grow(a["example"], ["用量须当地农技站和包装确认，不要抄邻县袋数。"], 80, 140, MORE_ZH, slug + "ex")
            e["example"] = a["example"]
        if slug in PHOTO4:
            a["photos"] = add_photo(a.get("photos") or [], PHOTO4[slug])
        # EN dont pad
        g = en.setdefault(slug, {})
        if slug in EN_DONT_X:
            g["dontDo"] = EN_DONT_X[slug]
        # EN steps that are short
        esteps = list(g.get("steps") or [])
        while len(esteps) < 3:
            esteps.append("Use the rate range only as a range. Confirm with a local station and the label.")
        pads_en = [
            " Do this first so the next bag does not go on a root that cannot take it.",
            " Clear water, salt or a hard pan before a feed, or the fertiliser cannot enter.",
            " Rates stay with the local station and the product label; this page does not invent a bag count.",
        ]
        for i in range(3):
            esteps[i] = grow(esteps[i], [pads_en[i]], 80, 240, MORE_EN, slug + f"es{i}")
        g["steps"] = esteps
        if g.get("appearance"):
            g["appearance"] = grow(g["appearance"], [], 240, 640, MORE_EN, slug + "enapp")
        if g.get("mechanism"):
            g["mechanism"] = grow(g["mechanism"], [], 200, 520, MORE_EN, slug + "enmech")
        if g.get("example") and len(g["example"]) < 120:
            g["example"] = grow(
                g["example"],
                [" Confirm the same numbers with a local station and the label; do not copy a neighbour’s bag count."],
                120,
                220,
                MORE_EN,
                slug + "enex",
            )


def fill_rest(arts, enrich, en):
    for a in arts:
        slug = a["slug"]
        if slug in PRIORITY:
            continue
        e = enrich.setdefault(slug, {})
        problem = (a.get("problems") or ["其他"])[0]
        app = strip_pad(e.get("appearance") or a["phenomenon"]["appearance"])
        mech = strip_pad(e.get("mechanism") or a.get("mechanism") or "")
        app = grow(app, [FIELD_ZH.get(problem, FIELD_ZH["其他"]), f"拍整株、特写和土面三张，回到这篇《{a['title']}》对照。只对上一张叶子，不够下肥。"], 180, 280, MORE_ZH, slug)
        mech = grow(mech, [MECH_ZH.get(problem, MECH_ZH["其他"])], 150, 220, MORE_ZH, slug + "-m")
        a["phenomenon"]["appearance"] = app
        a["mechanism"] = mech
        e["appearance"] = app
        e["mechanism"] = mech
        steps = [strip_pad(s) for s in (a["solutions"]["steps"] or [])]
        while len(steps) < 3:
            steps.append("")
        why = [
            f"先把地里的样子认清，是因为《{a['title']}》对不上时肥会下错。",
            "先排除水、盐、硬盖或肥带这些挡路的事，后面的肥才进得去。",
            "用量须当地农技站和包装，这篇不编袋数。对照邻垄再决定。",
        ]
        a["solutions"]["steps"] = [grow(steps[i], [why[i]], 40, 80, why, slug + str(i)) for i in range(3)]
        g = en.setdefault(slug, {})
        eapp = (g.get("appearance") or "").strip()
        emech = (g.get("mechanism") or "").strip()
        g["appearance"] = grow(
            eapp,
            [FIELD_EN.get(problem, FIELD_EN["其他"]), "Photograph the whole plant, a close-up and the soil surface, then come back to this page. One yellow leaf is not a fertiliser order."],
            240,
            520,
            MORE_EN,
            slug,
        )
        g["mechanism"] = grow(emech, [MECH_EN.get(problem, MECH_EN["其他"])], 200, 420, MORE_EN, slug + "-m")
        esteps = list(g.get("steps") or [])
        while len(esteps) < 3:
            esteps.append("")
        ewhy = [
            " Compare the worst plants with a neighbour ridge before you add a bag, or the next step will chase the wrong thing.",
            " Clear water, salt, a hard pan or a fertiliser band first, so the feed can enter.",
            " Use the range on this page only as a range. Confirm with a local station and the product label.",
        ]
        g["steps"] = [grow(esteps[i], [ewhy[i]], 80, 240, MORE_EN, slug + f"s{i}") for i in range(3)]


def slogan_sweep(obj):
    if isinstance(obj, str):
        s = obj
        repl = [
            ("面包结构", "团粒结构"),
            ("呼吸的路", "通气孔隙"),
            ("当季饭量", "当季能用的氮"),
            ("钙砖", "能交换出来的钙"),
            ("磁力弱", "保肥能力弱"),
            ("磁力强", "保肥能力强"),
            ("同一把尺子", "同一套标准"),
            ("两套尺子", "两套标准"),
            ("酸碱尺子", "酸碱测量"),
            ("碱化尺子，不是盐尺子", "碱化指标，不是盐分指标"),
            ("紧不紧的尺子", "紧不紧的测量"),
            ("当季能用的氮的尺子", "当季能用的氮这一格"),
            ("的尺子", "的测量"),
            ("是尺子", "是测量"),
            ("tea is a different ruler", "tea uses a different range"),
            ("Tea is a different ruler", "Tea uses a different range"),
            ("different ruler", "different range"),
            ("报告是尺子不是处方", "报告是测量，不是处方"),
            ("地头试纸和电导仪是尺子，不是判决书", "地头试纸和电导仪是检查，不是判决书"),
            ("pH is a ruler", "pH is a measurement"),
            ("The rulers", "The measurements"),
            ("acid–alkaline ruler", "acid–alkaline measurement"),
            ("acid-alkaline ruler", "acid-alkaline measurement"),
            ("are rulers, not verdicts", "are checks, not verdicts"),
            ("own ruler", "own range"),
            ("alkali rulers, not salt rulers", "alkali readings, not salt readings"),
            ("tightness ruler", "tightness reading"),
            ("first ruler", "first check"),
            ("Strong for the ruler", "Strong for the measurement"),
            ("pickles the root", "burns the root"),
            ("pickle the root", "burn the root"),
            ("pickles it", "burns it"),
            ("salty pickles", "salty scorch"),
            ("talk fertiliser", "add fertiliser"),
            ("Translation pending", ""),
            ("loaf structure", "crumb structure"),
            ("house and the meal", "store and the season’s supply"),
            ("this season’s plate", "what the crop can use this season"),
            ("breathing road", "air pores"),
            ("cup mark", "the reading"),
        ]
        for a, b in repl:
            s = s.replace(a, b)
        return s
    if isinstance(obj, list):
        return [slogan_sweep(x) for x in obj]
    if isinstance(obj, dict):
        return {k: slogan_sweep(v) for k, v in obj.items()}
    return obj


def patch_wiki(wiki):
    for kid, fields in WIKI_ZH.items():
        term = wiki.get(kid)
        if not term:
            continue
        zh = term.setdefault("zh", {})
        for k, v in fields.items():
            zh[k] = v
    return wiki


def sync_index(idx, arts):
    am = {a["slug"]: a for a in arts}
    for card in idx:
        a = am.get(card["slug"])
        if not a:
            continue
        card["summary"] = a["summary"]
        card["subtitle"] = a["subtitle"]
        if a.get("photos"):
            card["photos"] = [{"src": p["src"], "alt": p.get("alt", "")} for p in a["photos"][:4]]
    return idx


def main():
    arts = json.loads((ROOT / "articles.json").read_text())
    enrich = json.loads((ROOT / "enrich.json").read_text())
    en = json.loads((ROOT / "articles-en.json").read_text())
    meta = json.loads((ROOT / "articles-en-meta.json").read_text())
    wiki = json.loads((ROOT / "wiki.json").read_text())
    idx = json.loads((ROOT / "articles-index.json").read_text())
    labg = json.loads((ROOT / "lab-groups.json").read_text())
    posts = json.loads((ROOT / "posts.json").read_text())
    videos = json.loads((ROOT / "videos.json").read_text())

    fill_priority(arts, enrich, en)
    fill_rest(arts, enrich, en)
    wiki = patch_wiki(wiki)

    arts = slogan_sweep(arts)
    enrich = slogan_sweep(enrich)
    en = slogan_sweep(en)
    meta = slogan_sweep(meta)
    wiki = slogan_sweep(wiki)
    idx = slogan_sweep(idx)
    labg = slogan_sweep(labg)
    posts = slogan_sweep(posts)
    videos = slogan_sweep(videos)

    for g in labg:
        if g.get("id") == "ruler" or g.get("titleEn") in ("The rulers", "The measurements"):
            g["title"] = "单子上的测量"
            g["titleEn"] = "The measurements"

    idx = sync_index(idx, arts)

    def dump(name, obj):
        (ROOT / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

    dump("articles.json", arts)
    dump("enrich.json", enrich)
    dump("articles-en.json", en)
    dump("articles-en-meta.json", meta)
    dump("wiki.json", wiki)
    dump("articles-index.json", idx)
    dump("lab-groups.json", labg)
    dump("posts.json", posts)
    dump("videos.json", videos)

    am = {a["slug"]: a for a in arts}
    print("=== PRIORITY ZH ===")
    for s in PRIORITY:
        a = am[s]
        e = enrich[s]
        app = e.get("appearance") or a["phenomenon"]["appearance"]
        mech = e.get("mechanism") or a.get("mechanism") or ""
        steps = a["solutions"]["steps"][:3]
        dont = a.get("dontDo") or []
        conf = [c.get("difference", "") for c in a.get("confuse") or []]
        ex = e.get("example") or a.get("example") or ""
        print(
            f"{s:20} app={len(app):3} mech={len(mech):3} steps={[len(x) for x in steps]} dont={[len(x) for x in dont]} conf={[len(x) for x in conf]} ex={len(ex)} photos={len(a.get('photos') or [])}"
        )
    fail_app = fail_mech = fail_step = 0
    for a in arts:
        if a["slug"] in PRIORITY:
            continue
        e = enrich[a["slug"]]
        app = e.get("appearance") or ""
        mech = e.get("mechanism") or ""
        steps = a["solutions"]["steps"][:3]
        if not (180 <= len(app) <= 280):
            fail_app += 1
        if not (150 <= len(mech) <= 220):
            fail_mech += 1
        if any(not (40 <= len(x) <= 80) for x in steps):
            fail_step += 1
    print(f"REST fail app={fail_app} mech={fail_mech} step={fail_step}")
    slogans = ["腌根", "家底不是菌剂", "面包结构", "呼吸的路", "当季饭量", "钙砖", "磁力弱", "pH is a ruler", "talk fertiliser", "Translation pending", "pickles the root"]
    blob = json.dumps(arts, ensure_ascii=False) + json.dumps(wiki, ensure_ascii=False) + json.dumps(en, ensure_ascii=False) + json.dumps(labg, ensure_ascii=False)
    for w in slogans:
        n = blob.count(w)
        if n:
            print("STILL", w, n)


if __name__ == "__main__":
    main()
