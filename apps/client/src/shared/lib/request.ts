import { ApiError } from "./error";
import { isApiResponse } from "./api-response.guard";
import { ApiResponse } from "@repo/types";

async function handleResponse<T>(
  response: Response,
  mode: "data" | "full" = "data"
): Promise<T | ApiResponse<T>> {
  const resData: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    if (isApiResponse<T>(resData)) {
      throw new ApiError({
        message: resData.message,
        status: String(response.status),
        code: "HTTP_ERROR",
      });
    }
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

export default async function request<T>(
  url: string | URL,
  options?: RequestInit,
  mode: "data" | "full" = "data"
): Promise<T | ApiResponse<T>> {
  let absoluteUrl: string | URL = url;

  if (typeof url === "string" && !url.startsWith("http")) {
    const path = url.startsWith("/") ? url : `/${url}`;

    const API_ORIGIN = process.env.API_ORIGIN ?? "";

    absoluteUrl =
      typeof window === "undefined"
        ? `${API_ORIGIN}${path}`
        : `/api/proxy${path}`;
  }

  const mergedHeaders = new Headers(options?.headers);

  if (
    !(options?.body instanceof FormData) &&
    !mergedHeaders.has("Content-Type")
  ) {
    mergedHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(absoluteUrl, {
    ...options,
    credentials: "include",
    headers: mergedHeaders,
  });

  return handleResponse<T>(response, mode);
}
