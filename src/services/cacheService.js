// services/cacheService.js
class CacheService {
  constructor() {
    this.cache = {};
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  }

  get(key) {
    try {
      const stored = localStorage.getItem(`cache_${key}`);
      if (stored) {
        const { data, timestamp } = JSON.parse(stored);
        if (Date.now() - timestamp < this.CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      // Ignore
    }
    return null;
  }

  set(key, data) {
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (e) {
      // Ignore
    }
  }

  clear(key) {
    if (key) {
      localStorage.removeItem(`cache_${key}`);
    }
  }
}

export const cacheService = new CacheService();