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
export type UpdateUserInfo = {
  id: number | null;
  provider: string;
  loginId: string;
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
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

// profile models
export type UpdateUserProfileRequest = {
  password?: string;
  passwordConfirm?: string;
  phoneNumber?: string;
  email?: string;
};
