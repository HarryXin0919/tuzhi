import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { NewPost } from "../../community/new";

export const Route = createFileRoute("/en/community/new")({
  head: () =>
    seo({
      title: "Ask | Tuzhi",
      description: "Post a photo and what you see in the field.",
      path: "/en/community/new",
      noindex: true,
      lang: "en",
    }),
  component: NewPost,
});
