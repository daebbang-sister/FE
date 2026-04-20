export default function CheckoutNotice() {
  return (
    <div className="bg-neutral-100 p-4">
      <p className="caption2 mb-1.5">구매 시 유희사항</p>
      <ul>
        <li className="flex items-center gap-1.75">
          <span className="bg-text-disabled h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            주문 상태가 '배송 준비' 및 '배송 중'일 경우 취소 처리가 불가합니다.
          </span>
        </li>
      </ul>
    </div>
  );
}
