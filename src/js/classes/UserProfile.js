import { Storage } from './Storage.js';

export class UserProfile {
  #data;

  constructor() {
    this.#data = Storage.get('profile', {
      name: '',
      gender: 'female',
      age: 25,
      height: 165,
      weight: 60,
      goal: 'maintain', // lose | maintain | gain
      activity: 'moderate', // sedentary | light | moderate | active | very_active
    });
  }

  /** геттеры */
  get name() { return this.#data.name; }
  get gender() { return this.#data.gender; }
  get age() { return this.#data.age; }
  get height() { return this.#data.height; }
  get weight() { return this.#data.weight; }
  get goal() { return this.#data.goal; }
  get activity() { return this.#data.activity; }
  get data() { return { ...this.#data }; }

  /**
   * обновление профиля
   * @param {Object} updates
   */
  update(updates) {
    this.#data = { ...this.#data, ...updates };
    Storage.set('profile', this.#data);
  }

  /**
   * BMR по формуле Миффлина–Сан Жеора
   * наиболее точная формула для  людей
   * мужчины: 10×вес + 6.25×рост - 5×возраст + 5
   * женщины: 10×вес + 6.25×рост - 5×возраст - 161
   * @returns {number} ккал/сутки
   */
  calcBMR() {
    const { gender, weight, height, age } = this.#data;
    const base = 10 * weight + 6.25 * height - 5 * age;
    return Math.round(gender === 'male' ? base + 5 : base - 161);
  }

  /**
   * TDEE = BMR × коэффициент активности
   * @returns {number} ккал/сутки
   */
  calcTDEE() {
    const activityFactors = {
      sedentary: 1.2,      // сидячий образ жизни
      light: 1.375,        // лёгкие нагрузки 1-3 дня/нед
      moderate: 1.55,      // умеренные нагрузки 3-5 дней/нед
      active: 1.725,       // высокие нагрузки 6-7 дней/нед
      very_active: 1.9,    // очень высокие нагрузки / физ. работа
    };
    return Math.round(this.calcBMR() * (activityFactors[this.#data.activity] || 1.55));
  }

  /**
   * целевой калораж с учётом цели
   * @returns {number} ккал/сутки
   */
  calcTargetCalories() {
    const tdee = this.calcTDEE();
    const adjustments = { lose: -500, maintain: 0, gain: 300 };
    return tdee + (adjustments[this.#data.goal] || 0);
  }

  /**
   * рекомендуемое соотношение БЖУ в граммах
   * @returns {{ protein: number, fat: number, carbs: number }}
   */
  calcMacros() {
    const target = this.calcTargetCalories();
    return {
      protein: Math.round((target * 0.3) / 4),   // 30% калорий из белка (4 ккал/г)
      fat: Math.round((target * 0.25) / 9),       // 25% калорий из жира (9 ккал/г)
      carbs: Math.round((target * 0.45) / 4),     // 45% калорий из углеводов (4 ккал/г)
    };
  }

  /**
   * ИМТ
   * @returns {{ value: number, category: string }}
   */
  calcBMI() {
    const heightM = this.#data.height / 100;
    const bmi = this.#data.weight / (heightM * heightM);
    const value = Math.round(bmi * 10) / 10;
    let category;
    if (bmi < 18.5) category = 'Недостаточный вес';
    else if (bmi < 25) category = 'Норма';
    else if (bmi < 30) category = 'Избыточный вес';
    else category = 'Ожирение';
    return { value, category };
  }

  /** проверка заполнен ли профиль */
  isComplete() {
    return this.#data.age > 0 && this.#data.height > 0 && this.#data.weight > 0;
  }
}
