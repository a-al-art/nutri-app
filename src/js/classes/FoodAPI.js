/**
 * стратегия поиска:
 *  русский запрос - локальная база (мгновенно) + Open Food Facts параллельно
 *  английский запрос - только Open Food Facts
 *  OFF недоступен (Россия без VPN) - только локальная база, без ошибки
 */
export class FoodAPI {

  static #OFF_URL = 'https://world.openfoodfacts.org/cgi/search.pl';
  static #cache   = new Map();

  // словарь. русское слово - английский запрос для API
  static #RU_TO_EN = {
    'курин':      'chicken breast',
    'грудка':     'chicken breast',
    'филе':       'chicken fillet',
    'говядин':    'beef',
    'свинин':     'pork',
    'индейк':     'turkey',
    'котлет':     'beef patty',
    'лосос':      'salmon',
    'тунец':      'tuna',
    'треск':      'cod',
    'скумбри':    'mackerel',
    'минтай':     'pollock',
    'сельд':      'herring',
    'креветк':    'shrimp',
    'яйц':        'egg',
    'молок':      'milk',
    'кефир':      'kefir',
    'творог':     'cottage cheese',
    'сметан':     'sour cream',
    'йогурт':     'greek yogurt',
    'сыр':        'cheese',
    'масл':       'butter',
    'гречк':      'buckwheat',
    'рис':        'rice',
    'овсян':      'oatmeal',
    'макарон':    'pasta',
    'спагетт':    'spaghetti',
    'хлеб':       'bread',
    'картофел':   'potato',
    'картошк':    'potato',
    'морков':     'carrot',
    'капуст':     'cabbage',
    'брокколи':   'broccoli',
    'огурец':     'cucumber',
    'огурц':      'cucumber',
    'помидор':    'tomato',
    'перец':      'bell pepper',
    'свёкл':      'beet',
    'кукуруз':    'corn',
    'горошек':    'green peas',
    'яблок':      'apple',
    'банан':      'banana',
    'апельсин':   'orange',
    'виноград':   'grapes',
    'клубник':    'strawberry',
    'черник':     'blueberry',
    'груш':       'pear',
    'персик':     'peach',
    'арбуз':      'watermelon',
    'орех':       'walnut',
    'миндал':     'almond',
    'арахис':     'peanut',
    'семечк':     'sunflower seeds',
    'шоколад':    'dark chocolate',
    'мёд':        'honey',
    'мед':        'honey',
    'сахар':      'sugar',
    'кофе':       'coffee',
    'чай':        'tea',
    'фасол':      'beans',
    'чечевиц':    'lentils',
    'нут':        'chickpeas',
    'перловк':    'barley',
    'пшен':       'millet',
    'рыб':        'fish',
    'мясо':       'meat',
    'фрукт':      'fruit',
    'овощ':       'vegetables',
    'салат':      'salad',
    'суп':        'soup',
  };

  // локальная база-резерв
  static #LOCAL_DB = [
    { name: 'Куриная грудка варёная',   calories: 165, protein: 31.0, fat: 3.6, carbs: 0.0, emoji: '🍗' },
    { name: 'Куриное филе запечённое',  calories: 172, protein: 29.0, fat: 5.0, carbs: 1.0, emoji: '🍗' },
    { name: 'Куриное бедро без кожи',   calories: 185, protein: 25.0, fat: 9.0, carbs: 0.0, emoji: '🍗' },
    { name: 'Говядина варёная',         calories: 254, protein: 26.0, fat: 16.0, carbs: 0.0, emoji: '🥩' },
    { name: 'Свинина варёная',          calories: 294, protein: 25.0, fat: 21.0, carbs: 0.0, emoji: '🥩' },
    { name: 'Индейка варёная',          calories: 189, protein: 29.0, fat: 7.4, carbs: 0.0, emoji: '🍗' },
    { name: 'Котлета домашняя',         calories: 235, protein: 18.0, fat: 16.0, carbs: 6.0, emoji: '🥩' },
    { name: 'Лосось запечённый',        calories: 208, protein: 28.0, fat: 10.0, carbs: 0.0, emoji: '🐟' },
    { name: 'Тунец консервированный',   calories: 116, protein: 26.0, fat: 1.0, carbs: 0.0, emoji: '🐟' },
    { name: 'Треска варёная',           calories: 105, protein: 23.0, fat: 0.9, carbs: 0.0, emoji: '🐟' },
    { name: 'Скумбрия запечённая',      calories: 239, protein: 20.0, fat: 17.0, carbs: 0.0, emoji: '🐟' },
    { name: 'Сельдь солёная',           calories: 217, protein: 17.0, fat: 16.0, carbs: 0.0, emoji: '🐟' },
    { name: 'Минтай варёный',           calories: 79,  protein: 17.0, fat: 0.9, carbs: 0.0, emoji: '🐟' },
    { name: 'Креветки варёные',         calories: 99,  protein: 24.0, fat: 0.3, carbs: 0.0, emoji: '🦐' },
    { name: 'Яйцо куриное варёное',     calories: 155, protein: 13.0, fat: 11.0, carbs: 1.1, emoji: '🥚' },
    { name: 'Яйцо куриное жареное',     calories: 196, protein: 14.0, fat: 15.0, carbs: 0.4, emoji: '🥚' },
    { name: 'Молоко 2,5%',             calories: 52,  protein: 2.8, fat: 2.5, carbs: 4.7, emoji: '🥛' },
    { name: 'Молоко 3,2%',             calories: 60,  protein: 2.8, fat: 3.2, carbs: 4.7, emoji: '🥛' },
    { name: 'Кефир 2,5%',              calories: 53,  protein: 2.9, fat: 2.5, carbs: 3.9, emoji: '🥛' },
    { name: 'Творог 0%',               calories: 71,  protein: 18.0, fat: 0.6, carbs: 1.8, emoji: '🧀' },
    { name: 'Творог 5%',               calories: 121, protein: 17.0, fat: 5.0, carbs: 2.7, emoji: '🧀' },
    { name: 'Творог 9%',               calories: 159, protein: 16.0, fat: 9.0, carbs: 2.0, emoji: '🧀' },
    { name: 'Сметана 15%',             calories: 158, protein: 2.6, fat: 15.0, carbs: 3.0, emoji: '🥛' },
    { name: 'Сметана 20%',             calories: 204, protein: 2.5, fat: 20.0, carbs: 3.0, emoji: '🥛' },
    { name: 'Сыр российский',           calories: 364, protein: 23.0, fat: 30.0, carbs: 0.0, emoji: '🧀' },
    { name: 'Сыр моцарелла',           calories: 280, protein: 22.0, fat: 22.0, carbs: 2.2, emoji: '🧀' },
    { name: 'Сыр фета',                calories: 264, protein: 14.0, fat: 21.0, carbs: 4.1, emoji: '🧀' },
    { name: 'Йогурт греческий 2%',     calories: 73,  protein: 8.0, fat: 2.0, carbs: 3.5, emoji: '🥛' },
    { name: 'Йогурт натуральный',      calories: 68,  protein: 5.0, fat: 3.2, carbs: 3.5, emoji: '🥛' },
    { name: 'Масло сливочное',         calories: 748, protein: 0.5, fat: 82.0, carbs: 0.8, emoji: '🧈' },
    { name: 'Масло растительное',      calories: 884, protein: 0.0, fat: 100.0, carbs: 0.0, emoji: '🫙' },
    { name: 'Масло оливковое',         calories: 884, protein: 0.0, fat: 100.0, carbs: 0.0, emoji: '🫙' },
    { name: 'Гречка варёная',          calories: 92,  protein: 3.4, fat: 0.6, carbs: 19.0, emoji: '🌾' },
    { name: 'Гречка сухая',            calories: 343, protein: 13.0, fat: 3.4, carbs: 68.0, emoji: '🌾' },
    { name: 'Рис варёный',             calories: 130, protein: 2.7, fat: 0.3, carbs: 28.0, emoji: '🍚' },
    { name: 'Рис сухой',               calories: 360, protein: 6.7, fat: 0.7, carbs: 78.0, emoji: '🍚' },
    { name: 'Овсянка варёная',         calories: 88,  protein: 3.2, fat: 1.7, carbs: 15.0, emoji: '🌾' },
    { name: 'Овсяные хлопья сухие',   calories: 366, protein: 13.0, fat: 6.9, carbs: 66.0, emoji: '🌾' },
    { name: 'Перловка варёная',        calories: 123, protein: 2.3, fat: 0.4, carbs: 28.0, emoji: '🌾' },
    { name: 'Пшено варёное',           calories: 119, protein: 3.5, fat: 1.1, carbs: 23.0, emoji: '🌾' },
    { name: 'Макароны варёные',        calories: 158, protein: 5.5, fat: 0.9, carbs: 31.0, emoji: '🍝' },
    { name: 'Макароны сухие',          calories: 338, protein: 12.0, fat: 1.8, carbs: 68.0, emoji: '🍝' },
    { name: 'Хлеб белый',              calories: 265, protein: 7.7, fat: 3.2, carbs: 51.0, emoji: '🍞' },
    { name: 'Хлеб ржаной',             calories: 259, protein: 6.8, fat: 3.3, carbs: 49.0, emoji: '🍞' },
    { name: 'Хлебцы рисовые',          calories: 384, protein: 8.0, fat: 2.8, carbs: 83.0, emoji: '🍞' },
    { name: 'Картофель варёный',       calories: 87,  protein: 2.0, fat: 0.4, carbs: 19.0, emoji: '🥔' },
    { name: 'Картофель запечённый',    calories: 93,  protein: 2.5, fat: 0.1, carbs: 21.0, emoji: '🥔' },
    { name: 'Морковь сырая',           calories: 41,  protein: 0.9, fat: 0.2, carbs: 10.0, emoji: '🥕' },
    { name: 'Морковь варёная',         calories: 35,  protein: 0.8, fat: 0.2, carbs: 8.2, emoji: '🥕' },
    { name: 'Капуста белокочанная',    calories: 27,  protein: 1.8, fat: 0.1, carbs: 5.4, emoji: '🥦' },
    { name: 'Брокколи варёная',        calories: 35,  protein: 2.4, fat: 0.4, carbs: 7.2, emoji: '🥦' },
    { name: 'Огурец свежий',           calories: 15,  protein: 0.7, fat: 0.1, carbs: 3.1, emoji: '🥒' },
    { name: 'Помидор свежий',          calories: 20,  protein: 0.9, fat: 0.2, carbs: 3.9, emoji: '🍅' },
    { name: 'Перец болгарский',        calories: 31,  protein: 1.0, fat: 0.3, carbs: 6.7, emoji: '🫑' },
    { name: 'Свёкла варёная',          calories: 49,  protein: 1.9, fat: 0.2, carbs: 10.0, emoji: '🥬' },
    { name: 'Кукуруза варёная',        calories: 123, protein: 4.1, fat: 1.5, carbs: 25.0, emoji: '🌽' },
    { name: 'Горошек зелёный',         calories: 73,  protein: 5.4, fat: 0.4, carbs: 12.0, emoji: '🫛' },
    { name: 'Яблоко',                  calories: 52,  protein: 0.3, fat: 0.2, carbs: 14.0, emoji: '🍎' },
    { name: 'Банан',                   calories: 89,  protein: 1.1, fat: 0.3, carbs: 23.0, emoji: '🍌' },
    { name: 'Апельсин',                calories: 47,  protein: 0.9, fat: 0.1, carbs: 12.0, emoji: '🍊' },
    { name: 'Виноград',                calories: 69,  protein: 0.6, fat: 0.2, carbs: 18.0, emoji: '🍇' },
    { name: 'Клубника',                calories: 32,  protein: 0.7, fat: 0.3, carbs: 7.7, emoji: '🍓' },
    { name: 'Черника',                 calories: 57,  protein: 0.7, fat: 0.3, carbs: 14.0, emoji: '🫐' },
    { name: 'Груша',                   calories: 57,  protein: 0.4, fat: 0.1, carbs: 15.0, emoji: '🍐' },
    { name: 'Персик',                  calories: 39,  protein: 0.9, fat: 0.3, carbs: 9.5, emoji: '🍑' },
    { name: 'Арбуз',                   calories: 30,  protein: 0.6, fat: 0.2, carbs: 7.6, emoji: '🍉' },
    { name: 'Грецкий орех',            calories: 654, protein: 15.0, fat: 65.0, carbs: 14.0, emoji: '🥜' },
    { name: 'Миндаль',                 calories: 576, protein: 21.0, fat: 49.0, carbs: 22.0, emoji: '🥜' },
    { name: 'Арахис',                  calories: 567, protein: 26.0, fat: 49.0, carbs: 16.0, emoji: '🥜' },
    { name: 'Семечки подсолнуха',      calories: 584, protein: 21.0, fat: 51.0, carbs: 20.0, emoji: '🌻' },
    { name: 'Шоколад тёмный',          calories: 598, protein: 7.8, fat: 43.0, carbs: 46.0, emoji: '🍫' },
    { name: 'Шоколад молочный',        calories: 535, protein: 6.9, fat: 30.0, carbs: 60.0, emoji: '🍫' },
    { name: 'Мёд',                     calories: 304, protein: 0.3, fat: 0.0, carbs: 82.0, emoji: '🍯' },
    { name: 'Сахар',                   calories: 387, protein: 0.0, fat: 0.0, carbs: 100.0, emoji: '🧂' },
    { name: 'Майонез',                 calories: 680, protein: 2.8, fat: 74.0, carbs: 2.6, emoji: '🥫' },
    { name: 'Фасоль варёная',          calories: 127, protein: 9.0, fat: 0.5, carbs: 23.0, emoji: '🫘' },
    { name: 'Чечевица варёная',        calories: 116, protein: 9.0, fat: 0.4, carbs: 20.0, emoji: '🫘' },
    { name: 'Нут варёный',             calories: 164, protein: 9.0, fat: 2.6, carbs: 27.0, emoji: '🫘' },
    { name: 'Кофе чёрный',             calories: 2,   protein: 0.3, fat: 0.0, carbs: 0.0, emoji: '☕' },
    { name: 'Чай зелёный',             calories: 1,   protein: 0.0, fat: 0.0, carbs: 0.0, emoji: '🍵' },
  ];

  /**
   * главный метод поиска
   * если запрос русский - ищем в локальной базе + пробуем API с переводом
   * если запрос английский - идём сразу в API
   * @param {string} query
   * @param {number} page
   * @param {AbortSignal} signal
   * @returns {Promise<Array>}
   */
  static async search(query, page = 1, signal) {
    const isRussian = /[а-яёА-ЯЁ]/.test(query);

    if (isRussian) {
      // мгновенно показываем локальные результаты
      const localResults = this.#searchLocal(query);

      // параллельно пробуем Open Food Facts
      try {
        const offResults = await this.#searchOFF(query, signal);
        return this.#merge(localResults, offResults);
      } catch (e) {
        if (e.name === 'AbortError') throw e;
        // OFF недоступен - возвращаем только локальные
        return localResults;
      }
    }

    // английский запрос - только Open Food Facts
    return this.#searchOFF(query, signal);
  }

    /**
   * Запрос к Open Food Facts
   */
  static async #searchOFF(query, signal, retry = 1) {
    const cacheKey = `off_${query.toLowerCase().trim()}`;
    if (this.#cache.has(cacheKey)) return this.#cache.get(cacheKey);

    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 8000);
    signal?.addEventListener('abort', () => timeoutController.abort());

    const params = new URLSearchParams({
      search_terms:  query,
      search_simple: 1,
      action:        'process',
      json:          1,
      page_size:     20,
      fields:        'id,product_name,brands,nutriments,categories_tags,quantity',
    });

    try {
      const response = await fetch(
        `${this.#OFF_URL}?${params}`,
        { signal: timeoutController.signal }
      );
      clearTimeout(timeoutId);

      if (response.status === 503 && retry > 0) {
        await new Promise(r => setTimeout(r, 1000));
        return this.#searchOFF(query, signal, retry - 1);
      }

      if (!response.ok) throw new Error(`OFF error: ${response.status}`);

      const data = await response.json();
      const result = (data.products || [])
        .filter(p => p.product_name && p.nutriments?.['energy-kcal_100g'])
        .map((p, i) => this.#normalizeOFF(p, i));

      this.#cache.set(cacheKey, result);
      return result;

    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Нормализация продукта из Open Food Facts
   */
  static #normalizeOFF(p, i) {
    const n = p.nutriments || {};
    const kcal = Math.round(
      n['energy-kcal_100g'] ||
      n['energy-kcal'] ||
      (n['energy_100g'] ? n['energy_100g'] / 4.184 : 0)
    );
    return {
      id:      `off_${i}_${p.id || p.code}`,
      name:    p.product_name?.trim() || 'Без названия',
      brand:   p.brands?.split(',')[0]?.trim() || 'Open Food Facts',
      calories: kcal,
      protein: Math.round((n['proteins_100g']       || 0) * 10) / 10,
      fat:     Math.round((n['fat_100g']             || 0) * 10) / 10,
      carbs:   Math.round((n['carbohydrates_100g']   || 0) * 10) / 10,
      fiber:   Math.round((n['fiber_100g']           || 0) * 10) / 10,
      image:   null,
      emoji:   this.#getEmoji(p.product_name || ''),
    };
  }

  /**
   * Объединяет локальные результаты и результаты OFF без дублей
   */
  static #merge(local, off) {
    const combined = [...local];
    off.forEach(a => {
      const isDuplicate = combined.some(
        l => Math.abs(l.calories - a.calories) < 5 &&
             Math.abs(l.protein  - a.protein)  < 1
      );
      if (!isDuplicate) combined.push(a);
    });
    return combined.slice(0, 20);
  }
  /**
   * поиск по локальной базе на русском
   * @param {string} query
   * @returns {Array}
   */
  static #searchLocal(query) {
    const q = query.toLowerCase().trim();
    return this.#LOCAL_DB
      .filter(p => p.name.toLowerCase().includes(q))
      .slice(0, 15)
      .map((p, i) => ({
        id: `local_${i}_${p.name}`,
        name: p.name,
        brand: 'на 100 г',
        calories: p.calories,
        protein: p.protein,
        fat: p.fat,
        carbs: p.carbs,
        fiber: p.fiber || 0,
        image: null,
        emoji: p.emoji,
      }));
  }

  /**
   * переводит русский запрос в английский для API
   * @param {string} query
   * @returns {string|null}
   */
  static #translateQuery(query) {
    const q = query.toLowerCase();
    for (const [ru, en] of Object.entries(this.#RU_TO_EN)) {
      if (q.includes(ru)) return en;
    }
    return null;
  }

  /**
   * подбор эмодзи по названию продукта
   * @param {string} name
   * @returns {string}
   */
  static #getEmoji(name) {
    const n = name.toLowerCase();
    const map = [
      [['chicken', 'turkey', 'poultry'],           '🍗'],
      [['beef', 'steak', 'hamburger', 'patty'],    '🥩'],
      [['pork', 'bacon', 'ham'],                   '🥩'],
      [['salmon', 'tuna', 'cod', 'fish', 'tilapia', 'mackerel'], '🐟'],
      [['shrimp', 'prawn', 'lobster'],              '🦐'],
      [['egg'],                                     '🥚'],
      [['milk'],                                    '🥛'],
      [['yogurt', 'kefir'],                         '🥛'],
      [['cheese', 'cottage'],                       '🧀'],
      [['butter'],                                  '🧈'],
      [['bread', 'toast', 'bun', 'bagel'],          '🍞'],
      [['rice'],                                    '🍚'],
      [['pasta', 'spaghetti', 'noodle'],            '🍝'],
      [['oat', 'cereal', 'granola', 'buckwheat'],   '🌾'],
      [['potato'],                                  '🥔'],
      [['carrot'],                                  '🥕'],
      [['tomato'],                                  '🍅'],
      [['cucumber'],                                '🥒'],
      [['broccoli', 'cabbage', 'spinach'],          '🥦'],
      [['apple'],                                   '🍎'],
      [['banana'],                                  '🍌'],
      [['orange'],                                  '🍊'],
      [['grape'],                                   '🍇'],
      [['strawberry'],                              '🍓'],
      [['blueberry'],                               '🫐'],
      [['watermelon'],                              '🍉'],
      [['nut', 'walnut', 'almond', 'peanut'],       '🥜'],
      [['chocolate'],                               '🍫'],
      [['honey'],                                   '🍯'],
      [['coffee'],                                  '☕'],
      [['tea'],                                     '🍵'],
      [['sugar'],                                   '🧂'],
      [['oil', 'olive'],                            '🫙'],
      [['bean', 'lentil', 'chickpea'],              '🫘'],
      [['corn'],                                    '🌽'],
      [['avocado'],                                 '🥑'],
      [['pizza'],                                   '🍕'],
      [['soup'],                                    '🍲'],
      [['salad'],                                   '🥗'],
    ];
    for (const [keys, emoji] of map) {
      if (keys.some(k => n.includes(k))) return emoji;
    }
    return '🥘';
  }
}