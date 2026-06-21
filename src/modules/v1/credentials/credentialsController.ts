import { HttpStatusCode } from 'axios';
import type { Request, Response } from 'express';
import { Route } from 'tsoa';

import loginUseCase from './useCases/loginUseCase';

@Route('credentials')
class CredentialsController {
  public loginTest = async (_req: Request, res: Response): Promise<void> => {
    const result = await loginUseCase.execute();

    res.status(HttpStatusCode.Ok).send(result);
  };
}

export default new CredentialsController();
