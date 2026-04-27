export type UserInfo = {
  id: number;
  provider: string;
  loginId: string;
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
  createdAt: string;
  lastLoginAt: string | null;
};

export type WishListItem = {
  wishListId: number;
  productId: number;
  mainImageUrl: string;
  productName: string;
  originalPrice: number;
  discountRate: number | null;
  sellingPrice: number;
};

export type WishListItemId = {
  wishId: number;
};

export type WishListCheck = {
  wishId: number | null;
  isWished: boolean;
};
