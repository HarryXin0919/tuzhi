import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Login } from "../login";

type Search = { tab?: "login" | "register"; next?: string };

export const Route = createFileRoute("/en/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(s.tab === "register" ? { tab: "register" as const } : {}),
    ...(typeof s.next === "string" ? { next: s.next } : {}),
  }),
  head: () =>
    seo({
      title: "Sign in | Tuzhi",
      description: "Email or phone only. No third-party login.",
      path: "/en/login",
      noindex: true,
      lang: "en",
    }),
  component: Login,
});
