import { HttpStatusCode } from 'axios';
import type { Request, Response } from 'express';
import { Route } from 'tsoa';

import loginUseCase from './useCases/loginUseCase';

@Route('credentials')
class CredentialsController {
  public login = async (_req: Request, res: Response): Promise<void> => {
    await loginUseCase.execute();

    res.sendStatus(HttpStatusCode.NoContent);
  };
}

export default new CredentialsController();
