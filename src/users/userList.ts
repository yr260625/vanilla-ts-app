import { IUserRepository, User } from 'src/users/interfaces/userRepostitory';
import { BaseTable } from 'src/utils/tableBase';

export class UserList {
  // ユーザー一覧
  private users: Array<User> = [];
  private userTable = new BaseTable('user-list__table', 'user-list__tbody', 'user-list__tr');
  constructor(private userRepository: IUserRepository) {}

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
    this.setupEvent();
  }

  /**
   * ページ内イベント設定
   */
  private setupEvent() {
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
      website: user.website,
      city: user.address.city,
      bloodType: user.bloodType,
    };
  }
}
