import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/knowledge/types";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { ContributePhoto } from "./ContributePhoto";

const KIND_NOTE_ONCE = "tuzhi-kind-note";

export function PhotoGallery({ photos, slug, tall }: { photos: Photo[]; slug?: string; tall?: boolean }) {
  const lang = usePathLang();
  const t = messages[lang].knowledge;
  const [open, setOpen] = useState<Photo | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shown = photos.filter((p) => p.kind !== "missing" && p.src);
  const missing = photos.filter((p) => p.kind === "missing" || !p.src);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open]);

  function kindNote(p: Photo) {
    if (p.kind === "missing") return t.photoKindPending;
    if (p.role === "sheet") return t.photoKindSheet;
    if (p.kind === "lab") return t.photoKindLab;
    if (p.kind === "diagram") return t.photoKindDiagram;
    if (p.kind === "stock") return t.photoKindStock;
    return t.photoKindField;
  }

  function creditLine(p: Photo) {
    const bits: string[] = [];
    if (p.credit) bits.push(p.credit);
    return bits.join(" · ");
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {shown.map((p) => (
          <button
            key={p.src}
            type="button"
            className="overflow-hidden rounded-xl border border-line bg-surface-2"
            onClick={() => setOpen(p)}
          >
            <img
              src={p.src}
              alt={p.alt}
              className={tall ? "h-56 w-full object-cover lg:h-[280px] lg:min-h-[280px]" : "h-56 w-full object-cover"}
              loading="lazy"
              width={400}
              height={tall ? 280 : 224}
            />
            <span className="block p-2 text-left text-sm text-muted">
              {p.caption.replace(/示意图，不能单凭此图下肥。?/g, "").trim()}
              <span className="mt-1 block text-subtle">{kindNote(p)}</span>
              {creditLine(p) ? <span className="mt-1 block text-subtle">{creditLine(p)}</span> : null}
              {p.sourceUrl ? (
                <a
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-forest underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.photoSource}
                </a>
              ) : null}
            </span>
          </button>
        ))}
        {missing.map((p, i) => (
          <div key={`${p.alt}-${i}`} className="overflow-hidden rounded-xl border border-dashed border-line bg-surface p-3">
            <div className="grid h-32 place-items-center rounded-lg bg-surface-2 text-sm text-muted">{t.missingShot}</div>
            <p className="mt-2 text-sm text-muted">{p.caption || t.pendingPhoto}</p>
            <ContributePhoto slug={slug} part={p.alt} />
          </div>
        ))}
      </div>
      {open ? (
        <div
          className="fixed inset-x-0 top-0 z-50 grid min-h-dvh place-items-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={open.alt || open.caption}
          onClick={() => setOpen(null)}
        >
          <div className="relative max-h-[90dvh] max-w-full" onClick={(e) => e.stopPropagation()}>
            <img src={open.src} alt={open.alt} className="max-h-[90dvh] max-w-full rounded-xl object-contain" />
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              className="absolute right-2 top-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-forest px-3 text-sm font-medium text-forest-fg"
              onClick={() => setOpen(null)}
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
      <span className="sr-only" data-kind-note={KIND_NOTE_ONCE}>
        {t.photoKindDiagram}
      </span>
    </>
  );
}
