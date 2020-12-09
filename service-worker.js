if ('serviceWorker' in navigator) {

    navigator.serviceWorker

        .register('service-worker.js');

}
var cacheName = 'PWA PIERWSZA APLIKACJA';
var filesToCache = [

    './',

    'index.html',

    'style/style.css',



];
self.addEventListener('install', function(e) {

    e.waitUntil(

        caches.open(cacheName).then(function(cache) {

            return cache.addAll(filesToCache);

        })

    );

});
self.addEventListener('activate', function(e) {

    e.waitUntil(

// Pobieranie wszystkich dostępnych cache'y

        caches.keys().then((keyList) => {

            return Promise.all(keyList.map((key) => {

// Usunięcie starych cache'y

                if (cacheName.indexOf(key) === -1) {

                    return caches.delete(key);

                }

            }));

        })

    );

});
self.addEventListener('fetch', function(e) {

    e.respondWith(

        caches.match(e.request).then(function(response) {

            if ( ! navigator.onLine) { // gdy nie można pracować online

                return caches.match('index.html');

            }

            return response || fetch(e.request);

        })

    );

});