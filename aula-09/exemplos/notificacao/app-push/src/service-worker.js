const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/static/js/1.chunk.js',
  '/manifest.json',
];
/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', event => {
  const notification = event.data.json();
  const options = {
    body: notification.body,
    icon: notification.icon
  };

  event.waitUntil(
    self.registration.showNotification(notification.title, options)
  );
});
/* eslint-enable no-restricted-globals */
