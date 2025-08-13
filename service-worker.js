const CACHE_NAME = 'ghc-green-v1';
const URLS = ['./','./index.html','./manifest.json','./data.json','./icons/app-icon-192.png','./icons/app-icon-512.png'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS))); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=> k===CACHE_NAME? null : caches.delete(k))))); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request))); });
