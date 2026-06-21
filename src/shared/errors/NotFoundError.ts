import { HttpStatusCode } from 'axios';

import { BaseError } from './BaseError';

export class ExceptionError extends BaseError {
  constructor(message: string, trace: string) {
    super(message, trace, HttpStatusCode.NotFound);
  }
}
