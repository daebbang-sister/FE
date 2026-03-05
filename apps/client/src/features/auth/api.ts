// auth.service.ts
import request from "../../shared/lib/request";
import { ApiResponse } from "packages/types/src";
import {
  UserFindId,
  UserFindPw,
  UserLogin,
  UserSignUp,
  PhoneNumber,
  PhoneVerify,
  FindIdResponse,
} from "./model";

export const loginUser = async (
  userData: UserLogin
): Promise<ApiResponse<null>> => {
  return (await request<null>(
    "/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  )) as ApiResponse<null>;
};

export const createUser = async (
  userData: UserSignUp
): Promise<ApiResponse<null>> => {
  return (await request<null>(
    "/v1/users",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  )) as ApiResponse<null>;
};

export const userFindId = async (
  params: UserFindId
): Promise<ApiResponse<FindIdResponse>> => {
  const query = new URLSearchParams({
    username: params.username,
    userEmail: params.userEmail,
  }).toString();

  return (await request<FindIdResponse>(
    `/v1/users/find/id?${query}`,
    { method: "GET" },
    "full"
  )) as ApiResponse<FindIdResponse>;
};

export const userFindPw = async (
  userData: UserFindPw
): Promise<ApiResponse<null>> => {
  return (await request<null>(
    "/v1/users/find/password",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  )) as ApiResponse<null>;
};

export const smsSend = async (
  userData: PhoneNumber
): Promise<ApiResponse<null>> => {
  return (await request<null>(
    "/v1/sms/send",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  )) as ApiResponse<null>;
};

export const smsVerify = async (
  userData: PhoneVerify
): Promise<ApiResponse<null>> => {
  return (await request<null>(
    "/v1/sms/verify",
    {
      method: "POST",
      body: JSON.stringify(userData),
    },
    "full"
  )) as ApiResponse<null>;
};

export const duplicationCheckId = async (
  loginId: string
): Promise<ApiResponse<null>> => {
  return (await request<null>(
    `/v1/users/check/id?loginId=${encodeURIComponent(loginId)}`,
    {
      method: "GET",
    },
    "full"
  )) as ApiResponse<null>;
};
