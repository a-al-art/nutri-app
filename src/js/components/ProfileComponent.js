import { UserProfile } from '../classes/UserProfile.js';
import { Diary } from '../classes/Diary.js';

export class ProfileComponent {
  #profile;
  #gridEl;
  #macroChart = null;
  #weekChart = null;

  constructor(profile) {
    this.#profile = profile;
    this.#gridEl = document.getElementById('profileGrid');
  }

  render() {
    this.#gridEl.innerHTML = `
      ${this.#renderPersonalCard()}
      ${this.#renderResultsCard()}
      ${this.#renderActivityCard()}
      ${this.#renderStatsCard()}
    `;

    this.#bindFormEvents();

    if (this.#profile.isComplete()) {
      this.#renderMacroChart();
      this.#renderWeekChart();
    }
  }

  #renderPersonalCard() {
    const d = this.#profile.data;
    return `
      <div class="profile__card">
        <div class="profile__card-title">Личные данные</div>
        <div class="profile__form-row">
          <div class="profile__form-group">
            <label class="profile__label">Имя</label>
            <input class="profile__input" id="p-name" type="text" value="${d.name}" placeholder="Ваше имя" />
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Возраст</label>
            <input class="profile__input" id="p-age" type="number" value="${d.age}" min="10" max="120" />
          </div>
        </div>
        <div class="profile__form-row">
          <div class="profile__form-group">
            <label class="profile__label">Рост (см)</label>
            <input class="profile__input" id="p-height" type="number" value="${d.height}" min="100" max="250" />
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Вес (кг)</label>
            <input class="profile__input" id="p-weight" type="number" value="${d.weight}" min="20" max="500" />
          </div>
        </div>
        <div class="profile__form-group">
          <label class="profile__label">Пол</label>
          <div class="radio-group" style="margin-top:4px;flex-direction:row">
            <label class="radio-option ${d.gender === 'female' ? 'selected' : ''}" style="flex:1">
              <input type="radio" name="gender" value="female" ${d.gender === 'female' ? 'checked' : ''} />
              Женский
            </label>
            <label class="radio-option ${d.gender === 'male' ? 'selected' : ''}" style="flex:1">
              <input type="radio" name="gender" value="male" ${d.gender === 'male' ? 'checked' : ''} />
              Мужской
            </label>
          </div>
        </div>
        <button class="btn btn--primary btn--full" id="saveProfileBtn" style="margin-top:16px">
          Сохранить
        </button>
      </div>
    `;
  }

  #renderResultsCard() {
    if (!this.#profile.isComplete()) {
      return `
        <div class="profile__card">
          <div class="profile__card-title">Расчёт нормы</div>
          <div class="empty-state">
            <div class="empty-state__icon">📊</div>
            <div class="empty-state__text">Заполните личные данные</div>
            <div class="empty-state__sub">для расчёта нормы калорий</div>
          </div>
        </div>
      `;
    }

    const bmr = this.#profile.calcBMR();
    const tdee = this.#profile.calcTDEE();
    const target = this.#profile.calcTargetCalories();
    const bmi = this.#profile.calcBMI();
    const macros = this.#profile.calcMacros();

    const goalLabels = { lose: 'Похудение', maintain: 'Поддержание', gain: 'Набор массы' };

    return `
      <div class="profile__card">
        <div class="profile__card-title">Расчёт нормы</div>
        <div class="profile__result">
          <div class="profile__result-grid">
            <div class="profile__result-item">
              <div class="profile__result-value">${bmr}</div>
              <div class="profile__result-label">BMR (ккал/день)</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value">${tdee}</div>
              <div class="profile__result-label">TDEE (ккал/день)</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value" style="color:var(--color-accent-2)">${target}</div>
              <div class="profile__result-label">Цель · ${goalLabels[this.#profile.goal]}</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value" style="font-size:22px">${bmi.value}</div>
              <div class="profile__result-label">ИМТ · ${bmi.category}</div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:8px">Рекомендуемые БЖУ</div>
        <div class="diary__macros-summary" style="margin-top:0">
          <div class="diary__macro-chip">
            <div class="diary__macro-chip-dot" style="background:var(--color-protein)"></div>
            Б ${macros.protein}г
          </div>
          <div class="diary__macro-chip">
            <div class="diary__macro-chip-dot" style="background:var(--color-fat)"></div>
            Ж ${macros.fat}г
          </div>
          <div class="diary__macro-chip">
            <div class="diary__macro-chip-dot" style="background:var(--color-carbs)"></div>
            У ${macros.carbs}г
          </div>
        </div>
        <div class="profile__chart-container">
          <canvas id="macroChart"></canvas>
        </div>
      </div>
    `;
  }

  #renderActivityCard() {
    const d = this.#profile.data;
    const activities = [
      { id: 'sedentary', label: 'Сидячий образ жизни', sub: 'Офисная работа, минимум движения' },
      { id: 'light', label: 'Лёгкая активность', sub: 'Прогулки, 1-3 тренировки в неделю' },
      { id: 'moderate', label: 'Умеренная активность', sub: '3-5 тренировок в неделю' },
      { id: 'active', label: 'Высокая активность', sub: '6-7 интенсивных тренировок' },
      { id: 'very_active', label: 'Очень высокая', sub: 'Физический труд + тренировки' },
    ];

    const goals = [
      { id: 'lose', label: '📉 Похудение', sub: '-500 ккал от TDEE' },
      { id: 'maintain', label: '⚖️ Поддержание', sub: 'Равно TDEE' },
      { id: 'gain', label: '📈 Набор массы', sub: '+300 ккал к TDEE' },
    ];

    return `
      <div class="profile__card">
        <div class="profile__card-title">Активность и цель</div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted);margin-bottom:8px">Уровень активности</div>
        <div class="radio-group" id="activityGroup">
          ${activities.map(a => `
            <label class="radio-option ${d.activity === a.id ? 'selected' : ''}">
              <input type="radio" name="activity" value="${a.id}" ${d.activity === a.id ? 'checked' : ''} />
              <div>
                <div style="font-weight:500;font-size:13px">${a.label}</div>
                <div style="font-size:11px;color:var(--color-text-muted)">${a.sub}</div>
              </div>
            </label>
          `).join('')}
        </div>
        <div class="divider"></div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted);margin-bottom:8px">Цель</div>
        <div class="radio-group" id="goalGroup" style="flex-direction:row;flex-wrap:wrap">
          ${goals.map(g => `
            <label class="radio-option ${d.goal === g.id ? 'selected' : ''}" style="flex:1;min-width:110px">
              <input type="radio" name="goal" value="${g.id}" ${d.goal === g.id ? 'checked' : ''} />
              <div>
                <div style="font-size:13px">${g.label}</div>
                <div style="font-size:11px;color:var(--color-text-muted)">${g.sub}</div>
              </div>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  #renderStatsCard() {
    return `
      <div class="profile__card">
        <div class="profile__card-title">Статистика за неделю</div>
        <div class="profile__chart-container">
          <canvas id="profileWeekChart"></canvas>
        </div>
      </div>
    `;
  }

  #bindFormEvents() {
    // радио-кнопки
    document.querySelectorAll('.radio-option input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        // убираем selected у всех в группе
        radio.closest('.radio-group')?.querySelectorAll('.radio-option').forEach(opt => {
          opt.classList.remove('selected');
        });
        radio.closest('.radio-option').classList.add('selected');

        // сохраняем активность или цель сразу
        if (radio.name === 'activity') {
          this.#profile.update({ activity: radio.value });
        } else if (radio.name === 'goal') {
          this.#profile.update({ goal: radio.value });
        }
      });
    });

    // сохранение формы
    document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
      const gender = document.querySelector('input[name="gender"]:checked')?.value || 'female';
      const updates = {
        name: document.getElementById('p-name')?.value.trim() || '',
        age: parseFloat(document.getElementById('p-age')?.value) || 25,
        height: parseFloat(document.getElementById('p-height')?.value) || 165,
        weight: parseFloat(document.getElementById('p-weight')?.value) || 60,
        gender,
      };
      this.#profile.update(updates);
      this.render();
    });
  }

  async #renderMacroChart() {
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const canvas = document.getElementById('macroChart');
    if (!canvas) return;
    if (this.#macroChart) this.#macroChart.destroy();

    const macros = this.#profile.calcMacros();
    const isDark = document.documentElement.dataset.theme === 'dark';
    const textColor = isDark ? '#a8c4d8' : '#5a6b48';

    this.#macroChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Белки', 'Жиры', 'Углеводы'],
        datasets: [{
          data: [macros.protein * 4, macros.fat * 9, macros.carbs * 4],
          backgroundColor: [
            isDark ? '#6eb5e0' : '#5c8a3c',
            isDark ? '#e0b86e' : '#d4a843',
            isDark ? '#7eb8e8' : '#4a7ab5',
          ],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            labels: { color: textColor, font: { size: 12 }, boxWidth: 12 },
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${Math.round(ctx.parsed / (macros.protein * 4 + macros.fat * 9 + macros.carbs * 4) * 100)}%`,
            },
          },
        },
      },
    });
  }

  async #renderWeekChart() {
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const canvas = document.getElementById('profileWeekChart');
    if (!canvas) return;
    if (this.#weekChart) this.#weekChart.destroy();

    // последние 7 дней
    const days = [];
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const str = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      days.push(Diary.getDayTotals(str));
      labels.push(d.toLocaleDateString('ru-RU', { weekday: 'short' }));
    }

    const isDark = document.documentElement.dataset.theme === 'dark';
    const textColor = isDark ? '#a8c4d8' : '#5a6b48';
    const gridColor = isDark ? '#3d5f7a' : '#e2e8d0';

    this.#weekChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Белки (г)',
            data: days.map(d => d.protein),
            borderColor: isDark ? '#6eb5e0' : '#5c8a3c',
            backgroundColor: (isDark ? '#6eb5e0' : '#5c8a3c') + '20',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
          },
          {
            label: 'Углеводы (г)',
            data: days.map(d => d.carbs),
            borderColor: isDark ? '#7eb8e8' : '#4a7ab5',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 3,
          },
          {
            label: 'Жиры (г)',
            data: days.map(d => d.fat),
            borderColor: isDark ? '#e0b86e' : '#d4a843',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor, font: { size: 11 }, boxWidth: 12 },
          },
        },
        scales: {
          x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
          y: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor }, beginAtZero: true },
        },
      },
    });
  }
}
