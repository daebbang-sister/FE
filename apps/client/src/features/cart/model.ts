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
  checked: boolean;
};

export type CartQuery = {
  cursor?: number;
  size?: number;
};

export type ProductOption = {
  color: string;
  colorCode: string;
  sizes: {
    productDetailId: number;
    size: string;
    stock: number;
    soldOut: boolean;
  }[];
};

export type ProductOptionsData = ProductOption[];
