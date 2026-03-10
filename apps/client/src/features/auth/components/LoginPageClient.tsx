"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { loginUser } from "@/features/auth/api";
import { ApiError } from "@/shared/lib/error";
import { Button, CheckBox, Input } from "@repo/ui";
import LoginKaKaoBtn from "@/features/auth/components/LoginKaKaoBtn";
import { useRememberId } from "@/features/auth/hook/useRememberId";

type FormData = z.infer<typeof loginSchema>;

export default function LoginPageClient() {
  const router = useRouter();

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

  const { rememberId, handleRememberIdChange, saveId } = useRememberId({
    setValue,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data);

      saveId(data.id);

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

  return (
    <section className="max-97.5 page-y w-97.5">
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
          <div className="text-text-disabled body2 mt-3 flex justify-between">
            <div className="flex gap-1.25">
              <CheckBox
                id="rememberId"
                checked={rememberId}
                onChange={(e) => handleRememberIdChange(e.target.checked)}
              />
              <p>아이디 저장</p>
            </div>
            <div>
              <Link href={"/sign-up"}>회원가입</Link>
              <span> I </span>
              <Link href={"/login/find/"}>아이디 · 비밀번호 찾기</Link>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-9">
          <Button disabled={!isValid} variant="gray">
            로그인
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-300" />
            <span className="body2 text-sm text-neutral-300">또는</span>
            <div className="h-px flex-1 bg-neutral-300" />
          </div>
          <LoginKaKaoBtn />
        </div>
      </form>
    </section>
  );
}
