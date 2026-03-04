import { env } from "./env";
import { ApiError } from "./error";
import { isApiResponse } from "./api-response.guard";
import { ApiResponse } from "packages/types/src";

// response를 처리하는 공통 함수
async function handleResponse<T>(
  response: Response,
  mode: "data" | "full" = "data"
): Promise<T | ApiResponse<T>> {
  // 1️⃣ HTTP 에러 먼저 차단
  if (!response.ok) {
    // response.ok란 200~299 코드인지 확인
    throw new ApiError({
      message: "네트워크 연결이 불안정합니다. 잠시 후 다시 시도해 주세요.",
      status: String(response.status),
      code: "HTTP_ERROR",
    });
  }

  const resData: unknown = await response.json().catch(() => null);

  // 3️⃣ 서버 응답 구조 검증
  if (!isApiResponse<T>(resData)) {
    throw new Error("서버 응답 형식이 올바르지 않습니다.");
  }
  // 4️⃣ 서버가 실패라고 명시한 경우
  if (!resData.success) {
    throw new ApiError({
      message: resData.message,
      status: String(resData.status),
      code: "API_ERROR",
    });
  }

  return mode === "data" ? resData.data : resData;
}

// 요청 함수
export default async function request<T>(
  url: string | URL,
  options?: RequestInit,
  mode: "data" | "full" = "data"
): Promise<T | ApiResponse<T>> {
  let absoluteUrl = url;

  // if (
  //   typeof url === "string" &&
  //   !url.startsWith("http") &&
  //   typeof window === "undefined"
  // ) {
  //   absoluteUrl = new URL(url, env.API_URL).toString();
  // }
  if (typeof url === "string" && !url.startsWith("http")) {
    if (!env.API_URL) {
      throw new Error("env.API_URL이 설정되지 않았습니다.");
    }
    // 예: API_URL이 'https://api.com'이고 url이 '/v1/test'면 -> 'https://api.com/v1/test'
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
