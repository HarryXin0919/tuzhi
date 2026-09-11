import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PROBLEMS } from "@/lib/constants";
import { hotArticles } from "@/lib/knowledge/search";
import { ArticleCard } from "@/components/ArticleCard";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { listPosts } from "@/lib/community/server";
import { displayName } from "@/lib/i18n/lexicon";

export const Route = createFileRoute("/")({
  loader: async () => {
    const posts = await listPosts({ data: {} });
    return { posts: posts.slice(0, 4) };
  },
  component: Home,
});

function Home() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const { posts } = Route.useLoaderData();
  const hot = hotArticles(6);
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-semibold">{t.name}</h1>
        <p className="text-lg text-muted">{t.tagline}</p>
        <p className="leading-relaxed">{t.home.lead}</p>
        <Link
          to="/diagnose"
          className="flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg"
        >
          {t.home.diagnose}
        </Link>
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            const q = new FormData(e.currentTarget).get("q");
            window.location.href = `/knowledge?q=${encodeURIComponent(String(q || ""))}`;
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" />
          <input
            name="q"
            placeholder={t.home.searchPh}
            aria-label={t.home.searchAria}
            className="min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-3 text-base"
          />
        </form>
      </header>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{t.home.problems}</h2>
        <div className="flex flex-wrap gap-2">
          {PROBLEMS.filter((p) => p !== "其他").map((p) => (
            <Link
              key={p}
              to="/knowledge"
              search={{ problem: p }}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4"
            >
              {lex(p, lang)}
            </Link>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{t.home.hot}</h2>
          <Link to="/knowledge" className="text-forest underline">
            {t.home.more}
          </Link>
        </div>
        <div className="grid gap-3">{hot.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
      </section>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{t.home.posts}</h2>
          <Link to="/community" className="text-forest underline">
            {t.home.toCommunity}
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-muted">{t.home.noPosts}</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.id}>
                <Link
                  to="/community/$id"
                  params={{ id: p.id }}
                  className="block rounded-2xl border border-line bg-surface p-4"
                >
                  <p className="font-medium">{p.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {displayName(p.author, lang)} · {String(p.createdAt).slice(0, 10)} ·{" "}
                    {p.answers.length ? t.home.answered(p.answers.length) : t.home.waiting}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
