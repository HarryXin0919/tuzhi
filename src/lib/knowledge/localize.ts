import overlayJson from "@/data/articles-en.json";
import metaJson from "@/data/articles-en-meta.json";
import { lex } from "@/lib/i18n/lexicon";
import { cleanEn, cleanEnArr, dropHanLines } from "@/lib/i18n/han";
import type { Lang } from "@/lib/i18n/lang";
import type { Article, Confuse, Dose, DoseRow, Indicator, LabRow, Photo } from "./types";

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
  commonCrops?: string;
  confuse?: Confuse[];
  dosage?: Dose[];
  photos?: { alt: string; caption: string }[];
  indicators?: Indicator[];
  mechanism?: string;
  example?: string;
  doseTable?: DoseRow[];
  labTable?: LabRow[];
  sources?: string[];
};

const OVERLAY = overlayJson as Record<string, Overlay>;
const META = metaJson as Record<string, { title: string; subtitle: string; summary: string; card?: string }>;

function lexClean(word: string): string {
  const v = lex(word, "en");
  return cleanEn(v) || word;
}

function confuseEn(g: Overlay, a: Article): Confuse[] {
  const src = g.confuse?.length ? g.confuse : [];
  const out: Confuse[] = [];
  for (const c of src) {
    const lookalike = cleanEn(c.lookalike);
    const difference = cleanEn(c.difference);
    if (!lookalike || !difference) continue;
    out.push({
      lookalike,
      difference,
      photoHint: c.photoHint ? cleanEn(c.photoHint) || undefined : undefined,
      photos: (c.photos?.length ? c.photos : a.confuse[out.length]?.photos)?.map((p) => ({
        ...p,
        alt: cleanEn(p.alt) || p.alt,
        caption: cleanEn(p.caption) || p.caption,
      })),
    });
  }
  if (out.length) return out;
  return a.confuse.length ? [] : [];
}

function dosageEn(g: Overlay, a: Article): Dose[] {
  const src = g.dosage?.length ? g.dosage : a.dosage;
  const out: Dose[] = [];
  for (const d of src) {
    const name = cleanEn(d.name) || (g.dosage?.length ? "" : d.name.replace(/[\u4e00-\u9fff]/g, "").trim());
    const range = cleanEn(
      d.range
        .replace(/每亩/g, "per mu")
        .replace(/公斤/g, "kg")
        .replace(/吨/g, "t"),
    );
    const note = cleanEn(d.note);
    if (!range) continue;
    out.push({ name: name || "Rate", range, note });
  }
  return out;
}

function photosEn(g: Overlay, a: Article, title: string): Photo[] {
  return a.photos.map((p, i) => {
    let caption = cleanEn(g.photos?.[i]?.caption);
    if ((p.kind === "lab" || p.kind === "diagram") && /clearest when the next ridge/i.test(caption)) {
      caption = "Lab check, not a neighbour ridge.";
    }
    return {
      ...p,
      alt: cleanEn(g.photos?.[i]?.alt) || p.altEn || title,
      caption: cleanEn(g.photos?.[i]?.caption) || p.captionEn || caption,
    };
  });
}

function indicatorsEn(g: Overlay): Indicator[] {
  if (!g.indicators?.length) return [];
  return g.indicators
    .map((d) => ({
      name: d.name,
      meaning: cleanEn(d.meaning),
      typical: cleanEn(d.typical),
    }))
    .filter((d) => d.meaning || d.typical);
}

function tableEn<T extends DoseRow | LabRow>(rows: T[] | undefined): T[] | undefined {
  if (!rows?.length) return undefined;
  const out = rows.map((row) => {
    const next: Record<string, string> = {};
    let any = false;
    for (const [k, v] of Object.entries(row)) {
      if (typeof v !== "string") {
        next[k] = v as string;
        continue;
      }
      if (k === "id") {
        next[k] = v;
        continue;
      }
      const c = cleanEn(v);
      next[k] = c;
      if (c) any = true;
    }
    return any ? (next as T) : null;
  });
  const kept = out.filter((x): x is T => !!x);
  return kept.length ? kept : undefined;
}

export function localizeArticle(a: Article, lang: Lang): Article {
  if (lang !== "en") {
    return {
      ...a,
      speakZh: a.speakZh ?? a.spoken,
      howtoSpeakZh: a.howtoSpeakZh ?? a.spokenHow,
    };
  }
  const g = OVERLAY[a.slug] ?? {};
  const m = META[a.slug];
  const title = cleanEn(m?.title) || a.slug;
  const speakEn = dropHanLines(a.speakEn ?? a.spokenEn ?? [], a.slug);
  const howtoEn = dropHanLines(a.howtoSpeakEn ?? a.spokenHowEn ?? [], `${a.slug}-how`);
  const sources = cleanEnArr(a.sourcesEn?.length ? a.sourcesEn : g.sources?.length ? g.sources : a.sources);
  return {
    ...a,
    title,
    subtitle: cleanEn(m?.subtitle),
    summary: cleanEn(m?.summary ?? g.summary),
    card: cleanEn(m?.card),
    problems: a.problems.map(lexClean),
    crops: a.crops.map(lexClean),
    regions: a.regions.map(lexClean),
    seasons: a.seasons.map(lexClean),
    photos: photosEn(g, a, title),
    phenomenon: {
      appearance: cleanEn(g.appearance),
      conditions: cleanEn(g.conditions),
      commonCrops: cleanEn(g.commonCrops),
    },
    confuse: confuseEn(g, a),
    causes: {
      natural: cleanEnArr(g.natural),
      human: cleanEnArr(g.human),
      plainExplain: cleanEn(g.plainExplain),
    },
    solutions: {
      steps: cleanEnArr(g.steps),
      videos: a.solutions.videos,
    },
    dosage: dosageEn(g, a),
    prevention: cleanEnArr(g.prevention),
    indicators: indicatorsEn(g),
    fieldCheck: cleanEn(g.fieldCheck),
    dontDo: cleanEnArr(g.dontDo),
    whenToTest: cleanEn(g.whenToTest),
    longform: cleanEnArr(g.longform),
    reviewer: "Author notes; confirm rates with a local station",
    mechanism: cleanEn(g.mechanism) || undefined,
    example: cleanEn(g.example) || undefined,
    doseTable: tableEn(g.doseTable),
    labTable: tableEn(g.labTable),
    spoken: speakEn,
    spokenHow: howtoEn,
    spokenEn: speakEn,
    spokenHowEn: howtoEn,
    speakZh: a.speakZh ?? a.spoken,
    speakEn,
    howtoSpeakZh: a.howtoSpeakZh ?? a.spokenHow,
    howtoSpeakEn: howtoEn,
    author: a.author && /李泽宇/.test(a.author) ? "Li Zeyu" : a.author || "Li Zeyu",
    sources: sources.length ? sources : undefined,
    doseRefSlug: a.doseRefSlug,
  };
}
