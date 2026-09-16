import { SITE_ORIGIN } from "@/lib/constants";
import type { Lang } from "@/lib/i18n/lang";
import { stripLangPrefix, withLangPath } from "@/lib/i18n/path";

export const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;
export const SITE_NAME = "土知";
export const SITE_NAME_EN = "Tuzhi";
export const HOME_TITLE = "土知｜看懂土地，种好地——土壤问题对照与拍照诊断";
export const HOME_DESC = "看懂土地，种好地。面向农民的土壤科普：拍照对照土地问题、农业知识、化验知识与问答。诊断仅供学习，不替代农技站。";
export const HOME_TITLE_EN = "Tuzhi｜Know the soil, farm it well";
export const HOME_DESC_EN = "Know the soil, farm it well. Field guides and photo check for soil problems. For learning, not a prescription.";

export function canonicalUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return SITE_ORIGIN + "/";
  return `${SITE_ORIGIN}${p}`;
}

export function seo(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  lang?: Lang;
  image?: string;
}) {
  const url = canonicalUrl(opts.path);
  const type = opts.type ?? "website";
  const desc = opts.description.slice(0, 180);
  const lang = opts.lang === "en" ? "en" : "zh";
  const site = lang === "en" ? SITE_NAME_EN : SITE_NAME;
  const image = opts.image && opts.image.startsWith("http") ? opts.image : opts.image ? `${SITE_ORIGIN}${opts.image}` : OG_IMAGE;
  const bare = stripLangPrefix(opts.path);
  const zhUrl = canonicalUrl(withLangPath(bare, "zh"));
  const enUrl = canonicalUrl(withLangPath(bare, "en"));
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: desc },
      ...(opts.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { name: "apple-mobile-web-app-title", content: lang === "en" ? SITE_NAME_EN : SITE_NAME },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:locale", content: lang === "en" ? "en_US" : "zh_CN" },
      { property: "og:locale:alternate", content: lang === "en" ? "zh_CN" : "en_US" },
      { property: "og:site_name", content: site },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: image },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "zh-CN", href: zhUrl },
      { rel: "alternate", hrefLang: "en", href: enUrl },
      { rel: "alternate", hrefLang: "x-default", href: zhUrl },
    ],
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
  lang?: Lang;
  image?: string;
}) {
  const url = canonicalUrl(opts.path);
  const lang = opts.lang === "en" ? "en" : "zh-CN";
  const home = opts.lang === "en" ? SITE_ORIGIN + "/en" : SITE_ORIGIN + "/";
  const knowledge = opts.lang === "en" ? SITE_ORIGIN + "/en/knowledge" : SITE_ORIGIN + "/knowledge";
  const image = opts.image && opts.image.startsWith("http") ? opts.image : opts.image ? `${SITE_ORIGIN}${opts.image}` : OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: opts.title,
        description: opts.description.slice(0, 180),
        dateModified: opts.dateModified,
        inLanguage: lang,
        author: { "@type": "Person", name: opts.lang === "en" ? "Li Zeyu" : "李泽宇" },
        publisher: { "@type": "Organization", name: opts.lang === "en" ? SITE_NAME_EN : SITE_NAME, url: SITE_ORIGIN },
        image,
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: opts.lang === "en" ? "Home" : "首页", item: home },
          { "@type": "ListItem", position: 2, name: opts.lang === "en" ? "Field guide" : "农业知识", item: knowledge },
          { "@type": "ListItem", position: 3, name: opts.title, item: url },
        ],
      },
    ],
  };
}

export function qaPageJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
  answers: string[];
  lang?: Lang;
}) {
  const url = canonicalUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: opts.title,
      text: opts.description.slice(0, 300),
      dateCreated: opts.dateModified,
      inLanguage: opts.lang === "en" ? "en" : "zh-CN",
      answerCount: opts.answers.length,
      acceptedAnswer: opts.answers[0]
        ? { "@type": "Answer", text: opts.answers[0], author: { "@type": "Person", name: opts.lang === "en" ? "Li Zeyu" : "李泽宇" } }
        : undefined,
    },
    url,
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: HOME_DESC,
    email: "g17612121666@gmail.com",
    logo: `${SITE_ORIGIN}/logo-192.png`,
  };
}
