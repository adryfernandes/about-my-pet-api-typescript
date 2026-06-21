import { HttpStatusCode } from 'axios';
import type { Response, Request, NextFunction } from 'express';
import { ValidateError as ErroTsoa } from 'tsoa';
import { ZodError } from 'zod';

import { BaseError } from '@/shared/errors/BaseError';
import { GENERIC_ERROR } from '@/shared/utils/constants';
import { formatZodError } from '@/shared/utils/formatZodError';

// Último código de erro: XXXX
export const errorHandlerMiddleware = (
  err: BaseError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
      trace: err.trace,
    });
  }

  if (err instanceof ZodError) {
    return res.status(HttpStatusCode.BadRequest).json({
      message: 'Dados inválidos',
      trace: 'XXX',
      errors: formatZodError(err),
    });
  }

  if (err instanceof ErroTsoa) {
    return res.status(HttpStatusCode.UnprocessableEntity).json({
      message: GENERIC_ERROR,
      trace: 'XXX',
      errors: err.fields,
    });
  }

  return res.status(HttpStatusCode.InternalServerError).json({
    message: GENERIC_ERROR,
    trace: 'XXX',
    errors: err.stack,
  });
};
