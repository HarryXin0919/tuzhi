import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CROPS, PROBLEMS, REGIONS } from "@/lib/constants";
import { createPost } from "@/lib/community/server";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/community/new")({ component: NewPost });

function NewPost() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const r = t.community;
  const { user, isPending } = useCurrentUserState();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [problem, setProblem] = useState("其他");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!isPending && !user) {
    return (
      <div className="space-y-3">
        <h1 className="font-display text-2xl">{r.needLogin}</h1>
        <p className="text-muted">{r.needLoginLead}</p>
        <Link to="/login" search={{ tab: "register" }} className="flex min-h-12 items-center justify-center rounded-xl bg-forest text-forest-fg">
          {r.goLogin}
        </Link>
      </div>
    );
  }

  async function send() {
    setBusy(true);
    setErr("");
    try {
      const res = await createPost({ data: { title, body, problem, crop, region } });
      nav({ to: "/community/$id", params: { id: res.id } });
    } catch (e) {
      setErr(e instanceof Error && e.message === "short" ? r.errShort : r.errSave);
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{r.newTitle}</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={r.titlePh} className="min-h-12 w-full rounded-xl border border-line bg-surface px-3" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={r.bodyPh} className="min-h-40 w-full rounded-xl border border-line bg-surface p-3" />
      <select value={problem} onChange={(e) => setProblem(e.target.value)} className="min-h-12 w-full rounded-xl border border-line bg-surface px-3">
        {PROBLEMS.map((p) => (
          <option key={p} value={p}>
            {lex(p, lang)}
          </option>
        ))}
      </select>
      <select value={crop} onChange={(e) => setCrop(e.target.value)} className="min-h-12 w-full rounded-xl border border-line bg-surface px-3">
        <option value="">{r.crop}</option>
        {CROPS.map((p) => (
          <option key={p} value={p}>
            {lex(p, lang)}
          </option>
        ))}
      </select>
      <select value={region} onChange={(e) => setRegion(e.target.value)} className="min-h-12 w-full rounded-xl border border-line bg-surface px-3">
        <option value="">{r.region}</option>
        {REGIONS.map((p) => (
          <option key={p} value={p}>
            {lex(p, lang)}
          </option>
        ))}
      </select>
      {err ? <p className="text-danger">{err}</p> : null}
      <button type="button" disabled={busy} onClick={send} className="flex min-h-14 w-full items-center justify-center rounded-xl bg-forest text-lg text-forest-fg">
        {busy ? r.publishing : r.publish}
      </button>
    </div>
  );
}
