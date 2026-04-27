import { fetchPrepareOrder } from "@/features/checkout/api";
import {
  Address,
  CheckoutItem,
  PrepareOrderItem,
} from "@/features/checkout/model";
import { useCallback } from "react";

type TossWidgets = {
  setAmount: (args: { currency: "KRW"; value: number }) => void;
  requestPayment: (args: {
    orderId: string;
    orderName: string;
    customerName?: string;
    successUrl: string;
    failUrl: string;
  }) => Promise<void>;
};

type PropsCheckoutPayment = {
  widgetsRef: React.RefObject<TossWidgets | null>;
  checkoutItems: CheckoutItem[];
  selectedAddress?: Address;
  usedPoints: number;
};

export const useCheckoutPayment = ({
  widgetsRef,
  checkoutItems,
  selectedAddress,
  usedPoints,
}: PropsCheckoutPayment) => {
  const requestPayment = useCallback(async () => {
    try {
      if (!widgetsRef.current) {
        alert("결제 모듈이 아직 로드되지 않았습니다.");
        return;
      }

      const items: PrepareOrderItem[] = checkoutItems.map((item) => ({
        productDetailId: item.productDetailId,
        quantity: item.quantity,
      }));

      const order = await fetchPrepareOrder(items, usedPoints);

      await widgetsRef.current.setAmount({
        currency: "KRW",
        value: order.paymentAmount,
      });

      await widgetsRef.current.requestPayment({
        orderId: order.orderNumber,
        orderName:
          checkoutItems.length > 1
            ? `${checkoutItems[0].productName} 외 ${checkoutItems.length - 1}건`
            : checkoutItems[0].productName,
        customerName: selectedAddress?.receiver,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch (error) {
      const err = error as {
        code?: string;
        status?: number;
        message?: string;
      };

      if (err.code === "PAY_PROCESS_CANCELED") {
        alert("결제가 취소되었습니다.");
        return;
      }

      if (err.status === 409) {
        alert(err.message ?? "재고가 부족합니다.");
        return;
      }

      if (err.status === 503) {
        alert(err.message ?? "재고 처리 중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      alert("결제 처리 중 오류가 발생했습니다.");
    }
  }, [widgetsRef, checkoutItems, selectedAddress, usedPoints]);

  return { requestPayment };
};
