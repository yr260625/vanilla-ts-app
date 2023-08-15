export class TabPages {
  // タブ切り替え
  private menus: NodeListOf<HTMLDivElement>;
  // タブ内コンテンツ
  private contents: NodeListOf<HTMLDivElement>;

  /**
   * コンストラクタ
   */
  constructor() {
    this.menus = document.querySelectorAll<HTMLDivElement>('.menu__item')!;
    this.contents = document.querySelectorAll<HTMLDivElement>('.contents__item')!;
  }

  /**
   * イベント設定
   */
  public setupPage() {
    this.menus.forEach((elm) => elm.addEventListener('click', (e) => this.selectTab(e)));
  }

  /**
   * タブ選択イベント
   * @param e MouseEvent
   */
  private selectTab(e: MouseEvent) {
    const tabName = (e.currentTarget as HTMLDivElement).getAttribute('name')!;
    this.deactivateAll();
    this.activate(tabName);
  }

  /**
   * 指定したNameを持つタブをアクティブ化
   */
  private activate(tabName: string) {
    this.menus.forEach((elm: HTMLDivElement) => {
      if (tabName === elm.getAttribute('name')) {
        elm.classList.add('menu__item--active');
      }
    });
    this.contents.forEach((elm: HTMLDivElement) => {
      if (tabName === elm.getAttribute('name')) {
        elm.classList.add('contents__item--active');
      }
    });
  }

  /**
   * 全タブを非アクティブ化
   */
  private deactivateAll() {
    this.menus.forEach((elm: HTMLDivElement) => elm.classList.remove('menu__item--active'));
    this.contents.forEach((elm: HTMLDivElement) => elm.classList.remove('contents__item--active'));
  }
}
