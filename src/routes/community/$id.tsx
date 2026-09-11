import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { addReply, getPost } from "@/lib/community/server";
import { Bilingual } from "@/components/Bilingual";
import { ReadAloud } from "@/components/ReadAloud";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { displayName, lex } from "@/lib/i18n/lexicon";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/community/$id")({
  loader: async ({ params }) => {
    const post = await getPost({ data: { id: params.id } });
    if (!post) throw notFound();
    return { post };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const r = t.community;
  const { user, isPending } = useCurrentUserState();
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const listen =
    lang === "en"
      ? [post.titleEn || post.title, post.bodyEn || post.body, ...post.answers.map((a) => a.bodyEn || a.body)].join(". ")
      : [post.title, post.body, ...post.answers.map((a) => a.body)].join("。");

  async function send() {
    setErr("");
    try {
      await addReply({ data: { postId: post.id, body } });
      setBody("");
      window.location.reload();
    } catch {
      setErr(r.errReply);
    }
  }

  return (
    <article className="space-y-6">
      <p className="text-sm">
        <Link to="/community" className="text-forest">
          {r.back}
        </Link>
      </p>
      <header className="space-y-2">
        <Bilingual zh={post.title} en={post.titleEn} as="h1" className="font-display text-3xl font-semibold" />
        <p className="text-sm text-muted">
          {displayName(post.author, lang)} · {String(post.createdAt).slice(0, 10)} · {lex(post.problem, lang)}
        </p>
      </header>
      <ReadAloud text={listen} />
      {post.photo ? <img src={post.photo} alt="" className="max-h-80 w-full rounded-2xl object-cover" /> : null}
      <Bilingual zh={post.body} en={post.bodyEn} />
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">{r.answers}</h2>
        {post.answers.length === 0 ? <p className="text-muted">{r.noAnswers}</p> : null}
        {post.answers.map((a) => (
          <div key={a.id} className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-sm text-subtle">{displayName(a.author, lang)}</p>
            <Bilingual zh={a.body} en={a.bodyEn} />
          </div>
        ))}
      </section>
      {isPending ? null : user ? (
        <div className="space-y-2">
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={r.replyPh} className="min-h-28 w-full rounded-xl border border-line bg-surface p-3" />
          {err ? <p className="text-danger">{err}</p> : null}
          <button type="button" onClick={send} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-forest text-forest-fg">
            {r.reply}
          </button>
        </div>
      ) : (
        <p className="text-muted">
          {r.loginToReply}{" "}
          <Link to="/login" className="text-forest underline">
            {r.goLogin}
          </Link>
        </p>
      )}
    </article>
  );
}
