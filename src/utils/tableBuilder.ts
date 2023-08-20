export class TableBuilder {
  private readonly tbody: HTMLElement;

  /**
   * コンストラクタ
   * @param tableClass tableタグクラス名
   * @param tbodyClass tbodyタグクラス名
   * @param trClass 　 trテンプレートクラス名
   */
  constructor(
    private readonly table: HTMLElement,
    private readonly tr: HTMLElement,
  ) {
    const tbody = table.querySelector<HTMLElement>(`tbody`);
    if (!tbody) {
      throw Error("tbody doesn't exists in page.");
    }
    this.tbody = tbody;
  }

  /**
   * テーブル初期化
   */
  public init() {
    this.tbody.innerHTML = '';
  }

  /**
   * テーブル生成
   */
  public create(list: Array<{ [key: string]: string }>) {
    list.forEach((row: { [key: string]: string }, index) => {
      const concreteRow = this.createConcreteRow(row);
      concreteRow.classList.remove('hidden');
      concreteRow.setAttribute('rowId', index.toString());
      this.tbody.appendChild(concreteRow);
    });

    return this.table;
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
    const clonedRow = this.tr.cloneNode(true) as HTMLElement;
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
