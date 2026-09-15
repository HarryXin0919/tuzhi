import { messages } from "@/lib/i18n/messages";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { hasHan } from "@/lib/i18n/han";

export function Bilingual({
  zh,
  en,
  as: Tag = "p",
  className = "leading-relaxed",
}: {
  zh: string;
  en?: string | null;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
}) {
  const lang = usePathLang();
  const t = messages[lang].community;
  if (lang === "en") {
    const text = en && en.trim() && !hasHan(en) ? en : zh;
    return <Tag className={className}>{text}</Tag>;
  }
  return (
    <div className="space-y-1">
      <Tag className={className}>{zh}</Tag>
      {en && en.trim() && !hasHan(en) ? (
        <p className="text-sm text-subtle">
          {t.enLabel} {en}
        </p>
      ) : null}
    </div>
  );
}
