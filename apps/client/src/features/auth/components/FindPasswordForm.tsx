"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { findPasswordSchema } from "@/features/auth/schemas/find-password.schema";
import { userFindPw } from "@/features/auth/api";
import { ApiError } from "@/shared/lib/error";
import { Button, Input } from "@repo/ui";

type PasswordFormData = z.infer<typeof findPasswordSchema>;

export default function FindPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({
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
    <form onSubmit={handleSubmit(findPwOnSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="userId">아이디</label>
          <Input
            id="userId"
            placeholder="아이디를 입력하세요"
            {...register("userId")}
            errorMessage={errors.userId?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="username">이름</label>
          <Input
            id="username"
            placeholder="이름을 입력하세요"
            {...register("username")}
            errorMessage={errors.username?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="userEmail">이메일</label>
          <Input
            id="userEmail"
            type="email"
            placeholder="이메일을 입력하세요"
            {...register("userEmail")}
            errorMessage={errors.userEmail?.message}
          />
        </div>
      </div>

      <div className="mt-9">
        <Button disabled={!isValid} variant="gray">
          확인
        </Button>
      </div>
    </form>
  );
}
