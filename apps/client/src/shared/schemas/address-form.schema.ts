import { z } from "zod";

export const addressSchema = z.object({
  receiver: z.string().trim().min(1, "받는 분 성함을 입력해 주세요."),
  receiverPhoneNumber: z
    .string()
    .trim()
    .min(1, "연락처를 입력해 주세요.")
    .regex(/^01[0-9]-\d{3,4}-\d{4}$/, "휴대폰 번호 형식이 올바르지 않습니다."),
  alias: z.string().nullable(),
  zipCode: z.string().trim().min(1, "우편번호를 입력해 주세요."),
  address: z.string().trim().min(1, "주소를 입력해 주세요."),
  detailAddress: z.string().trim().min(1, "상세 주소를 입력해 주세요."),
  isDefault: z.boolean(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
