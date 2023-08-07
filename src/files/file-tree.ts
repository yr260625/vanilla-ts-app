import { FileRepository } from 'src/files/file-repostitory';

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

  private createNodeName(row: File) {
    const nodeName = document.createElement('span')!;
    nodeName.textContent = row.name;
    nodeName.classList.add('file-list__nodename');
    const indentNum = row.path.split('/').length - 2;
    nodeName.style.setProperty('text-indent', `${indentNum}rem`);
    return nodeName;
  }

  private createNode(nodeName: HTMLSpanElement, row: File) {
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

  private getParentDir(row: File) {
    const reg = new RegExp(`/${row.name}$`);
    const parentDir = row.path.replace(reg, '');
    return document.querySelector(`[path='${parentDir}']`);
  }

  private setEvent() {
    document.querySelectorAll<HTMLElement>(".file-list__node[type='0']").forEach((elm) => {
      elm.addEventListener('click', (e: Event) => this.toggleDir(e));
    });
    document.querySelectorAll<HTMLElement>(".file-list__node[type='1']").forEach((elm) => {
      elm.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const fileName = target.querySelector('span.file-list__nodename')!.textContent;
        console.log(`ダウンロード開始: ${fileName}`);
        e.stopPropagation();
      });
    });
  }

  private toggleDir(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const path = target.getAttribute('path');
    const targetChildren = document.querySelectorAll(`[path='${path}'] > div`);
    targetChildren.forEach((elm) => {
      elm.classList.toggle('file-list__node--closed');
    });
    e.stopPropagation();
  }
}
