import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/lib/constants";
import { sendContactMessage } from "@/lib/account/server";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "联系｜土知",
      description: "站内留言，或写邮件。邮箱里的数字不是客服电话。",
      path: "/contact",
    }),
  component: Contact,
});

export function Contact() {
  const lang = usePathLang();
  const t = messages[lang];
  const c = t.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [honey, setHoney] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!name.trim()) {
      setErr(c.needName);
      return;
    }
    if (!email.trim()) {
      setErr(c.needEmail);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErr(c.invalidEmail);
      return;
    }
    if (!body.trim()) {
      setErr(c.needBody);
      return;
    }
    if (body.trim().length < 4) {
      setErr(c.needBody);
      return;
    }
    setBusy(true);
    try {
      await sendContactMessage({ data: { name, email, body, honey } });
      setOk(true);
    } catch {
      setErr(c.sendFail);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="mx-auto max-w-[46rem] space-y-5">
      <h1 className="font-display text-3xl font-semibold">{c.title}</h1>
      <p className="leading-relaxed">{c.emailFirst}</p>
      <p className="leading-relaxed">
        {c.body}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="leading-relaxed">{c.fieldChannel}</p>
      <p className="leading-relaxed text-muted">{c.notPhone}</p>
      {ok ? (
        <p className="tz-card p-4">{c.sent}</p>
      ) : (
        <form onSubmit={(e) => void send(e)} noValidate className="tz-card space-y-3 p-4">
          <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            company
            <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
          </label>
          <label className="block text-sm">
            {c.name}
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-3" />
          </label>
          <label className="block text-sm">
            {c.yourEmail}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-3" />
          </label>
          <label className="block text-sm">
            {c.message}
            <textarea value={body} onChange={(e) => setBody(e.target.value)} className="mt-1 min-h-32 w-full rounded-lg border border-line bg-surface px-3 py-2" />
          </label>
          {err ? <p className="text-danger">{err}</p> : null}
          <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-forest text-forest-fg disabled:opacity-50">
            {c.send}
          </button>
          <p className="text-sm text-muted">{c.hint}</p>
        </form>
      )}
    </article>
  );
}
