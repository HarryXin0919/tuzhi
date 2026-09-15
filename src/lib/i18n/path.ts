import type { Lang } from "./lang";

export function langFromPath(pathname: string): Lang {
  const p = pathname || "/";
  if (p === "/en" || p.startsWith("/en/")) return "en";
  return "zh";
}

export function stripLangPrefix(pathname: string): string {
  const p = pathname || "/";
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) {
    const rest = p.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return p;
}

export function withLangPath(pathname: string, lang: Lang): string {
  const base = stripLangPrefix(pathname);
  if (lang === "en") return base === "/" ? "/en" : `/en${base}`;
  return base;
}
