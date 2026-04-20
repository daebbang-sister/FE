import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof checkoutSchema>;

export const useCheckoutPaymentMethod = (
  setValue: UseFormSetValue<FormData>
) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState("toss");

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    setValue("paymentMethod", index === 0 ? "card" : "bank");

    if (index === 0) {
      setValue("paymentMethod", "card");
      setSelectedProvider("toss");
      setValue("bank", "");
      setValue("depositorName", "");
    } else {
      setValue("paymentMethod", "bank");
      setSelectedProvider("");
    }
  };

  return {
    tabIndex,
    selectedProvider,
    setSelectedProvider,
    handleTabChange,
  };
};
