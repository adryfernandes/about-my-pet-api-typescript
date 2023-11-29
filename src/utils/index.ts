import dotenv from 'dotenv';

import { GENERIC_ERROR } from './constants';

import type { ExceptionError } from '@/errors';

import { Error } from '@/interfaces/error.interface';
import type { ErrorResponse } from '@/interfaces/utils.interface';

/**
 * Fução para aguardar um tempo especifico
 * @param ms - tempo em milissegundos
 * @returns
 */
export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * Tentar fazer novamente a requisição em caso de erro
 * @param functionToRetry
 */
export const retry = async (functionToRetry: () => Promise<void>) => {
  const maxRetries = 3; // Número máximo de retentativas
  let retries = 0; // Contador de retentativas

  while (retries < maxRetries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await functionToRetry();

      // Se a postagem for bem-sucedida, saia do loop
      break;
    } catch (error) {
      retries++;

      // Aguardar um tempo antes de tentar novamente
      // eslint-disable-next-line no-await-in-loop
      await wait(1000);
    }
  }
};

/**
 * Retira da string qualquer caracter não numérico
 * @param value
 * @returns
 */
export const onlyNumbers = (value: string): string => {
  return value ? value.replace(/\D/g, '') : '';
};

export const handle = async <Result>(
  promise: Promise<Result>
): Promise<[ExceptionError | Error | undefined, Result | undefined]> => {
  return promise
    .then((response) => [undefined, response] as [undefined, Result])
    .catch((error: ExceptionError | Error) => [error, undefined]);
};

/**
 * Lida e verifica error para retornar resposta
 * @param error
 * @returns
 */
export const handleErrorResponse = (error: Error): ErrorResponse => {
  const result: ErrorResponse = {
    statusCode: error.statusCode ? error.statusCode : 500,
    response: {
      message: error.message ? error.message : GENERIC_ERROR,
    },
  };

  if (error.trace) {
    result.response['trace'] = error.trace;
  }
  if (error.stack || (error.stack && Object.keys(error.stack).length)) {
    result.response['stack'] = error.stack;
  }

  return result;
};

/**
 * Verifica se as variáveis de ambiente foram configuradas
 * @param env - variáveis de ambiente
 * @returns
 */
export const isEnvConfigure = (env: { [k: string]: string }): boolean => {
  if (!env || !Object.keys(env).length) {
    return false;
  }

  const environmentsUndefineds: string[] =
    Object.keys(env).filter((key: string) => !env[key]) || [];

  return !environmentsUndefineds.length;
};

export const envConfig = () => {
  const envLocalData = dotenv.config({
    path: '.env.local',
  });

  const envData = dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
  });

  if (envLocalData?.parsed) {
    envData.parsed = { ...envData?.parsed, ...envLocalData?.parsed };
  }

  if (!isEnvConfigure(envData.parsed)) {
    console.error('ERRO AO INICIAR API - Variáveis de ambiente não configuradas');
    throw new Error('ERROR');
  }

  return envData.parsed;
};
