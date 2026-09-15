import { createFileRoute } from "@tanstack/react-router";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo({
      title: "隐私与免责｜土知",
      description: "土知如何使用账号、诊断照片与问答内容。诊断仅供学习，不替代农技站。",
      path: "/privacy",
    }),
  component: Privacy,
});

export function Privacy() {
  const lang = usePathLang();
  const t = messages[lang];
  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{t.privacy.title}</h1>
      {t.privacy.paragraphs.map((p) => (
        <p key={p.slice(0, 16)} className="leading-relaxed">
          {p}
        </p>
      ))}
      <p className="text-muted">{t.disclaimer}</p>
    </article>
  );
}
