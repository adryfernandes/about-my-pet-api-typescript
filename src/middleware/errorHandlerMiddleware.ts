import { ValidateError as ErroTsoa } from 'tsoa';
import { GENERIC_ERROR } from '@/utils/constants';
import {
  ExceptionError,
  NotFoundError,
  ValidateError,
  UnauthorizedError,
  ConflictError,
} from '@/errors';
import type { Response, Request, NextFunction } from 'express';

// Último código de erro: XXXX
export const errorHandlerMiddleware = async (
  err: ValidateError | NotFoundError | UnauthorizedError | ExceptionError | ConflictError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Erros controlados
  if (
    err instanceof ValidateError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ExceptionError ||
    err instanceof ConflictError
  ) {
    return res.status(err.statusCode).json({
      message: err.message,
      trace: err.trace,
    });
  }

  // Erros da lib TSOA
  if (err instanceof ErroTsoa) {
    return res.status(422).json({
      message: GENERIC_ERROR,
      trace: 'XXX',
      stack: err?.fields,
    });
  }

  // Erro não controlado
  const message = {
    message: GENERIC_ERROR,
    trace: 'XXX',
    stack: (err as Error)?.stack,
  };

  return res.status(500).json(message);
};
