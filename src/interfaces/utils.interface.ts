export interface ErrorResponse {
  statusCode: number;
  response: {
    message: string;
    trace?: string;
    stack?: string;
  };
}
