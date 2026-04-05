export type CartListData = {
  carts: CartItem[];
  nextCursor: number;
  hasNext: boolean;
};
export type CartItem = {
  cartId: number;
  productId: number;
  quantity: number;
  productName: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number | null;
  color: string;
  size: string;
  mainImageUrl: "string";
};
export type CartQuery = {
  cursor?: number;
  size?: number;
};
