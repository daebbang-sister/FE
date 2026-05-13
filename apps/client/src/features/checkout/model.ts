export type Address = {
  addressId: number;
  alias: string;
  receiver: string;
  receiverPhoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
};

export type PrepareOrderItem = {
  productDetailId: number;
  quantity: number;
};

export type PrepareOrderRequest = {
  items: PrepareOrderItem[];
  usedPoint: number;
  receiver: string;
  receiverPhoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  shippingFee: number;
  orderNote: string | null;
  isAddToAddressBook: boolean;
  isDefaultAddress: boolean;
  addressAlias: string | null;
};

export type PrepareOrderData = {
  orderNumber: string;
  paymentAmount: number;
};

export type CheckoutItem = {
  productId: number;
  productName: string;
  mainImageUrl: string;
  originalPrice: number;
  discountRate: number | null;
  discountPrice: number;
  color: string;
  size: string;
  quantity: number;
  productDetailId: number;
};
