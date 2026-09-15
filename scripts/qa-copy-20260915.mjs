#!/usr/bin/env node
/**
 * 2026-09-15 copy punch: related slogans, P0 telegram lines,
 * wiki EN, sourcesEn, speak ≥6. Does not change dosages/thresholds.
 */
import { readFileSync, writeFileSync } from "node:fs";

function load(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}
function save(p, data) {
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

const articles = load("src/data/articles.json");
const index = load("src/data/articles-index.json");
const enrich = load("src/data/enrich.json");
const meta = load("src/data/articles-en-meta.json");
const overlay = load("src/data/articles-en.json");
const wiki = load("src/data/wiki.json");

const P0 = [
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
];
const RELATED = [
  "shi-hui-yong-liang",
  "lv-du-shang-gen",
  "sheng-li-suan-xing-fei",
  "fan-yan",
  "han-yan-jian-bie",
  "xi-yan-pai-shui",
  "li-di-ceng",
  "nian-tu-nan-geng",
  "yu-hou-ban-jie-kai-lie",
  "jie-gan-huan-tian",
  "you-ji-fei-ru-he-xuan",
  "sha-tu-zeng-you-ji-zhi",
  "huang-ye-jian-bie",
  "que-liu",
  "jie-gan-bu-dan",
  "lv-hai",
  "yang-fen-kang-kang",
  "pu-tao-shi-hui-tu-que-tie",
  "qi-zi-huang-hua",
  "shi-hui-xing-tu",
  "shui-tian-huan-yuan",
  "miao-qi-fei-hai",
  "wei-fu-shu-you-ji-fei",
  "di-guan-nong-du",
  "ce-tu-qu-yang",
];
const SCOPE = new Set([...P0, ...RELATED]);

function zhFix(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/看包装，邻县袋子不能直接抄。/g, "看包装认农用石灰，用量不要照搬别家田。")
    .replace(/邻县袋子不能直接抄。/g, "用量要对自家质地，不要照搬别家田的袋数。")
    .replace(/邻县袋子对不上自家质地。/g, "用量要对自家质地，沙土少、黏土略多。")
    .replace(/邻县袋子对不上自家质地/g, "用量要对自家质地")
    .replace(/邻县袋子/g, "别家田的用量")
    .replace(/铝离子出来咬根尖/g, "铝离子溶出来伤根尖")
    .replace(/铝从土粒上掉下来咬根尖/g, "铝从土粒上溶下来伤根尖")
    .replace(/铝溶出来咬根尖/g, "铝溶出来伤根尖")
    .replace(/专咬根尖/g, "专伤根尖")
    .replace(/咬根尖分生组织/g, "伤根尖分生组织")
    .replace(/咬根尖/g, "伤根尖")
    .replace(/几乎不咬根/g, "几乎不伤根")
    .replace(/根被咬了/g, "根尖被伤了")
    .replace(/土会越来越醋/g, "土会一年年更酸")
    .replace(/越来越醋/g, "一年年更酸")
    .replace(/粪不是都能进棚，袋也不是都能当肉/g, "粪不是都能进棚，袋上写有机也不等于能当有机质")
    .replace(/袋也不是都能当肉/g, "袋上写有机也不等于能当有机质")
    .replace(/都能当肉/g, "都能当有机质")
    .replace(/咸看电导，涩看酸碱和钠，两码事。/g, "咸不咸看电导。涩不涩看 pH 和钠。两件事不要混着治。")
    .replace(/咸看电导，涩看酸碱和钠。/g, "咸不咸看电导。涩不涩看 pH 和钠。")
    .replace(/咸看电导，涩看酸碱和钠/g, "咸不咸看电导，涩不涩看 pH 和钠")
    .replace(/咸看电导，涩看 pH 和钠/g, "咸不咸看电导，涩不涩看 pH 和钠")
    .replace(/搓一把：浅、粉、团不住。/g, "搓一把土：颜色浅、粉、搓不成团。")
    .replace(/搓一把：浅、粉、团不住/g, "搓一把土：颜色浅、粉、搓不成团")
    .replace(/板结是硬；家底薄是没肉，可以又硬又浅。/g, "板结是硬。有机质低是家底薄，不是当季少下一袋肥。可以又硬又浅。")
    .replace(/家底薄是没肉/g, "有机质低是家底薄，不是当季少下一袋肥")
    .replace(/肉薄，铝更凶/g, "有机质低时缓冲弱，铝害更明显。")
    .replace(/有机质是土的肉和缓冲。薄了，肥留不住，菌也没房住。一袋菌不是那层肉。/g, "有机质是土的缓冲和家底。薄了，肥留不住，微生物也没处住。菌剂产品补不回那层有机质。")
    .replace(/一袋菌不是那层肉/g, "菌剂产品补不回那层有机质")
    .replace(/不是一袋菌能当季补回的家底/g, "不是菌剂产品能当季补回的家底")
    .replace(/不是一袋菌的名字/g, "不是菌剂产品的名字")
    .replace(/一袋菌补不回三年还田/g, "菌剂产品补不回三年还田")
    .replace(/一袋菌当一季翻身药/g, "菌剂产品当一季翻身药")
    .replace(/一袋菌当翻身药/g, "菌剂产品当翻身药")
    .replace(/一袋菌一季补不回/g, "菌剂产品一季补不回")
    .replace(/一袋菌一季翻身/g, "菌剂产品一季翻身")
    .replace(/一袋菌当季翻身/g, "菌剂产品当季翻身")
    .replace(/一袋菌当不了有机质/g, "菌剂产品当不了有机质")
    .replace(/一袋菌/g, "菌剂产品")
    .replace(/袋也不是都能当肉/g, "袋上写有机也不等于能当有机质");
}

function enFix(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/Lime grain land only below about 5\.5\./g, "On grain land, lime only below about 5.5.")
    .replace(/pH is a ruler, not a disease name\./g, "pH is a scale, not a diagnosis.")
    .replace(/pH is a ruler, not a disease\./g, "pH is a scale, not a diagnosis.")
    .replace(/aluminium woke up/gi, "aluminium has become soluble")
    .replace(/Too high pickles the root — it is not drought\./g, "High EC stresses roots; it is not the same as drought.")
    .replace(/Too high pickles the root/g, "High EC stresses roots")
    .replace(/every watering pickles the root/gi, "every watering can salt the root zone")
    .replace(/pickles the root/gi, "stresses the roots")
    .replace(/Organic matter is the house and the meal, not the name of a microbe bag\./g, "Organic matter is the soil’s reserve and buffer, not the name of a microbial product.")
    .replace(/house and the meal/gi, "reserve and buffer")
    .replace(/Organic matter is the house, not a microbe brand\./g, "Organic matter is the reserve, not a microbial product name.")
    .replace(/Crumbs are the loaf structure\. Fertiliser will not pinch them into being\./g, "Crumbs are soil structure. Fertiliser will not pinch them into being overnight.")
    .replace(/loaf structure/gi, "crumb structure")
    .replace(/A weak magnet needs little-and-often\. A strong magnet can hold more at once\./g, "Low CEC needs smaller, more frequent dressings. High CEC can hold more at once.")
    .replace(/A weak magnet needs little-and-often/g, "Low CEC needs smaller, more frequent dressings")
    .replace(/weak magnet/gi, "low CEC")
    .replace(/dissolves and bites root tips/g, "dissolves and injures root tips")
    .replace(/aluminium bites the tip off/gi, "aluminium injures the tip")
    .replace(/bites the tip off/g, "injures the tip")
    .replace(/bites root tips/g, "injures root tips")
    .replace(/Exchangeable Al is the tooth in acid soil\./g, "Exchangeable aluminium is the toxic ion in very acid soil.")
    .replace(/the tooth in acid soil/gi, "the toxic ion in very acid soil")
    .replace(/A hoe that will not bite asks this before hunger\./g, "A hoe that will not enter asks this before hunger.")
    .replace(/hoe that will not bite/gi, "hoe that will not enter")
    .replace(/Organic matter is meat, EC is salt\. pH is only sour or sweet\./g, "Organic matter is the reserve. EC is salt. pH only says how acid or alkaline.")
    .replace(/Organic matter is meat, EC is salt/g, "Organic matter is the reserve; EC is salt")
    .replace(/Lime and alkali work aim at this number\./g, "Lime or alkali amendments aim at this number.");
}

function walk(obj, fix) {
  if (typeof obj === "string") return fix(obj);
  if (Array.isArray(obj)) return obj.map((x) => walk(x, fix));
  if (obj && typeof obj === "object") {
    const out = Array.isArray(obj) ? [] : { ...obj };
    for (const k of Object.keys(obj)) out[k] = walk(obj[k], fix);
    return out;
  }
  return obj;
}

for (const a of articles) {
  if (!SCOPE.has(a.slug)) continue;
  Object.assign(a, walk(a, zhFix));
}
for (const a of index) {
  if (!SCOPE.has(a.slug)) continue;
  Object.assign(a, walk(a, zhFix));
}
for (const slug of SCOPE) {
  if (enrich[slug]) enrich[slug] = walk(enrich[slug], zhFix);
  if (meta[slug]) meta[slug] = walk(meta[slug], enFix);
  if (overlay[slug]) overlay[slug] = walk(overlay[slug], enFix);
}

const field = {
  "shi-hui-yong-liang": {
    subtitle: "改酸的药要认包装，不要跟尿素同一天撒。",
    summary: "已经决定改酸，才问用哪种灰、撒多少。农用石灰才能下地，建筑石灰不行。粮田常见每亩 50–150 公斤，沙土按下限，分两次。跟尿素不同日。",
  },
  "lv-du-shang-gen": {
    subtitle: "土太酸，铝离子溶出来伤根尖。",
    summary: "土太酸，铝离子溶出来伤根尖。根尖像被烫过，发褐、秃、不伸。叶子再追氮也不发棵。先改酸，不要在秃根上猛尿素。",
  },
  "sheng-li-suan-xing-fei": {
    subtitle: "铵态氮、硫酸钾用久了，土会一年年更酸。",
    summary: "铵态氮、硫酸钾用久了，土会一年年更酸。连年高产田渐渐发僵，pH 一年年往下掉。翻近几年氮肥包装，轮换氮源，再测 pH。",
  },
  "you-ji-fei-ru-he-xuan": {
    subtitle: "粪不是都能进棚，袋上写有机也不等于能当有机质。",
    summary: "粪不是都能进棚，袋上写有机也不等于能当有机质。有的还烫手还臭，有的盐很高。棚里更要问盐和腐熟。",
  },
  "you-ji-zhi": {
    subtitle: "有机质是缓冲，不是菌剂产品能当季补回的家底。",
    summary: "土色浅、搓一把土就散、肥效一场雨就飘，常见是有机质薄了。连续还田和腐熟粪比一季猛堆靠谱。",
    card: "土色浅、一把就散，先测有机质。菌剂产品补不回三年还田。",
  },
};

for (const [slug, patch] of Object.entries(field)) {
  const a = articles.find((x) => x.slug === slug);
  const i = index.find((x) => x.slug === slug);
  if (a) Object.assign(a, patch);
  if (i) Object.assign(i, patch);
}

meta["suan-hua"].subtitle = "pH is a scale, not a diagnosis. On grain land, lime only below about 5.5.";
meta["suan-hua"].card = "Stunted seedlings: check the root tips, then pH. On grain land, lime only below about 5.5.";
meta["lv-du-shang-gen"].subtitle = "Low pH lets aluminium dissolve onto the root tip.";
meta["lv-du-shang-gen"].summary =
  "Short brown roots, few laterals. When pH is low enough, aluminium becomes soluble. Lime the field; don’t chase nitrogen on bald roots.";
meta["lv-du-shang-gen"].card = "Brown, bald tips. Lime the field; don’t chase nitrogen on bald roots.";
if (meta["di-guan-nong-du"]) {
  meta["di-guan-nong-du"].title = "Drip too strong: every watering can salt the root zone";
}

enrich["suan-hua"].sourcesEn = [
  "Rates are customary grain-land ranges; confirm with a local station and the label. Tea pH targets differ from grain.",
];
if (!overlay["suan-hua"].sources) {
  overlay["suan-hua"].sources = enrich["suan-hua"].sourcesEn.slice();
}

if (enrich["suan-hua"].labTable) {
  for (const row of enrich["suan-hua"].labTable) {
    if (row.id === "om") row.low = "有机质低时缓冲弱，铝害更明显。";
    if (row.id === "al" && row.low) row.low = zhFix(row.low);
  }
}

enrich["yan-jian"].speakZh = [
  "蹲下去看土面：白粉还是硬壳。",
  "出苗一块有一块没有。",
  "叶边像开水烫过。",
  "小水浇完更蔫，不要当旱灌。",
  "咸不咸看电导。涩不涩看 pH 和钠。两件事不要混着治。",
  "没沟不要大水漫灌。",
  "见白霜不要一律撒石膏。",
];
enrich["you-ji-zhi"].speakZh = [
  "搓一把土：颜色浅、粉、搓不成团。",
  "肥下去一场雨又像没施。",
  "有机质是家底，不是菌剂产品的名字。",
  "连续三年还田加腐熟粪。",
  "生粪埋根边会烧苗。",
  "不要把菌剂产品当有机质用。",
];
enrich["you-ji-zhi"].speakEn = [
  "Rub a handful of soil: pale, dusty, it will not clump.",
  "Fertiliser vanishes after one rain.",
  "Organic matter is the reserve, not a microbial product name.",
  "Plan three years of residue and rotted manure.",
  "Fresh manure against the root burns.",
  "A microbial product will not rebuild organic matter in one season.",
];
enrich["que-jia"].speakZh = [
  "老叶外边焦，往里卷。",
  "土面不一定白。",
  "白霜加焦边先想盐。",
  "叶缘焦先分盐害和缺钾。",
  "确认缺钾后，每亩五到十五公斤。",
  "忌氯作物不用氯化钾。",
];
enrich["que-jia"].speakEn = [
  "Old margins scorch and roll in.",
  "The surface is not always white.",
  "A crust plus scorch is salt until proven otherwise.",
  "Scorched edges: split salt from potassium before you open a bag.",
  "Once confirmed, grain crops commonly take five to fifteen kilograms per mu.",
  "Chloride-sensitive crops do not get potassium chloride.",
];
enrich["lao-hai"].speakZh = [
  "白天蔫，晚上缓。",
  "土是湿的还蔫，不是旱。",
  "根黑臭，先排水。",
  "新根没出来以前不要追氮。",
  "叶黄时先看根，不要先追尿素。",
  "这不是缺氮。先把水排走。",
];
enrich["lao-hai"].speakEn = [
  "Wilt by day, recover at night.",
  "Wet soil and still wilted is not drought.",
  "Black, smelling roots: drain first.",
  "No nitrogen until new roots show.",
  "Yellow leaves: look at the roots before you pour urea.",
  "This is not a nitrogen shortage. Move the water first.",
];
enrich["shao-gen"].speakZh = [
  "伤的成行，沟里还能见到肥粒。",
  "这是烧根，不是缺肥。",
  "立刻灌清水，暂时停肥。",
  "补种要离开原来的肥窝。",
  "种肥和种子隔开。",
  "不要再往同一条沟里加一袋肥。",
];
enrich["shao-gen"].speakEn = [
  "Injury in a stripe, granules still in the furrow.",
  "That is a burn, not a shortage.",
  "Flush with clean water and pause fertiliser.",
  "Re-sow away from the old pocket.",
  "Keep starter a few centimetres from the seed.",
  "Do not add another bag to the same furrow.",
];

function patchWikiCopy(copy, lang) {
  return walk(copy, lang === "en" ? enFix : zhFix);
}

wiki.ph.en.subtitle = "pH is a scale, not a diagnosis.";
wiki.ph.en.summary = "pH is a scale, not a diagnosis. Lime or alkali amendments aim at this number.";
wiki.ph.en.plainExplain =
  "pH is a scale, not a diagnosis. Lime or alkali amendments aim at this number. Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.";
wiki.ph.en.confuse = [
  {
    lookalike: "Organic matter or EC",
    difference: "Organic matter is the reserve. EC is salt. pH only says how acid or alkaline.",
    photoHint: "Put the sheet next to the root tips or the newest leaves.",
  },
  {
    lookalike: "Guessing from leaves",
    difference: "pH is a scale, not a diagnosis. Test when the leaf and the number disagree.",
    photoHint: "Sheet and plant together.",
  },
];
wiki.ph.en.spoken = [
  "pH is a scale, not a diagnosis.",
  "Acidity and water pH on the sheet are the same cell.",
  "Read the soil to water ratio before you compare labs.",
  "On grain land, lime only below about 5.5.",
  "Do not push tea to neutral.",
  "Above about 8, iron often locks.",
  "Rates live in the acid-soil and lime guides.",
];

wiki.ec.en.subtitle = "EC measures how salty the soil water is.";
wiki.ec.en.summary = "EC measures how salty the soil water is. High EC stresses roots; it is not the same as drought.";
wiki.ec.en.plainExplain =
  "EC measures how salty the soil water is. High EC stresses roots; it is not the same as drought. Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.";
wiki.ec.en.spoken = [
  "EC measures how salty the soil water is.",
  "High EC stresses roots; it is not the same as drought.",
  "Read the unit. mS and µS differ by a thousand.",
  "Different soil to water ratios are not comparable.",
  "White crust plus worse wilt after watering often means EC went up.",
  "Don’t spread gypsum on every white crust.",
];

wiki.om.zh.subtitle = "有机质是家底，不是菌剂产品的名字。";
wiki.om.zh.summary = "有机质是家底，不是菌剂产品的名字。";
wiki.om.en.subtitle = "Organic matter is the soil’s reserve and buffer, not the name of a microbial product.";
wiki.om.en.summary = "Organic matter is the soil’s reserve and buffer, not the name of a microbial product.";
wiki.om.en.plainExplain =
  "Organic matter is the soil’s reserve and buffer, not the name of a microbial product. Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.";
wiki.om.en.spoken = [
  "Organic matter is the soil’s reserve and buffer.",
  "It is not the name of a microbial product.",
  "Do not mix percent with grams per kilogram.",
  "Pale dusty soil that loses fertiliser after rain is thin.",
  "Residue return is year-by-year work.",
  "Fresh manure against the root burns.",
];

wiki.al.en.subtitle = "Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more nitrogen.";
wiki.al.en.summary =
  "Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls. Fix the acid, don’t chase nitrogen.";
wiki.al.en.plainExplain =
  "Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more nitrogen. Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.";
wiki.al.en.longform = [
  "Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls. Southern red-yellow earth, tea, and ammonium-N grain fields show it.",
  "Hunger keeps a root, just thin; aluminium injures the tip. Wash roots before you talk fertiliser. The job is lime and organic matter, not more nitrogen. Tea likes acid, not ever-more-acid.",
];
wiki.al.en.spoken = [
  "Exchangeable aluminium is the toxic ion in very acid soil.",
  "Below about pH 5.5 it dissolves and injures root tips.",
  "Brown, bald tips with few white points, then the top stalls.",
  "The job is lime and organic matter, not more nitrogen.",
];

wiki.na.en.subtitle = "Alkali is sodium, not every white crust.";
wiki.na.en.summary = "Exchangeable sodium is how many seats Na occupies. White crust is salt; high Na is sodicity.";
wiki.na.en.plainExplain =
  "Exchangeable sodium is the alkali question, not every white crust. White crust is salt; high Na is sodicity. Gypsum is not for every crust — only when sodium is high and calcium is relatively low.";
wiki.na.en.spoken = [
  "Exchangeable sodium is the alkali question.",
  "White crust is salt. High Na is sodicity.",
  "Read it with CEC.",
  "Don’t gypsum every white crust.",
];

wiki.cec.en.subtitle = "Low CEC needs smaller, more frequent dressings. High CEC can hold more at once.";
wiki.cec.en.summary = "CEC is how many nutrient seats the soil has. Low CEC needs smaller, more frequent dressings.";
wiki.cec.en.plainExplain =
  "CEC is how many nutrient seats the soil has. Sand holds little; clay and high organic matter hold more. You cannot change texture overnight; you thicken organic matter.";
wiki.cec.en.longform = [
  "Low-CEC sand will not hold fertiliser. Clay and high-organic-matter soils hold more. Texture and organic matter set CEC. You cannot change texture; you thicken organic matter.",
  "Texture is sand or clay; CEC is the holding that follows. Low CEC needs smaller, more frequent dressings. High CEC can hold more at once.",
];
wiki.cec.en.spoken = [
  "CEC is how many nutrient seats the soil has.",
  "Low CEC needs smaller, more frequent dressings. High CEC can hold more at once.",
  "Low-CEC sand will not hold fertiliser.",
  "Clay and high-organic-matter soils hold a bigger dressing.",
];

wiki.aggregate.en.subtitle = "Crumbs are soil structure. Fertiliser will not pinch them into being overnight.";
wiki.aggregate.en.summary = "Crumbs are soil structure. Fertiliser will not pinch them into being overnight.";
wiki.aggregate.en.plainExplain =
  "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet. Organic matter, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.";
wiki.aggregate.en.longform = [
  "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet. Organic matter, roots and hyphae are the glue.",
  "Compaction is crumbs smashed then smeared. Texture did not change; the road closed. Crumbs are soil structure. Fertiliser will not pinch them into being overnight.",
];
wiki.aggregate.en.spoken = [
  "Crumbs are soil structure.",
  "Fertiliser will not pinch them into being overnight.",
  "Good soil holds and breaks, with pores inside.",
  "Broken structure is flour when dry, soup when wet.",
];

wiki.bulk.en.subtitle = "Bulk density is how tight the soil is. A hoe that will not enter asks this before hunger.";
wiki.bulk.en.summary = "Bulk density is how tight the soil is. A hoe that will not enter asks this before hunger.";
wiki.bulk.en.plainExplain =
  "How heavy a given volume of soil is. High in the tilled layer means compaction. Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.";
wiki.bulk.en.longform = [
  "How heavy a given volume of soil is. High in the tilled layer means compaction. Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
  "Porosity is the other face: high bulk density, few pores. Bulk density is how tight the soil is. A hoe that will not enter asks this before hunger.",
];
wiki.bulk.en.spoken = [
  "Bulk density is how tight the soil is.",
  "A hoe that will not enter asks this before hunger.",
  "High bulk density in the tilled layer means compaction.",
  "Organic matter lowers it slowly.",
];

for (const id of Object.keys(wiki)) {
  if (wiki[id]?.en) wiki[id].en = walk(wiki[id].en, enFix);
  if (wiki[id]?.zh && ["om"].includes(id)) wiki[id].zh = walk(wiki[id].zh, zhFix);
}

for (const a of index) {
  const src = articles.find((x) => x.slug === a.slug);
  if (!src) continue;
  a.title = src.title;
  a.subtitle = src.subtitle;
  a.summary = src.summary;
  if (src.card) a.card = src.card;
}

save("src/data/articles.json", articles);
save("src/data/articles-index.json", index);
save("src/data/enrich.json", enrich);
save("src/data/articles-en-meta.json", meta);
save("src/data/articles-en.json", overlay);
writeFileSync("src/data/wiki.json", JSON.stringify(wiki));

const badZh = /邻县袋子|咬根尖|越来越醋|一袋菌|当肉|咸看电导，涩看|搓一把：浅、粉|家底薄是没肉|肉薄，铝更凶/;
const badEn = /pickles the root|house and the meal|loaf structure|weak magnet|aluminium woke up|Lime grain land only|bites root|tooth in acid/i;
function scan(label, obj, slugs) {
  const hits = [];
  const walk2 = (v, path) => {
    if (typeof v === "string") {
      if (badZh.test(v) || badEn.test(v)) hits.push(path + " => " + v.slice(0, 80));
      return;
    }
    if (Array.isArray(v)) v.forEach((x, i) => walk2(x, path + "[" + i + "]"));
    else if (v && typeof v === "object") for (const k of Object.keys(v)) walk2(v[k], path + "." + k);
  };
  if (Array.isArray(obj)) {
    for (const a of obj) if (!slugs || slugs.has(a.slug)) walk2(a, a.slug);
  } else {
    for (const k of Object.keys(obj)) if (!slugs || slugs.has(k) || !slugs) walk2(obj[k], k);
  }
  if (hits.length) {
    console.log("REMAINING", label, hits.length);
    hits.slice(0, 40).forEach((h) => console.log(" ", h));
  } else console.log("clean", label);
}
scan("articles", articles, SCOPE);
scan("index", index, SCOPE);
scan("enrich", enrich, SCOPE);
scan("meta", meta, SCOPE);
scan("overlay", overlay, SCOPE);
scan("wiki", wiki);
console.log("ok qa-copy-20260915");
