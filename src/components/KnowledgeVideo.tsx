import { useEffect, useState } from "react";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { articleVideo, biliEmbed, wikiVideo, youtubeEmbed, type VideoMap } from "@/lib/video/catalog";

function realBvid(id?: string | null) {
  return id && /^BV[0-9A-Za-z]+$/.test(id) ? id : "";
}
function realYt(id?: string | null) {
  return id && /^[\w-]{11}$/.test(id) ? id : "";
}

export function KnowledgeVideo({ slug, kind = "article" }: { slug: string; kind?: "article" | "wiki" }) {
  const lang = usePathLang();
  const t = messages[lang].knowledge;
  const map: VideoMap | undefined = kind === "wiki" ? wikiVideo(slug) : articleVideo(slug);
  const bvid = realBvid(map?.bvid);
  const yt = realYt(map?.youtube);
  const [src, setSrc] = useState<"bili" | "yt">(lang === "en" && yt ? "yt" : bvid ? "bili" : "yt");

  useEffect(() => {
    if (lang === "en" && yt) setSrc("yt");
    else if (bvid) setSrc("bili");
    else if (yt) setSrc("yt");
  }, [lang, slug, bvid, yt]);

  if (!bvid && !yt) return null;
  const usingYt = src === "yt" && yt;
  const embed = usingYt ? youtubeEmbed(yt) : bvid ? biliEmbed(bvid) : yt ? youtubeEmbed(yt) : "";
  if (!embed) return null;
  const title = usingYt ? map?.why || "Lesson video" : map?.biliTitle || t.videos;

  return (
    <section className="space-y-2">
      <h2 className="font-display text-2xl font-semibold">{t.videos}</h2>
      <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-surface-2">
        <iframe
          key={embed}
          src={embed}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {bvid && src !== "bili" ? (
          <button type="button" className="inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-4 text-sm" onClick={() => setSrc("bili")}>
            {t.switchZh}
          </button>
        ) : null}
        {yt && src !== "yt" ? (
          <button type="button" className="inline-flex min-h-11 items-center rounded-xl border border-line bg-surface px-4 text-sm" onClick={() => setSrc("yt")}>
            {t.switchEn}
          </button>
        ) : null}
      </div>
    </section>
  );
}

export { KnowledgeVideo as LessonVideo };
