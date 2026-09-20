/**
 * First-party HTML filter for tuzhi.asia.
 * Self-contained so a platform restore of grok-pwa-shared.mjs cannot put
 * grok-project-id / extensions.js / grok.me og:image back on the public site.
 */
export function stripGrokChrome(html: string): string {
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

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&" + "amp;")
    .replace(/</g, "&" + "lt;")
    .replace(/>/g, "&" + "gt;")
    .replace(/"/g, "&" + "quot;");
}

function insertBeforeHeadClose(html: string, snippet: string): string {
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, `${snippet}</head>`);
  return html;
}

/** After peeling Grok chrome, keep per-page title/url/image on this origin. */
export function ensureTuzhiOg(html: string, pathname: string): string {
  let s = stripGrokChrome(html);
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonical = `https://tuzhi.asia${path === "/" ? "/" : path}`;
  const titleMatch = s.match(/<title\b[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  const descMatch = s.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"]*)["'][^>]*>/i);
  const desc = descMatch ? descMatch[1].trim() : "";

  if (title) {
    if (/property=["']og:title["']/.test(s)) {
      s = s.replace(
        /<meta\b[^>]*property=["']og:title["'][^>]*>/i,
        `<meta property="og:title" content="${escapeAttr(title)}">`,
      );
    } else {
      s = insertBeforeHeadClose(s, `<meta property="og:title" content="${escapeAttr(title)}">`);
    }
  }
  if (desc && !/property=["']og:description["']/.test(s)) {
    s = insertBeforeHeadClose(s, `<meta property="og:description" content="${escapeAttr(desc)}">`);
  }
  if (!/property=["']og:url["']/.test(s)) {
    s = insertBeforeHeadClose(s, `<meta property="og:url" content="${escapeAttr(canonical)}">`);
  }
  if (!/property=["']og:image["']/.test(s)) {
    s = insertBeforeHeadClose(
      s,
      `<meta property="og:image" content="https://tuzhi.asia/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`,
    );
  }
  return s;
}

export function createStripInjector(pathname = "/") {
  const pending: Buffer[] = [];
  let done = false;
  const apply = (html: string) => ensureTuzhiOg(html, pathname);
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

export function stripHeadStreaming(response: Response, pathname = "/"): Response {
  const injector = createStripInjector(pathname);
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
  headers.set("x-tuzhi-first-party", "1");
  return new Response(transformed, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function isHtmlDocumentResponse(result: unknown): result is Response {
  return (
    result instanceof Response &&
    Boolean(result.body) &&
    String(result.headers.get("content-type") ?? "").includes("text/html") &&
    !result.headers.get("content-encoding")
  );
}
