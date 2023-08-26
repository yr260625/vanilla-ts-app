import { IFileRepository } from 'src/files/interfaces/fileRepostitory';

export class FileRepository implements IFileRepository {
  public async fetchAll() {
    const response = await fetch('http://localhost:3000/files');
    return await response.json();
  }
}
