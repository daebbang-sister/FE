import { z } from "zod";

export const signUpSchema = z
  .object({
    userName: z.string().min(1, "이름을 입력해 주세요."),

    userId: z
      .string()
      .min(1, "아이디를 입력해 주세요.")
      .min(4, "아이디는 4자 이상입니다.")
      .max(16, "아이디는 16자 이하입니다.")
      .regex(/^[a-z0-9]+$/, "아이디는 영문 소문자와 숫자만 사용 가능합니다."),

    userPassword: z
      .string()
      .min(1, "비밀번호를 입력해 주세요.")
      .min(8, "비밀번호는 8자 이상입니다.")
      .max(16, "비밀번호는 16자 이하입니다.")
      .superRefine((val, ctx) => {
        const hasUpper = /[A-Z]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasLetter = /[A-Za-z]/.test(val);
        const hasNumber = /\d/.test(val);
        const hasSpecial = /[^A-Za-z0-9]/.test(val);
        if (hasLetter && !(hasUpper && hasLower)) {
          ctx.addIssue({
            code: "custom",
            message: "영문은 대소문자를 모두 포함해야 합니다.",
          });
          return;
        }
        const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
        if (count < 2) {
          ctx.addIssue({
            code: "custom",
            message:
              "영문 대소문자/숫자/특수문자 중 2가지 이상 조합해야 합니다.",
          });
        }
      }),

    userPasswordCheck: z.string().min(1, "비밀번호 확인을 입력해 주세요."),

    // phone1: z.string().min(2),
    // phone2: z.string().min(3),
    // phone3: z.string().min(4),

    userEmail: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .pipe(z.email({ message: "이메일 형식이 올바르지 않습니다." })),

    zonecode: z.string().min(1, "우편번호를 입력해 주세요.").optional(),
    address: z.string().min(1, "주소를 입력해 주세요.").optional(),
    detailAddress: z.string().optional(),
  })
  .refine((data) => data.userPassword === data.userPasswordCheck, {
    path: ["userPasswordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
