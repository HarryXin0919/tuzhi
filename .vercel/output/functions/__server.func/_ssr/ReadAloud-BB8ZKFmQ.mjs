import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, U as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useLang, u as messages } from "./router-Cmkla7Wz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ReadAloud-BB8ZKFmQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ZH_DIGITS = [
	"零",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六",
	"七",
	"八",
	"九"
];
function zhInt(n) {
	if (n < 0) return "负" + zhInt(-n);
	if (n < 10) return ZH_DIGITS[n];
	if (n < 20) return n === 10 ? "十" : "十" + ZH_DIGITS[n % 10];
	if (n < 100) {
		const tens = Math.floor(n / 10);
		const ones = n % 10;
		return ZH_DIGITS[tens] + "十" + (ones ? ZH_DIGITS[ones] : "");
	}
	if (n < 1e3) {
		const hun = Math.floor(n / 100);
		const rest = n % 100;
		return ZH_DIGITS[hun] + "百" + (rest ? (rest < 10 ? "零" : "") + zhInt(rest) : "");
	}
	return String(n);
}
function speakPrepare(text, lang) {
	let s = text;
	if (lang === "zh") {
		s = s.replace(/(\d+(?:\.\d+)?)\s*[～~\-—至到]\s*(\d+(?:\.\d+)?)/g, (_, a, b) => {
			return `${spokenNum(a)}到${spokenNum(b)}`;
		});
		s = s.replace(/每亩\s*(\d+)/g, (_, n) => `每亩${spokenNum(n)}`);
		s = s.replace(/(\d+(?:\.\d+)?)\s*公斤/g, (_, n) => `${spokenNum(n)}公斤`);
		s = s.replace(/(\d+(?:\.\d+)?)\s*厘米/g, (_, n) => `${spokenNum(n)}厘米`);
		s = s.replace(/\bpH\s*([<>＜＞]?\s*\d+(?:\.\d+)?)/gi, (_, n) => `pH ${spokenNum(n.replace(/[<>＜＞]/g, "").trim())}`);
	}
	return s;
}
function spokenNum(raw) {
	const n = Number(raw);
	if (!Number.isFinite(n)) return raw;
	if (Number.isInteger(n)) return zhInt(n);
	const [a, b] = raw.split(".");
	return zhInt(Number(a)) + "点" + [...b].map((d) => ZH_DIGITS[Number(d)] ?? d).join("");
}
function splitSentences(text) {
	return text.replace(/\s+/g, " ").split(/(?<=[。！？!?；;…\n])/).map((s) => s.trim()).filter((s) => s.length > 0);
}
function voiceScore(v, lang) {
	const n = `${v.name} ${v.lang}`.toLowerCase();
	let s = 0;
	if (lang === "zh") {
		if (/zh-cn|zh_cn|cmn|chinese/.test(n)) s += 4;
		if (/xiaoxiao|yunxi|yunyang|xiaoyi|neural|natural|tingting|google 普通话|huihui/.test(n)) s += 6;
	} else {
		if (/en-us|en_us|en-gb/.test(n)) s += 4;
		if (/jenny|aria|guy|davis|neural|natural|samantha|google us english/.test(n)) s += 6;
	}
	if (v.localService) s += 1;
	return s;
}
function pickVoice(lang) {
	if (typeof window === "undefined" || !window.speechSynthesis) return null;
	const voices = window.speechSynthesis.getVoices();
	const prefix = lang === "zh" ? "zh" : "en";
	return voices.filter((v) => v.lang.toLowerCase().startsWith(prefix) || voiceScore(v, lang) > 0).sort((a, b) => voiceScore(b, lang) - voiceScore(a, lang))[0] ?? voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ?? null;
}
function ReadAloud({ text }) {
	const lang = useLang((s) => s.lang);
	const t = messages[lang].tts;
	const [mode, setMode] = (0, import_react.useState)("idle");
	const [caption, setCaption] = (0, import_react.useState)("");
	const idx = (0, import_react.useRef)(0);
	const sentences = (0, import_react.useRef)([]);
	const langRef = (0, import_react.useRef)(lang);
	const wantPlay = (0, import_react.useRef)(false);
	const modeRef = (0, import_react.useRef)("idle");
	const textRef = (0, import_react.useRef)(text);
	modeRef.current = mode;
	textRef.current = text;
	function stopAll() {
		if (typeof window !== "undefined") window.speechSynthesis?.cancel();
		idx.current = 0;
		wantPlay.current = false;
		modeRef.current = "idle";
		setMode("idle");
		setCaption("");
	}
	function speakFrom(i) {
		if (typeof window === "undefined" || !window.speechSynthesis) {
			setCaption(t.unsupported);
			modeRef.current = "idle";
			setMode("idle");
			return;
		}
		const list = sentences.current;
		if (i >= list.length) {
			modeRef.current = "idle";
			setMode("idle");
			setCaption("");
			wantPlay.current = false;
			return;
		}
		idx.current = i;
		const u = new SpeechSynthesisUtterance(list[i]);
		const voice = pickVoice(langRef.current);
		if (voice) u.voice = voice;
		u.lang = langRef.current === "zh" ? "zh-CN" : "en-US";
		u.rate = .98;
		u.pitch = 1;
		u.onstart = () => setCaption(list[i]);
		u.onend = () => {
			if (!wantPlay.current) return;
			speakFrom(i + 1);
		};
		u.onerror = () => {
			if (!wantPlay.current) return;
			speakFrom(i + 1);
		};
		window.speechSynthesis.speak(u);
		modeRef.current = "playing";
		setMode("playing");
	}
	function startFromTop() {
		const prepared = speakPrepare(textRef.current, langRef.current);
		sentences.current = splitSentences(prepared);
		idx.current = 0;
		wantPlay.current = true;
		if (typeof window === "undefined" || !window.speechSynthesis) {
			setCaption(t.unsupported);
			return;
		}
		window.speechSynthesis.cancel();
		if (window.speechSynthesis.getVoices().length === 0) window.speechSynthesis.addEventListener("voiceschanged", () => speakFrom(0), { once: true });
		speakFrom(0);
	}
	function pause() {
		if (typeof window === "undefined") return;
		if (modeRef.current !== "playing") return;
		window.speechSynthesis.pause();
		wantPlay.current = false;
		modeRef.current = "paused";
		setMode("paused");
	}
	(0, import_react.useEffect)(() => {
		const langChanged = langRef.current !== lang;
		langRef.current = lang;
		if (!langChanged) return;
		if (modeRef.current === "idle" && !wantPlay.current) return;
		startFromTop();
	}, [lang]);
	(0, import_react.useEffect)(() => {
		return () => {
			wantPlay.current = false;
			if (typeof window !== "undefined") window.speechSynthesis?.cancel();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg",
					onClick: startFromTop,
					children: t.listen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4",
					onClick: pause,
					disabled: mode === "idle",
					children: t.pause
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4",
					onClick: stopAll,
					children: t.stop
				})
			]
		}), caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-xl border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-ink",
			children: caption
		}) : null]
	});
}
//#endregion
export { ReadAloud as t };
