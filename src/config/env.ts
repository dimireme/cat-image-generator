const DEFAULT_POLLINATIONS_TIMEOUT_MS = 60_000;

const requireEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const parseTimeoutMs = (value: string | undefined): number => {
  if (!value?.trim()) {
    return DEFAULT_POLLINATIONS_TIMEOUT_MS;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error('POLLINATIONS_TIMEOUT_MS must be a positive integer');
  }

  return parsed;
};

export const env = {
  BOT_TOKEN: requireEnv('BOT_TOKEN'),
  POLLINATIONS_API_KEY: requireEnv('POLLINATIONS_API_KEY'),
  POLLINATIONS_TIMEOUT_MS: parseTimeoutMs(process.env.POLLINATIONS_TIMEOUT_MS),
} as const;

export type Env = typeof env;
