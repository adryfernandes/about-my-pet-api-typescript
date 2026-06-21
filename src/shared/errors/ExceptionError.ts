import { HttpStatusCode } from 'axios';

import { BaseError } from './BaseError';

import { GENERIC_ERROR } from '@/shared/utils/constants';

export class ExceptionError extends BaseError {
  constructor(trace: string) {
    super(GENERIC_ERROR, trace, HttpStatusCode.InternalServerError);
  }
}
