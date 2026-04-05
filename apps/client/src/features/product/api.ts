import request from "@/shared/lib/request";
import { CategoryProduct, PageResponse } from "@/features/product/model";

export const getCategoryProducts = (
  categoryId: number,
  sortType: string,
  direction: string,
  page: number,
  size: number
): Promise<PageResponse<CategoryProduct>> =>
  request<PageResponse<CategoryProduct>>(
    `/v1/products/category/${categoryId}?sortType=${sortType}&direction=${direction}&page=${page}&size=${size}`,
    {
      method: "GET",
    }
  );
