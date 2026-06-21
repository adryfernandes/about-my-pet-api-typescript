import type { Request as ExpressRequest } from 'express';

import type { AuthenticatorData } from './SercivesInterface';

export interface Request extends ExpressRequest {
  claims?: AuthenticatorData;
}
