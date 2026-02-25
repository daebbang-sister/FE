"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "packages/ui/src";
import { z } from "zod";

import { findPasswordSchema } from "apps/client/src/features/auth/schemas/find-password.schema";

type PasswordFormData = z.infer<typeof findPasswordSchema>;

export default function FindPasswordForm() {
  const pwForm = useForm<PasswordFormData>({
    resolver: zodResolver(findPasswordSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      name: "",
      email: "",
    },
  });

  const findPwOnSubmit = (data: PasswordFormData) => {
    console.log("find password", data);
  };

  return (
    <form onSubmit={pwForm.handleSubmit(findPwOnSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="id">아이디</label>
          <Input
            id="id"
            placeholder="아이디를 입력하세요"
            {...pwForm.register("id")}
            errorMessage={pwForm.formState.errors.id?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="name">이름</label>
          <Input
            id="find-pw-name"
            placeholder="이름을 입력하세요"
            {...pwForm.register("name")}
            errorMessage={pwForm.formState.errors.name?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            placeholder="이메일을 입력하세요"
            {...pwForm.register("email")}
            errorMessage={pwForm.formState.errors.email?.message}
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
