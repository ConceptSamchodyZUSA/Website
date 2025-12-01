// Service Worker dla Admin Panel PWA
const CACHE_NAME = 'concept-admin-v1';
const urlsToCache = [
  '/',
  '/admin',
  '/manifest-admin.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js'
];

// Instalacja Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Admin cache opened');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Cache addAll error:', err);
        });
      })
  );
  // Aktywuj natychmiast nowy SW
  self.skipWaiting();
});

// Aktywacja i czyszczenie starych cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Przejmij kontrolę nad wszystkimi klientami
  return self.clients.claim();
});

// Strategia: Network First, fallback to Cache (dla admin panelu zawsze chcemy świeże dane)
self.addEventListener('fetch', (event) => {
  // Ignoruj żądania do API (zawsze próbuj pobrać z sieci)
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Sklonuj response (można go użyć tylko raz)
        const responseToCache = response.clone();

        // Cachuj tylko successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      })
      .catch(() => {
        // Jeśli nie ma sieci, użyj cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }

          // Jeśli nie ma w cache, zwróć offline page
          if (event.request.destination === 'document') {
            return caches.match('/admin').then(r => r || caches.match('/'));
          }
        });
      })
  );
});

// Obsługa notyfikacji push (opcjonalnie)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nowa aktualizacja w panelu admin',
    icon: '/logo192.png',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Otwórz panel',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Zamknij',
        icon: '/favicon.ico'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('CONCEPT Admin', options)
  );
});

// Obsługa kliknięć w notyfikacje
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/admin.html')
    );
  }
});

// Synchronizacja w tle (gdy telefon odzyska połączenie)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-cars') {
    event.waitUntil(syncCars());
  }
});

async function syncCars() {
  // Tutaj możesz dodać logikę synchronizacji danych
  console.log('Synchronizing cars data...');
}
