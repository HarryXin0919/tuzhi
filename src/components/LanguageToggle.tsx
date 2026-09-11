import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";

export function LanguageToggle() {
  const lang = useLang((s) => s.lang);
  const setLang = useLang((s) => s.setLang);
  const t = messages[lang];
  const next = lang === "zh" ? "en" : "zh";
  return (
    <button
      type="button"
      className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink"
      aria-label={t.langSwitchAria}
      onClick={() => setLang(next)}
    >
      {t.langSwitch}
    </button>
  );
}
