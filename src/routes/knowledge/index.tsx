import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { CROPS, PROBLEMS, REGIONS, SEASONS } from "@/lib/constants";
import { facetCounts, filterArticles } from "@/lib/knowledge/search";
import { ArticleCard } from "@/components/ArticleCard";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { extraFiltersOpen, setExtraFiltersOpen } from "@/lib/local";

type Search = { q?: string; crop?: string; problem?: string; region?: string; season?: string };

export const Route = createFileRoute("/knowledge/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    crop: typeof s.crop === "string" ? s.crop : undefined,
    problem: typeof s.problem === "string" ? s.problem : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    season: typeof s.season === "string" ? s.season : undefined,
  }),
  component: KnowledgeList,
});

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "inline-flex min-h-11 items-center rounded-full bg-forest px-4 text-base text-forest-fg"
          : "inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-base text-ink"
      }
    >
      {children}
    </button>
  );
}

const PAGE = 20;

function KnowledgeList() {
  const lang = useLang((s) => s.lang);
  const tAll = messages[lang];
  const t = tAll.knowledge;
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const urlForces = !!(search.crop || search.region || search.season);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const list = filterArticles({ ...search, lang });
  const facets = facetCounts({ ...search, lang });

  useEffect(() => {
    setLimit(PAGE);
  }, [search.q, search.crop, search.problem, search.region, search.season]);

  useEffect(() => {
    if (urlForces || extraFiltersOpen()) setOpen(true);
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
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold">{t.title}</h1>
        <p className="text-muted">{t.lead}</p>
        <Link to="/encyclopedia" className="inline-block text-forest">
          {t.toWiki}
        </Link>
      </header>
      <div className="sticky top-[57px] z-20 space-y-3 border-b border-line bg-bg/95 py-3 backdrop-blur-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-subtle" />
          <input
            value={search.q ?? ""}
            onChange={(e) => setSearch({ q: e.target.value || undefined })}
            placeholder={t.ph}
            className="min-h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-3"
          />
        </div>
        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted">{t.byProblem}</h2>
          <div className="flex flex-wrap gap-2">
            <Chip active={!search.problem} onClick={() => setSearch({ problem: undefined })}>
              {tAll.all}
            </Chip>
            {PROBLEMS.filter((p) => (facets.problems[p] ?? 0) > 0).map((p) => (
              <Chip key={p} active={search.problem === p} onClick={() => setSearch({ problem: p })}>
                {lex(p, lang)} {facets.problems[p]}
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
            <button type="button" className="text-sm text-forest underline" onClick={toggleOpen}>
              {t.moreFilters}
            </button>
          </div>
        ) : (
          <button type="button" className="text-sm text-forest underline" onClick={toggleOpen}>
            {t.lessFilters}
          </button>
        )}
        {open ? (
          <div className="space-y-3">
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted">{t.byCrop}</h2>
              <div className="flex flex-wrap gap-2">
                <Chip active={!search.crop} onClick={() => setSearch({ crop: undefined })}>
                  {tAll.all}
                </Chip>
                {CROPS.filter((c) => (facets.crops[c] ?? 0) > 0).map((c) => (
                  <Chip key={c} active={search.crop === c} onClick={() => setSearch({ crop: c })}>
                    {lex(c, lang)} {facets.crops[c]}
                  </Chip>
                ))}
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted">{t.byRegion}</h2>
              <div className="flex flex-wrap gap-2">
                <Chip active={!search.region} onClick={() => setSearch({ region: undefined })}>
                  {tAll.all}
                </Chip>
                {REGIONS.filter((r) => (facets.regions[r] ?? 0) > 0).map((r) => (
                  <Chip key={r} active={search.region === r} onClick={() => setSearch({ region: r })}>
                    {lex(r, lang)} {facets.regions[r]}
                  </Chip>
                ))}
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted">{t.bySeason}</h2>
              <p className="text-xs text-subtle">{t.seasonNote}</p>
              <div className="flex flex-wrap gap-2">
                <Chip active={!search.season} onClick={() => setSearch({ season: undefined })}>
                  {tAll.all}
                </Chip>
                {SEASONS.map((s) => (
                  <Chip key={s} active={search.season === s} onClick={() => setSearch({ season: s })}>
                    {lex(s, lang)} {facets.seasons[s] ?? 0}
                  </Chip>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
      <p className="text-sm text-muted">{t.count(list.length)}</p>
      <div className="grid gap-3">
        {list.slice(0, limit).map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
        {list.length === 0 ? (
          <p className="rounded-xl border border-line bg-surface p-6 text-muted">
            {t.empty}
            <Link to="/diagnose" className="mt-3 flex min-h-12 items-center justify-center rounded-lg bg-forest text-forest-fg">
              {t.goDiagnose}
            </Link>
            <Link
              to="/knowledge/$slug"
              params={{ slug: "suan-hua" }}
              className="mt-2 flex min-h-12 items-center justify-center text-forest underline"
            >
              {t.emptyHint}
            </Link>
          </p>
        ) : null}
      </div>
      {limit < list.length ? (
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-center rounded-xl border border-line bg-surface text-base"
          onClick={() => setLimit((n) => n + PAGE)}
        >
          {t.morePage(Math.min(PAGE, list.length - limit))}
        </button>
      ) : null}
    </div>
  );
}
