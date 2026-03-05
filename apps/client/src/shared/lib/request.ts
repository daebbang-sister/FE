import { env } from "./env";
import { ApiError } from "./error";
import { isApiResponse } from "./api-response.guard";
import { ApiResponse } from "packages/types/src";

async function handleResponse<T>(
  response: Response,
  mode: "data" | "full" = "data"
): Promise<T | ApiResponse<T>> {
  const resData: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    if (isApiResponse<T>(resData)) {
      // 👉 서버가 준 메시지 사용
      throw new ApiError({
        message: resData.message,
        status: String(response.status),
        code: "HTTP_ERROR",
      });
    }
    // 👉 진짜 네트워크/예상 못한 응답
    throw new ApiError({
      message: "요청 처리 중 오류가 발생했습니다.",
      status: String(response.status),
      code: "HTTP_ERROR",
    });
  }
  if (!isApiResponse<T>(resData)) {
    throw new Error("서버 응답 형식이 올바르지 않습니다.");
  }
  if (!resData.success) {
    throw new ApiError({
      message: resData.message,
      status: String(resData.status),
      code: "API_ERROR",
    });
  }
  return mode === "data" ? resData.data : resData;
}

export default function request<T>(
  url: string | URL,
  options?: RequestInit,
  mode?: "data"
): Promise<T>;

export default function request<T>(
  url: string | URL,
  options: RequestInit | undefined,
  mode: "full"
): Promise<ApiResponse<T>>;

// 요청 함수
export default async function request<T>(
  url: string | URL,
  options?: RequestInit,
  mode: "data" | "full" = "data"
): Promise<T | ApiResponse<T>> {
  let absoluteUrl = url;
  if (typeof url === "string" && !url.startsWith("http")) {
    if (!env.API_URL) {
      throw new Error("env.API_URL이 설정되지 않았습니다.");
    }
    absoluteUrl = new URL(url, env.API_URL).toString();
  }
  const response = await fetch(absoluteUrl, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`,
      ...(options?.headers || {}),
    },
    ...options,
  });
  return handleResponse<T>(response, mode);
}
