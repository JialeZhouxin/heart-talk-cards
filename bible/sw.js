/* 圣经金句 · 灵修记录 —— 离线缓存 */
const CACHE = "sw-bible-v1";
const ASSETS = [
  "./",
  "./index.html",
  "../shared/theme.css",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./src/styles.css",
  "./src/main.js",
  "./src/data/cards.js",
  "./src/core/card-service.js",
  "./src/core/history-store.js",
  "./src/core/history-filter.js",
  "./src/core/history-export.js",
  "./src/core/check-in.js",
  "./src/core/stats.js",
  "./src/core/storage-migration.js",
  "./src/core/daily-verse-service.js",
  "./src/core/verse-search-service.js",
  "./src/ui/render.js",
  "./src/ui/stats-render.js",
  "./src/ui/daily-verse-render.js",
  "./src/ui/verse-note-render.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((res) => {
          if (!res || res.status !== 200 || res.type === "opaque") return res;
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
