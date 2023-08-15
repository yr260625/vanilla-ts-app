import { IFileRepository, File } from 'src/files/interfaces/fileRepostitory';

export class FileTree {
  // ユーザー一覧
  private files: Array<File> = [];
  constructor(private fileRepository: IFileRepository) {}

  /**
   * ファイル一覧初期化
   */
  public async setupPage() {
    this.files = await this.fileRepository.fetchAll();
    this.makeTree();
    this.setEvent();
  }

  /**
   * ファイルツリー生成
   */
  private makeTree() {
    const root = document.querySelector('.file-list__root');
    for (let row of this.files) {
      // ディレクトリ、ファイルDOM生成
      const templateNode = this.createTemplateNode();
      const concreteNode = this.createConcreteNode(templateNode, this.getFileForDisplay(row));
      // 親に追加
      const parentDir = this.getParentDir(row);
      if (parentDir) {
        parentDir.appendChild(concreteNode);
        concreteNode.classList.add('file-list__node--closed');
      } else {
        root!.appendChild(concreteNode);
      }
    }
  }

  /**
   * ファイルツリー 表示値生成
   * @param user
   * @returns
   */
  private getFileForDisplay(file: File) {
    return {
      type: file.type.toString(),
      path: file.path,
      basename: file.name,
    };
  }

  /**
   * テーブルテンプレートノード生成
   * @param rowName テーブルテンプレート行に割り当てたクラス名
   * @returns
   */
  private createTemplateNode() {
    const templateNode = document.querySelector<HTMLElement>(`#file-node-template`);
    if (!templateNode) {
      throw Error(`.file-node-template doesn't exists in page.`);
    }

    return templateNode.cloneNode(true) as HTMLElement;
  }

  /**
   *  ノード生成
   * @param templateRow テーブルテンプレート行(DOM)
   * @param valueObject 列名と値の辞書オブジェクト
   * @returns
   */
  private createConcreteNode(clonedNode: HTMLElement, valueObject: { [key: string]: string }) {
    // ノード名設定
    const nodeName = clonedNode.querySelector('span');
    nodeName!.textContent = valueObject.basename;
    nodeName!.setAttribute('type', valueObject.type.toString());
    nodeName!.setAttribute('path', valueObject.path);
    nodeName!.style.setProperty('margin-left', `${valueObject.path.split('/').length - 2}rem`);

    // パス設定
    clonedNode.removeAttribute('id');
    clonedNode.setAttribute('path', valueObject.path);

    return clonedNode;
  }

  /**
   * 引数のファイルオブジェクトの親要素を取得
   * @param row ファイルオブジェクト
   * @returns
   */
  private getParentDir(row: File) {
    const reg = new RegExp(`/${row.name}$`);
    const parentDir = row.path.replace(reg, '');
    return document.querySelector(`[path='${parentDir}']`);
  }

  /**
   * 各ノードにイベント設定
   */
  private setEvent() {
    // ディレクトリ
    document.querySelectorAll<HTMLElement>(".file-list__nodeline[type='0']").forEach((elm) => {
      elm.addEventListener('click', (e: Event) => this.toggleDir(e));
    });

    // ファイル
    document.querySelectorAll<HTMLElement>(".file-list__nodeline[type='1']").forEach((elm) => {
      elm.addEventListener('click', (e: Event) => this.downloadFile(e));
    });
  }

  /**
   * ディレクトリ開閉
   * @param e Event
   */
  private toggleDir(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const path = target.getAttribute('path');
    const targetChildren = document.querySelectorAll(`[path='${path}'] > div`);
    targetChildren.forEach((elm) => {
      elm.classList.toggle('file-list__node--closed');
    });
    e.stopPropagation();
  }

  /**
   * ファイルダウンロード
   * @param e Event
   */
  private downloadFile(e: Event) {
    const target = e.currentTarget as HTMLElement;
    const fileName = target.textContent;
    window.alert(`ダウンロード開始: ${fileName}`);
    e.stopPropagation();
  }
}
