import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

export const initEnv = (): void => {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const envFile = `.env.${nodeEnv}`;

  if (existsSync(envFile)) {
    loadEnvFile(envFile);
  }
};
