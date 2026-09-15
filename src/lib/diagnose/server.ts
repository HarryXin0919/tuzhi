import { createServerFn } from "@tanstack/react-start";
import { allowedNumbersFromArticles, articleToRagChunk, lockDoseNumbers, retrieveForRag } from "@/lib/knowledge/search";
import { localDiagnose } from "./local";

export type DiagnoseGuess = {
  title: string;
  confidence: "高" | "中" | "低";
  kind: "土壤" | "病害" | "药害" | "盐害" | "不够";
  why: string;
};

export type DiagnoseResult = {
  title: string;
  summary: string;
  photosSay: string;
  guesses: DiagnoseGuess[];
  unlike: string[];
  dont: string[];
  next: string[];
  related: string[];
  distinguish: string;
  spoken?: string[];
};

function systemPrompt(chunks: string, lang: string) {
  const langLine =
    lang === "en"
      ? "Write the JSON values in English only. No Chinese characters."
      : "用中文写 JSON 里的句子。不要中英混写。";
  return `You are 土知. ${langLine}
You may ONLY use facts from the retrieved field guides below. Do not invent rates, bags, or pesticide brand names.
If a number is not in the guides, do not write it. Say to read the rate table and ask a local agronomist.
Read the photos first. Result first, then evidence, then what not to do, then next steps.
Hard distinctions:
1) White crust + scorched margins after a light watering is salt, not nitrogen shortage.
2) New leaves yellow with green veins is iron lock, not nitrogen (old leaves yellow first).
3) Wilt by day, recover at night, wet/smelly roots is waterlog, not drought.
4) Injury 1–3 days after a spray is not a nutrient gap.
Locked facts (use only if a retrieved guide also supports them): grain land lime only when pH is below about 5.5; grain/veg comfort about 6.0–7.5; pH above 8 iron locks; farm lime on grain land often 50–150 kg/mu split, sandy soils at the low end; not the same day as urea; no builder’s lime; tea target about 4.5–6.0, do not push tea to neutral.
Return JSON only:
{"title":"","summary":"","photosSay":"","guesses":[{"title":"","confidence":"高","kind":"土壤","why":""}],"unlike":[""],"dont":[""],"next":[""],"related":["suan-hua"],"distinguish":"","spoken":[""]}
related must be slugs from the retrieved guides.
spoken: short spoken sentences, one breath each.

RETRIEVED GUIDES:
${chunks}`;
}

function asGuesses(raw: unknown, title: string, distinguish: string): DiagnoseGuess[] {
  if (Array.isArray(raw) && raw.length) {
    return raw.slice(0, 3).map((g) => {
      const x = g as Partial<DiagnoseGuess>;
      const conf = x.confidence === "高" || x.confidence === "中" || x.confidence === "低" ? x.confidence : "中";
      const kind =
        x.kind === "土壤" || x.kind === "病害" || x.kind === "药害" || x.kind === "盐害" || x.kind === "不够"
          ? x.kind
          : "土壤";
      return { title: String(x.title || title), confidence: conf, kind, why: String(x.why || distinguish || "") };
    });
  }
  return [{ title, confidence: "中", kind: "不够", why: distinguish || title }];
}

function noBags(s: string, lang: "zh" | "en"): string {
  if (/(\d+\s*(?:公斤|千克|kg)|每亩\s*\d+)/i.test(s)) {
    return lang === "en"
      ? "Read the rate table in the matched guide, then ask a local agronomist."
      : "去看本篇用量表，问当地农技站。";
  }
  return s;
}

function lockResult(parsed: DiagnoseResult, allowed: Set<string>, lang: "zh" | "en"): DiagnoseResult {
  const lock = (s: string) => noBags(lockDoseNumbers(s, allowed, lang), lang);
  return {
    ...parsed,
    title: lock(parsed.title),
    summary: lock(parsed.summary),
    photosSay: lock(parsed.photosSay),
    distinguish: lock(parsed.distinguish),
    unlike: parsed.unlike.map(lock),
    dont: parsed.dont.map(lock),
    next: parsed.next.map(lock),
    guesses: parsed.guesses.map((g) => ({ ...g, title: lock(g.title), why: lock(g.why) })),
    spoken: parsed.spoken?.map(lock),
  };
}

export const runDiagnose = createServerFn({ method: "POST" })
  .validator((input: { photos: string[]; text: string; crop?: string; region?: string; stage?: string; fert?: string; lang?: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true; result: DiagnoseResult } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    const photos = data.photos.filter((p) => p.startsWith("data:image/")).slice(0, 4);
    if (photos.some((p) => p.length > 12 * 1024 * 1024)) return { ok: false, error: "fail" };
    const query = [data.text, data.crop, data.region, data.stage, data.fert].filter(Boolean).join(" ");
    const retrieved = retrieveForRag(query || "酸化 盐碱 缺素 涝害 肥害");
    if (!retrieved.length) return { ok: false, error: "parse" };
    const lang = data.lang === "en" ? "en" : "zh";
    if (!apiKey) {
      const local = localDiagnose(query, lang);
      return { ok: true, result: lockResult(local, allowedNumbersFromArticles(retrieved), lang) };
    }
    const chunks = retrieved.map(articleToRagChunk).join("\n---\n");
    const allowed = allowedNumbersFromArticles(retrieved);
    const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
      {
        type: "text",
        text: `crop=${data.crop || ""} region=${data.region || ""} stage=${data.stage || ""} fert=${data.fert || ""} lang=${lang}\n${(data.text || "").slice(0, 2000)}`,
      },
    ];
    for (const p of photos) {
      content.push({ type: "image_url", image_url: { url: p } });
    }
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        signal: ctrl.signal,
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 1100,
          messages: [
            { role: "system", content: systemPrompt(chunks, lang) },
            { role: "user", content },
          ],
        }),
      });
      clearTimeout(timer);
      if (!res.ok) {
        const local = localDiagnose(query, lang);
        return { ok: true, result: lockResult(local, allowed, lang) };
      }
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const raw = body.choices?.[0]?.message?.content ?? "";
      const json = raw.match(/\{[\s\S]*\}/)?.[0];
      if (!json) {
        const local = localDiagnose(query, lang);
        return { ok: true, result: lockResult(local, allowed, lang) };
      }
      const parsed = JSON.parse(json) as DiagnoseResult;
      parsed.guesses = asGuesses(parsed.guesses, parsed.title, parsed.distinguish);
      parsed.unlike = Array.isArray(parsed.unlike) ? parsed.unlike : [];
      parsed.dont = Array.isArray(parsed.dont) ? parsed.dont : [];
      parsed.next = Array.isArray(parsed.next) ? parsed.next : [];
      const allowedSlugs = new Set(retrieved.map((a) => a.slug));
      parsed.related = Array.isArray(parsed.related)
        ? parsed.related.filter((s) => allowedSlugs.has(s)).slice(0, 4)
        : retrieved.slice(0, 3).map((a) => a.slug);
      if (!parsed.related.length) parsed.related = retrieved.slice(0, 3).map((a) => a.slug);
      parsed.spoken = Array.isArray(parsed.spoken) ? parsed.spoken.slice(0, 16) : undefined;
      const disclaimer =
        lang === "en"
          ? "For learning only. It does not replace a local agronomist or a lab."
          : "仅供学习对照，不能替代农技站或化验室。";
      parsed.next = [...parsed.next, disclaimer];
      return { ok: true, result: lockResult(parsed, allowed, lang) };
    } catch {
      const local = localDiagnose(query, lang);
      return { ok: true, result: lockResult(local, allowedNumbersFromArticles(retrieved), lang) };
    }
  });
