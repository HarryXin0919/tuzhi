import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { dropHanLines } from "@/lib/i18n/han";
import {
  hasLangVoice,
  pickVoice,
  readTtsRate,
  speakPrepare,
  TTS_RATES,
  type TtsRate,
  waitForVoices,
  writeTtsRate,
} from "@/lib/tts/speak";
import { beginSpeakSession, isSpeakSession, stopSpeakSession } from "@/lib/tts/session";

type Mode = "idle" | "playing" | "paused";

function mp3Path(slug: string | undefined, lang: "zh" | "en", howto: boolean) {
  if (!slug) return "";
  return howto ? `/audio/${slug}.how.${lang}.mp3` : `/audio/${slug}.${lang}.mp3`;
}

export function ReadAloud({
  sentences,
  howSentences,
  title,
  slug,
  howto: howtoProp,
  listenLabel,
}: {
  sentences?: string[];
  howSentences?: string[];
  title?: string;
  slug?: string;
  howto?: boolean;
  onHowto?: (v: boolean) => void;
  listenLabel?: string;
}) {
  const lang = usePathLang();
  const t = messages[lang].tts;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mode, setMode] = useState<Mode>("idle");
  const [idx, setIdx] = useState(0);
  const [rate, setRate] = useState<TtsRate>(1);
  const [howtoInner] = useState(false);
  const [noVoice, setNoVoice] = useState(false);
  const [hasMp3, setHasMp3] = useState(false);
  const [progress, setProgress] = useState(0);
  const session = useRef(0);
  const want = useRef(false);
  const listRef = useRef<string[]>([]);
  const idxRef = useRef(0);
  const rateRef = useRef<TtsRate>(1);
  const langRef = useRef(lang);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  langRef.current = lang;
  rateRef.current = rate;
  idxRef.current = idx;
  const howto = howtoProp ?? howtoInner;

  const SKIP = /translation pending|^土知$|^Tuzhi$|^李泽宇$|^Li Zeyu$|^Sources$|^依据$/i;
  const STEP_NO = /^\s*\d+\s*[）).、]/;
  function take(list: string[] | undefined, label: string, spoken: boolean) {
    const prepared = (list ?? [])
      .map((s) => (spoken ? speakPrepare(s, lang) : s))
      .filter((s) => s.trim() && !SKIP.test(s.trim()));
    const cleaned = lang === "en" ? dropHanLines(prepared, `${slug || title || "read"}:${label}`) : prepared;
    if (label === "full") return cleaned.filter((s) => !STEP_NO.test(s));
    return cleaned;
  }
  const fullLines = take(sentences, "full", false);
  const howLines = take(howSentences, "how", false);
  const spokenFull = take(sentences, "full", true);
  const spokenHow = take(howSentences, "how", true);
  const lines = howto && howLines.length ? howLines : fullLines;
  const spokenLines = howto && spokenHow.length ? spokenHow : spokenFull;
  const fileUrl = mp3Path(slug, lang, !!(howto && howLines.length));
  const [usingBackup, setUsingBackup] = useState(false);

  useEffect(() => {
    setRate(readTtsRate());
  }, []);

  useEffect(() => {
    want.current = false;
    stopSpeakSession();
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setMode("idle");
    setIdx(0);
    setProgress(0);
    setHasMp3(false);
    setUsingBackup(false);
  }, [howto, pathname, lang, fileUrl]);

  useEffect(() => {
    return () => {
      want.current = false;
      stopSpeakSession();
      audioRef.current?.pause();
    };
  }, []);

  function applyMedia(state: Mode, i: number, list: string[]) {
    if (typeof navigator === "undefined" || !navigator.mediaSession) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || (langRef.current === "en" ? "Tuzhi" : "土知"),
        artist: langRef.current === "en" ? "Tuzhi" : "土知",
        album: list[i] || "",
      });
      navigator.mediaSession.playbackState = state === "playing" ? "playing" : state === "paused" ? "paused" : "none";
      navigator.mediaSession.setActionHandler("play", () => resume());
      navigator.mediaSession.setActionHandler("pause", () => pause());
      navigator.mediaSession.setActionHandler("stop", () => stopAll());
    } catch {
      /* ignore */
    }
  }

  function stopAll() {
    want.current = false;
    stopSpeakSession();
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setMode("idle");
    setIdx(0);
    setProgress(0);
  }

  function pause() {
    if (mode !== "playing") return;
    want.current = false;
    audioRef.current?.pause();
    try {
      window.speechSynthesis?.pause();
    } catch {
      window.speechSynthesis?.cancel();
    }
    setMode("paused");
    applyMedia("paused", idxRef.current, listRef.current);
  }

  function resume() {
    if (mode === "paused") {
      want.current = true;
      const el = audioRef.current;
      if (el && !el.ended && el.src) {
        void el.play().then(() => {
          setMode("playing");
          applyMedia("playing", idxRef.current, listRef.current);
        });
        return;
      }
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
          setMode("playing");
          applyMedia("playing", idxRef.current, listRef.current);
          return;
        }
      } catch {
        /* fall through */
      }
    }
    void speakFrom(0);
  }

  async function playFile(): Promise<boolean> {
    const el = audioRef.current;
    if (!el || !fileUrl) return false;
    try {
      el.src = fileUrl;
      el.playbackRate = rateRef.current;
      await el.play();
      setHasMp3(true);
      setMode("playing");
      applyMedia("playing", 0, listRef.current);
      return true;
    } catch {
      setHasMp3(false);
      return false;
    }
  }

  async function speakFrom(start: number) {
    const list = lines;
    listRef.current = list;
    if (!list.length && !fileUrl) return;
    const tok = beginSpeakSession();
    session.current = tok;
    want.current = true;
    if (await playFile()) {
      setUsingBackup(false);
      return;
    }
    setUsingBackup(true);
    if (!list.length) return;
    await waitForVoices();
    if (!isSpeakSession(tok)) return;
    if (langRef.current === "zh" && !hasLangVoice("zh")) {
      setNoVoice(true);
      setMode("idle");
      return;
    }
    setNoVoice(false);
    const voice = pickVoice(langRef.current);
    if (langRef.current === "zh" && voice && !/^zh/i.test(voice.lang) && !/chinese|cmn|普通话/i.test(voice.name)) {
      setNoVoice(true);
      setMode("idle");
      return;
    }
    function utter(i: number) {
      if (!isSpeakSession(tok) || !want.current) return;
      if (i >= list.length) {
        setMode("idle");
        setIdx(0);
        want.current = false;
        applyMedia("idle", 0, list);
        return;
      }
      const line = list[i]!;
      if (langRef.current === "en" && /[\u4e00-\u9fff]/.test(line)) {
        utter(i + 1);
        return;
      }
      const spoken = spokenLines[i] || line;
      const u = new SpeechSynthesisUtterance(spoken);
      if (voice) u.voice = voice;
      u.lang = langRef.current === "zh" ? "zh-CN" : "en-US";
      u.rate = rateRef.current;
      u.onstart = () => {
        if (!isSpeakSession(tok)) return;
        setIdx(i);
        idxRef.current = i;
        setMode("playing");
        applyMedia("playing", i, list);
      };
      u.onend = () => {
        if (!isSpeakSession(tok) || !want.current) return;
        utter(i + 1);
      };
      u.onerror = () => {
        if (!isSpeakSession(tok) || !want.current) return;
        utter(i + 1);
      };
      window.speechSynthesis.speak(u);
    }
    setIdx(start);
    utter(start);
  }

  function changeRate(next: TtsRate) {
    setRate(next);
    writeTtsRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  }

  function seekMp3(frac: number) {
    const el = audioRef.current;
    if (!el?.duration) return;
    el.currentTime = frac * el.duration;
    setProgress(frac);
  }

  function onTime() {
    const el = audioRef.current;
    if (!el?.duration) return;
    const p = el.currentTime / el.duration;
    setProgress(p);
    const n = listRef.current.length || lines.length;
    if (n) {
      const i = Math.min(n - 1, Math.floor(p * n + 1e-6));
      setIdx(i);
      idxRef.current = i;
    }
  }

  return (
    <div className="tz-radio space-y-2">
      {fileUrl ? (
        <audio
          ref={audioRef}
          src={fileUrl}
          preload="metadata"
          className="sr-only"
          onCanPlay={() => setHasMp3(true)}
          onError={() => setHasMp3(false)}
          onTimeUpdate={onTime}
          onEnded={() => {
            setMode("idle");
            setIdx(0);
            setProgress(0);
          }}
        />
      ) : null}
      <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
        {mode === "playing" ? (
          <button type="button" className="inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg" onClick={pause}>
            {t.pause}
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg"
            onClick={() => (mode === "paused" ? resume() : void speakFrom(0))}
          >
            {mode === "paused" ? t.resume : listenLabel || t.listen}
          </button>
        )}
        <button type="button" disabled={mode === "idle"} className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 disabled:opacity-40" onClick={stopAll}>
          {t.stop}
        </button>
        <span className="text-sm text-muted">{t.rate}</span>
        {TTS_RATES.map((r) => (
          <button
            key={r}
            type="button"
            disabled={mode === "idle"}
            className={
              r === rate
                ? "inline-flex min-h-9 items-center rounded-full bg-forest px-3 text-sm text-forest-fg disabled:opacity-40"
                : "inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3 text-sm disabled:opacity-40"
            }
            onClick={() => changeRate(r)}
          >
            {r}×
          </button>
        ))}
      </div>
      {mode !== "idle" && hasMp3 ? (
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(progress * 1000)}
          aria-label={t.progress}
          className="w-full accent-forest"
          onChange={(e) => seekMp3(Number(e.target.value) / 1000)}
        />
      ) : null}
      {mode !== "idle" && lines[idx] ? <p className="rounded-lg bg-surface-2 px-3 py-2 text-base leading-relaxed">{lines[idx]}</p> : null}
      {noVoice ? <p className="rounded-xl bg-surface-2 px-3 py-2 text-sm leading-relaxed text-muted">{t.noZhVoice}</p> : null}
      {mode !== "idle" && usingBackup && !noVoice ? (
        <p className="rounded-xl bg-surface-2 px-3 py-2 text-sm leading-relaxed text-muted">{t.fallback}</p>
      ) : null}
      {lines.length ? (
        <ol data-tts-queue={howto && howLines.length ? "howto" : "full"} data-tts-count={lines.length} className="sr-only">
          {lines.map((line, i) => (
            <li key={`${i}-${line.slice(0, 8)}`}>{line}</li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function spokenScript(slug: string, lang: "zh" | "en", lines: string[]) {
  return { slug, lang, lines };
}
