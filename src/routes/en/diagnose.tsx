import { createFileRoute } from "@tanstack/react-router";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { Diagnose } from "../diagnose";

export const Route = createFileRoute("/en/diagnose")({
  head: () =>
    seo({
      title: "Take photos | Tuzhi",
      description: HOME_DESC_EN,
      path: "/en/diagnose",
      lang: "en",
    }),
  component: Diagnose,
});
