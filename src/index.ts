import 'dotenv/config';
import { env } from './config/env.js';
import { createBot, launchBot } from './bot.js';
import { logError, logInfo } from './utils/logger.js';

const main = async (): Promise<void> => {
  const bot = createBot(env.BOT_TOKEN);
  await launchBot(bot);
  logInfo('Good Morning bot is running');
};

main().catch((error) => {
  logError('Failed to start bot', error);
  process.exit(1);
});
