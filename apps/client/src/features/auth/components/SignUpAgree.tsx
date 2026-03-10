import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";
import { CheckBox } from "@repo/ui";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  control: Control<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
};

export default function SignUpAgree({
  register,
  errors,
  control,
  setValue,
}: Props) {
  const agreeValues = useWatch({
    control,
    name: ["agree01", "agree02"],
  });
  const [agree01, agree02] = agreeValues;
  const isAllChecked = agree01 && agree02;
  const handleAllAgree = (checked: boolean) => {
    setValue("agree01", checked, { shouldValidate: true });
    setValue("agree02", checked, { shouldValidate: true });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <SignUpInputLabel htmlFor="agreement">약관 동의</SignUpInputLabel>
        <div className="mb-3 flex items-center gap-1.25">
          <CheckBox
            id="agree-all"
            checked={!!isAllChecked}
            onChange={(e) => handleAllAgree(e.target.checked)}
          />
          <p>모든 약관 동의</p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        <li className="flex gap-1.25">
          <CheckBox id="agree01" {...register("agree01")} />
          이용약관 동의 [필수]
        </li>
        <li className="flex gap-1.25">
          <CheckBox id="agree02" {...register("agree02")} />
          개인정보 수집 및 이용 [필수]
        </li>
        {/* 에러 메시지 */}
        {(errors.agree01 || errors.agree02) && (
          <p className="caption1 text-danger-200 mt-1.5">
            {errors.agree01?.message || errors.agree02?.message}
          </p>
        )}
      </ul>
    </div>
  );
}
