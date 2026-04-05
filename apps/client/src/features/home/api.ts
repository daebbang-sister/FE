import { MainProduct } from "./model";
import { ApiResponse } from "@repo/types";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  throw new Error("환경 변수가 없습니다");
}

export const getMainNewProducts = async (
  limit: number
): Promise<MainProduct[]> => {
  const res = await fetch(
    `${getBaseUrl()}/api/proxy/v1/products/main/new?limit=${limit}`,
    { method: "GET", cache: "no-store" }
  );
  const data: ApiResponse<MainProduct[]> = await res.json();
  return data.data;
};

export const getMainProducts = async (
  categoryId: number,
  limit: number
): Promise<MainProduct[]> => {
  const res = await fetch(
    `${getBaseUrl()}/api/proxy/v1/products/main/category/${categoryId}?limit=${limit}`,
    { method: "GET", cache: "no-store" }
  );
  const data: ApiResponse<MainProduct[]> = await res.json();
  return data.data;
};
