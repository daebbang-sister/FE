"use client";
import PageLoading from "@/shared/components/layout/PageLoading";
import { MyPointsHistory } from "@features/mypage/model";

type props = {
  pointsHistory: MyPointsHistory[];
  isLoading: boolean;
  isError: boolean;
};

export default function PointsHistoryList({
  pointsHistory,
  isLoading,
  isError,
}: props) {
  if (isLoading) {
    return <PageLoading />;
  }
  if (isError) {
    return <p>적립금 정보를 불러오지 못했습니다.</p>;
  }
  if (!isLoading && pointsHistory && pointsHistory.length === 0) {
    return (
      <div className="text-text-disabled body1 flex h-full items-center justify-center">
        적립금 내역이 없습니다.
      </div>
    );
  }

  return (
    <section>
      <h2 className="title3 border-b border-neutral-300 pb-6">적립내역</h2>

      <article>
        {pointsHistory.map((points) => {
          const date = new Date(points.createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          return (
            <div
              key={points.id}
              className="flex flex-col gap-3 border-b border-neutral-300 p-4"
            >
              <p className="body2 text-text-disabled">
                {date}{" "}
                {points.referenceId && (
                  <span>(주문번호 : {points.referenceId})</span>
                )}
              </p>
              <div className="flex justify-between">
                <p>{points.description}</p>
                <p>
                  {points.earn ? "+" : "-"}
                  {points.changeAmount.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
}
