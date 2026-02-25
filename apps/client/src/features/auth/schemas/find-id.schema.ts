import z from "zod";

export const findIdSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요" }),
  phone1: z.string().min(1, { message: "통신사를 선택해주세요" }),
  phone2: z.string().min(4, { message: "숫자만 입력" }),
  phone3: z.string().min(4, { message: "숫자만 입력" }),
});
