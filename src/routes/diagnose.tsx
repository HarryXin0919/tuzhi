import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CROPS, FERTS, REGIONS, STAGES } from "@/lib/constants";
import { runDiagnose, type DiagnoseResult } from "@/lib/diagnose/server";
import { getArticle } from "@/lib/knowledge/search";
import { ArticleCard } from "@/components/ArticleCard";
import { useLang } from "@/lib/i18n/lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { pushHistory } from "@/lib/local";

export const Route = createFileRoute("/diagnose")({ component: Diagnose });

type Slot = "plant" | "leaf" | "soil";

function fileToData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function Diagnose() {
  const lang = useLang((s) => s.lang);
  const t = messages[lang];
  const d = t.diagnose;
  const [photos, setPhotos] = useState<Record<Slot, string | null>>({ plant: null, leaf: null, soil: null });
  const [text, setText] = useState("");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [stage, setStage] = useState("");
  const [fert, setFert] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [result, setResult] = useState<DiagnoseResult | null>(null);

  async function onFile(slot: Slot, f?: File | null) {
    if (!f) return;
    const data = await fileToData(f);
    setPhotos((p) => ({ ...p, [slot]: data }));
  }

  async function send() {
    const list = [photos.plant, photos.leaf, photos.soil].filter(Boolean) as string[];
    if (list.length === 0 && text.trim().length < 8) {
      setErr(d.needPhoto);
      return;
    }
    setBusy(true);
    setErr("");
    const res = await runDiagnose({
      data: { photos: list, text, crop, region, stage, fert, lang },
    });
    setBusy(false);
    if (!res.ok) {
      setErr(res.error === "off" ? d.aiOff : d.sendFail);
      return;
    }
    setResult(res.result);
    pushHistory({
      id: String(Date.now()),
      at: new Date().toISOString(),
      title: res.result.title,
      summary: res.result.summary,
    });
  }

  const filled = [photos.plant, photos.leaf, photos.soil].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold">{d.title}</h1>
        <p className="text-muted">{d.lead}</p>
      </header>
      {result ? (
        <section className="space-y-4 rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm text-subtle">{d.result}</p>
          <h2 className="font-display text-2xl font-semibold">{result.title}</h2>
          <p className="text-lg leading-relaxed">{result.summary}</p>
          <div>
            <h3 className="font-medium">{d.analysis}</h3>
            <p className="mt-1 leading-relaxed text-muted">{result.photosSay}</p>
          </div>
          {result.distinguish ? (
            <p className="rounded-xl bg-surface-2 p-3 leading-relaxed">{result.distinguish}</p>
          ) : null}
          {result.dont?.length ? (
            <div>
              <h3 className="font-medium">{d.dont}</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {result.dont.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {result.next?.length ? (
            <div>
              <h3 className="font-medium">{d.next}</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {result.next.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {result.related?.length ? (
            <div className="grid gap-3">
              <h3 className="font-medium">{d.related}</h3>
              {result.related.map((slug) => {
                const a = getArticle(slug);
                return a ? <ArticleCard key={slug} article={a} /> : null;
              })}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center rounded-xl border border-line px-4"
              onClick={() => {
                setResult(null);
                setPhotos({ plant: null, leaf: null, soil: null });
              }}
            >
              {d.retry}
            </button>
            <Link to="/knowledge/$slug" params={{ slug: "suan-hua" }} className="inline-flex min-h-12 items-center text-forest underline">
              {d.example}
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["plant", d.slotPlant, d.hintPlant, d.avoidPlant],
                ["leaf", d.slotLeaf, d.hintLeaf, d.avoidLeaf],
                ["soil", d.slotSoil, d.hintSoil, d.avoidSoil],
              ] as const
            ).map(([key, label, hint, avoid]) => (
              <label key={key} className="block cursor-pointer rounded-2xl border border-dashed border-line bg-surface p-3">
                <span className="font-medium">{label}</span>
                <p className="text-sm text-muted">{hint}</p>
                <p className="text-sm text-subtle">{avoid}</p>
                {photos[key] ? <img src={photos[key]!} alt="" className="mt-2 h-32 w-full rounded-lg object-cover" /> : <span className="mt-2 block h-32 rounded-lg bg-surface-2" />}
                <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => onFile(key, e.target.files?.[0])} />
              </label>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={d.qPh}
            className="min-h-28 w-full rounded-xl border border-line bg-surface p-3"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="min-h-12 rounded-xl border border-line bg-surface px-3">
              <option value="">{d.crop}</option>
              {CROPS.map((c) => (
                <option key={c} value={c}>
                  {lex(c, lang)}
                </option>
              ))}
            </select>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="min-h-12 rounded-xl border border-line bg-surface px-3">
              <option value="">{d.region}</option>
              {REGIONS.map((c) => (
                <option key={c} value={c}>
                  {lex(c, lang)}
                </option>
              ))}
            </select>
            <select value={stage} onChange={(e) => setStage(e.target.value)} className="min-h-12 rounded-xl border border-line bg-surface px-3">
              <option value="">{d.stage}</option>
              {STAGES.map((c) => (
                <option key={c} value={c}>
                  {lex(c, lang)}
                </option>
              ))}
            </select>
            <select value={fert} onChange={(e) => setFert(e.target.value)} className="min-h-12 rounded-xl border border-line bg-surface px-3">
              <option value="">{d.fert}</option>
              {FERTS.map((c) => (
                <option key={c} value={c}>
                  {lex(c, lang)}
                </option>
              ))}
            </select>
          </div>
          {filled === 0 ? <p className="text-sm text-clay">{d.noPhotoWarn}</p> : filled < 3 ? <p className="text-sm text-clay">{d.fewPhotoWarn}</p> : null}
          {err ? <p className="text-danger">{err}</p> : null}
          <button
            type="button"
            disabled={busy}
            onClick={send}
            className="flex min-h-14 w-full items-center justify-center rounded-xl bg-forest text-lg font-medium text-forest-fg disabled:opacity-50"
          >
            {busy ? d.sending : d.send}
          </button>
        </>
      )}
    </div>
  );
}
