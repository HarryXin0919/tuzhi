import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, FlaskConical, House, MessagesSquare, ScanLine, UserRound } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { messages } from "@/lib/i18n/messages";
import { useLang } from "@/lib/i18n/lang";
import { LanguageToggle } from "./LanguageToggle";

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
  if (isPending) {
    return <span className="inline-flex min-h-10 min-w-16 items-center rounded-lg bg-surface-2 px-4" />;
  }
  if (user) {
    return (
      <SignedIn>
        <UserButton />
      </SignedIn>
    );
  }
  return (
    <SignedOut>
      <Link
        to="/login"
        className="inline-flex min-h-10 items-center rounded-lg bg-forest px-4 text-sm font-medium text-forest-fg"
      >
        {loginLabel}
      </Link>
    </SignedOut>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  }, [lang]);
  function active(to: string) {
    if (to === "/") return pathname === "/";
    return pathname === to || pathname.startsWith(to + "/");
  }
  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt={t.name} width={44} height={44} className="size-11 rounded-full" />
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold">{t.name}</span>
              <span className="block truncate text-sm text-muted">{t.tagline}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={
                  active(n.to)
                    ? "rounded-lg bg-forest px-3 py-2 text-sm font-medium text-forest-fg"
                    : "rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-ink"
                }
              >
                {t.nav[n.key]}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle />
            <AuthSlot loginLabel={t.nav.login} />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-4 md:pb-10">{children}</main>
      <footer className="mx-auto mt-10 max-w-5xl border-t border-line px-4 pb-28 pt-6 text-base text-muted md:pb-8">
        <p className="font-display text-lg text-ink">
          {t.name} · {t.tagline}
        </p>
        <p className="mt-1 text-sm">{t.footer.maker}</p>
        <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/about" className="text-forest underline">
            {t.footer.about}
          </Link>
          <Link to="/knowledge" className="text-forest underline">
            {t.footer.knowledge}
          </Link>
          <Link to="/encyclopedia" className="text-forest underline">
            {t.footer.wiki}
          </Link>
          <Link to="/community" className="text-forest underline">
            {t.footer.community}
          </Link>
          <Link to="/privacy" className="text-forest underline">
            {t.footer.privacy}
          </Link>
          <Link to="/contact" className="text-forest underline">
            {t.footer.contact}
          </Link>
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
              <Link
                to={n.to}
                className={
                  "flex min-h-16 flex-col items-center justify-center gap-0.5 px-0.5 text-center text-[11px] font-medium leading-tight " +
                  (active(n.to) ? "text-forest" : "text-muted")
                }
              >
                <n.Icon className="size-6" strokeWidth={active(n.to) ? 2.4 : 1.8} />
                {t.nav[n.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
