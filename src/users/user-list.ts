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

export class UserList {
  // ユーザー一覧
  private users: User[] = [];
  private userTable = new BaseTable('user-list__table', 'user-list__tbody', 'user-list__tr');
  constructor(private userRepository: UserRepository) {}

  /**
   * ユーザー一覧初期化
   */
  public async setupPage() {
    this.users = await this.userRepository.fetchAll();
    this.userTable.init();
    this.userTable.create(
      this.users.map((user) => {
        return this.getUserForDisplay(user);
      }),
    );
    this.userTable.show();
    this.setUpEvent();
  }

  /**
   * ページ内イベント設定
   */
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
  private getUserForDisplay(user: User) {
    return {
      id: user.id.toString().padStart(3, '0'),
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      city: user.address.city,
    };
  }
}
