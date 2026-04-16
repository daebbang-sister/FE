import request from "@/shared/lib/request";
import { WishListItem } from "./model";
import { PageResponse } from "@/shared/type/model";

export const getWishList = (
  page?: number,
  size?: number
): Promise<PageResponse<WishListItem>> => {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("size", String(size));

  return request<PageResponse<WishListItem>>(
    `/v1/wish-lists?${params.toString()}`,
    { method: "GET" }
  );
};
