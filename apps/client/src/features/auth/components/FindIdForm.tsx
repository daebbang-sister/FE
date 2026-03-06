"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { findIdSchema } from "@/features/auth/schemas/find-id.schema";
import { userFindId } from "@/features/auth/api";
import { ApiError } from "@/shared/lib/error";
import { Button, Input } from "@repo/ui";

type IdFormData = z.infer<typeof findIdSchema>;

export default function FindIdForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IdFormData>({
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

      if (res.data.userIds.length === 0) {
        alert("일치하는 아이디가 없습니다.");
        return;
      }

      const ids = res.data.userIds
        .map((user) => {
          const providerLabel = user.provider === "kakao" ? "카카오" : "일반";
          return `${user.id} (${providerLabel})`;
        })
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
    <form onSubmit={handleSubmit(findIdOnSubmit)}>
      <div className="flex flex-col gap-6">
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
