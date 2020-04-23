// Service Worker
const cacheName = "my-first-pwa";
const filesToCache = [
  "/",
  "index.html",
  "./js/index.js",
  "./styles/styles.css"
];

self.addEventListener("install", e => {
  console.log("[ServiceWorker**] Install");
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[ServiceWorker**] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

//In this code snippet we wait for an activate event, and then run a waitUntil() block that clears up any old, unused caches before a new service worker is activated. Here we have a whitelist containing the names of the caches we want to keep. We return the keys of the caches in the CacheStorage object using keys(), then check each key to see if it is in the whitelist. If not, we delete it using CacheStorage.delete.

self.addEventListener("activate", event => {
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            console.log("[ServiceWorker] - Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    });
  });


  //If you're making your app offline-first, this is how you'll handle the majority of requests.
  /*

  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(response => {
        return response || fetch(event.request);
      })
    );
  });

*/