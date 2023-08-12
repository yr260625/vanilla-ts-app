export type Product = {
  productId: number;
  productName: string;
  price: string;
  taxedPrice: string;
};

export type ProductInCart = {
  cartId: number;
  productId: number;
  productName: string;
  price: string;
  taxedPrice: string;
  quantity: number;
  coupon: string;
};

export interface IProductRepository {
  fetchById(productId: number): Promise<Product>;
  fetchByCartId(cartId: number): Promise<Array<ProductInCart>>;
}
