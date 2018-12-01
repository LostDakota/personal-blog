var cacheName = 'mikahouse::00002';
var filesToCache = [];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(cacheName).then(async function(cache) {
            const response = await cache.match(event.request);
            var fetchPromise = fetch(event.request).then(function (networkResponse) {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
            return response || fetchPromise;
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key != cacheName) {
                    return caches.delete(key);
                }
            })
        ))
    );
});