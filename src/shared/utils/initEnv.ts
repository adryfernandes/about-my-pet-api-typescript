import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

import { z } from 'zod';

import { ExceptionError } from '../errors';

const envSchema = z.object({
  NODE_ENV: z.string(),
  PASSWORD_COST: z.coerce.number().int().positive(),
  JWT_KEY: z.string(),
  JWT_EXPIRES_IN: z.coerce.number().int().positive(),
  DATABASE_URL: z.string(),
});

export const initEnv = (): void => {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const envFile = `.env.${nodeEnv}`;

  if (existsSync(envFile)) {
    loadEnvFile(envFile);
  }

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    throw new ExceptionError('XXX');
  }
};
