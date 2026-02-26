import z from "zod";

export const loginSchema = z.object({
  id: z.string().min(1, { message: "아이디를 입력해 주세요" }),

  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요" })
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다" }),
});
