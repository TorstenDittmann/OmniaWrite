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
    "url": "android-chrome-144x144.png",
    "revision": "47f2d1dbbe480ab4b5a250b5acae9985"
  },
  {
    "url": "android-chrome-192x192.png",
    "revision": "7ada4e3ac7eed399eb37965ba60b6914"
  },
  {
    "url": "android-chrome-256x256.png",
    "revision": "8793e59565755c286a348e5b1a617e86"
  },
  {
    "url": "android-chrome-36x36.png",
    "revision": "1101c55254cc0adf8a735456647757dc"
  },
  {
    "url": "android-chrome-384x384.png",
    "revision": "03bfb37d69079a04ddb2201493e277b8"
  },
  {
    "url": "android-chrome-48x48.png",
    "revision": "2fbdcc2453d77c79061994d4b67b49c9"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "99a9b14eda68923c770a075f30d99963"
  },
  {
    "url": "android-chrome-72x72.png",
    "revision": "f64000f5cc29f2c48bec42a90b6a9162"
  },
  {
    "url": "android-chrome-96x96.png",
    "revision": "8683b5ae95d92d4088218bca443166da"
  },
  {
    "url": "apple-touch-icon-114x114-precomposed.png",
    "revision": "3b883f11e170e180b4ced341cef3feb7"
  },
  {
    "url": "apple-touch-icon-114x114.png",
    "revision": "d34a5a7181b58adc22e8189fb1e8961e"
  },
  {
    "url": "apple-touch-icon-120x120-precomposed.png",
    "revision": "01236430e92cafede807582a59535a96"
  },
  {
    "url": "apple-touch-icon-120x120.png",
    "revision": "e3c4e1dbd3fb2d22dda287b9b2badcb2"
  },
  {
    "url": "apple-touch-icon-144x144-precomposed.png",
    "revision": "816a1019576495b68b0e0cce2a570a9a"
  },
  {
    "url": "apple-touch-icon-144x144.png",
    "revision": "5d87ce1d833c9f8ab4d070434b1cef24"
  },
  {
    "url": "apple-touch-icon-152x152-precomposed.png",
    "revision": "a279e7e1226e948f9e610b517ef98ac1"
  },
  {
    "url": "apple-touch-icon-152x152.png",
    "revision": "1bd27132f45b5a0902af4c80cbcc1617"
  },
  {
    "url": "apple-touch-icon-180x180-precomposed.png",
    "revision": "1dcda274fe0eb169f6a062d43368293f"
  },
  {
    "url": "apple-touch-icon-180x180.png",
    "revision": "af0844262626a0bc15b91ba27acd067c"
  },
  {
    "url": "apple-touch-icon-57x57-precomposed.png",
    "revision": "890ebca0dd18591006b33c3c28d3a55c"
  },
  {
    "url": "apple-touch-icon-57x57.png",
    "revision": "baa3440223f7f8c45d8232a804c2f5a8"
  },
  {
    "url": "apple-touch-icon-60x60-precomposed.png",
    "revision": "b96bc5edc17b59cb2ed395abdb15178e"
  },
  {
    "url": "apple-touch-icon-60x60.png",
    "revision": "4870b7dc28cf1c7cfde1316e7ccc1037"
  },
  {
    "url": "apple-touch-icon-72x72-precomposed.png",
    "revision": "218406abfd2c81b2cd0dc68f88e23272"
  },
  {
    "url": "apple-touch-icon-72x72.png",
    "revision": "a1bdd40cb91d6719a9055a7de58ace4b"
  },
  {
    "url": "apple-touch-icon-76x76-precomposed.png",
    "revision": "311c42cf83722093c5b161cfe0adaf27"
  },
  {
    "url": "apple-touch-icon-76x76.png",
    "revision": "0811141eb6b6dd4b736b591fb9d61b24"
  },
  {
    "url": "apple-touch-icon-precomposed.png",
    "revision": "1dcda274fe0eb169f6a062d43368293f"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "af0844262626a0bc15b91ba27acd067c"
  },
  {
    "url": "browserconfig.xml",
    "revision": "64073a249ee7f968ac3a7f558035420e"
  },
  {
    "url": "bundle.css",
    "revision": "ba2ed6719616891940d562e66fdc3a91"
  },
  {
    "url": "bundle.js",
    "revision": "2ad80c8306fb908c956f2664c4ba4ee0"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "5e180e458429150926244954c905c8aa"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "d9e6e4dc59b63b80825c07f7d548669d"
  },
  {
    "url": "favicon.ico",
    "revision": "79b72bd3301b53d97fb4b3d848d3d7ce"
  },
  {
    "url": "fonts.css",
    "revision": "0461b42711fbff0b11b1f9d71ff8f546"
  },
  {
    "url": "fonts/IBMPlexMono-Bold.woff",
    "revision": "fd219e375bc4dfaeb3e6278ed5de140c"
  },
  {
    "url": "fonts/IBMPlexMono-BoldItalic.woff",
    "revision": "9e6027474c89a5cd14f6dd4598691c8f"
  },
  {
    "url": "fonts/IBMPlexMono-ExtraLight.woff",
    "revision": "579359697b903abff7ac68d28caae872"
  },
  {
    "url": "fonts/IBMPlexMono-ExtraLightItalic.woff",
    "revision": "47499fe09c494169ca94a898f89e86a0"
  },
  {
    "url": "fonts/IBMPlexMono-Italic.woff",
    "revision": "f5161fb88e9d14c7c72fa025c6a36877"
  },
  {
    "url": "fonts/IBMPlexMono-Light.woff",
    "revision": "b6c98c69ec8acbcb18c319a44246078a"
  },
  {
    "url": "fonts/IBMPlexMono-LightItalic.woff",
    "revision": "4db1efd1024c7f69b837cdd528ffe550"
  },
  {
    "url": "fonts/IBMPlexMono-Medium.woff",
    "revision": "4423f353b3264325690dc5d56b3f0890"
  },
  {
    "url": "fonts/IBMPlexMono-MediumItalic.woff",
    "revision": "a820d09866832b0b8841e69ab8b36dc2"
  },
  {
    "url": "fonts/IBMPlexMono-SemiBold.woff",
    "revision": "4ee524c6af5c6a2c2730618af4d2efd3"
  },
  {
    "url": "fonts/IBMPlexMono-SemiBoldItalic.woff",
    "revision": "08aaf99972f498a8e3285875da6f80f6"
  },
  {
    "url": "fonts/IBMPlexMono-Thin.woff",
    "revision": "803d6ebb5464fff6a53ad7e542bd8748"
  },
  {
    "url": "fonts/IBMPlexMono-ThinItalic.woff",
    "revision": "366f5cade731dabf7244854f610a0c35"
  },
  {
    "url": "fonts/IBMPlexMono.woff",
    "revision": "0acee24a6f1e4dbcf11d93eaf4c148fd"
  },
  {
    "url": "fonts/IBMPlexSans-Bold.woff",
    "revision": "9751db60c44eb2c04cfd74247158fb6e"
  },
  {
    "url": "fonts/IBMPlexSans-BoldItalic.woff",
    "revision": "b71f244c1588c8f3df3f942f109d1fb9"
  },
  {
    "url": "fonts/IBMPlexSans-ExtraLight.woff",
    "revision": "4a96d0ee73d4ffcc367928517b9a843f"
  },
  {
    "url": "fonts/IBMPlexSans-ExtraLightItalic.woff",
    "revision": "2b93252d63976e422fd52bc79ba52e64"
  },
  {
    "url": "fonts/IBMPlexSans-Italic.woff",
    "revision": "96f5bcf3ba42601f306c661d8a1d0649"
  },
  {
    "url": "fonts/IBMPlexSans-Light.woff",
    "revision": "f965a03bd2a13cb115d20535893385b1"
  },
  {
    "url": "fonts/IBMPlexSans-LightItalic.woff",
    "revision": "034d9006d7e752f4527012ada275e280"
  },
  {
    "url": "fonts/IBMPlexSans-Medium.woff",
    "revision": "0c9a67f698fba81c611476d70f18cab1"
  },
  {
    "url": "fonts/IBMPlexSans-MediumItalic.woff",
    "revision": "dd40c139152a3d5ccc3bef59c9a577bd"
  },
  {
    "url": "fonts/IBMPlexSans-SemiBold.woff",
    "revision": "b65ff291040b6e0f6c7f91386691c687"
  },
  {
    "url": "fonts/IBMPlexSans-SemiBoldItalic.woff",
    "revision": "c8edd37a2bbda01b4b352e14370b2caf"
  },
  {
    "url": "fonts/IBMPlexSans-Thin.woff",
    "revision": "79697221cb8dce9c870fd1eb6200da00"
  },
  {
    "url": "fonts/IBMPlexSans-ThinItalic.woff",
    "revision": "75f79fdc457a944ffb6339de937c4366"
  },
  {
    "url": "fonts/IBMPlexSans.woff",
    "revision": "98aa68eec15a2b99684bdac05b3a4172"
  },
  {
    "url": "fonts/Linearicons-Free.eot",
    "revision": "b9b7f23cb61b1f503e1249b63d980448"
  },
  {
    "url": "fonts/Linearicons-Free.svg",
    "revision": "2781bf543c08d394dc78dec86989e3fd"
  },
  {
    "url": "fonts/Linearicons-Free.ttf",
    "revision": "2f3e9f80fff7d699dd3de6904d7d1647"
  },
  {
    "url": "fonts/Linearicons-Free.woff",
    "revision": "65060723fe964f85afa0a82d0bb78cf9"
  },
  {
    "url": "icons.css",
    "revision": "aa4cd95fc370b1cc4247fec9e0f946eb"
  },
  {
    "url": "index.html",
    "revision": "4525785600436a5040b9a90a617d8bb6"
  },
  {
    "url": "logo.png",
    "revision": "1160960953ad3534d008007cfc432089"
  },
  {
    "url": "logo.svg",
    "revision": "d8a5c97c82ae7565d4104174ec68c746"
  },
  {
    "url": "main.css",
    "revision": "dcf4514e807b4957e838c042db072308"
  },
  {
    "url": "main.scss",
    "revision": "1a074bd368a817bdec48ef1a22340be6"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "22c439ffcf78f2bbdfe60f20a84e7899"
  },
  {
    "url": "mstile-310x150.png",
    "revision": "c1e87c056020a78257f37bd23c019332"
  },
  {
    "url": "mstile-310x310.png",
    "revision": "846b1a176f5236cff88add9bf75fa874"
  },
  {
    "url": "mstile-70x70.png",
    "revision": "1160960953ad3534d008007cfc432089"
  },
  {
    "url": "normalize.css",
    "revision": "0f78a9915a720c4f7c901b5385f5d92d"
  },
  {
    "url": "OmniaWrite.webmanifest",
    "revision": "3ca4e03dd2e40eec6072bc5205c48380"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "e89a707a188318541844007a35d15b37"
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
  },
  {
    "url": "templates/moby-dick/META-INF/container.xml",
    "revision": "50bf42c3a6bd3e738f9706a5b5808f22"
  },
  {
    "url": "templates/moby-dick/OPS/chapter.xhtml",
    "revision": "6cead7d97355892401e3caada04339b8"
  },
  {
    "url": "templates/moby-dick/OPS/cover.xhtml",
    "revision": "55cc8ed83129294e05de198e8d02c94f"
  },
  {
    "url": "templates/moby-dick/OPS/css/stylesheet.css",
    "revision": "261f74c9a3115c386c0faa4bbeb45223"
  },
  {
    "url": "templates/moby-dick/OPS/fonts/STIXGeneral.otf",
    "revision": "835ce0460528ddc3033c38b2e1fd39ee"
  },
  {
    "url": "templates/moby-dick/OPS/fonts/STIXGeneralBol.otf",
    "revision": "d8f4c934d5ff2ceb981faf7ce5876edc"
  },
  {
    "url": "templates/moby-dick/OPS/fonts/STIXGeneralBolIta.otf",
    "revision": "3f91a2ad10061ed311afdf290c8e8dfc"
  },
  {
    "url": "templates/moby-dick/OPS/fonts/STIXGeneralItalic.otf",
    "revision": "8e231c2b5e95b8d468acef5e19a6817c"
  },
  {
    "url": "templates/moby-dick/OPS/package.opf",
    "revision": "5dcd5800aa3556b923b51d3fe7ebc5be"
  },
  {
    "url": "templates/moby-dick/OPS/titlepage.xhtml",
    "revision": "bda2b4627ab6f92aea93ef36ea9c7078"
  },
  {
    "url": "templates/moby-dick/OPS/toc-short.xhtml",
    "revision": "d71d51afa3892c96111d7840cd44f5f7"
  },
  {
    "url": "templates/moby-dick/OPS/toc.xhtml",
    "revision": "af6381c1ceafc79efbc55bebdd8e47a2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
