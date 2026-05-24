import { Telegraf } from 'telegraf';
import type { Context } from 'telegraf';
import { env } from '../config/env.js';
import {
  BUTTON_GENERATE,
  MSG_ERROR,
  MSG_GENERATING,
} from '../constants.js';
import { generateImage, PollinationsError } from '../services/pollinations.js';
import { logError } from '../utils/logger.js';

export const registerGenerateHandler = (bot: Telegraf<Context>): void => {
  bot.hears(BUTTON_GENERATE, async (ctx) => {
    await ctx.reply(MSG_GENERATING);

    try {
      const imageBuffer = await generateImage(env.IMAGE_PROMPT);
      await ctx.replyWithPhoto({ source: imageBuffer });
    } catch (error) {
      if (error instanceof PollinationsError) {
        logError('Pollinations image generation failed', {
          message: error.message,
          status: error.status,
        });
      } else {
        logError('Unexpected error during image generation', error);
      }

      await ctx.reply(MSG_ERROR);
    }
  });
};
