export default function CheckoutNotice() {
  return (
    <div className="bg-neutral-100 p-4">
      <p className="caption2 mb-1.5">구매 시 유의사항</p>
      <ul>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            주문 상태가 '배송 준비' 및 '배송 중'일 경우 취소 처리가 불가합니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            교환/환불은 상품 수령 후 3일이내(택배도착기준일)에 연락주셔야
            교환가능합니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            불량상품일 경우 1일이내 연락주셔야 가능하십니다. 꼭 상품 수령 후
            24시간이내 확인부탁드립니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            제품불량이 아닌 단순변심으로 인한 교환/환불은 왕복택배비 7000원
            부담되십니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            초크자국(물에지워짐), 실밥자국은 불량에 해당되지 않습니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            착용 흔적 및 제품훼손 ( 향수 & 바디미스트 & 바디로션 & 섬유유연제 )
            세탁하신 경우 교환 불가합니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            상세사이즈는 측정하는법에 따라 3-5센치 정도 오차가 있을수도있습니다.
            해당사유는 불량이 아닙니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            화이트상품 & 레더상품 & 레이스 & 네오프랜상품 & 니트상품 & 나시류 &
            린넨원단은 교환 횐불불가입니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            택 제거, 고의적 훼손, 세탁 흔적 있을 시 반송 됩니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-text-disabled mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-text-disabled caption2-loose">
            세일/이벤트 상품은 교환·반품이 제한될 수 있습니다.
          </span>
        </li>
        <li className="flex items-start gap-1.75">
          <span className="bg-danger-200 mt-1.5 h-0.75 w-0.75"></span>
          <span className="text-danger-200 caption2-loose">
            모든 검수 과정 CCTV 녹화중입니다.
          </span>
        </li>
      </ul>
    </div>
  );
}
