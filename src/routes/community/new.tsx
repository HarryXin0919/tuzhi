import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CROPS, PROBLEMS, REGIONS } from "@/lib/constants";
import { createPost } from "@/lib/community/server";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PhotoSlot } from "@/components/PhotoSlot";
import { LangLink } from "@/components/LangLink";
import { withLangPath } from "@/lib/i18n/path";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/community/new")({
  head: () =>
    seo({
      title: "提问｜土知",
      description: "把自家地里的照片和现象发出来。",
      path: "/community/new",
      noindex: true,
    }),
  component: NewPost,
});

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1280;
      let { width, height } = img;
      if (width > max || height > max) {
        const s = Math.min(max / width, max / height);
        width = Math.round(width * s);
        height = Math.round(height * s);
      }
      const c = document.createElement("canvas");
      c.width = width;
      c.height = height;
      c.getContext("2d")!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("photo"));
    };
    img.src = url;
  });
}

export function NewPost() {
  const lang = usePathLang();
  const t = messages[lang];
  const r = t.community;
  const { user, isPending } = useCurrentUserState();
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [problem, setProblem] = useState("其他");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-24 rounded-xl bg-surface-2" />
        <p className="text-muted">{r.needLoginLead}</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="space-y-4 rounded-2xl border border-line bg-surface p-4">
        <h1 className="font-display text-2xl font-semibold">{r.needLogin}</h1>
        <p className="leading-relaxed text-muted">{r.needLoginLead}</p>
        <LangLink to="/login" search={{ next: withLangPath("/community/new", lang) }} className="flex min-h-12 items-center justify-center rounded-xl bg-forest text-forest-fg">
          {r.goLogin}
        </LangLink>
        <LangLink to="/diagnose" className="flex min-h-12 items-center justify-center text-forest underline">
          {r.diagnoseFree}
        </LangLink>
      </div>
    );
  }

  async function onFile(f?: File | null) {
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      setErr(lang === "en" ? "That photo is too large. Keep it under 8 MB." : "这张照片太大了，请控制在 8 MB 以内。");
      return;
    }
    try {
      setPhoto(await compressImage(f));
    } catch {
      setErr(r.errPhoto);
    }
  }

  async function send() {
    if (!photo) {
      setErr(r.errPhoto);
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const res = await createPost({ data: { title, body, problem, crop, region, photo } });
      nav({ to: "/community/$id", params: { id: res.id } });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setErr(msg === "short" ? r.errShort : msg === "rate" ? r.errRate : msg === "blocked" ? r.errBlocked : msg === "photo" || msg === "photo-required" ? r.errPhoto : r.errSave);
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">{r.newTitle}</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={r.titlePh} className="min-h-12 w-full rounded-xl border border-line bg-surface px-3" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={r.bodyPh} className="min-h-40 w-full rounded-xl border border-line bg-surface p-3" />
      <PhotoSlot
        label={r.photo}
        hint={r.photoHint}
        avoid=""
        preview={photo}
        cameraLabel={r.camera}
        albumLabel={r.album}
        onFile={onFile}
      />
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
