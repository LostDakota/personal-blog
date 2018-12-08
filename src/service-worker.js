var cacheName = "v8::mikahouse";
var filesToCache = [
    'manifest.json',
    '/assets/android-icon-192x192.png',
    '/assets/favicon-16x16.png',
    '/assets/favicon-96x96.png'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(cacheName).then(async function (cache) {
            const response = await cache.match(event.request);
            var fetchPromise = fetch(event.request).then(function (networkResponse) {
                if(shouldCache(event.request.url)) {
                    cache.put(event.request, networkResponse.clone())
                        .catch(function (err) {});
                }                
                return networkResponse;
            });
            return response || fetchPromise;
        })
        .catch(function(err){})
    );
});

self.addEventListener('activate', function (event) {
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

let shouldCache = (url) => {
    let truth = url.indexOf('?') == -1;
    return truth;
}