import { createFileRoute } from "@tanstack/react-router";
import { PROBLEMS } from "@/lib/constants";
import { listPosts } from "@/lib/community/server";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { displayName, lex } from "@/lib/i18n/lexicon";
import { seo } from "@/lib/seo";
import { LangLink } from "@/components/LangLink";
import { useAnyLoaderData, useAnyNavigate, useAnySearch } from "@/lib/i18n/route-data";
import { isSeedPost, parseProblem, problemQuery } from "@/lib/problem-query";

type Search = { problem?: string };

export const Route = createFileRoute("/community/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    problem: typeof s.problem === "string" ? s.problem : undefined,
  }),
  loaderDeps: ({ search }) => ({ problem: search.problem }),
  loader: async ({ deps }) => ({ posts: await listPosts({ data: { problem: parseProblem(deps.problem) } }) }),
  head: () =>
    seo({
      title: "问答区｜土知",
      description: "把自家地里的照片和现象发出来。作物、地区、你看见的样子写清，互相看。",
      path: "/community",
    }),
  component: Community,
});

export function Community() {
  const lang = usePathLang();
  const t = messages[lang];
  const r = t.community;
  const { posts } = useAnyLoaderData<{ posts: Awaited<ReturnType<typeof listPosts>> }>();
  const search = useAnySearch<Search>();
  const nav = useAnyNavigate();
  const problemZh = parseProblem(search.problem);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold">{r.title}</h1>
        <p className="mt-1 text-muted">{r.lead}</p>
      </header>
      <p className="tz-info text-sm">{r.seedNote}</p>
      <div className="tz-chip-row">
        <button
          type="button"
          onClick={() => nav({ search: { problem: undefined } })}
          className={!problemZh ? "inline-flex min-h-11 shrink-0 items-center rounded-full bg-forest px-4 text-forest-fg" : "inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-surface-2 px-4"}
        >
          {t.all}
        </button>
        {PROBLEMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => nav({ search: { problem: problemQuery(p, lang) } })}
            data-problem={p}
            className={problemZh === p ? "inline-flex min-h-11 shrink-0 items-center rounded-full bg-forest px-4 text-forest-fg" : "inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-surface-2 px-4"}
          >
            {lex(p, lang)}
          </button>
        ))}
      </div>
      <LangLink to="/community/new" className="flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg text-forest-fg">
        {r.ask}
      </LangLink>
      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="tz-card p-6 text-muted">
            {r.empty}
            <span className="mt-3 flex gap-3">
              <LangLink to="/diagnose" className="text-forest underline">
                {t.nav.diagnose}
              </LangLink>
              <LangLink to="/knowledge" className="text-forest underline">
                {t.nav.knowledge}
              </LangLink>
            </span>
          </p>
        ) : (
          posts.map((p) => (
            <LangLink key={p.id} to="/community/$id" params={{ id: p.id }} data-problem={p.problem} className="tz-card tz-card-bar block p-4">
              <p className="font-medium">
                {isSeedPost(p.id) ? <span className="mr-2 text-sm font-medium text-clay">{r.seedBadge}</span> : null}
                {lang === "en" && p.titleEn && !/[\u4e00-\u9fff]/.test(p.titleEn) ? p.titleEn : p.title}
              </p>
              <p className="mt-1 line-clamp-2 text-muted">{lang === "en" && p.bodyEn && !/[\u4e00-\u9fff]/.test(p.bodyEn) ? p.bodyEn : p.body}</p>
              <p className="mt-2 text-sm text-subtle">
                {displayName(p.author, lang)} · {String(p.createdAt).slice(0, 10)} · {lex(p.problem, lang)} ·{" "}
                {p.answers.length ? r.answered : r.waiting}
              </p>
            </LangLink>
          ))
        )}
      </div>
    </div>
  );
}
