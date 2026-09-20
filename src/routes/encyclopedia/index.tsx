import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LAB_GROUPS, localizeTerm, searchTerms } from "@/lib/knowledge/encyclopedia";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";
import { LabBand } from "@/components/LabBand";
import { LangLink } from "@/components/LangLink";

export const Route = createFileRoute("/encyclopedia/")({
  head: () =>
    seo({
      title: "化验知识｜土知",
      description: "化验单上的 pH、EC、有机质、交换性铝、交换性钠，用大白话讲。",
      path: "/encyclopedia",
    }),
  component: WikiList,
});

export function WikiList() {
  const lang = usePathLang();
  const t = messages[lang];
  const r = t.wiki;
  const [q, setQ] = useState("");
  const found = useMemo(() => searchTerms(q), [q]);
  const foundIds = new Set(found.map((x) => x.id));
  const groups = LAB_GROUPS.map((g) => ({
    ...g,
    terms: g.ids.map((id) => found.find((t) => t.id === id)).filter((x) => x && foundIds.has(x.id)),
  })).filter((g) => g.terms.length > 0);

  return (
    <div className="space-y-7">
      <header>
        <h1 className="font-display text-3xl font-semibold">{r.title}</h1>
        <p className="mt-2 text-muted">{r.lead}</p>
      </header>
      <LabBand />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={r.ph}
        className="min-h-12 w-full border border-line px-4"
      />
      {groups.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface p-6 text-muted">
          {r.empty}
          <span className="mt-3 flex flex-wrap gap-4">
            <LangLink to="/knowledge" className="text-forest underline">
              {t.nav.knowledge}
            </LangLink>
            <LangLink to="/diagnose" className="text-forest underline">
              {t.nav.diagnose}
            </LangLink>
          </span>
        </p>
      ) : (
        groups.map((g) => (
          <section key={g.id} className="space-y-3">
            <h2 className="tz-chapter font-display text-xl font-semibold">{lang === "en" ? g.titleEn : g.title}</h2>
            {g.terms.map((term) => {
              if (!term) return null;
              const copy = localizeTerm(term, lang);
              return (
                <LangLink
                  key={term.id}
                  to="/encyclopedia/$id"
                  params={{ id: term.id }}
                  className="tz-card block scroll-mt-24 p-4"
                >
                  <h3 className="text-lg font-medium">{copy.title}</h3>
                  {copy.aka ? (
                    <p className="text-sm text-subtle">
                      {r.aka}
                      {copy.aka}
                    </p>
                  ) : null}
                  <p className="mt-2 text-lg leading-relaxed">{copy.summary}</p>
                </LangLink>
              );
            })}
          </section>
        ))
      )}
    </div>
  );
}
