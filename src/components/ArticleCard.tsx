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
  const problem = article.problems[0];
  const thumb =
    src && !/missing/.test(src) ? (
      <span className={variant === "tile" ? "relative block" : "relative block w-32 shrink-0 sm:w-40"}>
        <img
          src={src}
          alt={alt}
          className={variant === "tile" ? "aspect-[16/10] w-full bg-surface-2 object-cover" : "aspect-[16/10] h-auto w-32 shrink-0 bg-surface-2 object-cover sm:w-40"}
          loading="lazy"
          width={variant === "tile" ? 640 : 160}
          height={variant === "tile" ? 400 : 100}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {problem ? <span className="tz-pill-corner">{lex(problem, lang)}</span> : null}
      </span>
    ) : (
      <span
        className={
          variant === "tile"
            ? "relative grid aspect-[16/10] w-full place-items-center bg-surface-2 text-sm text-muted"
            : "relative grid aspect-[16/10] w-32 shrink-0 place-items-center bg-surface-2 px-2 text-center text-xs text-muted sm:w-40"
        }
      >
        {lang === "en" ? "Field photo to add" : "待补田间照片"}
        {problem ? <span className="tz-pill-corner">{lex(problem, lang)}</span> : null}
      </span>
    );
  const body = (
    <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3">
      <span className="block line-clamp-2 font-display text-[1.05rem] font-semibold leading-snug text-ink">{title}</span>
      <span className="block line-clamp-2 text-[0.95rem] leading-relaxed text-muted">{summary}</span>
    </span>
  );
  return (
    <LangLink
      to="/knowledge/$slug"
      params={{ slug: article.slug }}
      data-problem={problem}
      className={variant === "tile" ? "tz-card tz-card-bar tz-card-tile block" : "tz-card tz-card-bar tz-card-row"}
    >
      {thumb}
      {body}
    </LangLink>
  );
}
