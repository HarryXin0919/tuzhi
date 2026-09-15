import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { g as lockDoseNumbers, h as localizeArticle, i as articleToRagChunk, r as allowedNumbersFromArticles, x as retrieveForRag } from "./localize-prwp3Q6l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-CkyBnhwn.js
function localDiagnose(query, lang) {
	const retrieved = retrieveForRag(query || "酸化 盐碱 缺素 涝害 肥害");
	const topRaw = retrieved[0];
	if (!topRaw) return {
		title: lang === "en" ? "Not enough to match a guide" : "信息不够，对不上明白纸",
		summary: lang === "en" ? "Photograph the plant, a close-up and the surface, then match a field guide. No rate from this page." : "请拍整株、特写和土面，再到农业知识对照。这里不开方。",
		photosSay: "",
		guesses: [{
			title: lang === "en" ? "Not enough" : "信息不够",
			confidence: "低",
			kind: "不够",
			why: ""
		}],
		unlike: [],
		dont: [lang === "en" ? "Do not open a bag yet." : "先不要下肥。"],
		next: [lang === "en" ? "Open the field guide or add a photo." : "打开农业知识，或补一张照片。"],
		related: [],
		distinguish: "",
		spoken: lang === "en" ? [
			"Do not open a bag yet.",
			"Not enough to match a guide.",
			"Photograph the plant, a close-up and the surface."
		] : [
			"先不要下肥。",
			"信息不够，对不上明白纸。",
			"请拍整株、特写和土面。"
		]
	};
	const top = localizeArticle(topRaw, lang);
	const second = retrieved[1] ? localizeArticle(retrieved[1], lang) : void 0;
	const mix = top.confuse[0]?.difference || "";
	const dont = (top.dontDo ?? []).slice(0, 2);
	const test = top.whenToTest || (lang === "en" ? "Read pH, organic matter and salt on a sheet." : "先看 pH、有机质和盐分。");
	const spoken = lang === "en" ? [
		dont[0] || "Do not chase nitrogen on injured roots.",
		`Closer to ${top.title}.`,
		test
	] : [
		dont[0] || "先别做还没认准的那一步。",
		`更像「${top.title}」。`,
		test
	];
	return {
		title: top.title,
		summary: top.summary,
		photosSay: top.phenomenon.appearance,
		guesses: [{
			title: top.title,
			confidence: "中",
			kind: "土壤",
			why: mix || top.subtitle
		}, ...second ? [{
			title: second.title,
			confidence: "低",
			kind: "土壤",
			why: second.subtitle
		}] : []],
		unlike: top.confuse.slice(0, 2).map((c) => c.lookalike),
		dont,
		next: [test, lang === "en" ? "Read the rate table in the matched guide, then ask a local agronomist." : "去看本篇用量表，问当地农技站。"],
		related: retrieved.slice(0, 3).map((a) => a.slug),
		distinguish: mix,
		spoken
	};
}
function systemPrompt(chunks, lang) {
	return `You are 土知. ${lang === "en" ? "Write the JSON values in English only. No Chinese characters." : "用中文写 JSON 里的句子。不要中英混写。"}
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
function asGuesses(raw, title, distinguish) {
	if (Array.isArray(raw) && raw.length) return raw.slice(0, 3).map((g) => {
		const x = g;
		const conf = x.confidence === "高" || x.confidence === "中" || x.confidence === "低" ? x.confidence : "中";
		const kind = x.kind === "土壤" || x.kind === "病害" || x.kind === "药害" || x.kind === "盐害" || x.kind === "不够" ? x.kind : "土壤";
		return {
			title: String(x.title || title),
			confidence: conf,
			kind,
			why: String(x.why || distinguish || "")
		};
	});
	return [{
		title,
		confidence: "中",
		kind: "不够",
		why: distinguish || title
	}];
}
function noBags(s, lang) {
	if (/(\d+\s*(?:公斤|千克|kg)|每亩\s*\d+)/i.test(s)) return lang === "en" ? "Read the rate table in the matched guide, then ask a local agronomist." : "去看本篇用量表，问当地农技站。";
	return s;
}
function lockResult(parsed, allowed, lang) {
	const lock = (s) => noBags(lockDoseNumbers(s, allowed, lang), lang);
	return {
		...parsed,
		title: lock(parsed.title),
		summary: lock(parsed.summary),
		photosSay: lock(parsed.photosSay),
		distinguish: lock(parsed.distinguish),
		unlike: parsed.unlike.map(lock),
		dont: parsed.dont.map(lock),
		next: parsed.next.map(lock),
		guesses: parsed.guesses.map((g) => ({
			...g,
			title: lock(g.title),
			why: lock(g.why)
		})),
		spoken: parsed.spoken?.map(lock)
	};
}
var runDiagnose_createServerFn_handler = createServerRpc({
	id: "4c15d74ca4e73d436d153bc970e05e3cfa7b4a7c7e16e9e9be35bd4dea5dcf81",
	name: "runDiagnose",
	filename: "src/lib/diagnose/server.ts"
}, (opts) => runDiagnose.__executeServer(opts));
var runDiagnose = createServerFn({ method: "POST" }).validator((input) => input).handler(runDiagnose_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	const photos = data.photos.filter((p) => p.startsWith("data:image/")).slice(0, 4);
	if (photos.some((p) => p.length > 12582912)) return {
		ok: false,
		error: "fail"
	};
	const query = [
		data.text,
		data.crop,
		data.region,
		data.stage,
		data.fert
	].filter(Boolean).join(" ");
	const retrieved = retrieveForRag(query || "酸化 盐碱 缺素 涝害 肥害");
	if (!retrieved.length) return {
		ok: false,
		error: "parse"
	};
	const lang = data.lang === "en" ? "en" : "zh";
	if (!apiKey) return {
		ok: true,
		result: lockResult(localDiagnose(query, lang), allowedNumbersFromArticles(retrieved), lang)
	};
	const chunks = retrieved.map(articleToRagChunk).join("\n---\n");
	const allowed = allowedNumbersFromArticles(retrieved);
	const content = [{
		type: "text",
		text: `crop=${data.crop || ""} region=${data.region || ""} stage=${data.stage || ""} fert=${data.fert || ""} lang=${lang}\n${(data.text || "").slice(0, 2e3)}`
	}];
	for (const p of photos) content.push({
		type: "image_url",
		image_url: { url: p }
	});
	try {
		const ctrl = new AbortController();
		const timer = setTimeout(() => ctrl.abort(), 12e3);
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			signal: ctrl.signal,
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 1100,
				messages: [{
					role: "system",
					content: systemPrompt(chunks, lang)
				}, {
					role: "user",
					content
				}]
			})
		});
		clearTimeout(timer);
		if (!res.ok) return {
			ok: true,
			result: lockResult(localDiagnose(query, lang), allowed, lang)
		};
		const json = ((await res.json()).choices?.[0]?.message?.content ?? "").match(/\{[\s\S]*\}/)?.[0];
		if (!json) return {
			ok: true,
			result: lockResult(localDiagnose(query, lang), allowed, lang)
		};
		const parsed = JSON.parse(json);
		parsed.guesses = asGuesses(parsed.guesses, parsed.title, parsed.distinguish);
		parsed.unlike = Array.isArray(parsed.unlike) ? parsed.unlike : [];
		parsed.dont = Array.isArray(parsed.dont) ? parsed.dont : [];
		parsed.next = Array.isArray(parsed.next) ? parsed.next : [];
		const allowedSlugs = new Set(retrieved.map((a) => a.slug));
		parsed.related = Array.isArray(parsed.related) ? parsed.related.filter((s) => allowedSlugs.has(s)).slice(0, 4) : retrieved.slice(0, 3).map((a) => a.slug);
		if (!parsed.related.length) parsed.related = retrieved.slice(0, 3).map((a) => a.slug);
		parsed.spoken = Array.isArray(parsed.spoken) ? parsed.spoken.slice(0, 16) : void 0;
		const disclaimer = lang === "en" ? "For learning only. It does not replace a local agronomist or a lab." : "仅供学习对照，不能替代农技站或化验室。";
		parsed.next = [...parsed.next, disclaimer];
		return {
			ok: true,
			result: lockResult(parsed, allowed, lang)
		};
	} catch {
		return {
			ok: true,
			result: lockResult(localDiagnose(query, lang), allowedNumbersFromArticles(retrieved), lang)
		};
	}
});
//#endregion
export { runDiagnose_createServerFn_handler };
