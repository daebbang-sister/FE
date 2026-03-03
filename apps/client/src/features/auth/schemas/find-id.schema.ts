import z from "zod";

export const findIdSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요" }),
  email: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .pipe(z.email({ message: "이메일 형식이 올바르지 않습니다." })),
});
