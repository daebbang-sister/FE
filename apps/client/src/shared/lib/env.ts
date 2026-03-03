const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("❌ 환경 변수가 누락되었습니다: NEXT_PUBLIC_API_URL");
}
export const env = {
  API_URL,
} as const;
