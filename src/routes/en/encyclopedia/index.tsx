import { createFileRoute } from "@tanstack/react-router";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { WikiList } from "../../encyclopedia/index";

export const Route = createFileRoute("/en/encyclopedia/")({
  head: () =>
    seo({
      title: "Lab words | Tuzhi",
      description: HOME_DESC_EN,
      path: "/en/encyclopedia",
      lang: "en",
    }),
  component: WikiList,
});
