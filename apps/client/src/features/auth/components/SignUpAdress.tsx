import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { SignUpFormValues } from "@/features/auth/schemas/sign-up.schema";
import { useKakaoPostcode } from "@/shared/hooks/useKakaoPostcode";
import { Button, Input } from "@repo/ui";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type Props = {
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
};

export default function SignUpAdress({ register, setValue }: Props) {
  const { openPostcode } = useKakaoPostcode();
  const handleSearchAddress = () => {
    openPostcode((data) => {
      setValue("zonecode", data.zonecode, { shouldValidate: true });
      setValue("address", data.address, { shouldValidate: true });
    });
  };

  return (
    <div>
      <SignUpInputLabel htmlFor="readonly-id">주소</SignUpInputLabel>
      <div className="mb-3 flex gap-2.5">
        <Input id="readonly-id" status="disabled" {...register("zonecode")} />
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
  );
}
