import { Link } from "@tanstack/react-router";
import { localizeArticle } from "@/lib/knowledge/localize";
import type { Article } from "@/lib/knowledge/types";
import { useLang } from "@/lib/i18n/lang";

export function ArticleCard({ article }: { article: Article }) {
  const lang = useLang((s) => s.lang);
  const a = localizeArticle(article, lang);
  const src = a.photos[0]?.src ?? "";
  const alt = a.photos[0]?.alt || a.title;
  return (
    <Link
      to="/knowledge/$slug"
      params={{ slug: article.slug }}
      className="flex overflow-hidden rounded-2xl border border-line bg-surface"
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-28 w-28 shrink-0 bg-surface-2 object-cover sm:h-32 sm:w-36"
          loading="lazy"
          width={144}
          height={128}
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
      ) : (
        <span className="h-28 w-28 shrink-0 bg-surface-2 sm:h-32 sm:w-36" />
      )}
      <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3">
        <span className="block font-display text-[1.05rem] font-semibold leading-snug text-ink">{a.title}</span>
        <span className="mt-0 block line-clamp-2 border-t border-line/70 pt-1.5 text-[0.95rem] leading-relaxed text-muted">
          {a.summary}
        </span>
        <span className="flex flex-wrap gap-1">
          {a.problems.slice(0, 1).map((p) => (
            <span key={p} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-clay">
              {p}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}
