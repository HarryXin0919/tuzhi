import { useState } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { authClient, authEnabled } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";

type Search = { tab?: "login" | "register" };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search =>
    s.tab === "register" ? { tab: "register" } : {},
  component: Login,
});

function resolveEmail(email: string, phone: string) {
  const e = email.trim();
  if (e.includes("@")) return e;
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 7) return `${digits}@phone.tuzhi.local`;
  return e;
}

function Login() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const L = t.login;
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const nav = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const register = search.tab === "register";
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isPending && user) return <Navigate to="/" />;

  async function submit() {
    setErr("");
    const mail = resolveEmail(email, phone);
    if (!mail) {
      setErr(L.needEmail);
      return;
    }
    if (password.length < 8) {
      setErr(L.short);
      return;
    }
    if (register && password !== password2) {
      setErr(L.mismatch);
      return;
    }
    if (!authEnabled) {
      setErr(L.fail);
      return;
    }
    setBusy(true);
    try {
      const digits = (phone.replace(/\D/g, "") || mail.replace(/\D/g, "")).slice(-4) || "0000";
      const name = lang === "en" ? `Farmer ${digits}` : `农户${digits}`;
      if (register) {
        const { error } = await authClient.signUp.email({ email: mail, password, name });
        if (error) {
          setErr(error.message?.toLowerCase().includes("exist") ? L.exists : error.message || L.fail);
          setBusy(false);
          return;
        }
      }
      const { error } = await authClient.signIn.email({ email: mail, password });
      if (error) {
        setErr(register && error.message ? error.message : L.fail);
        setBusy(false);
        return;
      }
      nav({ to: "/" });
    } catch {
      setErr(L.fail);
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold">{L.title}</h1>
        <p className="text-muted">{L.lead}</p>
      </header>
      <div className="flex gap-2">
        <button
          type="button"
          className={
            !register
              ? "flex-1 rounded-full bg-forest px-4 py-2 text-forest-fg"
              : "flex-1 rounded-full border border-line px-4 py-2"
          }
          onClick={() => navigate({ search: {} })}
        >
          {L.tabLogin}
        </button>
        <button
          type="button"
          className={
            register
              ? "flex-1 rounded-full bg-forest px-4 py-2 text-forest-fg"
              : "flex-1 rounded-full border border-line px-4 py-2"
          }
          onClick={() => navigate({ search: { tab: "register" } })}
        >
          {L.tabRegister}
        </button>
      </div>
      <label className="block space-y-1">
        <span className="text-sm text-muted">{L.email}</span>
        <input
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-12 w-full rounded-xl border border-line bg-surface px-3"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm text-muted">{L.phone}</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="min-h-12 w-full rounded-xl border border-line bg-surface px-3"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm text-muted">{L.password}</span>
        <input
          type="password"
          autoComplete={register ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="min-h-12 w-full rounded-xl border border-line bg-surface px-3"
        />
      </label>
      {register ? (
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
      ) : null}
      {err ? <p className="text-danger">{err}</p> : null}
      <button
        type="button"
        disabled={busy}
        onClick={submit}
        className="flex min-h-14 w-full items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg disabled:opacity-50"
      >
        {register ? L.register : L.submit}
      </button>
    </div>
  );
}
