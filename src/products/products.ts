import { IProductRepository, ProductInProduct } from 'src/products/interfaces/productRepostitory';
import { TableBuilder } from 'src/utils/tableBuilder';

export class Products {
  constructor(private productRepository: IProductRepository) {}

  /**
   * 商品一覧初期化
   */
  public async setupPage() {
    const products = await this.productRepository.fetchByCartId(1);
    const tableBuilder = new TableBuilder(this.getTableDom(), this.getTableRowDom());
    const productsTable = tableBuilder.create(
      products.map((product) => {
        return this.getProductForDisplay(product);
      }),
    );
    this.showProductsTable(productsTable);
    this.setupEvent();
  }

  // private setupProductTable() {
  //   this.products.forEach((product, index) => {
  //     const targetRow = document.querySelector<HTMLElement>(`.product-list__tr[rowId="${index}"]`);
  //     targetRow!
  //       .querySelector<HTMLElement>('[name=product-detail')
  //       ?.setAttribute('productId', product.productId.toString());
  //   });
  // }

  private showProductsTable(productsTable: HTMLElement) {
    const tableContainer = document.querySelector('#product-list__table-container')!;
    if (!tableContainer) {
      throw Error(`.user-list__table-container doesn't exists in page.`);
    }
    tableContainer.appendChild(productsTable);
  }

  /**
   * ページ内イベント設定
   */
  private setupEvent() {
    document.querySelectorAll<HTMLElement>('[name=coupon]').forEach((elm) => {
      elm.addEventListener('change', (e: Event) => {
        // 何某かのイベント
        console.log('クーポン変更');
        console.log((e.currentTarget as HTMLInputElement).value);
      });
    });

    document.querySelectorAll<HTMLElement>('[name=product-detail').forEach((elm) => {
      elm.addEventListener('click', (e: Event) => {
        // 何某かのイベント
        console.log('商品詳細');
        const targetProductId = (e.currentTarget as HTMLInputElement).getAttribute('productId');
        console.log(targetProductId);
      });
    });
  }

  /**
   * ユーザー一覧テーブル 表示値生成
   * @param user
   * @returns
   */
  private getProductForDisplay(elm: ProductInProduct) {
    return {
      id: elm.productId.toString().padStart(3, '0'),
      productName: elm.productName,
      quantity: elm.quantity.toString(),
      price: elm.price,
      taxedPrice: elm.taxedPrice,
      coupon: elm.coupon,
    };
  }

  private getTableDom() {
    const domString = `
    <table class="product-list__table">
      <thead class="product-list__thead">
        <th class="product-list__th">ID</th>
        <th class="product-list__th">Product Name</th>
        <th class="product-list__th"></th>
        <th class="product-list__th">Quantity</th>
        <th class="product-list__th">Price</th>
        <th class="product-list__th">Price<br />(taxed)</th>
        <th class="product-list__th">Subtotal</th>
        <th class="product-list__th">Coupon</th>
        <th class="product-list__th"></th>
      </thead>
      <tbody class="product-list__tbody"></tbody>
    </table>`;

    const wrpperDom = document.createElement('div');
    wrpperDom.innerHTML = domString;
    return wrpperDom.querySelector('table')!;
  }

  private getTableRowDom() {
    const domString = `
    <tr id="product-list-template" class="product-list__tr hidden">
      <td class="product-list__td" name="id"></td>
      <td class="product-list__td" name="productName"></td>
      <td class="product-list__td">
        <button name="product-detail">Detail</button>
      </td>
      <td class="product-list__td">
        <select name="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td class="product-list__td" name="price"></td>
      <td class="product-list__td" name="taxedPrice"></td>
      <td class="product-list__td" name="Subtotal"></td>
      <td class="product-list__td">
        <select name="coupon">
          <option value=""></option>
          <option value="A">coupon A</option>
          <option value="B">coupon B</option>
          <option value="C">coupon C</option>
        </select>
      </td>
      <td class="product-list__td">
        <button class="product-delete">Delete</button>
      </td>
    </tr>`;

    const wrpperDom = document.createElement('table');
    wrpperDom.innerHTML = domString;
    return wrpperDom.querySelector('tr')!;
  }
}
