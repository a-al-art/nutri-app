import { Diary } from '../classes/Diary.js';
import { UserProfile } from '../classes/UserProfile.js';

export class PlannerComponent {
  #profile;
  #weekEl;
  #statsEl;
  #chart = null;

  constructor(profile) {
    this.#profile = profile;
    this.#weekEl = document.getElementById('plannerWeek');
    this.#statsEl = document.getElementById('plannerStats');
  }

  #toLocalStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  render() {
    const today = new Date();
    // начало текущей недели (понедельник), вычисляем по локальному времени
    const monday = new Date(today);
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
    monday.setDate(today.getDate() - dayOfWeek);
    monday.setHours(0, 0, 0, 0);

    const weekData = Diary.getWeekData(this.#toLocalStr(monday));
    const target = this.#profile.isComplete()
      ? this.#profile.calcTargetCalories()
      : 2000;

    this.#renderWeek(weekData, target, today);
    this.#renderStats(weekData, target);
  }

  #renderWeek(weekData, target, today) {
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const todayStr = Diary.today();

    this.#weekEl.innerHTML = weekData.map((day, i) => {
      const cals = day.totals.calories;
      const pct = Math.min(100, Math.round((cals / target) * 100));
      const isToday = day.date === todayStr;
      const dayNum = new Date(day.date + 'T00:00:00').getDate();
      const isOver = cals > target;

      return `
        <div class="planner__day ${isToday ? 'planner__day--today' : ''}">
          <div class="planner__day-name">${dayNames[i]}</div>
          <div class="planner__day-date">${dayNum}</div>
          <div class="planner__day-cals">
            ${cals > 0
              ? `<strong>${cals}</strong> ккал`
              : `<span style="color:var(--color-text-muted);font-size:11px">нет данных</span>`
            }
          </div>
          <div class="planner__day-bar">
            <div class="planner__day-bar-fill ${isOver ? 'over' : ''}" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  #renderStats(weekData, target) {
    const days = weekData.filter(d => d.totals.calories > 0);
    const totalCals = days.reduce((s, d) => s + d.totals.calories, 0);
    const avgCals = days.length ? Math.round(totalCals / days.length) : 0;
    const totalProtein = days.reduce((s, d) => s + d.totals.protein, 0);
    const totalCarbs = days.reduce((s, d) => s + d.totals.carbs, 0);

    this.#statsEl.innerHTML = `
      <div class="planner__stats-title">Итоги недели</div>
      <div class="planner__stats-grid">
        <div class="planner__stat-box">
          <div class="planner__stat-value">${totalCals}</div>
          <div class="planner__stat-label">Всего ккал за неделю</div>
        </div>
        <div class="planner__stat-box">
          <div class="planner__stat-value">${avgCals}</div>
          <div class="planner__stat-label">Среднее ккал/день</div>
        </div>
        <div class="planner__stat-box">
          <div class="planner__stat-value">${Math.round(totalProtein)}г</div>
          <div class="planner__stat-label">Белки за неделю</div>
        </div>
        <div class="planner__stat-box">
          <div class="planner__stat-value">${Math.round(totalCarbs)}г</div>
          <div class="planner__stat-label">Углеводы за неделю</div>
        </div>
      </div>
      <div class="planner__chart-container">
        <canvas id="weekChart"></canvas>
      </div>
    `;

    this.#renderChart(weekData, target);
  }

  async #renderChart(weekData, target) {
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const canvas = document.getElementById('weekChart');
    if (!canvas) return;

    if (this.#chart) {
      this.#chart.destroy();
    }

    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const isDark = document.documentElement.dataset.theme === 'dark';
    const textColor = isDark ? '#a8c4d8' : '#5a6b48';
    const gridColor = isDark ? '#3d5f7a' : '#e2e8d0';
    const accentColor = isDark ? '#6eb5e0' : '#5c8a3c';

    this.#chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: dayNames,
        datasets: [
          {
            label: 'Калории',
            data: weekData.map(d => d.totals.calories),
            backgroundColor: weekData.map(d =>
              d.totals.calories > target
                ? 'rgba(192,57,43,0.7)'
                : accentColor + 'aa'
            ),
            borderColor: weekData.map(d =>
              d.totals.calories > target ? '#c0392b' : accentColor
            ),
            borderWidth: 1.5,
            borderRadius: 6,
          },
          {
            label: 'Цель',
            data: Array(7).fill(target),
            type: 'line',
            borderColor: isDark ? '#e0b86e' : '#d4a843',
            borderDash: [6, 3],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor, font: { size: 12 }, boxWidth: 14 },
          },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} ккал`,
            },
          },
        },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: {
            ticks: { color: textColor, callback: v => v + ' кк' },
            grid: { color: gridColor },
            beginAtZero: true,
          },
        },
      },
    });
  }
}
