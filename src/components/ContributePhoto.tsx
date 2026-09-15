import { useState } from "react";
import { messages } from "@/lib/i18n/messages";
import { usePathLang } from "@/lib/i18n/use-path-lang";

const KEY = "tuzhi-photo-drafts";

export function ContributePhoto({ slug, part }: { slug?: string; part?: string }) {
  const lang = usePathLang();
  const t = messages[lang].knowledge;
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState("");
  const [place, setPlace] = useState("");
  const [done, setDone] = useState(false);

  function save() {
    const row = {
      slug: slug || "",
      part: part || "",
      crop,
      place,
      at: new Date().toISOString(),
      license: "learning",
    };
    try {
      const prev = JSON.parse(localStorage.getItem(KEY) || "[]") as unknown[];
      localStorage.setItem(KEY, JSON.stringify([...prev, row].slice(-40)));
    } catch {
      /* ignore */
    }
    setDone(true);
  }

  return (
    <div className="mt-2">
      <button type="button" className="text-sm text-forest underline" onClick={() => setOpen((v) => !v)}>
        {t.contribute}
      </button>
      {open ? (
        <form
          className="mt-2 space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <p className="text-sm text-muted">{t.contributeHint}</p>
          <input
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder={t.contributeCrop}
            className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
          />
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder={t.contributePlace}
            className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm"
          />
          <p className="text-sm text-subtle">{t.contributePart}</p>
          <button type="submit" className="inline-flex min-h-11 items-center rounded-lg bg-forest px-4 text-sm text-forest-fg">
            {t.contributeSend}
          </button>
          {done ? <p className="text-sm text-forest">{t.contributeOk}</p> : null}
        </form>
      ) : null}
    </div>
  );
}
