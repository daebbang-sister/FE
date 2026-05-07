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

// wish models
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

// points models
export type MyPoints = {
  currentAmount: number;
  totalEarned: number;
  totalUsed: number;
};
export type MyPointsHistory = {
  id: number;
  createdAt: string;
  changeType: string;
  changeTypeDescription: string;
  earn: boolean;
  policyName: string;
  referenceId: number | null;
  changeAmount: number;
  pointAmount: number;
  description: string;
  expiredAt: string;
};
