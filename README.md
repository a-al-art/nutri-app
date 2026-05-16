# NutriTrack - Трекер калорийности и рациона питания

## Структура проекта (БЭМ)

```
nutri-app/
├── index.html              # точка входа
├── vite.config.js          # конфигурация Vite
├── package.json
├── src/
│   ├── css/
│   │   └── main.css        # все стили (БЭМ + CSS-переменные)
│   └── js/
│       ├── main.js         # точка входа JS, класс App
│       ├── classes/        # основные ООП-классы
│       │   ├── Storage.js       # работа с localStorage
│       │   ├── FoodAPI.js       # запросы к Open Food Facts API
│       │   ├── UserProfile.js   # профиль, BMR/TDEE/ИМТ
│       │   └── Diary.js         # дневник питания
│       ├── components/     # компоненты страниц
│       │   ├── SearchComponent.js
│       │   ├── DiaryComponent.js
│       │   ├── PlannerComponent.js
│       │   └── ProfileComponent.js
│       └── utils/
│           └── Toast.js    # уведомления
```

---

## API

Используется Open Food Facts (https://world.openfoodfacts.org):
- Полностью бесплатный, без регистрации и API-ключей
- Содержит 3+ миллиона продуктов со всего мира
- Поиск: `GET /cgi/search.pl?search_terms=...&json=1`

---

## Функциональность

| Раздел | Функции |
|--------|---------|
| **Поиск** | Поиск продуктов через API, просмотр калорий и БЖУ, добавление в дневник |
| **Дневник** | Приёмы пищи по дням, прогресс-бар калорий, навигация по датам |
| **Рацион** | Недельный планировщик, график потребления (Chart.js) |
| **Профиль** | BMR/TDEE по Миффлину-Сан Жеору, ИМТ, графики макросов |

---

https://a-al-art.github.io/nutri-app