import { PROBLEMS, type Problem } from "@/lib/constants";
import type { Lang } from "@/lib/i18n/lang";

export const PROBLEM_EN_SLUG: Record<Problem, string> = {
  酸化: "acid",
  盐碱: "saline-alkali",
  板结: "hard-soil",
  有机质低: "thin-om",
  缺素: "nutrient",
  连作障碍: "same-crop",
  涝害: "waterlog",
  肥害: "fert-burn",
  其他: "other",
};

const FROM_SLUG: Record<string, Problem> = Object.fromEntries(
  (Object.entries(PROBLEM_EN_SLUG) as [Problem, string][]).map(([zh, en]) => [en, zh]),
) as Record<string, Problem>;

export function parseProblem(raw?: string): Problem | undefined {
  if (!raw) return undefined;
  if ((PROBLEMS as readonly string[]).includes(raw)) return raw as Problem;
  return FROM_SLUG[raw];
}

export function problemQuery(zh: string, lang: Lang): string {
  if (lang !== "en") return zh;
  return PROBLEM_EN_SLUG[zh as Problem] ?? zh;
}

export function isSeedPost(id: string) {
  return /^p\d{2}$/.test(id);
}
