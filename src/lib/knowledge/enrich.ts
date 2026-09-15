import extraJson from "@/data/enrich.json";
import { clipSpoken } from "@/lib/tts/speak";
import type { Article, DoseRow, LabRow } from "./types";

type Extra = {
  appearance?: string;
  mechanism?: string;
  example?: string;
  doseTable?: DoseRow[];
  labTable?: LabRow[];
  spoken?: string[];
  spokenHow?: string[];
  spokenEn?: string[];
  spokenHowEn?: string[];
  speakZh?: string[];
  speakEn?: string[];
  howtoSpeakZh?: string[];
  howtoSpeakEn?: string[];
  author?: string;
  sources?: string[];
  sourcesEn?: string[];
  doseRefSlug?: string | null;
  updatedAt?: string;
};

const EXTRA = extraJson as Record<string, Extra>;

/** Full-page listen only. Never include numbered steps. */
export function autoSpoken(a: Article): string[] {
  return clipSpoken(
    [a.phenomenon.appearance, a.confuse[0]?.difference, ...(a.dontDo ?? []).slice(0, 2)].filter(
      (s): s is string => !!s && !/^\s*\d+\s*[）).、]/.test(s),
    ),
  );
}

function nonempty(list?: string[]) {
  return list && list.length ? list : undefined;
}

export function enrichArticle(a: Article): Article {
  const e = EXTRA[a.slug] ?? {};
  const appearance = e.appearance || a.phenomenon.appearance;
  const speakZh = nonempty(e.speakZh) ?? nonempty(e.spoken) ?? nonempty(a.speakZh) ?? nonempty(a.spoken);
  const speakEn = nonempty(e.speakEn) ?? nonempty(e.spokenEn) ?? nonempty(a.speakEn) ?? nonempty(a.spokenEn);
  const howtoSpeakZh = nonempty(e.howtoSpeakZh) ?? nonempty(e.spokenHow) ?? nonempty(a.howtoSpeakZh) ?? nonempty(a.spokenHow);
  const howtoSpeakEn = nonempty(e.howtoSpeakEn) ?? nonempty(e.spokenHowEn) ?? nonempty(a.howtoSpeakEn) ?? nonempty(a.spokenHowEn);
  const merged: Article = {
    ...a,
    phenomenon: { ...a.phenomenon, appearance },
    mechanism: e.mechanism ?? a.mechanism,
    example: e.example ?? a.example,
    doseTable: e.doseTable ?? a.doseTable,
    labTable: e.labTable ?? a.labTable,
    author: e.author ?? a.author,
    sources: e.sources ?? a.sources,
    sourcesEn: e.sourcesEn,
    doseRefSlug: e.doseRefSlug === null ? undefined : (e.doseRefSlug ?? a.doseRefSlug),
    updatedAt: e.updatedAt ?? a.updatedAt,
    spoken: speakZh,
    spokenHow: howtoSpeakZh,
    spokenEn: speakEn,
    spokenHowEn: howtoSpeakEn,
    speakZh,
    speakEn,
    howtoSpeakZh,
    howtoSpeakEn,
  };
  if (!merged.speakZh?.length) {
    const auto = autoSpoken(merged);
    merged.speakZh = auto;
    merged.spoken = auto;
  }
  if (!merged.howtoSpeakZh?.length) {
    const how = clipSpoken((merged.solutions.steps ?? []).map((s) => s.replace(/^\s*\d+\s*[）).、]\s*/, "")));
    merged.howtoSpeakZh = how;
    merged.spokenHow = how;
  }
  return merged;
}

export function listSpokenForExport(a: Article): { zh: string[]; en: string[] } {
  return { zh: a.speakZh ?? a.spoken ?? [], en: a.speakEn ?? a.spokenEn ?? [] };
}
