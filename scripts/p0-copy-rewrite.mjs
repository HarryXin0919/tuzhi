#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const P0 = new Set([
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
]);

function load(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}
function save(p, data) {
  writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

function stripZh(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/先判断酸不酸，别一上来抄邻县的石灰账。?/g, "")
    .replace(/别抄邻县的石灰账。?/g, "")
    .replace(/别抄邻县石灰账。?/g, "")
    .replace(/不要抄邻县石灰袋数，先测这块地。/g, "不要照搬别人的石灰用量，先测这块地。")
    .replace(/没测别抄邻县袋子。/g, "没测不要照搬别人的用量。")
    .replace(/邻居袋子不能直接抄。/g, "别人的用量不能直接照搬。")
    .replace(/先当盐的名片。?/g, "")
    .replace(/白霜是盐的名片/g, "白霜是盐分线索")
    .replace(/盐的名片/g, "盐分线索")
    .replace(/才像铝在咬/g, "才像铝毒伤根")
    .replace(/铝在咬根尖/g, "铝离子伤根尖")
    .replace(/铝在咬就先改酸/g, "铝毒就先改酸")
    .replace(/先想铝在咬/g, "先想铝毒伤根")
    .replace(/铝在咬/g, "铝毒")
    .replace(/是膘掉了/g, "是有机质薄了")
    .replace(/浅了就是膘掉了/g, "浅了就是有机质薄了")
    .replace(/地头一眼看膘/g, "地头一眼看家底")
    .replace(/湿时一泡烂泥，干时锄头弹回来。?/g, "湿时一泡烂泥，干时锄不进去。")
    .replace(/锄头弹回来/g, "锄不进去")
    .replace(/你先对上这一幕[。.]?/g, "")
    .replace(/^\s*\d+\s*[）).、]\s*/g, "")
    .replace(/^1）1\s*/g, "")
    .replace(/。。+/g, "。")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function stripEn(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/copy the next county[’']s lime recipe/gi, "copy a neighbour’s lime rate")
    .replace(/salt[’']s (calling card|business card)/gi, "a salt clue")
    .replace(/Salt is the calling card\.?/g, "A white crust is a salt clue, not proof by itself.")
    .replace(/aluminium biting/gi, "aluminium toxicity")
    .replace(/the hoe bounces/gi, "the hoe will not bite")
    .replace(/the meat is gone/gi, "organic matter is thin")
    .replace(/Treat the white film as salt’s calling card\.?/gi, "A white crust is a salt clue, not proof by itself.")
    .trim();
}

function walk(x, fn) {
  if (typeof x === "string") return fn(x);
  if (Array.isArray(x)) return x.map((v) => walk(v, fn));
  if (x && typeof x === "object") {
    const o = {};
    for (const [k, v] of Object.entries(x)) o[k] = walk(v, fn);
    return o;
  }
  return x;
}

const zh = {
  "suan-hua": {
    title: "土壤酸化：苗发僵，根尖褐秃",
    subtitle: "pH 是尺子，不是病名。粮田低于约 5.5 才谈改酸。",
    summary: "秧苗发僵、邻垄还绿时，先洗手洗根。根尖褐秃、少白尖，再测耕作层 pH。低于约 5.5 才谈农用石灰。",
    card: "发僵先看根尖，再测 pH。粮田低于约 5.5 才改。",
    appearance: "秧苗发僵、新根少。拔一棵，洗手洗根，先认根尖再谈肥。根尖褐秃、少白尖，才像铝毒伤根。浇水冒锈水是加分项，不是每一块酸地都冒。邻垄绿、这块僵，把两处的根摆一起看。茶树耐酸，粮田不是越酸越好。",
    conditions: "多雨红黄壤、连年铵态氮、有机质薄。春雨一场接一场更爱往酸里走。",
    commonCrops: "水稻、花生、玉米、蔬菜、柑橘。茶叶耐酸但另篇讲。",
    plainExplain: "土太酸，钙镁磷抓不住，铝离子溶出来伤根尖。不是肥不够，是根吃不进去。",
    natural: ["雨水把钙镁淋走，红黄壤盐基本来就少。", "母质含铝，酸了以后铝溶出来伤根尖。"],
    human: ["年年只撒铵态氮，从不看这块地酸不酸。", "根已经褐秃了还当缺肥猛追。"],
    steps: [
      "拔一棵，洗手洗根，先认根尖再谈肥。",
      "测 0～20 厘米 pH，低于 5.5 才改。农用石灰常见每亩 50–150 公斤，分两次，沙土按下限；与尿素不同日，不用建筑石灰。",
      "茶园别按粮田改到中性。看新白根再薄肥。",
    ],
    dontDo: ["茶园不要按粮田改到中性。", "根秃时不要猛尿素。", "不要照搬别人的石灰用量，先测这块地。"],
    fieldCheck: "拔一棵洗手洗根。根尖褐秃、少白尖，邻垄对照，再测 0～20 厘米 pH。",
    whenToTest: "耕作层多点混合装一袋。邻垄对照更清楚。改完隔一季再测 pH。",
    prevention: ["铵态氮不要连年当唯一氮源。", "腐熟有机肥垫底，土才有缓冲。", "改完隔一季再测 pH，不要连年加码。"],
    confuse: [
      { lookalike: "缺氮黄叶", difference: "缺氮是下部老叶匀黄、新叶还绿；酸化是根先伤、整株发僵。", photoHint: "拔苗对照根尖：褐秃还是白而多。" },
      { lookalike: "冷害发僵", difference: "低温回暖会缓；酸化回暖也不长。", photoHint: "回暖一周仍僵，就把 pH 试纸带下地。" },
    ],
    indicators: [
      { name: "pH（0～20 厘米）", meaning: "要不要改酸的门槛", typical: "多数作物低于 5.5 才优先；茶叶另算" },
      { name: "根尖颜色", meaning: "铝是不是已经伤根", typical: "白而多为正常，褐秃要测酸" },
    ],
    photos: [
      { alt: "酸化地发僵发黄的麦苗", caption: "邻垄还绿、这块发僵时最清楚。请以自家地为准。" },
      { alt: "酸化伤根根尖发褐", caption: "洗手洗根看尖：褐秃、少白尖。" },
    ],
  },
  "yan-jian": {
    title: "盐碱地：土面发白，出苗不齐",
    subtitle: "白霜是盐分线索，不是确诊。没沟不要大水漫灌。",
    summary: "土面有白粉或硬壳、叶缘像烫过、小水浇完更蔫，先把盐害和碱化分开。咸看电导，涩看 pH 和钠。",
    card: "土面发白加浇后更蔫，先测电导。没沟不要漫灌。",
    appearance: "蹲下去看土面：薄薄一层白粉，还是结成硬壳。出苗一块有一块没有，叶边像开水烫过。小水浇完更蔫，不要当成旱了猛灌。咸看电导，涩看酸碱和钠，两码事。井水要是也咸，先问沟通不通。",
    conditions: "干旱蒸发大、地下水咸、大水漫灌后又晒干。春季返盐最清楚。",
    commonCrops: "棉花、小麦、玉米。有淡水可用水稻压盐。",
    plainExplain: "根靠浓度差喝水，土太咸水被抢走。白霜是盐分线索，滑腻硬盖才更像钠。",
    natural: ["雨水少，盐淋不下去。", "地下水咸，盐被抽到地表。"],
    human: ["见白霜就当缺钾补一把。", "没沟还大水漫灌，盐抬得更高。"],
    steps: ["先停高盐肥。有排水再洗，覆盖断返盐。", "测电导、pH、全盐，分清是咸还是涩。", "没沟别大水漫灌。见白霜别一律撒石膏。"],
    dontDo: ["没沟不要大水漫灌。", "见白霜不要一律撒石膏。", "盐斑上不要再撒一把高盐肥。"],
    fieldCheck: "看土面白粉还是硬壳，浇一小水是缓还是更蔫。咸和涩分开记。",
    whenToTest: "白霜厚处和出苗齐处各取一袋对照。春季返盐、叶缘焦时测 EC、pH 和钠。",
    prevention: ["有沟才洗，覆盖能断返盐。", "肥要淡，盐斑上停高盐肥。"],
    confuse: [
      { lookalike: "干旱萎蔫", difference: "旱了浇水能缓；咸了浇小水有时更蔫。白霜是盐的记号。", photoHint: "对照土面白霜和浇水后是缓还是更蔫。" },
      { lookalike: "缺钾焦边", difference: "缺钾土面不一定白；盐害常伴出苗差和白霜。", photoHint: "先拍土面，再拍叶缘，两张放一起看。" },
    ],
    indicators: [
      { name: "EC / 全盐", meaning: "咸不咸", typical: "苗期更敏感，白霜地常偏高" },
      { name: "土面白霜", meaning: "盐爬到地表的线索", typical: "春季返盐最明显" },
    ],
    photos: [
      { alt: "盐碱地土面白霜", caption: "白霜是线索，还要看电导和钠。" },
      { alt: "盐害叶缘焦枯", caption: "叶缘焦要和土面一起看，不要单独当缺钾。" },
    ],
  },
  "ban-jie": {
    title: "土壤板结：根横着走，水进不去",
    subtitle: "雨后结壳和犁底层是两层盖，别当成一件事。",
    summary: "苗戴帽出土、根到硬盖就横走、车辙里不出苗。适墒再松，湿着松是抹一层新泥。",
    card: "根横走、雨后积水，先找硬盖。湿土不要进车。",
    appearance: "拿锄试一下：雨后一包浆、晴天像砖。苗戴帽出土，根横着走。刨一个坑看二十厘米下面有没有发亮的硬盖。车辙里常常不出苗。湿土脚印能印很深，泥里别进车。",
    conditions: "连年浅旋、湿土进车、有机质薄。雨后第二天最能看出来。",
    commonCrops: "小麦、玉米、水稻、蔬菜，黏土地更重。",
    plainExplain: "旋耕只剪头发，下面压出犁底层。有机质是胶水，胶没了就板。",
    natural: ["黏土干了收缩，雨点砸实表土。", "犁底层把水托住，根过不去。"],
    human: ["湿着开旋耕机，把路越压越死。", "年年浅旋，硬盖越旋越亮。"],
    steps: [
      "适墒隔年深松，刚过硬盖就停，大约 25～40 厘米，配腐熟有机肥覆盖。",
      "泥里别进车，也别把旋一遍当成深松。",
      "先别年年把生土翻上来。",
    ],
    dontDo: ["泥里不要进车。", "不要年年把生土翻上来。"],
    fieldCheck: "雨后积水、干后结壳、二十厘米下有没有发亮硬盖，三样分开看。",
    whenToTest: "刨到硬盖那一层，上下分开装，别混在一袋。",
    prevention: ["湿土不要进车、不要旋。", "适墒隔年深松，刚过硬盖就停。", "有机质把团粒养回来，光旋不够。"],
    confuse: [
      { lookalike: "干旱", difference: "旱是没水；板结是有水也进不去。浇下去成径流。", photoHint: "雨后是否积水、干后是否结壳，对照邻地松土。" },
      { lookalike: "犁底层", difference: "整层硬是板结，下面一条发亮硬盖才是犁底层。", photoHint: "刨到 20 厘米以下，看有没有发亮硬盖。" },
    ],
    indicators: [
      { name: "容重", meaning: "土紧不紧", typical: "耕层过大说明板了" },
      { name: "雨后积水时间", meaning: "水进不进得去", typical: "邻地已渗、自家还汪着" },
    ],
    photos: [
      { alt: "板结硬土块，锄不进去", caption: "干时像砖，先认表层帽子。" },
      { alt: "板结土柱紧实无孔隙", caption: "刨开看有没有发亮的犁底层。" },
    ],
  },
  "you-ji-zhi": {
    title: "有机质下降：土色发浅，肥留不住",
    subtitle: "有机质是缓冲，不是一袋菌能当季补回的家底。",
    summary: "土色浅、搓一把就散、肥效一场雨就飘，常见是有机质薄了。连续还田和腐熟粪比一季猛堆靠谱。",
    card: "土色浅、一把就散，先测有机质。一袋菌补不回三年还田。",
    appearance: "搓一把：浅、粉、团不住。肥下去一场雨又像没施。颜色浅了常常家底薄，一袋菌一季补不回掉的那层。冬春裸地掉得最快。邻垄能搓团、这块散，并排放。",
    conditions: "秸秆拿走、连年裸冬、只靠化肥。沙土更显。",
    commonCrops: "粮田、菜地、果园都见。沙土漏得更明显。",
    plainExplain: "有机质是土的肉和缓冲。薄了，肥留不住，菌也没房住。",
    natural: ["沙土本来就薄。", "暖湿地方分解快，还田跟不上也掉。"],
    human: ["秸秆全拿走，指望化肥把家底补回来。", "一袋菌当一季翻身药。"],
    steps: [
      "连续三年还田加腐熟粪，比一季堆满靠谱；覆盖少裸冬。",
      "先别指望一袋菌一季翻身。生粪埋根边会烧苗。",
      "测有机质心里有个数，氮再加也补不回变薄的那层。",
    ],
    dontDo: ["不要指望一袋菌一季翻身。", "生粪埋根边会烧苗。"],
    fieldCheck: "搓一把：浅、粉、团不住。和邻垄深色土并排看。",
    whenToTest: "浅色散土和邻垄深土各取一袋并排看。",
    prevention: ["秸秆能还就还，少裸冬。", "腐熟粪少量多次。"],
    confuse: [
      { lookalike: "当季缺肥", difference: "缺肥补了当季能绿；家底薄是年年补年年飘。", photoHint: "对照十年前土色和现在，浅了就是有机质薄了。" },
      { lookalike: "板结", difference: "板结是硬；家底薄是没肉，可以又硬又浅。", photoHint: "搓土：散沙子还是死坷垃，再看颜色深浅。" },
    ],
    indicators: [
      { name: "有机质", meaning: "家底厚薄", typical: "按当地分级读，不要跨省死套" },
      { name: "土色", meaning: "地头一眼看家底", typical: "越种越浅要警惕" },
    ],
    photos: [
      { alt: "有机质低的浅色瘦土", caption: "浅色散土，一把就散。" },
      { alt: "有机质高的团粒土（健康对照）", caption: "能搓团的对照，不是同一块地的处方。" },
    ],
  },
  "que-dan": {
    title: "缺氮：下部老叶先匀黄",
    subtitle: "氮会搬家，所以黄的是老叶，新叶还绿。",
    summary: "底下老叶匀黄、顶上还绿、根洗出来是白的，才像缺氮。新叶也黄，先想缺硫或缺铁。根黑臭时不要猛尿素。",
    card: "老叶匀黄、新叶还绿、根还白，才像缺氮。根臭先别追氮。",
    appearance: "底下老叶匀黄，顶上新叶还绿，洗出来的根是白的，才像缺氮。新叶也黄要想缺硫或缺铁。根黑臭时不要猛尿素。",
    conditions: "氮会搬家，老叶把氮送给新叶。沙土一次倒全年留不住。",
    commonCrops: "玉米、小麦、水稻、叶菜。",
    plainExplain: "氮会搬家，老叶把氮送给新叶。沙土一次倒全年留不住。",
    natural: ["氮会搬家，老叶把氮送给新叶。", "沙土一次倒全年留不住。"],
    human: ["新叶也黄了还按缺氮追。", "根已经黑臭了还倒氮。"],
    steps: [
      "分叶位：底下老叶匀黄，顶上新叶还绿，根洗出来是白的，才像缺氮。",
      "根不坏才少量多次。叶面按说明救急，沙土分顿。玉米拔节或叶菜旺长期，尿素每亩常见 5～15 公斤量级分次。",
      "根黑臭时别猛尿素。新叶也黄要想缺硫或缺铁。",
    ],
    dontDo: ["根黑臭时不要猛尿素。", "新叶也黄要想缺硫或缺铁。"],
    fieldCheck: "下部老叶匀黄、新叶还绿，植株瘦、分蘖少。根白才像缺氮。",
    whenToTest: "下部黄叶和顶端新叶一起记下，再取耕作层。",
    prevention: ["根白才少量多次追氮。", "沙土不要一次倒全年。", "新叶也黄先把叶位分清。"],
    confuse: [
      { lookalike: "缺铁", difference: "缺铁黄新叶、叶脉绿；缺氮黄老叶、整叶较匀。", photoHint: "先拍下部老叶，再拍心叶，叶位对上才开口。" },
      { lookalike: "涝害黄叶", difference: "涝害白天蔫、根发黑发臭；缺氮根还白。", photoHint: "拔根闻一闻：臭了先排水，别追氮。" },
    ],
    indicators: [
      { name: "碱解氮", meaning: "当季能用的氮", typical: "过低需追，过高易旺长倒伏" },
      { name: "叶位", meaning: "氮会搬家", typical: "老叶先黄才像" },
    ],
    photos: [
      { alt: "下部老叶均匀发黄、新叶相对还绿", caption: "叶位对上才开口。" },
      { alt: "缺氮植株瘦高不壮", caption: "还要看根是不是白的。" },
    ],
  },
  "que-jia": {
    title: "缺钾：老叶边缘先焦",
    subtitle: "焦边先看土面有没有白霜，再谈钾。",
    summary: "老叶缘焦、往里卷、茎软果不甜，土面不一定白。白霜加焦边先分盐害。忌氯作物不用氯化钾。",
    card: "老叶焦边先看土面。有白霜走盐，没霜再问钾。",
    appearance: "老叶叶缘先焦，像火燎过往里卷，茎软果不甜。土面不一定白。土面白霜加焦边，先分盐害和缺钾。",
    conditions: "钾管气孔和糖分。缺了叶边先焦。盐害也焦边，但常有白霜和出苗差。",
    commonCrops: "水稻、玉米、蔬菜、果树、马铃薯。",
    plainExplain: "钾管气孔和糖分。缺了叶边先焦。盐害也焦边，但常有白霜和出苗差。",
    natural: ["钾随秸秆走，还田少的地更容易显。", "高产田钾库更容易空。"],
    human: ["焦边不看土面，盐害当缺钾。", "忌氯作物还用含氯钾肥。"],
    steps: [
      "看老叶外边焦、往里卷，土面有没有白霜。",
      "测速效钾。确认缺钾、无白霜后，粮食作物每亩常见 5～15 公斤量级；叶面磷酸二氢钾常见 0.2%～0.3% 量级，先小面积。秸秆能还就还。",
      "忌氯作物别用氯化钾。中午不要喷浓钾。",
    ],
    dontDo: ["忌氯作物不要用氯化钾。", "中午不要喷浓钾。", "见焦边不要一律当缺钾。"],
    fieldCheck: "老叶叶缘焦枯往里卷，茎软果不甜。土面不一定白。",
    whenToTest: "焦边叶子和土面有没有白霜，分开放进记录。",
    prevention: ["焦边先看土面白不白。", "秸秆还田能还钾。", "忌氯作物换硫酸钾那一路。"],
    confuse: [
      { lookalike: "盐害焦边", difference: "盐害常有白霜、出苗差；缺钾土面不一定白。", photoHint: "先拍土面有霜没霜，再拍老叶缘。" },
      { lookalike: "氯害", difference: "刚施氯化钾还焦，更像氯或盐；缺钾是慢慢来的。", photoHint: "翻包装袋成分，问这茬用过含氯肥没有。" },
    ],
    indicators: [
      { name: "速效钾", meaning: "当季钾库", typical: "沙土、高产田易低" },
      { name: "老叶缘", meaning: "钾搬家的记号", typical: "焦、卷、火燎状" },
    ],
    photos: [
      { alt: "老叶叶缘焦枯像火燎", caption: "先拍土面，再拍叶缘。" },
      { alt: "缺钾叶缘焦从外向内", caption: "没有白霜，才更像钾。" },
    ],
  },
  "que-tie": {
    title: "缺铁：新叶黄、叶脉还绿",
    subtitle: "铁不搬家，所以黄的是新叶。土偏碱时铁常常被锁住。",
    summary: "新叶黄、叶脉还绿，老叶相对还绿。缺氮是老叶先黄，路不一样。高 pH 土不要把硫酸亚铁当当季解决。",
    card: "新叶黄、脉还绿，先想铁被锁住，不要只冲氮。",
    appearance: "分清黄的是新叶还是老叶。新叶黄、叶脉还绿，顶端更明显。老叶相对还绿。",
    conditions: "高 pH 把铁锁住。土里有铁，根吃不到。缺氮是老叶先黄，路不一样。",
    commonCrops: "柑橘、葡萄、花生、大豆、花卉、桃。",
    plainExplain: "高 pH 把铁锁住。土里有铁，根吃不到。缺氮是老叶先黄，路不一样。",
    natural: ["石灰性土、灌大水后更容易锁铁。", "pH 大于约 7.5 就容易锁；大于 8 更明显。"],
    human: ["新叶黄脉绿还当缺氮冲。", "高碱土里猛撒亚铁，当季吃不进。"],
    steps: [
      "掐顶端那片新叶：肉黄、脉还绿，底下老叶还好，这就不像缺氮。",
      "叶面螯合铁按说明重复救急。根际靠有机肥和稳定水分，不要大水漫灌。",
      "高 pH 土别猛撒硫酸亚铁当当季解决。",
    ],
    dontDo: ["高 pH 土不要猛撒硫酸亚铁当当季解决。", "不要一黄就冲尿素。"],
    fieldCheck: "新叶黄、叶脉还绿，顶端更明显。老叶相对还绿。",
    whenToTest: "掐顶端新叶，土样取根区，别取行间人踩的地方。",
    prevention: ["新叶黄脉绿先想铁，别冲氮。", "高 pH 当季亚铁常常吃不进。", "叶面螯合铁只救急。"],
    confuse: [
      { lookalike: "缺氮", difference: "缺氮黄老叶；缺铁黄新叶、叶脉绿。", photoHint: "心叶和底部老叶放一起拍，叶位对上才开口。" },
      { lookalike: "缺锰", difference: "缺锰常带褐斑；缺铁更干净的脉间黄。", photoHint: "看新叶有没有褐斑点，有斑先想锰。" },
    ],
    indicators: [
      { name: "pH", meaning: "铁锁不锁", typical: "大于 7.5 很容易锁；大于 8 更明显" },
      { name: "新叶脉间", meaning: "铁不搬家的记号", typical: "黄叶绿脉" },
    ],
    photos: [
      { alt: "新叶黄、叶脉还绿", caption: "对着光看脉，老叶也入一张。" },
      { alt: "果树缺铁黄化新梢", caption: "新梢刚抽那几天最清楚。" },
    ],
  },
  "lao-hai": {
    title: "积水涝害：土湿还蔫，根在憋气",
    subtitle: "白天蔫、晚上缓，先排水，不是旱。",
    summary: "白天蔫晚上缓，田里有明水或底湿，根黑臭。土是湿的还蔫，不是缺水。先排水，新根没出来以前不要追氮。",
    card: "土湿还蔫、根有味，先排水。不要当旱浇。",
    appearance: "白天蔫晚上缓，田里有明水或底湿，根黑臭。土是湿的还蔫。",
    conditions: "根要氧气。水把气排走，根就闷死。湿土再浇是火上浇油。",
    commonCrops: "玉米、棉花、大豆、蔬菜最怕；水稻也怕长期深涝。",
    plainExplain: "根要氧气。水把气排走，根就闷死。湿土再浇是火上浇油。",
    natural: ["低洼、犁底层托水，雨后最爱涝。", "黏土渗得慢，更容易闷根。"],
    human: ["土湿还蔫，当旱了猛灌。", "新根没出来就追氮。"],
    steps: [
      "看土是湿的还蔫，白天耷拉晚上又能起来，根有点味——这是根在憋气，不是旱，更不是缺氮。",
      "先排水。等新根出来再叶面薄肥。破犁底层托水。低洼先挖沟。",
      "土湿别当旱浇。",
    ],
    dontDo: ["土湿不要当旱浇。", "涝后不要立刻猛氮。"],
    fieldCheck: "白天蔫晚上缓，田里有明水或底湿，根黑臭。土是湿的还蔫。",
    whenToTest: "积水处和排水口附近分开取，根也洗一棵。",
    prevention: ["先排水，让根喘气。", "新根没出来以前不要追氮。", "沟要挖通，犁底层会托水。"],
    confuse: [
      { lookalike: "缺水萎蔫", difference: "缺水土干；涝害土湿还蔫。", photoHint: "用手抓土，湿还是干。" },
      { lookalike: "缺氮黄叶", difference: "缺氮老叶匀黄、根还白；涝害根黑臭。", photoHint: "必须看根。" },
    ],
    indicators: [
      { name: "田间水分", meaning: "土湿还是土干", typical: "湿还蔫就不是旱" },
      { name: "根色气味", meaning: "根还活不活", typical: "黑臭先排水" },
    ],
    photos: [
      { alt: "田间积水、苗发黄萎蔫", caption: "中午土湿还耷拉，那张最有用。" },
      { alt: "涝害根发黑", caption: "闻一闻根，有味就先排水。" },
    ],
  },
  "shao-gen": {
    title: "施肥烧根：种沟成行，肥粒贴根",
    subtitle: "烧了先停肥灌清水，不要当缺肥再倒一把。",
    summary: "施肥几天内叶焦根黑，种沟能见肥粒，伤的成行。立刻灌清水稀释，暂时停肥。补种要离开原来的肥窝。",
    card: "种沟成行、能见肥粒，是烧根。先停肥灌清水。",
    appearance: "施肥几天内叶焦根黑，种沟能见肥粒。沿肥带成行。",
    conditions: "肥把根周围做成盐水。沙土、种肥贴种子、一次过浓最伤。",
    commonCrops: "蔬菜育苗、玉米穴施、果树穴施最常见。",
    plainExplain: "肥把根周围做成盐水。沙土、种肥贴种子、一次过浓最伤。",
    natural: ["沙土缓冲差，同样用量更伤。", "苗期阈值更低。"],
    human: ["烧了还按缺肥再倒第二把。", "种肥和种子拌在一个窝。"],
    steps: [
      "顺着种沟看：伤的成行，沟里还能见到肥粒，根尖发黑，这是烧根。",
      "立刻灌清水稀释，暂时停肥。补种要隔离肥带。种肥和种子隔开，侧深施数厘米以上。",
      "烧了还补肥会更烧。沙土不要按黏土用量。",
    ],
    dontDo: ["烧了还补肥会更烧。", "沙土不要按黏土用量。"],
    fieldCheck: "施肥几天内叶焦根黑，种沟能见肥粒。沿肥带成行。",
    whenToTest: "顺着种沟取，沟里肥粒带和沟外分开。",
    prevention: ["种肥离开种子。", "烧了先停肥，灌清水稀释。", "补种离开原来的肥窝。"],
    confuse: [
      { lookalike: "干旱", difference: "旱了浇水能缓；烧根浇小水有时更蔫。", photoHint: "看种沟有没有肥粒。" },
      { lookalike: "病害根腐", difference: "根腐常点片死棵、有病斑；烧根沿施肥沟整齐发生。", photoHint: "问刚施了什么、施在哪。" },
    ],
    indicators: [
      { name: "种沟肥粒", meaning: "是不是烧根", typical: "成行、贴根最像" },
      { name: "根尖颜色", meaning: "已经伤到哪", typical: "褐黑先停肥" },
    ],
    photos: [
      { alt: "施肥沟里苗烧、根尖发黑", caption: "顺着种沟拍成行的伤。" },
      { alt: "烧根根尖褐黑", caption: "扒开土看还有没有肥粒。" },
    ],
  },
  "ce-tu-bao-gao": {
    title: "如何看懂测土化验单",
    subtitle: "pH 是尺子，不是病名。报告不是处方。",
    summary: "先读 pH、有机质、盐分，再读氮磷钾。单位看错一位会下错肥。粮田舒适区大约 6.0–7.5，茶园大约 4.5–6.0。",
    card: "先圈 pH、有机质、盐分。报告是尺子，不是处方。",
    appearance: "单子拿回来先对地块名和取样日期。阅读顺序：pH → 有机质 → 盐分 → 氮磷钾 → 微量元素。单位后面那一位看错，肥会下反。报告是尺子不是处方。带去农技站比自己硬套邻省表稳。",
    conditions: "刚拿到化验单、准备配肥或改土之前。",
    commonCrops: "所有作物。这篇农业知识不讲某一种庄稼的处方，讲怎么读。",
    plainExplain: "缺一项不等于按最大量补。分级按当地，跨省死套会错。",
    natural: ["不同实验室水土比不一样，数字不能硬比。"],
    human: ["单子没读完就按最大量全补。", "单位看错一位还往下配肥。"],
    steps: [
      "先圈极端项：过酸过碱、盐太高、肉太薄，这几项先改。",
      "氮磷钾按当地分级，缺什么加什么，已经过高的先停。",
      "看不懂带去农技站。别报告写缺就按最大量补。",
    ],
    dontDo: ["不要报告写缺就按最大量补。", "不要单位看错。", "不要把邻省标准当自家的。"],
    fieldCheck: "单子上的地块名对得上你站的这块，再谈数字。",
    whenToTest: "单子上的地块名对得上你站的这块，再谈数字。",
    prevention: ["先读 pH、有机质、盐分。", "带单子去农技站按当地分级。"],
    confuse: [
      { lookalike: "缺素症照片", difference: "照片只能怀疑，化验单才能大致定量。叶子黄有十种原因。", photoHint: "把报告和田间照片放一起看。" },
      { lookalike: "邻居的经验用量", difference: "邻地土不一样。沙土和黏土、酸和碱，用量能差一倍。", photoHint: "先对上自己地的 pH 和质地。" },
    ],
    indicators: [
      { name: "pH", meaning: "酸碱", typical: "多数 6.0～7.5，茶叶例外" },
      { name: "EC / 全盐", meaning: "咸度", typical: "苗期更敏感，大棚常偏高" },
      { name: "有机质", meaning: "家底", typical: "按当地分级读，不要跨省死套" },
      { name: "碱解氮", meaning: "当季氮库", typical: "过高旺长，过低脱肥" },
      { name: "有效磷", meaning: "能用的磷", typical: "受 pH 影响大" },
      { name: "速效钾", meaning: "当季钾", typical: "沙土、高产田易低" },
      { name: "CEC", meaning: "保肥能力", typical: "沙土低，要少量多次" },
      { name: "有效铁锌硼", meaning: "微量元素", typical: "高 pH 时常“有但吃不到”" },
    ],
    photos: [
      { alt: "测土化验单 pH 有机质 EC", caption: "先圈这三格，再往下读。" },
      { alt: "化验单养分表", caption: "单位看错一位会下反。" },
    ],
  },
};

const enMeta = {
  "suan-hua": {
    title: "Acid soil: seedlings stall, root tips go brown",
    subtitle: "pH is a ruler, not a disease name. Lime grain land only below about 5.5.",
    summary: "When seedlings stall and the next ridge stays green, wash the roots first. Brown, bald tips mean test plough-layer pH. Lime only if it is below about 5.5.",
    card: "Stunted seedlings: check the root tips, then pH. Grain land only amends below about 5.5.",
  },
  "yan-jian": {
    title: "Saline–alkali land: white crust, patchy emergence",
    subtitle: "A white crust is a salt clue, not proof by itself. Don’t flood without a drain.",
    summary: "White powder or a hard crust, scalded leaf edges, worse wilt after a light watering — sort salt from alkali before you fertilise. Salt is EC; alkali is pH and sodium.",
    card: "White crust plus worse wilt after watering: read EC first. No drain, no flood.",
  },
  "ban-jie": {
    title: "Hard-packed soil: roots run sideways, water sits",
    subtitle: "A rain cap and a plough pan are two lids. Don’t treat them as one job.",
    summary: "Seedlings wear a cap, roots hit a hard floor and turn, wheel ruts stay bare. Loosen when the soil is dry enough to crack; wet loosening smears a new lid.",
    card: "Roots turning sideways and water ponding: find the pan. Keep wheels off wet soil.",
  },
  "you-ji-zhi": {
    title: "Low organic matter: pale soil that will not hold fertiliser",
    subtitle: "Organic matter is the buffer. One microbe bag will not rebuild it in a season.",
    summary: "Pale, dusty soil that will not clump, and fertiliser that vanishes after rain, usually means thin organic matter. Residue return for three years beats one dump.",
    card: "Pale dusty soil that will not clump: test organic matter. A microbe bag is not a three-year return.",
  },
  "que-dan": {
    title: "Nitrogen shortage: old leaves yellow first",
    subtitle: "Nitrogen moves. So the old leaves yellow and the new ones stay green.",
    summary: "Uniform yellow on the lower old leaves, green at the top, white roots — that looks like nitrogen. If new leaves yellow too, think sulphur or iron. Don’t pour urea on black, smelly roots.",
    card: "Old leaves yellow, new leaves green, roots still white. Smelly roots: drain first.",
  },
  "que-jia": {
    title: "Potassium shortage: old leaf margins scorch first",
    subtitle: "Scorched edges: check the surface for a white crust before you talk potassium.",
    summary: "Old margins scorch and roll in; stems go soft; fruit is bland. The surface is not always white. White crust plus scorch is salt until proven otherwise. Chloride-sensitive crops do not get potassium chloride.",
    card: "Scorched old margins: photograph the soil surface first. Crust means salt, not potassium.",
  },
  "que-tie": {
    title: "Iron shortage: new leaves yellow, veins still green",
    subtitle: "Iron does not move, so the new leaves yellow. High pH often locks it.",
    summary: "New leaves yellow with green veins; old leaves stay greener. Nitrogen yellows old leaves first — a different road. Don’t broadcast ferrous sulphate on high-pH land as a season fix.",
    card: "New leaves yellow, veins green: think iron lock, not a nitrogen dump.",
  },
  "lao-hai": {
    title: "Waterlogging: wet soil, wilted plants, roots out of air",
    subtitle: "Wilt by day, recover at night. Drain first. This is not drought.",
    summary: "Wilt by day, recover at night, standing water or a wet bottom, roots black and smelling. Wet soil and still wilted is not a water shortage. Drain first. Don’t pour nitrogen before new roots appear.",
    card: "Wet soil and still wilted, roots smelling: drain. Do not irrigate as if it were drought.",
  },
  "shao-gen": {
    title: "Fertiliser burn: a stripe down the seed furrow",
    subtitle: "Pause fertiliser and flush with water. Do not add another bag.",
    summary: "Leaf scorch and black root tips within days of a dressing; granules visible in the furrow, injury in a stripe. Flush with clean water and stop feeding. Re-sow away from the old band.",
    card: "Injury in a stripe, granules in the furrow: burn. Flush, don’t add another bag.",
  },
  "ce-tu-bao-gao": {
    title: "How to read a soil-test sheet",
    subtitle: "pH is a ruler, not a disease name. The sheet is not a prescription.",
    summary: "Read pH, organic matter and salt first, then NPK. A missed decimal poisons the rate. Grain and vegetables sit around 6.0–7.5; tea stays around 4.5–6.0.",
    card: "Circle pH, organic matter and salt first. The sheet is a ruler, not a recipe.",
  },
};

const enBody = {
  "suan-hua": {
    appearance: "Seedlings stall and put out few new roots. Pull one plant, wash the roots, and read the tips before you talk fertiliser. Brown, bald tips with few white points look like aluminium toxicity. Rusty irrigation water is extra evidence, not required. Lay a stalled plant next to a green neighbour. Tea tolerates acid; grain land is not better the more acid it gets.",
    conditions: "Wet red-yellow soils, years of ammonium nitrogen, thin organic matter. Spring rain after rain pushes pH down.",
    commonCrops: "Rice, peanut, maize, vegetables, citrus. Tea is acid-tolerant; that is a different guide.",
    plainExplain: "When soil is too acid, calcium, magnesium and phosphorus will not hold, and aluminium dissolves onto the root tip. It is not a shortage of fertiliser. The root cannot take it up.",
    natural: ["Rain leaches calcium and magnesium. Red-yellow soils start low in bases.", "Parent material holds aluminium that dissolves once the soil turns acid."],
    human: ["Ammonium nitrogen year after year, never a pH reading on this field.", "Bald roots still chased with more fertiliser."],
    steps: [
      "Pull one plant, wash the roots, read the tips before you talk fertiliser.",
      "Test 0–20 cm pH. Lime only below about 5.5. Agricultural lime is commonly 50–150 kg/mu (about 750–2250 kg/ha), split in two; sandy soils take the low end. Not the same day as urea. No builder’s lime.",
      "Don’t push a tea garden to neutral the way you would grain land. Wait for new white roots, then a thin feed.",
    ],
    dontDo: [
      "Don’t take a tea garden to neutrality as if it were grain land.",
      "Don’t pour urea on bald roots.",
      "Don’t copy a neighbour’s lime rate. Test this field first.",
    ],
    fieldCheck: "Pull one plant and wash the roots. Brown, bald tips versus a green neighbour, then test 0–20 cm pH.",
    whenToTest: "Mix several points from the plough layer. A neighbour ridge is a useful pair. Retest pH the season after you amend.",
    prevention: ["Don’t let ammonium nitrogen be the only nitrogen source every year.", "Rotted organic matter buffers the soil.", "Retest pH the next season. Don’t stack lime year after year."],
    summary: enMeta["suan-hua"].summary,
    confuse: [
      { lookalike: "Nitrogen yellowing", difference: "Nitrogen yellows the lower old leaves while new leaves stay green. Acid injury hits the root first and the whole plant stalls.", photoHint: "Wash two root systems: bald-brown versus white and many." },
      { lookalike: "Cold stall", difference: "Cold recovers when it warms. Acid stall does not.", photoHint: "Still stalled a week after the warm-up: take pH paper to the field." },
    ],
    dosage: [
      { name: "Whether to amend", range: "Most crops: only amend when pH is below about 5.5; 5.5–6.0, watch first", note: "Bag weights live in the lime-rate guide. This page does not print a bag count." },
    ],
    photos: [
      { alt: "Stunted yellow wheat on acid soil", caption: "Clearest when the next ridge is still green. Trust your own field." },
      { alt: "Brown acid-injured root tips", caption: "Wash the roots and read the tips." },
    ],
    indicators: [
      { name: "pH (0–20 cm)", meaning: "The gate for lime", typical: "Most crops: only below about 5.5; tea is a different window" },
      { name: "Root-tip colour", meaning: "Whether aluminium has already injured the tip", typical: "White and many is normal; brown and bald: test pH" },
    ],
    mechanism: "When pH is very low, aluminium ions leave the mineral and injure root tips. Once the tip is bald, water and nutrients cannot enter, so the top looks like a fertiliser shortage. Years of ammonium nitrogen and rain leaching bases push pH down. Tea tolerates acid; grain land is not better the more acid it gets.",
    example: "The same grain field at pH 5.2 can talk agricultural lime, sandy soil at the low end, split in two. A tea garden at the same 5.2 often still sits in the 4.5–6.0 window. Do not copy the grain recipe onto tea.",
    doseTable: [
      { crop: "Grain (rice, maize, peanut)", texture: "Sandy", rate: "Agricultural lime about 50 kg/mu (about 750 kg/ha), split in two", note: "Amend only if pH < 5.5; not the same day as urea" },
      { crop: "Grain", texture: "Clay", rate: "Agricultural lime up to about 150 kg/mu (about 2250 kg/ha), split in two", note: "Retest next season; stop once the target is reached" },
      { crop: "Tea", texture: "Any", rate: "Do not push tea to neutral", note: "Tea window is about pH 4.5–6.0" },
      { crop: "Protected vegetables", texture: "Any", rate: "Use the low end of the grain range", note: "Test first. No builder’s lime." },
    ],
    labTable: [
      { id: "ph", name: "pH", low: "< about 5.5, tips brown easily", mid: "6.0–7.5 grain and vegetables are comfortable", high: "> 8 iron often locks", note: "Local classes apply; this row is a sketch" },
      { id: "al", name: "Exchangeable Al", low: "Little injury", mid: "Becoming active", high: "Root tips brown and bald", note: "It comes out only when pH is low" },
      { id: "om", name: "Organic matter", low: "Thin buffer, aluminium worse", mid: "Can complex some aluminium", high: "Liming is steadier", note: "Not a same-season switch" },
    ],
    longform: [
      "pH is a ruler, not a disease name. Grain land talks lime only below about 5.5. The 6.0–7.5 band is where grain and vegetables are usually comfortable. Tea stays around 4.5–6.0; do not push tea to neutral.",
      "One mu is one fifteenth of a hectare, so 50–150 kg/mu is about 750–2250 kg/ha. Split the dressing. Sandy soils take the low end. Not the same day as urea. No builder’s lime.",
    ],
  },
};

// Remaining 9 EN bodies (compact, independent)
enBody["yan-jian"] = {
  appearance: "Look at the surface first: a thin white powder, or a hard crust. Seedlings come up in patches. Leaf margins look scalded. A light watering makes them worse — that is not drought. Salt is EC; alkali is pH and sodium — two jobs. If the well is salty too, ask whether the ditch still runs.",
  conditions: "Dry weather, salty groundwater, flood irrigation then a bake. Spring salt-rise is the clearest.",
  commonCrops: "Cotton, wheat, maize. Where fresh water exists, rice can help push salt down.",
  plainExplain: "Roots drink by a gradient. Salt steals the water. A white crust is a salt clue. A slick, sealed surface is more like sodium.",
  natural: ["Little rain, so salt cannot leach.", "Salty groundwater lifts salt to the surface."],
  human: ["A white crust treated as a potassium gap.", "Flooding a field with no drain lifts salt higher."],
  steps: [
    "Stop high-salt fertiliser first. Wash only if you have drainage. Cover the surface to cut the salt rising.",
    "Measure EC, pH and total salt. Separate salty from alkali-sodic.",
    "No ditch, no flood. A white crust is not a reason to throw gypsum on every field.",
  ],
  dontDo: ["Don’t flood a field with no ditch.", "Don’t throw gypsum at every white crust.", "Don’t add another handful of high-salt fertiliser on a salt patch."],
  fieldCheck: "Powder or crust; after a light watering, better or worse. Write salt and alkali as two notes.",
  whenToTest: "One bag from the thick crust, one from a clean emergence patch. In spring, read EC, pH and sodium.",
  prevention: ["Wash only with a drain. Cover cuts the rise.", "Keep fertiliser mild. Stop high-salt bags on the patch."],
  summary: enMeta["yan-jian"].summary,
  confuse: [
    { lookalike: "Drought wilt", difference: "Drought eases after water. Salt often wilts more after a light watering.", photoHint: "Photograph the crust and the plant after that watering." },
    { lookalike: "Potassium scorch", difference: "Potassium does not need a white surface. Salt often pairs crust with patchy emergence.", photoHint: "Surface first, then the margin." },
  ],
  dosage: [{ name: "Sort the problem first", range: "High EC: wash salt. High pH and high sodium: then think gypsum", note: "This page only tells them apart. Washing salt and gypsum each have their own guide." }],
  photos: [
    { alt: "White salt crust on the soil surface", caption: "A clue, not a diagnosis. Read EC and sodium." },
    { alt: "Salt-scorched leaf margins", caption: "Read the surface with the leaf. Don’t treat this as potassium alone." },
  ],
  indicators: [
    { name: "EC / total salt", meaning: "How salty", typical: "Seedlings are more sensitive; crusted patches often read high" },
    { name: "Surface crust", meaning: "Salt that has climbed", typical: "Clearest in spring" },
  ],
  mechanism: "Salt raises the soil-water concentration so the root works harder to drink. High sodium also breaks aggregates, so the soil turns sticky and sealed. Light, frequent watering is an elevator for salt. Salty is EC; alkali is pH and sodium.",
  example: "White crust, scorched margins, worse after a light watering: stop high-salt fertiliser, read EC, pH and total salt. No drain, no flood. Don’t spread gypsum on every white crust.",
  doseTable: [{ crop: "Wheat / maize / cotton", texture: "Any", rate: "Split the job: high EC → wash salt; high pH and high sodium → then gypsum", note: "Rates from the local station. This page does not print bags." }],
  labTable: [
    { id: "ec", name: "EC / total salt", low: "Unlikely the salt story", mid: "Seedlings start to feel it", high: "Patchy emergence, worse after watering", note: "Read the unit" },
    { id: "ph", name: "pH", low: "Acid, not alkali", mid: "Near neutral", high: "Alkali — ask sodium", note: "Salty and alkali are different" },
    { id: "na", name: "Exchangeable sodium", low: "Not sodic", mid: "Read with CEC", high: "Structure fails; then gypsum", note: "A crust does not prove this is high" },
    { id: "esp", name: "ESP", low: "Sodium not occupying many seats", mid: "Structure starting to fail", high: "Sodic", note: "You cannot compute this without CEC" },
  ],
  longform: [
    "A white crust is a salt clue, not proof by itself. Salt is EC. Alkali is pH and sodium.",
    "No drain, no flood. Gypsum is for sodic structure, not for every white film.",
  ],
};

enBody["ban-jie"] = {
  appearance: "Try the hoe: slurry after rain, brick when it dries. Seedlings wear a cap. Roots run sideways. Dig twenty centimetres and look for a shiny pan. Wheel ruts often stay bare. Wet footprints sink deep — keep the tractor off.",
  conditions: "Years of shallow rotavating, traffic on wet soil, thin organic matter. The day after rain shows it.",
  commonCrops: "Wheat, maize, rice, vegetables. Clay is worse.",
  plainExplain: "A rotavator only cuts hair and presses a pan underneath. Organic matter is the glue. Without it, the soil packs.",
  natural: ["Clay shrinks when it dries; raindrops seal the surface.", "A plough pan perches water so roots cannot pass."],
  human: ["Rotavating wet soil packs the path harder.", "Shallow passes every year polish the pan."],
  steps: [
    "Deep-loosen in a year when moisture is right, just through the pan — commonly 25–40 cm — with rotted organic matter on top.",
    "Keep wheels off mud. A rotavator pass is not deep loosening.",
    "Don’t bring raw subsoil up every year.",
  ],
  dontDo: ["Don’t drive on mud.", "Don’t invert raw subsoil every year."],
  fieldCheck: "Ponding after rain, a cap when dry, a shiny pan under twenty centimetres — three different notes.",
  whenToTest: "Sample above and below the pan. Don’t mix them in one bag.",
  prevention: ["No traffic, no rotavator, on wet soil.", "Deep-loosen on the right moisture, just through the pan.", "Organic matter rebuilds crumbs. Iron alone will not."],
  summary: enMeta["ban-jie"].summary,
  confuse: [
    { lookalike: "Drought", difference: "Drought is no water. Compaction is water that cannot enter. It runs off.", photoHint: "Ponding after rain, a crust when dry, versus a neighbour’s open soil." },
    { lookalike: "Plough pan", difference: "The whole layer hard is compaction. A shiny ribbon underneath is the pan.", photoHint: "Dig below 20 cm and look for shine." },
  ],
  dosage: [{ name: "Deep-loosening window", range: "Every other year, right moisture, just through the pan, commonly 25–40 cm", note: "Clay only when it will crumble; follow with organic matter" }],
  photos: [
    { alt: "Hard clods the hoe will not bite", caption: "Brick-dry surface. Start with the cap." },
    { alt: "A tight soil column with no pores", caption: "Look for a shiny plough pan." },
  ],
  indicators: [
    { name: "Bulk density", meaning: "How tight", typical: "Too high in the plough layer means packed" },
    { name: "Time water sits after rain", meaning: "Whether water can enter", typical: "The neighbour has soaked; yours still ponds" },
  ],
  mechanism: "Raindrops, wheels and wet tillage pack particles into the pores. Wet it is slurry; dry it is brick. Roots turn sideways. Seedlings wear a cap. The plough pan is a second lid — don’t treat it as the same job as the surface crust.",
  example: "After rain the surface seals and ruts stay bare: wait until the soil cracks, then loosen. Wet loosening smears a new lid. Deep-loosen every other year, right moisture, just through the pan, about 25–40 cm.",
  doseTable: [{ crop: "Wheat / maize / vegetables", texture: "Clay", rate: "Deep-loosen 25–40 cm, every other year, just through the pan", note: "Right moisture only; follow with rotted organic matter" }],
  labTable: [
    { id: "bulk", name: "Bulk density", low: "Open enough", mid: "Watch traffic", high: "Packed", note: "Local classes" },
    { id: "om", name: "Organic matter", low: "Glue is gone", mid: "Holds crumbs", high: "Buffers traffic", note: "Not a same-week fix" },
  ],
  longform: ["A rain cap and a plough pan are two lids.", "Loosen when the soil cracks. Twenty-five to forty centimetres, just through the pan, not a yearly inversion."],
};

enBody["you-ji-zhi"] = {
  appearance: "Rub a handful: pale, dusty, will not clump. Fertiliser vanishes after one rain. Paler year by year usually means a thinner house. One microbe bag will not rebuild it in a season. Bare winters lose it fastest. A neighbour that still clumps is a useful pair.",
  conditions: "Straw carted off, bare winters, fertiliser only. Sand shows it first.",
  commonCrops: "Grain, vegetables, orchards. Sand leaks faster.",
  plainExplain: "Organic matter is the meat and the buffer. Thin it, and fertiliser will not stay. Microbes have no house.",
  natural: ["Sand starts thin.", "Warm wet climates burn residue faster than you return it."],
  human: ["All straw leaves the field; fertiliser is asked to rebuild the house.", "A microbe bag treated as a one-season rescue."],
  steps: [
    "Three years of residue return plus rotted manure beats one dump. Cover. Fewer bare winters.",
    "Don’t expect a microbe bag to turn the field in one season. Fresh manure against the root burns.",
    "Test organic matter so the number is in your head. Extra nitrogen will not grow that layer back.",
  ],
  dontDo: ["Don’t expect a microbe bag to rebuild the field in one season.", "Fresh manure against the root burns seedlings."],
  fieldCheck: "Rub a handful: pale, dusty, will not clump. Pair it with a darker neighbour.",
  whenToTest: "One bag from the pale patch, one from the darker neighbour.",
  prevention: ["Return straw when you can. Fewer bare winters.", "Rotted manure, little and often."],
  summary: enMeta["you-ji-zhi"].summary,
  confuse: [
    { lookalike: "Same-season nutrient gap", difference: "A gap greens up this season. A thin house leaks every year.", photoHint: "Compare colour with ten years ago if you can." },
    { lookalike: "Compaction", difference: "Packed is hard. Thin is no meat. A field can be both.", photoHint: "Rub: sand or dead clods, then colour." },
  ],
  dosage: [{ name: "Rotted organic manure", range: "Local station rates; often tonne-scale per mu, split across years; sand little and often", note: "Three years shows. Don’t pile a mountain in one year." }],
  photos: [
    { alt: "Pale, thin soil low in organic matter", caption: "Dusty, will not clump." },
    { alt: "Crumby soil high in organic matter (healthy contrast)", caption: "A contrast, not a prescription for your field." },
  ],
  indicators: [
    { name: "Organic matter", meaning: "How thick the house is", typical: "Read local classes; don’t paste another province’s table" },
    { name: "Soil colour", meaning: "A field glance at the house", typical: "Paler every year is a warning" },
  ],
  mechanism: "Organic matter holds water, holds nutrients, and houses microbes. When it thins, fertiliser leaks and structure fails. A bag of microbes is not the house.",
  example: "Pale soil that will not clump, fertiliser gone after rain: plan three years of residue and rotted manure. Don’t expect a microbe bag to finish the job this season.",
  doseTable: [{ crop: "Any", texture: "Sand", rate: "Rotted manure little and often, local tonne-scale per mu across years", note: "No bag count here. Ask the station." }],
  labTable: [
    { id: "om", name: "Organic matter", low: "Thin house", mid: "Can buffer", high: "Still read salt and pH", note: "Units: g/kg versus %" },
    { id: "cec", name: "CEC", low: "Sand cannot hold a dump", mid: "—", high: "Can hold more at once", note: "Not EC" },
  ],
  longform: ["Organic matter is savings, not a brand name.", "Do not mix percent with grams per kilogram."],
};

enBody["que-dan"] = {
  appearance: "Lower old leaves yellow evenly, new leaves at the top still green, washed roots still white — that looks like nitrogen. If new leaves yellow too, think sulphur or iron. Don’t pour urea on black, smelly roots.",
  conditions: "Nitrogen moves. Old leaves feed the new ones. Sand will not hold a whole-year dump.",
  commonCrops: "Maize, wheat, rice, leafy vegetables.",
  plainExplain: "Nitrogen moves. Old leaves feed the new ones. Sand will not hold a whole-year dump.",
  natural: ["Nitrogen moves; old leaves yellow first.", "Sand cannot store a season’s nitrogen in one hit."],
  human: ["New leaves yellow and still chased as nitrogen.", "Black, smelly roots still dressed with nitrogen."],
  steps: [
    "Read leaf position: lower old leaves yellow evenly, new leaves green, roots white — then it looks like nitrogen.",
    "If roots are sound, split a small dressing. Foliar feed is first aid. Sand: more splits. On maize at jointing or leafy vegetables in flush, urea is commonly 5–15 kg/mu (about 75–225 kg/ha), split.",
    "Don’t pour urea on black, smelly roots. New leaves yellow: think sulphur or iron.",
  ],
  dontDo: ["Don’t pour urea on black, smelly roots.", "If new leaves yellow too, think sulphur or iron first."],
  fieldCheck: "Lower old leaves yellow, new leaves green, plants thin, few tillers. White roots look like nitrogen.",
  whenToTest: "Note the lower yellow leaves and the green top, then sample the plough layer.",
  prevention: ["Split nitrogen only while roots are white.", "Don’t dump the year on sand.", "If new leaves yellow, sort leaf position first."],
  summary: enMeta["que-dan"].summary,
  confuse: [
    { lookalike: "Iron", difference: "Iron yellows new leaves with green veins. Nitrogen yellows old leaves more evenly.", photoHint: "Old leaves and the heart leaf in one frame." },
    { lookalike: "Waterlogging yellow", difference: "Waterlogging wilts by day and smells at the root. Nitrogen still has white roots.", photoHint: "Smell the root. If it stinks, drain. Don’t chase nitrogen." },
  ],
  dosage: [
    {
      name: "Urea top-dress (white roots, nitrogen confirmed)",
      range: "Maize at jointing or leafy vegetables in flush: commonly 5–15 kg/mu (about 75–225 kg/ha), split; sand at the low end plus one extra split",
      note: "Foliar nitrogen is first aid, not a soil replacement",
    },
  ],
  photos: [
    { alt: "Lower old leaves yellow, new leaves still greener", caption: "Leaf position first." },
    { alt: "Thin, tall nitrogen-deficient plants", caption: "Check that the roots are still white." },
  ],
  indicators: [
    { name: "Alkaline-hydrolysable N", meaning: "Nitrogen the crop can use this season", typical: "Too low: feed. Too high: lodging" },
    { name: "Leaf position", meaning: "Nitrogen moves", typical: "Old leaves first" },
  ],
  mechanism: "Nitrogen is mobile. The plant moves it from old leaves to new ones, so the lower leaves yellow first. Sand cannot hold a single dump.",
  example: "Old leaves yellow, new leaves green, roots white: split 5–15 kg/mu urea on maize at jointing. If the root smells, drain first.",
  doseTable: [{ crop: "Maize / leafy vegetables", texture: "Sand", rate: "Urea 5–15 kg/mu (about 75–225 kg/ha), split; sand at the low end", note: "White roots only. Foliar is first aid." }],
  labTable: [{ id: "alkn", name: "Alkaline-hydrolysable N", low: "Likely short this season", mid: "Watch the crop", high: "Lodging risk", note: "Local classes" }],
  longform: ["Nitrogen moves, so old leaves yellow first.", "Five to fifteen kilograms per mu is about seventy-five to two hundred twenty-five kilograms per hectare, split."],
};

enBody["que-jia"] = {
  appearance: "Old leaf margins scorch first, as if singed, then roll in. Stems go soft; fruit is bland. The surface is not always white. A white crust plus scorch: sort salt from potassium first.",
  conditions: "Potassium runs stomata and sugar. Without it, margins scorch first. Salt scorches too, but usually with a crust and patchy emergence.",
  commonCrops: "Rice, maize, vegetables, fruit, potato.",
  plainExplain: "Potassium runs stomata and sugar. Without it, margins scorch first. Salt scorches too, but usually with a crust and patchy emergence.",
  natural: ["Potassium leaves with straw. Fields that cart straw off show it first.", "High-yield fields empty the potassium store faster."],
  human: ["Scorch treated as potassium without looking at the surface.", "Chloride-sensitive crops still given potassium chloride."],
  steps: [
    "Read the old margin: scorch, rolling in, and whether the surface is white.",
    "Test available potassium. Once confirmed and there is no crust, grain crops commonly take 5–15 kg/mu (about 75–225 kg/ha). Foliar potassium dihydrogen phosphate is commonly 0.2%–0.3%, small patch first. Return straw when you can.",
    "Chloride-sensitive crops: no potassium chloride. Don’t spray a strong mix at noon.",
  ],
  dontDo: ["Don’t use potassium chloride on chloride-sensitive crops.", "Don’t spray a strong mix at noon.", "Don’t treat every scorched margin as potassium."],
  fieldCheck: "Old margins scorch and roll in; stems soft; fruit bland. The surface is not always white.",
  whenToTest: "Record the scorched leaf and whether the surface has a crust, as two notes.",
  prevention: ["Scorch: look at the surface first.", "Straw return brings potassium back.", "Chloride-sensitive crops: the sulphate potassium road."],
  summary: enMeta["que-jia"].summary,
  confuse: [
    { lookalike: "Salt scorch", difference: "Salt often has a crust and patchy emergence. Potassium often does not whiten the surface.", photoHint: "Surface first, then the old margin." },
    { lookalike: "Chloride injury", difference: "Scorch right after potassium chloride is more chloride or salt. Potassium shortage is slower.", photoHint: "Read the bag. Ask whether this crop had a chloride fertiliser." },
  ],
  dosage: [
    {
      name: "Soil potassium (confirmed, no crust)",
      range: "Grain crops commonly 5–15 kg/mu (about 75–225 kg/ha); chloride-sensitive crops: potassium sulphate only",
      note: "Foliar KH2PO4 commonly 0.2%–0.3%, small patch, not at noon",
    },
  ],
  photos: [
    { alt: "Old leaf margins scorched as if singed", caption: "Surface first, then the margin." },
    { alt: "Potassium scorch moving in from the edge", caption: "No crust: more like potassium." },
  ],
  indicators: [
    { name: "Available K", meaning: "This season’s potassium store", typical: "Sand and high-yield fields run low" },
    { name: "Old margins", meaning: "Potassium has moved", typical: "Scorch, roll, singed look" },
  ],
  mechanism: "Potassium is mobile. The plant moves it from old leaves, so the margin scorches first. Salt can look the same on the leaf — the surface tells them apart.",
  example: "Old margins scorch, no white crust, grain crop: 5–15 kg/mu potassium, chloride-sensitive crops on sulphate. A crust plus scorch is salt until proven otherwise.",
  doseTable: [{ crop: "Grain", texture: "Any", rate: "5–15 kg/mu (about 75–225 kg/ha) once confirmed, no crust", note: "Chloride-sensitive: potassium sulphate only" }],
  labTable: [{ id: "avk", name: "Available K", low: "Likely short", mid: "Watch the crop", high: "Don’t add more", note: "Local classes" }],
  longform: ["Scorched margins: photograph the soil surface first.", "Five to fifteen kilograms per mu, split if the station says so."],
};

enBody["que-tie"] = {
  appearance: "Sort which leaves are yellow. New leaves yellow with green veins, worst at the tip. Old leaves stay greener.",
  conditions: "High pH locks iron. The soil has iron; the root cannot eat it. Nitrogen yellows old leaves first — a different road.",
  commonCrops: "Citrus, grape, peanut, soybean, ornamentals, peach.",
  plainExplain: "High pH locks iron. The soil has iron; the root cannot eat it. Nitrogen yellows old leaves first — a different road.",
  natural: ["Calcareous soils and a heavy watering lock iron more easily.", "Above about pH 7.5 iron often locks; above 8 it is worse."],
  human: ["New yellow leaves with green veins still chased as nitrogen.", "Ferrous sulphate dumped on high-pH land as a season cure."],
  steps: [
    "Pinch the newest leaf: yellow tissue, green veins, old leaves still decent — that is not nitrogen.",
    "Chelated foliar iron on the label, repeated. Organic matter in the root zone, steady moisture, no flood irrigation.",
    "Don’t dump ferrous sulphate on high-pH soil as a season fix.",
  ],
  dontDo: ["Don’t dump ferrous sulphate on high-pH soil as a season fix.", "Don’t chase yellow with urea."],
  fieldCheck: "New leaves yellow with green veins, worst at the tip. Old leaves stay greener.",
  whenToTest: "Pinch a new leaf. Sample the root zone, not the footpath between rows.",
  prevention: ["New yellow leaves with green veins: think iron, not nitrogen.", "On high pH, ferrous sulphate often fails this season.", "Foliar chelate is first aid."],
  summary: enMeta["que-tie"].summary,
  confuse: [
    { lookalike: "Nitrogen", difference: "Nitrogen yellows old leaves. Iron yellows new leaves with green veins.", photoHint: "Heart leaf and bottom leaf in one frame." },
    { lookalike: "Manganese", difference: "Manganese often adds brown specks. Iron is a cleaner interveinal yellow.", photoHint: "Brown specks on the new leaf: think manganese first." },
  ],
  dosage: [
    {
      name: "Foliar chelated iron (first aid)",
      range: "Labelled lower rate, repeat a few times on new leaves. A small patch first",
      note: "Broadcasting ferrous sulphate on high-pH land as a cure usually floats away.",
    },
  ],
  photos: [
    { alt: "New leaves yellow with green veins", caption: "Hold the leaf to the light. Include an old leaf." },
    { alt: "Iron chlorosis on a fruit-tree shoot", caption: "Clearest in the first days of a new flush." },
  ],
  indicators: [
    { name: "pH", meaning: "Whether iron locks", typical: "Above 7.5 it often locks; above 8 it is worse" },
    { name: "New interveinal tissue", meaning: "Iron does not move", typical: "Yellow leaf, green vein" },
  ],
  mechanism: "Iron does not move inside the plant, so the newest leaves show it. High pH turns iron into a form the root cannot take up. The soil can test ‘enough’ and the shoot still yellows.",
  example: "New leaves yellow, veins green, old leaves decent, pH high: foliar chelate on the label. Don’t broadcast ferrous sulphate as a season cure. Don’t pour nitrogen.",
  doseTable: [{ crop: "Fruit / peanut / soybean", texture: "Calcareous", rate: "Foliar chelated iron at the labelled lower rate, repeat on the new flush", note: "Small patch first. Root zone: organic matter and steady moisture" }],
  labTable: [
    { id: "ph", name: "pH", low: "Iron more available", mid: "Crop-dependent", high: "Iron locks", note: "New interveinal yellow maps to this cell" },
    { id: "fe", name: "Available Fe", low: "May be short", mid: "Still read pH", high: "On high pH the root may still miss it", note: "Local classes" },
  ],
  longform: ["Iron does not move, so new leaves yellow.", "Above about eight, iron often locks. Foliar chelate is first aid, not a pH change."],
};

enBody["lao-hai"] = {
  appearance: "Wilt by day, recover at night, standing water or a wet bottom, roots black and smelling. Wet soil and still wilted.",
  conditions: "Roots need air. Water pushes air out and the root smothers. Watering wet soil pours fuel on the fire.",
  commonCrops: "Maize, cotton, soybean, vegetables hate it most. Rice also fails under long deep flood.",
  plainExplain: "Roots need air. Water pushes air out and the root smothers. Watering wet soil pours fuel on the fire.",
  natural: ["Low spots and a plough pan perch water after rain.", "Clay drains slowly and smothers roots more easily."],
  human: ["Wet soil still wilted, treated as drought and irrigated.", "Nitrogen poured before new roots appear."],
  steps: [
    "Wet soil and still wilted, drooping at noon, recovering at night, a smell at the root — the root is out of air, not dry, and not a nitrogen gap.",
    "Drain first. Thin foliar feed only after new roots. Break a pan that perches water. Ditch the low spots.",
    "Don’t irrigate wet soil as if it were drought.",
  ],
  dontDo: ["Don’t irrigate wet soil as if it were drought.", "Don’t dump nitrogen the day after a flood."],
  fieldCheck: "Wilt by day, recover at night, standing water or a wet bottom, roots black and smelling.",
  whenToTest: "One sample in the pond, one near the outlet. Wash one root.",
  prevention: ["Drain so the root can breathe.", "No nitrogen until new roots show.", "Open the ditch. A plough pan perches water."],
  summary: enMeta["lao-hai"].summary,
  confuse: [
    { lookalike: "Drought wilt", difference: "Drought is dry soil. Waterlogging is wet soil and still wilted.", photoHint: "Squeeze the soil. Wet or dry." },
    { lookalike: "Nitrogen yellow", difference: "Nitrogen yellows old leaves with white roots. Waterlogging blacks and smells the root.", photoHint: "You must see the root." },
  ],
  dosage: [
    { name: "Drainage", range: "Get air back to the roots as soon as you can", note: "This is the first job." },
    { name: "Fertiliser in the recovery window", range: "Thin feed, after the roots recover", note: "Don’t dump nitrogen right after a flood." },
  ],
  photos: [
    { alt: "Standing water and wilted yellow seedlings", caption: "Noon, wet soil, still drooping — that frame helps." },
    { alt: "Waterlogged roots gone black", caption: "Smell the root. If it stinks, drain first." },
  ],
  indicators: [
    { name: "Field water", meaning: "Wet or dry", typical: "Wet and wilted is not drought" },
    { name: "Root colour and smell", meaning: "Whether the root is still alive", typical: "Black and smelling: drain first" },
  ],
  mechanism: "Roots breathe oxygen in the pores. Flooded pores fill with water, oxygen drops, and the root dies. A dead root cannot take nitrogen, so more fertiliser makes it worse.",
  example: "After a storm, noon wilt on wet soil, a smell at the root: open the ditch. Wait for new white roots before a thin feed.",
  doseTable: [{ crop: "Maize / vegetables", texture: "Any", rate: "Drain first. Thin foliar only after new roots", note: "No nitrogen the day after a flood" }],
  labTable: [{ id: "om", name: "Organic matter / texture", low: "Sand drains faster", mid: "—", high: "Clay and a pan perch water", note: "The field test is the wet wilt" }],
  longform: ["Wet soil and still wilted is drowning, not drought.", "Drain first. Nitrogen waits for new roots."],
};

enBody["shao-gen"] = {
  appearance: "Leaf scorch and black root tips within days of fertiliser; granules visible in the seed furrow, in a stripe.",
  conditions: "Fertiliser turns the root zone into brine. Sand, fertiliser against the seed, and one strong hit hurt most.",
  commonCrops: "Vegetable seedlings, maize in hills, fruit trees in pockets.",
  plainExplain: "Fertiliser turns the root zone into brine. Sand, fertiliser against the seed, and one strong hit hurt most.",
  natural: ["Sand has little buffer, so the same rate hurts more.", "The seedling threshold is lower."],
  human: ["A burn chased as a shortage with a second bag.", "Starter and seed mixed in one hole."],
  steps: [
    "Walk the seed furrow: injury in a stripe, granules still visible, tips black — that is a burn.",
    "Flush with clean water and pause fertiliser. Re-sow away from the band. Keep seed and fertiliser a few centimetres apart, side-banded.",
    "Don’t add more fertiliser after a burn. Don’t use clay rates on sand.",
  ],
  dontDo: ["Don’t add more fertiliser after a burn.", "Don’t use clay rates on sand."],
  fieldCheck: "Leaf scorch and black root tips within days; granules in the furrow; a stripe.",
  whenToTest: "Sample along the furrow. Keep the granule band and the outside in two bags.",
  prevention: ["Keep starter off the seed.", "After a burn: stop, flush.", "Re-sow away from the old pocket."],
  summary: enMeta["shao-gen"].summary,
  confuse: [
    { lookalike: "Drought", difference: "Drought eases after water. A burn can wilt more after a light watering.", photoHint: "Look for granules in the furrow." },
    { lookalike: "Disease root rot", difference: "Rot is patchy, with lesions. A burn follows the fertiliser stripe.", photoHint: "Ask what was applied, and where." },
  ],
  dosage: [
    { name: "Starter distance from the seed", range: "Side-band a few centimetres deep", note: "Do not put it against the seed." },
    { name: "One application", range: "Split the labelled lower rate", note: "The seedling threshold is lower." },
  ],
  photos: [
    { alt: "Burnt seedlings in the fertiliser furrow, black tips", caption: "Photograph the stripe down the row." },
    { alt: "Burnt root tips brown-black", caption: "Open the soil and look for granules." },
  ],
  indicators: [
    { name: "Furrow granules", meaning: "Whether this is a burn", typical: "A stripe against the seed is the tell" },
    { name: "Root-tip colour", meaning: "How far the injury has gone", typical: "Brown-black: stop feeding" },
  ],
  mechanism: "A concentrated band of salt around the seed pulls water out of the root. The plant looks thirsty or hungry. Adding another bag raises the salt.",
  example: "Three to five days after a rich starter, a stripe of dead seedlings, granules in the furrow: flush, stop feeding, re-sow a few centimetres away.",
  doseTable: [{ crop: "Maize / vegetables", texture: "Sand", rate: "Side-band a few centimetres from the seed; labelled lower rate, split", note: "Sand below clay rates. No bag count invented here." }],
  labTable: [{ id: "ec", name: "EC in the band", low: "Unlikely a burn", mid: "—", high: "Band is brine", note: "Compare furrow and outside" }],
  longform: ["A stripe down the furrow with granules still visible is a burn.", "Flush with water. Do not add another bag."],
};

enBody["ce-tu-bao-gao"] = {
  appearance: "Match the field name and the sample date first. Read in this order: pH → organic matter → salt → NPK → micronutrients. A missed decimal poisons the rate. The sheet is a ruler, not a prescription. Take it to the station rather than pasting another province’s table.",
  conditions: "You have just received a sheet, before you mix fertiliser or amend.",
  commonCrops: "All crops. This guide does not prescribe one crop. It teaches how to read.",
  plainExplain: "A ‘low’ cell is not a licence for the maximum. Classes are local. Pasting another province’s table will mis-rate the field.",
  natural: ["Labs use different soil:water ratios. Numbers are not hard-comparable."],
  human: ["Every ‘low’ filled at the maximum before the sheet is finished.", "A missed unit still turned into a mix."],
  steps: [
    "Circle the extremes first: too acid or too alkali, salt too high, organic matter too thin.",
    "NPK by local class: add what is low, stop what is already high.",
    "If you cannot read it, take it to the station. Don’t fill every ‘low’ at the maximum.",
  ],
  dontDo: ["Don’t fill every ‘low’ at the maximum.", "Don’t misread the unit.", "Don’t paste another province’s table onto your field."],
  fieldCheck: "The field name on the sheet must be the field you are standing in.",
  whenToTest: "The field name on the sheet must be the field you are standing in.",
  prevention: ["Read pH, organic matter and salt first.", "Take the sheet to the station and use local classes."],
  summary: enMeta["ce-tu-bao-gao"].summary,
  confuse: [
    { lookalike: "A deficiency photo", difference: "A photo can only suspect. A sheet roughly quantifies. Yellow leaves have ten causes.", photoHint: "Put the sheet next to the field photo." },
    { lookalike: "A neighbour’s usual rate", difference: "Neighbour soil is not yours. Sand and clay, acid and alkali, can double the rate.", photoHint: "Match your own pH and texture first." },
  ],
  dosage: [
    { name: "Read in this order", range: "pH → organic matter → salt → NPK → micronutrients", note: "Don’t reverse the order." },
    { name: "Add fertiliser", range: "Follow the station’s recipe range", note: "Low on the sheet ≠ a heavy dump this season." },
  ],
  photos: [
    { alt: "Soil-test sheet showing pH, organic matter and EC", caption: "Circle these three cells first." },
    { alt: "Nutrient table on a soil-test sheet", caption: "A missed decimal poisons the rate." },
  ],
  indicators: [
    { name: "pH", meaning: "Acid or alkali", typical: "Most crops 6.0–7.5; tea is the exception" },
    { name: "EC / total salt", meaning: "How salty", typical: "Seedlings more sensitive; greenhouses often high" },
    { name: "Organic matter", meaning: "The house", typical: "Local classes; don’t paste another province" },
    { name: "Alkaline-hydrolysable N", meaning: "This season’s nitrogen", typical: "Too high: lodging. Too low: a gap" },
    { name: "Available P", meaning: "Phosphorus the crop can use", typical: "Strongly tied to pH" },
    { name: "Available K", meaning: "This season’s potassium", typical: "Sand and high-yield fields run low" },
    { name: "CEC", meaning: "How well the soil holds nutrients", typical: "Sand is low — little and often" },
    { name: "Available Fe, Zn, B", meaning: "Micronutrients", typical: "On high pH, ‘present but unavailable’" },
  ],
  mechanism: "A sheet is a ruler. Misread the unit and the rate flips: treat percent as grams per kilogram and organic matter is off by ten; treat µS as mS and salt is off by a thousand. CEC is cation exchange capacity, not electrical conductivity. The sheet is not a prescription.",
  example: "Anonymous grain field: pH 5.2, organic matter 12.4 g/kg, EC 0.28. Grain at 5.2 can talk lime. Tea at the same 5.2 must not be pushed to neutral. CEC is not EC.",
  doseTable: [{ crop: "Any crop", texture: "Read the sheet first", rate: "Order: pH → organic matter → salt → NPK → micronutrients", note: "Fertiliser ranges from the station. This page prints no bag count." }],
  labTable: [
    { id: "ph", name: "pH", low: "Grain land < 5.5: talk lime", mid: "Crop-dependent", high: "Iron locks", note: "First cell" },
    { id: "om", name: "Organic matter", low: "Thin house", mid: "Can buffer", high: "Still read salt", note: "Second cell" },
    { id: "ec", name: "EC / salt", low: "Unlikely salt injury", mid: "—", high: "Ask the outlet first", note: "Third cell" },
    { id: "cec", name: "CEC", low: "Sand cannot hold a dump", mid: "—", high: "Can hold more at once", note: "Not EC" },
  ],
  longform: [
    "pH is a ruler, not a disease name. Grain and vegetables around 6.0–7.5; tea around 4.5–6.0.",
    "CEC is cation exchange, not conductivity. Take the sheet to the station.",
  ],
};

const enrichExtra = {
  "suan-hua": {
    mechanism: "土太酸，铝离子从矿物里出来伤根尖。根尖一秃，水肥进不去，地上看起来像缺肥。铵态氮连年当唯一氮源、雨水淋钙镁，都会把 pH 往下推。茶树耐酸，粮田不是越酸越好。",
    example: "同一块粮田 pH 5.2，可以谈农用石灰，沙土按下限、分两次。茶园同样 5.2，窗口往往还在四点五到六，不能照搬粮田改到中性。",
    speakZh: ["秧苗发僵不长，先洗手洗根。", "根尖褐秃、少白尖，才像铝毒伤根。", "浇水冒锈水只是加分项。", "零到二十厘米测 pH。", "低于五点五才谈改酸。", "农用石灰每亩五十到一百五十公斤，分两次。", "沙土按下限。", "跟尿素不同日，不用建筑石灰。", "茶园不要按粮田改到中性。", "根秃时不要猛尿素。"],
    speakEn: ["When seedlings stall, wash the roots first.", "Brown, bald tips look like aluminium toxicity.", "Rusty water is extra evidence, not required.", "Test pH at zero to twenty centimetres.", "On grain land, talk lime only below about five point five.", "Farm lime is often fifty to one hundred fifty kilograms per mu, about seven hundred fifty to two thousand two hundred fifty kilograms per hectare, split in two.", "Sandy soils take the low end.", "Not the same day as urea. No builder's lime.", "Do not push tea to neutral. Tea stays around four point five to six.", "Do not pour urea on bald roots."],
    howtoSpeakZh: ["拔一棵，洗手洗根。", "先认根尖再谈肥。", "测零到二十厘米 pH。", "低于五点五才改。", "农用石灰分两次，沙土按下限。", "与尿素错开，不用建筑石灰。", "茶园不要改到中性。"],
    howtoSpeakEn: ["Pull one plant and wash the roots.", "Read the tip before you feed.", "Test zero to twenty centimetre pH.", "Lime only below five point five, split, sandy soils low.", "Not the same day as urea. No builder's lime.", "Do not push tea to neutral."],
  },
  "yan-jian": {
    mechanism: "盐把土水变咸，根喝水费劲。钠高还会把团粒拆散，土又黏又板。小水勤浇等于把盐用电梯送上来。咸看电导，涩看酸碱和钠，两码事。",
    example: "土面白霜、叶缘焦、浇一小水更蔫：先停高盐肥，测 EC、pH、全盐。没沟不要大水漫灌。不要见白霜就撒石膏。",
    speakZh: ["蹲下去看土面：白粉还是硬壳。", "出苗一块有一块没有。", "叶边像开水烫过。", "小水浇完更蔫，不要当旱灌。", "咸看电导，涩看酸碱和钠。", "没沟不要大水漫灌。", "见白霜不要一律撒石膏。"],
    speakEn: ["Look at the surface: powder or a hard crust.", "Seedlings come up in patches.", "Leaf edges look scalded.", "Worse wilt after a light watering is not drought.", "Salt is EC. Alkali is pH and sodium.", "No drain, no flood.", "Do not spread gypsum on every white crust."],
    howtoSpeakZh: ["先停高盐肥。", "有排水再洗。", "覆盖断返盐。", "测电导、pH、全盐。", "分清是咸还是涩。"],
    howtoSpeakEn: ["Stop high-salt fertiliser first.", "Wash only if you have a drain.", "Cover to cut the salt rising.", "Read EC, pH and total salt.", "Salty and alkali are different jobs."],
  },
  "ban-jie": {
    mechanism: "雨滴砸、车碾、湿耕，都会把表层颗粒填进孔隙。湿时一泡烂泥，干了像砖。根横着走，苗戴帽出土。犁底层是另一层硬盖，别和表层帽子当成一件事。",
    example: "雨后表面封死、车辙里不出苗：土干到能裂再松，湿着松是抹一层新泥。深松隔年、适墒、刚过硬盖，大约二十五到四十厘米。",
    speakZh: ["雨后一包浆，晴天像砖。", "苗戴帽出土，根横着走。", "二十厘米下面看有没有发亮硬盖。", "湿土不要进车。", "适墒隔年深松，大约二十五到四十厘米。", "刚过硬盖就停。"],
    speakEn: ["Slurry after rain, brick when it dries.", "Seedlings wear a cap. Roots turn sideways.", "Look under twenty centimetres for a shiny pan.", "Keep wheels off wet soil.", "Deep-loosen every other year, about twenty-five to forty centimetres.", "Stop just through the pan."],
    howtoSpeakZh: ["适墒再松。", "隔年深松，刚过硬盖。", "大约二十五到四十厘米。", "泥里不要进车。"],
    howtoSpeakEn: ["Loosen when the soil will crack.", "Every other year, just through the pan.", "About twenty-five to forty centimetres.", "No wheels on mud."],
  },
  "you-ji-zhi": {
    mechanism: "有机质是土的肉和缓冲。薄了，肥留不住，菌也没房住。一袋菌不是那层肉。",
    example: "土色浅、一把就散、肥效一场雨就飘：按三年还田加腐熟粪来想，不要指望一袋菌当季翻身。",
    speakZh: ["搓一把：浅、粉、团不住。", "肥下去一场雨又像没施。", "有机质是家底，不是一袋菌的名字。", "连续三年还田加腐熟粪。", "生粪埋根边会烧苗。"],
    speakEn: ["Rub a handful: pale, dusty, will not clump.", "Fertiliser vanishes after one rain.", "Organic matter is the house, not a microbe brand.", "Plan three years of residue and rotted manure.", "Fresh manure against the root burns."],
    howtoSpeakZh: ["秸秆能还就还。", "腐熟粪少量多次。", "不要一袋菌当翻身药。"],
    howtoSpeakEn: ["Return straw when you can.", "Rotted manure, little and often.", "A microbe bag is not a one-season rescue."],
  },
  "que-dan": {
    mechanism: "氮会搬家。老叶把氮送给新叶，所以黄的是下部老叶。沙土一次倒全年留不住。",
    example: "老叶匀黄、新叶还绿、根还白：玉米拔节尿素每亩五到十五公斤，分次。根臭了先排水。",
    speakZh: ["底下老叶匀黄，顶上还绿。", "根洗出来是白的，才像缺氮。", "新叶也黄，要想缺硫或缺铁。", "根黑臭时不要猛尿素。", "尿素每亩五到十五公斤，分次。", "沙土按下限，多一次。"],
    speakEn: ["Lower old leaves yellow evenly. New leaves stay green.", "White roots look like nitrogen.", "If new leaves yellow too, think sulphur or iron.", "Do not pour urea on black, smelly roots.", "Urea is commonly five to fifteen kilograms per mu, about seventy-five to two hundred twenty-five kilograms per hectare, split.", "Sand takes the low end plus one extra split."],
    howtoSpeakZh: ["先分叶位。", "根白才少量多次。", "沙土不要一次倒全年。"],
    howtoSpeakEn: ["Read leaf position first.", "Split nitrogen only while roots are white.", "Do not dump the year on sand."],
  },
  "que-jia": {
    mechanism: "钾会搬家。老叶边缘先焦。盐害也焦边，但常有白霜。",
    example: "老叶焦边、土面没有白霜：粮食作物每亩五到十五公斤钾。有白霜先走盐。忌氯作物不用氯化钾。",
    speakZh: ["老叶外边焦，往里卷。", "土面不一定白。", "白霜加焦边先想盐。", "确认缺钾后，每亩五到十五公斤。", "忌氯作物不用氯化钾。"],
    speakEn: ["Old margins scorch and roll in.", "The surface is not always white.", "A crust plus scorch is salt until proven otherwise.", "Once confirmed, grain crops commonly take five to fifteen kilograms per mu.", "Chloride-sensitive crops do not get potassium chloride."],
    howtoSpeakZh: ["焦边先看土面。", "测速效钾。", "忌氯作物换硫酸钾。"],
    howtoSpeakEn: ["Photograph the surface first.", "Test available potassium.", "Chloride-sensitive crops: potassium sulphate."],
  },
  "que-tie": {
    mechanism: "铁不搬家，所以黄的是新叶。高 pH 把铁锁住，土里有铁根也吃不到。",
    example: "新叶黄、脉还绿、老叶还好、土偏碱：叶面螯合铁按说明。不要猛撒硫酸亚铁当当季解决。",
    speakZh: ["新叶黄，叶脉还绿。", "老叶相对还绿，这就不像缺氮。", "pH 大于七点五，铁容易被锁。", "大于八更明显。", "叶面螯合铁只救急。", "高 pH 不要猛撒硫酸亚铁。"],
    speakEn: ["New leaves yellow with green veins.", "Old leaves stay greener. That is not nitrogen.", "Above about seven point five, iron often locks.", "Above eight it is worse.", "Foliar chelate is first aid.", "Do not dump ferrous sulphate on high pH as a season fix."],
    howtoSpeakZh: ["掐顶端新叶。", "叶面螯合铁按说明重复。", "不要一黄就冲氮。"],
    howtoSpeakEn: ["Pinch the newest leaf.", "Repeat chelated foliar iron on the label.", "Do not chase yellow with urea."],
  },
  "lao-hai": {
    mechanism: "根要氧气。水把孔隙里的气排走，根就闷死。死根吃不进氮，再追肥更伤。",
    example: "暴雨后中午土湿还耷拉、根有味：先挖沟排水。等新白根再薄肥。",
    speakZh: ["白天蔫，晚上缓。", "土是湿的还蔫，不是旱。", "根黑臭，先排水。", "新根没出来以前不要追氮。"],
    speakEn: ["Wilt by day, recover at night.", "Wet soil and still wilted is not drought.", "Black, smelling roots: drain first.", "No nitrogen until new roots show."],
    howtoSpeakZh: ["先排水。", "低洼挖沟。", "新根出来再薄肥。"],
    howtoSpeakEn: ["Drain first.", "Ditch the low spots.", "Thin feed only after new roots."],
  },
  "shao-gen": {
    mechanism: "种沟里过浓的盐把根周围做成盐水，根里的水被抢走。看起来像旱、像缺肥。再倒一把盐更高。",
    example: "施肥三五天，种沟成行死苗、还能见到肥粒：灌清水，停肥，补种挪开几厘米。",
    speakZh: ["伤的成行，沟里还能见到肥粒。", "这是烧根，不是缺肥。", "立刻灌清水，暂时停肥。", "补种要离开原来的肥窝。", "种肥和种子隔开。"],
    speakEn: ["Injury in a stripe, granules still in the furrow.", "That is a burn, not a shortage.", "Flush with clean water and pause fertiliser.", "Re-sow away from the old pocket.", "Keep starter a few centimetres from the seed."],
    howtoSpeakZh: ["灌清水。", "停肥。", "补种离开肥带。"],
    howtoSpeakEn: ["Flush with water.", "Stop feeding.", "Re-sow off the band."],
  },
  "ce-tu-bao-gao": {
    mechanism: "化验单是尺子。单位看错一位，肥会下反：把百分数当成克每千克，有机质会差十倍；把微西当成毫西，盐会差一千倍。CEC 是阳离子交换量，不是电导。报告不是处方。",
    example: "匿名粮田：pH 5.2、有机质 12.4 克每千克、EC 0.28。粮田 5.2 可以谈石灰；茶园同样 5.2 不能照搬改到中性。",
    speakZh: ["单子拿回来先对地块名和日期。", "先圈 pH、有机质、盐分。", "再看氮磷钾，再看微量。", "单位看错一位会下错肥。", "粮田 pH 五点二，可以谈石灰。", "茶园五点二，不能改到中性。", "粮菜舒适区大约六点到七点五。", "CEC 不是电导。", "报告是尺子不是处方。"],
    speakEn: ["Match the field name and the date first.", "Circle pH, organic matter and salt.", "Then NPK, then micronutrients.", "A missed decimal poisons the rate.", "Grain land at pH five point two can talk lime.", "Tea at five point two must not be pushed to neutral.", "Grain and vegetables sit around six to seven point five.", "CEC is not electrical conductivity.", "The sheet is a ruler, not a prescription."],
    howtoSpeakZh: ["先圈极端项。", "过酸过碱、盐太高、肉太薄先改。", "氮磷钾按当地分级。", "已经过高的先停。"],
    howtoSpeakEn: ["Circle the extremes first.", "Fix acid, alkali, salt and a thin house before NPK dumps.", "NPK by local class.", "Stop what is already high."],
  },
};

const articles = load("src/data/articles.json");
const index = load("src/data/articles-index.json");
const overlay = load("src/data/articles-en.json");
const meta = load("src/data/articles-en-meta.json");
const enrich = load("src/data/enrich.json");
const posts = load("src/data/posts.json");
const wiki = load("src/data/wiki.json");

for (const a of articles) {
  if (P0.has(a.slug)) continue;
  const next = walk(a, stripZh);
  if (Array.isArray(next.solutions?.steps)) {
    next.solutions.steps = next.solutions.steps.map((s) => s.replace(/^\s*\d+\s*[）).、]\s*/, "").replace(/^1）1\s*/, ""));
  }
  Object.assign(a, next);
}
for (const a of index) {
  if (P0.has(a.slug)) continue;
  Object.assign(a, walk(a, stripZh));
}
for (const [slug, g] of Object.entries(overlay)) {
  if (P0.has(slug)) continue;
  overlay[slug] = walk(g, stripEn);
}
for (const [slug, m] of Object.entries(meta)) {
  if (P0.has(slug)) continue;
  meta[slug] = walk(m, stripEn);
}
for (const [slug, e] of Object.entries(enrich)) {
  if (P0.has(slug)) continue;
  enrich[slug] = walk(e, stripZh);
}

for (const a of articles) {
  const z = zh[a.slug];
  if (!z) continue;
  a.title = z.title;
  a.subtitle = z.subtitle;
  a.summary = z.summary;
  a.card = z.card;
  a.phenomenon = { appearance: z.appearance, conditions: z.conditions, commonCrops: z.commonCrops };
  a.causes = { natural: z.natural, human: z.human, plainExplain: z.plainExplain };
  a.solutions = { ...a.solutions, steps: z.steps };
  a.dontDo = z.dontDo;
  a.fieldCheck = z.fieldCheck;
  a.whenToTest = z.whenToTest;
  a.prevention = z.prevention;
  a.confuse = z.confuse;
  a.indicators = z.indicators;
  a.longform = [];
  a.photos = a.photos.map((p, i) => ({ ...p, alt: z.photos[i]?.alt || p.alt, caption: z.photos[i]?.caption || p.caption }));
}

for (const a of index) {
  const z = zh[a.slug];
  if (!z) continue;
  a.title = z.title;
  a.subtitle = z.subtitle;
  a.summary = z.summary;
  a.card = z.card;
  a.conditions = z.conditions;
  a.commonCrops = z.commonCrops;
  if (a.photos?.[0]) a.photos[0].alt = z.photos[0].alt;
}

for (const slug of P0) {
  meta[slug] = enMeta[slug];
  overlay[slug] = { ...(overlay[slug] || {}), ...enBody[slug] };
  const e = enrich[slug] || {};
  const x = enrichExtra[slug];
  enrich[slug] = {
    ...e,
    mechanism: x.mechanism,
    example: x.example,
    spoken: x.speakZh,
    spokenHow: x.howtoSpeakZh,
    spokenEn: x.speakEn,
    spokenHowEn: x.howtoSpeakEn,
    speakZh: x.speakZh,
    speakEn: x.speakEn,
    howtoSpeakZh: x.howtoSpeakZh,
    howtoSpeakEn: x.howtoSpeakEn,
    doseTable: e.doseTable,
    labTable: e.labTable,
  };
}

const p01 = posts.find((p) => p.id === "p01");
if (p01?.answers?.[0]) {
  p01.answers[0].body =
    "先洗手洗根。褐秃、少白尖，才像铝毒伤根，锈水只是加分项。零到二十厘米测 pH，低于 5.5 才谈农用石灰，常见每亩 50–150 公斤、分两次，沙土按下限。茶园别按粮田改到中性。根秃时不要猛尿素。不要照搬别人的石灰用量，先测这块地。";
  p01.answers[0].bodyEn =
    "Wash the roots first. Brown and bald tips look like aluminium toxicity; rusty water is extra evidence. Test 0–20 cm pH; lime only below about 5.5. Farm lime is often 50–150 kg/mu (about 750–2250 kg/ha), split, sandy soils at the low end. Don’t push tea to neutral. Don’t pour urea on bald roots. Don’t copy a neighbour’s lime rate. Test this field first.";
}
const p02 = posts.find((p) => p.id === "p02");
if (p02?.answers?.[0]) {
  p02.answers[0].body =
    "白霜是盐分线索，不是确诊。小水浇完更蔫，不要当成旱了猛灌。没沟别大水漫灌。先停高盐肥，测电导、pH、全盐，分清是咸还是涩。见白霜别一律撒石膏。";
  p02.answers[0].bodyEn =
    "A white crust is a salt clue, not proof by itself. Worse wilt after a light watering is not a reason to flood. No drain, no flood. Stop high-salt fertiliser. Read EC, pH and total salt — saline and alkali are different jobs. Don’t spread gypsum on every white crust.";
}

if (wiki.al?.en) {
  wiki.al.en.subtitle = "Exchangeable aluminium is the toxic ion in very acid soil. The job is lime and organic matter, not more nitrogen.";
  wiki.al.en.summary = "Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the top stalls. Fix the acid, don’t chase nitrogen.";
  wiki.al.en.appearance = "Below about pH 5.5, aluminium dissolves and injures root tips: brown, bald, few white tips. Then the shoot stalls.";
  wiki.al.en.spoken = [
    "Exchangeable aluminium is the toxic ion in very acid soil.",
    "Below about pH 5.5 it dissolves and injures root tips.",
    "Brown, bald tips with few white points, then the top stalls.",
    "The job is lime and organic matter, not more nitrogen.",
  ];
}

save("src/data/articles.json", articles);
save("src/data/articles-index.json", index);
save("src/data/articles-en.json", overlay);
save("src/data/articles-en-meta.json", meta);
save("src/data/enrich.json", enrich);
save("src/data/posts.json", posts);
writeFileSync("src/data/wiki.json", JSON.stringify(wiki));

const hooks = ["别抄邻县", "盐的名片", "铝在咬", "膘掉了", "锄头弹回来", "你先对上这一幕", "1）1"];
for (const p of ["src/data/articles.json", "src/data/articles-index.json", "src/data/enrich.json", "src/data/posts.json"]) {
  const t = readFileSync(p, "utf8");
  for (const h of hooks) {
    const n = t.split(h).length - 1;
    if (n) console.log("LEFT", p, h, n);
  }
}
console.log("p0 rewrite done", [...P0].join(", "));
