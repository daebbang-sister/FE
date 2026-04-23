export default function OrderHistoryDashboard() {
  return (
    <section className="mb-12 grid h-38.75 grid-cols-4 divide-x divide-neutral-300 border border-neutral-300 py-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">0</p>
        <p className="body1 text-text-disabled">결제 완료</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">0</p>
        <p className="body1 text-text-disabled">배송준비중</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">0</p>
        <p className="body1 text-text-disabled">배송중</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">0</p>
        <p className="body1 text-text-disabled">배송 완료</p>
      </div>
    </section>
  );
}
