// auth.service.ts
import request from "../../shared/lib/request";
import { ApiResponse } from "packages/types/src";
import { UserSignUp } from "./model";

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

// 오버라이드 형식
// function request<T>(url: string, options?: RequestInit, mode?: "data"): Promise<T>;
// function request<T>(url: string, options?: RequestInit, mode?: "full"): Promise<ApiResponse<T>>;
// // 실제 구현부
// async function request<T>(
//   url: string,
//   options?: RequestInit,
//   mode: "data" | "full" = "data"
// ) {
//   // ... 기존 코드 동일 ...
// }
