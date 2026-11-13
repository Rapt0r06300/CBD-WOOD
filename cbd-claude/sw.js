/* WOOD — service worker (PWA) */
/* Nom du cache bumpé le 13/11/2026 (audit QA) : à l'activation, le service
   worker supprime tous les caches dont le nom diffère — c'est ce qui garantit
   qu'aucun visiteur ne garde une ancienne version des fichiers corrigés. */
const CACHE = "wood-v2";
const CORE = [
  "index.html", "fleurs.html", "produit.html", "panier.html",
  "styles.css", "styles2.css", "app.js", "manifest.webmanifest",
  "assets/icons/icon-192.png", "assets/icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" }))).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Documents : réseau d'abord (toujours à jour), repli cache
  if (req.mode === "navigate" || req.destination === "document") {
    e.respondWith(
      fetch(req).then(r => { const cc = r.clone(); caches.open(CACHE).then(c => c.put(req, cc)); return r; })
        .catch(() => caches.match(req).then(m => m || caches.match("index.html")))
    );
    return;
  }
  // Assets : cache d'abord (ils sont versionnés via ?v=)
  e.respondWith(
    caches.match(req).then(m => m || fetch(req).then(r => { const cc = r.clone(); caches.open(CACHE).then(c => c.put(req, cc)); return r; }).catch(() => m))
  );
});
