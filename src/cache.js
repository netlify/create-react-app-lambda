// cache.js
import { createCache, createResource } from 'react-cache';

export let cache;
function initCache() {
  cache = createCache(initCache);
}
initCache();

export function createFetcher(callback) {
  const resource = createResource(callback);
  return {
    read(...args) {
      return resource.read(cache, ...args);
    }
  };
}
