import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/client";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";
import { LangLink } from "@/components/LangLink";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  head: () =>
    seo({
      title: "重置密码｜土知",
      description: "用邮件里的链接设置新密码。",
      path: "/reset-password",
      noindex: true,
    }),
  component: ResetPassword,
});

export function ResetPassword() {
  const lang = usePathLang();
  const t = messages[lang];
  const L = t.login;
  const { token } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setErr("");
    if (password.length < 8) {
      setErr(L.short);
      return;
    }
    if (password !== password2) {
      setErr(L.mismatch);
      return;
    }
    if (!token) {
      setErr(L.resetMissing);
      return;
    }
    setBusy(true);
    try {
      const { error } = await authClient.resetPassword({ newPassword: password, token });
      if (error) {
        setErr(error.message || L.resetFail);
        setBusy(false);
        return;
      }
      setOk(true);
    } catch {
      setErr(L.resetFail);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="font-display text-3xl font-semibold">{L.resetTitle}</h1>
      <p className="text-muted">{L.resetLead}</p>
      {ok ? (
        <p className="rounded-2xl border border-line bg-surface p-4">
          {L.resetOk}{" "}
          <LangLink to="/login" className="text-forest underline">
            {L.tabLogin}
          </LangLink>
        </p>
      ) : (
        <>
          <label className="block space-y-1">
            <span className="text-sm text-muted">{L.password}</span>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-12 w-full rounded-xl border border-line bg-surface px-3"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-muted">{L.password2}</span>
            <input
              type="password"
              autoComplete="new-password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="min-h-12 w-full rounded-xl border border-line bg-surface px-3"
            />
          </label>
          {err ? <p className="text-danger">{err}</p> : null}
          <button
            type="button"
            disabled={busy}
            onClick={() => void submit()}
            className="flex min-h-14 w-full items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg disabled:opacity-50"
          >
            {L.resetSubmit}
          </button>
        </>
      )}
    </div>
  );
}
