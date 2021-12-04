const staticDevCoffee = "mi-familia"
const assets = [
  "/mi-familia/",
  "index.html",
  "styles.css",
  "script.js",
  "img/cris.png",
  "img/felix.png",
  "img/lauri.png",
  "img/luisi.png",
  "img/mari.png",
  "img/ru.png",
  "audio/cris.mp3",
  "audio/felix.mp3",
  "audio/lauri.mp3",
  "audio/luisi.mp3",
  "audio/mari.mp3",
  "audio/ru.mp3",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})