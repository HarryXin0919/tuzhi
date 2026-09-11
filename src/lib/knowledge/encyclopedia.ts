import wikiJson from "@/data/wiki.json";
import groupsJson from "@/data/lab-groups.json";
import unitsJson from "@/data/lab-units.json";
import type { Lang } from "@/lib/i18n/lang";
import type { WikiCopy, WikiPack } from "./types";

export const WIKI = wikiJson as Record<string, WikiPack>;
export const LAB_GROUPS = groupsJson as { id: string; title: string; titleEn: string; ids: string[] }[];
export const LAB_UNITS = unitsJson as Record<string, { zh: string; en: string }>;

export const TERMS = Object.values(WIKI);

export function getTerm(id: string) {
  return WIKI[id];
}

export function localizeTerm(term: WikiPack, lang: Lang): WikiCopy & { id: string; photos: WikiPack["photos"]; relatedSlugs: string[]; bvid?: string; videoTitle?: string; unit: string } {
  const copy = lang === "en" ? term.en : term.zh;
  const unit = LAB_UNITS[term.id];
  return {
    ...copy,
    id: term.id,
    photos: term.photos,
    relatedSlugs: term.relatedSlugs,
    bvid: term.bvid,
    videoTitle: term.videoTitle,
    unit: lang === "en" ? (unit?.en ?? "") : (unit?.zh ?? ""),
  };
}

export function searchTerms(q: string) {
  const h = q.trim().toLowerCase();
  if (!h) return TERMS;
  return TERMS.filter((t) => {
    return (
      t.id.includes(h) ||
      t.zh.title.toLowerCase().includes(h) ||
      t.en.title.toLowerCase().includes(h) ||
      t.zh.summary.includes(q.trim()) ||
      t.en.summary.toLowerCase().includes(h) ||
      t.zh.appearance.includes(q.trim()) ||
      (t.zh.aka ?? "").toLowerCase().includes(h) ||
      (t.en.aka ?? "").toLowerCase().includes(h)
    );
  });
}
