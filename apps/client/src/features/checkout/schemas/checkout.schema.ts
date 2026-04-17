import { z } from "zod";

export const checkoutSchema = z
  .object({
    selectedAddressId: z.number().min(1, "배송지를 선택해주세요."),

    shipRequest: z.string().min(1, "요청사항을 선택해주세요."),

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
  .refine(
    (data) => {
      if (data.paymentMethod === "bank") {
        return data.bank && data.depositorName;
      }
      return true;
    },
    {
      message: "계좌이체 정보를 입력해주세요.",
      path: ["bank"],
    }
  );
