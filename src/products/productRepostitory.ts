import { IProductRepository } from 'src/products/interfaces/productRepostitory';

export class ProductRepository implements IProductRepository {
  public async fetchByCartId(cartId: number) {
    const response = await fetch(`http://localhost:3000/products/?cartId=${cartId}`);
    return await response.json();
  }
}
