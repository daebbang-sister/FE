import { z } from "zod";

export const updateSchema = z
  .object({
    userPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "비밀번호는 8자 이상입니다.",
      })
      .refine((val) => !val || val.length <= 16, {
        message: "비밀번호는 16자 이하입니다.",
      })
      .superRefine((val, ctx) => {
        if (!val) return;

        const hasLetter = /[A-Za-z]/.test(val);
        const hasNumber = /\d/.test(val);
        const hasSpecial = /[^A-Za-z0-9]/.test(val);

        const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

        if (count < 2) {
          ctx.addIssue({
            code: "custom",
            message: "영문/숫자/특수문자 중 2가지 이상 조합해야 합니다.",
          });
        }
      }),

    userPasswordCheck: z.string().optional(),

    phone1: z.string(),
    phone2: z.string(),
    phone3: z.string(),

    phoneCerti: z.string().optional(),

    userEmail: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .pipe(z.email({ message: "이메일 형식이 올바르지 않습니다." })),
  })

  .refine(
    (data) => {
      if (!data.userPassword && !data.userPasswordCheck) {
        return true;
      }
      return data.userPassword === data.userPasswordCheck;
    },
    {
      path: ["userPasswordCheck"],
      message: "비밀번호가 일치하지 않습니다.",
    }
  )
  .refine(
    (data) =>
      data.phone1.length === 3 &&
      data.phone2.length === 4 &&
      data.phone3.length === 4,
    {
      message: "전화번호를 올바르게 입력해주세요.",
      path: ["phone1"],
    }
  );

export type ProfileFormValues = z.infer<typeof updateSchema>;
