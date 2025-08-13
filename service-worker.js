const CACHE_NAME = 'ghc-fresh-v1';
const URLS = [
  './',
  './index.html',
  './manifest.json',
  './data.json',
  './icons/app-icon-192.png',
  './icons/app-icon-512.png',
  './icons/favicon.ico'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS)));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k))))
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});
