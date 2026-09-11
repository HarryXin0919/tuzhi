import type { Lang } from "@/lib/i18n/lang";

const ZH_DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

function zhInt(n: number): string {
  if (n < 0) return "负" + zhInt(-n);
  if (n < 10) return ZH_DIGITS[n];
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

function spokenNum(raw: string): string {
  const n = Number(raw);
  if (!Number.isFinite(n)) return raw;
  if (Number.isInteger(n)) return zhInt(n);
  const [a, b] = raw.split(".");
  return zhInt(Number(a)) + "点" + [...b].map((d) => ZH_DIGITS[Number(d)] ?? d).join("");
}

export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[。！？!?；;…\n])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function voiceScore(v: SpeechSynthesisVoice, lang: Lang): number {
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

export function pickVoice(lang: Lang): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const prefix = lang === "zh" ? "zh" : "en";
  const ranked = voices
    .filter((v) => v.lang.toLowerCase().startsWith(prefix) || voiceScore(v, lang) > 0)
    .sort((a, b) => voiceScore(b, lang) - voiceScore(a, lang));
  return ranked[0] ?? voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ?? null;
}
