export class UserRepository {
  public async fetchAll() {
    const response = await fetch('http://localhost:3000/users');
    return await response.json();
  }

  public async fetchById(id: number) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    return await response.json();
  }
}
