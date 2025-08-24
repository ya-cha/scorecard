// Service Worker für Scorecard PWA
const CACHE_NAME = 'scorecard-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.ts',
  '/src/App.vue',
  '/src/views/HomeView.vue'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
      }
    )
  )
}) 