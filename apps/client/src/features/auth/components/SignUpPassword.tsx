import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";
import { Input } from "@repo/ui";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  trigger: UseFormTrigger<SignUpFormValues>;
};
export default function SignUpPassword({ register, errors, trigger }: Props) {
  return (
    <>
      <div>
        <SignUpInputLabel htmlFor="userPassword" required>
          비밀번호
        </SignUpInputLabel>
        <Input
          id="userPassword"
          type="password"
          placeholder="비밀번호를 입력하세요."
          helperMessage="(8-16자 영문 대소문자/숫자/특수문자 중 2가지 이상 조합)"
          status={errors.userPassword ? "error" : "default"}
          errorMessage={errors.userPassword?.message}
          {...register("userPassword")}
        />
      </div>
      <div>
        <SignUpInputLabel htmlFor="userPasswordCheck" required>
          비밀번호 확인
        </SignUpInputLabel>
        <Input
          id="userPasswordCheck"
          type="password"
          placeholder="다시 비밀번호를 입력하세요."
          status={errors.userPasswordCheck ? "error" : "default"}
          errorMessage={errors.userPasswordCheck?.message}
          {...register("userPasswordCheck", {
            onChange: () => trigger(["userPassword", "userPasswordCheck"]),
          })}
        />
      </div>
    </>
  );
}
