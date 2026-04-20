import request from "@/shared/lib/request";
import { UserInfo, WishListItem } from "./model";
import { PageResponse } from "@/shared/type/model";

// userInfo API #####
export const fetchGetUser = () => {
  return request<UserInfo>(`/v1/users`, { method: "GET" });
};

// wishList API #####
export const getWishListAPI = (
  page?: number,
  size?: number
): Promise<PageResponse<WishListItem>> => {
  const params = new URLSearchParams();

  if (page !== undefined) params.set("page", String(page));
  if (size !== undefined) params.set("size", String(size));

  return request<PageResponse<WishListItem>>(
    `/v1/wish-lists?${params.toString()}`,
    { method: "GET" }
  );
};

export const postWishListAPI = (productId: number) =>
  request<null>(
    "/v1/wish-lists",
    {
      method: "POST",
      body: JSON.stringify({ productId }),
    },
    "full"
  );

export const deleteWishListAPI = (ids: number[]) => {
  const params = new URLSearchParams();
  ids.forEach((id) => {
    params.append("ids", String(id));
  });

  return request<null>(
    `/v1/wish-lists?${params.toString()}`,
    {
      method: "DELETE",
    },
    "full"
  );
};

export const allDeleteWishListAPI = () =>
  request<null>(
    "/v1/wish-lists/all",
    {
      method: "DELETE",
    },
    "full"
  );
