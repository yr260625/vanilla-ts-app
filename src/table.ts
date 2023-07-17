export class Counter {
  constructor(private counter = 0) {}

  private async embedComponent() {
    const response = await fetch('/page/counter.html');
    const data = await response.text();
    const appDom = document.querySelector<HTMLElement>('#app')!;
    appDom.innerHTML = data;
  }

  public async setupPage() {
    await this.embedComponent();
    this.setupEvent();
  }

  private setupEvent() {
    const countUpButton = document.querySelector<HTMLButtonElement>('#counter')!;
    countUpButton.addEventListener('click', () => {
      this.counter++;
      countUpButton.innerHTML = `count is ${this.counter}`;
    });
  }
}
