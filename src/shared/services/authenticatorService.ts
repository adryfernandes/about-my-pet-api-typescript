import jwt from 'jsonwebtoken';

import { ExceptionError, UnauthorizedError } from '../errors';
import { isAuthenticatorData } from '../utils/functions';

import type { AuthenticatorData } from '@/shared/interfaces/ServicesInterface';

export class AuthenticatorService {
  private readonly jwtKey: string;
  private readonly jwtExpiresIn: number;

  constructor() {
    const {
      env: { JWT_EXPIRES_IN, JWT_KEY },
    } = process;

    if (JWT_EXPIRES_IN === undefined || JWT_KEY === undefined) {
      throw new ExceptionError('XXX');
    }

    this.jwtKey = JWT_KEY;
    this.jwtExpiresIn = Number(JWT_EXPIRES_IN);
  }

  generateToken(payload: AuthenticatorData): string {
    return jwt.sign(payload, this.jwtKey, {
      expiresIn: this.jwtExpiresIn,
    });
  }

  getTokenData(token: string): AuthenticatorData {
    try {
      const decoded = jwt.verify(token, this.jwtKey);

      if (!isAuthenticatorData(decoded)) {
        throw new UnauthorizedError('XXX');
      }

      return decoded;
    } catch {
      throw new UnauthorizedError('XXX');
    }
  }
}
