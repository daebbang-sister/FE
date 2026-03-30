"use client";

import CartItem from "@/features/cart/ui/cart-item/CartItem";
import { Button, CheckBox } from "@repo/ui";
import { useState } from "react";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="page-y container flex min-h-screen items-start justify-between gap-13.5">
      {/* 왼쪽 */}
      <div className="flex-1">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-1.75">
            <CheckBox id="1" />
            전체 선택
          </div>
          <div className="flex items-center gap-3">
            <button className="text-text-disabled hover:text-text-primary transition duration-200">
              선택 삭제
            </button>
            <button className="text-text-disabled hover:text-text-primary">
              전체 삭제
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <CartItem quantity={quantity} setQuantity={setQuantity} />
          <CartItem quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>

      {/* 오른쪽 */}
      <div
        className="border-border-default sticky w-full max-w-112.5 self-start border px-7.5 py-10"
        style={{ top: "calc(var(--size-header-h) + 60px)" }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>상품 합계 금액</span>
            <span>46,000won</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span>46,000won</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="caption1 text-text-disabled">
              ㄴ 기본택배비 3000 / 제주 산간·도서지역 6000
            </span>
            <span className="caption1 text-text-disabled">
              ㄴ 7만원 이상 배송비 무료, 14만원 이상 분리 배송 가능(카톡 문의)
            </span>
          </div>
        </div>
        <div className="title3 border-text-primary mt-6 flex justify-between border-t pt-6">
          <span>결제 예상 금액</span>
          <span>46,000won</span>
        </div>

        <div className="mt-9 flex gap-2.5">
          <Button variant="stroke">선택 상품 주문</Button>
          <Button variant="gray">전체 상품 주문</Button>
        </div>
      </div>
    </div>
  );
}
