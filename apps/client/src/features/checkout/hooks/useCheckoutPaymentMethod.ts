import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { useCallback, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof checkoutSchema>;

export const useCheckoutPaymentMethod = (
  setValue: UseFormSetValue<FormData>
) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState("toss");

  const handleTabChange = useCallback(
    (index: number) => {
      setTabIndex(index);

      if (index === 0) {
        setValue("paymentMethod", "card");
        setSelectedProvider("toss");
        setValue("bank", "");
        setValue("depositorName", "");
      } else {
        setValue("paymentMethod", "bank");
        setSelectedProvider("");
      }
    },
    [setValue]
  );

  return {
    tabIndex,
    selectedProvider,
    setSelectedProvider,
    handleTabChange,
  };
};
