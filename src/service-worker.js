var cacheName = "$versionNumber::mikahouse";

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