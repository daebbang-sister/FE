// function getEnv(name: string): string {
//   const value = process.env[name];
//   if (!value) {
//     throw new Error(`❌ 환경 변수가 누락되었습니다: ${name}`);
//   }
//   return value;
// }

// export const env = {
//   APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//   API_URL: getEnv("NEXT_PUBLIC_API_URL"),
// };
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!API_URL) {
  throw new Error("❌ 환경 변수가 누락되었습니다: NEXT_PUBLIC_API_URL");
}

export const env = {
  API_URL,
  APP_URL: APP_URL ?? "http://localhost:3000",
} as const;
