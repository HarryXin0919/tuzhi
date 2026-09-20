/**
 * Deployed-app (Nitro) half of the platform PWA chrome. Auto-registered as
 * global h3 middleware because vite.config.ts sets `serverDir: "./server"` —
 * without that option Nitro v3 never scans this directory.
 *
 * tuzhi.asia is first-party: HTML documents are passed through (no Grok
 * inject). Manifest + iOS install tutorial stay for grok.me / ?install=1.
 * 00- / zz- middleware peel leftover chrome if this file is restored to
 * stock inject by the platform build.
 */
import installPageTemplate from "../../scripts/install-page.html?raw";
import {
  acceptsHtml,
  isDocumentPath,
  isInstallQuery,
  renderInstallPageHtml,
  renderWebManifest,
  skipPlatformChrome,
} from "../../scripts/grok-pwa-shared.mjs";
import { isHtmlDocumentResponse, stripHeadStreaming } from "../tuzhi-html";

interface GrokPwaEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

function hostCandidates(event: GrokPwaEvent): string[] {
  return [
    event.req.headers.get("x-forwarded-host"),
    event.req.headers.get("host"),
    event.url.host,
  ].filter((h): h is string => Boolean(h));
}

function requestHost(event: GrokPwaEvent): string {
  const candidates = hostCandidates(event);
  if (candidates.some((h) => skipPlatformChrome(h))) return "tuzhi.asia";
  return candidates[0] ?? event.url.host;
}

export default async function grokPwaMiddleware(
  event: GrokPwaEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const method = (event.req.method ?? "GET").toUpperCase();
  if (method !== "GET") return next();

  const path = event.url.pathname;
  const urlWithQuery = path + event.url.search;

  if (path === "/__grok/manifest.webmanifest" || path === "/__grok/manifest.json") {
    return new Response(renderWebManifest(requestHost(event)), {
      headers: {
        "content-type": "application/manifest+json; charset=utf-8",
        "cache-control": "no-cache",
      },
    });
  }

  if (
    isInstallQuery(urlWithQuery) &&
    isDocumentPath(path) &&
    acceptsHtml(event.req.headers.get("accept"))
  ) {
    const html = renderInstallPageHtml(installPageTemplate, {
      host: requestHost(event),
      url: urlWithQuery,
    });
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-cache",
      },
    });
  }

  if (!isDocumentPath(path)) return next();

  const result = await next();
  if (isHtmlDocumentResponse(result)) {
    // Never inject Grok chrome into app documents. Peel leftovers from a
    // restored stock injector or a baked HTML shell.
    return stripHeadStreaming(result, path);
  }
  return result;
}
