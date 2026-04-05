import { createQueryString } from "@/shared/lib/createQueryString";
import { CartQuery, CartListData } from "./model";
import request from "@/shared/lib/request";

export const fetchCart = (params?: CartQuery) =>
  request<CartListData>(
    `/v1/carts${createQueryString(params)}`,
    { method: "GET" },
    "full"
  );
