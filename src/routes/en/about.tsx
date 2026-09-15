import { createFileRoute } from "@tanstack/react-router";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { About } from "../about";

export const Route = createFileRoute("/en/about")({
  head: () => seo({ title: "About | Tuzhi", description: HOME_DESC_EN, path: "/en/about", lang: "en" }),
  component: About,
});
