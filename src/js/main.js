import { Storage } from './classes/Storage.js';
import { UserProfile } from './classes/UserProfile.js';
import { SearchComponent } from './components/SearchComponent.js';
import { DiaryComponent } from './components/DiaryComponent.js';
import { PlannerComponent } from './components/PlannerComponent.js';
import { ProfileComponent } from './components/ProfileComponent.js';


class App {
  #currentPage = 'search';
  #profile;
  #components = {};

  constructor() {
    this.#profile = new UserProfile();
    this.#initTheme();
    this.#initComponents();
    this.#initNavigation();
    this.#initThemeToggle();

    // загружаем страницу из URL-хэша для сохранения при обновлении
    const hash = window.location.hash.replace('#', '');
    if (['search', 'diary', 'planner', 'profile'].includes(hash)) {
      this.#navigateTo(hash);
    } else {
      this.#navigateTo('search');
    }
  }

  #initComponents() {
    this.#components.search = new SearchComponent();
    this.#components.diary = new DiaryComponent(this.#profile);
    this.#components.planner = new PlannerComponent(this.#profile);
    this.#components.profile = new ProfileComponent(this.#profile);

    this.#components.search.init();
  }

  #initNavigation() {
    // десктопная навигация
    document.querySelectorAll('.nav__item').forEach(btn => {
      btn.addEventListener('click', () => this.#navigateTo(btn.dataset.page));
    });

    // мобильная навигация
    document.querySelectorAll('.mobile-nav__item').forEach(btn => {
      btn.addEventListener('click', () => this.#navigateTo(btn.dataset.page));
    });
  }

  #navigateTo(page) {
    if (this.#currentPage === page && page !== 'search') return;

    // убираем active у страниц
    document.querySelectorAll('.page').forEach(p => p.classList.remove('page--active'));
    document.getElementById(`page-${page}`)?.classList.add('page--active');

    // обновляем навигацию
    document.querySelectorAll('.nav__item, .mobile-nav__item').forEach(btn => {
      btn.classList.toggle('nav__item--active', btn.dataset.page === page);
      btn.classList.toggle('mobile-nav__item--active', btn.dataset.page === page);
    });

    this.#currentPage = page;
    window.location.hash = page;

    // рендерим компонент при переходе
    if (page === 'diary') this.#components.diary.render();
    if (page === 'planner') this.#components.planner.render();
    if (page === 'profile') this.#components.profile.render();

    window.scrollTo(0, 0);
  }

  #initTheme() {
    const saved = Storage.get('theme', 'light');
    document.documentElement.dataset.theme = saved;
  }

  #initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    btn.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme;
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      Storage.set('theme', next);

      // перерисовываем текущую страницу для обновления цветов графиков
      if (this.#currentPage === 'planner') this.#components.planner.render();
      if (this.#currentPage === 'profile') this.#components.profile.render();
    });
  }
}

// запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
