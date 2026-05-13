export default function OrderPurchaseNotice() {
  return (
    <article className="space-y-1.5 bg-neutral-100 p-4">
      <p className="caption2">구매 시 유희사항</p>
      <ul className="caption2 text-text-disabled list-disc pl-4.5">
        <li>
          주문 상태가 ‘배송 준비’ 및 ‘배송 중’일 경우 취소 처리가 불가합니다.
        </li>
        <li>
          교환/환불은 상품 수령 후 3일이내(택배도착기준일)에 연락주셔야
          교환가능합니다.
        </li>
        <li>
          불량상품일 경우 1일이내 연락주셔야 가능하십니다. 꼭 상품 수령 후
          24시간이내 확인부탁드립니다.
        </li>
        <li>
          제품불량이 아닌 단순변심으로 인한 교환/환불은 왕복택배비 7000원
          부담되십니다.
        </li>
        <li>초크자국(물에지워짐), 실밥자국은 불량에 해당되지 않습니다.</li>
        <li>
          착용 흔적 및 제품훼손 ( 향수 & 바디미스트 & 바디로션 & 섬유유연제 )
          세탁하신 경우 교환 불가합니다.
        </li>
        <li>
          상세사이즈는 측정하는법에 따라 3-5센치 정도 오차가 있을수도있습니다.
          해당사유는 불량이 아닙니다.
        </li>
        <li>
          화이트상품 & 레더상품 & 레이스 & 네오프랜상품 & 니트상품 & 나시류 &
          린넨원단은 교환 횐불불가입니다.
        </li>
        <li>택 제거, 고의적 훼손, 세탁 흔적 있을 시 반송 됩니다.</li>
        <li>세일/이벤트 상품은 교환·반품이 제한될 수 있습니다.</li>
        <li className="text-danger-200">모든 검수 과정 CCTV 녹화중입니다.</li>
      </ul>
    </article>
  );
}
