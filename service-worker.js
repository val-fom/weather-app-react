"use strict";var precacheConfig=[["/weather-app-react/index.html","1d63312d3841b774a63f614ffd4d8385"],["/weather-app-react/static/css/main.0ebb4440.css","353be8b3525bdb0e7a2abf159c5dc68d"],["/weather-app-react/static/js/main.72411e14.js","928689ebf7ef46f732e6ab20d663a277"],["/weather-app-react/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/weather-app-react/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/weather-app-react/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/weather-app-react/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/weather-app-react/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/weather-app-react/static/media/octicons.190e7257.svg","190e72572ee84190f4777765fa49fc47"],["/weather-app-react/static/media/octicons.d038ccbc.eot","d038ccbc4a99be24f33a54b482b2422e"],["/weather-app-react/static/media/octicons.de59a972.woff2","de59a97248b44599e6747a27a943f738"],["/weather-app-react/static/media/octicons.e0d4a324.ttf","e0d4a324833e13be7d4fa762146d0a71"],["/weather-app-react/static/media/octicons.ee5b1bee.woff","ee5b1bee959a95bd43b223ec901d098a"],["/weather-app-react/static/media/owmLogo.9681fe09.svg","9681fe09ea9978f45fe64b6ca42afeee"],["/weather-app-react/static/media/react-logo.5d5d9eef.svg","5d5d9eefa31e5e13a6610d9fa7a283bb"],["/weather-app-react/static/media/weathericons-regular-webfont.1cd48d78.woff2","1cd48d78f06d33973d9d761d426e69bf"],["/weather-app-react/static/media/weathericons-regular-webfont.4618f0de.ttf","4618f0de2a818e7ad3fe880e0b74d04a"],["/weather-app-react/static/media/weathericons-regular-webfont.4b658767.eot","4b658767da6bd92ce2addb3ce512784d"],["/weather-app-react/static/media/weathericons-regular-webfont.8cac70eb.woff","8cac70ebda3f23ce472110d9f21e8593"],["/weather-app-react/static/media/weathericons-regular-webfont.ecaf8b48.svg","ecaf8b481729b18f6a8494d9f691cdae"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),n=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(r){return setOfCachedUrls(r).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return r.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),r="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,r),e=urlsToCacheKeys.has(a));var n="/weather-app-react/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});