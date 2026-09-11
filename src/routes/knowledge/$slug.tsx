import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, indicatorTermId, relatedArticles } from "@/lib/knowledge/search";
import { localizeArticle } from "@/lib/knowledge/localize";
import { ArticleCard } from "@/components/ArticleCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LessonVideo } from "@/components/LessonVideo";
import { ReadAloud } from "@/components/ReadAloud";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { getFavorites, toggleFavorite } from "@/lib/local";

export const Route = createFileRoute("/knowledge/$slug")({
  loader: ({ params }) => {
    const raw = getArticle(params.slug);
    if (!raw) throw notFound();
    return { raw };
  },
  component: GuidePage,
});

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function GuidePage() {
  const { raw } = Route.useLoaderData();
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const C = t.knowledge;
  const a = localizeArticle(raw, lang);
  const related = relatedArticles(raw).map((x) => localizeArticle(x, lang));
  const [favs, setFavs] = useState(() => (typeof window === "undefined" ? [] : getFavorites()));
  const [howto, setHowto] = useState(false);
  const listenText = [
    a.title,
    a.subtitle,
    a.phenomenon.appearance,
    ...a.confuse.map((c) => `${c.lookalike}。${c.difference}`),
    ...a.solutions.steps,
    ...(a.dontDo ?? []),
    ...a.dosage.map((d) => `${d.name} ${d.range}。${d.note}`),
  ].join("。");

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-muted">
          <Link to="/knowledge" className="text-forest">
            {C.back}
          </Link>
        </p>
        <h1 className="font-display text-3xl font-semibold leading-tight">{a.title}</h1>
        <p className="text-lg text-muted">{a.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {a.problems.map((p, i) => (
            <span key={p} className={i === 0 ? "rounded-full bg-surface-2 px-3 py-1 text-sm" : "rounded-full bg-surface-2 px-3 py-1 text-sm opacity-60"}>
              {p}
            </span>
          ))}
        </div>
        <p className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-base leading-relaxed text-muted">{t.fieldHint}</p>
        <ReadAloud text={listenText} />
        <div className="flex flex-wrap gap-3">
          <button type="button" className="text-forest underline" onClick={() => setHowto((v) => !v)}>
            {howto ? C.full : C.howto}
          </button>
          <button
            type="button"
            className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm"
            onClick={() => setFavs(toggleFavorite(raw.slug))}
          >
            {favs.includes(raw.slug) ? C.faved : C.fav}
          </button>
        </div>
      </header>
      {howto ? null : (
        <>
          <Section title={C.s1} id="look">
            <div className="space-y-3 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed">
              <p>{a.phenomenon.appearance}</p>
            </div>
            {a.photos.slice(0, 2).length ? (
              <>
                <PhotoGallery photos={a.photos.slice(0, 2)} />
                <p className="text-sm text-subtle">{C.photoNote}</p>
              </>
            ) : null}
          </Section>
          <Section title={C.s2} id="mix">
            <ul className="space-y-3">
              {a.confuse.map((c, i) => (
                <li key={`${c.lookalike}-${i}`} className="rounded-xl border border-line bg-surface p-4">
                  <p className="font-medium">{C.like(c.lookalike)}</p>
                  <p className="mt-1 text-muted">{c.difference}</p>
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}
      <Section title={C.s5} id="how">
        <ol className="space-y-3">
          {a.solutions.steps.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-forest-fg">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        {a.dontDo?.length ? (
          <div className="rounded-2xl border border-line bg-surface p-4">
            <h3 className="mb-2 font-medium">{C.s7}</h3>
            <ul className="list-disc space-y-2 pl-5">
              {a.dontDo.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
      <Section title={C.s6} id="dose">
        <div className="overflow-hidden rounded-2xl border border-line">
          {a.dosage.map((d, i) => (
            <div key={`${d.name}-${i}`} className="border-b border-line bg-surface p-4 last:border-b-0">
              <p className="font-medium">{d.name}</p>
              <p className="text-lg">{d.range}</p>
              <p className="mt-1 text-sm text-muted">{d.note}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted">{C.doseNote}</p>
        {a.indicators.length ? (
          <div className="overflow-hidden rounded-2xl border border-line">
            {a.indicators.map((d, i) => (
              <div key={`${d.name}-${i}`} className="border-b border-line bg-surface p-4 last:border-b-0">
                <p className="font-medium">
                  <Link to="/encyclopedia/$id" params={{ id: indicatorTermId(d.name) }} className="text-forest">
                    {lex(d.name, lang)}
                  </Link>
                </p>
                <p className="text-sm text-muted">{d.meaning}</p>
                <p className="mt-1 text-sm">{d.typical}</p>
              </div>
            ))}
          </div>
        ) : null}
        {a.whenToTest ? <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{a.whenToTest}</p> : null}
      </Section>
      {!howto ? <LessonVideo slug={raw.slug} /> : null}
      {related.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">{C.related}</h2>
          <div className="grid gap-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} article={getArticle(r.slug)!} />
            ))}
          </div>
        </section>
      ) : null}
      <p className="text-sm text-muted">{C.updated(a.updatedAt, a.reviewer)}</p>
      <p className="text-sm text-muted">{t.disclaimerShort}</p>
      <Link to="/diagnose" className="flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg">
        {C.ask}
      </Link>
    </article>
  );
}
