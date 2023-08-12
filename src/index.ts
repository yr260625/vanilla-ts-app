import { TabList } from 'src/utils/tabBase';
import { UserRepository } from 'src/users/userRepostitory';
import { UserList } from 'src/users/userList';
import { FileRepository } from 'src/files/fileRepostitory';
import { FileTree } from 'src/files/fileTree';
import { ProductRepository } from 'src/products/productRepostitory';
import { Cart } from 'src/products/cart';

window.addEventListener('load', () => {
  // ユーザー一覧
  const users = new UserList(new UserRepository());
  users.setupPage();

  // ファイル一覧
  const files = new FileTree(new FileRepository());
  files.setupPage();

  // 商品カート
  const cart = new Cart(new ProductRepository());
  cart.setupPage();

  //　タブ切り替えイベント設定
  const tabList = new TabList();
  tabList.setupPage();
});
