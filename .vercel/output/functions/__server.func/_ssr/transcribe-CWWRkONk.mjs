import { r as createServerFn } from "./ssr.mjs";
import { t as correctFarmSpeech } from "./correct-DvnW0NNQ.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transcribe-CWWRkONk.js
var transcribeAudio_createServerFn_handler = createServerRpc({
	id: "d3135c8a4c0a9f9fdab757c84aca51bd637b48ed14bbd57c0a869cfa3c2b0c2c",
	name: "transcribeAudio",
	filename: "src/lib/diagnose/transcribe.ts"
}, (opts) => transcribeAudio.__executeServer(opts));
var transcribeAudio = createServerFn({ method: "POST" }).validator((input) => input).handler(transcribeAudio_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "off"
	};
	const audio = data.audio;
	if (!audio.startsWith("data:audio/") || audio.length > 8388608) return {
		ok: false,
		error: "fail"
	};
	const lang = data.lang === "en" ? "en" : "zh";
	try {
		const bin = dataUrlToBlob(audio);
		const form = new FormData();
		form.append("file", bin, lang === "en" ? "speech.webm" : "yuyin.webm");
		form.append("model", "whisper-1");
		form.append("language", lang === "en" ? "en" : "zh");
		const whisper = await fetch("https://api.x.ai/v1/audio/transcriptions", {
			method: "POST",
			headers: { Authorization: `Bearer ${apiKey}` },
			body: form
		});
		if (whisper.ok) {
			const body = await whisper.json();
			const text = correctFarmSpeech(body.text || "");
			if (text) return {
				ok: true,
				text
			};
		}
		const chat = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 400,
				messages: [{
					role: "system",
					content: lang === "en" ? "Transcribe the farmer. Return only the transcript. No quotes." : "把这段田间录音转成文字。只回转写，不要解释。"
				}, {
					role: "user",
					content: [{
						type: "text",
						text: lang === "en" ? "Transcribe:" : "转写："
					}, {
						type: "image_url",
						image_url: { url: audio }
					}]
				}]
			})
		});
		if (!chat.ok) return {
			ok: false,
			error: "fail"
		};
		const body = await chat.json();
		const text = correctFarmSpeech((body.choices?.[0]?.message?.content || "").replace(/^["「]|["」]$/g, ""));
		if (!text) return {
			ok: false,
			error: "empty"
		};
		return {
			ok: true,
			text
		};
	} catch {
		return {
			ok: false,
			error: "fail"
		};
	}
});
var extractLab_createServerFn_handler = createServerRpc({
	id: "9d3eadfdd891e572ae785cd6aecff0b4218a2fd5cefa7de7903836cedb7259ac",
	name: "extractLab",
	filename: "src/lib/diagnose/transcribe.ts"
}, (opts) => extractLab.__executeServer(opts));
var extractLab = createServerFn({ method: "POST" }).validator((input) => input).handler(extractLab_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return { ok: false };
	if (!data.photo.startsWith("data:image/")) return { ok: false };
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 200,
				messages: [{
					role: "system",
					content: "Read a Chinese soil lab sheet. Extract pH, EC (or 电导), organic matter (有机质). Return JSON only: {\"ph\":\"\",\"ec\":\"\",\"om\":\"\"} with numbers only, empty if unseen."
				}, {
					role: "user",
					content: [{
						type: "image_url",
						image_url: { url: data.photo }
					}]
				}]
			})
		});
		if (!res.ok) return { ok: false };
		const json = (await res.json()).choices?.[0]?.message?.content?.match(/\{[\s\S]*\}/)?.[0];
		if (!json) return { ok: false };
		const parsed = JSON.parse(json);
		return {
			ok: true,
			ph: parsed.ph,
			ec: parsed.ec,
			om: parsed.om
		};
	} catch {
		return { ok: false };
	}
});
function dataUrlToBlob(dataUrl) {
	const [head, b64] = dataUrl.split(",", 2);
	const mime = /data:([^;]+)/.exec(head || "")?.[1] || "audio/webm";
	const bin = Buffer.from(b64 || "", "base64");
	return new Blob([bin], { type: mime });
}
//#endregion
export { extractLab_createServerFn_handler, transcribeAudio_createServerFn_handler };
