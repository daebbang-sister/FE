export default function PointsHistoryDashboard() {
  return (
    <section className="mb-12 border border-neutral-200">
      <article className="body1 flex justify-between p-4">
        <p>사용 가능한 적립금</p>
        <p>300</p>
      </article>

      <article className="text-text-disabled body2 flex flex-col gap-4 bg-neutral-200 p-4">
        <ul className="flex justify-between">
          <li>총 적립금</li>
          <li>2300</li>
        </ul>
        <ul className="flex justify-between">
          <li>사용된 적립금</li>
          <li>2000</li>
        </ul>
      </article>
    </section>
  );
}
