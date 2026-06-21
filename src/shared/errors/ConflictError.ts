import { HttpStatusCode } from 'axios';

export class ConflictError extends Error {
  public statusCode = HttpStatusCode.Conflict;

  constructor(
    public message: string,
    public trace: string,
    public stack?: string,
  ) {
    super(message);
  }
}
