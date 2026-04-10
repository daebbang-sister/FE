import { ApiError } from "./error";
import { isApiResponse } from "./api-response.guard";
import { ApiResponse } from "@repo/types";
import { useAuthStore } from "@/shared/store/auth.store";
import { refreshToken } from "@/shared/lib/refreshToken";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("환경 변수가 없습니다");
  }

  return process.env.NEXT_PUBLIC_SITE_URL;
}

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

  if (!absoluteUrl) {
    throw new Error("잘못된 요청 URL입니다.");
  }

  if (typeof url === "string" && !url.startsWith("http")) {
    const path = url.startsWith("/") ? url : `/${url}`;

    const base = getBaseUrl();

    absoluteUrl = `${base}/api/proxy${path}`;
  }

  const mergedHeaders = new Headers(options?.headers);

  if (
    !(options?.body instanceof FormData) &&
    !mergedHeaders.has("Content-Type")
  ) {
    mergedHeaders.set("Content-Type", "application/json");
  }

  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    mergedHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(absoluteUrl, {
    ...options,
    credentials: "include",
    headers: mergedHeaders,
  });

  if (response.status === 401) {
    const newAccessToken = await refreshToken();

    mergedHeaders.set("Authorization", `Bearer ${newAccessToken}`);

    const retryResponse = await fetch(absoluteUrl, {
      ...options,
      credentials: "include",
      headers: mergedHeaders,
    });

    return handleResponse<T>(retryResponse, mode);
  }

  return handleResponse<T>(response, mode);
}
