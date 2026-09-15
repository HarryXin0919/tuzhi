import { Link } from "@tanstack/react-router";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { withLangPath } from "@/lib/i18n/path";

export function LangLink(props: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  const lang = usePathLang();
  const { to, params, search, children, ...rest } = props;
  return (
    <Link
      {...(rest as object)}
      to={withLangPath(to, lang) as never}
      params={params as never}
      search={search as never}
    >
      {children as React.ReactNode}
    </Link>
  );
}
