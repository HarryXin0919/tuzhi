import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPost } from "@/lib/community/server";
import { HOME_DESC_EN, seo } from "@/lib/seo";
import { PostPage } from "../../community/$id";

export const Route = createFileRoute("/en/community/$id")({
  loader: async ({ params }) => {
    const post = await getPost({ data: { id: params.id } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post?.titleEn && !/[\u4e00-\u9fff]/.test(post.titleEn) ? post.titleEn : post?.title || "Q&A";
    const description =
      post?.bodyEn && !/[\u4e00-\u9fff]/.test(post.bodyEn) ? post.bodyEn : post?.body?.slice(0, 180) || HOME_DESC_EN;
    return seo({
      title: `${title} · Tuzhi`,
      description,
      path: post ? `/en/community/${post.id}` : "/en/community",
      type: "article",
      lang: "en",
      image: post?.photo || undefined,
    });
  },
  component: PostPage,
});
