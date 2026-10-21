"use client";

import { getOrdersCountAPI } from "@/features/mypage/api";
import { OrdersCounts } from "@/features/mypage/model";
import { getOrderDate } from "@/features/mypage/utils/orderDate";
import { useEffect, useState } from "react";

export default function OrderHistoryDashboard() {
  const { startDate, endDate } = getOrderDate(3);

  const [data, setData] = useState<OrdersCounts | null>(null);
  useEffect(() => {
    const fetGetOrdersCount = async () => {
      try {
        const res = await getOrdersCountAPI(startDate, endDate);
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetGetOrdersCount();
  }, []);

  return (
    <section className="mb-12 grid h-38.75 grid-cols-4 divide-x divide-neutral-300 border border-neutral-300 py-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">{data?.paid ?? 0}</p>
        <p className="body1 text-text-disabled">결제 완료</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">{data?.preparingDelivery ?? 0}</p>
        <p className="body1 text-text-disabled">배송준비중</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">{data?.inDelivery ?? 0}</p>
        <p className="body1 text-text-disabled">배송중</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-[32px]">{data?.delivered ?? 0}</p>
        <p className="body1 text-text-disabled">배송 완료</p>
      </div>
    </section>
  );
}
