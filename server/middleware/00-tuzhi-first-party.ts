/**
 * Outer HTML filter for tuzhi.asia. Runs before grok-pwa (filename sorts first)
 * so it sees the injected document on the way out and peels Grok chrome.
 *
 * Self-contained: a platform restore of scripts/grok-pwa-shared.mjs must not
 * put grok-project-id / extensions.js / grok.me og:image back on the public site.
 */
interface TuzhiEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

function isDocumentPath(pathname: string): boolean {
  const path = String(pathname ?? "");
  return (
    !path.startsWith("/__grok/") &&
    !path.startsWith("/api/") &&
    !path.startsWith("/@") &&
    !path.startsWith("/node_modules") &&
    !/\.[a-z0-9]+$/i.test(path)
  );
}

function stripGrokChrome(html: string): string {
  let s = String(html ?? "");
  s = s.replace(/https:\/\/[a-z0-9.-]+\.grok\.me/gi, "https://tuzhi.asia");
  s = s.replace(
    /<script\b[^>]*src=["']https:\/\/grok\.com\/grok-app-builder\/extensions\.js[^>]*>\s*<\/script>/gi,
    "",
  );
  s = s.replace(
    /<meta\b[^>]*(?:name=["']grok-project-id["']|property=["']grok:app_id["'])[^>]*>/gi,
    "",
  );
  s = s.replace(/<link\b[^>]*href=["']\/__grok\/[^"']*["'][^>]*>/gi, "");
  s = s.replace(/https:\/\/grok\.com\/grok-app-builder\/[^"'>\s]*/gi, "");
  return s;
}

function createStripInjector() {
  const pending: Buffer[] = [];
  let done = false;

  const apply = (html: string) => stripGrokChrome(html);

  return {
    push(chunk: Uint8Array | string): Buffer[] {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      if (done) return [buf];
      pending.push(buf);
      const joined = Buffer.concat(pending);
      const at = joined.toString("latin1").search(/<\/head>/i);
      if (at === -1) return [];
      done = true;
      pending.length = 0;
      const closeMatch = joined.toString("latin1", at).match(/^<\/head>/i);
      const closeLen = closeMatch ? closeMatch[0].length : 7;
      const head = apply(joined.subarray(0, at + closeLen).toString("utf8"));
      return [Buffer.concat([Buffer.from(head, "utf8"), joined.subarray(at + closeLen)])];
    },
    flush(): Buffer[] {
      if (done || pending.length === 0) return [];
      const rest = Buffer.concat(pending);
      pending.length = 0;
      done = true;
      return [Buffer.from(apply(rest.toString("utf8")), "utf8")];
    },
  };
}

function stripHeadStreaming(response: Response): Response {
  const injector = createStripInjector();
  const transformed = response.body!.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        for (const out of injector.push(chunk)) controller.enqueue(out);
      },
      flush(controller) {
        for (const out of injector.flush()) controller.enqueue(out);
      },
    }),
  );
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(transformed, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default async function tuzhiFirstParty(
  event: TuzhiEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const method = (event.req.method ?? "GET").toUpperCase();
  if (method !== "GET") return next();
  const path = event.url.pathname;
  if (!isDocumentPath(path)) return next();

  const result = await next();
  if (
    result instanceof Response &&
    result.body &&
    String(result.headers.get("content-type") ?? "").includes("text/html") &&
    !result.headers.get("content-encoding")
  ) {
    return stripHeadStreaming(result);
  }
  return result;
}
