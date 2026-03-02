import { ApiResponse } from "packages/types/src";

export function isApiResponse<T>(data: unknown): data is ApiResponse<T> {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    "status" in data &&
    "message" in data &&
    "data" in data
  );
}
