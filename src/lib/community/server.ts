import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { translateToEn } from "@/lib/translate";
import seed from "@/data/posts.json";

export type Reply = {
  id: string;
  author: string;
  body: string;
  bodyEn: string | null;
  createdAt: string;
};
export type Post = {
  id: string;
  author: string;
  title: string;
  titleEn: string | null;
  body: string;
  bodyEn: string | null;
  problem: string;
  crop: string | null;
  region: string | null;
  photo: string | null;
  createdAt: string;
  answers: Reply[];
};

let seeded = false;

function asIso(d: unknown): string {
  if (d instanceof Date) return d.toISOString();
  const s = String(d ?? "");
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s;
  const parsed = new Date(s);
  return Number.isNaN(parsed.getTime()) ? s : parsed.toISOString();
}

async function ensureCommunitySchema(sql: Awaited<ReturnType<typeof getSql>>) {
  await sql.query(`create table if not exists posts (
    id text primary key,
    user_id text,
    author text not null,
    title text not null,
    title_en text,
    body text not null,
    body_en text,
    problem text not null default '其他',
    crop text,
    region text,
    photo text,
    created_at timestamptz not null default now()
  )`);
  await sql.query(`create table if not exists replies (
    id text primary key,
    post_id text not null references posts(id) on delete cascade,
    user_id text,
    author text not null,
    body text not null,
    body_en text,
    created_at timestamptz not null default now()
  )`);
  await sql.query(`alter table if exists posts add column if not exists title_en text`);
}

async function seedIfEmpty() {
  if (seeded) return;
  try {
    const sql = await getSql();
    await ensureCommunitySchema(sql);
    const rows = await sql<{ c: number }>`select count(*)::int as c from posts`;
    if ((rows[0]?.c ?? 0) > 0) {
      for (const p of seed as Array<{ id: string; title?: string; titleEn?: string; body?: string; bodyEn?: string; crop?: string }>) {
        try {
          await sql`update posts set
            title = coalesce(${p.title ?? null}, title),
            title_en = coalesce(${p.titleEn ?? null}, title_en),
            body = coalesce(${p.body ?? null}, body),
            body_en = coalesce(${p.bodyEn ?? null}, body_en),
            crop = coalesce(${p.crop ?? null}, crop)
            where id = ${p.id} and id like 'p%'`
          ;
        } catch {
          // seed refresh is best-effort
        }
      }
      seeded = true;
      return;
    }
    for (const p of seed as Array<{
      id: string;
      author: string;
      createdAt: string;
      problem: string;
      crop: string;
      region: string;
      title: string;
      body: string;
      bodyEn: string;
      titleEn?: string;
      photo: string;
      answers: { author: string; body: string; bodyEn: string }[];
    }>) {
      await sql`
        insert into posts (id, author, title, title_en, body, body_en, problem, crop, region, photo, created_at)
        values (${p.id}, ${p.author}, ${p.title}, ${p.titleEn ?? null}, ${p.body}, ${p.bodyEn}, ${p.problem}, ${p.crop}, ${p.region}, ${p.photo}, ${p.createdAt}::timestamptz)
        on conflict (id) do nothing
      `;
      for (let i = 0; i < p.answers.length; i++) {
        const a = p.answers[i]!;
        const rid = p.id + "-a" + i;
        await sql`
          insert into replies (id, post_id, author, body, body_en, created_at)
          values (${rid}, ${p.id}, ${a.author}, ${a.body}, ${a.bodyEn}, ${p.createdAt}::timestamptz)
          on conflict (id) do nothing
        `;
      }
    }
    seeded = true;
  } catch (err) {
    console.error("[community] seed skipped:", err instanceof Error ? err.message : err);
  }
}

function seedPosts(problem?: string): Post[] {
  const rows = (seed as Array<{
    id: string;
    author: string;
    createdAt: string;
    problem: string;
    crop: string;
    region: string;
    title: string;
    body: string;
    bodyEn: string;
    titleEn?: string;
    photo: string;
    answers: { author: string; body: string; bodyEn: string }[];
  }>).filter((p) => !problem || p.problem === problem);
  return rows.map((p) => ({
    id: p.id,
    author: p.author,
    title: p.title,
    titleEn: p.titleEn ?? null,
    body: p.body,
    bodyEn: p.bodyEn,
    problem: p.problem,
    crop: p.crop,
    region: p.region,
    photo: p.photo,
    createdAt: p.createdAt,
    answers: p.answers.map((a, i) => ({
      id: `${p.id}-a${i}`,
      author: a.author,
      body: a.body,
      bodyEn: a.bodyEn,
      createdAt: p.createdAt,
    })),
  }));
}

async function loadPosts(problem?: string): Promise<Post[]> {
  await seedIfEmpty();
  try {
    const sql = await getSql();
  const posts = problem
    ? await sql<{
        id: string;
        author: string;
        title: string;
        title_en: string | null;
        body: string;
        body_en: string | null;
        problem: string;
        crop: string | null;
        region: string | null;
        photo: string | null;
        created_at: string;
      }>`select id, author, title, title_en, body, body_en, problem, crop, region, photo, created_at from posts where problem = ${problem} order by created_at desc`
    : await sql<{
        id: string;
        author: string;
        title: string;
        title_en: string | null;
        body: string;
        body_en: string | null;
        problem: string;
        crop: string | null;
        region: string | null;
        photo: string | null;
        created_at: string;
      }>`select id, author, title, title_en, body, body_en, problem, crop, region, photo, created_at from posts order by created_at desc`;
  const replies = await sql<{
    id: string;
    post_id: string;
    author: string;
    body: string;
    body_en: string | null;
    created_at: string;
  }>`select id, post_id, author, body, body_en, created_at from replies order by created_at`;
  const byPost = new Map<string, Reply[]>();
  for (const r of replies) {
    const list = byPost.get(r.post_id) ?? [];
    list.push({
      id: r.id,
      author: r.author,
      body: r.body,
      bodyEn: r.body_en,
      createdAt: asIso(r.created_at),
    });
    byPost.set(r.post_id, list);
  }
  return posts.map((p) => ({
    id: p.id,
    author: p.author,
    title: p.title,
    titleEn: p.title_en,
    body: p.body,
    bodyEn: p.body_en,
    problem: p.problem,
    crop: p.crop,
    region: p.region,
    photo: p.photo,
    createdAt: asIso(p.created_at),
    answers: byPost.get(p.id) ?? [],
  }));
  } catch (err) {
    console.error("[community] load skipped:", err instanceof Error ? err.message : err);
    return seedPosts(problem);
  }
}

export const listPosts = createServerFn({ method: "GET" })
  .validator((input: { problem?: string }) => input)
  .handler(async ({ data }) => loadPosts(data.problem));

export const getPost = createServerFn({ method: "GET" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }) => {
    const all = await loadPosts();
    return all.find((p) => p.id === data.id) ?? null;
  });


const lastPostAt = new Map<string, number>();
const BLOCKED = /加微信|加微信号|代开发票|色情|赌博|点击下载|免费领取/i;

function validPhoto(photo: string) {
  if (photo.startsWith("/images/") || photo.startsWith("https://")) return true;
  if (
    photo.startsWith("data:image/jpeg") ||
    photo.startsWith("data:image/png") ||
    photo.startsWith("data:image/webp")
  ) {
    return photo.length < 900_000;
  }
  return false;
}

function farmerName(email: string | null | undefined, userId: string) {
  const digits = userId.replace(/\D/g, "").slice(-4) || email?.replace(/\D/g, "").slice(-4) || "0000";
  return `农户${digits.padStart(4, "0").slice(-4)}`;
}

export const createPost = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { title: string; body: string; problem: string; crop?: string; region?: string; photo?: string }) => input)
  .handler(async ({ data, context }) => {
    const title = data.title.trim().slice(0, 120);
    const body = data.body.trim().slice(0, 4000);
    if (title.length < 4 || body.length < 8) throw new Error("short");
    if (BLOCKED.test(title) || BLOCKED.test(body)) throw new Error("blocked");
    const prev = lastPostAt.get(context.userId) ?? 0;
    if (Date.now() - prev < 45_000) throw new Error("rate");
    const photo = data.photo?.trim() || "";
    if (!photo) throw new Error("photo-required");
    if (!validPhoto(photo)) throw new Error("photo");
    lastPostAt.set(context.userId, Date.now());
    const sql = await getSql();
    const id = `u${Date.now()}`;
    const author = farmerName(undefined, context.userId);
    const titleEn = await translateToEn(title);
    const bodyEn = await translateToEn(body);
    await sql`
      insert into posts (id, user_id, author, title, title_en, body, body_en, problem, crop, region, photo)
      values (${id}, ${context.userId}, ${author}, ${title}, ${titleEn}, ${body}, ${bodyEn}, ${data.problem || "其他"}, ${data.crop ?? null}, ${data.region ?? null}, ${photo})
    `;
    return { id };
  });

export const addReply = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { postId: string; body: string }) => input)
  .handler(async ({ data, context }) => {
    const body = data.body.trim().slice(0, 2000);
    if (body.length < 2) throw new Error("short");
    const sql = await getSql();
    const id = `r${Date.now()}`;
    const author = farmerName(undefined, context.userId);
    const bodyEn = await translateToEn(body);
    await sql`
      insert into replies (id, post_id, user_id, author, body, body_en)
      values (${id}, ${data.postId}, ${context.userId}, ${author}, ${body}, ${bodyEn})
    `;
    return { id };
  });
