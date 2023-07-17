export class TabBuilder {
  constructor(
    private tabId: string,
    private template: string,
  ) {}

  private async embedComponent() {
    const response = await fetch(this.template);
    const data = await response.text();
    const targetDom = document.querySelector<HTMLElement>(`#${this.tabId}`)!;
    targetDom.innerHTML = data;
  }

  public async setupPage() {
    await this.embedComponent();
  }
}
