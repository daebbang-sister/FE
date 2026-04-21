import { Address, CheckoutItem } from "@/features/checkout/model";

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
  totalPayment: number;
  widgetsRef: React.RefObject<TossWidgets | null>;
  checkoutItems: CheckoutItem[];
  selectedAddress?: Address;
};

export const useCheckoutPayment = ({
  totalPayment,
  widgetsRef,
  checkoutItems,
  selectedAddress,
}: PropsCheckoutPayment) => {
  const requestPayment = async () => {
    try {
      const order = {
        orderId: `order-${Date.now()}`,
        amount: totalPayment,
      };

      if (!widgetsRef.current) return;

      await widgetsRef.current.setAmount({
        currency: "KRW",
        value: order.amount,
      });

      await widgetsRef.current.requestPayment({
        orderId: order.orderId,
        orderName:
          checkoutItems.length > 1
            ? `${checkoutItems[0].productName} 외 ${checkoutItems.length - 1}건`
            : checkoutItems[0].productName,
        customerName: selectedAddress?.receiver,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      });
    } catch (error) {
      const err = error as { code?: string };

      if (err.code === "PAY_PROCESS_CANCELED") {
        alert("결제가 취소되었습니다.");
        return;
      }

      console.error("결제 실패:", error);
    }
  };

  return { requestPayment };
};
