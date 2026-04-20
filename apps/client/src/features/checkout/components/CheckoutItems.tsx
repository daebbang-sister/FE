"use client";

import Image from "next/image";
import { useCheckoutStore } from "@/features/checkout/store/checkout.store";

export default function CheckoutItems() {
  const checkoutItems = useCheckoutStore((s) => s.items);

  return (
    <div>
      <h6 className="title3 mb-6">주문 상품 정보</h6>

      <div className="flex flex-col gap-3">
        {checkoutItems.map((item) => {
          const price =
            (item.discountRate ? item.discountPrice : item.originalPrice) *
            item.quantity;

          return (
            <div
              key={item.cartId}
              className="border-border-default flex gap-3 border p-4"
            >
              <div className="relative h-25 w-25 overflow-hidden">
                <Image
                  className="object-cover object-center"
                  fill
                  alt={item.productName}
                  src={item.mainImageUrl}
                />
              </div>

              <div>
                <h2>{item.productName}</h2>

                <p className="text-text-disabled mt-3 mb-6">
                  {item.color} / {item.size} {item.quantity}개
                </p>

                <b>{price.toLocaleString()}won</b>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
