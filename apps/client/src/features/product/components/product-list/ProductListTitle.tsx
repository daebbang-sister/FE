"use client";
import { TabButton } from "@repo/ui";

type Props = {
  title: string;
};

export default function ProductListTitle({ title }: Props) {
  return (
    <article className="flex flex-col items-center gap-3 py-17">
      <p className="title2">{title}</p>
      {title === "실시간 베스트" && (
        <>
          <p className="body1 text-text-disabled mb-3">
            평일 오전 10시 업데이트
          </p>
          <TabButton
            tabs={["전체보기", "탑", "팬츠", "트레이닝", "아우터"]}
            size={"M"}
            defaultIndex={0}
            onChange={(i) => console.log("선택된 탭:", i)}
          />
        </>
      )}
    </article>
  );
}
