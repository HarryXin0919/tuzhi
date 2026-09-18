import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { sendAppMail, mailChannelOpen } from "@/lib/mail/send";
import { SITE_ORIGIN } from "@/lib/constants";

export type CloudFav = { slug: string; createdAt: string };
export type CloudHist = { id: string; at: string; title: string; summary: string };

async function ensureLibrary(sql: Awaited<ReturnType<typeof getSql>>) {
  await sql.query(`create table if not exists user_favorites (
    user_id text not null, slug text not null, created_at timestamptz not null default now(),
    primary key (user_id, slug))`);
  await sql.query(`create table if not exists diagnose_history (
    id text primary key, user_id text not null, title text not null, summary text not null,
    related text, created_at timestamptz not null default now())`);
  await sql.query(`create table if not exists contact_messages (
    id text primary key, name text not null, email text not null, body text not null,
    created_at timestamptz not null default now())`);
  await sql.query(`create table if not exists mail_outbox (
    id text primary key, to_addr text not null, subject text not null, body text not null,
    sent_at timestamptz, error text, created_at timestamptz not null default now())`);
}

export const listLibrary = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureLibrary(sql);
    const favs = await sql<{ slug: string; created_at: string }>`
      select slug, created_at from user_favorites where user_id = ${context.userId} order by created_at desc`;
    const hist = await sql<{ id: string; title: string; summary: string; created_at: string }>`
      select id, title, summary, created_at from diagnose_history where user_id = ${context.userId}
      order by created_at desc limit 20`;
    return {
      favorites: favs.map((r) => r.slug),
      history: hist.map((r) => ({ id: r.id, at: String(r.created_at), title: r.title, summary: r.summary })),
    };
  });

export const mergeFavorites = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { slugs: string[] }) => input)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensureLibrary(sql);
    for (const slug of data.slugs.slice(0, 80)) {
      if (!/^[a-z0-9-]{2,80}$/.test(slug)) continue;
      await sql.query(
        `insert into user_favorites (user_id, slug) values ($1, $2) on conflict do nothing`,
        [context.userId, slug],
      );
    }
    const favs = await sql<{ slug: string }>`select slug from user_favorites where user_id = ${context.userId} order by created_at desc`;
    return { favorites: favs.map((r) => r.slug) };
  });

export const toggleFavoriteCloud = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { slug: string }) => input)
  .handler(async ({ data, context }) => {
    const slug = data.slug.trim();
    if (!/^[a-z0-9-]{2,80}$/.test(slug)) throw new Error("slug");
    const sql = await getSql();
    await ensureLibrary(sql);
    const has = await sql<{ c: number }>`select count(*)::int as c from user_favorites where user_id = ${context.userId} and slug = ${slug}`;
    if ((has[0]?.c ?? 0) > 0) {
      await sql`delete from user_favorites where user_id = ${context.userId} and slug = ${slug}`;
    } else {
      await sql.query(`insert into user_favorites (user_id, slug) values ($1, $2) on conflict do nothing`, [context.userId, slug]);
    }
    const favs = await sql<{ slug: string }>`select slug from user_favorites where user_id = ${context.userId} order by created_at desc`;
    return { favorites: favs.map((r) => r.slug) };
  });

export const saveDiagnoseHistory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; title: string; summary: string }) => input)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await ensureLibrary(sql);
    const id = data.id.slice(0, 40);
    await sql.query(
      `insert into diagnose_history (id, user_id, title, summary) values ($1, $2, $3, $4)
       on conflict (id) do nothing`,
      [id, context.userId, data.title.slice(0, 200), data.summary.slice(0, 800)],
    );
    await sql.query(
      `delete from diagnose_history where user_id = $1 and id not in (
         select id from diagnose_history where user_id = $1 order by created_at desc limit 20)`,
      [context.userId],
    );
    return { ok: true as const };
  });

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((input: { name: string; email: string; body: string; honey?: string }) => input)
  .handler(async ({ data }) => {
    if (data.honey?.trim()) return { ok: true as const };
    const name = data.name.trim().slice(0, 80);
    const email = data.email.trim().slice(0, 120);
    const body = data.body.trim().slice(0, 4000);
    if (name.length < 1) throw new Error("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("email");
    if (body.length < 4) throw new Error("body");
    const sql = await getSql();
    await ensureLibrary(sql);
    const id = `c${Date.now()}`;
    await sql.query(`insert into contact_messages (id, name, email, body) values ($1, $2, $3, $4)`, [id, name, email, body]);
    await sendAppMail({
      to: "g17612121666@gmail.com",
      subject: `土知联系信 · ${name}`,
      text: `来自 ${name} <${email}>\n\n${body}`,
    });
    return { ok: true as const, mailed: mailChannelOpen() };
  });

export const requestPasswordReset = createServerFn({ method: "POST" })
  .validator((input: { email: string }) => input)
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    if (email.endsWith("@phone.tuzhi.local")) {
      return { ok: true as const, phoneOnly: true as const };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("email");
    const { auth } = await import("@/lib/auth/server");
    const redirectTo = `${SITE_ORIGIN}/reset-password`;
    try {
      await auth.api.requestPasswordReset({ body: { email, redirectTo } });
    } catch (err) {
      console.error("[reset] requestPasswordReset", err instanceof Error ? err.message : err);
    }
    const sql = await getSql();
    await ensureLibrary(sql);
    const rows = await sql<{ body: string }>`
      select body from mail_outbox where to_addr = ${email} order by created_at desc limit 1`;
    const previewText =
      !process.env.DATABASE_URL && !process.env.RESEND_API_KEY ? rows[0]?.body : undefined;
    return { ok: true as const, mailed: mailChannelOpen(), previewText };
  });
