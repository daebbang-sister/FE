"use client";

import { getMyPointsAPI, getMyPointsHistoryAPI } from "@/features/mypage/api";
import MypageTitle from "@/features/mypage/components/MypageTitle";
import PointsHistoryDashboard from "@/features/mypage/components/PointsHistoryDashboard";
import PointsHistoryList from "@/features/mypage/components/PointsHistoryList";
import { MyPoints, MyPointsHistory } from "@/features/mypage/model";
import { PageResponse } from "@/shared/type/model";
import { PageButton } from "@repo/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPagePoints() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const pageSize = 10;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<MyPoints | null>(null);
  const [pageData, setPageData] =
    useState<PageResponse<MyPointsHistory> | null>(null);
  const totalElements = pageData?.totalElements ?? 0;

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await getMyPointsAPI();
        setData(res);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };
    fetchPoints();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await getMyPointsHistoryAPI(currentPage - 1, pageSize);
        setPageData(res);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/mypage/points?${params.toString()}`);
  };

  return (
    <section className="h-[calc(100%-256px)]">
      <MypageTitle title={"적립금"} />

      <PointsHistoryDashboard pointsData={data} />
      <PointsHistoryList
        pointsHistory={pageData?.content ?? []}
        isLoading={isLoading}
        isError={isError}
      />

      <article className="flex w-full justify-center">
        <PageButton
          totalItems={totalElements}
          limit={pageSize}
          pageGroupSize={5}
          onPageChange={(page) => handlePageChange(page)}
        />
      </article>
    </section>
  );
}
