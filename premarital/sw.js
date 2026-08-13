/* Offline cache for premarital forms PWA */
const CACHE = "premarital-forms-v4";
const ASSETS = [
  './',
  './index.html',
  './fill.html',
  './compare.html',
  './css/app.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './js/pwa.js',
  './js/data-loader.js',
  './js/home.js',
  './js/fill.js',
  './js/compare.js',
  './js/compare-page.js',
  './js/storage.js',
  './js/import-export-core.js',
  './js/selfcheck.js',
  './data/forms.json',
  './data/assessment.json',
  './data/forms/assessment.json',
  './data/forms/intake.json',
  './data/forms/expectations.json',
  './data/forms/family.json',
  './data/forms/knowyou.json',
  './data/forms/roles.json',
  './data/forms/sex.json',
  './premarital-counseling-offline.html',
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
