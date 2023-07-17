export class Counter {
  constructor(private counter = 0) {}

  private async embedComponent() {
    const response = await fetch('/page/counter.html');
    const data = await response.text();
    const targetDom = document.querySelector<HTMLElement>('#counter')!;
    targetDom.innerHTML = data;
  }

  public async setupPage() {
    await this.embedComponent();
    this.setupEvent();
  }

  private setupEvent() {
    const countUpButton = document.querySelector<HTMLButtonElement>('#countup')!;
    countUpButton.addEventListener('click', () => {
      this.counter++;
      countUpButton.innerHTML = `count is ${this.counter}`;
    });
  }
}
