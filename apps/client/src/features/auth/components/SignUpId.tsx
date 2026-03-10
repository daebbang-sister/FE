"use client";

import { duplicationCheckId } from "@/features/auth/api";
import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";
import { Button, Input } from "@repo/ui";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormGetValues,
  UseFormSetError,
  UseFormClearErrors,
  Control,
  useWatch,
} from "react-hook-form";
import { ApiError } from "@/shared/lib/error";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  control: Control<SignUpFormValues>;
  trigger: UseFormTrigger<SignUpFormValues>;
  getValues: UseFormGetValues<SignUpFormValues>;
  setError: UseFormSetError<SignUpFormValues>;
  clearErrors: UseFormClearErrors<SignUpFormValues>;
  setIsIdVerified: (value: boolean) => void;
};

export default function SignUpId({
  register,
  errors,
  control,
  trigger,
  getValues,
  setError,
  clearErrors,
  setIsIdVerified,
}: Props) {
  const [verifiedUserId, setVerifiedUserId] = useState<string | null>(null);
  const watchedUserId = useWatch({ control, name: "userId" });
  const isIdVerified = watchedUserId === verifiedUserId;

  useEffect(() => {
    setIsIdVerified(false);
  }, [watchedUserId]);

  const idCheck = async () => {
    const userId = getValues("userId");
    const isValid = await trigger("userId");
    if (!isValid) return;

    try {
      const res = await duplicationCheckId(userId);
      alert(res.message);
      clearErrors("userId");
      setVerifiedUserId(userId);
      setIsIdVerified(true);
    } catch (err) {
      setVerifiedUserId(null);
      setIsIdVerified(false);
      if (err instanceof ApiError) {
        setError("userId", {
          type: "manual",
          message: err.message,
        });
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <SignUpInputLabel htmlFor="userId" required>
        아이디
      </SignUpInputLabel>
      <div className="flex gap-2.5">
        <Input
          id="userId"
          type="text"
          placeholder="아이디를 입력하세요."
          helperMessage={
            isIdVerified
              ? undefined
              : "(4-16자 영문 소문자 또는 숫자 조합, 특수기호 제외)"
          }
          status={errors.userId ? "error" : "default"}
          errorMessage={errors.userId?.message}
          {...register("userId")}
        />
        <Button
          type="button"
          variant="black"
          className="h-13.5 max-w-22.5"
          onClick={idCheck}
        >
          중복 확인
        </Button>
      </div>
      {isIdVerified && (
        <p className="caption1 mt-1.5 text-green-200">
          중복 확인이 완료되었습니다.
        </p>
      )}
    </div>
  );
}
