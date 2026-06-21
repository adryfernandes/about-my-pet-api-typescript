import { HttpStatusCode } from 'axios';

import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
  constructor(trace: string) {
    super('Ação não permitida.', trace, HttpStatusCode.Forbidden);
  }
}
