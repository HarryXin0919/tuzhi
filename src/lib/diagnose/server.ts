import { createServerFn } from "@tanstack/react-start";
import { ARTICLES } from "@/lib/knowledge/search";

export type DiagnoseResult = {
  title: string;
  summary: string;
  photosSay: string;
  dont: string[];
  next: string[];
  related: string[];
  distinguish: string;
};

const SYSTEM = `You are 土知, speaking to a farmer in the field. Chinese if the user wrote Chinese; English if they wrote English.
Read the photos FIRST. Say what you see in the plant, the close-up, and the soil surface before you name a problem.
Result first: one short verdict, then evidence from the photos, then what not to do, then next steps. Not a lecture.
Hard distinctions — do not collapse these:
1) Salty-alkali (white crust, scorched margins, worse after a light watering) vs nitrogen shortage (old leaves evenly yellow, new leaves still greener, no white crust).
2) Iron lock (NEW leaves yellow, veins still green, often high pH) vs nitrogen shortage (OLD leaves yellow first).
3) Waterlogging (wilt by day, recover at night, wet/smelly roots, standing water) vs drought (dry soil, recovery after water).
Do not change rates. Do not invent pesticide brand names. Do not prescribe bags. Point to field guides.
Return JSON only:
{"title":"","summary":"","photosSay":"","dont":[""],"next":[""],"related":["suan-hua"],"distinguish":""}
related must be slugs from this list when they fit: ${ARTICLES.slice(0, 40).map((a) => a.slug).join(", ")}.`;

export const runDiagnose = createServerFn({ method: "POST" })
  .validator((input: { photos: string[]; text: string; crop?: string; region?: string; stage?: string; fert?: string; lang?: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true; result: DiagnoseResult } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "off" };
    const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
      {
        type: "text",
        text: `crop=${data.crop || ""} region=${data.region || ""} stage=${data.stage || ""} fert=${data.fert || ""} lang=${data.lang || "zh"}\n${data.text || ""}`,
      },
    ];
    for (const p of data.photos.slice(0, 4)) {
      if (p.startsWith("data:")) content.push({ type: "image_url", image_url: { url: p } });
    }
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 900,
          messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content },
          ],
        }),
      });
      if (!res.ok) return { ok: false, error: `xAI ${res.status}` };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const raw = body.choices?.[0]?.message?.content ?? "";
      const json = raw.match(/\{[\s\S]*\}/)?.[0];
      if (!json) return { ok: false, error: "parse" };
      const parsed = JSON.parse(json) as DiagnoseResult;
      return { ok: true, result: parsed };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "fail" };
    }
  });
