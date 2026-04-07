import { Button } from "@repo/ui";

type CartSummaryProps = {
  totalPrice: number;
  shippingFee: number;
  totalPayment: number;
  onOrderSelected: () => void;
  onOrderAll: () => void;
};

export default function CartSummary({
  totalPrice,
  shippingFee,
  totalPayment,
  onOrderSelected,
  onOrderAll,
}: CartSummaryProps) {
  return (
    <div
      className="border-border-default sticky w-full max-w-112.5 self-start border px-7.5 py-10"
      style={{ top: "calc(var(--size-header-h) + 60px)" }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span>상품 합계 금액</span>
          <span>{totalPrice.toLocaleString()}won</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>{shippingFee.toLocaleString()}won</span>
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
        <span>{totalPayment.toLocaleString()}won</span>
      </div>

      <div className="mt-9 flex gap-2.5">
        <Button variant="stroke" onClick={onOrderSelected}>
          선택 상품 주문
        </Button>
        <Button variant="gray" onClick={onOrderAll}>
          전체 상품 주문
        </Button>
      </div>
    </div>
  );
}
