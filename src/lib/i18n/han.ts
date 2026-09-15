const HAN = /[\u4e00-\u9fff]/;

export function hasHan(s: string | null | undefined): boolean {
  return !!s && HAN.test(s);
}

/** Visible English: empty when missing. Never emit a pending placeholder. */
export function cleanEn(s: string | null | undefined): string {
  if (!s || !s.trim()) return "";
  if (HAN.test(s)) return "";
  if (/not ready/i.test(s) && /english/i.test(s)) return "";
  return s;
}

export function enOrPending(s: string | null | undefined): string {
  return cleanEn(s);
}

export function cleanEnArr(arr: string[] | null | undefined): string[] {
  return (arr ?? []).map(cleanEn).filter(Boolean);
}

export function enArrOrPending(arr: string[] | null | undefined, _min = 0): string[] {
  return cleanEnArr(arr);
}

export function dropHanLines(lines: string[], warnLabel?: string): string[] {
  const out: string[] = [];
  for (const line of lines) {
    if (HAN.test(line) || /not ready/i.test(line)) {
      if (warnLabel && typeof console !== "undefined") {
        console.warn(`[tuzhi] skip Han in ${warnLabel}:`, line.slice(0, 40));
      }
      continue;
    }
    const t = line.trim();
    if (t) out.push(t);
  }
  return out;
}
