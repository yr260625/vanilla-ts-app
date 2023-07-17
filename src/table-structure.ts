export class TableStructure {
  constructor() {}

  public async embedComponent() {
    const response = await fetch('/templates/table.html');
    const data = await response.text();
    const targetDom = document.querySelector<HTMLElement>('#table-structure')!;
    targetDom.innerHTML = data;
  }

  public async setupPage() {
    await this.embedComponent();
  }
}
