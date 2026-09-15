import { useRouterState } from "@tanstack/react-router";
import type { Lang } from "./lang";
import { langFromPath } from "./path";

/** URL is the source of truth so /en SSR never paints Chinese. */
export function usePathLang(): Lang {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return langFromPath(pathname);
}
