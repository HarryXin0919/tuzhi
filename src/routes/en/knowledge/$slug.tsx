import { createFileRoute, notFound } from "@tanstack/react-router";
import metaJson from "@/data/articles-en-meta.json";
import { hasHan } from "@/lib/i18n/han";
import { getArticle } from "@/lib/knowledge/search";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { GuidePage } from "../../knowledge/$slug";

const META = metaJson as Record<string, { title: string; subtitle: string; summary: string }>;

export const Route = createFileRoute("/en/knowledge/$slug")({
  loader: ({ params }) => {
    const raw = getArticle(params.slug);
    if (!raw) throw notFound();
    return { raw };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.raw;
    const m = a ? META[a.slug] : undefined;
    const title = m?.title && !hasHan(m.title) ? `${m.title} · Tuzhi` : "Tuzhi";
    const description = m?.summary && !hasHan(m.summary) ? m.summary : HOME_DESC_EN;
    return seo({
      title,
      description,
      path: a ? `/en/knowledge/${a.slug}` : "/en/knowledge",
      type: "article",
      lang: "en",
    });
  },
  component: function Page() {
    const { raw } = Route.useLoaderData();
    return <GuidePage raw={raw} />;
  },
});
