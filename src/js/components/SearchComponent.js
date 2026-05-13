import { FoodAPI } from '../classes/FoodAPI.js';
import { Diary } from '../classes/Diary.js';
import { Toast } from '../utils/Toast.js';

export class SearchComponent {
  #input;
  #clearBtn;
  #resultsEl;
  #modal;
  #modalContent;
  #debounceTimer = null;
  #currentProduct = null;
  #abortController = null;

  constructor() {
    this.#input = document.getElementById('searchInput');
    this.#clearBtn = document.getElementById('searchClear');
    this.#resultsEl = document.getElementById('searchResults');
    this.#modal = document.getElementById('productModal');
    this.#modalContent = document.getElementById('modalContent');

    this.#bindEvents();
  }

  #bindEvents() {
    // поиск с задержкой debounce 800мс
    this.#input.addEventListener('input', () => {
      const val = this.#input.value.trim();
      this.#clearBtn.classList.toggle('visible', val.length > 0);

      clearTimeout(this.#debounceTimer);
      if (val.length < 3) {
        this.#showInitialState();
        return;
      }
      this.#debounceTimer = setTimeout(() => {
  this.#showLoading();
  this.#performSearch(val);
}, 800);
    });

    // очистить поиск
    this.#clearBtn.addEventListener('click', () => {
      this.#input.value = '';
      this.#clearBtn.classList.remove('visible');
      this.#showInitialState();
      this.#input.focus();
    });

    // закрыть модал
    document.getElementById('modalOverlay').addEventListener('click', () => this.#closeModal());
    document.getElementById('modalClose').addEventListener('click', () => this.#closeModal());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.#closeModal();
    });
  }

  async #performSearch(query) {
  try {
    // отменяем старый запрос
    if (this.#abortController) {
      this.#abortController.abort();
    }

    this.#abortController = new AbortController();

    const products = await FoodAPI.search(
      query,
      1,
      this.#abortController.signal
    );

    if (products.length === 0) {
      this.#showEmpty(query);
    } else {
      this.#renderResults(products);
    }

  } catch (error) {
    // abort - нормально
    if (error.name === 'AbortError') {
      return;
    }

    this.#showError();
    console.error('Search error:', error);
  }
}

  #showInitialState() {
    this.#resultsEl.innerHTML = `
      <div class="search-state">
        <div class="search-state__icon">🔍</div>
        <div class="search-state__text">Введите название продукта</div>
        <div class="search-state__hint">Например: куриная грудка, гречка, яблоко</div>
      </div>
    `;
  }

  #showLoading() {
    this.#resultsEl.innerHTML = Array(4).fill(0).map(() => `
      <div class="product-card" style="pointer-events:none">
        <div class="skeleton" style="width:44px;height:44px;border-radius:8px;flex-shrink:0"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6px">
          <div class="skeleton" style="height:16px;width:60%;border-radius:4px"></div>
          <div class="skeleton" style="height:12px;width:40%;border-radius:4px"></div>
        </div>
        <div class="skeleton" style="height:24px;width:40px;border-radius:4px"></div>
      </div>
    `).join('');
  }

  #showEmpty(query) {
    this.#resultsEl.innerHTML = `
      <div class="search-state">
        <div class="search-state__icon">🤷</div>
        <div class="search-state__text">Ничего не найдено по запросу «${query}»</div>
        <div class="search-state__hint">Попробуйте другое название или на английском</div>
      </div>
    `;
  }

  #showError() {
    this.#resultsEl.innerHTML = `
      <div class="search-state">
        <div class="search-state__icon">⚠️</div>
        <div class="search-state__text">Ошибка загрузки</div>
        <div class="search-state__hint">Проверьте соединение с интернетом</div>
      </div>
    `;
  }

  #renderResults(products) {
    this.#resultsEl.innerHTML = products.map(p => `
      <div class="product-card" data-id="${p.id}">
        <div class="product-card__emoji">${p.emoji}</div>
        <div class="product-card__info">
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__meta">${p.brand || 'на 100г'}</div>
          <div class="macros">
            <div class="macros__item">
              <div class="macros__dot macros__dot--protein"></div>
              Б ${p.protein}г
            </div>
            <div class="macros__item">
              <div class="macros__dot macros__dot--fat"></div>
              Ж ${p.fat}г
            </div>
            <div class="macros__item">
              <div class="macros__dot macros__dot--carbs"></div>
              У ${p.carbs}г
            </div>
          </div>
        </div>
        <div class="product-card__calories">
          ${p.calories}
          <span>ккал/100г</span>
        </div>
      </div>
    `).join('');

    // клики по карточкам
    this.#resultsEl.querySelectorAll('.product-card').forEach((card, i) => {
      card.addEventListener('click', () => this.#openModal(products[i]));
    });
  }

  #openModal(product) {
    this.#currentProduct = product;

    this.#modalContent.innerHTML = `
      <div class="modal__product-name">${product.emoji} ${product.name}</div>
      <div class="modal__product-brand">${product.brand || 'Продукт'} · на 100г</div>

      <div class="modal__calories-display">
        <div class="modal__calories-value">${product.calories}</div>
        <div class="modal__calories-label">ккал</div>
        <div class="modal__serving-label">/ 100г</div>
      </div>

      <div class="modal__macros-grid">
        <div class="modal__macro-box modal__macro-box--protein">
          <div class="modal__macro-value">${product.protein}г</div>
          <div class="modal__macro-label">Белки</div>
        </div>
        <div class="modal__macro-box modal__macro-box--fat">
          <div class="modal__macro-value">${product.fat}г</div>
          <div class="modal__macro-label">Жиры</div>
        </div>
        <div class="modal__macro-box modal__macro-box--carbs">
          <div class="modal__macro-value">${product.carbs}г</div>
          <div class="modal__macro-label">Углеводы</div>
        </div>
      </div>

      ${product.fiber ? `<div style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px">Клетчатка: ${product.fiber}г</div>` : ''}

      <div class="modal__add-section">
        <div class="modal__add-title">Добавить в дневник</div>
        <div class="modal__add-row">
          <input class="modal__input" id="modalAmount" type="number" value="100" min="1" max="9999" placeholder="г" />
          <span style="font-size:14px;color:var(--color-text-muted)">г →</span>
          <select class="modal__select" id="modalMeal">
            ${Diary.MEALS.map(m => `<option value="${m.id}">${m.emoji} ${m.name}</option>`).join('')}
          </select>
        </div>
        <div id="modalCalcResult" style="font-size:13px;color:var(--color-text-secondary);margin-bottom:12px"></div>
        <button class="btn btn--primary btn--full" id="modalAddBtn">
          Добавить в дневник
        </button>
      </div>
    `;

    // динамический пересчёт при изменении граммовки
    const amountInput = document.getElementById('modalAmount');
    const calcResult = document.getElementById('modalCalcResult');

    const updateCalc = () => {
      const amount = parseFloat(amountInput.value) || 0;
      const ratio = amount / 100;
      const cals = Math.round(product.calories * ratio);
      calcResult.textContent = amount > 0
        ? `${amount}г = ${cals} ккал · Б ${Math.round(product.protein * ratio * 10) / 10}г · Ж ${Math.round(product.fat * ratio * 10) / 10}г · У ${Math.round(product.carbs * ratio * 10) / 10}г`
        : '';
    };

    amountInput.addEventListener('input', updateCalc);
    updateCalc();

    document.getElementById('modalAddBtn').addEventListener('click', () => {
      const amount = parseFloat(amountInput.value);
      const mealId = document.getElementById('modalMeal').value;

      if (!amount || amount <= 0) {
        Toast.error('Укажите количество в граммах');
        return;
      }

      Diary.addEntry(Diary.today(), mealId, product, amount);
      const mealName = Diary.MEALS.find(m => m.id === mealId)?.name || mealId;
      Toast.success(`Добавлено в «${mealName}»`);
      this.#closeModal();
    });

    this.#modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  #closeModal() {
    this.#modal.classList.remove('open');
    document.body.style.overflow = '';
    this.#currentProduct = null;
  }

  init() {
    this.#showInitialState();
  }
}
