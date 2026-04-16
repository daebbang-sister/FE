export type WishListItem = {
  wishListId: number;
  productId: number;
  mainImageUrl: string;
  productName: string;
  originalPrice: number;
  discountRate: number | null;
  sellingPrice: number;
};
