import { createQueryString } from "@/shared/lib/createQueryString";
import { CartQuery, CartListData, ProductOptionsData } from "./model";
import request from "@/shared/lib/request";

export const fetchCart = (params?: CartQuery) =>
  request<CartListData>(
    `/v1/carts${createQueryString(params)}`,
    { method: "GET" },
    "full"
  );

export const fetchDeleteAllCarts = () =>
  request<null>("/v1/carts/all", { method: "DELETE" }, "full");

export const fetchDeleteCarts = (ids: number[]) =>
  request<null>(
    `/v1/carts?${ids.map((id) => `ids=${id}`).join("&")}`,
    { method: "DELETE" },
    "full"
  );

export const fetchUpdateCart = (
  cartId: number,
  quantity: number,
  productDetailsId: number
) =>
  request<null>(
    `/v1/carts/${cartId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ quantity, productDetailsId }),
    },
    "full"
  );

export const getProductOptions = (productId: number) =>
  request<ProductOptionsData>(`/v1/products/${productId}/options`, {
    method: "GET",
  });

export const fetchAddCart = (productDetailId: number, quantity: number) =>
  request<null>(
    "/v1/carts",
    { method: "POST", body: JSON.stringify([{ productDetailId, quantity }]) },
    "full"
  );
