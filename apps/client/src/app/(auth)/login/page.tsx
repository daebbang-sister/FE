"use client";
import { loginSchema } from "apps/client/src/features/auth/schemas/login.schema";
import { CheckBox, Input, Button } from "packages/ui/src";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { loginUser } from "apps/client/src/features/auth/api";
import { ApiError } from "apps/client/src/shared/lib/error";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof loginSchema>;

const STORAGE_KEYS = {
  REMEMBER_ID: "login_remember_id",
  SAVED_ID: "login_saved_id",
} as const;

export default function LoginPage() {
  const router = useRouter();
  const [rememberId, setRememberId] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ID) === "true";
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!rememberId) return;

    const savedId = localStorage.getItem(STORAGE_KEYS.SAVED_ID);
    if (savedId) {
      setValue("id", savedId, { shouldValidate: true });
    }
  }, [setValue, rememberId]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);

      if (rememberId) {
        localStorage.setItem(STORAGE_KEYS.SAVED_ID, data.id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.SAVED_ID);
      }

      alert(res.message);

      router.replace("/");
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    setRememberId(checked);

    localStorage.setItem(STORAGE_KEYS.REMEMBER_ID, String(checked));

    if (!checked) {
      localStorage.removeItem(STORAGE_KEYS.SAVED_ID);
      setValue("id", "", { shouldValidate: true });
    }
  }

  return (
    <section className="w-97.5 max-97.5 page-y">
      <h1 className="title2 mb-12 text-center">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="id">아이디</label>
              <Input
                id="id"
                type="text"
                placeholder="아이디를 입력하세요"
                {...register("id")}
                errorMessage={errors.id?.message}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password">비밀번호</label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                {...register("password")}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className="text-text-disabled flex justify-between body2 mt-3">
            <div className="flex gap-1.25">
              <CheckBox
                id="rememberId"
                checked={rememberId}
                onChange={handleChecked}
              />
              <p>아이디 저장</p>
            </div>
            <div>
              <Link href={"/sign-up"}>회원가입</Link>
              <span> I </span>
              <Link href={"/find/"}>아이디 · 비밀번호 찾기</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9 mt-9">
          <Button disabled={!isValid} variant="gray">
            로그인
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-300" />
            <span className="text-sm text-neutral-300 body2">또는</span>
            <div className="h-px flex-1 bg-neutral-300" />
          </div>
          <button
            type="button"
            className="
    flex w-full items-center justify-center gap-2
    rounded-xl bg-[#FEE500] px-4 py-3
    font-bold text-black h-12.75
    hover:brightness-95 active:brightness-90
  "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path d="M10 2C4.9 2 1 5.3 1 9.2c0 2.5 1.7 4.7 4.2 6l-.6 2.4c-.1.4.3.7.7.5l2.8-1.8c.6.1 1.2.2 1.9.2 5.1 0 9-3.3 9-7.3S15.1 2 10 2z" />
            </svg>
            카카오 로그인
          </button>
        </div>
      </form>
    </section>
  );
}
