import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/lib/constants";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{t.contact.title}</h1>
      <p className="leading-relaxed">
        {t.contact.body}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </article>
  );
}
