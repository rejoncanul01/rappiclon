const CACHE_NAME = 'Rappi-Clon-Web';
const urlsToCache = [
    '/',
    '/index.php',
    '/assets/css/style.css',
    '/vendor/fontawesome-free/css/all.min.css',
    '/css/sb-admin-2.min.css',
    '/vendor/jquery/jquery.min.js',
    '/vendor/bootstrap/js/bootstrap.bundle.min.js',
    '/js/sb-admin-2.min.js',
    '/assets/css/carousel.css',
    '/js/carousel.js',
    '/assets/img/logo1.png',
    'https://kit.fontawesome.com/f95b83b698.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i',
    'https://cdn.jsdelivr.net/npm/swiper-budle.min.css',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
            })
        .catch(err => console.log('Fallo registro de chache',err))
    )
})

self.addEventListener('activate',e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
            .then(cachesNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexof(cacheName) === -1) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res
                }
                return fetch(e.request)
            })
    )
})
