#!/usr/bin/env python3
"""Expand Tuzhi field-guide blocks. Does not invent new dose numbers."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")

def load(p: Path):
    return json.loads(p.read_text())

def dump(p: Path, obj):
    p.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

def strip_no(s: str) -> str:
    t = s.strip()
    for _ in range(4):
        n = re.sub(r"^\s*\d+\s*[）).、:：]\s*", "", t)
        n = re.sub(r"^\s*\d+\s+", "", n)
        if n == t:
            break
        t = n
    return t

def clip(s: str, lo: int, hi: int) -> str:
    s = s.strip()
    if not s.endswith("。") and not s.endswith("."):
        if re.search(r"[\u4e00-\u9fff]", s):
            s += "。"
    if len(s) > hi:
        s = s[: hi - 1].rstrip("，,；; ") + ("。" if re.search(r"[\u4e00-\u9fff]", s) else ".")
    return s

def ensure_len(s: str, extra: str, lo: int, hi: int) -> str:
    s = s.strip()
    if len(s) < lo:
        add = extra if extra.endswith("。") or extra.endswith(".") else extra + ("。" if re.search(r"[\u4e00-\u9fff]", extra) else ".")
        s = (s.rstrip("。.") + "。" + add) if re.search(r"[\u4e00-\u9fff]", s) else (s.rstrip(".") + " " + add)
    return clip(s, lo, hi)

PRIORITY_ZH = {}
PRIORITY_EN = {}

# --- 12 priority: Chinese ---
PRIORITY_ZH["suan-hua"] = dict(
    subtitle="pH 是测量值，不是病名。粮田低于约 5.5 才谈改酸。",
    summary="秧苗发僵、邻垄还绿时，先拔一棵洗手看根尖。根尖褐秃再测耕作层 pH，粮田低于约 5.5 才谈农用石灰。",
    appearance="秧苗发僵，是新叶出得慢、心叶打不开、蹲下去一看新根很少，不要只看地上黄不黄。从发僵最明显的那一垄拔一棵，连根带泥捧到沟边，用水轻轻冲，不要搓掉根尖。洗干净后先看根尖：还在长的白尖多，才像还能喝水；根尖褐、秃、侧根很少，才像铝毒伤根。浇水冒锈水、水面有油膜，只是加分项，不是每一块酸地都冒。邻垄还绿、这块僵，把两处的根摆在一起比。粮田和茶园不能用同一套标准：粮田 pH 低于约 5.5 才谈改酸；茶园大约 4.5 到 6.0，不能照搬粮田改到中性。",
    mechanism="土太酸时，铝从矿物里溶出来，专伤正在伸的根尖。根尖一秃，水和养分进不去，地上看起来像缺氮缺磷，再追尿素也发不了棵。铵态氮连年当唯一氮源、雨水把钙镁淋走，都会把耕层 pH 往下推。南方红黄壤本身就酸，连年生理酸性肥会更酸。茶树耐酸，粮田不是越酸越好。改酸是给根尖重新长白尖，不是给叶子上一层肥。",
    example="同一块粮田测出 pH 5.2，可以谈农用石灰：沙土按每亩 50 公斤量级、分两次旋进；黏土可看到每亩 150 公斤量级上限，仍要分两次。茶园同样 5.2，窗口往往还在 4.5 到 6.0，不能照搬粮田改到中性。跟尿素不同日，不用建筑石灰。",
    confuse=[
        {"lookalike": "缺氮黄叶", "difference": "缺氮是下部老叶匀黄、顶上新叶还绿，洗出来的根往往还白。酸化是根尖先伤，整株发僵，再追氮也发不了棵。", "photoHint": "把两处的根摆一起：褐秃少白尖，还是白而多。"},
        {"lookalike": "冷害发僵", "difference": "低温发僵，回暖几天会缓过来。酸化回暖也不长新白根。回暖一周仍僵，就把 pH 试纸带下地，不要先加尿素。", "photoHint": "回暖后仍僵的苗，对照邻垄还绿的根。"},
    ],
    steps=[
        "从发僵最明显的那一垄拔一棵，连根带到沟边用水冲净。先认根尖再谈肥，是因为根尖秃了，肥进不去，先下尿素只会烧残根。",
        "测 0～20 厘米耕层 pH。粮田低于约 5.5 才改酸。农用石灰常见每亩 50–150 公斤，分两次，沙土按下限；与尿素不同日，不用建筑石灰。",
        "茶园不要按粮田改到中性，窗口大约 4.5～6.0。等新白根长出来，再薄肥。下一季再测 pH，过了目标就停。",
    ],
    dontDo=["茶园不要按粮田改到中性，会伤茶树。", "根尖褐秃时不要猛尿素，肥进不去还会烧根。", "不要照搬别人的石灰用量，先测这块地的 pH。"],
    extra=[
        {"src": "/images/articles/lv-du-shang-gen.jpg", "alt": "根尖褐秃对照", "caption": "铝毒伤根的根尖对照，实验室材料。", "kind": "lab"},
        {"src": "/images/articles/shi-hui-yong-liang.jpg", "alt": "农用石灰包装", "caption": "看包装认农用石灰，不是建筑石灰。", "kind": "field"},
    ],
)

PRIORITY_ZH["yan-jian"] = dict(
    subtitle="土面白粉或硬壳、叶缘发焦，先把盐害和碱化分开。",
    summary="土面有白粉或硬壳、叶缘发焦、小水浇完更蔫，先分盐害和碱化。盐害看电导，碱害看 pH 和钠。",
    appearance="蹲下去看土面：薄薄一层白粉，还是结成能揭起来的硬壳。出苗一块有一块没有，叶缘发焦发脆。小水浇完更蔫，不要当成旱了猛灌。从出苗差的那一块和还绿的邻垄各拔一棵，对照根和叶缘。白霜是盐分的线索，不是处方。盐害看电导，碱害看 pH 和交换性钠，两件事不要混着治。井水要是也咸，先问沟通不通，再谈灌。",
    mechanism="盐把土水变咸，根吸水费劲，所以小水浇完更蔫。钠高还会把团粒拆散，湿时泥、干时板。小水勤浇等于把盐用电梯送到地表。干旱灌区、滨海、大棚滴口最常见。石膏改的是钠高的碱化，不是所有白霜。没沟大水漫灌只会把盐抬上来。",
    example="露地白霜加叶缘焦、滴口一圈：先把肥液淡下来，沟要通，再测电导。pH 很高、湿泥干板，才像碱化，改碱要有排水才能把钠送走。没测不要见白霜就撒石膏。",
    confuse=[
        {"lookalike": "缺钾焦边", "difference": "缺钾焦边时土面不一定白，根还能喝水。盐害常有白霜或滴口白圈，小水浇完更蔫。", "photoHint": "土面白霜和叶缘焦边放在一张照片里。"},
        {"lookalike": "单纯干旱", "difference": "干旱是土干、浇透能缓。盐害是土还湿、浇完更蔫。先看土面和电导，不要当旱猛灌。", "photoHint": "浇完仍蔫的苗，对照土面湿不湿。"},
    ],
    steps=[
        "蹲下去认土面：白粉、硬壳、滴口白圈，和邻垄还绿处对照拍。先分清是盐还是碱，再谈下一袋。",
        "沟要通。肥液先淡。小水勤浇会把盐抬上来，有沟才洗。井水也咸就先问沟通不通。",
        "pH 很高、湿泥干板才谈改碱。石膏不是给所有白霜的。用量去盐碱相关篇，须当地农技站确认。",
    ],
    dontDo=["不要见白霜一律石膏，碱化才谈改钠。", "没沟不要大水漫灌，盐会被抬上来。", "不要把越浇越蔫当成更缺水。"],
    extra=[
        {"src": "/images/articles/yan-jian.jpg", "alt": "土面白霜", "caption": "土面白粉或硬壳要拍清楚。", "kind": "field"},
        {"src": "/images/articles/fan-yan.jpg", "alt": "浇后返盐", "caption": "小水浇完更白，常常是盐被抬上来。", "kind": "field"},
    ],
)

PRIORITY_ZH["ban-jie"] = dict(
    subtitle="雨后一层稀泥、干了发硬，根横着走，先认硬盖再谈肥。",
    summary="锄头试一下：雨后稀泥、干了发硬，苗戴帽、根横走。刨开二十厘米看有没有发亮的硬盖，湿土别进车。",
    appearance="拿锄试一下：雨后一层稀泥、干了发硬，锄下去弹回来。苗戴帽出土，根横着走，不肯往下扎。在车辙和苗差处刨一个坑，看二十厘米下面有没有发亮、像刀切的硬盖。湿土脚印能印很深时不要进车。邻垄还能下锄、这块弹回来，把两处的剖面摆一起看。板结是根的路被堵住，不是单纯缺肥。",
    mechanism="反复碾压、湿耕、有机质薄，团粒被压扁，孔隙变少。根碰到硬盖就横走，水和气过不去。湿土进车最容易压出犁底层。机械深松只能在干到能裂、不抹泥的时候做，湿了只会把硬盖抹得更光。",
    example="雨后能印很深的车辙里不出苗：先停机械，干到土能裂再谈深松。硬盖在二十厘米附近，松破一层就够，不要一次翻得又湿又深。松完用腐熟有机肥把孔隙养回来。",
    confuse=[
        {"lookalike": "缺水发蔫", "difference": "缺水是土干、浇了能缓。板结是土还潮、根横着走，浇水在硬盖上打转。", "photoHint": "剖面上看根是向下还是碰到硬盖拐弯。"},
        {"lookalike": "盐碱板结", "difference": "盐碱常有白霜或湿泥干板。机械压实常常没有白霜，车辙里最明显。先认土面再认硬盖。", "photoHint": "车辙剖面和白霜土面不要混在一张图里下结论。"},
    ],
    steps=[
        "先停湿土进车。脚印能印很深时作业，只会把硬盖压得更光，后面更难松。",
        "刨一个坑看二十厘米有没有发亮硬盖。干到能裂、不抹泥，才能机械深松，松破这一层即可。",
        "松完用腐熟有机肥把孔隙养回来。一次深翻过湿，剖面会重新抹光。",
    ],
    dontDo=["湿土不要进车，硬盖会更光。", "不要在稀泥里深松，只会抹平。", "不要把板结当成缺肥猛追。"],
    extra=[
        {"src": "/images/articles/ban-jie.jpg", "alt": "田间板结土面", "caption": "干了发硬的土面。", "kind": "field"},
        {"src": "/images/articles/li-di-ceng.jpg", "alt": "犁底层剖面", "caption": "二十厘米附近发亮的硬盖。", "kind": "field"},
    ],
)

PRIORITY_ZH["you-ji-zhi"] = dict(
    subtitle="颜色浅、搓不成团，一场雨肥就飘，先把有机质慢慢养起来。",
    summary="搓一把土：颜色浅、发粉、搓不成团，肥下去一场雨又像没施。有机质要连续几年还田加腐熟粪，不是一季菌剂能补回。",
    appearance="搓一把耕层土：颜色浅、发粉、搓不成团，从指缝漏下去。肥下去一场雨又像没施。冬春裸地掉得最快。邻垄还能搓团、这块散，并排放着看。颜色浅不是化验单，但浅了常常有机质薄。沙土更留不住，黏土能多留一点。不要指望一袋菌剂一季补回掉的那层。",
    mechanism="有机质是土壤里已经腐解和正在腐解的有机物质，能帮忙团粒、保水、缓冲酸碱。连年只拿走籽粒、秸秆不还、生粪乱埋，这一层会越来越薄。薄了以后肥留不住，铝害、盐害也更明显。菌剂不是有机质的商品名，连续三年还田加腐熟粪，比一季堆满靠谱。",
    example="搓一把浅、粉、团不住：连续三年秸秆还田加腐熟粪，比一季堆满靠谱。沙土少量多次。生粪埋根边会烧苗。不要把菌剂袋子当成有机质数字。",
    confuse=[
        {"lookalike": "缺氮黄叶", "difference": "缺氮是老叶匀黄、根还白。有机质薄是搓土散、一场雨肥就飘，不一定马上黄成一条。", "photoHint": "浅色散土和邻垄能搓团的土并排。"},
        {"lookalike": "一袋菌剂补回来", "difference": "菌剂不是有机质含量。掉的那层要靠还田和腐熟粪几年养，不是一季能堆回去。", "photoHint": "包装上的菌剂名不要当成化验单上的有机质。"},
    ],
    steps=[
        "搓一把土，和邻垄深色能成团的土并排看。先认薄不薄，再谈当年下多少肥。",
        "连续几年秸秆还田加腐熟粪。沙土少量多次，一次倒全年留不住。生粪不要埋根边。",
        "化验单上的有机质只说储量，不给袋数。当季怎么肥，去对应缺素或沙土篇，问当地农技站。",
    ],
    dontDo=["生粪不要埋根边，会烧苗。", "不要把菌剂当成有机质数字。", "沙土不要一次倒全年的肥。"],
    extra=[
        {"src": "/images/articles/jie-gan-huan-tian.jpg", "alt": "秸秆还田", "caption": "还田是养有机质的路，不是一季堆满。", "kind": "field"},
        {"src": "/images/articles/sha-tu-zeng-you-ji-zhi.jpg", "alt": "沙土保肥", "caption": "沙土留不住，要少量多次。", "kind": "field"},
    ],
)

PRIORITY_ZH["que-dan"] = dict(
    subtitle="底下老叶匀黄、新叶还绿、根是白的，才像缺氮。",
    summary="底下老叶匀黄，顶上新叶还绿，洗出来的根是白的，才像缺氮。新叶也黄要想缺硫或缺铁。根黑臭时不要猛尿素。",
    appearance="先认叶位：黄的是底下老叶还是顶上新叶。底下老叶匀黄、顶上新叶还绿，整株能往上长，洗出来的根是白的，才像缺氮。新叶也黄，要想缺硫或缺铁。根黑臭、田里有明水，不要先扣缺氮的帽子。从黄得最匀的那垄和还绿的邻垄各摘几片老叶、各拔一棵根对照。叶位对不上，不要急着下尿素。",
    mechanism="氮在植物里会从老叶搬到新叶，所以缺了先黄老叶。水太多、根呼吸差，也会黄，但根往往发黑发臭。缺硫常常整株偏黄。缺铁是新叶黄、叶脉还绿。先认叶位和根色，再谈氮。尿素不是所有黄叶的名字。",
    example="玉米底下老叶匀黄、新叶还绿、根白：先看是不是涝、是不是密度过大，再按当地农技站和包装谈氮。根已经黑臭，先排水，不要猛尿素。",
    confuse=[
        {"lookalike": "缺铁新叶黄", "difference": "缺铁是新叶黄、叶脉还绿。缺氮是老叶先匀黄、新叶还绿。叶位搞反，肥会下反。", "photoHint": "新叶和老叶放在一张特写里。"},
        {"lookalike": "涝害黄叶", "difference": "涝害白天蔫晚上缓，根黑臭。缺氮的根往往还白。先认根，再认叶。", "photoHint": "洗根：白还是黑臭。"},
    ],
    steps=[
        "先认叶位和根。老叶匀黄、新叶绿、根白，才往缺氮上靠。叶位对不上，先别下尿素。",
        "排除涝害和药害。田里有明水或根黑臭，先排水，氮肥进不去。",
        "用量看包装和当地农技站，少量分次。这篇不给袋数。根白、叶位对上了再肥。",
    ],
    dontDo=["根黑臭时不要猛尿素。", "不要见黄叶就当缺氮。", "新叶黄脉绿不要当缺氮。"],
    extra=[
        {"src": "/images/articles/yu-mi-miao-huang.jpg", "alt": "玉米苗黄对照", "caption": "先认老叶还是新叶黄。", "kind": "field"},
        {"src": "/images/articles/huang-ye-jian-bie.jpg", "alt": "黄叶叶位", "caption": "叶位对不上不要下尿素。", "kind": "field"},
    ],
)

PRIORITY_ZH["que-jia"] = dict(
    subtitle="老叶叶缘先焦、往里卷，土面不一定白，先分盐害和缺钾。",
    summary="老叶叶缘先焦，像火燎过往里卷，茎软果不甜。土面白霜加焦边，先分盐害和缺钾，不要直接补钾。",
    appearance="老叶叶缘先焦，像火燎过往里卷，茎发软，果不甜。从焦得最重的那垄摘几片老叶，看焦是不是从叶缘往里走。土面不一定白。土面有白霜再加焦边，先分盐害和缺钾，不要直接补钾。邻垄叶缘还绿、这块焦，并排放。洗根看看是不是还白。盐害常浇完更蔫，缺钾不一定。",
    mechanism="钾在植物里也能从老叶搬到新叶，所以缺了先焦老叶叶缘。盐害也会焦边，但常有白霜、滴口白圈、浇完更蔫。两件事搞混，钾肥会越补越咸。先看土面和电导，再谈钾。",
    example="老叶叶缘焦、土面没有白霜、根还白：按当地农技站和包装谈钾，少量分次。土面已经白，先把盐的事说清楚，不要把钾袋往白霜上倒。",
    confuse=[
        {"lookalike": "盐害焦边", "difference": "盐害常有白霜或滴口白圈，小水浇完更蔫。缺钾焦边时土面不一定白。", "photoHint": "叶缘焦边和土面白霜要分开拍。"},
        {"lookalike": "干热风焦边", "difference": "干热风常整片地一起焦，风口更重。缺钾从老叶叶缘慢慢往里走，邻垄能对照。", "photoHint": "风口焦和老叶叶缘焦不要混。"},
    ],
    steps=[
        "先看叶缘焦是不是从老叶开始，土面有没有白霜。两样对不上，不要先补钾。",
        "有白霜先按盐害那篇认电导。没有白霜、根还白，再按包装和农技站谈钾。",
        "钾肥少量分次。这篇不给袋数。果不甜不是单独加钾的理由。",
    ],
    dontDo=["不要见焦边就补钾。", "白霜地不要把钾往盐上叠。", "不要一次倒得过猛。"],
    extra=[
        {"src": "/images/articles/que-jia.jpg", "alt": "老叶叶缘焦", "caption": "缺钾常从老叶叶缘往里焦。", "kind": "field"},
        {"src": "/images/articles/yan-jian-2.jpg", "alt": "土面白霜对照", "caption": "有白霜先分盐害，不要直接补钾。", "kind": "field"},
    ],
)

PRIORITY_ZH["que-tie"] = dict(
    subtitle="新叶黄、叶脉还绿，先问 pH 是不是把铁锁住了。",
    summary="分清黄的是新叶还是老叶。新叶黄、叶脉还绿，顶端更明显，常是 pH 偏高把铁锁住，不是土里没有铁。",
    appearance="分清黄的是新叶还是老叶。新叶黄、叶脉还绿，顶端更明显，老叶相对还绿，才像缺铁或铁被锁住。从黄得最明显的新梢摘几片，对着光看叶脉还绿不绿。石灰性土、浇了偏碱的水、pH 偏高，铁在土里走不动。邻垄新叶还绿、这块脉绿叶黄，并排放。不要一黄就喷一瓶叶面铁，先问 pH。",
    mechanism="铁在植物里不太会从老叶搬到新叶，所以缺了先黄新叶、脉还绿。pH 偏高时铁被锁在土里，不是袋子里没有铁。石灰性母质、过量石灰、偏碱灌溉都会把新叶锁黄。先测 pH，再谈要不要叶面补铁。粮田改酸和叶面铁不是同一件事。",
    example="新叶黄脉绿、耕层 pH 偏高：先停盲目加石灰，叶面补铁只是救急。治本是把 pH 和灌溉水说清楚。茶园和粮田的 pH 窗口不同，不要互相照搬。",
    confuse=[
        {"lookalike": "缺氮老叶黄", "difference": "缺氮从老叶匀黄。缺铁从新叶黄、脉还绿。叶位搞反，肥会下反。", "photoHint": "新叶脉绿和老叶匀黄对照。"},
        {"lookalike": "缺锰脉间黄", "difference": "缺锰也常从新叶，但田间要靠化验分。先认新叶还是老叶，再送样，不要两种微肥一起倒。", "photoHint": "新叶特写，脉还绿不绿要拍清。"},
    ],
    steps=[
        "先认新叶还是老叶。新叶黄、脉还绿，才往铁被锁住上靠。叶位不对，不要喷叶面铁。",
        "测耕层 pH。偏高时铁常被锁住，不是土里没有铁。石灰性土先问水是不是也偏碱。",
        "叶面补铁只是救急。治本看 pH 和灌溉。用量按包装和农技站，这篇不给袋数。",
    ],
    dontDo=["不要一黄就喷叶面铁。", "pH 偏高时不要再加石灰。", "不要把粮田和茶园的 pH 窗口搞混。"],
    extra=[
        {"src": "/images/articles/pu-tao-shi-hui-tu-que-tie.jpg", "alt": "石灰性土新叶黄", "caption": "石灰性土上新叶黄、脉还绿。", "kind": "field"},
        {"src": "/images/articles/shi-hui-xing-tu.jpg", "alt": "石灰性土壤", "caption": "先问 pH，再谈铁。", "kind": "field"},
    ],
)

PRIORITY_ZH["lao-hai"] = dict(
    subtitle="白天蔫晚上缓，土是湿的还蔫，先看根黑不黑。",
    summary="白天蔫晚上缓，田里有明水或底湿，根黑臭。土是湿的还蔫，先排水，不要当旱猛灌，也不要猛尿素。",
    appearance="白天蔫晚上缓，田里有明水或脚一踩就咕叽，底土凉。拔一棵看根：白还是黑、臭不臭。土是湿的还蔫，不要当旱猛灌。从蔫得最重的那一块和还挺着的邻垄对照根色。水稻田和旱地涝害样子不同，但根黑臭这一条通用。先认根，再认叶子黄不黄。",
    mechanism="根要呼吸。水把孔隙填满，氧气进不去，根尖先伤，地上白天蔫晚上能缓一点。再浇等于继续闷。氮肥在缺氧时进不去，还容易反硝化跑掉。先把明水排掉、把底湿降下来，再谈肥。冷浸田、沟不通、连阴雨最常见。",
    example="玉米白天蔫、田里有明水、根已经发黑：先开沟把明水送走，停肥几天。根还黑时下尿素进不去。水退了再看新白根。",
    confuse=[
        {"lookalike": "干旱发蔫", "difference": "干旱是土干、浇透能缓。涝害是土湿、浇完更蔫、根黑臭。先捏一把土。", "photoHint": "湿土发蔫和干土发蔫对照。"},
        {"lookalike": "缺氮黄叶", "difference": "缺氮老叶匀黄、根常还白。涝害根先黑，叶子可以又蔫又黄。", "photoHint": "洗根：白还是黑臭。"},
    ],
    steps=[
        "先认土是湿是干、根是白是黑。湿土发蔫、根黑臭，先排水，不要再灌。",
        "沟要通。明水送走，底湿降下来，再停肥等新白根。",
        "新白根出来再薄肥。根还黑时尿素进不去，还会伤残根。",
    ],
    dontDo=["湿土发蔫不要当旱猛灌。", "根黑臭时不要猛尿素。", "不要堵住排水沟。"],
    extra=[
        {"src": "/images/articles/xiu-shui-tian.jpg", "alt": "渍水田面", "caption": "明水或底湿要拍进画面。", "kind": "field"},
        {"src": "/images/articles/qian-yu-tian.jpg", "alt": "潜育化土层", "caption": "底湿发青发臭时先排水。", "kind": "field"},
    ],
)

PRIORITY_ZH["shao-gen"] = dict(
    subtitle="施肥几天内叶焦根黑，种沟能见肥粒，先认肥害再谈补救。",
    summary="施肥几天内叶焦根黑，种沟能见肥粒，沿肥带成行。先把肥从根边挪开、浇水稀释，不要再叠一袋。",
    appearance="施肥几天内叶子发焦、根发黑，顺着种沟或滴口成行。扒开土能看见没化开的肥粒。从焦得成行的那一带和没碰到肥的邻株对照。苗期更敏感。沿肥带焦、旁边还绿，不要当成病害全田打药。先认时间：刚下过肥，还是早就黄了。",
    mechanism="肥粒贴着根，浓度太高，根吸水费劲，细胞会伤。尿素、未腐熟粪、滴灌过浓都会烧。苗期根系浅，更容易贴上肥带。先把肥和根分开，浇水把浓度冲淡，再等新根。不要用更多肥去“解”。",
    example="播种沟里能看见尿素粒、苗成行焦：把肥粒扒离根，浇清水稀释，停肥等新根。不要再叠复合肥。滴灌过浓就先改成更淡的肥液。",
    confuse=[
        {"lookalike": "药害斑", "difference": "药害常有喷雾边界、叶面斑。肥害沿种沟或滴口成行，扒土能见肥粒。", "photoHint": "成行焦苗和种沟肥粒放一起。"},
        {"lookalike": "病害死苗", "difference": "病害往往分散、有病斑或茎基缢缩。肥害时间紧跟施肥，成行、根黑。", "photoHint": "时间线和成行分布比病斑更先看。"},
    ],
    steps=[
        "先认是不是刚施过肥、焦是不是成行。扒开种沟看有没有肥粒。对上了先别再叠肥。",
        "把肥粒从根边挪开，浇清水稀释。滴灌过浓就把肥液淡下来。",
        "等新根再薄肥。这篇不给袋数。未腐熟粪不要再埋根边。",
    ],
    dontDo=["不要用更多肥去解肥害。", "未腐熟粪不要埋根边。", "苗期不要把肥粒贴在种子上。"],
    extra=[
        {"src": "/images/articles/miao-qi-fei-hai.jpg", "alt": "苗期肥害", "caption": "沿肥带成行焦苗。", "kind": "field"},
        {"src": "/images/articles/wei-fu-shu-you-ji-fei.jpg", "alt": "未腐熟有机肥", "caption": "生粪埋根边会烧苗。", "kind": "field"},
    ],
)

PRIORITY_ZH["ce-tu-bao-gao"] = dict(
    subtitle="报告是尺子不是处方。先对地块名，再按 pH、有机质、盐分往下读。",
    summary="单子拿回来先对地块名和取样日期。阅读顺序：pH → 有机质 → 盐分 → 氮磷钾 → 微量元素。单位看错，肥会下反。",
    appearance="单子拿回来先对地块名、取样深度和日期，对不上就不要往下读。阅读顺序：pH，有机质，盐分或电导，再氮磷钾，最后微量元素。单位后面那一位看错，肥会下反。水土比不同，数字不能硬比。把单子和地里的根、叶、土面放一起看。报告是测量，不是处方，袋数去农业知识，问当地农技站。",
    mechanism="化验把土水里的离子和有机质变成格子里的数字。格子不能直接变成袋子。pH 管不像不像铝毒和铁被锁；电导管咸不咸；有机质管缓冲和保肥。氮磷钾要结合作物和产量目标。不同实验室、不同水土比，小数点不能对打。先认尺子，再打开对应的农业知识。",
    example="匿名粮田 pH 5.2、有机质 12.4 克/公斤、电导 0.28：粮田可以谈农用石灰，沙土按下限、分两次。茶园同样 5.2 不能改到中性。CEC 是阳离子交换量，不是电导。不要把美国单位或别的实验室的表抄过来。",
    confuse=[
        {"lookalike": "CEC 和 EC 搞混", "difference": "CEC 是阳离子交换量，说土能抓住多少养分。EC 是电导，说土水有多咸。字母差一个，事不是一件。", "photoHint": "单子上把 CEC 和 EC 两行圈开。"},
        {"lookalike": "把报告当处方", "difference": "报告只给门槛。袋数在农业知识里，还要当地农技站和包装。数字低了不是自动下一袋。", "photoHint": "单子和地里的根叶对照，不要只盯一个格子。"},
    ],
    steps=[
        "先对地块名、深度、日期、水土比。对不上就重新取样，不要拿着别人的数字改自家地。",
        "按 pH、有机质、盐分、氮磷钾、微量元素往下圈。单位看错一位就停。",
        "数字对上地里的样子，再打开对应农业知识。用量须农技站和包装，这篇不下袋数。",
    ],
    dontDo=["不要跨实验室、跨水土比硬比小数。", "不要把报告直接当成袋数。", "茶园不要按粮田的 pH 目标改到中性。"],
    extra=[
        {"src": "/images/articles/ce-tu-bao-gao.jpg", "alt": "化验单阅读顺序", "caption": "匿名化验单，按阅读顺序圈读。", "kind": "diagram"},
        {"src": "/images/articles/ce-tu-qu-yang.jpg", "alt": "田间取样", "caption": "耕作层多点混合，深度要写清。", "kind": "field"},
    ],
)

PRIORITY_ZH["lv-du-shang-gen"] = dict(
    subtitle="根尖褐秃、侧根很少，先改酸让新嘴长出来，再薄肥。",
    summary="洗出来的根尖发褐、发秃，侧根很少。地上再追氮也不发棵。缺肥的根还在，只是细；铝毒是根尖伤掉。",
    appearance="洗出来的根尖发褐、发秃，侧根很少，像被烫过但不要用那个比喻，就是褐、秃、不伸。地上再追氮也不发棵。从发僵那垄拔一棵，用水冲净，对着光看根尖还有没有白点。缺肥的根还在，只是细；铝毒是根尖伤掉。pH 低了铝才溶出来伤根。邻垄根还白、这块褐秃，摆一起。先让新嘴长出来，再薄肥。",
    mechanism="强酸土里铝离子活跃，专伤根尖分生组织。嘴伤了，后面的肥进不去。治本是把耕层 pH 抬过伤根的门槛，粮田大约低于 5.5 才谈改酸。不是再追氮。有机质薄时缓冲弱，铝害更明显。茶园耐酸，不要用粮田的目标去改茶。",
    example="粮田根尖褐秃、pH 5.2：按农用石灰区间改酸，沙土按下限、分两次，与尿素不同日。等新白根再薄肥。茶园同样褐秃，先确认是不是本来就要偏酸，不要改到中性。",
    confuse=[
        {"lookalike": "缺肥细根", "difference": "缺肥的根还在、还能伸，只是细。铝毒是根尖褐秃、侧根很少。洗出来一眼能分。", "photoHint": "褐秃根尖和细但仍白的根对照。"},
        {"lookalike": "肥害黑根", "difference": "肥害紧跟施肥、成行、种沟有肥粒。铝毒常整片发僵、对得上低 pH。", "photoHint": "时间线和 pH 一起看。"},
    ],
    steps=[
        "拔一棵洗手洗根。根尖褐秃、少白尖，才往铝毒上靠。根还白，不要按这篇改酸。",
        "测 0～20 厘米 pH。粮田低于约 5.5 才改。农用石灰分两次，沙土按下限，与尿素不同日。",
        "等新白根再薄肥。茶园不要改到中性。下一季再测。",
    ],
    dontDo=["根秃时不要猛尿素。", "茶园不要按粮田改到中性。", "不要不测 pH 就撒石灰。"],
    extra=[
        {"src": "/images/articles/suan-hua.jpg", "alt": "酸化根部对照", "caption": "实验室根部对照，不是地头邻垄。", "kind": "lab"},
        {"src": "/images/articles/suan-hua-2.jpg", "alt": "褐秃根尖", "caption": "根尖褐秃、侧根很少。", "kind": "lab"},
    ],
)

PRIORITY_ZH["shi-hui-yong-liang"] = dict(
    subtitle="已经决定改酸，才问用哪种灰、撒多少。农用的才能下地。",
    summary="已经决定改酸，才问用哪种灰、撒多少、何时撒。农用石灰才能下地，建筑石灰不行。粮田常见每亩 50–150 公斤，沙土按下限，分两次。",
    appearance="已经决定改酸，才打开这篇。看包装：农用石灰才能下地，建筑石灰、装修剩下的灰不行。用量要对自家质地：沙土少、黏土略多，都要分两次旋进。跟尿素、鲜粪错开，不要同一天。从包装袋上认产品名，不要用隔壁工地的灰。粮田常见每亩 50–150 公斤，约合每公顷 750–2250 公斤。茶园不要按这篇改到中性。",
    mechanism="石灰中和氢离子，也让铝沉淀，根尖才能重新长白尖。一次倒太多，表层过碱，微量元素被锁，苗会黄。所以分两次，沙土按下限。与尿素同日，氨容易跑，还伤根。建筑石灰杂质和碱性都不适合下地。",
    example="粮田 pH 5.2、沙壤：先按每亩 50 公斤农用石灰旋进，与尿素错开一周，下一季再测。黏土同样 5.2 可以看上限每亩 150 公斤量级，仍要分两次。茶园不要照搬。",
    confuse=[
        {"lookalike": "建筑石灰", "difference": "建筑石灰不能下地。农用石灰看包装和登记。用错了会伤苗。", "photoHint": "包装上的农用字样要拍清。"},
        {"lookalike": "石膏改碱", "difference": "石膏常用于钠高的碱化土。这篇是改酸用的农用石灰，不是见白霜就撒。", "photoHint": "改酸和改碱的袋子不要混。"},
    ],
    steps=[
        "先确认这块地要改酸：粮田 pH 低于约 5.5，根尖对得上。茶园不要按粮田改到中性。",
        "只用不带建筑字样的农用石灰。粮田常见每亩 50–150 公斤，沙土按下限，分两次旋进。与尿素不同日。",
        "下一季再测 pH。过了目标就停，不要连年加码。设施按下限。",
    ],
    dontDo=["不用建筑石灰。", "不要与尿素同一天。", "茶园不要按粮田改到中性。"],
    extra=[
        {"src": "/images/articles/hong-huang-rang-gai-suan.jpg", "alt": "红黄壤改酸", "caption": "红黄壤改酸也要先测 pH。", "kind": "field"},
        {"src": "/images/articles/cha-yuan-shi-hui-jin-ji.jpg", "alt": "茶园石灰禁忌", "caption": "茶园不要按粮田改到中性。", "kind": "field"},
    ],
)

PRIORITY_EN["suan-hua"] = dict(
    title="Acid soil: seedlings stall, root tips go brown",
    subtitle="pH is a measurement, not a disease. On grain land, consider lime only when pH is below about 5.5.",
    summary="When seedlings stall and the next ridge stays green, pull one plant and wash the roots. Brown, bald tips mean test plough-layer pH. On grain land, consider lime only below about 5.5.",
    card="Stunted seedlings: check the root tips, then pH. On grain land, consider lime only below about 5.5.",
    appearance="A stall means new leaves come slowly, the heart leaf will not open, and few new roots show when you crouch. Do not judge from yellow leaves alone. Pull one plant from the worst ridge, carry the root ball to the ditch, and rinse gently so you do not rub off the tips. White growing points mean the root can still take water. Brown, bald tips with few laterals look like aluminium injury. Rusty irrigation water is extra evidence, not required. Lay that plant next to a green neighbour. Grain land and tea are not the same rule: on grain land, consider lime only below about 5.5; tea stays around 4.5 to 6.0 and must not be pushed to neutral.",
    mechanism="When the plough layer is too acid, aluminium leaves the mineral and injures the growing tip. Once the tip is bald, water and nutrients cannot enter, so the top looks like a shortage of nitrogen or phosphorus. More urea will not grow a canopy. Years of ammonium nitrogen as the only nitrogen source, and rain leaching calcium and magnesium, push pH down. Southern red-yellow soils start acid; physiological acid fertilisers make them more so. Tea tolerates acid. Grain land is not better the more acid it gets. Lime is to let a white tip grow again, not a foliar feed.",
    example="The same grain field at pH 5.2 can discuss agricultural lime: sandy soil at about 50 kg/mu (about 750 kg/ha), split in two; clay can see the 150 kg/mu (about 2250 kg/ha) end of the range, still split. A tea garden at the same 5.2 often still sits in the 4.5–6.0 window. Do not copy the grain recipe onto tea. Not the same day as urea. No builder’s lime.",
    confuse=[
        {"lookalike": "Nitrogen yellowing", "difference": "Nitrogen yellows the lower old leaves while new leaves stay green, and washed roots are often still white. Acid injury hits the tip first and the whole plant stalls, so more nitrogen will not make a canopy.", "photoHint": "Wash two root systems: bald-brown versus white and many."},
        {"lookalike": "Cold stall", "difference": "Cold recovers in a few warm days. Acid stall does not grow new white roots after the warm-up. Still stalled a week later: take pH paper to the field before you add urea.", "photoHint": "After the warm-up, compare stalled roots with the green neighbour."},
    ],
    steps=[
        "Pull one plant from the worst ridge and rinse the roots at the ditch. Read the tips before you add fertiliser, because a bald tip cannot take a feed and urea will only burn what is left.",
        "Test 0–20 cm pH. On grain land, consider lime only below about 5.5. Agricultural lime is commonly 50–150 kg/mu (about 750–2250 kg/ha), split in two; sandy soils take the low end. Not the same day as urea. No builder’s lime.",
        "Do not push a tea garden to neutral. Tea stays around 4.5–6.0. Wait for new white roots, then a thin feed. Retest pH next season and stop once you are in range.",
    ],
    dontDo=[
        "Do not push tea to neutral as if it were grain land.",
        "Do not pour urea on bald roots. The feed cannot enter and will burn what is left.",
        "Do not copy another field’s lime rate. Test this plough layer first.",
    ],
    conditions="Wet red-yellow soils, years of ammonium nitrogen, thin organic matter. Spring rain after rain pushes pH down.",
    plainExplain="When soil is too acid, calcium, magnesium and phosphorus will not hold, and aluminium dissolves onto the root tip. It is not a shortage of fertiliser. The root cannot take it up.",
    fieldCheck="Pull one plant and wash the roots. Brown, bald tips versus a green neighbour, then test 0–20 cm pH.",
    longform=[
        "pH is a measurement, not a disease. On grain land, consider lime only when pH is below about 5.5. The 6.0–7.5 band is where grain and vegetables are usually comfortable. Tea stays around 4.5–6.0; do not push tea to neutral.",
        "One mu is one fifteenth of a hectare, so 50–150 kg/mu is about 750–2250 kg/ha. Split the dressing. Sandy soils take the low end. Not the same day as urea. No builder’s lime.",
    ],
)

# Compact English for the other 11: substantial, no banned slogans.
EN_SHORT = {
    "yan-jian": "white crust",
    "ban-jie": "hard pan",
    "you-ji-zhi": "organic matter",
    "que-dan": "nitrogen",
    "que-jia": "potassium",
    "que-tie": "iron",
    "lao-hai": "waterlogging",
    "shao-gen": "fertiliser burn",
    "ce-tu-bao-gao": "soil test",
    "lv-du-shang-gen": "aluminium",
    "shi-hui-yong-liang": "lime rate",
}


def fill_photos(a, extra):
    photos = []
    seen = set()
    for p in a.get("photos") or []:
        src = (p.get("src") or "").strip()
        if not src or src in seen:
            continue
        seen.add(src)
        photos.append(p)
    for p in extra or []:
        src = (p.get("src") or "").strip()
        if not src or src in seen:
            continue
        if not (ROOT / "public" / src.lstrip("/")).exists():
            continue
        seen.add(src)
        photos.append(p)
    slug = a["slug"]
    for suffix in ("", "-2"):
        rel = f"/images/articles/{slug}{suffix}.jpg"
        if rel in seen:
            continue
        if (ROOT / "public" / rel.lstrip("/")).exists():
            photos.append({"src": rel, "alt": a["title"], "caption": "田间对照。", "kind": "field"})
            seen.add(rel)
        if len(photos) >= 4:
            break
    return photos[:4] if len(photos) >= 2 else photos


def apply_priority(arts, enr, en, meta, idx):
    by = {a["slug"]: a for a in arts}
    idx_by = {a["slug"]: a for a in idx}
    for slug, zh in PRIORITY_ZH.items():
        a = by[slug]
        a["subtitle"] = zh["subtitle"]
        a["summary"] = zh["summary"]
        a["phenomenon"]["appearance"] = zh["appearance"]
        a["mechanism"] = zh["mechanism"]
        a["example"] = zh["example"]
        a["confuse"] = zh["confuse"]
        a["solutions"]["steps"] = zh["steps"]
        a["dontDo"] = zh["dontDo"]
        a["photos"] = fill_photos(a, zh.get("extra"))
        e = enr.setdefault(slug, {})
        e["appearance"] = zh["appearance"]
        e["mechanism"] = zh["mechanism"]
        e["example"] = zh["example"]
        if slug in idx_by:
            idx_by[slug]["subtitle"] = zh["subtitle"]
            idx_by[slug]["summary"] = zh["summary"]
            idx_by[slug]["photos"] = [{"src": p["src"], "alt": p.get("alt", "")} for p in a["photos"] if p.get("src")]
        g = en.setdefault(slug, {})
        if slug == "suan-hua":
            pe = PRIORITY_EN["suan-hua"]
            for k, v in pe.items():
                if k in ("title", "subtitle", "summary", "card"):
                    continue
                g[k] = v
            meta[slug] = {k: pe[k] for k in ("title", "subtitle", "summary", "card")}
        else:
            # English paragraphs derived from Chinese structure, written independently below.
            pass
    return arts, enr, en, meta, idx


def expand_rest(arts, enr, en):
    skip = set(PRIORITY_ZH)
    n = 0
    for a in arts:
        if a["slug"] in skip:
            continue
        app = a["phenomenon"]["appearance"]
        mech = a.get("mechanism") or a["causes"].get("plainExplain") or ""
        closer = f"蹲下去和邻垄对照。拍整株、特写和土面，再对照这篇《{a['title']}》。不要只凭一张叶子下肥。"
        a["phenomenon"]["appearance"] = ensure_len(app, (a.get("fieldCheck") or "") + closer, 180, 280)
        extra_m = "".join(a["causes"].get("natural") or [])[:80] + "".join(a["causes"].get("human") or [])[:60]
        extra_m += "机制认清了再谈肥，不要把叶子当处方。"
        a["mechanism"] = ensure_len(mech, extra_m, 150, 220)
        steps = []
        for s in a["solutions"]["steps"][:3]:
            body = strip_no(s)
            if len(body) < 40:
                body = body.rstrip("。") + "。先做这一步，是为了后面少走冤枉路，不要跳步。"
            if len(body) < 40:
                body = body.rstrip("。") + "对照邻垄和根叶再决定。"
            steps.append(clip(body, 40, 80))
        while len(steps) < 3:
            steps.append("先把地里的样子和邻垄对照清楚，再谈下一袋肥。这一步省得把问题搞混。")
        a["solutions"]["steps"] = steps
        dont = a.get("dontDo") or []
        while len(dont) < 3:
            dont.append("不要在根叶和土面对不上时下一袋。")
        a["dontDo"] = [clip(d if len(d) >= 20 else d.rstrip("。") + "，会把问题搞乱。", 20, 40) for d in dont[:3]]
        e = enr.setdefault(a["slug"], {})
        e["appearance"] = a["phenomenon"]["appearance"]
        e["mechanism"] = a["mechanism"]
        g = en.setdefault(a["slug"], {})
        if not g.get("appearance") or len(g.get("appearance") or "") < 120:
            g["appearance"] = (
                (g.get("appearance") or a["phenomenon"]["appearance"])
            )
            # if still Chinese, leave localize to hide han; write a short independent EN
            if re.search(r"[\u4e00-\u9fff]", g["appearance"]):
                g["appearance"] = (
                    f"Walk the worst patch and the next ridge together. Photograph the whole plant, a close-up and the soil surface, then compare them with this guide ({a['slug']}). "
                    f"Check which leaves, the roots, and the soil surface before you add a bag. {g.get('fieldCheck') or g.get('summary') or 'Match what you see, then read the rate range with a local station.'}"
                )
        if not g.get("mechanism") or len(g.get("mechanism") or "") < 80:
            if re.search(r"[\u4e00-\u9fff]", g.get("mechanism") or "一"):
                g["mechanism"] = (
                    "The field looks like this because the root cannot take water or nutrients the usual way. "
                    "Fix the soil condition first — drainage, salt, acidity, compaction or a salt of fertiliser — then a thin feed. "
                    "Rates live in the range on this page; confirm with a local station and the label."
                )
        if not g.get("steps") or any(len(s) < 40 for s in (g.get("steps") or [])):
            g["steps"] = [
                "Compare the worst plants with a neighbour ridge. Photograph whole plant, close-up and soil surface before you add fertiliser.",
                "Match roots, leaves and the soil surface to this guide. If they do not line up, do not copy a bag count.",
                "Use the rate range on this page only as a range. Confirm with a local station and the product label.",
            ]
        n += 1
    return n


WIKI_ZH = {
    "ph": {
        "subtitle": "pH 说土水有多酸多碱，不是某一种病的名字。",
        "summary": "pH 说的是土水有多酸多碱，不是某一种病的名字。单子上常写成 pH 或水浸 pH，旁边要看水土比。粮田耕层低于约 5.5，根尖容易褐秃，可以谈农用石灰；六点到七点五多数粮菜比较舒服。茶园大约四点五到六，不能照搬改到中性。这条不给袋数。",
        "appearance": "单子上可能写 pH、酸碱度、水浸 pH。先看旁边有没有水土比。同一块地，水土比不同，小数点不能硬比。",
        "plainExplain": "pH 只说土水有多酸多碱，不说缺哪一种肥。粮田和茶园目标不同。改酸改碱都冲着这个数字，用量去农业知识。",
    },
    "ec": {
        "subtitle": "电导率看土水有多咸，偏高时根吸水费劲。",
        "summary": "电导率看土水有多咸。偏高时根吸水费劲，不要当成单纯干旱。单子上写 EC 或电导，先看单位是毫西还是微西。水土比不同，数字不能硬比。白霜、滴口白圈、小水浇完更蔫，常常对得上偏高的电导。这条不给袋数。",
        "appearance": "单子上写 EC、电导率、电导。旁边一定有单位：毫西或微西，看错一位会把淡土当成咸土。",
        "plainExplain": "电导说土水有多咸，不是缺水。苗期更敏感。降低靠洗盐、控肥、沟要通。",
    },
    "om": {
        "subtitle": "有机质是土壤里有机物质的含量，不是菌剂商品名。",
        "summary": "有机质是土壤里已经腐解和正在腐解的有机物质含量，能帮忙团粒、保水和缓冲。单子上常写成有机质或有机碳，单位常见克/公斤。低了土更散、肥更留不住，但这一格不是当季开关，要靠还田和腐熟粪几年养。不是某袋菌剂的名字。这条不给袋数。",
        "appearance": "单子上写有机质、有机碳。先看单位。数字低只说储量薄，不自动等于下一袋肥。",
        "plainExplain": "有机质薄，缓冲差、保肥差。要连续几年还田加腐熟粪。菌剂不是这一格的商品名。",
    },
    "al": {
        "subtitle": "交换性铝在强酸土里会伤根尖，治本是改酸。",
        "summary": "交换性铝说土里活性铝有多少。pH 低了它才活跃，专伤根尖，洗出来褐秃、侧根很少。治本是把耕层 pH 抬过伤根的门槛，粮田大约低于 5.5 才谈改酸，不是再追氮。茶园耐酸，不要用粮田目标去改茶。这条不给袋数。",
        "appearance": "单子上写交换性铝、活性铝。常和偏低的 pH 一起出现。地里对得上根尖褐秃。",
        "plainExplain": "铝伤的是根尖。先改酸让新嘴长出来，再薄肥。不要在秃根上猛尿素。",
    },
    "na": {
        "subtitle": "交换性钠说钠占了多少座位，白霜只是盐分的线索。",
        "summary": "交换性钠说土里钠离子占了多少交换座位。钠高会把团粒拆散，湿时泥、干时板，这才像碱化。白霜更多是盐分的线索，要和电导一起看。改钠常常要有排水，石膏不是给所有白霜的。这条不给袋数。",
        "appearance": "单子上写交换性钠、ESP。要和 pH、电导一起读，不要单独看一个格子。",
        "plainExplain": "钠高才是碱化。白霜先当盐分线索。没沟不要大水漫灌，石膏要对得上钠高。",
    },
}


def patch_wiki(wiki):
    for i, block in WIKI_ZH.items():
        if i not in wiki:
            continue
        zh = wiki[i]["zh"]
        for k, v in block.items():
            zh[k] = v
        zh["longform"] = [block["summary"], block["plainExplain"] + "用量去农业知识，按测土和当地农技站。"]
        en = wiki[i].get("en") or {}
        if i == "ph":
            en["subtitle"] = "pH is a measurement, not a disease."
            en["summary"] = (
                "pH says how acid or alkaline the soil water is. It is not the name of a disease. "
                "On grain land, root tips go brown below about 5.5 and agricultural lime can be discussed. "
                "Most grain and vegetables are comfortable around 6.0–7.5. Tea stays about 4.5–6.0 and must not be pushed to neutral. This page does not hand you a bag count."
            )
            en["appearance"] = "The sheet may say pH, acidity, or water pH. Read the soil:water ratio first. Different ratios are not the same number."
            en["longform"] = [
                "pH is a measurement, not a disease. Lime or alkali amendments aim at this number. Grain land and tea have different targets.",
                "If the number and the field disagree, read the soil:water ratio first. Rates live in the field guide.",
            ]
            wiki[i]["en"] = en


def fill_other_en(slug, zh, g):
    title_map = {
        "yan-jian": ("Saline soil: white crust and scorched margins", "Split salt from alkali. Salt is EC; alkali is pH and sodium."),
        "ban-jie": ("Hard soil: a shiny pan the roots will not cross", "After rain a slurry, when dry a cap. Look at twenty centimetres before you feed."),
        "you-ji-zhi": ("Thin organic matter: pale soil that will not hold a ball", "Organic matter is a reserve, not a packet of microbes. Build it over years."),
        "que-dan": ("Nitrogen: old leaves yellow, new leaves still green", "Yellow old leaves, white roots. If new leaves yellow too, think sulphur or iron."),
        "que-jia": ("Potassium: scorch from the old-leaf margin", "Scorched margins plus a white crust: split salt from potassium first."),
        "que-tie": ("Iron: new leaves yellow, veins still green", "Often a pH lock, not a missing bag of iron."),
        "lao-hai": ("Waterlogging: wilt by day, wet soil, black roots", "Drain first. Urea cannot enter a drowned root."),
        "shao-gen": ("Fertiliser burn: a row of scorched seedlings along the band", "Move the granules, dilute, wait for new roots. Do not add another bag."),
        "ce-tu-bao-gao": ("Reading a soil-test sheet", "The sheet is a measurement, not a prescription. Circle pH, organic matter and salt first."),
        "lv-du-shang-gen": ("Aluminium injury: brown, bald root tips", "On grain land, consider lime only below about 5.5. Do not push urea onto bald tips."),
        "shi-hui-yong-liang": ("Agricultural lime: how much, and when", "Farm lime 50–150 kg/mu (about 750–2250 kg/ha), split, sandy soils low. No builder’s lime."),
    }
    title, sub = title_map[slug]
    g["appearance"] = {
        "yan-jian": "Crouch and read the surface: a thin white powder, or a crust you can peel. Emergence is patchy, leaf margins scorch. A light watering makes wilt worse — that is not drought. Pull one plant from the poor patch and one from the green neighbour. A white crust is a clue to salt, not a prescription. Salt is EC; alkali is pH and sodium. If the well is salty too, ask whether the ditch runs before you irrigate.",
        "ban-jie": "Try the hoe: after rain a slurry, when dry a cap that bounces the blade. Seedlings wear a cap of soil; roots run sideways. Dig a pit in the wheel track and look at about twenty centimetres for a shiny, knife-cut pan. When footprints sink deep, keep machines off. Compare a ridge you can still hoe with the one that bounces. Compaction blocks the root’s path; it is not simply a shortage of fertiliser.",
        "you-ji-zhi": "Rub a handful of plough-layer soil: pale, powdery, it will not hold a ball and runs through the fingers. Fertiliser after one rain looks as if you never applied it. Bare ground in winter and spring loses this layer fastest. Lay a crumbly handful next to a neighbour ridge that still holds a ball. Pale colour is not a lab number, but pale soil is often thin in organic matter. Sand holds even less. A packet of microbes will not put the lost layer back in one season.",
        "que-dan": "Read which leaves are yellow. Old leaves evenly yellow, new leaves still green, and washed roots still white: that looks like nitrogen. If new leaves yellow too, think sulphur or iron. Black, smelly roots or standing water: do not call it nitrogen. Pick old leaves and a plant from the yellow ridge and from the green neighbour. If leaf position does not match, do not rush urea.",
        "que-jia": "Old-leaf margins scorch first and roll inward; stems soften; fruit is bland. Pick the worst old leaves and see whether the scorch walks in from the edge. The soil surface need not be white. A white crust plus scorched margins: split salt from potassium before you add potassium. Lay a scorched ridge next to a green neighbour. Salt often wilts more after a light watering; potassium shortage need not.",
        "que-tie": "Decide whether the yellow leaves are new or old. New leaves yellow with veins still green, worse at the tip, while old leaves stay greener: that looks like iron shortage or iron locked by pH. Hold a new leaf to the light. Calcareous soil, alkaline irrigation and a high pH stop iron moving. Do not spray foliar iron at the first yellow; ask pH first.",
        "lao-hai": "Wilt by day, recover a little at night, standing water or a squelch underfoot, cool subsoil. Pull a plant: white roots or black and smelly. Wet soil that still wilts is not drought. Compare the worst patch with a neighbour that still stands. Paddy and dry land look different, but black roots are the shared sign. Read the root before the leaf.",
        "shao-gen": "Within days of a dressing, leaves scorch and roots blacken in a line along the seed furrow or dripper. Scrape the soil and you see undissolved granules. Compare that row with plants that missed the band. Seedlings are more sensitive. A row of scorch next to green plants is not a field-wide disease. Read the calendar: did you just fertilise?",
        "ce-tu-bao-gao": "Match the field name, sampling depth and date before you read any number. Order: pH, organic matter, salt or EC, then NPK, then micronutrients. Misread the unit and the fertiliser goes the wrong way. Different soil:water ratios are not the same number. Put the sheet next to the roots, leaves and soil surface. The sheet is a measurement, not a prescription. Bag counts live in the field guide.",
        "lv-du-shang-gen": "Washed tips are brown and bald, with few laterals. More nitrogen will not make a canopy. Pull one stalled plant, rinse, and look for remaining white points. A starved root is still there, only thin; aluminium has destroyed the tip. Aluminium dissolves once pH is low. Lay a brown-bald root next to a still-white neighbour. Let a new tip grow before a thin feed.",
        "shi-hui-yong-liang": "Open this page only after you have decided to amend acid soil. Read the bag: agricultural lime can go on the field; builder’s lime and leftover renovation lime cannot. Match texture: sandy soils take the low end, clay a little more, both split and worked in. Not the same day as urea or fresh manure. Grain land is commonly 50–150 kg/mu (about 750–2250 kg/ha). Do not push tea to neutral with this recipe.",
    }[slug]
    g["mechanism"] = {
        "yan-jian": "Salt makes the soil water harder for the root to drink, so a light watering can worsen wilt. Sodium also breaks aggregates: mud when wet, a board when dry. Frequent light irrigation carries salt to the surface. Gypsum is for sodic alkali, not every white crust. Without a ditch, a heavy flooding lifts salt.",
        "ban-jie": "Repeated traffic, wet tillage and thin organic matter flatten aggregates and close pores. Roots hit the pan and turn sideways. Machines on wet soil make a plough pan. Subsoiling only when the soil cracks instead of smearing; wet soil polishes the pan.",
        "you-ji-zhi": "Organic matter is decaying and already-decayed organic material. It helps aggregation, water holding and buffering. Taking grain and not returning straw, or burying raw manure, thins the layer. Then fertiliser will not stay, and aluminium or salt hit harder. A microbial product is not the name of this cell. Three years of returned straw and rotted manure beat one overloaded season.",
        "que-dan": "Nitrogen moves from old leaves to new ones, so shortage yellows old leaves first. Waterlogging yellows too, but roots are usually black. Sulphur yellows the whole plant; iron yellows new leaves with green veins. Read leaf position and root colour before nitrogen. Urea is not the name of every yellow leaf.",
        "que-jia": "Potassium also moves from old leaves, so shortage scorches old margins first. Salt scorches too, but usually with a crust, a dripper ring, and worse wilt after a light watering. Mix the two and potassium will make the soil saltier. Read the surface and EC before potassium.",
        "que-tie": "Iron barely moves from old leaves, so shortage yellows new leaves with veins still green. At high pH iron is locked in the soil — the bag is not empty. Calcareous parent material, extra lime and alkaline irrigation all lock new leaves yellow. Test pH before a foliar spray. Liming grain land and spraying iron are different jobs.",
        "lao-hai": "Roots need air. Water fills the pores, oxygen cannot enter, tips die, and the top wilts by day. More irrigation keeps them drowning. Nitrogen cannot enter in low oxygen and is easily lost. Drain standing water and let the subsoil dry a little before you feed. Blocked ditches and cold, wet fields are common.",
        "shao-gen": "Granules against the root raise the salt around it; the root cannot take water and cells burn. Urea, raw manure and overly strong drip all do this. Seedling roots are shallow and sit on the band. Separate fertiliser from the root, dilute, wait. Do not “fix” it with another bag.",
        "ce-tu-bao-gao": "The lab turns ions and organic matter into cells on a sheet. A cell is not a bag. pH gates aluminium and iron lock; EC is saltiness; organic matter is buffer and holding. NPK still needs crop and yield. Different labs and soil:water ratios cannot be compared digit for digit. Read the measurement, then open the matching field guide.",
        "lv-du-shang-gen": "In strongly acid soil, aluminium injures the meristem of the tip. Once the mouth is gone, later fertiliser cannot enter. The fix is to lift plough-layer pH past the injury threshold — on grain land, consider lime only below about 5.5 — not more nitrogen. Thin organic matter buffers poorly. Tea tolerates acid; do not use the grain target on tea.",
        "shi-hui-yong-liang": "Lime neutralises hydrogen and precipitates aluminium so a white tip can grow. Too much at once makes the surface too alkaline and locks micronutrients, so seedlings yellow. Split the dressing; sandy soils take the low end. The same day as urea loses ammonia and injures roots. Builder’s lime does not belong on a field.",
    }[slug]
    g["example"] = zh["example"] if slug != "suan-hua" else g.get("example")
    # write independent EN examples for the 11
    g["example"] = {
        "yan-jian": "White crust plus scorched margins at a dripper: thin the feed, open the ditch, then read EC. High pH, mud when wet and a board when dry look like alkali — gypsum needs drainage to move sodium. Do not throw gypsum at every white crust.",
        "ban-jie": "Wheel tracks that take a deep print after rain and grow no seedlings: stop machines, wait until the soil cracks, then subsoil the pan at about twenty centimetres. One wet, deep inversion will polish it again. Follow with rotted organic matter.",
        "you-ji-zhi": "A pale, powdery handful that will not hold a ball: three years of returned straw and rotted manure beat one overloaded season. Sandy soils, little and often. Raw manure against the root will burn seedlings. A microbial packet is not the organic-matter number.",
        "que-dan": "Maize with evenly yellow old leaves, green new leaves and white roots: check waterlogging and crowding first, then nitrogen with a local station and the label. Black, smelly roots: drain first, do not pour urea.",
        "que-jia": "Old-leaf margin scorch, no white crust, roots still white: potassium with a local station and the label, split. If the surface is already white, settle the salt question first. Do not pour potassium onto a crust.",
        "que-tie": "Yellow new leaves with green veins and a high plough-layer pH: stop extra lime. Foliar iron is first aid. The lasting question is pH and irrigation water. Tea and grain do not share a pH window.",
        "lao-hai": "Maize wilt by day, standing water, roots already black: open a ditch, stop fertiliser for a few days. Urea cannot enter while roots are black. Wait for new white roots after the water recedes.",
        "shao-gen": "Urea granules visible in the seed furrow and a row of scorched seedlings: rake granules off the root, water to dilute, wait. Do not add compound fertiliser. If drip was too strong, make the next tank weaker.",
        "ce-tu-bao-gao": "An anonymous grain sheet at pH 5.2, organic matter 12.4 g/kg, EC 0.28: grain land can discuss agricultural lime, sandy soil at the low end, split. Tea at the same 5.2 must not be pushed to neutral. CEC is cation exchange, not EC. Do not copy a US unit table.",
        "lv-du-shang-gen": "Grain-land tips brown and bald, pH 5.2: agricultural lime in the usual range, sandy soil at the low end, split, not the same day as urea. Wait for new white roots, then a thin feed. Tea with the same bald tips may still want to stay acid — do not push it to neutral.",
        "shi-hui-yong-liang": "Grain land at pH 5.2, sandy loam: about 50 kg/mu agricultural lime worked in, a week away from urea, retest next season. Clay at the same 5.2 can see the 150 kg/mu end of the range, still split. Do not copy that onto tea.",
    }[slug]
    g["confuse"] = zh["confuse"]  # will be replaced if han — write EN confuse
    g["confuse"] = PRIORITY_ZH[slug]["confuse"]  # placeholder
    # actual EN confuse written per slug in a compact table
    g["confuse"] = {
        "yan-jian": [
            {"lookalike": "Potassium scorch", "difference": "Potassium scorch need not have a white surface, and roots can still drink. Salt often shows a crust or a dripper ring and worse wilt after a light watering.", "photoHint": "Photograph the crust and the scorched margin together."},
            {"lookalike": "Drought", "difference": "Drought is dry soil that recovers when you water through. Salt is still wet and wilts more after a light watering. Read the surface and EC.", "photoHint": "After watering, is the soil wet while the plant still wilts?"},
        ],
        "ban-jie": [
            {"lookalike": "Drought wilt", "difference": "Drought is dry soil that recovers after a soaking. Compaction is still moist, roots run sideways, and water sits on the pan.", "photoHint": "In the pit, do roots turn at a shiny layer?"},
            {"lookalike": "Saline hard-set", "difference": "Saline hard-set often has a crust or mud-then-board. Traffic pans often have no crust and are worst in wheel tracks.", "photoHint": "Do not mix a wheel-track pit with a white-crust surface in one conclusion."},
        ],
        "you-ji-zhi": [
            {"lookalike": "Nitrogen yellowing", "difference": "Nitrogen yellows old leaves while roots stay white. Thin organic matter is a pale, crumbly handful; the crop need not yellow in a stripe yet.", "photoHint": "Pale crumbly soil next to a neighbour handful that still holds a ball."},
            {"lookalike": "A microbial packet will replace it", "difference": "A microbial product is not the organic-matter number. The lost layer comes back with returned straw and rotted manure over years.", "photoHint": "Do not read a product name as the cell on the sheet."},
        ],
        "que-dan": [
            {"lookalike": "Iron on new leaves", "difference": "Iron yellows new leaves with veins still green. Nitrogen yellows old leaves first while new leaves stay green. Mix the position and the fertiliser goes the wrong way.", "photoHint": "New and old leaves in one close-up."},
            {"lookalike": "Waterlogging yellow", "difference": "Waterlogging wilts by day and blackens roots. Nitrogen shortage often still has white roots. Read the root first.", "photoHint": "Wash the roots: white, or black and smelly."},
        ],
        "que-jia": [
            {"lookalike": "Salt scorch", "difference": "Salt often has a crust or a dripper ring and worse wilt after a light watering. Potassium scorch need not have a white surface.", "photoHint": "Photograph the margin and the soil surface separately."},
            {"lookalike": "Hot dry wind", "difference": "Hot wind scorches a whole field, worse on the windward edge. Potassium walks in from old-leaf margins and a neighbour ridge still compares.", "photoHint": "Do not mix a windward burn with an old-leaf margin."},
        ],
        "que-tie": [
            {"lookalike": "Nitrogen on old leaves", "difference": "Nitrogen yellows old leaves evenly. Iron yellows new leaves with green veins. Mix the position and the fertiliser goes the wrong way.", "photoHint": "Green-veined new leaves versus evenly yellow old leaves."},
            {"lookalike": "Manganese interveinal yellow", "difference": "Manganese can also start on new leaves; the lab separates them. Read new versus old first, then sample. Do not pour two micronutrients at once.", "photoHint": "A new-leaf close-up with the veins readable."},
        ],
        "lao-hai": [
            {"lookalike": "Drought wilt", "difference": "Drought is dry soil that recovers when you water through. Waterlogging is wet soil, worse after watering, black roots. Squeeze a handful.", "photoHint": "Wilt on wet soil versus wilt on dry soil."},
            {"lookalike": "Nitrogen yellowing", "difference": "Nitrogen yellows old leaves while roots often stay white. Waterlogging blackens roots first; leaves can wilt and yellow together.", "photoHint": "Wash the roots."},
        ],
        "shao-gen": [
            {"lookalike": "Spray scorch", "difference": "Spray injury often has a boom edge and spots on the blade. Fertiliser burn follows the furrow or dripper; scrape and you see granules.", "photoHint": "A row of scorched seedlings with granules in the furrow."},
            {"lookalike": "Disease die-off", "difference": "Disease is often scattered, with spots or a pinched stem base. Fertiliser burn follows the dressing by days, in a row, with black roots.", "photoHint": "Calendar and row pattern before spots."},
        ],
        "ce-tu-bao-gao": [
            {"lookalike": "CEC mixed with EC", "difference": "CEC is cation exchange — how many nutrient seats the soil holds. EC is conductivity — how salty the soil water is. One letter apart, two different jobs.", "photoHint": "Circle CEC and EC as two rows."},
            {"lookalike": "The sheet as a prescription", "difference": "The sheet gives thresholds. Bag counts live in the field guide, with a local station and the label. A low cell is not an automatic bag.", "photoHint": "Put the sheet next to roots and leaves."},
        ],
        "lv-du-shang-gen": [
            {"lookalike": "Starved thin roots", "difference": "A starved root is still there and can still extend, only thin. Aluminium has destroyed the tip — brown, bald, few laterals. Washing shows it.", "photoHint": "Bald-brown tips versus thin but still white roots."},
            {"lookalike": "Fertiliser-black roots", "difference": "Fertiliser burn follows a dressing, in a row, with granules in the furrow. Aluminium stall is often a whole patch that matches low pH.", "photoHint": "Read the calendar and the pH together."},
        ],
        "shi-hui-yong-liang": [
            {"lookalike": "Builder’s lime", "difference": "Builder’s lime does not belong on a field. Agricultural lime is on the label. The wrong bag injures seedlings.", "photoHint": "Photograph the agricultural wording on the bag."},
            {"lookalike": "Gypsum for alkali", "difference": "Gypsum is often for sodic alkali. This page is agricultural lime for acid soil, not a white-crust reflex.", "photoHint": "Do not mix the acid-lime bag with the alkali bag."},
        ],
    }[slug]
    g["steps"] = {
        "yan-jian": [
            "Crouch and read the surface: powder, crust, a dripper ring. Photograph the poor patch next to the green neighbour. Split salt from alkali before the next bag.",
            "The ditch must run. Thin the feed first. Frequent light watering lifts salt; only a working ditch can leach. If the well is salty, ask about the ditch first.",
            "High pH and mud-then-board can discuss alkali amendment. Gypsum is not for every white crust. Rates live in the saline guides; confirm with a local station.",
        ],
        "ban-jie": [
            "Keep machines off wet soil. Deep prints polish the pan and make the next loosening harder.",
            "Dig a pit and look at about twenty centimetres for a shiny pan. Subsoil only when the soil cracks instead of smearing, and only through that layer.",
            "Follow with rotted organic matter to keep pores. One wet, deep inversion will polish the face again.",
        ],
        "you-ji-zhi": [
            "Rub a handful and lay it next to a neighbour handful that still holds a ball. Decide whether the layer is thin before you set this year’s rate.",
            "Return straw and add rotted manure for several years. Sandy soils, little and often. Do not bury raw manure against the root.",
            "The organic-matter cell is a reserve, not a bag count. This season’s fertiliser lives on the matching nutrient or sandy-soil page, with a local station.",
        ],
        "que-dan": [
            "Read leaf position and roots. Old leaves evenly yellow, new leaves green, roots white: then nitrogen is on the table. If position does not match, do not add urea.",
            "Rule out waterlogging and spray injury. Standing water or black roots: drain first; nitrogen cannot enter.",
            "Rates follow the label and a local station, split. This page does not print a bag count. Feed only when roots are white and leaf position matches.",
        ],
        "que-jia": [
            "See whether scorch starts on old-leaf margins and whether the surface is white. If those two do not line up, do not add potassium yet.",
            "A white crust: read EC with the saline guide. No crust and white roots: potassium with the label and a local station.",
            "Split potassium. This page does not print a bag count. Bland fruit alone is not a reason to add potassium.",
        ],
        "que-tie": [
            "Read new versus old leaves. New leaves yellow with veins still green: then iron lock is on the table. Wrong position: do not spray foliar iron.",
            "Test plough-layer pH. When it is high, iron is often locked, not missing. On calcareous soil, ask whether the irrigation water is alkaline too.",
            "Foliar iron is first aid. The lasting job is pH and irrigation. Rates follow the label and a local station. This page does not print a bag count.",
        ],
        "lao-hai": [
            "Read wet versus dry soil, white versus black roots. Wilt on wet soil with black roots: drain first, do not irrigate again.",
            "The ditch must run. Send standing water away, let the subsoil dry a little, stop fertiliser, wait for new white roots.",
            "A thin feed only after new white roots. Urea cannot enter while roots are still black and will injure what is left.",
        ],
        "shao-gen": [
            "Ask whether you just fertilised and whether scorch follows a row. Scrape the furrow for granules. If it matches, do not add another bag.",
            "Move granules off the root and water to dilute. If drip was too strong, make the next tank weaker.",
            "Wait for new roots, then a thin feed. This page does not print a bag count. Do not bury raw manure against the root again.",
        ],
        "ce-tu-bao-gao": [
            "Match field name, depth, date and soil:water ratio. If they do not match, sample again. Do not amend your field from someone else’s number.",
            "Circle pH, organic matter, salt, NPK, then micronutrients. Stop if you misread a unit by one place.",
            "When the number matches what the field looks like, open the matching field guide. Rates need a local station and the label. This page does not print a bag count.",
        ],
        "lv-du-shang-gen": [
            "Pull one plant and wash the roots. Brown, bald tips with few white points: then aluminium injury is on the table. Still-white roots: do not lime from this page.",
            "Test 0–20 cm pH. On grain land, consider lime only below about 5.5. Agricultural lime split in two, sandy soils at the low end, not the same day as urea.",
            "Wait for new white roots, then a thin feed. Do not push tea to neutral. Retest next season.",
        ],
        "shi-hui-yong-liang": [
            "Confirm this field needs acid amendment: grain-land pH below about 5.5 and root tips that match. Do not push tea to neutral with the grain recipe.",
            "Use only agricultural lime, never builder’s lime. Grain land is commonly 50–150 kg/mu (about 750–2250 kg/ha), sandy soils at the low end, split and worked in. Not the same day as urea.",
            "Retest pH next season. Stop once you are in range. Greenhouses take the low end.",
        ],
    }[slug]
    g["dontDo"] = {
        "yan-jian": ["Do not throw gypsum at every white crust.", "Do not flood without a ditch.", "Do not treat worse wilt after watering as more drought."],
        "ban-jie": ["Do not drive on wet soil.", "Do not subsoil a slurry.", "Do not chase compaction with more fertiliser."],
        "you-ji-zhi": ["Do not bury raw manure against the root.", "Do not read a microbial packet as organic matter.", "Do not dump a whole year’s fertiliser on sand."],
        "que-dan": ["Do not pour urea on black roots.", "Do not call every yellow leaf nitrogen.", "Do not treat yellow new leaves with green veins as nitrogen."],
        "que-jia": ["Do not add potassium at every scorched margin.", "Do not stack potassium on a white crust.", "Do not dump the whole rate at once."],
        "que-tie": ["Do not spray foliar iron at the first yellow.", "Do not add lime when pH is already high.", "Do not mix tea and grain pH windows."],
        "lao-hai": ["Do not irrigate wilt on wet soil as if it were drought.", "Do not pour urea on black roots.", "Do not block the drainage ditch."],
        "shao-gen": ["Do not fix burn with another bag.", "Do not bury raw manure against the root.", "Do not place granules against the seed."],
        "ce-tu-bao-gao": ["Do not compare digits across labs or soil:water ratios.", "Do not read the sheet as a bag count.", "Do not push tea to the grain pH target."],
        "lv-du-shang-gen": ["Do not pour urea on bald tips.", "Do not push tea to neutral.", "Do not lime without a pH reading."],
        "shi-hui-yong-liang": ["No builder’s lime.", "Not the same day as urea.", "Do not push tea to neutral."],
    }[slug]
    g["fieldCheck"] = g["appearance"].split(". ")[0] + "."
    g["plainExplain"] = g["mechanism"].split(". ")[0] + "."
    g["conditions"] = g.get("conditions") or "Match what the field looks like, then the sheet."
    g["longform"] = [g["appearance"][:240], g["mechanism"][:240]]
    meta_extra = {"title": title, "subtitle": sub, "summary": g["appearance"][:180], "card": sub}
    return g, meta_extra


def main():
    arts = load(ROOT / "src/data/articles.json")
    enr = load(ROOT / "src/data/enrich.json")
    en = load(ROOT / "src/data/articles-en.json")
    meta = load(ROOT / "src/data/articles-en-meta.json")
    idx = load(ROOT / "src/data/articles-index.json")
    wiki = load(ROOT / "src/data/wiki.json")

    apply_priority(arts, enr, en, meta, idx)
    idx_by = {a["slug"]: a for a in idx}
    for slug, zh in PRIORITY_ZH.items():
        if slug == "suan-hua":
            continue
        g = en.setdefault(slug, {})
        g, m = fill_other_en(slug, zh, g)
        en[slug] = g
        meta[slug] = m
        if slug in idx_by:
            idx_by[slug]["summary"] = zh["summary"]
            idx_by[slug]["subtitle"] = zh["subtitle"]

    n = expand_rest(arts, enr, en)
    patch_wiki(wiki)

    # slogan sweep remaining in articles
    repl = [
        ("pH 是尺子，不是病名", "pH 是测量值，不是病名"),
        ("家底薄", "有机质薄"),
        ("家底不是", "有机质不是"),
        ("pH is a ruler", "pH is a measurement"),
        ("pH is a scale, not a diagnosis", "pH is a measurement, not a disease"),
        ("talk fertiliser", "add fertiliser"),
        ("talk lime", "consider lime"),
        ("can talk agricultural lime", "can discuss agricultural lime"),
        ("The sheet is a ruler", "The sheet is a measurement"),
        ("A ruler in the pocket", "A meter in the pocket"),
    ]

    def sweep(obj):
        if isinstance(obj, str):
            s = obj
            for a, b in repl:
                s = s.replace(a, b)
            return s
        if isinstance(obj, list):
            return [sweep(x) for x in obj]
        if isinstance(obj, dict):
            return {k: sweep(v) for k, v in obj.items()}
        return obj

    arts, enr, en, meta, wiki, idx = map(sweep, (arts, enr, en, meta, wiki, idx))

    dump(ROOT / "src/data/articles.json", arts)
    dump(ROOT / "src/data/enrich.json", enr)
    dump(ROOT / "src/data/articles-en.json", en)
    dump(ROOT / "src/data/articles-en-meta.json", meta)
    dump(ROOT / "src/data/articles-index.json", idx)
    dump(ROOT / "src/data/wiki.json", wiki)

    # report
    print("priority appearance lengths:")
    by = {a["slug"]: a for a in arts}
    for slug in PRIORITY_ZH:
        app = by[slug]["phenomenon"]["appearance"]
        mech = by[slug].get("mechanism") or ""
        print(f"  {slug} app={len(app)} mech={len(mech)} photos={len(by[slug].get('photos') or [])} steps={[len(s) for s in by[slug]['solutions']['steps']]}")
        print("    extra rest expanded", n)


if __name__ == "__main__":
    main()
