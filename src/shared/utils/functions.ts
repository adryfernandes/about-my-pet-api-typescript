import dotenv from 'dotenv';

import { GENERIC_ERROR } from './constants';

import type { ErrorResponse, Error } from '@/shared/interfaces/ErrorInterface';

export const onlyNumbers = (value: string | null): string => {
  if (value === null) {
    return '';
  }

  return value.replace(/[^\d]/gv, '');
};

export const handleErrorResponse = (error: Partial<Error>): ErrorResponse => {
  const { statusCode, message, trace, stack } = error;
  const INTERNAL_SERVER_ERROR = 500;

  const result: ErrorResponse = {
    statusCode: statusCode ?? INTERNAL_SERVER_ERROR,
    response: {
      message: typeof message === 'string' && isEmpty(message.trim()) ? message : GENERIC_ERROR,
    },
  };

  result.response.trace = trace;
  result.response.stack = stack;

  return result;
};

export const isEnvConfigure = (env: Record<string, string>): boolean => {
  if (!env || !Object.keys(env).length) {
    return false;
  }

  const environmentsUndefineds: string[] =
    Object.keys(env).filter((key: string) => !env[key]) || [];

  return !environmentsUndefineds.length;
};

// export const envConfig = () => {
//   const envLocalData = dotenv.config({
//     path: '.env.local',
//   });

//   const envData = dotenv.config({
//     path: `.env.${process.env.NODE_ENV || 'development'}`,
//   });

//   if (envLocalData?.parsed) {
//     envData.parsed = { ...envData?.parsed, ...envLocalData?.parsed };
//   }

//   if (!isEnvConfigure(envData.parsed)) {
//     console.error('ERRO AO INICIAR API - Variáveis de ambiente não configuradas');
//     throw new Error('ERROR');
//   }

//   return envData.parsed;
// };

export const isEmpty = (value: string | object): boolean => {
  const EMPTY_LENGHT = 0;

  if (typeof value === 'string') {
    return value.trim().length === EMPTY_LENGHT;
  }

  if (Array.isArray(value)) {
    return value.length === EMPTY_LENGHT;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === EMPTY_LENGHT;
  }

  return false;
};
