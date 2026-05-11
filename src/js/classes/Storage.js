export class Storage {
  static #PREFIX = 'nutritrack_';

  /**
   * сохраняет значение по ключу
   * @param {string} key
   * @param {*} value
   */
  static set(key, value) {
    try {
      localStorage.setItem(this.#PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage.set error:', e);
    }
  }

  /**
   * читает значение по ключу
   * @param {string} key
   * @param {*} defaultValue - значение по умолчанию если ключа нет
   * @returns {*}
   */
  static get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(this.#PREFIX + key);
      return raw !== null ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  /**
   * удаляет ключ
   * @param {string} key
   */
  static remove(key) {
    localStorage.removeItem(this.#PREFIX + key);
  }

  /**
   * очищает все данные приложения
   */
  static clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(this.#PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }
}
