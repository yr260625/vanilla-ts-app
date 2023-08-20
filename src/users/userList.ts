import { IUserRepository, User } from 'src/users/interfaces/userRepostitory';
import { TableBuilder } from 'src/utils/tableBuilder';

export class UserList {
  // ユーザー一覧
  constructor(private userRepository: IUserRepository) {}

  /**
   * ユーザー一覧初期化
   */
  public async setupPage() {
    const users = await this.userRepository.fetchAll();
    const tableBuilder = new TableBuilder(this.getTableDom(), this.getTableRowDom());
    const usersTable = tableBuilder.create(
      users.map((user) => {
        return this.getUserForDisplay(user);
      }),
    );
    this.showUserTable(usersTable);
    this.setupEvent();
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

  private showUserTable(usersTable: HTMLElement) {
    const tableContainer = document.querySelector('#user-list__table-container')!;
    if (!tableContainer) {
      throw Error(`.user-list__table-container doesn't exists in page.`);
    }
    tableContainer.appendChild(usersTable);
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

  private getTableDom() {
    const domString = `
    <table class="user-list__table">
      <thead class="user-list__thead">
        <th class="user-list__th" name="id">ID</th>
        <th class="user-list__th" name="name">Name</th>
        <th class="user-list__th" name="email">E-mail</th>
        <th class="user-list__th" name="city">City</th>
        <th class="user-list__th" name="bloodType">BloodType</th>
        <th class="user-list__th" name="website">Website</th>
        <th class="user-list__th" name="controll"></th>
      </thead>
      <tbody class="user-list__tbody"></tbody>
    </table>`;

    const wrpperDom = document.createElement('div');
    wrpperDom.innerHTML = domString;

    return wrpperDom.querySelector('table')!;
  }

  private getTableRowDom() {
    const domString = `
    <tr id="user-list-template" class="user-list__tr hidden">
      <td class="user-list__td" name="id"></td>
      <td class="user-list__td" name="name"></td>
      <td class="user-list__td" name="email"></td>
      <td class="user-list__td" name="city"></td>
      <td class="user-list__td">
        <select name="bloodType">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="O">O</option>
          <option value="AB">AB</option>
        </select>
      </td>
      <td class="user-list__td">
        <div class="user-list__link" name="website"></div>
      </td>
      <td class="user-list__td" name="detail">
        <button class="user-detail">Delete</button>
      </td>
    </tr>`;

    const wrpperDom = document.createElement('table');
    wrpperDom.innerHTML = domString;

    return wrpperDom.querySelector('tr')!;
  }
}
