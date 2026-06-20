import loginUseCase from './useCases/loginUseCase';

class CredentialsController {
  async findAll(req, res) {
    await loginUseCase.execute();

    return res.json({ message: 'Rota de login' });
  }
}

export default new CredentialsController();
