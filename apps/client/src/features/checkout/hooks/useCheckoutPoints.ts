import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { z } from "zod";
import { useEffect, useState } from "react";
import { getMyPointsAPI } from "@/features/mypage/api";

type FormData = z.infer<typeof checkoutSchema>;

type Props = {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
};

export const useCheckoutPoints = ({ setValue, watch }: Props) => {
  const [availablePoints, setAvailablePoints] = useState(0);
  const [isPointError, setIsPointError] = useState(false);
  const usedPoints = watch("usedPoints");

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const data = await getMyPointsAPI();

        setAvailablePoints(data.currentAmount);
        setIsPointError(false);
      } catch (error) {
        console.error("적립금 조회 실패", error);
        setAvailablePoints(0);
        setIsPointError(true);
      }
    };

    fetchPoints();
  }, []);

  useEffect(() => {
    if (usedPoints > availablePoints) {
      setValue("usedPoints", availablePoints);
    }
  }, [availablePoints, usedPoints, setValue]);

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
    isPointError,
  };
};
