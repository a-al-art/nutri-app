import { Diary } from '../classes/Diary.js';
import { UserProfile } from '../classes/UserProfile.js';
import { Toast } from '../utils/Toast.js';

export class DiaryComponent {
  #currentDate;
  #profile;
  #summaryEl;
  #mealsEl;
  #dateEl;

  constructor(profile) {
    this.#currentDate = Diary.today();
    this.#profile = profile;
    this.#summaryEl = document.getElementById('diarySummary');
    this.#mealsEl = document.getElementById('diaryMeals');
    this.#dateEl = document.getElementById('currentDate');

    this.#bindEvents();
  }

  #toLocalStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  #bindEvents() {
    document.getElementById('prevDay').addEventListener('click', () => {
      const d = new Date(this.#currentDate + 'T00:00:00');
      d.setDate(d.getDate() - 1);
      this.#currentDate = this.#toLocalStr(d);
      this.render();
    });

    document.getElementById('nextDay').addEventListener('click', () => {
      const today = Diary.today();
      if (this.#currentDate >= today) return;
      const d = new Date(this.#currentDate + 'T00:00:00');
      d.setDate(d.getDate() + 1);
      this.#currentDate = this.#toLocalStr(d);
      this.render();
    });
  }

  render() {
    this.#dateEl.textContent = Diary.formatDate(this.#currentDate);
    this.#renderSummary();
    this.#renderMeals();
  }

  #renderSummary() {
    const totals = Diary.getDayTotals(this.#currentDate);
    const target = this.#profile.isComplete()
      ? this.#profile.calcTargetCalories()
      : 2000;
    const pct = Math.min(100, Math.round((totals.calories / target) * 100));
    const remaining = target - totals.calories;

    this.#summaryEl.innerHTML = `
      <div class="diary__summary-row">
        <span class="diary__summary-label">Потреблено калорий</span>
        <span style="font-size:13px;color:var(--color-text-muted)">Цель: ${target} ккал</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:10px">
        <span class="diary__summary-cals">${totals.calories}</span>
        <span style="color:var(--color-text-muted);font-size:14px">из ${target} ккал</span>
      </div>
      <div class="diary__progress-bar">
        <div class="diary__progress-fill" style="width:${pct}%;${pct >= 100 ? 'background:var(--color-danger)' : ''}"></div>
      </div>
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:8px">
        ${remaining >= 0
          ? `Осталось: <strong style="color:var(--color-text)">${remaining} ккал</strong>`
          : `Превышено: <strong style="color:var(--color-danger)">${Math.abs(remaining)} ккал</strong>`
        }
      </div>
      <div class="diary__macros-summary">
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-protein)"></div>
          Б ${totals.protein}г
        </div>
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-fat)"></div>
          Ж ${totals.fat}г
        </div>
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-carbs)"></div>
          У ${totals.carbs}г
        </div>
      </div>
    `;
  }

  #renderMeals() {
    const day = Diary.getDay(this.#currentDate);

    this.#mealsEl.innerHTML = Diary.MEALS.map(meal => {
      const items = day[meal.id] || [];
      const mealCals = items.reduce((sum, e) => sum + e.calories, 0);

      return `
        <div class="diary__meal expanded" id="meal-${meal.id}">
          <div class="diary__meal-header">
            <span class="diary__meal-emoji">${meal.emoji}</span>
            <span class="diary__meal-name">${meal.name}</span>
            <span class="diary__meal-total">${mealCals > 0 ? mealCals + ' ккал' : ''}</span>
            <svg class="diary__meal-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="diary__meal-items">
            ${items.length === 0
              ? `<div class="diary__empty">Нет записей. Добавьте через Поиск →</div>`
              : items.map(entry => `
                <div class="diary__meal-item" data-meal="${meal.id}" data-id="${entry.id}">
                  <span>${entry.emoji || '🥘'}</span>
                  <span class="diary__meal-item-name">${entry.name}</span>
                  <span class="diary__meal-item-amount">${entry.amount}г</span>
                  <span class="diary__meal-item-cals">${entry.calories} кк</span>
                  <button class="diary__meal-item-remove" data-meal="${meal.id}" data-entry-id="${entry.id}" title="Удалить">✕</button>
                </div>
              `).join('')
            }
          </div>
        </div>
      `;
    }).join('');

    // toggle разворачивания приёма пищи
    this.#mealsEl.querySelectorAll('.diary__meal-header').forEach(header => {
      header.addEventListener('click', () => {
        header.closest('.diary__meal').classList.toggle('expanded');
      });
    });

    // удаление записи
    this.#mealsEl.querySelectorAll('.diary__meal-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mealId = btn.dataset.meal;
        const entryId = parseFloat(btn.dataset.entryId);
        Diary.removeEntry(this.#currentDate, mealId, entryId);
        Toast.success('Запись удалена');
        this.render();
      });
    });
  }
}
