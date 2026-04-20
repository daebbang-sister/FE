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
};

export type PrepareOrderData = {
  orderNumber: string;
  paymentAmount: number;
};
