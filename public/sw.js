const CACHE_VERSION = "pathshala-v2";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGES_CACHE = `${CACHE_VERSION}-pages`;
const FONTS_CACHE = `${CACHE_VERSION}-fonts`;

const PRECACHE_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
  "/apple-touch-icon.png"
];

// Install: Pre-cache core shell & assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .catch(() => undefined)
  );
  self.skipWaiting();
});

// Activate: Prune stale caches & claim clients immediately
self.addEventListener("activate", (event) => {
  const allowedCaches = [STATIC_CACHE, PAGES_CACHE, FONTS_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !allowedCaches.includes(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>প্রাথমিক পাঠশালা — অফলাইন</title>
  <style>
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;background:#f0fdf4;color:#0f172a;padding:20px;text-align:center}
    .card{max-width:420px;background:#fff;border:1px solid #d1fae5;border-radius:24px;padding:32px 24px;box-shadow:0 12px 30px rgba(5,150,105,.1)}
    .icon{font-size:48px;margin-bottom:12px}
    h1{font-size:22px;margin:0 0 10px;color:#065f46}
    p{font-size:14px;color:#475569;line-height:1.6;margin:0 0 20px}
    .btn-group{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    button, a{background:#059669;color:#fff;border:0;border-radius:12px;padding:11px 22px;font-weight:700;font-size:14px;text-decoration:none;display:inline-block;cursor:pointer}
    .btn-secondary{background:#f1f5f9;color:#334155}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🎈</div>
    <h1>ইন্টারনেট সংযোগ নেই</h1>
    <p>আপনি বর্তমানে অফলাইনে আছেন। আপনি পূর্বে যেসকল স্লাইড, বই বা কুইজ ওপেন করেছিলেন সেগুলো অফলাইনেও পড়তে পারবেন।</p>
    <div class="btn-group">
      <button onclick="location.reload()">পুনরায় চেষ্টা করুন</button>
      <a href="/" class="btn-secondary">মূল পাতায় যান</a>
    </div>
  </div>
</body>
</html>`;

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") return;

  const url = new URL(request.url);

  // Skip dynamic API calls and audio range requests
  if (url.pathname.startsWith("/api/") || request.headers.has("range")) return;

  // 1. Google Fonts & Gstatic: Cache-First
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONTS_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((res) => {
              if (res.ok) cache.put(request, res.clone());
              return res;
            })
            .catch(() => cached);
        })
      )
    );
    return;
  }

  // Cross-origin non-font requests pass-through
  if (url.origin !== self.location.origin) return;

  // 2. Navigation Requests (HTML pages): Network-First with Dynamic Cache Fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(PAGES_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.open(PAGES_CACHE).then((cache) =>
            cache.match(request).then((cached) => {
              if (cached) return cached;
              return cache.match("/").then((homeCached) => {
                if (homeCached) return homeCached;
                return new Response(OFFLINE_HTML, {
                  status: 200,
                  headers: { "Content-Type": "text/html; charset=utf-8" },
                });
              });
            })
          )
        )
    );
    return;
  }

  // 3. Static Assets (_next/static, images, pdfjs, certificates, svg): Stale-While-Revalidate
  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/pdfjs/") ||
    url.pathname.startsWith("/certificates/") ||
    /\.(png|jpg|jpeg|svg|webp|ico|woff2?|css|js)$/i.test(url.pathname);

  if (isStaticAsset) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((networkRes) => {
              if (networkRes && networkRes.status === 200) {
                cache.put(request, networkRes.clone());
              }
              return networkRes;
            })
            .catch(() => cached);

          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request).catch(() =>
      caches.match(request).then((cached) => cached || Response.error())
    )
  );
});
