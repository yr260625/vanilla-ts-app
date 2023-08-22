import { IFileRepository, File } from 'src/files/interfaces/fileRepostitory';
import { TreeBuilder } from 'src/utils/treeBuilder';

export class FileTree {
  constructor(private fileRepository: IFileRepository) {}

  /**
   * ファイル一覧初期化
   */
  public async setupPage() {
    const treeBuilder = new TreeBuilder();
    const files = await this.fileRepository.fetchAll();
    const fileTree = treeBuilder.create(files.map((elm) => this.getFileForDisplay(elm)));
    this.appendFileTree(fileTree);
    this.setEvent();
  }

  /**
   * ファイルツリー 表示値生成
   * @param user
   * @returns 表示値
   */
  private getFileForDisplay(file: File) {
    return {
      type: file.type.toString(),
      path: file.path,
      basename: file.name,
    };
  }

  /**
   * 生成した商品一覧テーブルを画面に追加
   * @param fileTree ツリーDOM
   */
  private appendFileTree(fileTree: HTMLElement) {
    const treeContainer = document.querySelector('#file-list__root');
    if (!treeContainer) {
      throw Error(`file-list__root doesn't exists in page.`);
    }
    treeContainer.appendChild(fileTree);
  }

  /**
   * 各ノードにイベント設定
   */
  private setEvent() {
    // ディレクトリ
    document
      .querySelectorAll<HTMLElement>(`.file-list__nodeline[type='${TreeBuilder.NODE_TYPE.DIR}']`)
      .forEach((elm) => {
        elm.addEventListener('click', (e: Event) => {
          const target = e.currentTarget as HTMLElement;
          const path = target.getAttribute('path');
          const targetChildren = document.querySelectorAll(`[path='${path}'] > div`);
          targetChildren.forEach((elm) => {
            elm.classList.toggle('file-list__node--closed');
          });
          e.stopPropagation();
        });
      });

    // ファイル
    document
      .querySelectorAll<HTMLElement>(`.file-list__nodeline[type='${TreeBuilder.NODE_TYPE.FILE}']`)
      .forEach((elm) => {
        elm.addEventListener('click', (e: Event) => {
          const target = e.currentTarget as HTMLElement;
          const fileName = target.textContent;
          window.alert(`ダウンロード開始: ${fileName}`);
          e.stopPropagation();
        });
      });
  }
}
