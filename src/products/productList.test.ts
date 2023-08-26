import { IProductRepository } from 'src/products/interfaces/productRepostitory';
import { ProductRepository } from 'src/products/productRepostitory';
import { ProductList } from 'src/products/productList';
import { TableBuilder } from 'src/utils/tableBuilder';
vitest.mock('src/utils/tableBuilder');

describe('Products 正常系', (): void => {
  test('setupPage', async () => {
    /**
     * 準備
     */
    // モック ProductRepository
    const mockedRepository: IProductRepository = new ProductRepository();
    mockedRepository.fetchByCartId = vitest.fn().mockImplementation(async () => {
      return Promise.resolve([
        {
          cartId: 1,
          productId: 0,
          productName: 'product_0',
          quantity: 5,
          price: 1000,
          taxedPrice: 1100,
          coupon: 'B',
          setId: null,
        },
        {
          cartId: 1,
          productId: 1,
          productName: 'product_1',
          quantity: 9,
          price: 2000,
          taxedPrice: 2200,
          coupon: '',
          setId: null,
        },
      ]);
    });

    // モック TableBuilder
    const tbSpy = vi.spyOn(TableBuilder.prototype, 'create');
    tbSpy.mockReturnValue(document.createElement('table'));

    // モック DOM
    document.body.innerHTML = `<div id="product-list__table-container"></div>`;

    // テスト対象オブジェクト生成
    const products = new ProductList(mockedRepository);

    /**
     * 実行
     */
    const response = products.setupPage();

    /**
     * 確認
     */
    await expect(response).resolves.toBe(undefined);
    expect(mockedRepository.fetchByCartId).toHaveBeenCalledTimes(1);
    expect(TableBuilder.prototype.create).toHaveBeenCalledTimes(1);
    expect(document.body.innerHTML).toContain('<table>');
  });

  describe('Products 異常系', () => {
    test('fetchByCartId', async () => {
      /**
       * 準備
       */
      // モック ProductRepository
      const mockedRepository: IProductRepository = new ProductRepository();
      mockedRepository.fetchByCartId = vitest.fn().mockImplementation(async () => {
        return Promise.reject('rejected');
      });
      const products = new ProductList(mockedRepository);

      // テスト実行
      const response = products.setupPage();
      await expect(response).rejects.toThrow(/rejected/);
      expect(mockedRepository.fetchByCartId).toHaveBeenCalledTimes(1);
    });

    test('appendUserTable', async () => {
      /**
       * 準備
       */
      // モック ProductRepository
      const mockedRepository: IProductRepository = new ProductRepository();
      mockedRepository.fetchByCartId = vitest.fn().mockImplementation(async () => {
        return Promise.resolve([]);
      });
      const products = new ProductList(mockedRepository);
      document.body.innerHTML = `<div></div>`;

      /**
       * 実行
       */
      const response = products.setupPage();

      /**
       * 確認
       */
      await expect(response).rejects.toThrowError("doesn't exists in page");
    });
  });
});
