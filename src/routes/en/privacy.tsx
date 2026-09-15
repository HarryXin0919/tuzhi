import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Privacy } from "../privacy";

export const Route = createFileRoute("/en/privacy")({
  head: () =>
    seo({
      title: "Privacy | Tuzhi",
      description: "How Tuzhi uses accounts, diagnose photos and Q&A. For learning, not a prescription.",
      path: "/en/privacy",
      lang: "en",
    }),
  component: Privacy,
});
