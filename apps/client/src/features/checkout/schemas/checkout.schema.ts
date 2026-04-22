import { z } from "zod";

export const checkoutSchema = z
  .object({
    selectedAddressId: z.number().min(1, "배송지를 선택해주세요."),

    shipRequest: z.string().optional(),

    shipRequestCustom: z.string().optional(),

    paymentMethod: z.enum(["card", "bank"]),

    bank: z.string().optional(),

    depositorName: z.string().optional(),

    usedPoints: z.number().min(0, "적립금은 0 이상이어야 합니다."),

    agreePrivacy: z.boolean().refine((val) => val === true, {
      message: "개인정보 약관에 동의해주세요.",
    }),

    agreeOrder: z.boolean().refine((val) => val === true, {
      message: "주문 약관에 동의해주세요.",
    }),
  })
  .refine((data) => data.paymentMethod !== "bank" || !!data.bank, {
    message: "입금은행을 선택해주세요.",
    path: ["bank"],
  })
  .refine((data) => data.paymentMethod !== "bank" || !!data.depositorName, {
    message: "입금자명을 입력해주세요.",
    path: ["depositorName"],
  });
