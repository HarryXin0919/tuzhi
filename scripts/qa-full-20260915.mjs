#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const load = (p) => JSON.parse(readFileSync(p, "utf8"));
const save = (p, d) => writeFileSync(p, JSON.stringify(d, null, 2) + "\n");
const saveMini = (p, d) => writeFileSync(p, JSON.stringify(d));

const articles = load("src/data/articles.json");
const index = load("src/data/articles-index.json");
const enrich = load("src/data/enrich.json");
const meta = load("src/data/articles-en-meta.json");
const overlay = load("src/data/articles-en.json");
const wiki = load("src/data/wiki.json");
const posts = load("src/data/posts.json");
const videos = load("src/data/videos.json");

function zhFix(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/示意图，不能单凭此图下肥。?/g, "")
    .replace(/到地里先看三样[^。]*。/g, "")
    .replace(/邻县石灰账/g, "用量要对自家质地")
    .replace(/邻县袋子不能直接抄。?/g, "用量要对自家质地，不要照搬别家田的袋数。")
    .replace(/邻县袋子对不上自家质地。?/g, "用量要对自家质地。")
    .replace(/邻县袋子/g, "别家田的袋数")
    .replace(/盐的名片/g, "盐分的线索")
    .replace(/越来越醋/g, "一年年更酸")
    .replace(/腌根/g, "让根吸水费劲")
    .replace(/一包浆/g, "一层稀泥")
    .replace(/晴天像砖/g, "干了发硬")
    .replace(/膘掉了/g, "有机质在变少")
    .replace(/肉薄了/g, "有机质低了")
    .replace(/1）1\s*/g, "")
    .replace(/一袋菌/g, "菌剂产品")
    .replace(/根尖像被烫过，发褐、秃、不伸。?/g, "根尖发褐、发秃，侧根很少。")
    .replace(/搓一把：浅、粉、团不住。?/g, "搓一把土：颜色浅、发粉、搓不成团。")
    .replace(/秧苗发僵，浇水有点锈/g, "秧苗发僵不长，浇水有时带锈水")
    .replace(/家底不是菌剂产品的名字/g, "不是菌剂产品的商品名")
    .replace(/有机质是家底，不是菌剂产品的名字。?/g, "有机质是土壤里的有机物质含量，不是某袋菌剂的商品名。")
    .replace(/EC 是咸度计。超了就是在让根吸水费劲，不是缺水。?/g, "电导率看土水有多咸。偏高时根吸水费劲，不要当成单纯干旱。")
    .replace(/超了就是在让根吸水费劲/g, "偏高时根吸水费劲");
}

function enFix(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/pickles the root/gi, "stresses the roots")
    .replace(/house and the meal/gi, "reserve and buffer")
    .replace(/loaf structure/gi, "crumb structure")
    .replace(/season’s plate|season's plate/gi, "this season’s available nitrogen")
    .replace(/breathing road/gi, "pore space")
    .replace(/cup mark/gi, "field-capacity mark");
}

function walk(obj, fixer) {
  if (typeof obj === "string") return fixer(obj);
  if (Array.isArray(obj)) return obj.map((x) => walk(x, fixer));
  if (obj && typeof obj === "object") {
    const n = { ...obj };
    for (const k of Object.keys(n)) n[k] = walk(n[k], fixer);
    return n;
  }
  return obj;
}

function splitSent(s) {
  return String(s || "")
    .split(/(?<=[。！？!?；;])/)
    .map((x) => x.trim())
    .filter((x) => x && !/^\s*\d+\s*[）).、]/.test(x));
}

function ensureSpeak(slug, a, e, g) {
  const pack = e[slug] || (e[slug] = {});
  if (!pack.speakZh || pack.speakZh.length < 6) {
    const lines = [
      ...splitSent(a.phenomenon?.appearance).slice(0, 2),
      a.confuse?.[0]?.difference,
      ...(a.dontDo || []).slice(0, 2),
      a.dosage?.[0] ? `${a.dosage[0].name}，${a.dosage[0].range}`.replace(/^\s*\d+\s*[）).、]/, "") : "",
    ].filter(Boolean);
    pack.speakZh = [...new Set(lines)].slice(0, 10);
  }
  if (!pack.howtoSpeakZh?.length) {
    pack.howtoSpeakZh = (a.solutions?.steps || []).map((s) => s.replace(/^\s*\d+\s*[）).、]\s*/, "")).filter(Boolean).slice(0, 8);
  }
  const og = g[slug] || {};
  const HAN = /[\u4e00-\u9fff]/;
  if (!pack.speakEn || pack.speakEn.length < 5) {
    const lines = [og.appearance, og.confuse?.[0]?.difference, ...(og.dontDo || []).slice(0, 2), og.dosage?.[0] ? `${og.dosage[0].name}. ${og.dosage[0].range}` : ""]
      .flatMap((s) => splitSent(s))
      .filter((s) => s && !HAN.test(s));
    if (lines.length) pack.speakEn = [...new Set(lines)].slice(0, 10);
  }
  if (!pack.howtoSpeakEn?.length && og.steps?.length) {
    pack.howtoSpeakEn = og.steps.map((s) => s.replace(/^\s*\d+\s*[).]\s*/, "")).filter((s) => s && !HAN.test(s)).slice(0, 8);
  }
}

const BAD = {
  "yan-jian": ["/images/articles/yan-jian.jpg"],
  "ban-jie": ["/images/articles/ban-jie.jpg"],
  "ce-tu-bao-gao": ["/images/articles/ce-tu-bao-gao.jpg"],
};

for (const a of articles) {
  a.title = zhFix(a.title);
  a.subtitle = zhFix(a.subtitle);
  a.summary = zhFix(a.summary);
  if (a.card) a.card = zhFix(a.card);
  a.photos = (a.photos || []).map((p) => {
    const src = p.src || "";
    const drop = (BAD[a.slug] || []).includes(src);
    let kind = p.kind;
    let caption = zhFix(p.caption || "");
    let alt = zhFix(p.alt || "");
    if (a.slug === "suan-hua" && /suan-hua/.test(src)) {
      kind = "lab";
      caption = "实验室根部对照，不是地头邻垄。";
      alt = "实验室麦苗根部对照";
    }
    if (a.slug === "ce-tu-bao-gao" && src.includes("ce-tu-bao-gao-2")) kind = "lab";
    if (a.slug === "ban-jie" && src.includes("ban-jie-2")) {
      kind = "diagram";
      caption = "硬土与锄的示意图。";
    }
    if (drop) {
      return { src: "", alt: alt || "待补田间照片", caption: "待补：请拍整垄 / 根尖 / 土面。", kind: "missing" };
    }
    return { ...p, src, alt, caption, kind: kind || "field" };
  });
  if (a.slug === "ce-tu-bao-gao") {
    a.photos = a.photos.sort((x, y) => Number(Boolean(!x.src)) - Number(Boolean(!y.src)));
  }
  a.phenomenon = walk(a.phenomenon, zhFix);
  a.confuse = walk(a.confuse, zhFix);
  a.causes = walk(a.causes, zhFix);
  a.solutions = { ...a.solutions, steps: (a.solutions?.steps || []).map((s) => zhFix(s.replace(/^\s*1）1\s*/, ""))) };
  a.dontDo = (a.dontDo || []).map(zhFix);
  a.longform = (a.longform || []).map(zhFix);
  a.fieldCheck = zhFix(a.fieldCheck);
  a.prevention = (a.prevention || []).map(zhFix);
  ensureSpeak(a.slug, a, enrich, overlay);
}

for (const c of index) {
  const a = articles.find((x) => x.slug === c.slug);
  if (!a) continue;
  c.title = a.title;
  c.subtitle = a.subtitle;
  c.summary = a.summary;
  if (a.card) c.card = a.card;
  c.photos = a.photos.map((p) => ({ src: p.src, alt: p.alt }));
}

for (const slug of Object.keys(enrich)) enrich[slug] = walk(enrich[slug], zhFix);
for (const slug of Object.keys(meta)) meta[slug] = walk(meta[slug], enFix);
for (const slug of Object.keys(overlay)) {
  overlay[slug] = walk(overlay[slug], enFix);
  const g = overlay[slug];
  if (!g.appearance && meta[slug]?.summary) g.appearance = meta[slug].summary;
  if (!g.steps?.length) g.steps = ["Read the field first.", "Match this guide before you open a bag.", "Ask a local agronomist for the rate."];
  if (!g.dontDo?.length) g.dontDo = ["Do not copy a neighbour’s bag count.", "Do not treat this page as a prescription."];
  if (!g.confuse?.length) g.confuse = [{ lookalike: "A different shortage or injury", difference: "Split leaf position, roots and the soil surface before you open a bag." }];
}

wiki.ec.zh.subtitle = "电导率看土水有多咸。偏高时根吸水费劲，不要当成单纯干旱。";
wiki.ec.zh.summary = wiki.ec.zh.subtitle;
wiki.om.zh.subtitle = "有机质是土壤里的有机物质含量，不是某袋菌剂的商品名。";
wiki.om.zh.summary = wiki.om.zh.subtitle;
for (const id of Object.keys(wiki)) {
  wiki[id].zh = walk(wiki[id].zh, zhFix);
  wiki[id].en = walk(wiki[id].en, enFix);
}

for (const p of posts) {
  p.title = zhFix(p.title);
  p.body = zhFix(p.body);
  if (p.titleEn) p.titleEn = enFix(p.titleEn);
  if (p.bodyEn) p.bodyEn = enFix(p.bodyEn);
  for (const a of p.answers || []) {
    a.body = zhFix(a.body);
    if (a.bodyEn) a.bodyEn = enFix(a.bodyEn);
  }
}
if (posts[0] && /秧苗发僵/.test(posts[0].title + posts[0].body)) {
  posts[0].title = "秧苗发僵不长，浇水有时带锈水，邻垄还绿";
  posts[0].body = "玉米苗发僵，根尖发褐发秃。邻垄还绿。浇水有时带一点锈水。想先分是酸化还是缺肥。";
}

for (const [slug, m] of Object.entries(videos.articles || {})) {
  m.queries = [];
}
for (const [id, m] of Object.entries(videos.wiki || {})) {
  m.queries = [];
}

save("src/data/articles.json", articles);
save("src/data/articles-index.json", index);
save("src/data/enrich.json", enrich);
save("src/data/articles-en-meta.json", meta);
save("src/data/articles-en.json", overlay);
saveMini("src/data/wiki.json", wiki);
save("src/data/posts.json", posts);
save("src/data/videos.json", videos);
console.log("ok qa-full");
