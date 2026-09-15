import { localizeArticle } from "@/lib/knowledge/localize";
import { retrieveForRag } from "@/lib/knowledge/search";
import type { DiagnoseResult } from "./server";

export function localDiagnose(query: string, lang: "zh" | "en"): DiagnoseResult {
  const retrieved = retrieveForRag(query || "酸化 盐碱 缺素 涝害 肥害");
  const topRaw = retrieved[0];
  if (!topRaw) {
    return {
      title: lang === "en" ? "Not enough to match a guide" : "信息不够，对不上明白纸",
      summary:
        lang === "en"
          ? "Photograph the plant, a close-up and the surface, then match a field guide. No rate from this page."
          : "请拍整株、特写和土面，再到农业知识对照。这里不开方。",
      photosSay: "",
      guesses: [{ title: lang === "en" ? "Not enough" : "信息不够", confidence: "低", kind: "不够", why: "" }],
      unlike: [],
      dont: [lang === "en" ? "Do not open a bag yet." : "先不要下肥。"],
      next: [lang === "en" ? "Open the field guide or add a photo." : "打开农业知识，或补一张照片。"],
      related: [],
      distinguish: "",
      spoken:
        lang === "en"
          ? ["Do not open a bag yet.", "Not enough to match a guide.", "Photograph the plant, a close-up and the surface."]
          : ["先不要下肥。", "信息不够，对不上明白纸。", "请拍整株、特写和土面。"],
    };
  }
  const top = localizeArticle(topRaw, lang);
  const second = retrieved[1] ? localizeArticle(retrieved[1], lang) : undefined;
  const mix = top.confuse[0]?.difference || "";
  const dont = (top.dontDo ?? []).slice(0, 2);
  const test = top.whenToTest || (lang === "en" ? "Read pH, organic matter and salt on a sheet." : "先看 pH、有机质和盐分。");
  const spoken =
    lang === "en"
      ? [dont[0] || "Do not chase nitrogen on injured roots.", `Closer to ${top.title}.`, test]
      : [dont[0] || "先别做还没认准的那一步。", `更像「${top.title}」。`, test];
  return {
    title: top.title,
    summary: top.summary,
    photosSay: top.phenomenon.appearance,
    guesses: [
      { title: top.title, confidence: "中", kind: "土壤", why: mix || top.subtitle },
      ...(second ? [{ title: second.title, confidence: "低" as const, kind: "土壤" as const, why: second.subtitle }] : []),
    ],
    unlike: top.confuse.slice(0, 2).map((c) => c.lookalike),
    dont,
    next: [test, lang === "en" ? "Read the rate table in the matched guide, then ask a local agronomist." : "去看本篇用量表，问当地农技站。"],
    related: retrieved.slice(0, 3).map((a) => a.slug),
    distinguish: mix,
    spoken,
  };
}
