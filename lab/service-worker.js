var cacheName = "pwa_demo";
var filesToCache = [
    "index.html",
    "service-worker.js",
    "page.html",
    "css/style.css",
    "images/bulb.png",
    "images/offline-img.png",
    "images/header.jpg",
];
// register, install, activate, fetch

// check if serviceworker is in browser or not
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", function (event) {
    console.log(event);
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function (res) {
                return res || fetch(event.request);
            })
            .catch(function (err) {
                return caches.match("images/offline-img.png");
            })
    );
});
