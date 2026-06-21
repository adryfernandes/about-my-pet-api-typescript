import { ExceptionError } from '@/shared/errors';

class LoginUseCase {
  public async execute() {
    throw new ExceptionError('Erro de login');
    return 'Login realizado com sucesso';
  }
}

export default new LoginUseCase();
