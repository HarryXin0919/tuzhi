#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";

function load(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}
function save(p, data, pretty = true) {
  writeFileSync(p, pretty ? JSON.stringify(data, null, 2) + "\n" : JSON.stringify(data), "utf8");
}

const pairs = [
  [/雨后一包浆，晴天像砖。/g, "雨后土面发黏成糊，晴天干硬难锄。"],
  [/有机质是家底，不是菌剂产品的名字。/g, "有机质是土壤里的有机物质含量，不是某袋菌剂的商品名。"],
  [/洗出来的根尖像被烫过：发褐、秃、不伸。/g, "洗出来的根尖发褐、发秃，侧根很少。"],
  [/根尖像被烫过：发褐、秃、不伸。/g, "根尖发褐、发秃，侧根很少。"],
  [/根尖像被烫过/g, "根尖发褐发秃"],
  [/会不会腌根/g, "会不会让根吸水费劲"],
  [/超了就是腌根/g, "偏高时根吸水费劲"],
  [/EC 超了就是在腌根。/g, "电导偏高时根吸水费劲，不要当成更有劲。"],
  [/浓度高了就是在腌根。/g, "浓度高了根吸水费劲。"],
  [/黑土的黑就是肉，肉薄了化肥也撑不住。/g, "黑土层变薄以后，化肥也留不住。"],
  [/有机质是肉，EC 是咸。/g, "有机质是储量，电导是咸度。"],
  [/有机质是肉。/g, "有机质是土壤里的有机物质含量。"],
  [/交换性铝是酸土里的牙。/g, "交换性铝在强酸土里会伤根尖。"],
  [/铝毒是尖被咬掉/g, "铝毒是根尖伤掉"],
  [/铝才出来咬/g, "铝才溶出来伤根"],
];

function rewrite(s) {
  if (typeof s !== "string") return s;
  let out = s;
  for (const [re, to] of pairs) out = out.replace(re, to);
  return out;
}
function walk(x) {
  if (typeof x === "string") return rewrite(x);
  if (Array.isArray(x)) return x.map(walk);
  if (x && typeof x === "object") {
    const n = {};
    for (const k of Object.keys(x)) n[k] = walk(x[k]);
    return n;
  }
  return x;
}

const articles = walk(load("src/data/articles.json"));
const index = walk(load("src/data/articles-index.json"));
const enrich = walk(load("src/data/enrich.json"));
const overlay = walk(load("src/data/articles-en.json"));
const posts = walk(load("src/data/posts.json"));
let wiki = walk(load("src/data/wiki.json"));

function setPhotos(slug, photos) {
  const a = articles.find((x) => x.slug === slug);
  if (a) a.photos = photos;
  const i = index.find((x) => x.slug === slug);
  if (i) i.photos = photos.map((p) => ({ src: p.src, alt: p.alt }));
}

if (existsSync("public/images/articles/yan-jian-2.jpg") && !existsSync("public/images/articles/yan-jian.jpg")) {
  copyFileSync("public/images/articles/yan-jian-2.jpg", "public/images/articles/yan-jian.jpg");
}
if (existsSync("public/images/articles/ban-jie-2.jpg") && !existsSync("public/images/articles/ban-jie.jpg")) {
  copyFileSync("public/images/articles/ban-jie-2.jpg", "public/images/articles/ban-jie.jpg");
}
if (existsSync("public/images/articles/ce-tu-bao-gao-2.jpg") && !existsSync("public/images/articles/ce-tu-bao-gao.jpg")) {
  copyFileSync("public/images/articles/ce-tu-bao-gao-2.jpg", "public/images/articles/ce-tu-bao-gao.jpg");
}

setPhotos("yan-jian", [
  {
    src: "/images/articles/yan-jian.jpg",
    alt: "田里土面一层白霜",
    caption: "田里土面一层白霜。",
    kind: "field",
  },
  {
    src: "/images/articles/yan-jian-2.jpg",
    alt: "盐碱地土面白霜特写",
    caption: "白霜要和出苗、叶缘一起看。",
    kind: "field",
  },
]);
setPhotos("ban-jie", [
  {
    src: "/images/articles/ban-jie.jpg",
    alt: "旱田土面干裂",
    caption: "旱田土面干裂，缝宽、土硬。",
    kind: "field",
  },
  {
    src: "/images/articles/ban-jie-2.jpg",
    alt: "干裂土面特写",
    caption: "干裂后跑墒，苗也难顶出来。",
    kind: "field",
  },
]);
setPhotos("ce-tu-bao-gao", [
  {
    src: "/images/articles/ce-tu-bao-gao.jpg",
    alt: "中文化验单 pH 有机质 碱解氮 有效磷 速效钾",
    caption: "中文化验单：pH、有机质、碱解氮、有效磷、速效钾，单位 g/kg 或 mg/kg。",
    kind: "lab",
  },
]);
setPhotos("suan-hua", [
  {
    src: "/images/articles/suan-hua.jpg",
    alt: "实验室麦苗根部对照",
    caption: "实验室根部对照，不是地头邻垄。",
    kind: "lab",
  },
  {
    src: "/images/articles/suan-hua-2.jpg",
    alt: "实验室麦苗根部对照",
    caption: "实验室根部对照，不是地头邻垄。",
    kind: "lab",
  },
]);

const yj = articles.find((x) => x.slug === "you-ji-zhi");
if (yj) {
  yj.photos = [
    {
      src: "/images/articles/you-ji-zhi.jpg",
      alt: "浅色麦田土面",
      caption: "浅色麦田，土面发干。",
      kind: "field",
    },
  ];
}
const yji = index.find((x) => x.slug === "you-ji-zhi");
if (yji && yj) yji.photos = yj.photos.map((p) => ({ src: p.src, alt: p.alt }));

for (const p of posts) {
  if (p.photo === "/images/articles/yan-jian.jpg") p.photo = "/images/articles/yan-jian.jpg";
}

if (wiki.al?.zh) {
  wiki.al.zh.subtitle = "交换性铝在强酸土里会伤根尖。治本是改酸，不是再追氮。";
  wiki.al.zh.summary = "交换性铝在强酸土里会伤根尖。治本是改酸，不是再追氮。";
}
if (wiki.ph?.zh?.confuse) {
  wiki.ph.zh.confuse = wiki.ph.zh.confuse.map((c) => ({
    ...c,
    lookalike: rewrite(c.lookalike),
    difference: rewrite(c.difference),
  }));
}

save("src/data/articles.json", articles);
save("src/data/articles-index.json", index);
save("src/data/enrich.json", enrich);
save("src/data/articles-en.json", overlay);
save("src/data/posts.json", posts);
save("src/data/wiki.json", wiki, false);

const enUnique = "src/data/en-unique-strings.json";
if (existsSync(enUnique)) {
  save(enUnique, walk(load(enUnique)));
}

console.log("qa-copy-20260916 ok");
