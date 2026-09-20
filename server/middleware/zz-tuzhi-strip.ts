/**
 * Outer HTML filter for tuzhi.asia (filename sorts last).
 * If Nitro registers last-file as outer, this peels Grok chrome on the way out.
 * Same body as 00-tuzhi-first-party.ts — two copies so either middleware
 * order still ends on a strip after the stock Grok injector.
 */
import { isHtmlDocumentResponse, stripHeadStreaming } from "../tuzhi-html";

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

export default async function tuzhiFirstPartyLast(
  event: TuzhiEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const method = (event.req.method ?? "GET").toUpperCase();
  if (method !== "GET") return next();
  const path = event.url.pathname;
  if (!isDocumentPath(path)) return next();
  const result = await next();
  if (isHtmlDocumentResponse(result)) return stripHeadStreaming(result, path);
  return result;
}
