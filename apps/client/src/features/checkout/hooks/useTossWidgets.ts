import { initTossWidgets } from "@/features/checkout/lib/toss";
import { useEffect, useRef } from "react";

export const useTossWidgets = (totalPayment: number, paymentMethod: string) => {
  const widgetsRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      document.querySelector("#payment-method")!.innerHTML = "";
      document.querySelector("#agreement")!.innerHTML = "";

      const widgets = await initTossWidgets(totalPayment);
      await widgets.renderPaymentMethods({ selector: "#payment-method" });
      await widgets.renderAgreement({ selector: "#agreement" });

      widgetsRef.current = widgets;
    };

    init();
  }, [paymentMethod]);

  useEffect(() => {
    if (!widgetsRef.current) return;
    widgetsRef.current.setAmount({ currency: "KRW", value: totalPayment });
  }, [totalPayment]);

  return { widgetsRef };
};
