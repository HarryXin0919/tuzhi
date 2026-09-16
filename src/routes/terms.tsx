import { createFileRoute } from "@tanstack/react-router";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "使用须知｜土知",
      description: "土知怎么用：对照不是处方，用量问农技站，诊断仅供学习。",
      path: "/terms",
    }),
  component: Terms,
});

export function Terms() {
  const lang = usePathLang();
  const t = messages[lang];
  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{t.terms.title}</h1>
      {t.terms.paragraphs.map((p) => (
        <p key={p.slice(0, 18)} className="leading-relaxed">
          {p}
        </p>
      ))}
      <p className="text-muted">{t.disclaimer}</p>
    </article>
  );
}
