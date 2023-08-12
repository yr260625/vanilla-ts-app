import { IProductRepository, Product } from 'src/products/interfaces/productRepostitory';

export class ProductRepository implements IProductRepository {
  public async fetchById(productId: number): Promise<Product> {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    return await response.json();
  }

  public async fetchByCartId(cartId: number) {
    const response = await fetch(`http://localhost:3000/products/?cartId=${cartId}`);
    return await response.json();
  }
}
