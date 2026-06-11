const CACHE_NAME = "baja-renta-v1";

const ASSETS = [
  "/index.html",
  "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Dancing+Script:wght@700&display=swap",
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
];

// Install — cache core assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener("fetch", (e) => {
  // Skip non-GET and cross-origin API calls
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;

      return fetch(e.request)
        .then((response) => {
          // Cache successful responses for same-origin and CDN assets
          if (
            response.status === 200 &&
            (e.request.url.startsWith(self.location.origin) ||
              e.request.url.includes("unpkg.com") ||
              e.request.url.includes("fonts.googleapis.com") ||
              e.request.url.includes("fonts.gstatic.com"))
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback — return index.html for navigation requests
          if (e.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
