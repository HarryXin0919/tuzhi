import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as ARTICLES } from "./search-DqYpJTx8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-BhomLkpy.js
var SYSTEM = `You are 土知, speaking to a farmer in the field. Chinese if the user wrote Chinese; English if they wrote English.
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
var runDiagnose_createServerFn_handler = createServerRpc({
	id: "4c15d74ca4e73d436d153bc970e05e3cfa7b4a7c7e16e9e9be35bd4dea5dcf81",
	name: "runDiagnose",
	filename: "src/lib/diagnose/server.ts"
}, (opts) => runDiagnose.__executeServer(opts));
var runDiagnose = createServerFn({ method: "POST" }).validator((input) => input).handler(runDiagnose_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "off"
	};
	const content = [{
		type: "text",
		text: `crop=${data.crop || ""} region=${data.region || ""} stage=${data.stage || ""} fert=${data.fert || ""} lang=${data.lang || "zh"}\n${data.text || ""}`
	}];
	for (const p of data.photos.slice(0, 4)) if (p.startsWith("data:")) content.push({
		type: "image_url",
		image_url: { url: p }
	});
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 900,
				messages: [{
					role: "system",
					content: SYSTEM
				}, {
					role: "user",
					content
				}]
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `xAI ${res.status}`
		};
		const json = ((await res.json()).choices?.[0]?.message?.content ?? "").match(/\{[\s\S]*\}/)?.[0];
		if (!json) return {
			ok: false,
			error: "parse"
		};
		return {
			ok: true,
			result: JSON.parse(json)
		};
	} catch (e) {
		return {
			ok: false,
			error: e instanceof Error ? e.message : "fail"
		};
	}
});
//#endregion
export { runDiagnose_createServerFn_handler };
