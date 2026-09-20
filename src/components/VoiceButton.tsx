import { usePathLang } from "@/lib/i18n/use-path-lang";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Mic, Square } from "lucide-react";
import { type Lang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { correctFarmSpeech } from "@/lib/stt/correct";
import { transcribeAudio } from "@/lib/diagnose/transcribe";

type Rec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((ev: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

function getSR(): (new () => Rec) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function VoiceButton({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const lang = usePathLang();
  const d = messages[lang].diagnose;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [state, setState] = useState<"idle" | "listen" | "record" | "busy">("idle");
  const [hint, setHint] = useState("");
  const [interim, setInterim] = useState("");
  const recRef = useRef<Rec | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const baseRef = useRef(value);
  const hold = useRef(false);
  const langRef = useRef<Lang>(lang);
  langRef.current = lang;
  baseRef.current = value;

  useEffect(() => {
    return () => stopAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stopAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function stopAll() {
    hold.current = false;
    try {
      recRef.current?.abort();
    } catch {
      /* ignore */
    }
    recRef.current = null;
    try {
      if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
    } catch {
      /* ignore */
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setInterim("");
    setState("idle");
  }

  function append(text: string) {
    const cleaned = correctFarmSpeech(text);
    if (!cleaned) return;
    const prev = baseRef.current.trim();
    const next = prev ? `${prev} ${cleaned}` : cleaned;
    baseRef.current = next;
    onChange(next);
  }

  function startBrowser() {
    const Ctor = getSR();
    if (!Ctor) return false;
    const rec = new Ctor();
    rec.lang = langRef.current === "en" ? "en-US" : "zh-CN";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (ev) => {
      let fin = "";
      let mid = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const r = ev.results[i];
        if (!r) continue;
        if (r.isFinal) fin += r[0].transcript;
        else mid += r[0].transcript;
      }
      if (mid) setInterim(correctFarmSpeech(mid));
      if (fin) {
        append(fin);
        setInterim("");
      }
    };
    rec.onerror = (ev) => {
      const err = ev.error || "";
      if (err === "not-allowed") setHint(d.sttNoMic);
      else if (err === "no-speech") setHint(d.sttNoHear);
      else if (err === "network") {
        setHint(d.sttNet);
        void startRecorder();
        return;
      } else setHint(d.sttNoHear);
      stopAll();
    };
    rec.onend = () => {
      if (hold.current && recRef.current === rec) {
        try {
          rec.start();
        } catch {
          /* ignore */
        }
        return;
      }
      setState((s) => (s === "listen" ? "idle" : s));
    };
    recRef.current = rec;
    try {
      rec.start();
      setState("listen");
      setHint(d.sttListening);
      return true;
    } catch {
      return false;
    }
  }

  async function startRecorder() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setHint(d.sttNoSupport);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size) chunks.current.push(e.data);
      };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        if (blob.size < 800) {
          setHint(d.sttNoHear);
          setState("idle");
          return;
        }
        setState("busy");
        setHint(d.sttBusy);
        const data = await blobToData(blob);
        const res = await transcribeAudio({ data: { audio: data, lang: langRef.current } });
        setState("idle");
        if (!res.ok) {
          setHint(res.error === "off" ? d.sttNoSupport : d.sttNet);
          return;
        }
        append(res.text);
        setHint("");
      };
      mediaRef.current = rec;
      rec.start();
      setState("record");
      setHint(d.sttListening);
    } catch {
      setHint(d.sttNoMic);
      setState("idle");
    }
  }

  async function toggle() {
    if (state === "listen" || state === "record") {
      hold.current = false;
      if (state === "listen") {
        try {
          recRef.current?.stop();
        } catch {
          /* ignore */
        }
        recRef.current = null;
        setState("idle");
        setInterim("");
        setHint("");
        return;
      }
      try {
        mediaRef.current?.stop();
      } catch {
        /* ignore */
      }
      return;
    }
    if (state === "busy") return;
    setHint(d.sttPerm);
    hold.current = true;
    if (!startBrowser()) await startRecorder();
  }

  const live = state === "listen" || state === "record";

  return (
    <div className="space-y-2">
      <div className="tz-mic">
        <button
          type="button"
          className={
            live
              ? "inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-forest bg-surface px-4 text-forest"
              : "inline-flex min-h-12 items-center gap-2 rounded-full bg-forest px-4 text-forest-fg"
          }
          aria-pressed={live}
          aria-label={live ? d.sttStop : d.sttMic}
          onClick={() => void toggle()}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            if (state !== "idle") return;
            hold.current = true;
          }}
        >
          {live ? <Square className="size-5" /> : <Mic className="size-5" />}
          {live ? d.sttStop : d.sttMic}
        </button>
        <span className="text-sm text-muted">{d.sttHold}</span>
      </div>
      <p className="text-sm text-muted">{d.sttPerm}</p>
      <p className="text-sm text-subtle">{d.sttDialect}</p>
      {interim ? <p className="rounded-xl bg-surface-2 px-3 py-2 text-base">{interim}</p> : null}
      {hint && hint !== d.sttPerm ? <p className="tz-miss text-sm">{hint}</p> : null}
    </div>
  );
}

function blobToData(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}
