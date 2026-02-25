"use client";

import { Button, Input } from "packages/ui/src";
import { useKakaoPostcode } from "apps/client/src/shared/hooks/useKakaoPostcode";
import AuthInputLabel from "apps/client/src/features/auth/components/AuthInputLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignUpFormValues,
  signUpSchema,
} from "apps/client/src/features/auth/schemas/signUp.schema";

export default function SignUpPage() {
  const { openPostcode } = useKakaoPostcode();
  const handleSearchAddress = () => {
    openPostcode((data) => {
      setValue("zonecode", data.zonecode, { shouldValidate: true });
      setValue("address", data.address, { shouldValidate: true });
    });
  };

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmitt = (data: SignUpFormValues) => {
    console.log("폼 데이터", data);
  };

  return (
    <section className="w-97.5 max-97.5 page-y">
      <p className="mb-12 text-center title2">회원가입</p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmitt)}>
        {/* 이름 */}
        <div>
          <AuthInputLabel htmlFor="userName" required>
            이름
          </AuthInputLabel>
          <Input
            id="userName"
            type="text"
            placeholder="이름을 입력하세요"
            status={errors.userName ? "error" : "default"}
            errorMessage={errors.userName?.message}
            {...register("userName")}
          />
        </div>

        {/* 아이디 */}
        <div>
          <AuthInputLabel htmlFor="userId" required>
            아이디
          </AuthInputLabel>
          <div className="flex gap-2.5">
            <Input
              id="userId"
              type="text"
              placeholder="아이디를 입력하세요."
              helperMessage="(4-16자 영문 소문자 또는 숫자 조합, 특수기호 제외)"
              status={errors.userId ? "error" : "default"}
              errorMessage={errors.userId?.message}
              {...register("userId")}
            />
            <Button
              type="button"
              variant="black"
              className="max-w-[90px] h-13.5"
            >
              중복 확인
            </Button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div>
          <AuthInputLabel htmlFor="userPassword" required>
            비밀번호
          </AuthInputLabel>
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

        {/* 비밀번호 확인 */}
        <div>
          <AuthInputLabel htmlFor="userPasswordCheck" required>
            비밀번호 확인
          </AuthInputLabel>
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

        {/* 연락처 */}
        <div>
          <AuthInputLabel htmlFor="phoen-number" required>
            연락처
          </AuthInputLabel>
          <div className="grid grid-cols-4 gap-2.5 mb-3">
            <Input id="phone" type="number" placeholder="010" />
            <Input
              id="phone"
              type="text"
              inputMode="numeric"
              maxLength={4}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
            <Input
              id="phone"
              type="text"
              inputMode="numeric"
              maxLength={4}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
            <Button type="button" variant="white">
              인증
            </Button>
          </div>
          <Input
            id="certification"
            type="text"
            placeholder="인증번호를 입력하세요."
          />
        </div>

        {/* 이메일 */}
        <div>
          <AuthInputLabel htmlFor="userEmail" required>
            이메일
          </AuthInputLabel>
          <Input
            id="userEmail"
            type="email"
            placeholder="이메일을 입력하세요."
            status={errors.userEmail ? "error" : "default"}
            errorMessage={errors.userEmail?.message}
            {...register("userEmail")}
          />
        </div>

        {/* 주소 */}
        <div>
          <AuthInputLabel htmlFor="readonly-id">주소</AuthInputLabel>
          <div className="flex gap-2.5 mb-3">
            <Input
              id="readonly-id"
              status="disabled"
              {...register("zonecode")}
            />
            <Button
              type="button"
              className="max-w-[90px]"
              variant="black"
              onClick={handleSearchAddress}
            >
              주소조회
            </Button>
          </div>
          <Input
            className="mb-3"
            id="readonly-id"
            status="disabled"
            {...register("address")}
          />
          <Input
            id="detailAddress"
            placeholder="상세 주소를 입력해 주세요."
            {...register("detailAddress")}
          />
        </div>

        <div>약관 동의</div>
        <Button type="submit" variant="gray">
          회원가입
        </Button>
      </form>
    </section>
  );
}
