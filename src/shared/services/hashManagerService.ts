import bcrypt from 'bcryptjs';

import { isEmpty } from '../utils/functions';

import { ExceptionError } from '@/shared/errors';

export const HashManagerService = {
  createHash(password: string): string {
    if (isEmpty(password)) {
      throw new ExceptionError('Senha não pode ser vazia');
    }

    const {
      env: { PASSWORD_COST },
    } = process;

    const cost = Number(PASSWORD_COST);

    if (Number.isNaN(cost) || cost <= 0) {
      console.error('Erro ao gerar hash de senha');

      throw new ExceptionError('Configuração inválida de PASSWORD_COST');
    }

    const salt = bcrypt.genSaltSync(cost);
    return bcrypt.hashSync(password, salt);
  },

  compareHash(password: string, hash: string): boolean {
    if (isEmpty(password) || isEmpty(hash)) {
      console.error('Senha ou hash não informados');
      return false;
    }

    return bcrypt.compareSync(password, hash);
  },
};
