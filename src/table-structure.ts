type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export class TableStructure {
  constructor(private users: Array<User> = []) {}

  public async setupPage() {
    await this.createUserTable();
  }

  public async createUserTable() {
    this.users = await this.fetchUsers();
    this.users.forEach((user) => {
      const clonedRow = document
        .querySelector('.user-list-tempalate-row')!
        .cloneNode(true) as HTMLElement;
      const userForDisplay = this.getForDisplayUser(user);

      for (const [key, value] of Object.entries(userForDisplay)) {
        const colDom = clonedRow.querySelector(`[name=${key}]`);
        if (colDom) {
          clonedRow.querySelector(`[name=${key}]`)!.textContent = String(value);
        }
      }
      const appendTargetDom = document.querySelector('.user-list-body');
      if (appendTargetDom) {
        clonedRow.classList.remove('user-list-tempalate-row');
        appendTargetDom.appendChild(clonedRow);
      }
    });
  }

  private getForDisplayUser(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    };
  }

  public async fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();
    return json;
  }
}
