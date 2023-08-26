import { IUserRepository } from 'src/users/interfaces/userRepostitory';

export class UserRepository implements IUserRepository {
  public async fetchAll() {
    const response = await fetch('http://localhost:3000/users');
    return await response.json();
  }
}
