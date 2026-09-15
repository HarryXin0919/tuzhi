import { createFileRoute } from "@tanstack/react-router";
import { listPosts } from "@/lib/community/server";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { Community } from "../../community/index";

type Search = { problem?: string };

export const Route = createFileRoute("/en/community/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    problem: typeof s.problem === "string" ? s.problem : undefined,
  }),
  loaderDeps: ({ search }) => ({ problem: search.problem }),
  loader: async ({ deps }) => ({ posts: await listPosts({ data: { problem: deps.problem } }) }),
  head: () =>
    seo({
      title: "Q&A | Tuzhi",
      description: HOME_DESC_EN,
      path: "/en/community",
      lang: "en",
    }),
  component: Community,
});
