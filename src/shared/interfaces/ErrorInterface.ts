export interface Error {
  message: string;
  statusCode: number;
  trace?: string;
  stack?: string;
}

export interface ErrorResponse {
  statusCode: number;
  response: {
    message: string;
    trace?: string;
    stack?: string;
  };
}
