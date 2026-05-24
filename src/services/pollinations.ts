import { env } from '../config/env.js';

const POLLINATIONS_BASE_URL = 'https://gen.pollinations.ai';

export class PollinationsError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'PollinationsError';
    this.status = status;
  }
}

export const buildImageUrl = (prompt: string): string => {
  const url = new URL(
    `${POLLINATIONS_BASE_URL}/image/${encodeURIComponent(prompt)}`,
  );
  url.searchParams.set('seed', String(Math.floor(Math.random() * 2_147_483_647)));
  return url.toString();
};

const isImageContentType = (contentType: string | null): boolean => {
  return contentType?.startsWith('image/') ?? false;
};

export const generateImage = async (prompt: string): Promise<Buffer> => {
  const url = buildImageUrl(prompt);

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.POLLINATIONS_API_KEY}`,
      },
      signal: AbortSignal.timeout(env.POLLINATIONS_TIMEOUT_MS),
    });
  } catch (error) {
    throw new PollinationsError(
      error instanceof Error ? error.message : 'Network request failed',
    );
  }

  if (!response.ok) {
    throw new PollinationsError(
      `Pollinations API returned ${response.status}`,
      response.status,
    );
  }

  const contentType = response.headers.get('content-type');
  if (!isImageContentType(contentType)) {
    throw new PollinationsError(
      `Unexpected content type: ${contentType ?? 'unknown'}`,
      response.status,
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (buffer.length === 0) {
    throw new PollinationsError('Received empty image response');
  }

  return buffer;
};
