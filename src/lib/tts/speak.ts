import type { Lang } from "@/lib/i18n/lang";

const ZH_DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

function zhInt(n: number): string {
  if (n < 0) return "负" + zhInt(-n);
  if (n < 10) return ZH_DIGITS[n]!;
  if (n < 20) return n === 10 ? "十" : "十" + ZH_DIGITS[n % 10];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return ZH_DIGITS[tens] + "十" + (ones ? ZH_DIGITS[ones] : "");
  }
  if (n < 1000) {
    const hun = Math.floor(n / 100);
    const rest = n % 100;
    return ZH_DIGITS[hun] + "百" + (rest ? (rest < 10 ? "零" : "") + zhInt(rest) : "");
  }
  return String(n);
}

function spokenNum(raw: string): string {
  const n = Number(raw);
  if (!Number.isFinite(n)) return raw;
  if (Number.isInteger(n)) return zhInt(n);
  const [a, b] = raw.split(".");
  return zhInt(Number(a)) + "点" + [...(b ?? "")].map((d) => ZH_DIGITS[Number(d)] ?? d).join("");
}

export function speakPrepare(text: string, lang: Lang): string {
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

export function splitSentences(text: string): string[] {
  return clipSpoken(
    text
      .replace(/\s+/g, " ")
      .split(/(?<=[。！？!?；;…\n])/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0),
  );
}

/** Keep spoken lines short enough to hear as one breath. */
export function clipSpoken(lines: string[], max = 28): string[] {
  const out: string[] = [];
  for (const raw of lines) {
    let s = raw.replace(/示意图，不能单凭此图下肥。?/g, "").trim();
    if (/仅供学习|不能替代农技/.test(s)) continue;
    if (!s) continue;
    const parts = s.split(/(?<=[。！？!?；;])/);
    for (let p of parts) {
      p = p.trim();
      if (!p) continue;
      const chars = p.replace(/[。！？!?；;\s]/g, "");
      if (chars.length <= max) {
        out.push(p.endsWith("。") || /[!？?！]$/.test(p) ? p : p + "。");
        continue;
      }
      const bits = p.split(/[，,、]/);
      let buf = "";
      for (const b of bits) {
        const next = buf ? buf + "，" + b : b;
        if (next.replace(/[。！？\s，,]/g, "").length > max && buf) {
          out.push(/[。！？!?]$/.test(buf) ? buf : buf + "。");
          buf = b;
        } else buf = next;
      }
      if (buf.trim()) out.push(/[。！？!?]$/.test(buf) ? buf : buf + "。");
    }
  }
  return out;
}

function voiceScore(v: SpeechSynthesisVoice, lang: Lang): number {
  const n = `${v.name} ${v.lang}`.toLowerCase();
  let s = 0;
  if (lang === "zh") {
    if (/zh-cn|zh_cn|cmn|chinese/.test(n)) s += 4;
    if (/zh-tw|zh_hk|yue/.test(n)) s += 1;
    if (/xiaoxiao|yunxi|yunyang|xiaoyi|neural|natural|tingting|google 普通话|huihui/.test(n)) s += 6;
  } else {
    if (/en-us|en_us|en-gb/.test(n)) s += 4;
    if (/jenny|aria|guy|davis|neural|natural|samantha|google us english/.test(n)) s += 6;
  }
  if (v.localService) s += 1;
  return s;
}

export function listVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

export function hasLangVoice(lang: Lang): boolean {
  const prefix = lang === "zh" ? "zh" : "en";
  return listVoices().some((v) => v.lang.toLowerCase().startsWith(prefix) || (lang === "zh" && /chinese|cmn|普通话/.test(`${v.name} ${v.lang}`.toLowerCase())));
}

export function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = listVoices();
  const prefix = lang === "zh" ? "zh" : "en";
  const ranked = voices
    .filter((v) => v.lang.toLowerCase().startsWith(prefix) || voiceScore(v, lang) > 0)
    .sort((a, b) => voiceScore(b, lang) - voiceScore(a, lang));
  return ranked[0] ?? null;
}

export function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !window.speechSynthesis) return Promise.resolve([]);
  const now = window.speechSynthesis.getVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    const done = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", done);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener("voiceschanged", done);
    setTimeout(done, 1200);
  });
}

const RATE_KEY = "tuzhi-tts-rate";

export const TTS_RATES = [0.8, 1, 1.25, 1.5] as const;
export type TtsRate = (typeof TTS_RATES)[number];

export function readTtsRate(): TtsRate {
  if (typeof window === "undefined") return 1;
  const n = Number(localStorage.getItem(RATE_KEY));
  return (TTS_RATES as readonly number[]).includes(n) ? (n as TtsRate) : 1;
}

export function writeTtsRate(rate: TtsRate) {
  try {
    localStorage.setItem(RATE_KEY, String(rate));
  } catch {
    /* ignore */
  }
}
