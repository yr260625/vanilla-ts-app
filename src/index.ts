import { TabList } from 'src/utils/tab-base';
import { UserRepository } from 'src/users/user-repostitory';
import { UserList } from 'src/users/user-list';
import { FileRepository } from 'src/files/file-repostitory';
import { FileTree } from 'src/files/file-tree';

window.addEventListener('load', () => {
  // ユーザー一覧
  const users = new UserList(new UserRepository());
  users.setupPage();

  // ユーザー一覧
  const files = new FileTree(new FileRepository());
  files.setupPage();

  //　タブ切り替えイベント設定
  const tabList = new TabList();
  tabList.setupPage();
});
