import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { pickVoice, speakPrepare, splitSentences } from "@/lib/tts/speak";

type Mode = "idle" | "playing" | "paused";

export function ReadAloud({ text }: { text: string }) {
  const lang = useLang((s) => s.lang);
  const t = messages[lang].tts;
  const [mode, setMode] = useState<Mode>("idle");
  const [caption, setCaption] = useState("");
  const idx = useRef(0);
  const sentences = useRef<string[]>([]);
  const langRef = useRef(lang);
  const wantPlay = useRef(false);
  const modeRef = useRef<Mode>("idle");
  const textRef = useRef(text);
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

  function speakFrom(i: number) {
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
    u.rate = 0.98;
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
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", () => speakFrom(0), { once: true });
    }
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

  useEffect(() => {
    const langChanged = langRef.current !== lang;
    langRef.current = lang;
    if (!langChanged) return;
    if (modeRef.current === "idle" && !wantPlay.current) return;
    startFromTop();
    // restart from the top on language switch, including mid-pause
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    return () => {
      wantPlay.current = false;
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg" onClick={startFromTop}>
          {t.listen}
        </button>
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4"
          onClick={pause}
          disabled={mode === "idle"}
        >
          {t.pause}
        </button>
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4"
          onClick={stopAll}
        >
          {t.stop}
        </button>
      </div>
      {caption ? (
        <p className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-ink">{caption}</p>
      ) : null}
    </div>
  );
}
