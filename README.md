# Telegram Good Morning Image Bot

Telegram-бот с одной кнопкой «Сгенерить картинку». Генерирует изображение через [Pollinations API](https://gen.pollinations.ai/docs) и отправляет его пользователю.

**Бот в Telegram:** [@GoodMorningImageGeneratot48Bot](https://t.me/GoodMorningImageGeneratot48Bot)

## Требования

- Node.js 22+
- Yarn
- Токен Telegram-бота ([@BotFather](https://t.me/BotFather))
- API-ключ Pollinations ([enter.pollinations.ai](https://enter.pollinations.ai))

## Установка

```bash
cp .env.example .env
```

Заполните `.env`:

| Переменная                | Описание                                  |
| ------------------------- | ----------------------------------------- |
| `BOT_TOKEN`               | Токен бота от BotFather                   |
| `POLLINATIONS_API_KEY`    | API-ключ (`sk_...` для сервера)           |
| `POLLINATIONS_TIMEOUT_MS` | Таймаут запроса в мс (по умолчанию 60000) |

Промпты задаются в коде: [`src/prompts.ts`](src/prompts.ts) — случайный кот + случайное слово-атмосфера.

```bash
yarn install
```

## Запуск

Разработка (с hot reload):

```bash
yarn dev
```

Сборка и продакшен:

```bash
yarn build
yarn start
```

## Проверка в Telegram

1. Откройте [@GoodMorningImageGeneratot48Bot](https://t.me/GoodMorningImageGeneratot48Bot) и отправьте `/start` — появится кнопка «Сгенерить картинку».
2. Нажмите кнопку — бот ответит «Генерирую картинку...», затем пришлёт фото.
3. При ошибке API — сообщение «Не удалось сгенерировать картинку. Попробуй позже.»

## Структура

```
src/
├── index.ts
├── bot.ts
├── config/env.ts
├── constants.ts
├── prompts.ts
├── handlers/
│   ├── start.ts
│   └── generate.ts
├── services/pollinations.ts
└── utils/logger.ts
```
