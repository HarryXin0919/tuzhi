import { useRef } from "react";

const SHOTS = {
  plant: {
    good: "/images/diagnose/whole-good.jpg",
    bad: "/images/diagnose/whole-bad.jpg",
    goodAlt: "整垄麦苗在画面里。Wikimedia CC BY-SA：Triticum aestivum (common wheat).",
    badAlt: "只见天、不见苗。不要这样拍整株。",
  },
  leaf: {
    good: "/images/diagnose/close-good.jpg",
    bad: "/images/diagnose/close-bad.jpg",
    goodAlt: "叶片特写：新叶发黄、叶脉还绿。",
    badAlt: "逆光发黑，看不清叶位。",
  },
  soil: {
    good: "/images/diagnose/soil-good.jpg",
    bad: "/images/diagnose/soil-bad.jpg",
    goodAlt: "土面白霜能看清。ISRIC Solonchak，Wikimedia CC BY-SA 3.0。",
    badAlt: "远处风景，看不清土面。",
  },
} as const;

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
  kind?: "plant" | "leaf" | "soil";
  onFile: (f?: File | null) => void;
}) {
  const cam = useRef<HTMLInputElement>(null);
  const alb = useRef<HTMLInputElement>(null);
  const shot = SHOTS[kind];
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface p-3">
      <p className="font-medium">{label}</p>
      <p className="text-sm text-muted">{hint}</p>
      {avoid ? <p className="text-sm text-subtle">{avoid}</p> : null}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <figure className="overflow-hidden rounded-lg bg-surface-2">
          <div className="border-t-4 border-forest">
            <img src={shot.good} alt={shot.goodAlt} className="h-[140px] min-h-[140px] w-full object-cover" width={280} height={140} />
          </div>
          <figcaption className="px-2 py-1 text-xs text-muted">{shotLabel}</figcaption>
        </figure>
        <figure className="overflow-hidden rounded-lg bg-surface-2">
          <div className="border-t-4 border-danger">
            <img src={shot.bad} alt={shot.badAlt} className="h-[140px] min-h-[140px] w-full object-cover" width={280} height={140} />
          </div>
          <figcaption className="px-2 py-1 text-xs text-muted">{avoidLabel}</figcaption>
        </figure>
      </div>
      {preview ? <img src={preview} alt="" className="mt-2 h-32 w-full rounded-lg object-cover" /> : <span className="mt-2 block h-2" />}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-forest px-2 text-sm text-forest-fg" onClick={() => cam.current?.click()}>
          {cameraLabel}
        </button>
        <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-surface px-2 text-sm" onClick={() => alb.current?.click()}>
          {albumLabel}
        </button>
      </div>
      <input ref={cam} type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
      <input ref={alb} type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
    </div>
  );
}
