"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "packages/ui/src";
import { z } from "zod";

import { findIdSchema } from "apps/client/src/features/auth/schemas/find-id.schema";

type IdFormData = z.infer<typeof findIdSchema>;

export default function FindIdForm() {
  const idForm = useForm<IdFormData>({
    resolver: zodResolver(findIdSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone1: "",
      phone2: "",
      phone3: "",
    },
  });

  const findIdOnSubmit = (data: IdFormData) => {
    console.log("find id", data);
  };

  return (
    <form onSubmit={idForm.handleSubmit(findIdOnSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="name">이름</label>
          <Input
            id="find-id-name"
            placeholder="이름을 입력하세요"
            {...idForm.register("name")}
            errorMessage={idForm.formState.errors.name?.message}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label>전화번호</label>
          <div className="flex gap-2.5">
            <Input
              id="phone1"
              placeholder="통신사"
              {...idForm.register("phone1")}
              errorMessage={idForm.formState.errors.phone1?.message}
            />

            <Input
              id="phone2"
              placeholder="0000"
              inputMode="numeric"
              maxLength={4}
              {...idForm.register("phone2")}
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                ))
              }
            />

            <Input
              id="phone3"
              placeholder="0000"
              inputMode="numeric"
              maxLength={4}
              {...idForm.register("phone3")}
              onInput={(e) =>
                (e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                ))
              }
            />
          </div>
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
