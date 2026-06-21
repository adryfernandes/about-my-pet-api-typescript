import type { Request as ExpressRequest } from 'express';

import type { AuthenticatorData } from './ServicesInterface';

export interface Request extends ExpressRequest {
  claims?: AuthenticatorData;
}
