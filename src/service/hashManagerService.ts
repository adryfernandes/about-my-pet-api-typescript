import bcrypt from 'bcryptjs';
import { ExceptionError } from '@/errors';

export class HashManagerService {
  /**
   * Cria hash da senha para criptografia e segurança
   * @param password
   * @returns
   */
  createHash(password: string): string {
    if (!password) {
      return null;
    }

    const cost = Number(process.env.PASSWORD_COST);

    if (!cost || isNaN(cost)) {
      console.error('Error ao gerar hash de senha');

      throw new ExceptionError('XXX');
    }

    const salt: string = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(password, salt);

    return hash;
  }

  /**
   * Compara senha com hash
   * @param password
   * @param hash
   * @returns
   */
  compareHash(password: string, hash: string): boolean {
    if (!(password || hash)) {
      console.error('Senha não informada');

      return false;
    }

    return bcrypt.compareSync(password, hash);
  }
}
