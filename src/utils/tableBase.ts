export class BaseTable {
  constructor(
    readonly tableClassName: string,
    readonly tableBodyName: string,
    readonly tableRowClassName: string,
  ) {}

  /**
   * テーブル初期化
   */
  public init() {
    document.querySelector(`.${this.tableBodyName}`)!.innerHTML = '';
  }

  /**
   * テーブル生成
   */
  public create(list: Array<{ [key: string]: string }>) {
    list.forEach((row: { [key: string]: string }) => {
      const templateRow = this.createTemplateRow();
      const concreteRow = this.createConcreteRow(templateRow, row);
      const appendTargetDom = document.querySelector<HTMLElement>(`.${this.tableBodyName}`);
      concreteRow!.classList.remove('hidden');
      appendTargetDom!.appendChild(concreteRow!);
    });
  }

  /**
   * テーブル表示
   */
  public show() {
    const targetTableDom = document.querySelector<HTMLElement>(`.${this.tableClassName}`);
    targetTableDom!.classList.remove('hidden');
  }

  /**
   * テーブルテンプレート行生成
   * @param rowName テーブルテンプレート行に割り当てたクラス名
   * @returns
   */
  private createTemplateRow(): Node {
    const templateRow = document.querySelector<HTMLElement>(`.${this.tableRowClassName}`);
    if (!templateRow) {
      throw Error(`.${this.tableRowClassName} doesn't exists in page.`);
    }
    return templateRow.cloneNode(true);
  }

  /**
   *  テーブル行生成
   * @param templateRow テーブルテンプレート行(DOM)
   * @param valueObject 列名と値の辞書オブジェクト
   */
  private createConcreteRow(templateRow: Node, valueObject: { [key: string]: string }) {
    const clonedRow = templateRow.cloneNode(true) as HTMLElement;
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
