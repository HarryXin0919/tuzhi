import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{t.privacy.title}</h1>
      <p className="leading-relaxed">{t.privacy.body}</p>
      <p className="text-muted">{t.disclaimer}</p>
    </article>
  );
}
