import { useEffect, useId, useRef, useState } from "react";
import { isWeChat } from "@/lib/device";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";

const SHOTS = {
  plant: {
    good: "/images/diagnose/whole-good.jpg",
    bad: "/images/diagnose/whole-bad.jpg",
  },
  leaf: {
    good: "/images/diagnose/close-good.jpg",
    bad: "/images/diagnose/close-bad.jpg",
  },
  soil: {
    good: "/images/diagnose/soil-good.jpg",
    bad: "/images/diagnose/soil-bad.jpg",
  },
  lab: {
    good: "/images/diagnose/lab-good.jpg",
    bad: "/images/diagnose/lab-bad.jpg",
  },
} as const;

async function heicToJpeg(file: File): Promise<File> {
  const looksHeic = /heic|heif/i.test(file.type) || /\.hei[cf]$/i.test(file.name);
  if (!looksHeic || typeof createImageBitmap !== "function") return file;
  try {
    const bmp = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bmp, 0, 0);
    bmp.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.hei[cf]$/i, ".jpg"), { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function PhotoSlot({
  label,
  hint,
  avoid,
  preview,
  cameraLabel,
  albumLabel,
  shotLabel,
  avoidLabel,
  kind = "plant",
  onFile,
}: {
  label: string;
  hint: string;
  avoid: string;
  preview: string | null;
  cameraLabel: string;
  albumLabel: string;
  shotLabel?: string;
  avoidLabel?: string;
  kind?: "plant" | "leaf" | "soil" | "lab";
  onFile: (f?: File | null) => void;
}) {
  const lang = usePathLang();
  const d = messages[lang].diagnose;
  const uid = useId();
  const camId = `${uid}-cam`;
  const albId = `${uid}-alb`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [wechat, setWechat] = useState(false);
  const [live, setLive] = useState(false);
  const [denied, setDenied] = useState("");

  useEffect(() => {
    setWechat(isWeChat());
  }, []);

  useEffect(() => {
    return () => stopLive();
  }, []);

  function stopLive() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    const v = videoRef.current;
    if (v) v.srcObject = null;
    setLive(false);
  }

  async function pick(file?: File | null) {
    if (!file) {
      onFile(null);
      return;
    }
    onFile(await heicToJpeg(file));
  }

  async function openLive() {
    setDenied("");
    if (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
      setDenied(d.cameraInsecure);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      setLive(true);
      requestAnimationFrame(() => {
        const v = videoRef.current;
        if (!v) return;
        v.srcObject = stream;
        void v.play().catch(() => {
          /* autoplay may need the shutter tap */
        });
      });
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") setDenied(d.cameraDenied);
      else if (name === "NotFoundError" || name === "OverconstrainedError") setDenied(d.cameraNone);
      else setDenied(d.cameraDenied);
    }
  }

  async function shutter() {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
    stopLive();
    if (!blob) return;
    await pick(new File([blob], `${kind}-${Date.now()}.jpg`, { type: "image/jpeg" }));
  }

  const shot = SHOTS[kind];
  const btn =
    "relative inline-flex min-h-12 min-w-[7.5rem] cursor-pointer items-center justify-center overflow-hidden rounded-lg px-3 text-center text-sm";

  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface p-3">
      <p className="font-medium">{label}</p>
      <p className="text-sm text-muted">{hint}</p>
      {avoid ? <p className="text-sm text-subtle">{avoid}</p> : null}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <figure className="overflow-hidden rounded-lg bg-surface-2">
          <div className="border-t-4 border-forest">
            <img src={shot.good} alt={shotLabel || ""} className="h-[140px] min-h-[140px] w-full object-cover" width={280} height={140} />
          </div>
          <figcaption className="px-2 py-1 text-xs leading-snug text-muted">{shotLabel}</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-lg bg-surface-2">
          <div className="border-t-4 border-danger">
            <img src={shot.bad} alt={avoidLabel || ""} className="h-[140px] min-h-[140px] w-full object-cover" width={280} height={140} />
          </div>
          <figcaption className="px-2 py-1 text-xs leading-snug text-muted">{avoidLabel}</figcaption>
        </figure>
      </div>
      {preview ? (
        <div className="relative mt-2">
          <img src={preview} alt="" className="h-32 w-full rounded-lg object-cover" />
          <button
            type="button"
            className="absolute right-2 top-2 inline-flex min-h-11 items-center rounded-full bg-surface px-3 text-sm"
            onClick={() => pick(null)}
          >
            {d.cameraDelete}
          </button>
        </div>
      ) : (
        <span className="mt-2 block h-2" />
      )}
      <div className="mt-2 grid grid-cols-2 gap-2 max-[899px]:grid-cols-2 [@media(pointer:coarse)]:grid-cols-2">
        <label htmlFor={camId} className={`${btn} tz-cam-phone bg-forest text-forest-fg`}>
          <span className="pointer-events-none">{preview ? d.cameraRetake : d.cameraPhone}</span>
          <input
            id={camId}
            type="file"
            accept="image/*"
            capture="environment"
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={cameraLabel || d.cameraPhone}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              void pick(f);
            }}
          />
        </label>
        <label htmlFor={albId} className={`${btn} tz-alb-phone border border-line bg-surface`}>
          <span className="pointer-events-none">{d.album}</span>
          <input
            id={albId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={albumLabel || d.album}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              void pick(f);
            }}
          />
        </label>
        <label htmlFor={`${uid}-file`} className={`${btn} tz-file-desk col-span-2 w-full border border-line bg-surface`}>
          <span className="pointer-events-none">{d.cameraFile}</span>
          <input
            id={`${uid}-file`}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={d.cameraFile}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              void pick(f);
            }}
          />
        </label>
      </div>
      <button
        type="button"
        className="tz-live-phone mt-2 min-h-12 w-full items-center justify-center rounded-lg border border-line bg-surface text-sm"
        onClick={() => void openLive()}
      >
        {d.cameraLive}
      </button>
      {wechat ? <p className="mt-2 text-sm leading-relaxed text-muted">{d.cameraWeChat}</p> : null}

      {denied ? <p className="mt-2 rounded-lg bg-surface-2 px-3 py-2 text-sm leading-relaxed text-muted">{denied}</p> : null}
      {live ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink/90 p-4">
          <video ref={videoRef} className="min-h-0 flex-1 rounded-xl bg-ink object-cover" playsInline muted autoPlay />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg" onClick={() => void shutter()}>
              {d.cameraShutter}
            </button>
            <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-surface" onClick={stopLive}>
              {d.cameraCancel}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
