import articlesJson from "@/data/articles.json";
import aliasesJson from "@/data/aliases.json";
import metaJson from "@/data/articles-en-meta.json";
import { PROBLEMS } from "@/lib/constants";
import { enrichArticle } from "./enrich";
import { resolveSlug } from "./slugs";
import type { Article, SearchQuery } from "./types";

export const ARTICLES = articlesJson as Article[];
const ALIASES = aliasesJson as Record<string, string[]>;
const META = metaJson as Record<string, { title: string; subtitle: string; summary: string }>;

function fold(s: string) {
  return s.toLowerCase().replace(/\s+/g, "");
}

function haystack(a: Article) {
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
      a.phenomenon.conditions,
      a.phenomenon.commonCrops,
      extra,
      m?.title ?? "",
      m?.subtitle ?? "",
      m?.summary ?? "",
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
  for (const p of PROBLEMS) problems[p] = filterArticles({ ...base, problem: p }).length;
  return { problems };
}

export { resolveSlug } from "./slugs";

export function getArticle(slug: string) {
  const a = ARTICLES.find((x) => x.slug === resolveSlug(slug));
  return a ? enrichArticle(a) : undefined;
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

export function hardRoute(query: string): string[] {
  const q = query;
  const out: string[] = [];
  const add = (...ids: string[]) => {
    for (const id of ids) if (!out.includes(id)) out.push(id);
  };
  if (/发僵|褐秃|锈水|铝毒|酸化|acid|stunt|bald tip|rusty/i.test(q)) add("suan-hua", "lv-du-shang-gen");
  if (/白霜|发白|盐碱|返盐|出苗不齐|white crust|saline|salt/i.test(q)) add("yan-jian", "fan-yan");
  if (/板结|锄|硬盖|戴帽|compaction|hardpan|brick/i.test(q)) add("ban-jie", "li-di-ceng");
  if (/有机质|发浅|搓一把|organic matter|thin soil/i.test(q)) add("you-ji-zhi");
  if (/老叶.*黄|底下黄|缺氮|old leaves yellow|nitrogen/i.test(q)) add("que-dan", "huang-ye-jian-bie");
  if (/叶缘|火燎|缺钾|scorch|potassium|margin/i.test(q)) add("que-jia", "yan-jian");
  if (/新叶.*黄|叶脉.*绿|缺铁|green vein|iron/i.test(q)) add("que-tie");
  if (/白天蔫|积水|涝|根臭|waterlog|standing water/i.test(q)) add("lao-hai");
  if (/肥粒|烧根|种沟|肥害|fertiliser burn|fertilizer burn/i.test(q)) add("shao-gen", "miao-qi-fei-hai");
  if (/化验单|测土|碱解氮|lab sheet|soil test/i.test(q)) add("ce-tu-bao-gao", "ce-tu-qu-yang");
  return out;
}

export function articleToRagChunk(a: Article): string {
  const dose = a.dosage.map((d) => `${d.name}: ${d.range}. ${d.note}`).join(" | ");
  const mix = a.confuse.map((c) => `${c.lookalike} → ${c.difference}`).join(" | ");
  return [
    `SLUG ${a.slug}`,
    `TITLE ${a.title}`,
    `SEE ${a.phenomenon.appearance}`,
    `MIX ${mix}`,
    `STEPS ${a.solutions.steps.join(" / ")}`,
    `DONT ${a.dontDo.join(" / ")}`,
    `DOSE ${dose}`,
    `IND ${a.indicators.map((i) => `${i.name}:${i.typical}`).join(" / ")}`,
  ].join("\n");
}

export function retrieveForRag(query: string, n = 6): Article[] {
  const hard = hardRoute(query)
    .map(getArticle)
    .filter((x): x is Article => !!x);
  const scored = filterArticles({ q: query }).map((a) => getArticle(a.slug)).filter((x): x is Article => !!x);
  const seen = new Set<string>();
  const out: Article[] = [];
  for (const a of [...hard, ...scored]) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    out.push(a);
    if (out.length >= n) break;
  }
  return out;
}

const LOCKED = new Set(["5.5", "5.2", "6.0", "6", "7.5", "8", "4.5", "50", "150", "750", "2250", "20", "0", "25", "40", "5", "15", "1", "2", "3", "12.4", "0.28"]);

export function allowedNumbersFromArticles(articles: Article[]): Set<string> {
  const out = new Set(LOCKED);
  const blob = articles.map(articleToRagChunk).join("\n");
  for (const m of blob.matchAll(/\d+(?:\.\d+)?/g)) out.add(m[0]);
  return out;
}

export function lockDoseNumbers(text: string, allowed: Set<string>, lang: "zh" | "en"): string {
  const fallback = lang === "en" ? "Read the rate table in the matched guide, then ask a local agronomist." : "去看本篇用量表，问当地农技站。";
  return text.replace(/([^。.!?\n]*?)(\d+(?:\.\d+)?)(\s*(?:公斤|千克|kg|袋|亩|mu))?([^。.!?\n]*[。.!?]?)/gi, (full, _pre, num: string, unit: string | undefined) => {
    if (!unit && !/pH/i.test(full) && !/每亩/.test(full)) return full;
    if (allowed.has(num) || allowed.has(String(Number(num)))) return full;
    return fallback;
  });
}

export function indicatorTermId(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("cec") || n.includes("阳离子交换") || n.includes("交换量") || n.includes("cation exchange")) return "cec";
  if (n.includes("ph")) return "ph";
  if (n.includes("esp") || n.includes("sar") || n.includes("碱化度") || n.includes("钠吸附")) return "esp";
  if (n.includes("交换性钠") || n.includes("ex-na") || n.includes("exna")) return "na";
  if (n.includes("氯离子") || n.includes("chloride") || n.includes("cl-") || n.includes("cl⁻")) return "cl";
  if (n.includes("有效硅") || n.includes("silicon") || n.includes("silica")) return "si";
  if (n.includes("ec") || n.includes("电导") || n.includes("leachate")) return "ec";
  if (n.includes("有机质") || n.includes("organic")) return "om";
  if (n.includes("交换性铝") || n.includes("aluminium") || n.includes("aluminum") || n.includes("铝")) return "al";
  if (n.includes("钠") || n.includes("sodium")) return "na";
  if (n.includes("全盐") || n.includes("total salt") || n.includes("盐")) return "salt";
  if (n.includes("容重") || n.includes("bulk")) return "bulk";
  if (n.includes("碱解氮") || n.includes("alkaline-hydrolysable") || n.includes("水解氮")) return "alkn";
  if (n.includes("有效磷") || n.includes("available phosphorus")) return "avp";
  if (n.includes("有效钾") || n.includes("available potassium") || n.includes("速效钾")) return "avk";
  if (n.includes("全氮") || n === "n") return "n";
  if (n.includes("全磷")) return "p";
  if (n.includes("全钾")) return "k";
  if (n.includes("钙") || n.includes("calcium")) return "ca";
  if (n.includes("镁") || n.includes("magnesium")) return "mg";
  if (n.includes("铁") || n.includes("iron")) return "fe";
  if (n.includes("锰") || n.includes("manganese")) return "mn";
  if (n.includes("锌") || n.includes("zinc")) return "zn";
  if (n.includes("硼") || n.includes("boron")) return "b";
  if (n.includes("硫") || n.includes("sulphur") || n.includes("sulfur")) return "s";
  if (n.includes("铜") || n.includes("copper")) return "cu";
  if (n.includes("钼") || n.includes("molybdenum")) return "mo";
  if (n.includes("质地") || n.includes("texture")) return "texture";
  if (n.includes("交换") || n.includes("exchange")) return "cec";
  if (n.includes("潜育") || n.includes("gley")) return "gley";
  if (n.includes("孔隙") || n.includes("porosity")) return "porosity";
  if (n.includes("持水") || n.includes("field capacity")) return "fc";
  if (n.includes("团粒") || n.includes("aggregate")) return "aggregate";
  if (n.includes("板结") || n.includes("compaction") || n.includes("plough")) return "compaction";
  return "test";
}
