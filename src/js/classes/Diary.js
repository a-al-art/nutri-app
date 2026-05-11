import { Storage } from './Storage.js';

export class Diary {
  static MEALS = [
    { id: 'breakfast', name: 'Завтрак', emoji: '🌅' },
    { id: 'lunch', name: 'Обед', emoji: '☀️' },
    { id: 'dinner', name: 'Ужин', emoji: '🌙' },
    { id: 'snack', name: 'Перекус', emoji: '🍎' },
  ];

  static #key(dateStr) {
    return `diary_${dateStr}`;
  }

  static #toLocalDateStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  static today() {
    return this.#toLocalDateStr(new Date());
  }

  static getDay(dateStr) {
    const empty = {};
    this.MEALS.forEach(m => { empty[m.id] = []; });
    return Storage.get(this.#key(dateStr), empty);
  }

  static setDay(dateStr, data) {
    Storage.set(this.#key(dateStr), data);
  }

  static addEntry(dateStr, mealId, product, amount) {
    const day = this.getDay(dateStr);
    const ratio = amount / 100;

    day[mealId].push({
      id: Date.now() + Math.random(),
      productId: product.id,
      name: product.name,
      emoji: product.emoji,
      amount,
      calories: Math.round(product.calories * ratio),
      protein: Math.round(product.protein * ratio * 10) / 10,
      fat: Math.round(product.fat * ratio * 10) / 10,
      carbs: Math.round(product.carbs * ratio * 10) / 10,
    });

    this.setDay(dateStr, day);
  }

  static removeEntry(dateStr, mealId, entryId) {
    const day = this.getDay(dateStr);
    day[mealId] = day[mealId].filter(e => e.id !== entryId);
    this.setDay(dateStr, day);
  }

  static getDayTotals(dateStr) {
    const day = this.getDay(dateStr);
    const totals = { calories: 0, protein: 0, fat: 0, carbs: 0, entries: 0 };

    this.MEALS.forEach(meal => {
      (day[meal.id] || []).forEach(e => {
        totals.calories += e.calories;
        totals.protein += e.protein;
        totals.fat += e.fat;
        totals.carbs += e.carbs;
        totals.entries++;
      });
    });

    totals.protein = Math.round(totals.protein * 10) / 10;
    totals.fat = Math.round(totals.fat * 10) / 10;
    totals.carbs = Math.round(totals.carbs * 10) / 10;

    return totals;
  }

  /**
   * данные за неделю начиная с startDate
   * все операции с датами через локальное время
   */
  static getWeekData(startDate) {
    const result = [];
    // парсим строку как локальную дату
    const start = new Date(startDate + 'T00:00:00');

    for (let i = 0; i < 7; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const dateStr = this.#toLocalDateStr(d);
      result.push({ date: dateStr, totals: this.getDayTotals(dateStr) });
    }

    return result;
  }

  static formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === this.today()) return 'Сегодня';
    if (dateStr === this.#toLocalDateStr(yesterday)) return 'Вчера';

    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });
  }
}
