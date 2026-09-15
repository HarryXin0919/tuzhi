import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Contact } from "../contact";

export const Route = createFileRoute("/en/contact")({
  head: () =>
    seo({
      title: "Contact | Tuzhi",
      description: "Write to the mailbox. The digits in the address are not a hotline.",
      path: "/en/contact",
      lang: "en",
    }),
  component: Contact,
});
