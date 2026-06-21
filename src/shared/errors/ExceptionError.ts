import { HttpStatusCode } from 'axios';

import { GENERIC_ERROR } from '@/shared/utils/constants';

export class ExceptionError extends Error {
  public statusCode = HttpStatusCode.InternalServerError;

  constructor(
    public trace: string,
    public stack?: string,
  ) {
    super(GENERIC_ERROR);
  }
}
