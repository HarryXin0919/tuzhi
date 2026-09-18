import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CROPS, FERTS, REGIONS, STAGES } from "@/lib/constants";
import { runDiagnose, type DiagnoseResult } from "@/lib/diagnose/server";
import { extractLab } from "@/lib/diagnose/transcribe";
import { getCard } from "@/lib/knowledge/catalog";
import { ArticleCard } from "@/components/ArticleCard";
import { LangLink } from "@/components/LangLink";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ReadAloud } from "@/components/ReadAloud";
import { VoiceButton } from "@/components/VoiceButton";
import { usePathLang } from "@/lib/i18n/use-path-lang";
import { messages } from "@/lib/i18n/messages";
import { lex } from "@/lib/i18n/lexicon";
import { pushHistory } from "@/lib/local";
import { saveDiagnoseHistory } from "@/lib/account/server";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { seo } from "@/lib/seo";
import { downloadShareCard } from "@/components/ShareCard";

export const Route = createFileRoute("/diagnose")({
  head: () =>
    seo({
      title: "拍照识别｜土知",
      description: "先拍整株、特写和土面，再到农业知识里对照。尽量把土壤问题和病害、药害分开。",
      path: "/diagnose",
    }),
  component: Diagnose,
});

type Slot = "plant" | "leaf" | "soil";

function fileToData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function kindLabel(kind: string, d: (typeof messages)["zh"]["diagnose"]) {
  if (kind === "病害") return d.kindDisease;
  if (kind === "药害") return d.kindSpray;
  if (kind === "盐害") return d.kindSalt;
  if (kind === "不够") return d.kindLow;
  return d.kindSoil;
}

function confLabel(c: string, d: (typeof messages)["zh"]["diagnose"]) {
  if (c === "高") return d.confHigh;
  if (c === "低") return d.confLow;
  return d.confMid;
}

export function Diagnose() {
  const lang = usePathLang();
  const t = messages[lang];
  const d = t.diagnose;
  const { user } = useCurrentUserState();
  const [photos, setPhotos] = useState<Record<Slot, string | null>>({ plant: null, leaf: null, soil: null });
  const [text, setText] = useState("");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [stage, setStage] = useState("");
  const [fert, setFert] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [result, setResult] = useState<DiagnoseResult | null>(null);
  const [labOpen, setLabOpen] = useState(true);
  const [labPhoto, setLabPhoto] = useState<string | null>(null);
  const [labPh, setLabPh] = useState("");
  const [labEc, setLabEc] = useState("");
  const [labOm, setLabOm] = useState("");
  const [ocrHint, setOcrHint] = useState("");
  const [consent, setConsent] = useState(false);


  async function onFile(slot: Slot, f?: File | null) {
    if (!f) {
      setPhotos((p) => ({ ...p, [slot]: null }));
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setErr(lang === "en" ? "That photo is too large. Keep it under 8 MB." : "这张照片太大了，请控制在 8 MB 以内。");
      return;
    }
    const data = await fileToData(f);
    if (data.length > 12 * 1024 * 1024) {
      setErr(lang === "en" ? "That photo is too large. Try another shot." : "这张照片太大了，换一张再试。");
      return;
    }
    setPhotos((p) => ({ ...p, [slot]: data }));
  }

  async function onLabFile(f?: File | null) {
    if (!f) {
      setLabPhoto(null);
      setOcrHint("");
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setErr(lang === "en" ? "That photo is too large. Keep it under 8 MB." : "这张照片太大了，请控制在 8 MB 以内。");
      return;
    }
    const data = await fileToData(f);
    setLabPhoto(data);
    setLabOpen(true);
    const ocr = await extractLab({ data: { photo: data } });
    if (ocr.ok) {
      if (ocr.ph) setLabPh(ocr.ph);
      if (ocr.ec) setLabEc(ocr.ec);
      if (ocr.om) setLabOm(ocr.om);
      if (ocr.ph || ocr.ec || ocr.om) setOcrHint(d.labOcr);
    }
  }

  function validLab(): boolean {
    if (labPh) {
      const n = Number(labPh);
      if (!Number.isFinite(n) || n < 0 || n > 14) {
        setErr(d.labPhRange);
        return false;
      }
    }
    if (labEc) {
      const n = Number(labEc);
      if (!Number.isFinite(n) || n < 0) {
        setErr(d.labNeg);
        return false;
      }
    }
    if (labOm) {
      const n = Number(labOm);
      if (!Number.isFinite(n) || n < 0) {
        setErr(d.labNeg);
        return false;
      }
    }
    return true;
  }

  async function send() {
    if (!validLab()) return;
    const list = [photos.plant, photos.leaf, photos.soil, labPhoto].filter(Boolean) as string[];
    let note = text.trim();
    if (labPh || labEc || labOm) {
      note += `${note ? "\n" : ""}化验单数字：pH=${labPh || "未填"} EC=${labEc || "未填"} 有机质=${labOm || "未填"}`;
    }
    if (list.length === 0 && note.length < 8) {
      setErr(d.needPhoto);
      return;
    }
    if (!consent) {
      setErr(d.consentNeed);
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const res = await runDiagnose({
        data: { photos: list, text: note, crop, region, stage, fert, lang },
      });
      if (!res.ok) {
        setErr(res.error === "off" ? d.aiOff : d.sendFail);
        return;
      }
      setResult(res.result);
      const item = {
        id: String(Date.now()),
        at: new Date().toISOString(),
        title: res.result.title,
        summary: res.result.summary,
      };
      pushHistory(item);
      if (user) {
        void saveDiagnoseHistory({
          data: { id: item.id, title: item.title, summary: item.summary },
        }).catch(() => {
          /* local history already saved */
        });
      }
    } catch {
      setErr(d.sendFail);
    } finally {
      setBusy(false);
    }
  }

  const filled = [photos.plant, photos.leaf, photos.soil].filter(Boolean).length;
  const missing: string[] = [];
  if (!photos.plant) missing.push(d.fewPlant);
  if (!photos.leaf) missing.push(d.fewLeaf);
  if (!photos.soil) missing.push(d.fewSoil);

  const spoken = result
    ? result.spoken?.length
      ? result.spoken
      : [result.dont?.[0], result.guesses?.[0] ? (lang === "en" ? `Closer to ${result.guesses[0].title}` : `更像${result.guesses[0].title}`) : result.title, result.next?.[0]].filter(
          (s): s is string => !!s,
        )
    : [];

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
          <ReadAloud sentences={spoken} title={result.title} listenLabel={d.listenConclusion} />
          {result.guesses?.length ? (
            <div className="space-y-2">
              <h3 className="font-medium">{d.guess}</h3>
              <ul className="space-y-2">
                {result.guesses.map((g, i) => (
                  <li key={`${g.title}-${i}`} className="rounded-xl bg-surface-2 p-3">
                    <p className="font-medium">
                      {g.title}
                      <span className="ml-2 text-sm font-normal text-muted">
                        {kindLabel(g.kind, d)} · {confLabel(g.confidence, d)}
                      </span>
                    </p>
                    {g.why ? <p className="mt-1 text-sm text-muted">{g.why}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            <h3 className="font-medium">{d.analysis}</h3>
            <p className="mt-1 leading-relaxed text-muted">{result.photosSay}</p>
          </div>
          {result.unlike?.length ? (
            <div>
              <h3 className="font-medium">{d.unlike}</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {result.unlike.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          ) : null}
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
                const a = getCard(slug);
                return a ? <ArticleCard key={slug} article={a} /> : null;
              })}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex min-h-12 items-center rounded-xl bg-forest px-4 text-forest-fg"
              onClick={() => void downloadShareCard({ title: result.title, dont: result.dont, next: result.next, lang })}
            >
              {d.shareCard}
            </button>
            <button
              type="button"
              className="inline-flex min-h-12 items-center rounded-xl border border-line px-4"
              onClick={() => {
                setResult(null);
                setPhotos({ plant: null, leaf: null, soil: null });
                setLabPhoto(null);
              }}
            >
              {d.retry}
            </button>
            <LangLink to="/knowledge/$slug" params={{ slug: "suan-hua" }} className="inline-flex min-h-12 items-center text-forest underline">
              {d.example}
            </LangLink>
          </div>
        </section>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {(
              [
                ["plant", d.slotPlant, d.hintPlant, d.avoidPlant, d.shotPlant, d.avoidPlantShot],
                ["leaf", d.slotLeaf, d.hintLeaf, d.avoidLeaf, d.shotLeaf, d.avoidLeafShot],
                ["soil", d.slotSoil, d.hintSoil, d.avoidSoil, d.shotSoil, d.avoidSoilShot],
              ] as const
            ).map(([key, label, hint, avoid, shot, avoidShot]) => (
              <PhotoSlot
                key={key}
                label={label}
                hint={hint}
                avoid={avoid}
                preview={photos[key]}
                cameraLabel={d.cameraPhone}
                albumLabel={d.album}
                shotLabel={shot}
                avoidLabel={avoidShot}
                kind={key}
                onFile={(f) => onFile(key, f)}
              />
            ))}
          </div>
          <div className="rounded-2xl border border-line bg-surface p-3">
            <p className="font-medium">{d.labStep}</p>
            <button type="button" className="mt-1 text-forest underline" onClick={() => setLabOpen((v) => !v)}>
              {labOpen ? d.labHide : d.labToggle}
            </button>
            {labOpen ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-muted">{d.labHint}</p>
                <PhotoSlot
                  label={d.labPhoto}
                  hint={d.labHint}
                  avoid={d.labAvoid}
                  preview={labPhoto}
                  cameraLabel={d.cameraPhone}
                  albumLabel={d.album}
                  shotLabel={d.shotLab}
                  avoidLabel={d.avoidLabShot}
                  kind="lab"
                  onFile={onLabFile}
                />
                {ocrHint ? <p className="text-sm text-forest">{ocrHint}</p> : null}
                <p className="text-sm">{d.labFill}</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <label className="text-sm">
                    pH
                    <input value={labPh} onChange={(e) => setLabPh(e.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2" inputMode="decimal" />
                  </label>
                  <label className="text-sm">
                    EC
                    <input value={labEc} onChange={(e) => setLabEc(e.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2" inputMode="decimal" />
                  </label>
                  <label className="text-sm">
                    {lang === "en" ? "Organic matter" : "有机质"}
                    <input value={labOm} onChange={(e) => setLabOm(e.target.value)} className="mt-1 min-h-11 w-full rounded-lg border border-line bg-surface px-2" inputMode="decimal" />
                  </label>
                </div>
              </div>
            ) : null}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={d.qPh}
            className="min-h-28 w-full rounded-xl border border-line bg-surface p-3"
          />
          <VoiceButton value={text} onChange={setText} />
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
          {filled < 3
            ? missing.map((m) => (
                <p key={m} className="text-sm text-clay">
                  {m}
                </p>
              ))
            : null}
          {err ? <p className="text-danger">{err}</p> : null}
          <label className="flex items-start gap-2 text-sm leading-relaxed">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4" />
            <span>{d.consent}</span>
          </label>
          <p className="text-sm text-muted">{d.whereResult}</p>
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
