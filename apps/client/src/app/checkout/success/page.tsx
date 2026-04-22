"use client";

import { fetchConfirmOrder } from "@/features/checkout/api";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckoutStore } from "@/features/checkout/store/checkout.store";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCheckout = useCheckoutStore((s) => s.clear);

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    if (!paymentKey || !orderId || !amount) return;

    const confirm = async () => {
      try {
        await fetchConfirmOrder(orderId, paymentKey, Number(amount));
        clearCheckout();
        router.push("/my");
      } catch (error) {
        console.error("결제 확정 실패", error);
        router.push("/checkout/fail");
      }
    };

    confirm();
  }, []);

  return (
    <div className="page-y container flex flex-col items-center justify-center">
      결제 처리 중입니다.
    </div>
  );
}
