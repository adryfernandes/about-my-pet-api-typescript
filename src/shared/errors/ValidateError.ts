import { HttpStatusCode } from 'axios';

import { BaseError } from './BaseError';

export class ValidateError extends BaseError {
  constructor(message: string, trace: string) {
    super(message, trace, HttpStatusCode.BadRequest);
  }
}
