import { Telegraf } from 'telegraf';
import type { Context } from 'telegraf';
import {
  BUTTON_GENERATE,
  MSG_ERROR,
  MSG_GENERATING,
} from '../constants.js';
import { buildRandomPrompt } from '../prompts.js';
import { generateImage, PollinationsError } from '../services/pollinations.js';
import { logError, logInfo } from '../utils/logger.js';

export const registerGenerateHandler = (bot: Telegraf<Context>): void => {
  bot.hears(BUTTON_GENERATE, async (ctx) => {
    const loadingMessage = await ctx.reply(MSG_GENERATING);

    try {
      const prompt = buildRandomPrompt();
      logInfo(`Generating image with prompt: ${prompt}`);
      const imageBuffer = await generateImage(prompt);
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
    } finally {
      try {
        await ctx.deleteMessage(loadingMessage.message_id);
      } catch (error) {
        logError('Failed to delete loading message', error);
      }
    }
  });
};
