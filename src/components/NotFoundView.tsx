import { LangLink } from "@/components/LangLink";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";

export function NotFoundView() {
  const lang = usePathLang();
  const t = messages[lang];
  return (
    <article className="mx-auto max-w-lg space-y-4 py-10 text-center">
      <h1 className="font-display text-3xl font-semibold">{t.err.notFound}</h1>
      <p className="leading-relaxed text-muted">{t.err.notFoundLead}</p>
      <LangLink to="/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-forest px-5 text-forest-fg">
        {t.err.back}
      </LangLink>
    </article>
  );
}
