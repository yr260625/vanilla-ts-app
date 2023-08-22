import { TabBuilder } from 'src/utils/tabBuilder';
import { UserRepository } from 'src/users/userRepostitory';
import { UserList } from 'src/users/userList';
import { FileRepository } from 'src/files/fileRepostitory';
import { FileTree } from 'src/files/fileTree';
import { ProductRepository } from 'src/products/productRepostitory';
import { Products } from 'src/products/products';

window.addEventListener('load', () => {
  // ユーザー一覧
  const users = new UserList(new UserRepository());
  users.setupPage();

  // ファイル一覧
  const files = new FileTree(new FileRepository());
  files.setupPage();

  // 商品一覧
  const products = new Products(new ProductRepository());
  products.setupPage();

  //　タブ切り替えイベント設定
  const tabBuilder = new TabBuilder();
  tabBuilder.setupPage();
});
