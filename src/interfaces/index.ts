import type { Request as ExpressRequest } from 'express';

import type { AuthenticatorData } from './services.interface';

export interface Request extends ExpressRequest {
  claims: AuthenticatorData;
}
