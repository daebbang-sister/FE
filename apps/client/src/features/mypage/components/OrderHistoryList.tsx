import { Dropdown } from "@repo/ui";
import OrderHistoryCard from "./OrderHistoryCard";

export default function OrderHistoryList() {
  const statusOptions = [
    { label: "인기순", value: "인기순" },
    { label: "신상품순", value: "신상품순" },
    { label: "상품명", value: "상품명" },
    { label: "높은 가격순", value: "높은 가격순" },
    { label: "낮은 가격순", value: "낮은 가격순" },
  ];
  const dateOptions = [
    { label: "인기순", value: "인기순" },
    { label: "신상품순", value: "신상품순" },
    { label: "상품명", value: "상품명" },
    { label: "높은 가격순", value: "높은 가격순" },
    { label: "낮은 가격순", value: "낮은 가격순" },
  ];

  return (
    <section>
      <article className="border-000 flex gap-1.25 border-b pb-6">
        <Dropdown
          className="ml-auto w-auto"
          id="status"
          placeholder="전체"
          size="M"
          options={statusOptions}
          //   onChange={() => {}}
        />
        <Dropdown
          className="ml-auto w-auto"
          id="date"
          placeholder="최근 3개월"
          size="M"
          options={dateOptions}
          //   onChange={() => {}}
        />
      </article>
      <OrderHistoryCard />
    </section>
  );
}
