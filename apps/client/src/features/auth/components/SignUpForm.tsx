"use client";

import { createUser } from "@/features/auth/api";
import SignUpAdress from "@/features/auth/components/SignUpAdress";
import SignUpAgree from "@/features/auth/components/SignUpAgree";
import SignUpEmail from "@/features/auth/components/SignUpEmail";
import SignUpId from "@/features/auth/components/SignUpId";
import SignUpName from "@/features/auth/components/SignUpName";
import SignUpPassword from "@/features/auth/components/SignUpPassword";
import SignUpPhone from "@/features/auth/components/SignUpPhone";
import { toUserSignUpRequest } from "@/features/auth/mapper/user.mapper";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/features/auth/schemas/sign-up.schema";
import { ApiError } from "@/shared/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const [isIdVerified, setIsIdVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // 데이터 폼(회원가입) 제출
  const [isPending, startTransition] = useTransition();
  const onSubmitt = (data: SignUpFormValues) => {
    startTransition(async () => {
      if (!isIdVerified) {
        setError("userId", {
          type: "manual",
          message: "아이디 중복 확인을 해주세요.",
        });
        return;
      }
      if (!isPhoneVerified) {
        setError("phone1", {
          type: "manual",
          message: "전화번호 인증을 완료해주세요.",
        });
      }
      const payload = toUserSignUpRequest(data);
      try {
        // console.log("폼 데이터", payload);
        await createUser(payload);
        alert("회원가입이 완료되었습니다.");
        router.replace("/");
      } catch (err) {
        if (err instanceof ApiError) {
          alert(err.message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    });
  };

  return (
    <section className="max-97.5 page-y w-97.5">
      <p className="title2 mb-12 text-center">회원가입</p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmitt)}>
        {/* 이름 */}
        <SignUpName register={register} errors={errors}></SignUpName>

        {/* 아이디 */}
        <SignUpId
          register={register}
          errors={errors}
          control={control}
          trigger={trigger}
          getValues={getValues}
          setError={setError}
          clearErrors={clearErrors}
          setIsIdVerified={setIsIdVerified}
        ></SignUpId>

        {/* 비밀번호 */}
        <SignUpPassword
          register={register}
          errors={errors}
          trigger={trigger}
        ></SignUpPassword>

        {/* 연락처 */}
        <SignUpPhone
          register={register}
          errors={errors}
          control={control}
          trigger={trigger}
          getValues={getValues}
          setIsPhoneVerified={setIsPhoneVerified}
        />

        {/* 이메일 */}
        <SignUpEmail register={register} errors={errors}></SignUpEmail>

        {/* 주소 */}
        <SignUpAdress register={register} setValue={setValue}></SignUpAdress>

        {/* 약관 동의 */}
        <SignUpAgree
          register={register}
          errors={errors}
          control={control}
          setValue={setValue}
        />

        <Button type="submit" variant="gray" className="mt-12">
          {isPending ? "회원가입 중" : "회원가입"}
        </Button>
      </form>
    </section>
  );
}
