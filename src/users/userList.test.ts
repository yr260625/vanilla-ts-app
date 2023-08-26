import { IUserRepository } from 'src/users/interfaces/userRepostitory';
import { UserList } from 'src/users/userList';
import { UserRepository } from 'src/users/userRepostitory';
import { TableBuilder } from 'src/utils/tableBuilder';
vitest.mock('src/utils/tableBuilder');

describe('UserList 正常系', (): void => {
  test('setupPage', async () => {
    /**
     * 準備
     */
    // モック UserRepository
    const mockedRepository: IUserRepository = new UserRepository();
    mockedRepository.fetchAll = vitest.fn().mockImplementation(async () => {
      return Promise.resolve([
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          bloodType: 'A',
        },
      ]);
    });

    // モック TableBuilder
    const tbSpy = vi.spyOn(TableBuilder.prototype, 'create');
    tbSpy.mockReturnValue(document.createElement('table'));

    // モック DOM
    document.body.innerHTML = `<div id="user-list__table-container"></div>`;

    // テスト対象オブジェクト生成
    const userList = new UserList(mockedRepository);

    /**
     * 実行
     */
    const response = userList.setupPage();

    /**
     * 確認
     */
    await expect(response).resolves.toBe(undefined);
    expect(mockedRepository.fetchAll).toHaveBeenCalledTimes(1);
    expect(TableBuilder.prototype.create).toHaveBeenCalledTimes(1);
    expect(document.body.innerHTML).toContain('<table>');
  });
});

describe('UserList 異常系', () => {
  test('fetchAll', async () => {
    /**
     * 準備
     */
    // モック UserRepository
    const mockedRepository: IUserRepository = new UserRepository();
    mockedRepository.fetchAll = vitest.fn().mockImplementation(async () => {
      return Promise.reject('rejected');
    });
    const userList = new UserList(mockedRepository);

    // テスト実行
    const response = userList.setupPage();
    await expect(response).rejects.toThrow(/rejected/);
    expect(mockedRepository.fetchAll).toHaveBeenCalledTimes(1);
  });

  test('appendUserTable', async () => {
    /**
     * 準備
     */
    // モック UserRepository
    const mockedRepository: IUserRepository = new UserRepository();
    mockedRepository.fetchAll = vitest.fn().mockImplementation(async () => {
      return Promise.resolve([]);
    });
    const userList = new UserList(mockedRepository);
    document.body.innerHTML = `<div></div>`;

    /**
     * 実行
     */
    const response = userList.setupPage();

    /**
     * 確認
     */
    await expect(response).rejects.toThrowError("doesn't exists in page");
  });
});
