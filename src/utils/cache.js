/*
 * @Author: <yunshu>.
 * @Description: The localStorage and sessionStorage storage functions are provided
 *               to support object-type data storage.
 */

const CacheType = {
  Local: 'local',
  Session: 'session'
}

class Cache {
  constructor(type) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key, value) {
    if (value != null && value !== '') {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
