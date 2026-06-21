import type { Request, Response } from 'express';

import loginUseCase from './useCases/loginUseCase';

export const findAll = (req: Request, res: Response): Response => {
  loginUseCase.execute();

  return res.json({ message: 'Rota de login' });
};
