/**
 * Classe customizada para erros 409 ( Conflict )
 *
 * Seu construtor possui:
 *      message: Mensagem mostrado no erro
 *      trace: Código de erro para restreio ao debuggar
 *      stack: Caminho do erro ( opcional )
 *
 * @example {
 *  "message": "Esse pedido conflitou com um item que já existe no sistema.",
 *  "trace": "INV9999",
 *  "stack": null
 * }
 */
export class ConflictError extends Error {
  public statusCode = 409;

  constructor(public message: string, public trace: string, public stack?: string) {
    super(message);
  }
}
