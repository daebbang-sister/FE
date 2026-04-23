import { Button } from "@repo/ui";

type CheckoutSummaryProps = {
  totalPrice: number;
  shippingFee: number;
  totalPayment: number;
  savingPoint: number;
  usedPoints: number;
};

export default function CheckoutSummary({
  totalPrice,
  shippingFee,
  totalPayment,
  savingPoint,
  usedPoints,
}: CheckoutSummaryProps) {
  return (
    <div className="xl:border-border-default top-[calc(var(--size-header-h)+60px)] mt-12 w-full xl:sticky xl:mt-0 xl:max-w-112.5 xl:self-start xl:border xl:px-7.5 xl:py-10">
      <h6 className="title3 mb-6 block xl:hidden">결제 정보</h6>
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
            ㄴ 기본 배송비 3,000원 / 제주·도서산간 6,000원
          </span>
          <span className="caption1 text-text-disabled">
            ㄴ 무료배송 : 5만원 이상 / 제주·도서산간 10만원 이상
          </span>
          <span className="caption1 text-text-disabled">
            ㄴ 14만원 이상 주문 시 분리 배송 가능(카카오톡 문의)
          </span>
        </div>

        <div className="flex justify-between">
          <span>적립금</span>
          {usedPoints > 0 && <span>-{usedPoints.toLocaleString()}원</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="caption1 text-text-disabled">
            ㄴ 주문 시 예상 적립금 : {savingPoint}
          </span>
        </div>
      </div>

      <div className="title3 border-text-primary mt-6 flex justify-between border-t pt-6">
        <span>총 결제 금액</span>
        <span>{totalPayment.toLocaleString()}won</span>
      </div>

      <div className="mt-9">
        <Button variant="gray" type="submit">
          결제하기
        </Button>
      </div>
    </div>
  );
}
