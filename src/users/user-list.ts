import { UserRepository } from 'src/users/user-repostitory';
import { BaseTable } from 'src/utils/table-base';

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

export class UserTable {
  // ユーザー一覧
  private users: User[] = [];
  private baseTable = new BaseTable();
  constructor(private userRepository: UserRepository) {}

  /**
   * ユーザー一覧初期化
   */
  public async setupPage() {
    this.users = await this.userRepository.fetchAll();
    this.initUserTable();
    this.createUserTable();
    this.showUserTable();
    this.setUpEvent();
  }

  /**
   * ユーザー一覧テーブル初期化
   */
  private initUserTable() {
    document.querySelector('.user-list__tbody')!.innerHTML = '';
  }
  /**
   * ユーザー一覧テーブル生成
   */
  private createUserTable() {
    this.users.forEach((user) => {
      const templateRow = this.baseTable.createTemplateRow('user-list__tr');
      const concreteRow = this.baseTable.createConcreteRow(
        templateRow,
        this.getForDisplayUser(user),
      );
      const appendTargetDom = document.querySelector<HTMLElement>('.user-list__tbody');
      concreteRow!.classList.remove('hidden');
      appendTargetDom!.appendChild(concreteRow!);
    });
  }

  private showUserTable() {
    const targetTableDom = document.querySelector<HTMLElement>('.user-list__table');
    targetTableDom!.classList.remove('hidden');
  }

  private setUpEvent() {
    document.querySelectorAll<HTMLElement>('.user-list__link').forEach((elm) => {
      elm.addEventListener('click', (e: Event) => {
        // 何某かのイベント
        console.log((e.currentTarget as HTMLInputElement).value);
      });
    });
  }

  /**
   * ユーザー一覧テーブル 表示値生成
   * @param user
   * @returns
   */
  private getForDisplayUser(user: User) {
    return {
      id: user.id.toString().padStart(3, '0'),
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    };
  }
}
