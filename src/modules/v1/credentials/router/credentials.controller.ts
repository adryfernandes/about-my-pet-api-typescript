class CredentialsController {
  async findAll(req, res) {
    res.status(200).json({
      message: 'Rota de credenciais funcionando',
    });
  }
}

export default new CredentialsController();
