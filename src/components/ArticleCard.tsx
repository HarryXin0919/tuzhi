import { LangLink } from "@/components/LangLink";
import metaJson from "@/data/articles-en-meta.json";
import { hasHan } from "@/lib/i18n/han";
import { lex } from "@/lib/i18n/lexicon";
import { usePathLang } from "@/lib/i18n/use-path-lang";

const META = metaJson as Record<string, { title: string; subtitle: string; summary: string; card?: string }>;

export type CardInput = {
  slug: string;
  title: string;
  summary: string;
  card?: string;
  problems: string[];
  photos?: { src: string; alt?: string }[];
};

export function ArticleCard({ article, variant = "row" }: { article: CardInput; variant?: "row" | "tile" }) {
  const lang = usePathLang();
  const m = lang === "en" ? META[article.slug] : undefined;
  const title = m?.title && !hasHan(m.title) ? m.title : lang === "en" ? article.slug.replace(/-/g, " ") : article.title;
  const summaryRaw = m?.card || m?.summary || article.card || article.summary;
  const summary = lang === "en" ? (summaryRaw && !hasHan(summaryRaw) ? summaryRaw : "") : article.card || article.summary;
  const src = article.photos?.find((p) => p.src && p.src.trim())?.src ?? "";
  const first = article.photos?.find((p) => p.src && p.src.trim());
  const alt = first?.alt && (lang !== "en" || !hasHan(first.alt)) ? first.alt : title;
  const thumb =
    src && !/missing/.test(src) ? (
      <img
        src={src}
        alt={alt}
        className={variant === "tile" ? "aspect-[16/10] w-full bg-surface-2 object-cover" : "h-28 w-28 shrink-0 bg-surface-2 object-cover sm:h-32 sm:w-36"}
        loading="lazy"
        width={variant === "tile" ? 640 : 144}
        height={variant === "tile" ? 400 : 128}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    ) : (
      <span
        className={
          variant === "tile"
            ? "grid aspect-[16/10] w-full place-items-center bg-surface-2 text-sm text-muted"
            : "grid h-28 w-28 shrink-0 place-items-center bg-surface-2 px-2 text-center text-xs text-muted sm:h-32 sm:w-36"
        }
      >
        {lang === "en" ? "Field photo to add" : "待补田间照片"}
      </span>
    );
  const body = (
    <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3">
      <span className="block font-display text-[1.05rem] font-semibold leading-snug text-ink">{title}</span>
      <span className={variant === "tile" ? "block line-clamp-2 text-[0.95rem] leading-relaxed text-muted" : "block line-clamp-2 text-[0.95rem] leading-relaxed text-muted"}>
        {summary}
      </span>
      <span className="flex flex-wrap gap-1">
        {article.problems.slice(0, 1).map((p) => (
          <span key={p} className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-clay">
            {lex(p, lang)}
          </span>
        ))}
      </span>
    </span>
  );
  return (
    <LangLink
      to="/knowledge/$slug"
      params={{ slug: article.slug }}
      className={variant === "tile" ? "overflow-hidden rounded-2xl border border-line bg-surface" : "flex overflow-hidden rounded-2xl border border-line bg-surface"}
    >
      {variant === "tile" ? (
        <>
          {thumb}
          {body}
        </>
      ) : (
        <>
          {thumb}
          {body}
        </>
      )}
    </LangLink>
  );
}
