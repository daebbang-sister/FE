import {
  Address,
  PrepareOrderData,
  PrepareOrderRequest,
} from "@/features/checkout/model";
import request from "@/shared/lib/request";

export const fetchAddresses = () =>
  request<Address[]>("/v1/addresses", { method: "GET" });

export const fetchPrepareOrder = (payload: PrepareOrderRequest) =>
  request<PrepareOrderData>("/v1/orders/prepare", {
    method: "POST",
    body: JSON.stringify(payload),
  });

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
