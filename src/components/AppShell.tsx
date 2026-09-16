import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { BookOpen, FlaskConical, House, MessagesSquare, ScanLine, UserRound } from "lucide-react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { messages } from "@/lib/i18n/messages";
import { useLang } from "@/lib/i18n/lang";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { langFromPath } from "@/lib/i18n/path";
import { LanguageToggle } from "./LanguageToggle";
import { LangLink } from "./LangLink";

const NAV = [
  { to: "/", key: "home" as const, Icon: House },
  { to: "/diagnose", key: "diagnose" as const, Icon: ScanLine },
  { to: "/knowledge", key: "knowledge" as const, Icon: BookOpen },
  { to: "/encyclopedia", key: "wiki" as const, Icon: FlaskConical },
  { to: "/community", key: "community" as const, Icon: MessagesSquare },
  { to: "/me", key: "me" as const, Icon: UserRound },
];

function AuthSlot({ loginLabel }: { loginLabel: string }) {
  const { user, isPending } = useCurrentUserState();
  const [waited, setWaited] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setWaited(true), 4000);
    return () => window.clearTimeout(t);
  }, []);
  if (isPending && !waited) {
    return (
      <LangLink
        to="/login"
        className="inline-flex min-h-10 items-center rounded-lg bg-forest px-4 text-sm font-medium text-forest-fg"
      >
        {loginLabel}
      </LangLink>
    );
  }
  if (user) {
    return <UserButton />;
  }
  return (
    <LangLink
      to="/login"
      className="inline-flex min-h-10 items-center rounded-lg bg-forest px-4 text-sm font-medium text-forest-fg"
    >
      {loginLabel}
    </LangLink>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const lang = usePathLang();
  const syncFromPath = useLang((s) => s.syncFromPath);
  const t = messages[lang];
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    syncFromPath(pathname);
  }, [pathname, syncFromPath]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  }, [lang]);
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw-tuzhi.js").catch(() => undefined);
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const link = document.querySelector('link[rel="manifest"]');
    if (link) link.setAttribute("href", lang === "en" ? "/manifest-en.webmanifest" : "/manifest.webmanifest");
  }, [lang]);
  function active(to: string) {
    const pathLang = langFromPath(pathname);
    const prefix = pathLang === "en" ? "/en" : "";
    const full = to === "/" ? prefix || "/" : `${prefix}${to}`;
    if (to === "/") return pathname === "/" || pathname === "/en";
    return pathname === full || pathname.startsWith(full + "/");
  }
  return (
    <div className="min-h-dvh bg-bg text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-forest-fg"
      >
        {lang === "en" ? "Skip to content" : "跳到正文"}
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[70rem] items-center gap-3 px-4">
          <LangLink to="/" className="flex shrink-0 items-center gap-3">
            <img src="/logo.png" alt={t.name} width={44} height={44} className="size-11 rounded-full" />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-xl font-semibold">{t.name}</span>
              <span className="block truncate text-sm text-muted">{t.tagline}</span>
            </span>
          </LangLink>
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
            {NAV.map((n) => (
              <LangLink
                key={n.to}
                to={n.to}
                className={
                  active(n.to)
                    ? "rounded-lg bg-forest px-3 py-2 text-sm font-medium text-forest-fg"
                    : "rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink"
                }
              >
                {t.nav[n.key]}
              </LangLink>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <LanguageToggle />
            <AuthSlot loginLabel={t.nav.login} />
          </div>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-[70rem] px-4 pb-28 pt-4 md:pb-10">
        {children}
      </main>
      <footer className="mx-auto mt-10 max-w-[70rem] border-t border-line px-4 pb-28 pt-6 text-base text-muted md:pb-8">
        <p className="font-display text-lg text-ink">
          {t.name} · {t.tagline}
        </p>
        <p className="mt-1 text-sm">{t.footer.maker}</p>
        <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <LangLink to="/about" className="text-forest underline">
            {t.footer.about}
          </LangLink>
          <LangLink to="/knowledge" className="text-forest underline">
            {t.footer.knowledge}
          </LangLink>
          <LangLink to="/encyclopedia" className="text-forest underline">
            {t.footer.wiki}
          </LangLink>
          <LangLink to="/community" className="text-forest underline">
            {t.footer.community}
          </LangLink>
          <LangLink to="/privacy" className="text-forest underline">
            {t.footer.privacy}
          </LangLink>
          <LangLink to="/terms" className="text-forest underline">
            {t.footer.terms}
          </LangLink>
          <LangLink to="/contact" className="text-forest underline">
            {t.footer.contact}
          </LangLink>
        </nav>
        <p className="mt-3 leading-relaxed">{t.disclaimer}</p>
      </footer>
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
        aria-label={t.nav.home}
      >
        <ul className="mx-auto grid max-w-lg grid-cols-6">
          {NAV.map((n) => (
            <li key={n.to}>
              <LangLink
                to={n.to}
                className={
                  "flex min-h-16 flex-col items-center justify-center gap-0.5 px-0.5 text-center text-[11px] font-medium leading-tight " +
                  (active(n.to) ? "text-forest" : "text-muted")
                }
              >
                <n.Icon className="size-6" strokeWidth={active(n.to) ? 2.4 : 1.8} />
                {t.nav.short[n.key]}
              </LangLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
