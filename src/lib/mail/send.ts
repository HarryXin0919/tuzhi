import { getSql } from "@/lib/db";

export type MailInput = { to: string; subject: string; text: string };

function previewMode() {
  return !process.env.DATABASE_URL && !process.env.RESEND_API_KEY && !process.env.SMTP_URL;
}

async function tryResend(input: MailInput) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;
  const from = process.env.MAIL_FROM?.trim() || "土知 <noreply@tuzhi.asia>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [input.to], subject: input.subject, text: input.text }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
  return true;
}

export async function sendAppMail(input: MailInput): Promise<{ ok: true; queued?: boolean; previewText?: string }> {
  const sql = await getSql();
  const id = `m${Date.now()}${Math.random().toString(36).slice(2, 6)}`;
  await sql.query(
    `insert into mail_outbox (id, to_addr, subject, body) values ($1, $2, $3, $4)`,
    [id, input.to, input.subject, input.text],
  );
  try {
    const sent = await tryResend(input);
    if (sent) {
      await sql.query(`update mail_outbox set sent_at = now() where id = $1`, [id]);
      return { ok: true };
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "send-failed";
    await sql.query(`update mail_outbox set error = $2 where id = $1`, [id, msg]);
  }
  return {
    ok: true,
    queued: true,
    previewText: previewMode() ? input.text : undefined,
  };
}
