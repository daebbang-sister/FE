// auth.service.ts
import request from "../../shared/lib/request";
import { ApiResponse } from "packages/types/src";
import { PhoneNumber, PhoneVerify, UserSignUp } from "./model";

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
  // 끝부분에 as를 붙여서 "이건 무조건 ApiResponse 형태야"라고 명시합니다.
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
