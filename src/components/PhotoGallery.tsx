import { useState } from "react";
import type { Photo } from "@/lib/knowledge/types";

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<Photo | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((p) => (
          <button
            key={p.src}
            type="button"
            className="overflow-hidden rounded-xl border border-line bg-surface-2"
            onClick={() => setOpen(p)}
          >
            <img src={p.src} alt={p.alt} className="h-40 w-full object-cover" />
            <span className="block p-2 text-left text-sm text-muted">{p.caption}</span>
          </button>
        ))}
      </div>
      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/80 p-4"
          onClick={() => setOpen(null)}
          role="presentation"
        >
          <img src={open.src} alt={open.alt} className="max-h-[90dvh] max-w-full rounded-xl object-contain" />
        </div>
      ) : null}
    </>
  );
}
