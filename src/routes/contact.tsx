import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/lib/constants";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "联系｜土知",
      description: "优先用邮箱写信。邮箱里的数字不是客服电话。",
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
  const [err, setErr] = useState("");

  function send(e: React.FormEvent) {
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
    const subject = encodeURIComponent(`${name || (lang === "en" ? "Tuzhi" : "土知")}`.trim());
    const text = encodeURIComponent(`${name}\n${email}\n\n${body}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${text}`;
  }

  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{c.title}</h1>
      <p className="leading-relaxed">{c.emailFirst}</p>
      <p className="leading-relaxed">
        {c.body}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="leading-relaxed text-muted">{c.notPhone}</p>
      <form onSubmit={send} noValidate className="space-y-3 rounded-2xl border border-line bg-surface p-4">
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
        <button type="submit" className="flex min-h-12 w-full items-center justify-center rounded-xl bg-forest text-forest-fg">
          {c.send}
        </button>
        <p className="text-sm text-muted">{c.hint}</p>
      </form>
    </article>
  );
}
