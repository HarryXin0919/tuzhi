import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LAB_GROUPS, localizeTerm, searchTerms } from "@/lib/knowledge/encyclopedia";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";

export const Route = createFileRoute("/encyclopedia/")({ component: WikiList });

function WikiList() {
  const lang = useLang((s) => s.lang);
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
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold">{r.title}</h1>
        <p className="mt-2 text-muted">{r.lead}</p>
      </header>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={r.ph}
        className="min-h-12 w-full rounded-xl border border-line bg-surface px-4"
      />
      {groups.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface p-6 text-muted">
          {r.empty}
          <span className="mt-3 flex flex-wrap gap-4">
            <Link to="/knowledge" className="text-forest underline">
              {t.nav.knowledge}
            </Link>
            <Link to="/diagnose" className="text-forest underline">
              {t.nav.diagnose}
            </Link>
          </span>
        </p>
      ) : (
        groups.map((g) => (
          <section key={g.id} className="space-y-3">
            <h2 className="font-display text-xl font-semibold">{lang === "en" ? g.titleEn : g.title}</h2>
            {g.terms.map((term) => {
              if (!term) return null;
              const copy = localizeTerm(term, lang);
              return (
                <Link
                  key={term.id}
                  to="/encyclopedia/$id"
                  params={{ id: term.id }}
                  className="block scroll-mt-24 rounded-2xl border border-line bg-surface p-4"
                >
                  <h3 className="text-lg font-medium">{copy.title}</h3>
                  {copy.aka ? (
                    <p className="text-sm text-subtle">
                      {r.aka}
                      {copy.aka}
                    </p>
                  ) : null}
                  <p className="mt-2 text-lg leading-relaxed">{copy.summary}</p>
                </Link>
              );
            })}
          </section>
        ))
      )}
    </div>
  );
}
