import { TabList } from 'src/utils/tab-base';
import { UserRepository } from 'src/users/user-repostitory';
import { UserTable } from 'src/users/user-list';

window.addEventListener('load', () => {
  // ユーザー一覧
  const table = new UserTable(new UserRepository());
  table.setupPage();

  //　タブ切り替えイベント設定
  const tabList = new TabList();
  tabList.setupPage();
});
