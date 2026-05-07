import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { Input } from "@repo/ui";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProfileFormValues } from "@/features/mypage/schemas/update-profile.schema";

type Props = {
  register: UseFormRegister<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
};

export default function ProfileEmail({ register, errors }: Props) {
  return (
    <div>
      <SignUpInputLabel htmlFor="userEmail" required>
        이메일
      </SignUpInputLabel>
      <Input
        id="userEmail"
        type="email"
        placeholder="이메일을 입력하세요."
        status={errors.userEmail ? "error" : "default"}
        errorMessage={errors.userEmail?.message}
        {...register("userEmail")}
      />
    </div>
  );
}
