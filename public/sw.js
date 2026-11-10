const OFFLINE_CACHE = "pathshala-offline-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(OFFLINE_CACHE)
      .then((cache) => cache.addAll(["/manifest.webmanifest", "/pwa-192x192.png"]))
      .catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== OFFLINE_CACHE).map((k) => caches.delete(k)))
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
    .card{max-width:380px;background:#fff;border:1px solid #d1fae5;border-radius:24px;padding:28px 24px;box-shadow:0 12px 30px rgba(5,150,105,.08)}
    .icon{font-size:44px;margin-bottom:8px}
    h1{font-size:20px;margin:0 0 8px}
    p{font-size:14px;color:#475569;line-height:1.6;margin:0 0 18px}
    button{background:#059669;color:#fff;border:0;border-radius:12px;padding:10px 20px;font-weight:700;font-size:14px;cursor:pointer}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🎈</div>
    <h1>ইন্টারনেট সংযোগ নেই</h1>
    <p>অনুগ্রহ করে আপনার ওয়াই-ফাই বা মোবাইল ডেটা চালু করে আবার চেষ্টা করুন।</p>
    <button onclick="location.reload()">আবার চেষ্টা করুন</button>
  </div>
</body>
</html>`;

// Network-first fetch handler: keeps cPanel production updates instant while enabling PWA installability.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || request.headers.has("range")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(OFFLINE_HTML, {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          })
      )
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request).then((cached) => cached || Response.error()))
  );
});
