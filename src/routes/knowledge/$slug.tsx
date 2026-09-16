import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getArticle, indicatorTermId, relatedArticles } from "@/lib/knowledge/search";
import { localizeArticle } from "@/lib/knowledge/localize";
import type { Article } from "@/lib/knowledge/types";
import { ArticleCard } from "@/components/ArticleCard";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LessonVideo } from "@/components/LessonVideo";
import { ReadAloud } from "@/components/ReadAloud";
import { LangLink } from "@/components/LangLink";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { getFavorites, toggleFavorite } from "@/lib/local";
import { articleJsonLd, seo } from "@/lib/seo";
import { withLangPath } from "@/lib/i18n/path";

export const Route = createFileRoute("/knowledge/$slug")({
  loader: ({ params }) => {
    const raw = getArticle(params.slug);
    if (!raw) throw notFound();
    return { raw };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.raw;
    return seo({
      title: a ? `${a.title} · 土知` : "土知",
      description: a?.summary?.slice(0, 180) || "看懂土地，种好地",
      path: a ? `/knowledge/${a.slug}` : "/knowledge",
      type: "article",
      lang: "zh",
      image: a?.photos?.[0]?.src,
    });
  },
  component: function Page() {
    const { raw } = Route.useLoaderData();
    return <GuidePage raw={raw} />;
  },
});

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

const LAB_SAMPLE_ZH = [
  ["地块", "华北某粮田（匿名）"],
  ["取样", "2026-03-18 · 0–20 cm · 12 点混合"],
  ["pH（1:2.5 水浸）", "5.2"],
  ["有机质 g/kg", "12.4"],
  ["EC mS/cm", "0.28"],
  ["碱解氮 mg/kg", "68"],
  ["有效磷 mg/kg", "9.5"],
  ["速效钾 mg/kg", "82"],
  ["CEC cmol/kg", "11.2"],
  ["有效铁 mg/kg", "4.1"],
] as const;

const LAB_SAMPLE_EN = [
  ["Field", "A North China grain field (anonymous)"],
  ["Sample", "2026-03-18 · 0–20 cm · 12 points mixed"],
  ["pH (1:2.5 water)", "5.2"],
  ["Organic matter g/kg", "12.4"],
  ["EC mS/cm", "0.28"],
  ["Available N mg/kg", "68"],
  ["Available P mg/kg", "9.5"],
  ["Available K mg/kg", "82"],
  ["CEC cmol/kg", "11.2"],
  ["Available Fe mg/kg", "4.1"],
] as const;

function stripStepNo(step: string) {
  let s = step.trim();
  for (let i = 0; i < 4; i++) {
    const next = s.replace(/^\s*\d+\s*[）).、:：]\s*/, "").replace(/^\s*\d+\s+/, "");
    if (next === s) break;
    s = next;
  }
  return s;
}

export function GuidePage({ raw }: { raw: Article }) {
  const lang = usePathLang();
  const t = messages[lang];
  const C = t.knowledge;
  const a = localizeArticle(raw, lang);
  const related = relatedArticles(raw).map((x) => localizeArticle(x, lang));
  const [favs, setFavs] = useState(() => (typeof window === "undefined" ? [] : getFavorites()));
  const [howto, setHowto] = useState(false);
  const doseRef = a.doseRefSlug ? getArticle(a.doseRefSlug) : undefined;
  const speakRaw = lang === "en" ? (a.speakEn ?? []) : (a.speakZh ?? []);
  const howRaw = lang === "en" ? (a.howtoSpeakEn ?? []) : (a.howtoSpeakZh ?? []);
  const stepNorm = new Set((a.solutions.steps ?? []).map((s) => stripStepNo(s).trim()));
  const speak = speakRaw.filter((s) => {
    const line = s.trim();
    if (!line || /^\s*\d+\s*[）).、]/.test(line)) return false;
    if (stepNorm.has(stripStepNo(line).trim())) return false;
    return true;
  });
  const speakHow = howRaw.filter((s) => s.trim());
  const sources = (a.sources ?? []).filter((s) => s && !/translation pending/i.test(s) && (lang !== "en" || !/[\u4e00-\u9fff]/.test(s)));
  const author =
    lang === "en"
      ? !a.author || /李泽宇/.test(a.author)
        ? "Li Zeyu"
        : a.author
      : a.author || a.reviewer;
  const jsonLd = articleJsonLd({
    title: a.title,
    description: a.summary,
    path: withLangPath(`/knowledge/${raw.slug}`, lang),
    dateModified: a.updatedAt || raw.updatedAt,
    lang,
    image: a.photos?.[0]?.src || raw.photos?.[0]?.src,
  });
  const sample = lang === "en" ? LAB_SAMPLE_EN : LAB_SAMPLE_ZH;
  const wikiRows = a.labTable?.length
    ? a.labTable.map((row) => ({ id: row.id, name: row.name }))
    : a.indicators.map((d, i) => ({
        id: indicatorTermId(raw.indicators[i]?.name || d.name),
        name: d.name,
      }));
  const fieldPhotos = a.photos.slice(0, 2);
  const extraPhotos = a.photos.slice(2, 4);
  const relatedBlock = related.length ? (
    <section className="space-y-3">
      <h2 className="font-display text-2xl font-semibold">{C.related}</h2>
      <div className="grid gap-3">
        {related.map((r) => (
          <ArticleCard key={r.slug} article={getArticle(r.slug)!} />
        ))}
      </div>
    </section>
  ) : null;
  const wikiBlock = wikiRows.length ? (
    <section className="space-y-2 rounded-2xl border border-line bg-surface p-4">
      <h2 className="font-display text-lg font-semibold">{lang === "en" ? "Lab-sheet words" : "化验词"}</h2>
      <ul className="space-y-1">
        {wikiRows.map((row) => (
          <li key={row.id}>
            <LangLink to="/encyclopedia/$id" params={{ id: row.id }} className="text-forest underline">
              {row.name}
            </LangLink>
          </li>
        ))}
      </ul>
    </section>
  ) : null;

  const reading = (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-muted">
          <LangLink to="/knowledge" className="text-forest">
            {C.back}
          </LangLink>
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
        <ReadAloud sentences={speak} howSentences={speakHow} title={a.title} slug={raw.slug} howto={howto} onHowto={setHowto} />
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
            {a.phenomenon.appearance ? (
              <div className="space-y-3 rounded-2xl border border-line bg-surface p-4 text-base leading-relaxed">
                <p>{a.phenomenon.appearance}</p>
              </div>
            ) : null}
            {fieldPhotos.length ? (
              <>
                <PhotoGallery photos={fieldPhotos} slug={raw.slug} tall />
                <p className="text-sm text-subtle">{C.photoNote}</p>
              </>
            ) : null}
          </Section>
          {a.mechanism ? (
            <Section title={C.sMechanism} id="why">
              <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{a.mechanism}</p>
              {extraPhotos[0] ? <PhotoGallery photos={extraPhotos.slice(0, 1)} slug={raw.slug} /> : null}
            </Section>
          ) : null}
          {a.confuse.length ? (
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
          ) : null}
        </>
      )}
      <Section title={C.s5} id="how">
        <ol className="space-y-3">
          {a.solutions.steps.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-forest text-sm font-semibold text-forest-fg">
                {i + 1}
              </span>
              <span className="leading-relaxed">{stripStepNo(step)}</span>
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
        {a.doseTable?.length ? (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-2">
                <tr>
                  <th className="px-3 py-2 font-medium">{C.doseTable}</th>
                  <th className="px-3 py-2 font-medium">{lang === "en" ? "Texture" : "质地"}</th>
                  <th className="px-3 py-2 font-medium">{lang === "en" ? "Rate" : "用量"}</th>
                  <th className="px-3 py-2 font-medium">{lang === "en" ? "Note" : "说明"}</th>
                </tr>
              </thead>
              <tbody>
                {a.doseTable.map((row, i) => (
                  <tr key={`${row.crop}-${i}`} className="border-t border-line bg-surface">
                    <td className="px-3 py-2">{row.crop}</td>
                    <td className="px-3 py-2">{row.texture}</td>
                    <td className="whitespace-nowrap px-3 py-2">{row.rate}</td>
                    <td className="px-3 py-2 text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line">
            {a.dosage.map((d, i) => (
              <div key={`${d.name}-${i}`} className="border-b border-line bg-surface p-4 last:border-b-0">
                <p className="font-medium">{d.name}</p>
                <p className="text-lg">{d.range}</p>
                <p className="mt-1 text-sm text-muted">{d.note}</p>
              </div>
            ))}
          </div>
        )}
        {doseRef ? (
          <p className="text-sm">
            {C.doseSee}{" "}
            <LangLink to="/knowledge/$slug" params={{ slug: doseRef.slug }} className="text-forest underline">
              {localizeArticle(doseRef, lang).title}
            </LangLink>
          </p>
        ) : null}
        <p className="text-sm text-muted">{C.doseNote}</p>
        {a.labTable?.length ? (
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <caption className="px-3 py-2 text-left font-medium">{C.labTable}</caption>
              <thead className="bg-surface-2">
                <tr>
                  <th className="px-3 py-2">{lang === "en" ? "Cell" : "格子"}</th>
                  <th className="px-3 py-2">{lang === "en" ? "Low" : "低"}</th>
                  <th className="px-3 py-2">{lang === "en" ? "Mid" : "中"}</th>
                  <th className="px-3 py-2">{lang === "en" ? "High" : "高"}</th>
                </tr>
              </thead>
              <tbody>
                {a.labTable.map((row) => (
                  <tr key={row.id} className="border-t border-line bg-surface">
                    <td className="px-3 py-2">
                      <LangLink to="/encyclopedia/$id" params={{ id: row.id }} className="text-forest underline">
                        {row.name}
                      </LangLink>
                    </td>
                    <td className="px-3 py-2">{row.low}</td>
                    <td className="px-3 py-2">{row.mid}</td>
                    <td className="px-3 py-2">{row.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : a.indicators.length ? (
          <div className="overflow-hidden rounded-2xl border border-line">
            {a.indicators.map((d, i) => (
              <div key={`${d.name}-${i}`} className="border-b border-line bg-surface p-4 last:border-b-0">
                <p className="font-medium">
                  <LangLink to="/encyclopedia/$id" params={{ id: indicatorTermId(raw.indicators[i]?.name || d.name) }} className="text-forest">
                    {d.name}
                  </LangLink>
                </p>
                <p className="text-sm text-muted">{d.meaning}</p>
                <p className="mt-1 text-sm">{d.typical}</p>
              </div>
            ))}
          </div>
        ) : null}
        {raw.slug === "ce-tu-bao-gao" ? (
          <div className="overflow-hidden rounded-2xl border border-line">
            <p className="bg-surface-2 px-4 py-2 text-sm font-medium">{lang === "en" ? "Anonymous sheet, circled in order" : "匿名化验单，按阅读顺序圈读"}</p>
            <table className="w-full text-left text-sm">
              <tbody>
                {sample.map(([k, v]) => (
                  <tr key={k} className="border-t border-line bg-surface">
                    <th className="px-4 py-2 font-medium">{k}</th>
                    <td className="px-4 py-2">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-3 text-sm text-muted">
              {lang === "en"
                ? "Grain land at pH 5.2 can discuss agricultural lime. Tea at the same 5.2 must not be pushed to neutral. CEC is cation exchange, not EC."
                : "粮田 pH 5.2 可以谈农用石灰；茶园同样 5.2 不能照搬改到中性。CEC 是阳离子交换量，不是电导。"}
            </p>
          </div>
        ) : null}
        {extraPhotos[1] ? <PhotoGallery photos={extraPhotos.slice(1)} slug={raw.slug} /> : null}
        {a.example ? (
          <div className="rounded-2xl border border-line bg-surface p-4">
            <h3 className="mb-2 font-medium">{C.sExample}</h3>
            <p className="leading-relaxed">{a.example}</p>
          </div>
        ) : null}
        {a.whenToTest ? <p className="rounded-2xl border border-line bg-surface p-4 leading-relaxed">{a.whenToTest}</p> : null}
      </Section>
      {!howto ? <LessonVideo slug={raw.slug} /> : null}
      <p className="text-sm text-muted">{C.updated(a.updatedAt, author)}</p>
      {sources.length ? (
        <p className="text-sm text-subtle">
          {C.sources}：{sources.join(lang === "en" ? "; " : "；")}
        </p>
      ) : null}
      <p className="text-sm text-muted">{t.disclaimerShort}</p>
      <LangLink to="/diagnose" className="flex min-h-14 items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg">
        {C.ask}
      </LangLink>
    </div>
  );

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="lg:grid lg:grid-cols-[minmax(0,45rem)_22.5rem] lg:items-start lg:gap-8">
        {reading}
        <aside className="mt-8 space-y-6 lg:sticky lg:top-20 lg:mt-0">
          {wikiBlock}
          {relatedBlock}
        </aside>
      </div>
    </article>
  );
}
