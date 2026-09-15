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
    const title = post?.titleEn && !/[\u4e00-\u9fff]/.test(post.titleEn) ? post.titleEn : "Q&A";
    return seo({
      title: `${title} · Tuzhi`,
      description: HOME_DESC_EN,
      path: post ? `/en/community/${post.id}` : "/en/community",
      lang: "en",
    });
  },
  component: PostPage,
});
