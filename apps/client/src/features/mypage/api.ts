import request from "@/shared/lib/request";
import {
  MyPoints,
  MyPointsHistory,
  PostAddressRequest,
  UpdateUserInfo,
  UpdateUserProfileRequest,
  UserAdressList,
  UserInfo,
  WishListCheck,
  WishListItem,
  WishListItemId,
} from "./model";
import { PageResponse } from "@/shared/type/model";
import {
  CreateReviewData,
  MyReviewList,
  UpdateReviewData,
} from "@/features/product/model";
import { PhoneNumber } from "@/features/auth/model";
import { ApiResponse } from "@repo/types";

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
  request<WishListItemId>("/v1/wish-lists", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });

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

export const getWishListCheckAPI = (
  productId: number
): Promise<WishListCheck> => {
  return request<WishListCheck>(`/v1/wish-lists/check?productId=${productId}`, {
    method: "GET",
  });
};

// review API #####
export const getMyReviewList = (
  page?: number,
  size?: number
): Promise<PageResponse<MyReviewList>> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.set("page", String(page));
  if (size !== undefined) params.set("size", String(size));

  return request<PageResponse<MyReviewList>>(
    `/v1/reviews/my?${params.toString()}`,
    {
      method: "GET",
    }
  );
};

export const deleteMyReview = (reviewId: number) =>
  request<null>(
    `/v1/reviews/${reviewId}`,
    {
      method: "DELETE",
    },
    "full"
  );

export const updateMyReview = (
  reviewId: number,
  data: UpdateReviewData,
  images: File[]
) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    })
  );
  images.forEach((file) => {
    formData.append("images", file);
  });
  return request(`/v1/reviews/${reviewId}`, {
    method: "PUT",
    body: formData,
  });
};

export const postMyReviewList = (
  orderDetailId: number,
  data: Omit<CreateReviewData, "orderDetailId">,
  images: File[]
) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob(
      [
        JSON.stringify({
          ...data,
          orderDetailId,
        }),
      ],
      { type: "application/json" }
    )
  );
  images.forEach((file) => {
    formData.append("images", file);
  });
  return request(`/v1/reviews`, {
    method: "POST",
    body: formData,
  });
};

// point API #####
export const getMyPointsAPI = (): Promise<MyPoints> => {
  return request<MyPoints>(`/v1/points/me`, {
    method: "GET",
  });
};

export const getMyPointsHistoryAPI = (
  page?: number,
  size?: number
): Promise<PageResponse<MyPointsHistory>> => {
  const params = new URLSearchParams();
  if (page !== undefined) params.set("page", String(page));
  if (size !== undefined) params.set("size", String(size));

  return request<PageResponse<MyPointsHistory>>(
    `/v1/points/me/history?${params.toString()}`,
    {
      method: "GET",
    }
  );
};

// profile API #####
export const getUserProfileAPI = (): Promise<UpdateUserInfo> => {
  return request<UpdateUserInfo>(`/v1/users/me/edit`, {
    method: "GET",
  });
};
export const updateUserProfileAPI = (
  payload: UpdateUserProfileRequest
): Promise<ApiResponse<null>> =>
  request<null>(
    `/v1/users/me`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    "full"
  );
export const profileSmsSend = (
  userData: PhoneNumber
): Promise<ApiResponse<null>> =>
  request<null>(
    "/v1/sms/send/change",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  );
export const deleteUserAPI = () =>
  request<null>(
    `/v1/users`,
    {
      method: "DELETE",
    },
    "full"
  );

// adress API #####
export const getUserAddressAPI = (): Promise<UserAdressList[]> => {
  return request<UserAdressList[]>(`/v1/addresses`, {
    method: "GET",
  });
};
export const postAddressAPI = (body: PostAddressRequest) =>
  request<null>("/v1/addresses", {
    method: "POST",
    body: JSON.stringify(body),
  });
export const updateAddressAPI = (addressId: number, body: PostAddressRequest) =>
  request<null>(`/v1/addresses/${addressId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
export const deleteAddressAPI = (addressId: number) =>
  request<null>(
    `/v1/addresses/${addressId}`,
    {
      method: "DELETE",
    },
    "full"
  );
