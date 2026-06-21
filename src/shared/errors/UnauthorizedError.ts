import { HttpStatusCode } from 'axios';

export class UnauthorizedError extends Error {
  public statusCode = HttpStatusCode.Unauthorized;

  constructor(public trace: string) {
    super('Ação não autorizada.');
  }
}
