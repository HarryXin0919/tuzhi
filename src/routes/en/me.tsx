import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Me } from "../me";

export const Route = createFileRoute("/en/me")({
  head: () => seo({ title: "Me | Tuzhi", description: "Saved guides and recent photo checks.", path: "/en/me", noindex: true, lang: "en" }),
  component: Me,
});
