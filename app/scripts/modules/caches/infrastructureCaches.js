'use strict';

/* jshint newcap: false */
angular.module('deckApp.caches.infrastructure', [
  'deckApp.caches.core',
])
  .factory('infrastructureCaches', function(deckCacheFactory) {

    var caches = Object.create(null);

    var namespace = 'infrastructure';

    function clearCache(key) {
      if (caches[key] && caches[key].destroy) {
        caches[key].destroy();
        createCache(key);
      }
    }

    function clearCaches() {
      Object.keys(caches).forEach(clearCache);
    }

    function createCache(key, config) {
      deckCacheFactory.createCache(namespace, key, config);
      caches[key] = deckCacheFactory.getCache(namespace, key);
    }

    caches.clearCaches = clearCaches;
    caches.clearCache = clearCache;
    caches.createCache = createCache;

    return caches;
  });
