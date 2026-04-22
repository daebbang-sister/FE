import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { z } from "zod";

type FormData = z.infer<typeof checkoutSchema>;

type Props = {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
};

export const useCheckoutPoints = ({ setValue, watch }: Props) => {
  const availablePoints = 400;
  const usedPoints = watch("usedPoints");

  const handleUseAllPoints = () => {
    setValue("usedPoints", availablePoints, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handlePointsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let numberValue = value === "" ? 0 : Number(value);

    if (Number.isNaN(numberValue)) return;
    if (numberValue < 0) numberValue = 0;
    if (numberValue > availablePoints) {
      alert("보유 적립금을 초과할 수 없습니다.");
      return;
    }

    setValue("usedPoints", numberValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return {
    availablePoints,
    usedPoints,
    handleUseAllPoints,
    handlePointsInput,
  };
};
