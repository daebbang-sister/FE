"use client";

import { Dropdown, PageButton } from "@repo/ui";
import OrderHistoryCard from "./OrderHistoryCard";
import { getOrderDate } from "@/features/mypage/utils/orderDate";
import { useEffect, useState } from "react";
import { OrderItem } from "@/features/mypage/model";
import { getOrdersListAPI } from "@/features/mypage/api";
import PageLoading from "@/shared/components/layout/PageLoading";
import { useRouter, useSearchParams } from "next/navigation";
import { PageResponse } from "@/shared/type/model";

export default function OrderHistoryList() {
  const statusOptions = [
    { label: "결제완료", value: "결제완료" },
    { label: "배송준비", value: "배송준비" },
    { label: "배송중", value: "배송중" },
    { label: "배송완료", value: "배송완료" },
  ];
  const dateOptions = [{ label: "최근의 3개월", value: "최근의 3개월" }];

  const [orderItem, setOrderItem] = useState<PageResponse<OrderItem> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { startDate, endDate } = getOrderDate(3);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const pageSize = 10;
  const totalElements = orderItem?.totalElements ?? 0;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    params.set("page", String(page));
    router.push(`/mypage/orders?${params.toString()}`);
  };

  useEffect(() => {
    fetGetOrdersList(currentPage);
  }, [currentPage]);

  const fetGetOrdersList = async (page: number) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getOrdersListAPI(
        startDate,
        endDate,
        page - 1,
        pageSize
      );
      // console.log(res, "리스트페이지 데이터");
      setOrderItem(res);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <PageLoading />;
  if (!isLoading && isError) return <div> 리뷰를 불러오지 못했습니다.</div>;
  if (!isLoading && orderItem && orderItem.content.length === 0) {
    return (
      <div className="text-text-disabled body1 flex h-full items-center justify-center">
        주문 내역이 없습니다.
      </div>
    );
  }

  return (
    <>
      <section className="mb-18">
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
        <OrderHistoryCard
          orderItem={orderItem?.content ?? []}
          refetch={() => fetGetOrdersList(currentPage)}
        />
      </section>
      <article className="flex w-full justify-center">
        <PageButton
          totalItems={totalElements}
          limit={pageSize}
          currentPage={currentPage}
          pageGroupSize={5}
          onPageChange={(page) => handlePageChange(page)}
        />
      </article>
    </>
  );
}
