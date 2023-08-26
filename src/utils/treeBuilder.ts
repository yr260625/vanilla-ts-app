export class TreeBuilder {
  /**
   * ノード種別
   */
  static readonly NODE_TYPE = {
    DIR: 0,
    FILE: 1,
  };

  /**
   * ツリー生成
   * @param list ノード一覧
   * @returns ツリーDOM
   */
  public create(list: Array<{ [key: string]: string }>) {
    const wrapper = document.createElement('div');
    list.forEach((row) => {
      // ディレクトリ、ファイルDOM生成
      const templateNode = this.createTemplateNode();
      const concreteNode = this.createConcreteNode(templateNode, row);
      // 親に追加
      const parentDir = this.getParentDir(wrapper, row);
      if (parentDir) {
        parentDir.appendChild(concreteNode);
        concreteNode.classList.add('file-list__node--closed');
      } else {
        wrapper!.appendChild(concreteNode);
      }
    });

    return wrapper.querySelector('div')!;
  }

  /**
   * ノードテンプレート生成
   * @returns ノードテンプレートDOM
   */
  private createTemplateNode() {
    const domString = `
      <div id="file-node-template">
        <span class="file-list__nodeline"></span>
      </div>`;

    const wrpperDom = document.createElement('div');
    wrpperDom.innerHTML = domString;
    return wrpperDom.querySelector('div')!;
  }

  /**
   *  ノード生成
   * @param templateRow テーブルテンプレート行(DOM)
   * @param valueObject ノードオブジェクト
   * @returns ノードDOM
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
   * 第二引数のノードの親ノードを第一引数から取得
   * @param tree ツリーDOM
   * @param row  ノードオブジェクト
   * @returns 親ノードDOM
   */
  private getParentDir(tree: HTMLElement, row: { [key: string]: string }) {
    const reg = new RegExp(`/${row.basename}$`);
    const parentDir = row.path.replace(reg, '');
    return tree.querySelector(`[path='${parentDir}']`);
  }
}
