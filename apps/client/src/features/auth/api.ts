import request from "@/shared/lib/request";
import {
  UserFindId,
  UserFindPw,
  UserLogin,
  UserSignUp,
  PhoneNumber,
  PhoneVerify,
  FindIdResponse,
  LoginResPonse,
} from "./model";
import { ApiResponse } from "@repo/types";

export const loginUser = (
  userData: UserLogin
): Promise<ApiResponse<LoginResPonse>> =>
  request<LoginResPonse>(
    "/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  );

export const logoutUser = (): Promise<ApiResponse<null>> =>
  request<null>(
    "/v1/logout",
    {
      method: "DELETE",
    },
    "full"
  );

export const createUser = (userData: UserSignUp): Promise<ApiResponse<null>> =>
  request<null>(
    "/v1/users",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  );

export const userFindId = (
  params: UserFindId
): Promise<ApiResponse<FindIdResponse>> => {
  const query = new URLSearchParams({
    username: params.username,
    userEmail: params.userEmail,
  }).toString();

  return request<FindIdResponse>(
    `/v1/users/find/id?${query}`,
    { method: "GET" },
    "full"
  );
};

export const userFindPw = (userData: UserFindPw): Promise<ApiResponse<null>> =>
  request<null>(
    "/v1/users/find/password",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  );

export const smsSend = (userData: PhoneNumber): Promise<ApiResponse<null>> =>
  request<null>(
    "/v1/sms/send",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  );

export const smsVerify = (userData: PhoneVerify): Promise<ApiResponse<null>> =>
  request<null>(
    "/v1/sms/verify",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  );

export const duplicationCheckId = (
  loginId: string
): Promise<ApiResponse<null>> =>
  request<null>(
    `/v1/users/check/id?loginId=${encodeURIComponent(loginId)}`,
    { method: "GET" },
    "full"
  );
