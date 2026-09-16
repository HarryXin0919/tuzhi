import { useState } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { authClient, authEnabled } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { seo } from "@/lib/seo";
import { useAnyNavigate, useAnySearch } from "@/lib/i18n/route-data";
import { withLangPath } from "@/lib/i18n/path";
import { CONTACT_EMAIL } from "@/lib/constants";

type Search = { tab?: "login" | "register"; next?: string };

function safeNext(raw?: string) {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return "/";
  if (raw.startsWith("/api") || raw.startsWith("/__")) return "/";
  return raw.split("#")[0] || "/";
}

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(s.tab === "register" ? { tab: "register" as const } : {}),
    ...(typeof s.next === "string" ? { next: s.next } : {}),
  }),
  head: () =>
    seo({
      title: "登录｜土知",
      description: "只用邮箱或手机号登录，不用第三方账号。",
      path: "/login",
      noindex: true,
    }),
  component: Login,
});

function resolveEmail(email: string, phone: string) {
  const e = email.trim();
  if (e.includes("@")) return e;
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 7) return `${digits}@phone.tuzhi.local`;
  return e;
}

export function Login() {
  const lang = usePathLang();
  const t = messages[lang];
  const L = t.login;
  const search = useAnySearch<Search>();
  const navigate = useAnyNavigate();
  const { user, isPending } = useCurrentUserState();
  const register = search.tab === "register";
  const destRaw = safeNext(search.next);
  const dest = destRaw === "/" ? withLangPath("/", lang) : destRaw;
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [honey, setHoney] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isPending && user) {
    if (dest !== "/") {
      if (typeof window !== "undefined") window.location.replace(dest);
      return null;
    }
    return <Navigate to={withLangPath("/", lang) as never} />;
  }

  async function submit() {
    setErr("");
    if (honey.trim()) {
      setErr(L.fail);
      return;
    }
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
    if (register && !confirm) {
      setErr(L.needConfirm);
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
      window.location.assign(dest);
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
        <p className="text-sm text-subtle">{L.rules}</p>
      </header>
      <div className="flex gap-2">
        <button
          type="button"
          className={
            !register
              ? "flex-1 rounded-full bg-forest px-4 py-2 text-forest-fg"
              : "flex-1 rounded-full border border-line px-4 py-2"
          }
          onClick={() => navigate({ search: { next: search.next } })}
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
          onClick={() => navigate({ search: { tab: "register", next: search.next } })}
        >
          {L.tabRegister}
        </button>
      </div>
      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <span>website</span>
        <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
      </label>
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
      {register ? (
        <label className="flex items-start gap-2 text-sm leading-relaxed">
          <input
            type="checkbox"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
            className="mt-1 size-4"
          />
          <span>{L.confirm}</span>
        </label>
      ) : null}
      {err ? <p className="text-danger">{err}</p> : null}
      {!register ? (
        <p className="text-sm leading-relaxed text-muted">
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(L.forgot)}`} className="text-forest underline">
            {L.forgot}
          </a>{" "}
          {L.forgotHint}
        </p>
      ) : (
        <p className="text-sm leading-relaxed text-muted">{L.registered}</p>
      )}
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
