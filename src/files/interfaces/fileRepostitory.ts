export type File = {
  index: number;
  type: number;
  path: string;
  name: string;
};

export interface IFileRepository {
  fetchAll(): Promise<Array<File>>;
}
