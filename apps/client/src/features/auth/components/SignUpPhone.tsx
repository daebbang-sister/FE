"use client";

import { smsSend, smsVerify } from "@/features/auth/api";
import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { PhoneNumber, PhoneVerify } from "@/features/auth/model";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";
import { ApiError } from "@/shared/lib/error";
import { Button, Dropdown, Input } from "@repo/ui";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  control: Control<SignUpFormValues>;
  trigger: UseFormTrigger<SignUpFormValues>;
  getValues: UseFormGetValues<SignUpFormValues>;
  setIsPhoneVerified: (value: boolean) => void;
};

export default function SignUpPhone({
  register,
  errors,
  control,
  trigger,
  getValues,
  setIsPhoneVerified,
}: Props) {
  // 전화 번호 드롭다운
  const phoneOptions = [
    { label: "010", value: "010" },
    { label: "011", value: "011" },
    { label: "016", value: "016" },
    { label: "017", value: "017" },
    { label: "018", value: "018" },
    { label: "019", value: "019" },
  ];

  // 전화번호 인증
  const [isSmsSent, setIsSmsSent] = useState(false); // 버튼 변경
  const phoneValues = useWatch({
    control,
    name: ["phone1", "phone2", "phone3"],
  });
  const [phone1, phone2, phone3] = phoneValues;
  const fullPhone = [phone1, phone2, phone3].join("-");

  // 인증번호 발송
  const handleVerifyPhone = async () => {
    const isValid = await trigger(["phone1", "phone2", "phone3"]);
    if (!isValid) return;
    const userData: PhoneNumber = { phoneNumber: fullPhone };
    try {
      await smsSend(userData);
      alert("인증번호가 발송 되었습니다.");
      setIsSmsSent(true);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 인증번호 검사
  const handleVerifyCerti = async () => {
    const certiValue = getValues("phoneCerti");
    if (!certiValue) return;
    const userData: PhoneVerify = {
      phoneNumber: fullPhone,
      authCode: certiValue,
    };
    try {
      await smsVerify(userData);
      alert("휴대폰 인증이 완료 되었습니다.");
      setIsPhoneVerified(true);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <SignUpInputLabel htmlFor="phoen-number" required>
        연락처
      </SignUpInputLabel>
      <div className="mb-3 grid grid-cols-4 gap-2.5">
        <Controller
          name="phone1"
          control={control}
          defaultValue="010"
          render={({ field }) => (
            <Dropdown
              id="phone1"
              value={field.value}
              onChange={field.onChange}
              placeholder="010"
              options={phoneOptions}
              size="L"
            />
          )}
        />
        <Input
          id="phone2"
          type="text"
          inputMode="numeric"
          maxLength={4}
          // disabled={isPhoneVerified}
          status={errors.phone1 ? "error" : "default"}
          {...register("phone2", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            },
          })}
        />
        <Input
          id="phone3"
          type="text"
          inputMode="numeric"
          maxLength={4}
          // disabled={isPhoneVerified}
          status={errors.phone1 ? "error" : "default"}
          {...register("phone3", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            },
          })}
        />
        {!isSmsSent ? (
          <Button type="button" variant="white" onClick={handleVerifyPhone}>
            인증
          </Button>
        ) : (
          <Button type="button" variant="black" onClick={handleVerifyCerti}>
            확인
          </Button>
        )}
      </div>
      <Input
        id="phoneCerti"
        type="text"
        placeholder="인증번호를 입력하세요."
        {...register("phoneCerti")}
        errorMessage={errors.phone1?.message}
      />
    </div>
  );
}
