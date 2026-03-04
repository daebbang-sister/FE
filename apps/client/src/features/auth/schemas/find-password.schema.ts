import { z } from "zod";

export const findPasswordSchema = z.object({
  userId: z.string().min(1, { message: "아이디를 입력해주세요" }),
  username: z.string().min(1, { message: "이름을 입력해주세요" }),
  userEmail: z.email({ message: "올바른 이메일 형식이 아닙니다" }),
});
