import { IProductRepository, ProductInCart } from 'src/products/interfaces/productRepostitory';
import { TableDom } from 'src/utils/TableDom';

export class Cart {
  // ユーザー一覧
  private products: Array<ProductInCart> = [];
  private productsTable = new TableDom(
    'product-list__table',
    'product-list__tbody',
    'product-list__tr',
  );
  constructor(private productRepository: IProductRepository) {}

  /**
   * ユーザー一覧初期化
   */
  public async setupPage() {
    this.products = await this.productRepository.fetchByCartId(1);
    this.productsTable.init();
    this.productsTable.create(
      this.products.map((product) => {
        return this.getUserForDisplay(product);
      }),
    );
    this.productsTable.show();
    this.setupProductTable();
    this.setupEvent();
  }

  private setupProductTable() {
    this.products.forEach((product, index) => {
      const targetRow = document.querySelector<HTMLElement>(`.product-list__tr[rowId="${index}"]`);
      targetRow!
        .querySelector<HTMLElement>('[name=product-detail')
        ?.setAttribute('productId', product.productId.toString());
    });
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
  private getUserForDisplay(elm: ProductInCart) {
    return {
      id: elm.productId.toString().padStart(3, '0'),
      productName: elm.productName,
      quantity: elm.quantity.toString(),
      price: elm.price,
      taxedPrice: elm.taxedPrice,
      coupon: elm.coupon,
    };
  }
}
