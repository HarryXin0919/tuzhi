import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTerm, localizeTerm } from "@/lib/knowledge/encyclopedia";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { TermPage } from "../../encyclopedia/$id";

export const Route = createFileRoute("/en/encyclopedia/$id")({
  loader: ({ params }) => {
    const term = getTerm(params.id);
    if (!term) throw notFound();
    return { term };
  },
  head: ({ loaderData }) => {
    const term = loaderData?.term;
    const copy = term ? localizeTerm(term, "en") : null;
    return seo({
      title: copy ? `${copy.title} · Tuzhi` : "Tuzhi",
      description: copy?.summary?.slice(0, 180) || HOME_DESC_EN,
      path: term ? `/en/encyclopedia/${term.id}` : "/en/encyclopedia",
      type: "article",
      lang: "en",
    });
  },
  component: TermPage,
});
