import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { signOut } from "@/lib/auth/client";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ArticleCard } from "@/components/ArticleCard";
import { getCard } from "@/lib/knowledge/catalog";
import { getFavorites, getHistory } from "@/lib/local";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { displayName } from "@/lib/i18n/lexicon";
import { LangLink } from "@/components/LangLink";

export const Route = createFileRoute("/me")({
  head: () => seo({ title: "我的｜土知", description: "收藏与最近的拍照识别。", path: "/me", noindex: true }),
  component: Me,
});

export function Me() {
  const lang = usePathLang();
  const t = messages[lang];
  const m = t.me;
  const { user, isPending } = useCurrentUserState();
  const [favs] = useState(() => (typeof window === "undefined" ? [] : getFavorites()));
  const [hist] = useState(() => (typeof window === "undefined" ? [] : getHistory()));
  const articles = favs.map(getCard).filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">{m.title}</h1>
      {isPending ? (
        <div className="h-12 rounded-xl bg-surface-2" />
      ) : user ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4">
          <p className="font-medium">{displayName(user.displayName || user.primaryEmail, lang)}</p>
          <div className="flex items-center gap-3">
            <UserButton />
            <button type="button" className="text-sm text-forest underline" onClick={() => signOut("/")}>
              {m.logout}
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-muted">{m.guest}</p>
          <LangLink to="/login" className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-forest text-forest-fg">
            {t.nav.login}
          </LangLink>
        </div>
      )}
      <section className="space-y-3 rounded-2xl border border-line bg-surface p-4">
        <h2 className="font-display text-xl font-semibold">{m.accountTitle}</h2>
        <p className="text-sm text-muted">{m.guest}</p>
        <LangLink to="/community" className="inline-block text-forest underline">
          {t.nav.community}
        </LangLink>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{m.deviceTitle}</h2>
        <p className="text-sm text-muted">{m.localOnly}</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{m.favs}</h2>
        {articles.length === 0 ? (
          <p className="text-muted">{m.noFavs}</p>
        ) : (
          <div className="grid gap-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{m.history}</h2>
        {hist.length === 0 ? (
          <p className="text-muted">{m.noHistory}</p>
        ) : (
          <ul className="space-y-3">
            {hist.map((h) => (
              <li key={h.id} className="rounded-2xl border border-line bg-surface p-4">
                <p className="font-medium">{h.title}</p>
                <p className="mt-1 text-sm text-muted">{h.summary}</p>
                <p className="mt-1 text-sm text-subtle">{h.at.slice(0, 10)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
