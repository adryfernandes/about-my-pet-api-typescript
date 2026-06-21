import { HttpStatusCode } from 'axios';

export class ValidateError extends Error {
  public statusCode = HttpStatusCode.BadRequest;

  constructor(
    public message: string,
    public trace: string,
    public stack?: string,
  ) {
    super(message);
  }
}
