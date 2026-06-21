export class BaseError extends Error {
  constructor(
    public message: string,
    public trace: string,
    public statusCode: number,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
