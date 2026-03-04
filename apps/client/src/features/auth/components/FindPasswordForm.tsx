"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "packages/ui/src";
import { z } from "zod";

import { findPasswordSchema } from "apps/client/src/features/auth/schemas/find-password.schema";
import { userFindPw } from "../api";
import { ApiError } from "apps/client/src/shared/lib/error";
import { useRouter } from "next/navigation";

type PasswordFormData = z.infer<typeof findPasswordSchema>;

export default function FindPasswordForm() {
  const pwForm = useForm<PasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: "onChange",
    defaultValues: {
      userId: "",
      username: "",
      userEmail: "",
    },
  });

  const router = useRouter();

  const findPwOnSubmit = async (data: PasswordFormData) => {
    try {
      const res = await userFindPw(data);
      alert(res.message);
      router.replace("/login");
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <form onSubmit={pwForm.handleSubmit(findPwOnSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="id">아이디</label>
          <Input
            id="id"
            placeholder="아이디를 입력하세요"
            {...pwForm.register("userId")}
            errorMessage={pwForm.formState.errors.userId?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="name">이름</label>
          <Input
            id="find-pw-name"
            placeholder="이름을 입력하세요"
            {...pwForm.register("username")}
            errorMessage={pwForm.formState.errors.username?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            placeholder="이메일을 입력하세요"
            {...pwForm.register("userEmail")}
            errorMessage={pwForm.formState.errors.userEmail?.message}
          />
        </div>
      </div>

      <div className="mt-9">
        <Button disabled={!pwForm.formState.isValid} variant="gray">
          확인
        </Button>
      </div>
    </form>
  );
}
