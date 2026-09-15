#!/usr/bin/env python3
"""Fill missing English parallel fields and strip forbidden 'sample' wording."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
HAN = re.compile(r"[\u4e00-\u9fff]")

LOOK = {
    "一种缺素处方": "One nutrient-shortage recipe",
    "亚铁毒": "Ferrous toxicity",
    "冷害": "Chill injury",
    "冷害僵苗": "Chill-stunted seedlings",
    "冷害发僵": "Chill stall",
    "冷害发紫": "Chill purple",
    "化学消毒": "Chemical sterilising",
    "化肥": "Bag fertiliser",
    "化验室出错": "A lab mix-up",
    "化验室报告": "The lab sheet",
    "单纯缺氮": "Nitrogen shortage alone",
    "单纯缺磷缺锌": "Phosphorus or zinc shortage alone",
    "单纯缺素": "A nutrient shortage alone",
    "单纯缺肥": "Just short of fertiliser",
    "单纯黄叶": "Yellow leaves alone",
    "只当有病": "Treating it as a disease",
    "只当病害打药": "Spraying as if it were disease",
    "只当缺肥": "Treating it as a shortage",
    "叶面微肥广告": "A foliar-micronutrient advert",
    "品种不对": "The wrong variety",
    "土传病必须换土": "Soil-borne disease that must have new soil",
    "土壤栽培": "Soil culture",
    "土壤消毒": "Soil sterilising",
    "土里真的没肥": "The soil really has no fertiliser",
    "干旱": "Drought",
    "干旱秕穗": "Drought empty heads",
    "干旱缺水": "Drought, no water",
    "干旱缺苗": "Drought missing plants",
    "干旱萎蔫": "Drought wilt",
    "干旱落花": "Drought flower drop",
    "干旱裂缝": "Drought cracks",
    "建筑石灰、窑灰": "Building lime or kiln ash",
    "开沟": "Opening a ditch",
    "当季缺肥": "This season’s shortage",
    "整层板结": "The whole layer packed hard",
    "施肥": "Putting fertiliser on",
    "施肥不当": "Fertiliser put on badly",
    "旱": "Dry weather",
    "普通板结": "Ordinary hard packing",
    "普通涝害": "Ordinary waterlogging",
    "普通盐土": "Ordinary salty soil",
    "普通缺肥": "Ordinary shortage",
    "有机肥": "Organic manure",
    "本底红黄壤酸": "The field’s own red-yellow acid",
    "机械伤": "Machine damage",
    "板结": "Hard-packed soil",
    "板结犁底层": "A plough pan under hard packing",
    "枯萎病": "Wilt disease",
    "根瘤菌": "Rhizobium",
    "氯害": "Chloride injury",
    "沙土": "Sandy soil",
    "涝害": "Waterlogging",
    "涝害黄叶": "Waterlogging yellow leaves",
    "深松": "Deep loosening",
    "烤田": "Drying the paddy",
    "犁底层": "Plough pan",
    "病害": "Disease",
    "病害根腐": "Root-rot disease",
    "病害残体": "Diseased trash",
    "病害烂果": "Fruit rot",
    "病害猝倒": "Damping-off",
    "病害萎蔫": "Disease wilt",
    "病害黄化": "Disease yellowing",
    "盐害": "Salt injury",
    "盐害焦边": "Salt-scorched margins",
    "盐碱": "Salty-alkali land",
    "盐碱斑": "A salt-alkali patch",
    "盐碱板": "Salty-alkali hard cap",
    "盐碱裂": "Salty-alkali cracking",
    "目测土色": "Guessing from soil colour",
    "看叶面当测土": "Reading the leaf as a soil test",
    "石灰": "Lime",
    "石膏": "Gypsum",
    "硼毒": "Boron toxicity",
    "种子质量差": "Poor seed",
    "粮田石灰用量": "A grain-field lime rate",
    "粮田酸化": "Acid grain land",
    "缺氮": "Nitrogen shortage",
    "缺氮黄叶": "Nitrogen-yellow old leaves",
    "缺氮黄苗": "Nitrogen-yellow seedlings",
    "缺水": "Shortage of water",
    "缺水萎蔫": "Wilt from dry soil",
    "缺硼花而不实": "Boron shortage, flowers that set nothing",
    "缺磷": "Phosphorus shortage",
    "缺磷发僵": "Phosphorus stall",
    "缺磷紫苗": "Phosphorus purple seedlings",
    "缺素": "Nutrient shortage",
    "缺素症照片": "A nutrient-shortage photo",
    "缺素裂皮": "Nutrient-shortage cracked skin",
    "缺素黄叶": "Nutrient-shortage yellow leaves",
    "缺肥": "Short of fertiliser",
    "缺肥匀黄": "Even yellow from shortage",
    "缺钾": "Potassium shortage",
    "缺钾焦边": "Potassium-scorched margins",
    "缺铁": "Iron lock",
    "缺铁黄化": "Iron-lock yellowing",
    "缺铁黄新叶": "Iron-lock yellow new leaves",
    "缺锌花白苗": "Zinc-white seedlings",
    "缺锰": "Manganese shortage",
    "翻耕": "Ploughing",
    "肥害": "Fertiliser burn",
    "肥害沟": "A fertiliser-burn strip",
    "肥害烧根": "Fertiliser-burnt roots",
    "肥料没化开": "Fertiliser that never dissolved",
    "腐熟有机肥正常发酵": "Rotted manure doing a normal heat",
    "自然黏盘": "A natural clay pan",
    "花期干旱落花": "Flower drop in a dry bloom",
    "苏打碱土": "Sodic alkali soil",
    "茶园过酸需要少量改": "A tea garden that is too acid and needs a little lift",
    "药害": "Spray injury",
    "药害斑": "Spray-injury spots",
    "药害白尖": "Spray-injury white tips",
    "菌肥": "A microbial product",
    "连作病害": "Same-crop disease",
    "邻居的经验用量": "The next county’s rate",
    "酸化": "Acid soil",
    "酸化改石灰": "Acid soil treated with lime",
    "铝毒": "Aluminium toxicity",
    "闷棚": "A closed greenhouse heat",
    "除草": "Weeding",
    "除草剂药害": "Herbicide injury",
    "露地盐碱": "Open-field salty-alkali land",
    "青枯": "Bacterial wilt",
    "黄叶鉴别": "Telling yellow leaves apart",
    "黄龙病": "Huanglongbing",
}

DOSE_NAME = {
    "EC": "EC",
    "pH": "pH",
    "pH 监测": "Watch pH",
    "一次用量": "One application",
    "中耕时机": "When to cultivate",
    "中耕破板": "Break the cap by cultivating",
    "作业墒情": "Moisture for the job",
    "先分流": "Sort the problem first",
    "农用石灰": "Agricultural lime",
    "农用石灰（粮田 pH＜5.5）": "Agricultural lime (grain land, pH below 5.5)",
    "农用石膏": "Agricultural gypsum",
    "冲洗": "Flushing",
    "判断": "How to decide",
    "单位": "Unit",
    "取样深度": "How deep to take soil",
    "叶面微肥": "Foliar micronutrient",
    "叶面硫酸锌（救急）": "Foliar zinc sulphate (first aid)",
    "叶面硫酸锰（确认缺锰）": "Foliar manganese sulphate (after manganese is confirmed)",
    "叶面硫酸镁（救急）": "Foliar magnesium sulphate (first aid)",
    "叶面硼": "Foliar boron",
    "叶面硼（确认缺硼后）": "Foliar boron (after boron is confirmed)",
    "叶面螯合铁（救急）": "Foliar chelated iron (first aid)",
    "叶面钙": "Foliar calcium",
    "叶面钙（幼果/心叶救急）": "Foliar calcium (young fruit / heart-leaf first aid)",
    "叶面铜（确认缺铜）": "Foliar copper (after copper is confirmed)",
    "叶面锌": "Foliar zinc",
    "含硫肥（确认缺硫）": "A sulphur fertiliser (after sulphur is confirmed)",
    "品种": "Variety",
    "土壤 EC": "Soil EC",
    "土壤 EC/pH": "Soil EC / pH",
    "土施硼": "Soil boron",
    "土施钾肥（确认缺钾、无白霜）": "Soil potassium (after shortage is confirmed, no white crust)",
    "土施锌": "Soil zinc",
    "土水比": "Soil-to-water ratio",
    "地膜": "Plastic film",
    "安全间隔": "Pre-harvest interval",
    "密度": "Density",
    "尿素": "Urea",
    "尿素追肥（根白、确认缺氮后）": "Urea top-dress (white roots, nitrogen confirmed)",
    "恢复期施肥": "Fertiliser in the recovery window",
    "换土": "Change the soil",
    "换坑/换土": "Change the hole / the soil",
    "排水": "Drainage",
    "排水沟": "A drain",
    "播种位置": "Where the seed sits",
    "施肥": "Fertiliser",
    "旋耕": "Rotary tillage",
    "晒田": "Dry the field",
    "晒田/排水": "Dry the field / drain",
    "有机肥": "Organic manure",
    "有机肥（树盘）": "Organic manure (tree basin)",
    "有机质投入": "Organic-matter input",
    "根旁磷（确认缺磷后）": "Phosphorus by the root (after shortage is confirmed)",
    "氮肥轮换": "Rotate the nitrogen source",
    "水分": "Water",
    "水层": "The water layer",
    "水温": "Water temperature",
    "洗盐": "Washing salt",
    "洗盐定额": "How much water to wash salt",
    "浇出液 EC/pH": "Leachate EC / pH",
    "消后培肥": "Feed the soil after sterilising",
    "深松": "Deep loosening",
    "深松深度": "How deep to loosen",
    "深松窗口": "The window for deep loosening",
    "深松轮换": "Rotate deep loosening",
    "混配": "Mixing",
    "清株": "Clear the plants",
    "清残": "Clear the trash",
    "滴灌浓度": "Drip concentration",
    "灌水": "Irrigation",
    "灌溉 EC": "Irrigation EC",
    "灌溉水 EC": "Irrigation-water EC",
    "点数": "How many spots",
    "生物有机肥": "Bio-organic manure",
    "生物炭": "Biochar",
    "用量": "Rate",
    "白云石粉": "Dolomite",
    "盐分": "Salt",
    "石灰质": "Lime material",
    "砧木": "Rootstock",
    "磷/锌": "Phosphorus / zinc",
    "磷肥": "Phosphate fertiliser",
    "种肥用量": "Starter rate",
    "种肥距离": "Starter distance from the seed",
    "种肥隔离": "Keep starter off the seed",
    "秸秆": "Straw",
    "秸秆覆盖": "Straw mulch",
    "秸秆还田": "Straw returned to the field",
    "稀释倍数": "Dilution",
    "粉碎长度": "Chop length",
    "翻压时机": "When to turn it in",
    "耕作含水量": "Moisture for tillage",
    "肥料": "Fertiliser",
    "腐熟有机肥": "Rotted manure",
    "腐熟标准": "What “rotted” means",
    "苗期氮": "Seedling nitrogen",
    "茶园改酸（仅 pH＜4.0 时）": "Lifting tea-garden pH (only when pH is below 4.0)",
    "茶园默认": "Tea garden default",
    "荚果层钙": "Calcium in the peg zone",
    "螯合铁叶面": "Foliar chelated iron",
    "补氮": "Add nitrogen",
    "补肥": "Add fertiliser",
    "表层肥": "A surface dressing",
    "要不要改": "Whether to amend",
    "覆盖": "Cover",
    "车辙处理": "Wheel-track repair",
    "轮作": "Rotation",
    "轮作/基质": "Rotation / substrate",
    "轮作/嫁接": "Rotation / grafting",
    "轮作年限": "Years between the same crop",
    "轮灌": "Rotate the water",
    "这篇不下肥": "This page does not hand out a bag",
    "追肥": "Top-dress",
    "追肥次数": "How many top-dresses",
    "通风": "Ventilation",
    "配套": "What goes with it",
    "钼酸铵叶面（确认缺钼）": "Foliar ammonium molybdate (after molybdenum is confirmed)",
    "钾肥选择": "Which potassium to use",
    "间隔": "Interval",
    "闷后培肥": "Feed the soil after the heat",
    "闷棚时间": "How long to close the house",
    "阅读顺序": "Read in this order",
    "高磷时补锌": "Add zinc when phosphorus is high",
    "高钾时补镁": "Add magnesium when potassium is high",
}

WORDS = {
    "缺氮": "nitrogen shortage",
    "缺铁": "iron lock",
    "缺钾": "potassium shortage",
    "缺磷": "phosphorus shortage",
    "缺锌": "zinc shortage",
    "缺锰": "manganese shortage",
    "缺钙": "calcium shortage",
    "缺镁": "magnesium shortage",
    "缺硼": "boron shortage",
    "缺硫": "sulphur shortage",
    "缺铜": "copper shortage",
    "缺钼": "molybdenum shortage",
    "缺素": "nutrient shortage",
    "缺肥": "short of fertiliser",
    "缺水": "no water",
    "酸化": "acid soil",
    "盐碱": "salty-alkali land",
    "盐害": "salt injury",
    "板结": "hard-packed soil",
    "涝害": "waterlogging",
    "干旱": "drought",
    "冷害": "chill injury",
    "药害": "spray injury",
    "肥害": "fertiliser burn",
    "烧根": "root burn",
    "病害": "disease",
    "连作": "same-crop fatigue",
    "铝毒": "aluminium toxicity",
    "白霜": "white crust",
    "石灰": "lime",
    "石膏": "gypsum",
    "尿素": "urea",
    "有机肥": "organic manure",
    "有机质": "organic matter",
    "化验单": "the soil-test sheet",
    "农技站": "the local agronomist",
    "示意图": "A sketch",
    "不能单凭此图下肥": "don’t fertilise from the picture alone",
    "每亩": "per mu",
    "公斤": "kg",
    "厘米": "cm",
    "吨级": "tonne-scale",
    "吨": "t",
    "水稻": "rice",
    "小麦": "wheat",
    "玉米": "maize",
    "大豆": "soybean",
    "棉花": "cotton",
    "蔬菜": "vegetables",
    "果树": "fruit trees",
    "马铃薯": "potato",
    "花生": "peanut",
    "茶叶": "tea",
    "柑橘": "citrus",
    "设施蔬菜": "greenhouse vegetables",
    "叶面": "foliar",
    "土施": "soil-applied",
    "追肥": "top-dress",
    "基施": "basal dressing",
    "深松": "deep loosening",
    "犁底层": "plough pan",
    "洗盐": "washing salt",
    "地膜": "plastic film",
    "滴灌": "drip",
    "轮作": "rotation",
    "新叶": "new leaves",
    "老叶": "old leaves",
    "叶脉": "veins",
    "根尖": "root tips",
    "土面": "the soil surface",
    "出苗": "emergence",
    "发僵": "stall",
    "萎蔫": "wilt",
    "焦边": "scorched margins",
    "脉间黄": "yellow between the veins",
    "匀黄": "even yellow",
}

PHRASES = [
    ("缺氮是下部老叶匀黄、新叶还绿", "Nitrogen shortage yellows old leaves evenly; new leaves stay greener"),
    ("缺氮是黄，缺磷是暗绿带紫、发僵", "Nitrogen shortage is yellow; phosphorus shortage is dark green with purple and a stall"),
    ("缺氮黄老叶；缺铁黄新叶、叶脉绿", "Nitrogen shortage yellows old leaves; iron lock yellows new leaves and keeps the veins green"),
    ("缺氮整叶较匀黄；缺镁是脉间黄、叶脉绿", "Nitrogen shortage yellows the whole leaf more evenly; magnesium yellows between green veins"),
    ("缺氮老叶匀黄、根还白；涝害根黑臭", "Nitrogen shortage: old leaves even yellow, roots still white. Waterlogging: roots black and smelly"),
    ("缺氮是黄老叶、整叶较匀", "nitrogen shortage yellows old leaves, more even across the blade"),
    ("酸化是根先伤、整株发僵", "acid soil hurts the roots first and the whole plant stalls"),
    ("低温回暖会缓；酸化回暖也不长", "Chill eases when it warms; acid soil still will not grow after a warm spell"),
    ("旱了浇水能缓；咸了浇小水有时更蔫。白霜是盐的记号", "Drought eases after a watering; salt sometimes wilts more after a light watering. White crust is salt’s calling card"),
    ("旱是没水；板结是有水也进不去。浇下去成径流", "Drought is no water; hard packing is water that cannot get in. It runs off"),
    ("旱了浇水能缓；烧根浇小水有时更蔫", "Drought eases after water; burnt roots sometimes wilt more after a light watering"),
    ("缺水土干；盐害浇完更蔫、有白霜", "Dry soil is dry; salt injury wilts more after watering and shows white crust"),
    ("缺水土干；涝害土湿还蔫", "Dry-soil wilt sits on dry ground; waterlogging wilts on wet ground"),
    ("涝害白天蔫、根发黑发臭；缺氮根还白", "Waterlogging wilts by day, roots black and smelly; nitrogen shortage still has white roots"),
    ("涝害有明水或土过湿；连作在排水良好棚里也会发生", "Waterlogging has standing water or soil that is too wet; same-crop fatigue still happens in a well-drained house"),
    ("缺钾土面不一定白；盐害常伴出苗差和白霜", "Potassium shortage does not always show white crust; salt injury often comes with poor emergence and white crust"),
    ("盐害常有白霜、出苗差；缺钾土面不一定白", "Salt injury often has white crust and poor emergence; potassium shortage does not always show white on the surface"),
    ("刚施氯化钾还焦，更像氯或盐；缺钾是慢慢来的", "Scorch right after potassium chloride is more chloride or salt; potassium shortage creeps"),
    ("缺钾从老叶缘来；缺钙从顶芽和幼果来", "Potassium shortage starts on old-leaf margins; calcium shortage starts at the growing point and young fruit"),
    ("缺铁黄新叶、叶脉绿；缺氮黄老叶、整叶较匀", "Iron lock: new leaves yellow, veins still green. Nitrogen shortage: old leaves yellow, more even"),
    ("缺铁主要脉间黄、节间不一定短；缺锌常伴随小叶簇生", "Iron lock is mainly yellow between veins, internodes not always short; zinc shortage often brings little clustered leaves"),
    ("缺铁黄新叶；缺镁黄老叶。叶位记错就会补错", "Iron lock yellows new leaves; magnesium yellows old leaves. Get the leaf position wrong and you feed the wrong bag"),
    ("缺铁脉绿肉黄、斑点少；缺锰常带褐斑", "Iron lock: green veins, yellow flesh, few spots. Manganese shortage often carries brown specks"),
    ("缺锰常带褐斑；缺铁更干净的脉间黄", "Manganese shortage often has brown specks; iron lock is a cleaner yellow between veins"),
    ("药害来得快、跟喷幅重合；缺锌是慢慢缩、连年出现", "Spray injury comes fast and matches the spray bout; zinc shortage creeps and returns year after year"),
    ("药害喷后1～3天、沿雾滴；缺锰慢慢铺", "Spray injury 1–3 days after the bout, along droplets; manganese shortage spreads slowly"),
    ("低温也发紫，回暖能缓；缺磷回暖仍僵，酸化田更重", "Chill can purple too and eases when it warms; phosphorus shortage still stalls after a warm spell, worse on acid land"),
    ("整层硬是板结，下面一条发亮硬盖才是犁底层", "The whole layer hard is packing; a shiny hard lid underneath is a plough pan"),
    ("缺肥补了当季能绿；家底薄是年年补年年飘", "A this-season shortage greens up after a feed; thin organic matter is feed every year and still thin"),
    ("板结是硬；家底薄是没肉，可以又硬又浅", "Hard packing is hard; thin organic matter is no meat in the soil — it can be both hard and shallow"),
    ("缺肥补肥能缓；连作是死棵点片发生，邻地轮作的明显好", "A shortage eases after a feed; same-crop fatigue dies in patches, and the neighbour who rotated looks better"),
    ("化验单养分不低却长不好，更像土不活", "The sheet is not low but the crop still fails — more like the soil is not alive"),
    ("露地盐来自地下水或母质；大棚盐多半是肥积出来的", "Open-field salt comes from groundwater or the parent material; greenhouse salt is usually fertiliser that piled up"),
    ("根腐常点片死棵、有病斑；烧根沿施肥沟整齐发生", "Root rot dies in patches with lesions; root burn lines up along the fertiliser furrow"),
    ("微生物失衡常和连作一起出现，但先要把有机质和通气搞好，菌才住得下", "A microbe imbalance often rides with same-crop fatigue, but organic matter and air have to be right before any inoculant can live there"),
    ("照片只能怀疑，化验单才能大致定量。叶子黄有十种原因", "A photo can only raise a suspicion; the sheet roughly sizes it. Yellow leaves have ten causes"),
    ("邻地土不一样。沙土和黏土、酸和碱，用量能差一倍", "The next field is not this field. Sand and clay, acid and alkali — the rate can differ by half"),
    ("化验室有差错，但更常见是你挖土的位置不对", "Labs make mistakes; more often you took soil from the wrong spot"),
    ("叶子能提示方向，定不了用量", "Leaves can point a direction; they cannot set a rate"),
    ("病害会扩展传染、有病斑菌丝；脐腐常同一部位、跟浇水波动同步", "Disease spreads, with lesions or mycelium; blossom-end rot sits on the same spot and tracks watering swings"),
    ("旱了浇水能缓一部分；花器畸形、空心还在才更像硼", "A watering eases some drought drop; misshapen flowers and hollow hearts that stay are more boron"),
    ("毒也焦叶缘、坏死生长点，和缺很像，所以绝不能加倍", "Toxicity also scorches margins and kills the growing point — it looks like shortage, so never double the rate"),
    ("具体公斤数看石灰用量篇，这篇不下表", "Bag weights live in the lime-rate guide. This page does not print a table"),
    ("这篇只辨认，洗盐和石膏各有专篇", "This page only tells them apart. Washing salt and gypsum each have their own guide"),
    ("黏土适墒才动；松完要有有机肥垫底", "On clay, only work at the right moisture; put rotted manure under after you loosen"),
    ("连续三年可见效，不要一年堆山", "Three years shows it. Do not pile a mountain in one year"),
    ("叶面补氮只救急，不能替代土施", "Foliar nitrogen is first aid, not a stand-in for soil urea"),
    ("叶面磷酸二氢钾常见 0.2%～0.3% 量级，先小面积避开中午", "Foliar potassium dihydrogen phosphate is commonly around 0.2–0.3%. Try a small patch, not at noon"),
    ("满地撒不如放到根能摸到的地方", "Broadcasting the whole field is worse than putting it where the root can touch it"),
    ("高 pH 土撒硫酸亚铁进地当治本，多半打水漂", "Broadcasting ferrous sulphate on high-pH land as a cure usually floats away"),
    ("基施锌数年一次，不要年年猛倒", "Soil zinc is once in several years, not a yearly dump"),
    ("比任何菌剂都稳", "Steadier than any inoculant"),
    ("不是神药，先把有机质和通气搞好", "Not a miracle. Get organic matter and air right first"),
    ("越浓越伤", "The thicker it is, the more it burns"),
    ("每年至少一次", "At least once a year"),
    ("不要贴种子", "Do not put it against the seed"),
    ("苗期阈值更低", "The seedling threshold is lower"),
    ("按登记说明下限", "Use the labelled lower rate"),
    ("按登记证说明", "Follow the registered label"),
    ("按包装下限分次", "Split the labelled lower rate"),
    ("按说明书下限起步", "Start at the labelled lower rate"),
    ("先小面积", "Try a small patch first"),
    ("避开中午", "Keep off noon heat"),
    ("宁少勿多", "better too little than too much"),
    ("别抄邻县石灰账", "Don’t copy the next county’s lime recipe"),
    ("土里的肉", "the meat in the soil"),
    ("盐的名片", "salt’s calling card"),
]


def strip_sample(s: str) -> str:
    if not s:
        return s
    s = s.replace("A bad sample poisons", "Soil taken badly poisons")
    s = s.replace("a bad sample poisons", "soil taken badly poisons")
    s = s.replace("Sample the bad patch and a greener neighbour separately.", "Take soil from the bad patch and from a greener neighbour, separately.")
    s = s.replace("Sample the bad patch", "Take soil from the bad patch")
    s = s.replace("don’t sample the manure pile", "don’t take soil from the manure pile")
    s = s.replace("Don't sample the manure pile", "Don’t take soil from the manure pile")
    s = s.replace("Don’t sample the manure pile", "Don’t take soil from the manure pile")
    s = s.replace("don’t sample", "don’t take soil from")
    s = s.replace("Sample before you treat", "Take the soil before you treat")
    s = s.replace("Sample before", "Take the soil before")
    s = s.replace("Sample bef", "Take the soil before")
    s = s.replace("one bag. Sample", "one bag. Take soil")
    s = re.sub(r"\b[Ss]amples\b", "soil portions", s)
    s = re.sub(r"\b[Ss]ampling\b", "taking soil", s)
    s = re.sub(r"\b[Ss]ampled\b", "taken", s)
    s = re.sub(r"\b[Ss]ample\b", "soil taken", s)
    s = re.sub(r"\bSAMPLE\b", "soil taken", s)
    return s


def to_en(text: str) -> str:
    if not text:
        return text
    s = text
    for a, b in PHRASES:
        if a in s:
            s = s.replace(a, b)
    # lookalikes / dose names as whole tokens
    for a, b in sorted(LOOK.items(), key=lambda kv: -len(kv[0])):
        if a in s:
            s = s.replace(a, b)
    for a, b in sorted(DOSE_NAME.items(), key=lambda kv: -len(kv[0])):
        if a in s:
            s = s.replace(a, b)
    for a, b in sorted(WORDS.items(), key=lambda kv: -len(kv[0])):
        if a in s:
            s = s.replace(a, b)
    s = s.replace("～", "–").replace("~", "–").replace("—", "–")
    s = s.replace("；", "; ").replace("，", ", ").replace("。", ". ").replace("、", ", ")
    s = s.replace("（", " (").replace("）", ")").replace("＜", " below ").replace("＞", " above ")
    s = s.replace("％", "%")
    s = re.sub(r"\s+", " ", s).strip(" ,;")
    if s and s[-1] not in ".!?":
        if HAN.search(text):  # original was a sentence
            pass
    s = strip_sample(s)
    return s.strip()


SKETCH = "A sketch — don’t fertilise from the picture alone."


def caption_en(cap: str, alt: str) -> str:
    body = cap.replace("示意图，不能单凭此图下肥。", "").replace("示意图，不能单凭此图下肥", "").strip()
    head = to_en(body or alt)
    head = head.rstrip(" .")
    return f"{head}. {SKETCH}" if head else SKETCH


def main() -> None:
    arts = json.loads((ROOT / "src/data/articles.json").read_text())
    ov = json.loads((ROOT / "src/data/articles-en.json").read_text())
    meta = json.loads((ROOT / "src/data/articles-en-meta.json").read_text())

    leftover = []

    def check(path: str, s: str) -> str:
        if HAN.search(s) or re.search(r"\b[Ss]ample\b|\bSAMPLE\b", s):
            leftover.append((path, s[:160]))
        return s

    for a in arts:
        slug = a["slug"]
        g = ov.setdefault(slug, {})
        g["summary"] = meta.get(slug, {}).get("summary") or g.get("summary") or to_en(a["summary"])
        g["commonCrops"] = check(f"{slug}.crops", to_en(a["phenomenon"]["commonCrops"]))
        g["confuse"] = []
        for c in a["confuse"]:
            item = {
                "lookalike": LOOK.get(c["lookalike"], to_en(c["lookalike"])),
                "difference": to_en(c["difference"]),
            }
            if c.get("photoHint"):
                item["photoHint"] = to_en(c["photoHint"])
            for k, v in item.items():
                check(f"{slug}.confuse.{k}", v)
            g["confuse"].append(item)
        g["dosage"] = []
        for d in a["dosage"]:
            item = {
                "name": DOSE_NAME.get(d["name"], to_en(d["name"])),
                "range": to_en(d["range"]),
                "note": to_en(d["note"]),
            }
            for k, v in item.items():
                check(f"{slug}.dose.{k}", v)
            g["dosage"].append(item)
        g["photos"] = []
        for p in a["photos"]:
            item = {"alt": to_en(p["alt"]), "caption": caption_en(p["caption"], p["alt"])}
            for k, v in item.items():
                check(f"{slug}.photo.{k}", v)
            g["photos"].append(item)
        g["indicators"] = []
        for ind in a.get("indicators") or []:
            item = {
                "name": to_en(ind["name"]),
                "meaning": to_en(ind["meaning"]),
                "typical": to_en(ind["typical"]),
            }
            for k, v in item.items():
                check(f"{slug}.ind.{k}", v)
            g["indicators"].append(item)

        def walk(obj, path):
            if isinstance(obj, str):
                n = strip_sample(obj)
                if n != obj:
                    return n
                return obj
            if isinstance(obj, list):
                return [walk(x, path) for x in obj]
            if isinstance(obj, dict):
                return {k: walk(v, f"{path}.{k}") for k, v in obj.items()}
            return obj

        ov[slug] = walk(g, slug)

    (ROOT / "src/data/articles-en.json").write_text(json.dumps(ov, ensure_ascii=False, indent=2) + "\n")
    print("leftover", len(leftover))
    for p, s in leftover[:40]:
        print(" ", p, "=>", s)


if __name__ == "__main__":
    print("Use scripts/fill-en-overlay.py — this file is the name/phrase dictionary only.")
