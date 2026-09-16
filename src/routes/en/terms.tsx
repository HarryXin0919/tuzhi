import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Terms } from "../terms";

export const Route = createFileRoute("/en/terms")({
  head: () =>
    seo({
      title: "How to use Tuzhi | Tuzhi",
      description: "Guides are for matching what you see, not a prescription. Confirm rates with a local agronomist.",
      path: "/en/terms",
      lang: "en",
    }),
  component: Terms,
});
