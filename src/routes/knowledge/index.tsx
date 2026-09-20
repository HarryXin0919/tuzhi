import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { CROPS, PROBLEMS, REGIONS, SEASONS } from "@/lib/constants";
import { facetCounts, filterArticles } from "@/lib/knowledge/catalog";
import { ArticleCard } from "@/components/ArticleCard";
import { LangLink } from "@/components/LangLink";
import { useAnyLoaderData, useAnyNavigate, useAnySearch } from "@/lib/i18n/route-data";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { extraFiltersOpen, setExtraFiltersOpen } from "@/lib/local";
import { seo } from "@/lib/seo";
import { parseProblem, problemQuery } from "@/lib/problem-query";

type Search = { q?: string; crop?: string; problem?: string; region?: string; season?: string };

export const Route = createFileRoute("/knowledge/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    crop: typeof s.crop === "string" ? s.crop : undefined,
    problem: typeof s.problem === "string" ? s.problem : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    season: typeof s.season === "string" ? s.season : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    const list = filterArticles({ ...deps, problem: parseProblem(deps.problem) });
    const facets = facetCounts({ ...deps, problem: parseProblem(deps.problem) });
    return { list, facets };
  },
  head: ({ loaderData }) => {
    const n = loaderData?.list.length;
    return seo({
      title: "农业知识｜土知",
      description: n
        ? `地里看着不对，按现象找办法。现有 ${n} 篇对照。酸化、盐碱、缺铁、涝害，一篇一篇对照。`
        : "地里看着不对，按现象找办法。酸化、盐碱、缺铁、涝害，一篇一篇对照。",
      path: "/knowledge",
    });
  },
  component: KnowledgeList,
});

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "inline-flex min-h-11 shrink-0 items-center rounded-full bg-forest px-4 text-base text-forest-fg"
          : "inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-surface-2 px-4 text-base text-ink"
      }
    >
      {children}
    </button>
  );
}

const PAGE = 20;

export function KnowledgeList() {
  const lang = usePathLang();
  const tAll = messages[lang];
  const t = tAll.knowledge;
  const search = useAnySearch<Search>();
  const problemZh = parseProblem(search.problem);
  const { facets: loadedFacets } = useAnyLoaderData<{ list: ReturnType<typeof filterArticles>; facets: ReturnType<typeof facetCounts> }>();
  const navigate = useAnyNavigate();
  const urlForces = !!(search.crop || search.region || search.season);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [qLive, setQLive] = useState(search.q ?? "");
  const list = filterArticles({ ...search, problem: problemZh, q: qLive, lang });
  const facets = facetCounts({ ...search, problem: problemZh, q: qLive, lang });
  const shown = list;
  const shownFacets = facets ?? loadedFacets;

  useEffect(() => {
    setLimit(PAGE);
  }, [search.q, search.crop, search.problem, search.region, search.season]);

  useEffect(() => {
    setQLive(search.q ?? "");
  }, [search.q]);

  useEffect(() => {
    if (urlForces || extraFiltersOpen()) setOpen(true);
    else if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) setOpen(true);
  }, [urlForces]);

  function setSearch(patch: Partial<Search>) {
    navigate({ search: { ...search, ...patch } });
  }
  function toggleOpen() {
    const next = !open;
    setOpen(next);
    setExtraFiltersOpen(next);
  }

  const selectedExtra = [
    search.crop ? { k: "crop" as const, v: search.crop } : null,
    search.region ? { k: "region" as const, v: search.region } : null,
    search.season ? { k: "season" as const, v: search.season } : null,
  ].filter(Boolean) as { k: "crop" | "region" | "season"; v: string }[];

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold">{t.title}</h1>
        <p className="text-muted">{t.lead}</p>
        <LangLink to="/encyclopedia" className="inline-block text-forest underline">
          {t.toWiki}
        </LangLink>
      </header>
      <div className="space-y-3 border-b border-line py-3">
        <form
          method="get"
          action={lang === "en" ? "/en/knowledge" : "/knowledge"}
          className="tz-search relative sticky top-16 z-20 bg-bg/95 py-1 backdrop-blur-[2px]"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch({ q: qLive || undefined });
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" />
          <input
            name="q"
            value={qLive}
            onChange={(e) => {
              const v = e.target.value;
              setQLive(v);
              setSearch({ q: v || undefined });
            }}
            placeholder={t.ph}
            aria-label={tAll.home.searchAria}
            className="min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-3"
          />
          {search.problem ? <input type="hidden" name="problem" value={search.problem} /> : null}
          {search.crop ? <input type="hidden" name="crop" value={search.crop} /> : null}
          {search.region ? <input type="hidden" name="region" value={search.region} /> : null}
          {search.season ? <input type="hidden" name="season" value={search.season} /> : null}
        </form>
        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted">{t.byProblem}</h2>
          <div className="tz-chip-row">
            <Chip active={!problemZh} onClick={() => setSearch({ problem: undefined })}>
              {tAll.all}
            </Chip>
            {PROBLEMS.filter((p) => (shownFacets.problems[p] ?? 0) > 0).map((p) => (
              <Chip key={p} active={problemZh === p} onClick={() => setSearch({ problem: problemQuery(p, lang) })}>
                {lex(p, lang)} {shownFacets.problems[p]}
              </Chip>
            ))}
          </div>
        </section>
        {!open ? (
          <div className="flex flex-wrap items-center gap-2">
            {selectedExtra.map((s) => (
              <Chip key={s.k} active onClick={() => setSearch({ [s.k]: undefined })}>
                {lex(s.v, lang)} ×
              </Chip>
            ))}
            <button type="button" className="tz-fold" onClick={toggleOpen}>
              {t.moreFilters}
            </button>
          </div>
        ) : (
          <button type="button" className="tz-fold" onClick={toggleOpen}>
            {t.lessFilters}
          </button>
        )}
        {open ? (
          <div className="space-y-3">
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted">{t.byCrop}</h2>
              <div className="tz-chip-row">
                <Chip active={!search.crop} onClick={() => setSearch({ crop: undefined })}>
                  {tAll.all}
                </Chip>
                {CROPS.filter((c) => (shownFacets.crops[c] ?? 0) > 0).map((c) => (
                  <Chip key={c} active={search.crop === c} onClick={() => setSearch({ crop: c })}>
                    {lex(c, lang)} {shownFacets.crops[c]}
                  </Chip>
                ))}
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted">{t.byRegion}</h2>
              <div className="tz-chip-row">
                <Chip active={!search.region} onClick={() => setSearch({ region: undefined })}>
                  {tAll.all}
                </Chip>
                {REGIONS.filter((r) => (shownFacets.regions[r] ?? 0) > 0).map((r) => (
                  <Chip key={r} active={search.region === r} onClick={() => setSearch({ region: r })}>
                    {lex(r, lang)} {shownFacets.regions[r]}
                  </Chip>
                ))}
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted">{t.bySeason}</h2>
              <p className="text-xs text-subtle">{t.seasonNote}</p>
              <div className="tz-chip-row">
                <Chip active={!search.season} onClick={() => setSearch({ season: undefined })}>
                  {tAll.all}
                </Chip>
                {SEASONS.map((s) => (
                  <Chip key={s} active={search.season === s} onClick={() => setSearch({ season: s })}>
                    {lex(s, lang)} {shownFacets.seasons[s] ?? 0}
                  </Chip>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
      <p className="tz-stamp">{t.count(shown.length)}</p>
      <p className="text-sm text-subtle">{t.multiTag}</p>
      <div className="grid gap-3 lg:grid-cols-2">
        {shown.slice(0, limit).map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
        {shown.length === 0 ? (
          <p className="rounded-xl border border-line bg-surface p-6 text-muted">
            {search.crop || search.region || search.season ? t.emptyCombo : t.empty}
            <LangLink to="/diagnose" className="mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg">
              {t.goDiagnose}
            </LangLink>
            <LangLink
              to="/knowledge/$slug"
              params={{ slug: "suan-hua" }}
              className="mt-2 flex min-h-12 items-center justify-center text-forest underline"
            >
              {t.emptyHint}
            </LangLink>
          </p>
        ) : null}
      </div>
      {limit < shown.length ? (
        <button
          type="button"
          className="relative z-0 mb-8 flex min-h-14 w-full items-center justify-center rounded-xl border border-line bg-surface text-base"
          onClick={() => setLimit((n) => n + PAGE)}
        >
          {t.morePage(Math.min(PAGE, shown.length - limit))}
        </button>
      ) : null}
    </div>
  );
}
