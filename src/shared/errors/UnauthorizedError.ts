import { HttpStatusCode } from 'axios';

import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(trace: string) {
    super('Ação não autorizada.', trace, HttpStatusCode.Unauthorized);
  }
}
