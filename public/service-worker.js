/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/android-chrome-144x144.png",
    "revision": "47f2d1dbbe480ab4b5a250b5acae9985"
  },
  {
    "url": "assets/android-chrome-192x192.png",
    "revision": "7ada4e3ac7eed399eb37965ba60b6914"
  },
  {
    "url": "assets/android-chrome-256x256.png",
    "revision": "8793e59565755c286a348e5b1a617e86"
  },
  {
    "url": "assets/android-chrome-36x36.png",
    "revision": "1101c55254cc0adf8a735456647757dc"
  },
  {
    "url": "assets/android-chrome-384x384.png",
    "revision": "03bfb37d69079a04ddb2201493e277b8"
  },
  {
    "url": "assets/android-chrome-48x48.png",
    "revision": "2fbdcc2453d77c79061994d4b67b49c9"
  },
  {
    "url": "assets/android-chrome-512x512.png",
    "revision": "99a9b14eda68923c770a075f30d99963"
  },
  {
    "url": "assets/android-chrome-72x72.png",
    "revision": "f64000f5cc29f2c48bec42a90b6a9162"
  },
  {
    "url": "assets/android-chrome-96x96.png",
    "revision": "8683b5ae95d92d4088218bca443166da"
  },
  {
    "url": "assets/apple-touch-icon-114x114-precomposed.png",
    "revision": "3b883f11e170e180b4ced341cef3feb7"
  },
  {
    "url": "assets/apple-touch-icon-114x114.png",
    "revision": "d34a5a7181b58adc22e8189fb1e8961e"
  },
  {
    "url": "assets/apple-touch-icon-120x120-precomposed.png",
    "revision": "01236430e92cafede807582a59535a96"
  },
  {
    "url": "assets/apple-touch-icon-120x120.png",
    "revision": "e3c4e1dbd3fb2d22dda287b9b2badcb2"
  },
  {
    "url": "assets/apple-touch-icon-144x144-precomposed.png",
    "revision": "816a1019576495b68b0e0cce2a570a9a"
  },
  {
    "url": "assets/apple-touch-icon-144x144.png",
    "revision": "5d87ce1d833c9f8ab4d070434b1cef24"
  },
  {
    "url": "assets/apple-touch-icon-152x152-precomposed.png",
    "revision": "a279e7e1226e948f9e610b517ef98ac1"
  },
  {
    "url": "assets/apple-touch-icon-152x152.png",
    "revision": "1bd27132f45b5a0902af4c80cbcc1617"
  },
  {
    "url": "assets/apple-touch-icon-180x180-precomposed.png",
    "revision": "1dcda274fe0eb169f6a062d43368293f"
  },
  {
    "url": "assets/apple-touch-icon-180x180.png",
    "revision": "af0844262626a0bc15b91ba27acd067c"
  },
  {
    "url": "assets/apple-touch-icon-57x57-precomposed.png",
    "revision": "890ebca0dd18591006b33c3c28d3a55c"
  },
  {
    "url": "assets/apple-touch-icon-57x57.png",
    "revision": "baa3440223f7f8c45d8232a804c2f5a8"
  },
  {
    "url": "assets/apple-touch-icon-60x60-precomposed.png",
    "revision": "b96bc5edc17b59cb2ed395abdb15178e"
  },
  {
    "url": "assets/apple-touch-icon-60x60.png",
    "revision": "4870b7dc28cf1c7cfde1316e7ccc1037"
  },
  {
    "url": "assets/apple-touch-icon-72x72-precomposed.png",
    "revision": "218406abfd2c81b2cd0dc68f88e23272"
  },
  {
    "url": "assets/apple-touch-icon-72x72.png",
    "revision": "a1bdd40cb91d6719a9055a7de58ace4b"
  },
  {
    "url": "assets/apple-touch-icon-76x76-precomposed.png",
    "revision": "311c42cf83722093c5b161cfe0adaf27"
  },
  {
    "url": "assets/apple-touch-icon-76x76.png",
    "revision": "0811141eb6b6dd4b736b591fb9d61b24"
  },
  {
    "url": "assets/apple-touch-icon-precomposed.png",
    "revision": "1dcda274fe0eb169f6a062d43368293f"
  },
  {
    "url": "assets/apple-touch-icon.png",
    "revision": "af0844262626a0bc15b91ba27acd067c"
  },
  {
    "url": "assets/browserconfig.xml",
    "revision": "e82d87974aeeb1ab72b02910c28746eb"
  },
  {
    "url": "assets/css/font/gibson-light-italic-webfont.eot",
    "revision": "ed2f5a01410a280dd0eb04f8c94183b0"
  },
  {
    "url": "assets/css/font/gibson-light-italic-webfont.svg",
    "revision": "ecba531883c1d309a07a19bb4fddd3c5"
  },
  {
    "url": "assets/css/font/gibson-light-italic-webfont.ttf",
    "revision": "fc680c2a8e92a90f7e2705c558274f59"
  },
  {
    "url": "assets/css/font/gibson-light-italic-webfont.woff",
    "revision": "3e7ef565dd96c16ceee0f6c91b8d5263"
  },
  {
    "url": "assets/css/font/gibson-semibold-webfont.eot",
    "revision": "705c7f4b04b8d0de788918b3438e81e4"
  },
  {
    "url": "assets/css/font/gibson-semibold-webfont.svg",
    "revision": "78305b6efbfeb364c48845b0f79bf8c0"
  },
  {
    "url": "assets/css/font/gibson-semibold-webfont.ttf",
    "revision": "f6a239e6faf182f88ba1dd990220e575"
  },
  {
    "url": "assets/css/font/gibson-semibold-webfont.woff",
    "revision": "0f0cbc2ed4ecfd48abcc4c63fb0dac25"
  },
  {
    "url": "assets/css/font/gibson-webfont.eot",
    "revision": "6874cd03d3837c662cdb1305bef2b4b0"
  },
  {
    "url": "assets/css/font/gibson-webfont.svg",
    "revision": "4c80def40d976764420f9c7ba7683f59"
  },
  {
    "url": "assets/css/font/gibson-webfont.ttf",
    "revision": "80eb8c56010bbad5d893f0810f92330a"
  },
  {
    "url": "assets/css/font/gibson-webfont.woff",
    "revision": "b8d1cd786dbfde340099ebf57186ecdd"
  },
  {
    "url": "assets/css/font/mfglabsiconset-webfont.eot",
    "revision": "b0a0976ce87a47700c6e689226e7a411"
  },
  {
    "url": "assets/css/font/mfglabsiconset-webfont.svg",
    "revision": "1dab0eed2834b4940d588c2d96d382e5"
  },
  {
    "url": "assets/css/font/mfglabsiconset-webfont.ttf",
    "revision": "f130ab32e5da85a090f22822ddec64e6"
  },
  {
    "url": "assets/css/font/mfglabsiconset-webfont.woff",
    "revision": "ef329adb46ed36028ac928befa3a17c8"
  },
  {
    "url": "assets/css/main.css",
    "revision": "3acc26008fe438af47e618e31675fc44"
  },
  {
    "url": "assets/css/main.scss",
    "revision": "ec5a297621e4f40085afb94d269fd53e"
  },
  {
    "url": "assets/css/mfglabs_iconset.css",
    "revision": "c3fb908c420b4c66ca7dcab232baf1f3"
  },
  {
    "url": "assets/favicon-16x16.png",
    "revision": "5e180e458429150926244954c905c8aa"
  },
  {
    "url": "assets/favicon-32x32.png",
    "revision": "d9e6e4dc59b63b80825c07f7d548669d"
  },
  {
    "url": "assets/favicon.ico",
    "revision": "be4daf2bb01cbaf5e7bf9044646d66d1"
  },
  {
    "url": "assets/logo.png",
    "revision": "1160960953ad3534d008007cfc432089"
  },
  {
    "url": "assets/mstile-150x150.png",
    "revision": "22c439ffcf78f2bbdfe60f20a84e7899"
  },
  {
    "url": "assets/mstile-310x150.png",
    "revision": "c1e87c056020a78257f37bd23c019332"
  },
  {
    "url": "assets/mstile-310x310.png",
    "revision": "846b1a176f5236cff88add9bf75fa874"
  },
  {
    "url": "assets/mstile-70x70.png",
    "revision": "1160960953ad3534d008007cfc432089"
  },
  {
    "url": "assets/safari-pinned-tab.svg",
    "revision": "e89a707a188318541844007a35d15b37"
  },
  {
    "url": "bundle.css",
    "revision": "6485750e6ca9c078ec677d2653748d73"
  },
  {
    "url": "bundle.js",
    "revision": "c3b1a8fcca6f07bb613e9b9ad7af78c0"
  },
  {
    "url": "favicon.png",
    "revision": "c64beab291de80970aa4887a5a1c9135"
  },
  {
    "url": "global.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "index.html",
    "revision": "4a918a8ca924d4746ccb907bebaf02c1"
  },
  {
    "url": "OmniaWrite.webmanifest",
    "revision": "ce8e8d9d315bbec4d99928434998fb62"
  },
  {
    "url": "sw.js",
    "revision": "f5922b111c2fc1e3208521220dd7c7db"
  },
  {
    "url": "templates/default/EPUB/content.xhtml",
    "revision": "37e4e5ebdd90c1925c0308edbc7ca7ff"
  },
  {
    "url": "templates/default/EPUB/css/epub.css",
    "revision": "60236e83014673d572725cd4504cfafa"
  },
  {
    "url": "templates/default/EPUB/images/cover.png",
    "revision": "618b85b4c8936a83bfee8dad2092770d"
  },
  {
    "url": "templates/default/EPUB/nav.xhtml",
    "revision": "03d80c9ed3336cede81b4a97a51ee957"
  },
  {
    "url": "templates/default/EPUB/package.opf",
    "revision": "0de7d5a5f4c01fc6189a3d820143f544"
  },
  {
    "url": "templates/default/META-INF/container.xml",
    "revision": "a19b1a4dcb899e7c55707fa4250243c6"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
