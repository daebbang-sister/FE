import request from "@/shared/lib/request";
import {
  CategoryProduct,
  MyReviewList,
  ProductDetail,
  ReviewList,
  ReviewSummary,
} from "@/features/product/model";
import { PageResponse } from "@/shared/type/model";

export const getNewProducts = (
  direction?: string,
  page?: number,
  size?: number
): Promise<PageResponse<CategoryProduct>> =>
  request<PageResponse<CategoryProduct>>(
    `/v1/products/new?direction=${direction}&page=${page}&size=${size}`,
    {
      method: "GET",
    }
  );

export const getCategoryProducts = (
  categoryId: number,
  sortType: string,
  direction: string,
  page: number,
  size: number
): Promise<PageResponse<CategoryProduct>> => {
  const params = new URLSearchParams();

  params.set("sortType", sortType);
  params.set("direction", direction);
  params.set("page", String(page));
  params.set("size", String(size));

  return request<PageResponse<CategoryProduct>>(
    `/v1/products/category/${categoryId}?${params.toString()}`,
    { method: "GET" }
  );
};

export const getProductDetail = (productId: number): Promise<ProductDetail> =>
  request<ProductDetail>(`/v1/products/${productId}`, {
    method: "GET",
  });

export const getProductSearch = (
  keyword: string,
  sortType?: string,
  direction?: string,
  page?: number,
  size?: number
): Promise<PageResponse<CategoryProduct>> => {
  const params = new URLSearchParams();

  params.set("keyword", keyword);
  if (sortType) params.set("sortType", sortType);
  if (direction) params.set("direction", direction);
  if (page !== undefined) params.set("page", String(page));
  if (size !== undefined) params.set("size", String(size));

  return request<PageResponse<CategoryProduct>>(
    `/v1/products/search?${params.toString()}`,
    { method: "GET" }
  );
};

export const getProductReviewCount = (
  productId: number
): Promise<ReviewSummary> =>
  request<ReviewSummary>(`/v1/products/${productId}/reviews/stats`, {
    method: "GET",
  });

export const getProductReviewList = (
  productId: number,
  page?: number,
  size?: number
): Promise<PageResponse<ReviewList>> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.set("page", String(page));
  if (size !== undefined) params.set("size", String(size));

  return request<PageResponse<ReviewList>>(
    `/v1/products/${productId}/reviews?${params.toString()}`,
    {
      method: "GET",
    }
  );
};
