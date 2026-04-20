import { CartItem } from "@/features/cart/model";
import { Address } from "@/features/checkout/model";

type PropsCheckoutPayment = {
  totalPayment: number;
  widgetsRef: React.RefObject<any>;
  checkoutItems: CartItem[];
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
      // const order = await fetchPrepareOrder(items, data.usedPoints);

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
