import { UserSignUp } from "@/features/auth/model";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";

export function toUserSignUpRequest(data: SignUpFormValues): UserSignUp {
  return {
    name: data.userName,
    loginId: data.userId,
    password: data.userPassword,
    phoneNumber: [data.phone1, data.phone2, data.phone3].join("-"),
    email: data.userEmail,
    address: {
      alias: null,
      zipCode: data.zonecode ?? null,
      address: data.address ?? null,
      detailAddress: data.detailAddress ?? null,
    },
  };
}
