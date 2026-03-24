import request from "@/shared/lib/request";
import { MainProduct } from "./model";

export const getMainNewProducts = (limit: number): Promise<MainProduct[]> =>
  request<MainProduct[]>(`/v1/products/main/new?limit=${limit}`, {
    method: "GET",
  });

export const getMainProducts = (
  categoryId: number,
  limit: number
): Promise<MainProduct[]> =>
  request<MainProduct[]>(
    `/v1/products/main/category/${categoryId}?limit=${limit}`,
    {
      method: "GET",
    }
  );
