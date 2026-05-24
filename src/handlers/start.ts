import { Markup, Telegraf } from 'telegraf';
import type { Context } from 'telegraf';
import { BUTTON_GENERATE, MSG_START } from '../constants.js';

export const registerStartHandler = (bot: Telegraf<Context>): void => {
  bot.start(async (ctx) => {
    await ctx.reply(
      MSG_START,
      Markup.keyboard([[BUTTON_GENERATE]]).resize(),
    );
  });
};
