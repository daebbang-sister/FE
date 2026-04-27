"use client";

import { useCallback, useEffect, useState } from "react";
import {
  allDeleteWishListAPI,
  deleteWishListAPI,
  getWishListAPI,
  postWishListAPI,
} from "@/features/mypage/api";
import { PageResponse } from "@/shared/type/model";
import { WishListItem } from "@/features/mypage/model";

export function useGetWishlist(page?: number, size?: number) {
  const [data, setData] = useState<PageResponse<WishListItem> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getWishListAPI(page, size);
      // console.log(result);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "위시리스트를 불러오지 못했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchWishlist,
  };
}

export function usePostWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addWishlist = async (productId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await postWishListAPI(productId);
      return response;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "위시리스트 추가 중 오류가 발생했습니다.";

      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addWishlist,
    isLoading,
    error,
  };
}

export function useDeleteWishlist(ids: number[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteWishlist = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await deleteWishListAPI(ids);
      return response;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "선택한 위시리스트 삭제 중 오류가 발생했습니다.";

      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteWishlist,
    isLoading,
    error,
  };
}

export function useAllDeleteWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allDeleteWishlist = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await allDeleteWishListAPI();
      return response;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "위시리스트 전체 삭제 중 오류가 발생했습니다.";

      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    allDeleteWishlist,
    isLoading,
    error,
  };
}
