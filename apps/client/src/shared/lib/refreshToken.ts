import { ApiError } from "./error";
import { useAuthStore } from "@/shared/store/auth.store";

let refreshPromise: Promise<string> | null = null;

export async function refreshToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = fetch(`/api/proxy/v1/tokens/reissues`, {
    method: "POST",
    credentials: "include",
  })
    .then(async (res) => {
      if (!res.ok) {
        useAuthStore.getState().logout();
        throw new ApiError({
          message: "로그인이 만료 되었습니다",
          status: "401",
          code: "UNAUTHORIZED",
        });
      }

      const data = await res.json();
      const newAccessToken = data.data.accessToken;
      useAuthStore.getState().login(newAccessToken);

      return newAccessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
