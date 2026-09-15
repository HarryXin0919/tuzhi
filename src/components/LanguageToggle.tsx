import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n/lang";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { withLangPath } from "@/lib/i18n/path";

export function LanguageToggle() {
  const lang = usePathLang();
  const setLang = useLang((s) => s.setLang);
  const t = messages[lang];
  const next = lang === "zh" ? "en" : "zh";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search });
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink"
      aria-label={t.langSwitchAria}
      onClick={() => {
        setLang(next);
        void navigate({ to: withLangPath(pathname, next) as never, search: search as never });
      }}
    >
      {t.langSwitch}
    </button>
  );
}
