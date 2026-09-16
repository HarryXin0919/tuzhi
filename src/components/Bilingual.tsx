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
  if (lang === "en") {
    const text = en && en.trim() && !hasHan(en) ? en : zh;
    return <Tag className={className}>{text}</Tag>;
  }
  return <Tag className={className}>{zh}</Tag>;
}