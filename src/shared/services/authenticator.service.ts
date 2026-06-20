import * as jwt from 'jsonwebtoken';

import { UnauthorizedError } from '@/errors';

import type { AuthenticatorData } from '@/interfaces/services.interface';

export class AuthenticatorService {
  /**
   * Gera token a partir do payload
   * @param payload
   * @returns
   */
  generateToken(payload: AuthenticatorData): string {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  }

  /**
   * Pega informações do toke
   * @param token
   * @returns
   */
  getTokenData(token: string): AuthenticatorData {
    try {
      const result: AuthenticatorData = jwt.verify(token, process.env.JWT_KEY as string);

      return result;
    } catch (error) {
      throw new UnauthorizedError('XXX');
    }
  }
}

export default new AuthenticatorService();
