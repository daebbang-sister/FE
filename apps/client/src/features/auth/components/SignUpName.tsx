// SignupName.tsx
import { Input } from "@repo/ui";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
};
export default function SignUpName({ register, errors }: Props) {
  return (
    <div>
      <SignUpInputLabel htmlFor="userName" required>
        이름
      </SignUpInputLabel>
      <Input
        id="userName"
        type="text"
        placeholder="이름을 입력하세요"
        status={errors.userName ? "error" : "default"}
        errorMessage={errors.userName?.message}
        {...register("userName")}
      />
    </div>
  );
}
