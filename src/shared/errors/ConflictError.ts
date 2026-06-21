import { HttpStatusCode } from 'axios';

import { BaseError } from './BaseError';

export class ConflictError extends BaseError {
  constructor(message: string, trace: string) {
    super(message, trace, HttpStatusCode.Conflict);
  }
}
