import { ProfileFormValues } from "@/features/mypage/schemas/update-profile.schema";

export const toUpdateUserProfileRequest = (data: ProfileFormValues) => {
  return {
    email: data.userEmail,
    phoneNumber: `${data.phone1}-${data.phone2}-${data.phone3}`,
    ...(data.userPassword && {
      password: data.userPassword,
      passwordConfirm: data.userPasswordCheck,
    }),
  };
};
