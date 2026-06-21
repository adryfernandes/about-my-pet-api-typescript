import bcrypt from 'bcryptjs';

import { ExceptionError } from '@/shared/errors';

export class HashManagerService {
  createHash(password: string): string | null {
    if (password === '') {
      return null;
    }

    const cost =
      process.env.PASSWORD_COST !== undefined ? Number(process.env.PASSWORD_COST) : undefined;

    if (cost === undefined || Number.isNaN(cost)) {
      console.error('Erro ao gerar hash de senha');

      throw new ExceptionError('XXX');
    }

    const salt: string = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(password, salt);

    return hash;
  }

  compareHash(password: string, hash: string): boolean {
    if (!(password || hash)) {
      console.error('Senha não informada');

      return false;
    }

    return bcrypt.compareSync(password, hash);
  }
}
