import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ResetPassword } from "../reset-password";

export const Route = createFileRoute("/en/reset-password")({
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  head: () =>
    seo({
      title: "Reset password | Tuzhi",
      description: "Set a new password from the email link.",
      path: "/en/reset-password",
      noindex: true,
      lang: "en",
    }),
  component: ResetPassword,
});
