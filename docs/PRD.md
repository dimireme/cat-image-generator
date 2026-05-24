# PRD

## Project Name

Telegram Good Morning Image Bot

## Goal

Создать Telegram-бота с одной кнопкой:

- «Сгенерить картинку»

После нажатия бот:

- генерирует изображение через Pollinations AI
- использует prompt:
  "С добрым утром"
- отправляет изображение пользователю в Telegram

## User Story

Как пользователь Telegram:

- я открываю бота
- нажимаю кнопку
- получаю AI-сгенерированную картинку с текстом/атмосферой «С добрым утром»

## MVP Scope

Included

- Telegram bot
- Команда /start
- Reply keyboard с одной кнопкой
- Интеграция с Pollinations API
- Отправка картинки пользователю
- Error handling
- ENV variables

Excluded

- Database
- Авторизация
- Оплата
- История генераций
- Inline mode
- Queue
- Caching
- Webhook deployment
- Multiple prompts
- Admin panel

## Functional Requirements

1. Start Command

### Trigger

/start

### Expected behavior

Бот отправляет сообщение:

```text
Нажми кнопку ниже для генерации картинки
```

И показывает keyboard:

```
[ Сгенерить картинку ]
```

2. Generate Image

### Trigger

Нажатие кнопки `Сгенерить картинку`

### Flow

1. Бот отправляет:

```
Генерирую картинку...
```

2. Бот делает запрос к Pollinations AI
3. Получает image URL
4. Отправляет image пользователю

## Pollinations Integration

Документация

```
https://gen.pollinations.ai/docs
```

### Prompt

```
С добрым утром, красивый рассвет, уютный стиль
```

### Example

```
https://image.pollinations.ai/prompt/С%20добрым%20утром
```

## Tech Stack

### Runtime

- Node.js 22+

### Language

- TypeScript

### Telegram Library

Выбрать одно:

- Telegraf (recommended)
  или
- grammY

## Error Handling

Если генерация не удалась:

```
Не удалось сгенерировать картинку. Попробуй позже.
```

### Рекомендуемая структура MVP

```
telegram-image-bot/
├── src/
│   ├── bot.ts
│   ├── config/
│   │   └── env.ts
│   ├── handlers/
│   │   ├── start.ts
│   │   └── generate.ts
│   ├── services/
│   │   └── pollinations.ts
│   └── utils/
│       └── logger.ts
├── .env
├── package.json
├── tsconfig.json
└── .cursor/
    └── rules/
        └── telegram-image-bot.mdc
```
