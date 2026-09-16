import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFoundView } from "@/components/NotFoundView";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  head: () =>
    seo({
      title: "页面不存在｜土知",
      description: "这一页不在土知。回首页继续对照土地问题。",
      path: "/404",
      noindex: true,
    }),
  notFoundComponent: NotFoundView,
  component: NotFoundView,
});