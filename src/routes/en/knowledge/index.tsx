import { createFileRoute } from "@tanstack/react-router";
import { facetCounts, filterArticles } from "@/lib/knowledge/catalog";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { KnowledgeList } from "../../knowledge/index";

type Search = { q?: string; crop?: string; problem?: string; region?: string; season?: string };

export const Route = createFileRoute("/en/knowledge/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    crop: typeof s.crop === "string" ? s.crop : undefined,
    problem: typeof s.problem === "string" ? s.problem : undefined,
    region: typeof s.region === "string" ? s.region : undefined,
    season: typeof s.season === "string" ? s.season : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    const list = filterArticles(deps);
    const facets = facetCounts(deps);
    return { list, facets };
  },
  head: () =>
    seo({
      title: "Field guides | Tuzhi",
      description: HOME_DESC_EN,
      path: "/en/knowledge",
      lang: "en",
    }),
  component: KnowledgeList,
});
