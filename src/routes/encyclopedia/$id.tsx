import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTerm, localizeTerm } from "@/lib/knowledge/encyclopedia";
import { getCard } from "@/lib/knowledge/catalog";
import { ArticleCard } from "@/components/ArticleCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LessonVideo } from "@/components/LessonVideo";
import { ReadAloud } from "@/components/ReadAloud";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";
import { LangLink } from "@/components/LangLink";
import { useAnyLoaderData } from "@/lib/i18n/route-data";

export const Route = createFileRoute("/encyclopedia/$id")({
  loader: ({ params }) => {
    const term = getTerm(params.id);
    if (!term) throw notFound();
    return { term };
  },
  head: ({ loaderData }) => {
    const term = loaderData?.term;
    const title = term ? `${term.zh.title} · 土知` : "土知";
    const desc = term?.zh.summary?.slice(0, 180) || "化验单上的词，说成人话";
    return seo({ title, description: desc, path: term ? `/encyclopedia/${term.id}` : "/encyclopedia", type: "article", image: term?.photos?.[0]?.src });
  },
  component: TermPage,
});

export function TermPage() {
  const { term } = useAnyLoaderData<{ term: NonNullable<ReturnType<typeof getTerm>> }>();
  const lang = usePathLang();
  const t = messages[lang];
  const r = t.wiki;
  const copy = localizeTerm(term, lang);
  const related = (term.relatedSlugs || []).map(getCard).filter((x): x is NonNullable<typeof x> => !!x);
  const spoken = (copy.spoken?.length ? copy.spoken : [copy.subtitle, copy.appearance, copy.fieldCheck]).filter(
    (s) => !!s && s.trim() && !/translation pending/i.test(s) && (lang !== "en" || !/[\u4e00-\u9fff]/.test(s)),
  );
  const relatedBlock = related.length ? (
    <section className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{r.toGuides}</h2>
      <p className="text-sm text-muted">{r.toGuidesLead}</p>
      <div className="grid gap-3">
        {related.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  ) : null;
  const reading = (
    <div className="space-y-8">
      <p className="text-sm text-muted">
        <LangLink to="/encyclopedia" className="text-forest">
          {r.back}
        </LangLink>
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
      <ReadAloud sentences={spoken} title={copy.title} />
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.sheet}</h2>
        <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{copy.appearance}</p>
        {copy.photos?.length ? <PhotoGallery photos={copy.photos} slug={term.id} /> : null}
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.unit}</h2>
        <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{copy.unit}</p>
        {copy.ratioNote ? (
          <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">
            <span className="font-medium">{r.ratio} · </span>
            {copy.ratioNote}
          </p>
        ) : null}
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.read}</h2>
        <div className="space-y-3 rounded-2xl border border-line bg-surface p-4 leading-relaxed">
          {(copy.longform?.length ? copy.longform : [copy.summary]).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-sm text-muted">{r.readNote}</p>
        </div>
        {copy.readTable?.length ? (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <caption className="px-3 py-2 text-left font-medium">{r.readTable}</caption>
              <thead className="bg-surface-2">
                <tr>
                  <th className="px-3 py-2">{lang === "en" ? "Cell" : "格子"}</th>
                  <th className="px-3 py-2">{lang === "en" ? "Low" : "低"}</th>
                  <th className="px-3 py-2">{lang === "en" ? "Mid" : "中"}</th>
                  <th className="px-3 py-2">{lang === "en" ? "High" : "高"}</th>
                </tr>
              </thead>
              <tbody>
                {copy.readTable.map((row) => (
                  <tr key={row.label} className="border-t border-line bg-surface">
                    <td className="px-3 py-2">{row.label}</td>
                    <td className="px-3 py-2">{row.low}</td>
                    <td className="px-3 py-2">{row.mid}</td>
                    <td className="px-3 py-2">{row.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-3 py-2 text-sm text-muted">{r.readTableNote}</p>
          </div>
        ) : null}
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">{r.field}</h2>
        <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{copy.fieldCheck}</p>
      </section>
      {copy.dontDo?.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">{r.dont}</h2>
          <ul className="list-disc space-y-2 rounded-2xl border border-line bg-surface p-4 pl-8">
            {copy.dontDo.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <LessonVideo slug={term.id} kind="wiki" />
    </div>
  );
  return (
    <article>
      <div className="lg:grid lg:grid-cols-[minmax(0,45rem)_22.5rem] lg:items-start lg:gap-8">
        {reading}
        <aside className="mt-8 space-y-6 lg:sticky lg:top-20 lg:mt-0">{relatedBlock}</aside>
      </div>
    </article>
  );
}
