#!/usr/bin/env node
/**
 * Copy PGLite wasm/data next to the Nitro bundle for local `vite preview`.
 * Production (DATABASE_URL / Neon) must not ship these — they bloat the
 * serverless function and are unused. Never throw: a missing dest is a no-op.
 */
import { copyFileSync, existsSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

export function copyPglitePreviewAssets() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim()) return 0;
  const dest = join(root, ".vercel/output/functions/__server.func/_libs");
  const src = join(root, "node_modules/@electric-sql/pglite/dist");
  if (!existsSync(dest) || !existsSync(src)) return 0;
  let n = 0;
  for (const f of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
    const from = join(src, f);
    if (!existsSync(from)) continue;
    try {
      copyFileSync(from, join(dest, f));
      n += 1;
    } catch {
      // Preview-only convenience — never fail a production build.
    }
  }
  return n;
}

const entry = process.argv[1];
let isMain = false;
if (entry) {
  try {
    isMain = realpathSync(entry) === fileURLToPath(import.meta.url);
  } catch {
    isMain = false;
  }
}
if (isMain) copyPglitePreviewAssets();
