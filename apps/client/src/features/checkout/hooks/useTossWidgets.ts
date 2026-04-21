import { initTossWidgets } from "@/features/checkout/lib/toss";
import { useEffect, useRef } from "react";

type TossWidgets = Awaited<ReturnType<typeof initTossWidgets>>;

export const useTossWidgets = (totalPayment: number) => {
  const widgetsRef = useRef<TossWidgets | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const init = async () => {
      const widgets = await initTossWidgets(totalPayment);

      await widgets.renderPaymentMethods({
        selector: "#payment-method",
      });

      await widgets.renderAgreement({
        selector: "#agreement",
      });

      widgetsRef.current = widgets;
    };

    init();
  }, []);

  useEffect(() => {
    if (!widgetsRef.current) return;

    widgetsRef.current.setAmount({
      currency: "KRW",
      value: totalPayment,
    });
  }, [totalPayment]);

  return { widgetsRef };
};
