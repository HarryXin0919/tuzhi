const FAV = "tuzhi.favorites";
const HIST = "tuzhi.diagnoseHistory";
const FILTERS = "tuzhi-extra-filters";

export function getFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAV) || "[]");
  } catch {
    return [];
  }
}

export function toggleFavorite(slug: string): string[] {
  const cur = getFavorites();
  const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur];
  localStorage.setItem(FAV, JSON.stringify(next));
  return next;
}

export type HistItem = { id: string; at: string; title: string; summary: string };

export function getHistory(): HistItem[] {
  try {
    return JSON.parse(localStorage.getItem(HIST) || "[]");
  } catch {
    return [];
  }
}

export function pushHistory(item: HistItem) {
  const next = [item, ...getHistory().filter((x) => x.id !== item.id)].slice(0, 30);
  localStorage.setItem(HIST, JSON.stringify(next));
}

export function extraFiltersOpen(): boolean {
  try {
    return localStorage.getItem(FILTERS) === "1";
  } catch {
    return false;
  }
}

export function setExtraFiltersOpen(open: boolean) {
  try {
    localStorage.setItem(FILTERS, open ? "1" : "0");
  } catch {
    /* ignore */
  }
}
