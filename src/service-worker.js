var cacheName = "$versionNumber::mikahouse";
var filesToCache = [
    'manifest.json',
    '/assets/android-icon-192x192.png',
    '/assets/favicon-16x16.png',
    '/assets/favicon-32x32.png',
    '/assets/favicon-96x96.png',
    '/assets/icons/tag.svg',
    '/assets/icons/linkedin.svg',
    '/assets/icons/twitter.svg',
    '/assets/icons/github.svg',
    '/assets/icons/lightbulb.svg',
    $scriptReplacement
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