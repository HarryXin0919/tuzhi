import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PROBLEMS } from "@/lib/constants";
import { hotArticles } from "@/lib/knowledge/catalog";
import { ArticleCard } from "@/components/ArticleCard";
import { LangLink } from "@/components/LangLink";
import { useAnyLoaderData } from "@/lib/i18n/route-data";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { listPosts } from "@/lib/community/server";
import { displayName } from "@/lib/i18n/lexicon";
import { hasHan } from "@/lib/i18n/han";
import { HOME_DESC, HOME_TITLE, orgJsonLd, seo } from "@/lib/seo";
import { isSeedPost, problemQuery } from "@/lib/problem-query";

export const Route = createFileRoute("/")({
  loader: async () => {
    const posts = await listPosts({ data: {} });
    return { posts: posts.slice(0, 4) };
  },
  head: () => seo({ title: HOME_TITLE, description: HOME_DESC, path: "/" }),
  component: Home,
});

export function Home() {
  const lang = usePathLang();
  const t = messages[lang];
  const { posts } = useAnyLoaderData<{ posts: Awaited<ReturnType<typeof listPosts>> }>();
  const hot = hotArticles(6);
  const problems = PROBLEMS.filter((p) => p !== "其他");
  return (
    <div className="space-y-10 md:space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
      <header className="tz-hero max-w-[46rem] space-y-4">
        <h1 className="font-display font-semibold">{t.name}</h1>
        <p className="tz-tagline">{t.tagline}</p>
        <p className="relative leading-relaxed">{t.home.lead}</p>
        <LangLink
          to="/diagnose"
          className="relative flex min-h-14 max-w-xl items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg"
        >
          {t.home.diagnose}
        </LangLink>
        <form method="get" action={lang === "en" ? "/en/knowledge" : "/knowledge"} className="tz-search relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" />
          <input
            name="q"
            placeholder={t.home.searchPh}
            aria-label={t.home.searchAria}
            className="min-h-12 w-full border border-line pl-11 pr-3 text-base"
          />
        </form>
      </header>
      <section className="space-y-3">
        <h2 className="tz-chapter font-display text-xl font-semibold">{t.home.problems}</h2>
        <div className="tz-chip-row tz-chip-spread">
          {problems.map((p) => (
            <LangLink
              key={p}
              to="/knowledge"
              search={{ problem: problemQuery(p, lang) }}
              data-problem={p}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-surface-2 px-4"
            >
              <span className="tz-dot mr-2" />
              {lex(p, lang)}
            </LangLink>
          ))}
        </div>
        <p className="text-sm text-subtle lg:hidden">{t.home.chipsHint}</p>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="tz-chapter font-display text-xl font-semibold">{t.home.hot}</h2>
          <LangLink to="/knowledge" className="text-forest underline">
            {t.home.more}
          </LangLink>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hot.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="tile" />
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="tz-chapter font-display text-xl font-semibold">{t.home.posts}</h2>
          <LangLink to="/community" className="text-forest underline">
            {t.home.toCommunity}
          </LangLink>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {posts.length ? (
            posts.map((p) => (
              <LangLink
                key={p.id}
                to="/community/$id"
                params={{ id: p.id }}
                data-problem={p.problem}
                className="tz-card tz-card-bar p-4"
              >
                <p className="font-medium">
                  {isSeedPost(p.id) ? <span className="mr-2 text-sm font-medium text-clay">{t.home.seedBadge}</span> : null}
                  {lang === "en" && p.titleEn && !hasHan(p.titleEn) ? p.titleEn : p.title}
                </p>
                <p className="mt-1 text-sm text-muted">{displayName(p.author, lang)}</p>
              </LangLink>
            ))
          ) : (
            <p className="text-muted">{t.home.noPosts}</p>
          )}
        </div>
      </section>
    </div>
  );
}
