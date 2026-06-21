import { HttpStatusCode } from 'axios';

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

  const result: ErrorResponse = {
    statusCode: statusCode ?? HttpStatusCode.InternalServerError,
    response: {
      message: typeof message === 'string' && isEmpty(message.trim()) ? message : GENERIC_ERROR,
      trace,
      stack,
    },
  };

  return result;
};

export const isEmpty = (value: string | object | number): boolean => {
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

  if (typeof value === 'number') {
    return value === EMPTY_LENGHT;
  }

  return false;
};
