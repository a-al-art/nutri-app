export class FoodAPI {
  static #BASE_URL = 'https://world.openfoodfacts.org';
  static #SEARCH_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

  /**
   * поиск продуктов по названию.
   * возвращает нормализованный массив продуктов.
   * @param {string} query - поисковый запрос
   * @param {number} page - страница результатов (по умолчанию 1)
   * @returns {Promise<Array>}
   */
  static #cache = new Map();
  static async search(query, page = 1, signal, retry = 1) {
    const cacheKey = `${query}_${page}`;
    if (this.#cache.has(cacheKey)) {
      return this.#cache.get(cacheKey);
    }

    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 7000);
    signal?.addEventListener('abort', () => timeoutController.abort());

    const params = new URLSearchParams({
      search_terms: query,
      search_simple: 1,
      action: 'process',
      json: 1,
      page,
      page_size: 20,
      fields: 'id,product_name,brands,nutriments,image_small_url,categories_tags,quantity',
    });



    try {
    const response = await fetch(
      `${this.#SEARCH_URL}?${params}`,
      { signal: timeoutController.signal }
    );

    clearTimeout(timeoutId);

    if (response.status === 503 && retry > 0) {
      await new Promise(r => setTimeout(r, 1000));
      return this.search(query, page, signal, retry - 1);
    }

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const result = (data.products || [])
      .filter(p => p.product_name && p.nutriments?.['energy-kcal_100g'])
      .map(p => this.#normalize(p));

    this.#cache.set(cacheKey, result);

    return result;

  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

  /**
   * получение продукта по штрихкоду (barcode)
   * @param {string} barcode
   * @returns {Promise<Object|null>}
   */
  static async getByBarcode(barcode) {
    const response = await fetch(`${this.#BASE_URL}/api/v0/product/${barcode}.json`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.status !== 1 || !data.product) return null;
    return this.#normalize(data.product);
  }

  /**
   * нормализация данных продукта из API в единый формат приложения
   * @param {Object} product - сырой объект из API
   * @returns {Object}
   */
  static #normalize(product) {
    const n = product.nutriments || {};

    // ккалории на 100г (пробуем разные поля API)
    const kcal = Math.round(
      n['energy-kcal_100g'] ||
      n['energy-kcal'] ||
      (n['energy_100g'] ? n['energy_100g'] / 4.184 : 0)
    );

    return {
      id: product.id || product.code || String(Math.random()),
      name: product.product_name?.trim() || 'Без названия',
      brand: product.brands?.split(',')[0]?.trim() || '',
      calories: kcal,
      protein: Math.round((n['proteins_100g'] || 0) * 10) / 10,
      fat: Math.round((n['fat_100g'] || 0) * 10) / 10,
      carbs: Math.round((n['carbohydrates_100g'] || 0) * 10) / 10,
      fiber: Math.round((n['fiber_100g'] || 0) * 10) / 10,
      image: product.image_small_url || null,
      quantity: product.quantity || '100г',
      emoji: this.#getEmoji(product.categories_tags || []),
    };
  }

  /**
   * подбор эмодзи по категории продукта
   * @param {Array<string>} categories
   * @returns {string}
   */
  static #getEmoji(categories) {
    const map = {
      'meat': '🥩', 'chicken': '🍗', 'fish': '🐟', 'seafood': '🦐',
      'dairy': '🥛', 'cheese': '🧀', 'egg': '🥚',
      'bread': '🍞', 'cereal': '🌾', 'pasta': '🍝', 'rice': '🍚',
      'vegetable': '🥦', 'fruit': '🍎', 'berry': '🍓',
      'nut': '🥜', 'oil': '🫙', 'sauce': '🥫',
      'sweet': '🍫', 'chocolate': '🍫', 'cake': '🎂', 'candy': '🍬',
      'drink': '🥤', 'juice': '🧃', 'water': '💧', 'coffee': '☕', 'tea': '🍵',
      'snack': '🍿', 'chips': '🥨', 'cookie': '🍪',
      'soup': '🍲', 'salad': '🥗', 'sandwich': '🥪',
    };

    const str = categories.join(' ');
    for (const [key, emoji] of Object.entries(map)) {
      if (str.includes(key)) return emoji;
    }
    return '🥘';
  }
}
