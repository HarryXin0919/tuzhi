import { messages } from "@/lib/i18n/messages";
import { useLang } from "@/lib/i18n/lang";

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
  const lang = useLang((s) => s.lang);
  const t = messages[lang].community;
  return (
    <div className="space-y-1">
      <Tag className={className}>{zh}</Tag>
      {en && en.trim() ? (
        <p className="text-base leading-relaxed text-muted">
          <span className="mr-2 text-sm text-subtle">{t.enLabel}</span>
          {en}
          <span className="mt-1 block text-sm text-subtle">{t.machineNote}</span>
        </p>
      ) : (
        <p className="text-sm text-subtle">{t.enPending}</p>
      )}
    </div>
  );
}
