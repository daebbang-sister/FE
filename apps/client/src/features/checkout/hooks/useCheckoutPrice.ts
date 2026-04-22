import { Address, CheckoutItem } from "@/features/checkout/model";
import {
  calculateCheckoutProductsPrice,
  calculateCheckoutShipping,
} from "@/features/checkout/utils";
import { useMemo } from "react";

type CheckoutPriceProps = {
  checkoutItems: CheckoutItem[];
  selectedAddress?: Address;
  usedPoints: number;
};

export const useCheckoutPrice = ({
  checkoutItems,
  selectedAddress,
  usedPoints,
}: CheckoutPriceProps) => {
  return useMemo(() => {
    const totalPrice = calculateCheckoutProductsPrice(checkoutItems);

    const shippingFee = calculateCheckoutShipping(
      selectedAddress?.zipCode ?? "",
      totalPrice
    );

    const totalPayment = Math.max(totalPrice + shippingFee - usedPoints, 0);

    const savingPercent = 5;
    const savingPoint = Math.floor(totalPrice * (savingPercent / 100));

    return {
      totalPrice,
      shippingFee,
      totalPayment,
      savingPoint,
    };
  }, [checkoutItems, selectedAddress?.zipCode, usedPoints]);
};
