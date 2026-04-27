export default function PointsHistoryList() {
  return (
    <section>
      <h2 className="title3 border-b border-neutral-300 pb-6">적립내역</h2>
      <article>
        {/* 이부분 반복문 예정 */}
        <div className="flex flex-col gap-3 border-b border-neutral-300 p-4">
          <p className="body2 text-text-disabled">
            2025.12.17 <span>(주문번호 : 0000000000000000)</span>
          </p>
          <div className="flex justify-between">
            <p>리뷰 작성 적립</p>
            <p>+300</p>
          </div>
        </div>
      </article>
    </section>
  );
}
