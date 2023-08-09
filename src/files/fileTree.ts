import { FileRepository } from 'src/files/fileRepostitory';

type File = {
  index: number;
  type: number;
  path: string;
  name: string;
};

export class FileTree {
  // ユーザー一覧
  private files: File[] = [];
  constructor(private fileRepository: FileRepository) {}

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
      const nodeName = this.createNodeName(row);
      const node = this.createNode(nodeName, row);

      // 親に追加
      const parentDir = this.getParentDir(row);
      if (parentDir) {
        parentDir.appendChild(node);
      } else {
        root!.appendChild(node);
      }
    }
  }

  /**
   * アイコン、ノード名をラップするspan要素を生成
   * @param row ファイルオブジェクト
   * @returns アイコン、ノード名を含むdiv要素
   */
  private createNodeName(row: File) {
    // アイコン
    const icon = document.createElement('img');
    icon.setAttribute('src', `${row.type == 0 ? 'public/folder.svg' : 'public/file.svg'}`);
    icon.classList.add('file-list__nodeicon');

    // ノード名
    const nodeName = document.createElement('span');
    nodeName.textContent = row.name;

    // アイコン、ノード名をspanでラップ
    const wrapper = document.createElement('span');
    wrapper.appendChild(icon);
    wrapper.appendChild(nodeName);
    wrapper.classList.add('file-list__nodeline');
    wrapper.style.setProperty('margin-left', `${row.path.split('/').length - 2}rem`);

    return wrapper;
  }

  /**
   * ノード生成
   * @param nodeName ノード名を含むspan要素
   * @param row ファイルオブジェクト
   * @returns ファイルノードオブジェクト
   */
  private createNode(nodeName: HTMLElement, row: File) {
    const node = document.createElement('div')!;
    node.appendChild(nodeName);
    node.setAttribute('path', row.path);
    node.setAttribute('type', row.type.toString());
    node.classList.add('file-list__node');
    if (row.path !== '/root') {
      node.classList.add('file-list__node--closed');
    }
    return node;
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
    document.querySelectorAll<HTMLElement>(".file-list__node[type='0']").forEach((elm) => {
      elm.addEventListener('click', (e: Event) => this.toggleDir(e));
    });

    // ファイル
    document.querySelectorAll<HTMLElement>(".file-list__node[type='1']").forEach((elm) => {
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
    const fileName = target.querySelector('span.file-list__nodeline')!.textContent;
    window.alert(`ダウンロード開始: ${fileName}`);
    e.stopPropagation();
  }
}
