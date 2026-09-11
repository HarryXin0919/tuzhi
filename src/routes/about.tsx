import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { CONTACT_EMAIL } from "@/lib/constants";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{t.about.title}</h1>
      <p className="text-lg font-medium">{t.tagline}</p>
      <p className="leading-relaxed">{t.about.body}</p>
      <p className="text-muted">{t.footer.maker}</p>
      <p>
        <Link to="/contact" className="text-forest underline">
          {t.footer.contact}
        </Link>
        {" · "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </article>
  );
}
