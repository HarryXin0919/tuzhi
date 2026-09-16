import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFoundView } from "@/components/NotFoundView";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/en/$")({
  loader: () => {
    throw notFound();
  },
  head: () =>
    seo({
      title: "Page not found | Tuzhi",
      description: "This page is not on Tuzhi. Go home to match a soil problem.",
      path: "/en/404",
      noindex: true,
      lang: "en",
    }),
  notFoundComponent: NotFoundView,
  component: NotFoundView,
});