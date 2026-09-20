import { useState } from "react";
import { messages } from "@/lib/i18n/messages";
import { usePathLang } from "@/lib/i18n/use-path-lang";

function phBand(n: number) {
  if (n < 5.5) return "low";
  if (n > 8) return "high";
  if (n >= 6 && n <= 7.5) return "mid";
  return "mid";
}
function ecBand(n: number) {
  if (n < 0.4) return "low";
  if (n > 1.5) return "high";
  return "mid";
}
function omBand(n: number) {
  if (n < 15) return "low";
  if (n > 30) return "high";
  return "mid";
}

export function LabBand() {
  const lang = usePathLang();
  const r = messages[lang].wiki;
  const [ph, setPh] = useState("");
  const [ec, setEc] = useState("");
  const [om, setOm] = useState("");
  const [out, setOut] = useState<{ id: string; label: string; band: string }[]>([]);

  function run() {
    const rows: { id: string; label: string; band: string }[] = [];
    const p = Number(ph);
    const e = Number(ec);
    const o = Number(om);
    if (ph && Number.isFinite(p) && p >= 0 && p <= 14) rows.push({ id: "ph", label: "pH", band: phBand(p) });
    if (ec && Number.isFinite(e) && e >= 0) rows.push({ id: "ec", label: "EC", band: ecBand(e) });
    if (om && Number.isFinite(o) && o >= 0) rows.push({ id: "om", label: lang === "en" ? "Organic matter" : "有机质", band: omBand(o) });
    setOut(rows);
  }

  function word(b: string) {
    if (b === "low") return r.bandLow;
    if (b === "high") return r.bandHigh;
    return r.bandMid;
  }

  return (
    <section className="tz-card space-y-3 p-4">
      <h2 className="font-display text-xl font-semibold">{r.bandTitle}</h2>
      <p className="text-sm text-muted">{r.bandLead}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="text-sm">
          pH
          <input value={ph} onChange={(e) => setPh(e.target.value)} className="mt-1 min-h-12 w-full border border-line px-2 tabular-nums" inputMode="decimal" />
        </label>
        <label className="text-sm">
          EC
          <input value={ec} onChange={(e) => setEc(e.target.value)} className="mt-1 min-h-12 w-full border border-line px-2 tabular-nums" inputMode="decimal" />
        </label>
        <label className="text-sm">
          {lang === "en" ? "OM g/kg" : "有机质 g/kg"}
          <input value={om} onChange={(e) => setOm(e.target.value)} className="mt-1 min-h-12 w-full border border-line px-2 tabular-nums" inputMode="decimal" />
        </label>
      </div>
      <button type="button" className="inline-flex min-h-12 items-center rounded-xl bg-forest px-4 text-forest-fg" onClick={run}>
        {r.bandGo}
      </button>
      {out.length === 0 ? <p className="text-sm text-muted">{r.bandNone}</p> : null}
      <ul className="space-y-2">
        {out.map((row) => (
          <li key={row.id} className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2">
            <span className="tabular-nums">{row.label}</span>
            <span className={`tz-band tz-band-${row.band}`}>{word(row.band)}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-subtle">{r.readNote}</p>
    </section>
  );
}
