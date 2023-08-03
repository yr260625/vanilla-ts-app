export class BaseTable {
  constructor() {}

  /**
   * ユーザーテーブル初期化
   */
  public async createUserTable() {}

  /**
   * 第一引数のクラス名のテーブルテンプレート行をcloneする
   * @param rowName テーブルテンプレート行に割り当てたクラス名
   * @returns
   */
  public createTemplateRow(rowClassName: string): Node {
    const templateRow = document.querySelector<HTMLElement>(`.${rowClassName}`);
    if (!templateRow) {
      throw Error(`.${rowClassName} doesn't exists in page.`);
    }
    return templateRow.cloneNode(true);
  }

  /**
   *  第一引数のテーブルテンプレート行(DOM)に、列名に対応する値を挿入して返却する
   * @param templateRow テーブルテンプレート行(DOM)
   * @param valueObject 列名と値の辞書オブジェクト
   */
  public createConcreteRow(templateRow: Node, valueObject: { [key: string]: string }) {
    const clonedRow = templateRow.cloneNode(true) as HTMLElement;
    for (const [key, value] of Object.entries(valueObject)) {
      const tdCol = clonedRow.querySelector<HTMLElement>(`[name=${key}]`);
      const inputCol = clonedRow.querySelector<HTMLInputElement>(`[name=${key}]`);
      if (tdCol) tdCol.textContent = String(value);
      if (inputCol) inputCol.value = String(value);
    }
    return clonedRow;
  }
}
