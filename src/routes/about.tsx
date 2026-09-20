import { createFileRoute } from "@tanstack/react-router";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { CONTACT_EMAIL } from "@/lib/constants";
import { seo } from "@/lib/seo";
import { LangLink } from "@/components/LangLink";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "关于｜土知",
      description: "看懂土地，种好地。土知把地里看见的样子说清楚，把化验单上的词说成人话。制作人李泽宇。",
      path: "/about",
    }),
  component: About,
});

export function About() {
  const lang = usePathLang();
  const t = messages[lang];
  return (
    <article className="mx-auto max-w-[46rem] space-y-6">
      <h1 className="font-display text-3xl font-semibold">{t.about.title}</h1>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <img
          src="/images/about/li-zeyu.jpg"
          alt={t.about.photoAlt}
          width={896}
          height={1070}
          className="tz-frame w-full max-w-[28rem] object-contain"
        />
        <div className="space-y-3">
          <p className="text-lg font-medium leading-relaxed">{t.about.producer}</p>
          <p className="text-lg font-medium">{t.tagline}</p>
        </div>
      </div>
      {t.about.paragraphs.map((p) => (
        <p key={p.slice(0, 12)} className="leading-relaxed">
          {p}
        </p>
      ))}
      <p>
        <LangLink to="/contact" className="text-forest underline">
          {t.footer.contact}
        </LangLink>
        {" · "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </article>
  );
}
