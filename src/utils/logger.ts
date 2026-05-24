const formatMessage = (level: string, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

export const logInfo = (message: string): void => {
  console.log(formatMessage('INFO', message));
};

export const logError = (message: string, error?: unknown): void => {
  console.error(formatMessage('ERROR', message), error);
};
