#!/usr/bin/env node
/**
 * Deploy-time database migrator (node-postgres, `pg`).
 *
 * Runs during `npm run build` — on every Vercel deploy — applying pending files
 * in ../migrations to DATABASE_URL. Each file is applied in one transaction and
 * recorded in a `_migrations` table, so it runs once and is safe to re-run.
 *
 * The read is non-recursive, so the opt-in auth schema under migrations/auth/
 * is not applied to an app that never asked for sign-in.
 *
 * No DATABASE_URL (local / preview builds) -> skip; the PGLite fallback applies
 * the same files at startup instead (see src/lib/db.ts).
 *
 * Connection / SQL failures log and exit 0: an unreachable Neon during the
 * Vercel build must not fail `npm run build`. Schema is also ensured at
 * runtime for app tables.
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";
import { pendingMigrations } from "./migration-plan.mjs";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.log(
    "[migrate] DATABASE_URL not set — skipping (the PGLite fallback migrates itself).",
  );
  process.exit(0);
}

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");

function poolConfig(url) {
  const config = {
    connectionString: url,
    max: 1,
    connectionTimeoutMillis: 8000,
  };
  try {
    const u = new URL(url);
    if (u.searchParams.get("sslmode") === "require" || /neon\.tech$/i.test(u.hostname)) {
      config.ssl = { rejectUnauthorized: false };
    }
  } catch {
    // keep driver defaults
  }
  return config;
}

/** Split a migration file into single statements so PgBouncer/Neon can run them. */
function sqlStatements(text) {
  const out = [];
  let buf = "";
  let inSingle = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (c === "'" && inSingle) {
      if (text[i + 1] === "'") {
        buf += "''";
        i += 1;
        continue;
      }
      inSingle = false;
      buf += c;
      continue;
    }
    if (c === "'" && !inSingle) {
      inSingle = true;
      buf += c;
      continue;
    }
    if (c === ";" && !inSingle) {
      const s = buf.trim();
      if (s && !s.split("\n").every((l) => !l.trim() || l.trim().startsWith("--"))) {
        out.push(s);
      }
      buf = "";
      continue;
    }
    buf += c;
  }
  const s = buf.trim();
  if (s && !s.split("\n").every((l) => !l.trim() || l.trim().startsWith("--"))) out.push(s);
  return out;
}

async function main() {
  let entries;
  try {
    entries = await readdir(migrationsDir);
  } catch {
    console.log("[migrate] no migrations/ directory — nothing to do.");
    return;
  }
  // An app with no schema of its own must not pay for a database connection.
  if (pendingMigrations(entries, []).length === 0) {
    console.log("[migrate] no migrations — nothing to do.");
    return;
  }

  const pool = new pg.Pool(poolConfig(databaseUrl));
  let client;
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      client = await pool.connect();
      lastErr = null;
      break;
    } catch (err) {
      lastErr = err;
      console.error(`[migrate] connect attempt ${attempt}/3 failed:`, err?.message || err);
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
  if (!client) {
    await pool.end().catch(() => undefined);
    throw lastErr;
  }
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
    );
    const applied = (await client.query("SELECT name FROM _migrations")).rows.map(
      (r) => r.name,
    );

    let count = 0;
    for (const { name } of pendingMigrations(entries, applied)) {
      const text = await readFile(join(migrationsDir, name), "utf8");
      const stmts = sqlStatements(text);
      try {
        await client.query("BEGIN");
        for (const stmt of stmts) {
          await client.query(stmt);
        }
        await client.query("INSERT INTO _migrations (name) VALUES ($1)", [name]);
        await client.query("COMMIT");
      } catch (err) {
        console.error(`[migrate] error applying ${name}`);
        try {
          await client.query("ROLLBACK");
        } catch {
          // ROLLBACK fails when the connection died — keep the original error.
        }
        throw err;
      }
      console.log(`[migrate] applied ${name} (${stmts.length} statement(s))`);
      count += 1;
    }
    console.log(count ? `[migrate] done — ${count} migration(s) applied.` : "[migrate] up to date.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("[migrate] failed:", err?.message || err);
  // pg errors carry the context needed to debug a bad SQL file.
  for (const key of ["code", "detail", "hint", "position", "where"]) {
    if (err?.[key] != null) console.error(`[migrate]   ${key}: ${err[key]}`);
  }
  // Never fail the Vercel / App Builder build because Neon was cold, TLS
  // failed, or a statement is already present. The app ships; schema is
  // also ensured at runtime for community tables.
  process.exit(0);
});
