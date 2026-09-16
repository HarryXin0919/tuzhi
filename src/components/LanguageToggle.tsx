import { useRouterState } from "@tanstack/react-router";
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
  const searchStr = useRouterState({ select: (s) => s.location.searchStr || "" });
  const href = `${withLangPath(pathname, next)}${searchStr}`;
  return (
    <a
      href={href}
      className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink"
      hrefLang={next === "en" ? "en" : "zh-CN"}
      aria-label={t.langSwitchAria}
      onClick={() => setLang(next)}
    >
      {t.langSwitch}
    </a>
  );
}
