"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "packages/ui/src";
import { z } from "zod";

import { findIdSchema } from "apps/client/src/features/auth/schemas/find-id.schema";
import { userFindId } from "../api";

type IdFormData = z.infer<typeof findIdSchema>;

export default function FindIdForm() {
  const idForm = useForm<IdFormData>({
    resolver: zodResolver(findIdSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      userEmail: "",
    },
  });

  const findIdOnSubmit = async (data: IdFormData) => {
    try {
      const res = await userFindId(data);
      console.log("아이디 찾기", res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={idForm.handleSubmit(findIdOnSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">이름</label>
          <Input
            id="find-id-name"
            placeholder="이름을 입력하세요"
            {...idForm.register("username")}
            errorMessage={idForm.formState.errors.username?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="email">이메일</label>
          <Input
            id="find-id-email"
            placeholder="이메일을 입력하세요"
            {...idForm.register("userEmail")}
            errorMessage={idForm.formState.errors.userEmail?.message}
          />
        </div>
      </div>

      <div className="mt-9">
        <Button disabled={!idForm.formState.isValid} variant="gray">
          확인
        </Button>
      </div>
    </form>
  );
}
