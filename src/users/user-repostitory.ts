export class UserRepository {
  public async fetchAll() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
  }

  public async fetchById(id: number) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return await response.json();
  }
}
