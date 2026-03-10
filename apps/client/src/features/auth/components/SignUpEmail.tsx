import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";
import { Input } from "@repo/ui";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
};

export default function SignUpEmail({ register, errors }: Props) {
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
