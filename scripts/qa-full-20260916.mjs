#!/usr/bin/env node
/**
 * Full-site copy + photo metadata patch. Does not invent rates.
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const save = (p, obj) => writeFileSync(p, JSON.stringify(obj, null, p.endsWith("wiki.json") ? undefined : 2) + (p.endsWith("wiki.json") ? "" : "\n"));

const articles = read("src/data/articles.json");
const index = read("src/data/articles-index.json");
const enrich = read("src/data/enrich.json");
const overlay = read("src/data/articles-en.json");
const meta = read("src/data/articles-en-meta.json");
const wiki = read("src/data/wiki.json");
const posts = read("src/data/posts.json");

function deepReplace(obj, pairs) {
  if (typeof obj === "string") {
    let s = obj;
    for (const [a, b] of pairs) s = s.split(a).join(b);
    return s;
  }
  if (Array.isArray(obj)) return obj.map((x) => deepReplace(x, pairs));
  if (obj && typeof obj === "object") {
    const n = { ...obj };
    for (const k of Object.keys(n)) n[k] = deepReplace(n[k], k === "id" || k === "src" ? n[k] : n[k], pairs);
    // fix: don't skip by key that way
    return n;
  }
  return obj;
}

function walkReplace(obj, pairs) {
  if (typeof obj === "string") {
    let s = obj;
    for (const [a, b] of pairs) s = s.split(a).join(b);
    return s;
  }
  if (Array.isArray(obj)) return obj.map((x) => walkReplace(x, pairs));
  if (obj && typeof obj === "object") {
    const n = {};
    for (const k of Object.keys(obj)) {
      n[k] = k === "src" || k === "slug" || k === "id" || k === "bvid" ? obj[k] : walkReplace(obj[k], pairs);
    }
    return n;
  }
  return obj;
}

const ZH_PAIRS = [
  ["铝溶出来咬根尖", "铝溶出来伤根尖"],
  ["铝咬根尖", "铝伤根尖"],
  ["咬根尖", "伤根尖"],
  ["根尖像被烫过，发褐、秃、不伸。", "根尖发褐、发秃，侧根很少。"],
  ["根尖像被烫过", "根尖发褐、发秃"],
  ["叶缘像烫过", "叶缘发焦"],
  ["叶边像开水烫过", "叶缘发焦"],
  ["像开水烫过", "发焦"],
  ["盐的名片", "盐分偏高的线索"],
  ["肉掉得快", "有机质掉得快"],
  ["有机质是家底，不是菌剂名。", "有机质是土壤里的有机物质含量，不是菌剂商品名。"],
];

const EN_PAIRS = [
  ["Available N is this this season’s available nitrogen, not a prescription.", "Available nitrogen on the sheet is this season’s supply, not a prescription."],
  ["Available N is this this season's available nitrogen, not a prescription.", "Available nitrogen on the sheet is this season’s supply, not a prescription."],
  ["Field capacity is the field-capacity mark. Irrigating past it is waterlog.", "Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root."],
  ["season’s plate", "season’s nitrogen supply"],
  ["season's plate", "season's nitrogen supply"],
  ["breathing road", "pore space"],
  ["cup mark", "drainage mark"],
];

function firstSent(s) {
  return String(s || "")
    .split(/[。！？.!?]/)[0]
    .trim();
}

function uniqueSummary(a) {
  const sub = (a.subtitle || "").trim();
  const sum = (a.summary || "").trim();
  const fsSub = firstSent(sub);
  const fsSum = firstSent(sum);
  if (fsSum && fsSum !== fsSub && !sum.startsWith(sub.replace(/。$/, ""))) return sum;
  const pool = [
    a.phenomenon?.appearance,
    a.phenomenon?.conditions,
    a.fieldCheck,
    (a.dontDo || [])[0],
    a.card,
  ]
    .filter(Boolean)
    .flatMap((s) =>
      String(s)
        .split(/[。！？]/)
        .map((x) => x.trim())
        .filter(Boolean),
    );
  const extra = pool.find((s) => firstSent(s) !== fsSub && s !== sub && !sub.includes(s) && s.length >= 8);
  if (!extra) return sum;
  return extra.endsWith("。") ? extra : extra + "。";
}

const PHOTO_FIX = {
  "yan-jian": {
    keep: "/images/articles/yan-jian-2.jpg",
    kind: "field",
    alt: "盐碱地土面白霜",
    caption: "田里土面白霜，要和出苗、叶缘一起看。",
    miss: "待补：请拍整垄白霜和出苗对照。",
  },
  "ban-jie": {
    keep: "/images/articles/ban-jie-2.jpg",
    kind: "field",
    alt: "旱田土面干裂",
    caption: "旱田土面干裂，缝宽、土硬。",
    miss: "待补：请拍雨后结皮和锄不动的土面。",
  },
  "ce-tu-bao-gao": {
    keep: "/images/articles/ce-tu-bao-gao-2.jpg",
    kind: "lab",
    alt: "中文化验单 pH 有机质 碱解氮 有效磷 速效钾",
    caption: "中文化验单：pH、有机质、碱解氮、有效磷、速效钾。实验室对照，不是自家地头。",
    miss: "待补：请拍自家中文测土单（mg/kg 或 g/kg）。",
  },
};

const FILE_COPY = [
  ["public/images/articles/yan-jian-2.jpg", "public/images/articles/yan-jian.jpg"],
  ["public/images/articles/ban-jie-2.jpg", "public/images/articles/ban-jie.jpg"],
  ["public/images/articles/ce-tu-bao-gao-2.jpg", "public/images/articles/ce-tu-bao-gao.jpg"],
];
for (const [src, dest] of FILE_COPY) {
  if (existsSync(src)) copyFileSync(src, dest);
}

for (const a of articles) {
  Object.assign(a, walkReplace(a, ZH_PAIRS));
  a.summary = uniqueSummary(a);
  const fix = PHOTO_FIX[a.slug];
  if (fix) {
    a.photos = [
      { src: fix.keep, alt: fix.alt, caption: fix.caption, kind: fix.kind },
      { src: "", alt: fix.miss, caption: fix.miss, kind: "missing" },
    ];
  }
}

for (const c of index) {
  const a = articles.find((x) => x.slug === c.slug);
  if (!a) continue;
  c.title = a.title;
  c.subtitle = a.subtitle;
  c.summary = a.summary;
  if (a.card) c.card = a.card;
  c.photos = (a.photos || []).filter((p) => p.kind !== "missing").map((p) => ({ src: p.src, alt: p.alt }));
}

for (const slug of Object.keys(enrich)) {
  enrich[slug] = walkReplace(enrich[slug], ZH_PAIRS);
}

for (const slug of Object.keys(overlay)) {
  overlay[slug] = walkReplace(overlay[slug], EN_PAIRS);
  overlay[slug] = walkReplace(overlay[slug], ZH_PAIRS);
}
for (const slug of Object.keys(meta)) {
  meta[slug] = walkReplace(meta[slug], EN_PAIRS);
}

for (const id of Object.keys(wiki)) {
  wiki[id] = walkReplace(wiki[id], ZH_PAIRS);
  wiki[id] = walkReplace(wiki[id], EN_PAIRS);
}

if (wiki.na?.zh) {
  wiki.na.zh.steps = [
    "白霜先当盐分线索，钠高才是碱化。",
    "交换性钠要和 CEC 一起看，不要只看土面白不白。",
    "没测钠不要一律撒石膏。没排水不要大水漫灌。",
  ];
}
if (wiki.alkn?.en) {
  wiki.alkn.en.subtitle = "Available nitrogen on the sheet is this season’s supply, not a prescription.";
  wiki.alkn.en.summary = "Available nitrogen on the sheet is this season’s supply, not a prescription.";
}
if (wiki.fc?.en) {
  wiki.fc.en.subtitle = "Field capacity is how much water stays after drainage.";
  wiki.fc.en.summary = "Field capacity is how much water stays after drainage. Irrigating past it waterlogs the root.";
}
if (wiki.om?.zh?.spoken?.length) {
  wiki.om.zh.spoken[0] = "有机质是土壤里的有机物质含量，不是菌剂商品名。";
}

for (let i = 0; i < posts.length; i++) posts[i] = walkReplace(posts[i], ZH_PAIRS);

const ADD_EN = {
  "que-meng": "Do not guess manganese from one yellow leaf.",
  "miao-qi-fei-hai": "Do not add another bag to the same furrow.",
  "lv-hai": "Chloride-sensitive crops should not get potassium chloride.",
  "shi-hui-xing-tu": "Do not keep pouring the same bag on high pH.",
  "qian-yu-tian": "Drain first. Do not treat this as drought.",
  "huang-ye-jian-bie": "Split old leaves from new leaves before you open a bag.",
  "guo-yuan-tu-rang": "Read the orchard sheet. Do not copy a neighbour’s rate.",
  "hong-huang-rang-gai-suan": "On grain land, lime only below about 5.5.",
  "suan-yu-que-gai": "Bald tips are not a simple calcium spray job.",
  "lv-fei-fan-ya": "Read the label. This is not a nitrogen shortage.",
  "jie-gan-bu-dan": "Carbon without a little nitrogen is a tug-of-war at the seedling.",
  "cao-mei-lian-zuo": "Rotate the family. Do not only buy a microbial product.",
  "nan-fang-shui-tian-yang-fen": "Read the sheet. Do not stack the same salt.",
};
for (const [slug, line] of Object.entries(ADD_EN)) {
  const e = enrich[slug] || (enrich[slug] = {});
  const en = e.speakEn || e.spokenEn || [];
  if (en.length < 6 && !en.includes(line)) {
    e.speakEn = [...en, line];
    e.spokenEn = e.speakEn;
  }
}

save("src/data/articles.json", articles);
save("src/data/articles-index.json", index);
save("src/data/enrich.json", enrich);
save("src/data/articles-en.json", overlay);
save("src/data/articles-en-meta.json", meta);
writeFileSync("src/data/wiki.json", JSON.stringify(wiki));
save("src/data/posts.json", posts);

let dups = 0;
for (const a of articles) {
  if (firstSent(a.summary) === firstSent(a.subtitle)) dups++;
}
console.log("subtitle==summary remaining", dups);
console.log("ok qa-full-20260916");
