"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "packages/ui/src";
import { z } from "zod";

import { findIdSchema } from "apps/client/src/features/auth/schemas/find-id.schema";
import { userFindId } from "../api";
import { ApiError } from "apps/client/src/shared/lib/error";
import { ApiResponse } from "packages/types/src";

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
      const res = (await userFindId(data)) as ApiResponse<{
        userIds: { id: string; provider: string }[];
      }>;

      const ids = res.data.userIds
        .map((user) => `${user.id} (${user.provider})`)
        .join("\n");

      alert(`찾은 아이디:\n${ids}`);
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
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
