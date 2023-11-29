import type { NextFunction, Response } from 'express';

import { ExceptionError, UnauthorizedError } from '@/errors';
import { AuthenticatorService } from '@/service';
import { handleErrorResponse } from '@/utils';

import type { AuthenticatorData } from '@/interfaces/services.interface';
import type { ErrorResponse } from '@/interfaces/utils.interface';

import type { Request } from '@/interfaces';

// Coloca as informações contidas no token dentro do claims
export const claimsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Regra feita para não precisar pôr um claims em toda rota,
    // sendo que só as rotas abaixo não precisam
    const { url } = req;
    if (url.includes('credential')) {
      next();

      return;
    }

    const authorization: string = req?.headers?.authorization;
    if (!authorization) {
      throw new UnauthorizedError('XXX');
    }

    const token: string = authorization?.split(' ')?.[1];

    const _authenticatorService: AuthenticatorService = new AuthenticatorService();
    const tokenData: AuthenticatorData = _authenticatorService.getTokenData(token);

    req.claims = tokenData;

    next();
  } catch (err) {
    let error = err;

    if (!(error instanceof UnauthorizedError)) {
      error = new ExceptionError('XXX');
    }
    const { statusCode, response }: ErrorResponse = handleErrorResponse(error);

    res.status(statusCode).send(response);
  }
};
