/* Tuzhi: cache ten priority guides + their images/scripts. Not a full-site offline claim. */
const CACHE = "tuzhi-ten-v3";
const SLUGS = [
  "suan-hua",
  "yan-jian",
  "ban-jie",
  "you-ji-zhi",
  "que-dan",
  "que-jia",
  "que-tie",
  "lao-hai",
  "shao-gen",
  "ce-tu-bao-gao",
];
const PRECACHE = [
  "/",
  "/manifest.webmanifest",
  "/logo.png",
  ...SLUGS.flatMap((s) => [
    `/knowledge/${s}`,
    `/en/knowledge/${s}`,
    `/audio/${s}.zh.mp3`,
    `/audio/${s}.en.mp3`,
    `/audio/scripts/${s}.zh.txt`,
    `/audio/scripts/${s}.en.txt`,
  ]),
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE).catch(() => undefined)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") return;
  const hit =
    PRECACHE.includes(url.pathname) ||
    /\/images\/articles\/(suan-hua|yan-jian|ban-jie|you-ji-zhi|que-dan|que-jia|que-tie|lao-hai|shao-gen|ce-tu-bao-gao)/.test(url.pathname) ||
    /\/audio\/(suan-hua|yan-jian|ban-jie|you-ji-zhi|que-dan|que-jia|que-tie|lao-hai|shao-gen|ce-tu-bao-gao)/.test(url.pathname);
  if (!hit) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy));
        return res;
      });
    }),
  );
});
