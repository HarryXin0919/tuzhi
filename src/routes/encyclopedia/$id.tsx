import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTerm, localizeTerm } from "@/lib/knowledge/encyclopedia";
import { getArticle } from "@/lib/knowledge/search";
import { ArticleCard } from "@/components/ArticleCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LessonVideo } from "@/components/LessonVideo";
import { ReadAloud } from "@/components/ReadAloud";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";

export const Route = createFileRoute("/encyclopedia/$id")({
  loader: ({ params }) => {
    const term = getTerm(params.id);
    if (!term) throw notFound();
    return { term };
  },
  component: TermPage,
});

function TermPage() {
  const { term } = Route.useLoaderData();
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const r = t.wiki;
  const copy = localizeTerm(term, lang);
  const related = (term.relatedSlugs || []).map(getArticle).filter((x): x is NonNullable<typeof x> => !!x);
  const listen = [copy.title, copy.subtitle, copy.appearance, copy.unit, ...(copy.longform ?? []), copy.fieldCheck].join("。");
  return (
    <article className="space-y-8">
      <p className="text-sm text-muted">
        <Link to="/encyclopedia" className="text-forest">
          {r.back}
        </Link>
      </p>
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold">{copy.title}</h1>
        <p className="text-lg text-muted">{copy.subtitle}</p>
        {copy.aka ? (
          <p className="text-sm text-subtle">
            {r.aka}
            {copy.aka}
          </p>
        ) : null}
      </header>
      <ReadAloud text={listen} />
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.sheet}</h2>
        <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{copy.appearance}</p>
        {copy.photos?.length ? <PhotoGallery photos={copy.photos} /> : null}
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.unit}</h2>
        <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{copy.unit}</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.read}</h2>
        <div className="space-y-3 rounded-2xl border border-line bg-surface p-4 leading-relaxed">
          {(copy.longform?.length ? copy.longform : [copy.summary]).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-sm text-muted">{r.readNote}</p>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.field}</h2>
        <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{copy.fieldCheck}</p>
      </section>
      <LessonVideo slug={term.id} kind="wiki" />
      {related.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">{r.toGuides}</h2>
          <p className="text-sm text-muted">{r.toGuidesLead}</p>
          <div className="grid gap-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
