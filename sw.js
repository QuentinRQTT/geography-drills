const CACHE = "oblast-capitals-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./d3.min.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./fonts/pt-serif-cyrillic-700-normal.woff2",
  "./fonts/pt-serif-latin-700-normal.woff2",
  "./fonts/pt-sans-cyrillic-400-normal.woff2",
  "./fonts/pt-sans-latin-400-normal.woff2",
  "./fonts/pt-sans-cyrillic-700-normal.woff2",
  "./fonts/pt-sans-latin-700-normal.woff2",
  "./fonts/ibm-plex-mono-latin-400-normal.woff2",
  "./fonts/ibm-plex-mono-latin-500-normal.woff2"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});
