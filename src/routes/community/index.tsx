import { createFileRoute, Link } from "@tanstack/react-router";
import { PROBLEMS } from "@/lib/constants";
import { listPosts } from "@/lib/community/server";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { displayName, lex } from "@/lib/i18n/lexicon";

type Search = { problem?: string };

export const Route = createFileRoute("/community/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    problem: typeof s.problem === "string" ? s.problem : undefined,
  }),
  loaderDeps: ({ search }) => ({ problem: search.problem }),
  loader: async ({ deps }) => ({ posts: await listPosts({ data: { problem: deps.problem } }) }),
  component: Community,
});

function Community() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const r = t.community;
  const { posts } = Route.useLoaderData();
  const search = Route.useSearch();
  const nav = Route.useNavigate();
  return (
    <div className="space-y-5">
      <header>
        <h1 className="font-display text-3xl font-semibold">{r.title}</h1>
        <p className="mt-1 text-muted">{r.lead}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => nav({ search: { problem: undefined } })}
          className={!search.problem ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2"}
        >
          {t.all}
        </button>
        {PROBLEMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => nav({ search: { problem: p } })}
            className={search.problem === p ? "rounded-full bg-forest px-4 py-2 text-forest-fg" : "rounded-full border border-line px-4 py-2"}
          >
            {lex(p, lang)}
          </button>
        ))}
      </div>
      <Link to="/community/new" className="flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg text-forest-fg">
        {r.ask}
      </Link>
      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-line bg-surface p-6 text-muted">
            {r.empty}
            <span className="mt-3 flex gap-3">
              <Link to="/diagnose" className="text-forest underline">
                {t.nav.diagnose}
              </Link>
              <Link to="/knowledge" className="text-forest underline">
                {t.nav.knowledge}
              </Link>
            </span>
          </p>
        ) : (
          posts.map((p) => (
            <Link key={p.id} to="/community/$id" params={{ id: p.id }} className="block rounded-2xl border border-line bg-surface p-4">
              <p className="font-medium">{p.title}</p>
              <p className="mt-1 line-clamp-2 text-muted">{p.body}</p>
              <p className="mt-2 text-sm text-subtle">
                {displayName(p.author, lang)} · {String(p.createdAt).slice(0, 10)} · {lex(p.problem, lang)} ·{" "}
                {p.answers.length ? r.answered : r.waiting}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
