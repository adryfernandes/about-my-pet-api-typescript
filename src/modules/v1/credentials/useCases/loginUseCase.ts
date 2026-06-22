import { UserRepository } from 'about-my-pet-db-postgres';

class LoginUseCase {
  constructor(private readonly repository = new UserRepository()) {}

  async execute(): Promise<void> {}
}

export default new LoginUseCase();
