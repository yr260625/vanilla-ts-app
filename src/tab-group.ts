export class TabGroup {
  constructor(
    private switches = document.querySelectorAll<HTMLDivElement>('.tab-switch')!,
    private tabs = document.querySelectorAll<HTMLDivElement>('.tab-subgroup')!,
  ) {}

  public setupPage() {
    this.switches.forEach((elm) => elm.addEventListener('click', (e) => this.selectTab(e)));
  }

  public selectTab(e: MouseEvent) {
    const tabName = (e.currentTarget as HTMLDivElement).getAttribute('name')!;
    this.deactivateAll();
    this.activate(tabName);
  }

  private activate(tabName: string) {
    this.switches.forEach((elm: HTMLDivElement) => {
      if (tabName === elm.getAttribute('name')) {
        elm.classList.add('active');
      }
    });
    this.tabs.forEach((elm: HTMLDivElement) => {
      if (tabName === elm.getAttribute('name')) {
        elm.classList.add('active');
      }
    });
  }

  private deactivateAll() {
    this.switches.forEach((elm: HTMLDivElement) => elm.classList.remove('active'));
    this.tabs.forEach((elm: HTMLDivElement) => elm.classList.remove('active'));
  }
}
