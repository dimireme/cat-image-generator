import { Telegraf } from 'telegraf';
import type { Context } from 'telegraf';
import { registerGenerateHandler } from './handlers/generate.js';
import { registerStartHandler } from './handlers/start.js';
import { logError, logInfo } from './utils/logger.js';

export const createBot = (token: string): Telegraf<Context> => {
  const bot = new Telegraf<Context>(token);

  registerStartHandler(bot);
  registerGenerateHandler(bot);

  bot.catch((error, ctx) => {
    logError('Telegraf handler error', {
      updateType: ctx.updateType,
      error,
    });
  });

  return bot;
};

export const launchBot = async (bot: Telegraf<Context>): Promise<void> => {
  await bot.launch();
  logInfo('Bot started');

  const stopBot = (signal: string): void => {
    logInfo(`Received ${signal}, stopping bot`);
    bot.stop(signal);
  };

  process.once('SIGINT', () => stopBot('SIGINT'));
  process.once('SIGTERM', () => stopBot('SIGTERM'));
};
