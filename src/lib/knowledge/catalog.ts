import indexJson from "@/data/articles-index.json";
import aliasesJson from "@/data/aliases.json";
import metaJson from "@/data/articles-en-meta.json";
import { CROPS, PROBLEMS, REGIONS, SEASONS } from "@/lib/constants";
import { resolveSlug } from "./slugs";
import type { SearchQuery } from "./types";

export type CardArticle = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  card?: string;
  crops: string[];
  problems: string[];
  regions: string[];
  seasons: string[];
  tags: string[];
  photos: { src: string; alt: string }[];
  hot?: boolean;
  featured?: boolean;
  updatedAt: string;
  relatedSlugs: string[];
  conditions?: string;
  commonCrops?: string;
};

export const CARDS = indexJson as CardArticle[];
const ALIASES = aliasesJson as Record<string, string[]>;
const META = metaJson as Record<string, { title: string; subtitle: string; summary: string; card?: string }>;

function fold(s: string) {
  return s.toLowerCase().replace(/\s+/g, "");
}

function haystack(a: CardArticle) {
  const extra = (ALIASES[a.slug] ?? []).join("");
  const m = META[a.slug];
  return fold(
    [
      a.title,
      a.subtitle,
      a.summary,
      a.tags.join(""),
      a.problems.join(""),
      a.crops.join(""),
      a.conditions ?? "",
      a.commonCrops ?? "",
      extra,
      m?.title ?? "",
      m?.subtitle ?? "",
      m?.summary ?? "",
    ].join(""),
  );
}

export function scoreArticle(a: CardArticle, q: string): number {
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

export function filterArticles(q: SearchQuery): CardArticle[] {
  const text = q.q?.trim() ?? "";
  const lang = q.lang === "en" ? "en" : "zh";
  return CARDS.filter((a) => {
    if (q.crop && q.crop !== "全部" && !a.crops.includes(q.crop)) {
      return false;
    }
    if (q.problem && q.problem !== "全部") {
      if (q.problem === "酸化") {
        if (a.problems[0] !== "酸化") return false;
      } else if (a.problems[0] !== q.problem && !a.problems.includes(q.problem)) {
        return false;
      }
    }
    if (q.region && q.region !== "全部" && !a.regions.includes(q.region)) {
      return false;
    }
    if (q.season && q.season !== "全部" && !a.seasons.includes(q.season)) {
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

export function getCard(slug: string) {
  const id = resolveSlug(slug);
  return CARDS.find((a) => a.slug === id);
}

export function hotArticles(n = 6) {
  return CARDS.filter((a) => a.hot || a.featured).slice(0, n);
}
