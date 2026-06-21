import type { NextFunction, Response } from 'express';

import { ExceptionError, UnauthorizedError } from '@/shared/errors';
import type { Request } from '@/shared/interfaces';
import type { AuthenticatorData } from '@/shared/interfaces/SercivesInterface';
import { AuthenticatorService } from '@/shared/services';
import { handleErrorResponse } from '@/shared/utils/functions';
import { ErrorResponse } from '@/shared/interfaces/ErrorInterface';

export const claimsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { url } = req;
    if (url.includes('credentials')) {
      next();

      return;
    }

    const {
      headers: { authorization },
    } = req;

    if (authorization === undefined || authorization === '') {
      throw new UnauthorizedError('XXX');
    }

    const [, token] = authorization.split(' ');

    const authenticatorService = new AuthenticatorService();
    const tokenData: AuthenticatorData = authenticatorService.getTokenData(token);

    req.claims = tokenData;

    next();
  } catch (err) {
    const error = err instanceof UnauthorizedError ? err : new ExceptionError('XXX');
    const { statusCode, response }: ErrorResponse = handleErrorResponse(error);

    res.status(statusCode).send(response);
  }
};
