import { GENERIC_ERROR } from '@/utils/constants';

/**
 * Classe customizada para erros 500 ( Exceptions )
 * Sua mensagem é sempre a mesma
 *
 * Seu construtor possui:
 *      trace: Código de erro para restreio ao debuggar
 *      stack: Caminho do erro
 *
 * @example {
 *  "message": "Erro inesperado, por favor entre em contato com o suporte.",
 *  "trace": "INV9999",
 *  "stack": null
 * }
 */
export class ExceptionError extends Error {
  public statusCode = 500;

  constructor(public trace: string, public stack?: string) {
    super(GENERIC_ERROR);
  }
}
