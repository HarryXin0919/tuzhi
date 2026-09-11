import overlayJson from "@/data/articles-en.json";
import metaJson from "@/data/articles-en-meta.json";
import { lex } from "@/lib/i18n/lexicon";
import type { Lang } from "@/lib/i18n/lang";
import type { Article, Confuse, Dose, Indicator } from "./types";

type Overlay = {
  appearance?: string;
  conditions?: string;
  plainExplain?: string;
  natural?: string[];
  human?: string[];
  steps?: string[];
  fieldCheck?: string;
  dontDo?: string[];
  whenToTest?: string;
  prevention?: string[];
  longform?: string[];
  summary?: string;
};

const OVERLAY = overlayJson as Record<string, Overlay>;
const META = metaJson as Record<string, { title: string; subtitle: string; summary: string }>;

function pick(en: string | undefined, zh: string, translate: (s: string) => string) {
  return en && en.trim() ? en : translate(zh);
}

function arr(en: string[] | undefined, zh: string[], translate: (s: string) => string) {
  if (en && en.length) return en;
  return zh.map(translate);
}

function fallbackEn(s: string): string {
  return s
    .replace(/别抄邻县石灰账/g, "Don’t copy the next county’s lime recipe")
    .replace(/宁少勿多/g, "better too little than too much")
    .replace(/膜是伞不是镐/g, "the film is an umbrella, not a pickaxe")
    .replace(/土里的肉/g, "the meat in the soil")
    .replace(/pH 是尺子，不是病名/g, "pH is a ruler, not a disease name")
    .replace(/盐的名片/g, "salt’s calling card");
}

export function localizeArticle(a: Article, lang: Lang): Article {
  if (lang !== "en") return a;
  const g = OVERLAY[a.slug] ?? {};
  const m = META[a.slug];
  const t = (s: string) => fallbackEn(s);
  const confuse: Confuse[] = a.confuse.map((c) => ({
    lookalike: lex(c.lookalike, "en") === c.lookalike ? t(c.lookalike) : lex(c.lookalike, "en"),
    difference: t(c.difference),
    photoHint: c.photoHint ? t(c.photoHint) : c.photoHint,
  }));
  const dosage: Dose[] = a.dosage.map((d) => ({
    name: t(d.name),
    range: d.range
      .replace(/每亩/g, "per mu")
      .replace(/公斤/g, "kg")
      .replace(/吨/g, "t"),
    note: t(d.note),
  }));
  const indicators: Indicator[] = a.indicators.map((d) => ({
    name: d.name,
    meaning: t(d.meaning),
    typical: t(d.typical),
  }));
  return {
    ...a,
    title: m?.title ?? t(a.title),
    subtitle: m?.subtitle ?? t(a.subtitle),
    summary: m?.summary ?? g.summary ?? t(a.summary),
    problems: a.problems.map((p) => lex(p, "en")),
    crops: a.crops.map((c) => lex(c, "en")),
    regions: a.regions.map((r) => lex(r, "en")),
    seasons: a.seasons.map((s) => lex(s, "en")),
    photos: a.photos.map((p) => ({ ...p, alt: t(p.alt), caption: t(p.caption) })),
    phenomenon: {
      appearance: pick(g.appearance, a.phenomenon.appearance, t),
      conditions: pick(g.conditions, a.phenomenon.conditions, t),
      commonCrops: t(a.phenomenon.commonCrops),
    },
    confuse,
    causes: {
      natural: arr(g.natural, a.causes.natural, t),
      human: arr(g.human, a.causes.human, t),
      plainExplain: pick(g.plainExplain, a.causes.plainExplain, t),
    },
    solutions: {
      steps: arr(g.steps, a.solutions.steps, t),
      videos: a.solutions.videos,
    },
    dosage,
    prevention: arr(g.prevention, a.prevention, t),
    indicators,
    fieldCheck: pick(g.fieldCheck, a.fieldCheck, t),
    dontDo: arr(g.dontDo, a.dontDo, t),
    whenToTest: pick(g.whenToTest, a.whenToTest, t),
    longform: g.longform?.length ? g.longform : a.longform.map(t),
    reviewer: lex(a.reviewer, "en"),
  };
}
