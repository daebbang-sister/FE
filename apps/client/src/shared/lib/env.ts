function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ 환경 변수가 누락되었습니다: ${name}`);
  }
  return value;
}

export const env = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  API_URL: getEnv("NEXT_PUBLIC_API_URL"),
};
