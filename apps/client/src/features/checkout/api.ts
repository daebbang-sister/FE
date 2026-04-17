import { CartItem } from "@/features/cart/model";
import { Address } from "@/features/checkout/model";
import request from "@/shared/lib/request";

export const fetchAddresses = () =>
  request<Address[]>("/v1/addresses", { method: "GET" });

export const fetchPrepareOrder = (items: CartItem[], usedPoint: number) =>
  request<null>(
    "/v1/orders/prepare",
    {
      method: "POST",
      body: JSON.stringify({ items, usedPoint }),
    },
    "full"
  );

export const fetchConfirmOrder = (
  orderId: string,
  paymentKey: string,
  amount: number
) =>
  request<null>(
    "/v1/orders/confirm",
    {
      method: "POST",
      body: JSON.stringify({ orderId, paymentKey, amount }),
    },
    "full"
  );
