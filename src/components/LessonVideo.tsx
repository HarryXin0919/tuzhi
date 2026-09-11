import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { articleVideo, biliEmbed, wikiVideo, youtubeEmbed, type VideoMap } from "@/lib/video/catalog";

function persistKey(slug: string) {
  return `tuzhi-video-src:${slug}`;
}

export function LessonVideo({ slug, kind = "article" }: { slug: string; kind?: "article" | "wiki" }) {
  const lang = useLang((s) => s.lang);
  const t = messages[lang].knowledge;
  const map: VideoMap | undefined = kind === "wiki" ? wikiVideo(slug) : articleVideo(slug);
  const hasBili = !!map?.bvid;
  const hasYt = !!map?.youtube;
  const [src, setSrc] = useState<"bili" | "en">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(persistKey(slug));
      if (saved === "bili" || saved === "en") return saved;
    }
    if (lang === "en" && hasYt) return "en";
    return "bili";
  });

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(persistKey(slug)) : null;
    if (saved === "bili" || saved === "en") {
      setSrc(saved);
      return;
    }
    setSrc(lang === "en" && hasYt ? "en" : "bili");
  }, [lang, slug, hasYt]);

  function choose(next: "bili" | "en") {
    setSrc(next);
    try {
      localStorage.setItem(persistKey(slug), next);
    } catch {
      /* ignore */
    }
  }

  if (!hasBili && !hasYt) return null;

  const show = src === "en" && hasYt ? "en" : hasBili ? "bili" : hasYt ? "en" : null;
  return (
    <section className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{t.videos}</h2>
      {hasBili && hasYt ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={
              show === "bili"
                ? "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg"
                : "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4"
            }
            onClick={() => choose("bili")}
          >
            {t.switchBili}
          </button>
          <button
            type="button"
            className={
              show === "en"
                ? "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-forest-fg"
                : "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4"
            }
            onClick={() => choose("en")}
          >
            {t.switchEn}
          </button>
        </div>
      ) : null}
      {show === "bili" && map?.bvid ? (
        <>
          <div className="aspect-video overflow-hidden rounded-xl border border-line bg-surface">
            <iframe
              title={map.biliTitle || t.videos}
              src={biliEmbed(map.bvid)}
              className="size-full"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-sm text-muted">{t.biliNote}</p>
        </>
      ) : null}
      {show === "en" && map?.youtube ? (
        <div className="aspect-video overflow-hidden rounded-xl border border-line bg-surface">
          <iframe
            title={t.switchEn}
            src={youtubeEmbed(map.youtube)}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
      {src === "en" && !hasYt ? <p className="rounded-xl border border-line bg-surface p-4 text-muted">{t.noEnVideo}</p> : null}
      {lang === "en" && !hasYt && src !== "en" ? (
        <p className="rounded-xl border border-line bg-surface p-4 text-muted">{t.noEnVideo}</p>
      ) : null}
    </section>
  );
}
