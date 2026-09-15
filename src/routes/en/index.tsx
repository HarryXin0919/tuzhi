import { createFileRoute } from "@tanstack/react-router";
import { listPosts } from "@/lib/community/server";
import { HOME_DESC_EN, HOME_TITLE_EN, seo } from "@/lib/seo";
import { Home } from "../index";

export const Route = createFileRoute("/en/")({
  loader: async () => {
    const posts = await listPosts({ data: {} });
    return { posts: posts.slice(0, 4) };
  },
  head: () => seo({ title: HOME_TITLE_EN, description: HOME_DESC_EN, path: "/en", lang: "en" }),
  component: Home,
});
