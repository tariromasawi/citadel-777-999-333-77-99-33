self.addEventListener("install", e => {
  e.waitUntil(caches.open("citadel-v1").then(c => c.addAll([
    "./","./index.html","./covering.html","./hours.html","./scrolls.html","./watch.html","./law.html",
    "./css/citadel.css","./js/citadel.js","./data/pulse.json"
  ])));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
