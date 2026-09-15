#!/usr/bin/env node
/**
 * Export speakZh / speakEn scripts for optional offline TTS.
 * Writes public/audio/scripts/{slug}.{zh|en}.txt
 * Does not invent mp3 files.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const articles = (await import(join(root, "src/data/articles.json"), { with: { type: "json" } })).default;
const enrich = (await import(join(root, "src/data/enrich.json"), { with: { type: "json" } })).default;
const HAN = /[\u4e00-\u9fff]/;

const outDir = join(root, "public/audio/scripts");
mkdirSync(outDir, { recursive: true });

let n = 0;
for (const a of articles) {
  const e = enrich[a.slug] ?? {};
  const zh = e.speakZh ?? e.spoken ?? a.spoken ?? [];
  const en = (e.speakEn ?? e.spokenEn ?? a.spokenEn ?? []).filter((s) => s && !HAN.test(s) && !/translation pending/i.test(s));
  writeFileSync(join(outDir, `${a.slug}.zh.txt`), zh.join("\n") + (zh.length ? "\n" : ""), "utf8");
  writeFileSync(join(outDir, `${a.slug}.en.txt`), en.join("\n") + (en.length ? "\n" : ""), "utf8");
  n++;
}
console.log(`wrote ${n} zh + ${n} en scripts → public/audio/scripts`);
