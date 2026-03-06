"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/features/auth/schemas/sign-up.schema";
import {
  createUser,
  duplicationCheckId,
  smsSend,
  smsVerify,
} from "@/features/auth/api";
import { ApiError } from "@/shared/lib/error";
import { useKakaoPostcode } from "@/shared/hooks/useKakaoPostcode";
import { PhoneNumber, PhoneVerify } from "@/features/auth/model";
import { toUserSignUpRequest } from "@/features/auth/mapper/user.mapper";
import AuthInputLabel from "@/features/auth/components/AuthInputLabel";
import { Button, CheckBox, Dropdown, Input } from "@repo/ui";

export default function SignUpPage() {
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

  // 아이디 조회
  const [verifiedUserId, setVerifiedUserId] = useState<string | null>(null);
  const watchedUserId = useWatch({ control, name: "userId" });
  const isIdVerified = watchedUserId === verifiedUserId;

  const idCheck = async () => {
    const userId = getValues("userId");
    const isValid = await trigger("userId");
    if (!isValid) return;

    try {
      const res = await duplicationCheckId(userId);
      alert(res.message); // 이거
      clearErrors("userId");
      setVerifiedUserId(userId);
    } catch (err) {
      setVerifiedUserId(null);
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

  // 주소 조회
  const { openPostcode } = useKakaoPostcode();
  const handleSearchAddress = () => {
    openPostcode((data) => {
      setValue("zonecode", data.zonecode, { shouldValidate: true });
      setValue("address", data.address, { shouldValidate: true });
    });
  };

  // 약관 동의
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
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
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

  // 데이터 폼(회원가입) 제출
  const onSubmitt = async (data: SignUpFormValues) => {
    if (!isIdVerified) {
      setError("userId", {
        type: "manual",
        message: "아이디 중복 확인을 해주세요.",
      });
      return;
    }
    if (!isPhoneVerified) {
      alert("전화번호 인증을 완료해주세요.");
      return;
    }
    const payload = toUserSignUpRequest(data);
    try {
      // console.log("폼 데이터", payload);
      await createUser(payload);
      alert("회원가입이 완료되었습니다.");
      router.push("/");
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <section className="max-97.5 page-y w-97.5">
      <p className="title2 mb-12 text-center">회원가입</p>
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
          <div className="mb-3 flex gap-2.5">
            <Input
              id="readonly-id"
              status="disabled"
              {...register("zonecode")}
            />
            <Button
              type="button"
              className="max-w-22.5"
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

        {/* 약관 동의 */}
        <div>
          <div className="flex items-center justify-between">
            <AuthInputLabel htmlFor="agreement">약관 동의</AuthInputLabel>
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

        <Button type="submit" variant="gray" className="mt-12">
          회원가입
        </Button>
      </form>
    </section>
  );
}
