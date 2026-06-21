import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

import { z } from 'zod';

import { ExceptionError } from '../errors';

import { formatZodError } from './formatZodError';

const envSchema = z.object({
  NODE_ENV: z.string(),
  // DB_SERVER: z.string(),
  // DB_USERNAME: z.string(),
  // DB_PASSWORD: z.string(),
  DB_SCHEMA: z.string(),
  // DB_PORT: z.coerce.number().int().positive(),
  PASSWORD_COST: z.coerce.number().int().positive(),
});

export const initEnv = (): void => {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const envFile = `.env.${nodeEnv}`;

  if (existsSync(envFile)) {
    loadEnvFile(envFile);
  }

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    throw new ExceptionError('XXX', formatZodError(result.error));
  }
};
