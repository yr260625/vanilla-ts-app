export class TableDom {
  public readonly table: HTMLElement;
  public readonly tBody: HTMLElement;
  public readonly tRow: HTMLElement;

  /**
   * コンストラクタ
   * @param tableClass tableタグクラス名
   * @param tbodyClass tbodyタグクラス名
   * @param trClass 　 trテンプレートクラス名
   */
  constructor(tableClass: string, tbodyClass: string, trClass: string) {
    const table = document.querySelector<HTMLElement>(`.${tableClass}`);
    const tBody = document.querySelector<HTMLElement>(`.${tbodyClass}`);
    const tRow = document.querySelector<HTMLElement>(`.${trClass}`);

    /* 指定されたDOMが存在しない場合はエラー */
    if (!table) {
      throw Error(`.${tableClass} doesn't exists in page.`);
    }
    if (!tBody) {
      throw Error(`.${tbodyClass} doesn't exists in page.`);
    }
    if (!tRow) {
      throw Error(`.${trClass} doesn't exists in page.`);
    }

    this.table = table;
    this.tBody = tBody;
    this.tRow = tRow;
  }

  /**
   * テーブル初期化
   */
  public init() {
    this.tBody.innerHTML = '';
  }

  /**
   * テーブル生成
   */
  public create(list: Array<{ [key: string]: string }>) {
    list.forEach((row: { [key: string]: string }, index) => {
      const concreteRow = this.createConcreteRow(row);
      concreteRow.classList.remove('hidden');
      concreteRow.setAttribute('rowId', index.toString());
      this.tBody.appendChild(concreteRow);
    });
  }

  /**
   * テーブル表示
   */
  public show() {
    this.table.classList.remove('hidden');
  }

  /**
   *  テーブル行生成
   * @param templateRow テーブルテンプレート行(DOM)
   * @param valueObject 列名と値の辞書オブジェクト
   */
  private createConcreteRow(valueObject: { [key: string]: string }) {
    const clonedRow = this.tRow.cloneNode(true) as HTMLElement;
    for (const [key, value] of Object.entries(valueObject)) {
      const inputCol = clonedRow.querySelector<HTMLInputElement>(`input[name=${key}]`);
      if (inputCol) {
        inputCol.value = String(value);
        continue;
      }
      const selectCol = clonedRow.querySelector<HTMLInputElement>(`select[name=${key}]`);
      if (selectCol) {
        selectCol.value = String(value);
        continue;
      }
      const tdCol = clonedRow.querySelector<HTMLElement>(`[name=${key}]`);
      if (tdCol) {
        tdCol.textContent = String(value);
        continue;
      }
    }
    return clonedRow;
  }
}
