import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof checkoutSchema>;

type Props = {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
};

export const useCheckoutAgree = ({ setValue, watch }: Props) => {
  const agreePrivacy = watch("agreePrivacy");
  const agreeOrder = watch("agreeOrder");

  const allAgreeChecked = agreePrivacy && agreeOrder;

  const handleAllAgreeChecked = (checked: boolean) => {
    setValue("agreeOrder", checked);
    setValue("agreePrivacy", checked);
  };

  return {
    agreePrivacy,
    agreeOrder,
    allAgreeChecked,
    handleAllAgreeChecked,
  };
};
