var cacheName = 'mikahouse::00004';
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

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            return resp || fetch(event.request).then(async function (response) {
                try {
                    const cache = await caches.open(cacheName);
                    cache.put(event.request, response.clone()).catch(function (error) {
                        console.log('Could not add to cache!' + error);
                    });
                    return response;
                }
                catch (error_1) {
                    console.log('Could not open cache!' + error_1);
                }
            }).catch(function (error) {
                console.log('Resource not found!' + error);
            });
        }).catch(function (error) {
            console.log('Resource not found in the cache!' + error);
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