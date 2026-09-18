import wikiJson from "@/data/wiki.json";
import groupsJson from "@/data/lab-groups.json";
import unitsJson from "@/data/lab-units.json";
import type { Lang } from "@/lib/i18n/lang";
import { cleanEn, cleanEnArr } from "@/lib/i18n/han";
import type { Photo, WikiCopy, WikiPack } from "./types";

export const WIKI = wikiJson as Record<string, WikiPack>;
export const LAB_GROUPS = groupsJson as { id: string; title: string; titleEn: string; ids: string[] }[];
export const LAB_UNITS = unitsJson as Record<string, { zh: string; en: string }>;

export const TERMS = Object.values(WIKI);

export function getTerm(id: string) {
  return WIKI[id];
}

function localizeWikiPhotos(term: WikiPack, lang: Lang, title: string): Photo[] {
  return term.photos.map((p) => {
    if (lang !== "en") return p;
    const close = /特写/.test(p.alt) || /特写/.test(p.caption);
    return {
      ...p,
      alt: p.altEn || (close ? `${title} close-up` : `${title} field check`),
      caption: p.captionEn || p.caption,
    };
  });
}

export function localizeTerm(term: WikiPack, lang: Lang): WikiCopy & { id: string; photos: WikiPack["photos"]; relatedSlugs: string[]; bvid?: string; videoTitle?: string; unit: string } {
  const raw = lang === "en" ? term.en : term.zh;
  const copy =
    lang === "en"
      ? {
          ...raw,
          title: cleanEn(raw.title),
          subtitle: cleanEn(raw.subtitle),
          summary: cleanEn(raw.summary),
          appearance: cleanEn(raw.appearance),
          conditions: cleanEn(raw.conditions),
          commonCrops: cleanEn(raw.commonCrops),
          fieldCheck: cleanEn(raw.fieldCheck),
          longform: cleanEnArr(raw.longform),
          plainExplain: cleanEn(raw.plainExplain),
          natural: cleanEnArr(raw.natural),
          human: cleanEnArr(raw.human),
          steps: cleanEnArr(raw.steps),
          dontDo: cleanEnArr(raw.dontDo),
          whenToTest: cleanEn(raw.whenToTest),
          prevention: cleanEnArr(raw.prevention),
          aka: raw.aka ? cleanEn(raw.aka) : raw.aka,
          spoken: cleanEnArr(raw.spoken),
        }
      : raw;
  const unit = LAB_UNITS[term.id];
  return {
    ...copy,
    id: term.id,
    photos: localizeWikiPhotos(term, lang, copy.title),
    relatedSlugs: term.relatedSlugs,
    bvid: term.bvid,
    videoTitle: term.videoTitle,
    unit: lang === "en" ? cleanEn(unit?.en ?? "") : (unit?.zh ?? ""),
  };
}

export function searchTerms(q: string) {
  const raw = q.trim();
  const h = raw.toLowerCase().replace(/\s+/g, "");
  if (!h) return TERMS;
  const phNum = /ph\s*\d/.test(raw.toLowerCase()) || h.includes("ph5") || h.includes("酸碱");
  return TERMS.filter((t) => {
    const aka = `${t.zh.aka ?? ""} ${t.en.aka ?? ""}`.toLowerCase();
    const blob = foldTerm(t);
    if (phNum && t.id === "ph") return true;
    if (h.includes("碱解氮") && t.id === "alkn") return true;
    if ((h.includes("交换性钠") || h === "na") && t.id === "na") return true;
    return (
      t.id.includes(h) ||
      blob.includes(h) ||
      aka.replace(/\s+/g, "").includes(h) ||
      t.zh.title.toLowerCase().includes(raw.toLowerCase()) ||
      t.en.title.toLowerCase().includes(h) ||
      t.zh.summary.includes(raw) ||
      t.en.summary.toLowerCase().includes(h) ||
      t.zh.appearance.includes(raw) ||
      (t.zh.aka ?? "").toLowerCase().includes(h) ||
      (t.en.aka ?? "").toLowerCase().includes(h)
    );
  });
}

function foldTerm(t: { id: string; zh: WikiCopy; en: WikiCopy }) {
  return `${t.id}${t.zh.title}${t.en.title}${t.zh.aka ?? ""}${t.en.aka ?? ""}${t.zh.summary}${t.zh.appearance}`.toLowerCase().replace(/\s+/g, "");
}
