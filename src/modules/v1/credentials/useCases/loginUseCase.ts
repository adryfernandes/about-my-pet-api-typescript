import { UserRepository } from 'about-my-pet-db-postgres';
import type { UserModel } from 'about-my-pet-db-postgres';

class LoginUseCase {
  constructor(private readonly repository = new UserRepository()) {}

  async execute(): Promise<UserModel[]> {
    return await this.repository.findAll();
  }
}

export default new LoginUseCase();
