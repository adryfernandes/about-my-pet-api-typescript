import { HttpStatusCode } from 'axios';

export class NotFoundError extends Error {
  public statusCode = HttpStatusCode.NotFound;

  constructor(
    public message: string,
    public trace: string,
    public stack?: string,
  ) {
    super(message);
  }
}
