export class FileRepository {
  public async fetchAll() {
    const response = await fetch('http://localhost:3000/files');
    return await response.json();
  }
}
