import articlesJson from "@/data/articles.json";
import aliasesJson from "@/data/aliases.json";
import { CROPS, PROBLEMS, REGIONS, SEASONS } from "@/lib/constants";
import type { Article, SearchQuery } from "./types";

export const ARTICLES = articlesJson as Article[];
const ALIASES = aliasesJson as Record<string, string[]>;

function fold(s: string) {
  return s.toLowerCase().replace(/\s+/g, "");
}

function haystack(a: Article) {
  const extra = (ALIASES[a.slug] ?? []).join("");
  return fold(
    [
      a.title,
      a.subtitle,
      a.summary,
      a.tags.join(""),
      a.problems.join(""),
      a.crops.join(""),
      a.phenomenon.conditions,
      a.phenomenon.commonCrops,
      extra,
    ].join(""),
  );
}

export function scoreArticle(a: Article, q: string): number {
  if (!q) return 1;
  const n = fold(q);
  if (!n) return 1;
  const aliases = ALIASES[a.slug] ?? [];
  let i = 0;
  for (const e of aliases) {
    const t = fold(e);
    if (t === n) i += 24;
    else if (t.includes(n) || n.includes(t)) i += 16;
  }
  if (haystack(a).includes(n)) i += 10;
  if (fold(a.title).includes(n)) i += 8;
  if (fold(a.summary).includes(n)) i += 4;
  for (const tag of a.tags) {
    const e = fold(tag);
    if (n === e || e.includes(n) || n.includes(e)) i += 6;
  }
  return i;
}

export function filterArticles(q: SearchQuery): Article[] {
  const text = q.q?.trim() ?? "";
  const lang = q.lang === "en" ? "en" : "zh";
  return ARTICLES.filter((a) => {
    if (q.crop && q.crop !== "全部" && !a.crops.includes(q.crop) && !a.crops.includes("全国")) {
      return false;
    }
    if (q.problem && q.problem !== "全部") {
      if (q.problem === "酸化") {
        if (a.problems[0] !== "酸化") return false;
      } else if (a.problems[0] !== q.problem && !a.problems.includes(q.problem)) {
        return false;
      }
    }
    if (q.region && q.region !== "全部" && !a.regions.includes(q.region) && !a.regions.includes("全国")) {
      return false;
    }
    if (q.season && q.season !== "全部" && !a.seasons.includes(q.season) && !a.seasons.includes("全年")) {
      return false;
    }
    if (text && scoreArticle(a, text) < 6) return false;
    return true;
  }).sort((a, b) => {
    if (text) return scoreArticle(b, text) - scoreArticle(a, text);
    if (!!b.featured === !!a.featured) return a.title.localeCompare(b.title, lang === "en" ? "en" : "zh");
    return b.featured ? 1 : -1;
  });
}

export function facetCounts(base: SearchQuery = {}) {
  const problems: Record<string, number> = {};
  const crops: Record<string, number> = {};
  const regions: Record<string, number> = {};
  const seasons: Record<string, number> = {};
  for (const p of PROBLEMS) problems[p] = filterArticles({ ...base, problem: p }).length;
  for (const c of CROPS) crops[c] = filterArticles({ ...base, crop: c }).length;
  for (const r of REGIONS) regions[r] = filterArticles({ ...base, region: r }).length;
  for (const s of SEASONS) seasons[s] = filterArticles({ ...base, season: s }).length;
  return { problems, crops, regions, seasons };
}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(a: Article, n = 3): Article[] {
  const fromSlugs = a.relatedSlugs.map(getArticle).filter((x): x is Article => !!x);
  if (fromSlugs.length >= n) return fromSlugs.slice(0, n);
  const extra = ARTICLES.filter((t) => t.slug !== a.slug && !fromSlugs.some((x) => x.slug === t.slug))
    .map((t) => {
      let s = 0;
      if (t.problems[0] && t.problems[0] === a.problems[0]) s += 4;
      for (const tag of a.tags) if (t.tags.includes(tag)) s += 2;
      for (const c of a.crops) if (t.crops.includes(c)) s += 1;
      return { a: t, s };
    })
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s);
  return [...fromSlugs, ...extra.map((x) => x.a)].slice(0, n);
}

export function hotArticles(n = 6) {
  return ARTICLES.filter((a) => a.hot || a.featured).slice(0, n);
}

export function indicatorTermId(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("ph")) return "ph";
  if (n.includes("ec") || n.includes("电导")) return "ec";
  if (n.includes("有机质") || n.includes("organic")) return "om";
  if (n.includes("交换性铝") || n.includes("铝")) return "al";
  if (n.includes("交换性钠") || n.includes("钠") || n.includes("esp")) return "na";
  if (n.includes("全盐") || n.includes("盐")) return "salt";
  if (n.includes("容重")) return "bulk";
  if (n.includes("碱解氮")) return "alkn";
  if (n.includes("有效磷")) return "avp";
  if (n.includes("有效钾") || n.includes("速效钾")) return "avk";
  if (n.includes("全氮") || n === "n") return "n";
  if (n.includes("全磷")) return "p";
  if (n.includes("全钾")) return "k";
  if (n.includes("钙")) return "ca";
  if (n.includes("镁")) return "mg";
  if (n.includes("铁")) return "fe";
  if (n.includes("锰")) return "mn";
  if (n.includes("锌")) return "zn";
  if (n.includes("硼")) return "b";
  if (n.includes("硫")) return "s";
  if (n.includes("铜")) return "cu";
  if (n.includes("钼")) return "mo";
  if (n.includes("质地")) return "texture";
  if (n.includes("cec") || n.includes("阳离子")) return "cec";
  return "test";
}
