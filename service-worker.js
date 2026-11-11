const STATIC_CACHE = "irish-weather-static-v1";
const WEATHER_CACHE = "irish-weather-data-v1";

const staticFiles = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./IMAGES/sunny.png",
  "./IMAGES/mainlyclear.png",
  "./IMAGES/partlycloudy.png",
  "./IMAGES/cloudy.png",
  "./IMAGES/drizzle.png",
  "./IMAGES/rainy.png",
  "./IMAGES/snowy.png",
  "./IMAGES/thunderstorm.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(staticFiles)),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  const currentCaches = [STATIC_CACHE, WEATHER_CACHE];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !currentCaches.includes(name))
            .map((name) => caches.delete(name)),
        ),
      ),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  // Use the network first for weather data.
  // Use the last response if the device is offline.
  if (requestUrl.hostname === "api.open-meteo.com") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();

          caches.open(WEATHER_CACHE).then((cache) => cache.put(request, copy));

          return response;
        })
        .catch(() => caches.match(request)),
    );

    return;
  }

  // Return index.html when navigating offline.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("./index.html")));

    return;
  }

  // Use cached local files first.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request);
    }),
  );
});
