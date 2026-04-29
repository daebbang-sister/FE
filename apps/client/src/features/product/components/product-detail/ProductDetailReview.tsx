"use client";

import { PageButton } from "@repo/ui";
import { useEffect, useRef, useState } from "react";
import {
  getProductReviewCount,
  getProductReviewList,
} from "@/features/product/api";
import { ReviewList, ReviewSummary } from "@/features/product/model";
import Image from "next/image";
import { PageResponse } from "@/shared/type/model";
import PageLoading from "@/shared/components/layout/PageLoading";
import ReviewRatings from "@/shared/ui/review/ReviewRatings";

type Props = {
  productId: number;
};

export default function ProductReview({ productId }: Props) {
  const RATING_LABELS = [
    { key: 5, label: "아주 좋아요" },
    { key: 4, label: "맘에 들어요" },
    { key: 3, label: "보통이에요" },
    { key: 2, label: "그냥 그래요" },
    { key: 1, label: "별로예요" },
  ] as const;

  const sectionRef = useRef<HTMLElement | null>(null);
  const isFetchedRef = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [reviewCount, setReviewCount] = useState<ReviewSummary | null>(null);
  const [reviewPage, setReviewPage] = useState<PageResponse<ReviewList> | null>(
    null
  );
  const reviewList = reviewPage?.content ?? [];
  const totalElements = reviewPage?.totalElements ?? 0;
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviewList = async (page: number) => {
    if (page === currentPage) return;

    setIsLoading(true);
    setIsError(false);
    try {
      const listRes = await getProductReviewList(productId, page - 1, pageSize);
      setReviewPage(listRes);
      setCurrentPage(page);
    } catch (error) {
      setIsError(true);
      console.error("리뷰 목록 조회 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetchedRef.current) return;

        isFetchedRef.current = true;
        observer.disconnect();

        try {
          setIsLoading(true);
          setIsError(false);

          const [countRes, listRes] = await Promise.all([
            getProductReviewCount(productId),
            getProductReviewList(productId, 0, pageSize),
          ]);

          setReviewCount(countRes);
          setReviewPage(listRes);
        } catch (error) {
          setIsError(true);
          console.error("리뷰 초기 로딩 실패", error);
        } finally {
          setIsLoading(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [productId]);

  return (
    <>
      <section ref={sectionRef}>
        <h2 className="title2 mb-9">고객 리뷰</h2>

        <article className="flex items-center text-center">
          <div className="w-35 md:w-56.25">
            <p className="mb-1.5 text-[56px] leading-[56px] font-bold">
              {reviewCount?.averageRating}
            </p>
            <p className="caption1 text-text-disabled">
              리뷰 {reviewCount?.totalCount.toLocaleString()}개
            </p>
          </div>

          <div className="flex-1">
            <ul className="flex flex-col gap-3">
              {RATING_LABELS.map(({ key, label }) => {
                const count = reviewCount?.ratingCounts[key] ?? 0;
                const total = reviewCount?.totalCount ?? 0;
                const percent = total === 0 ? 0 : (count / total) * 100;
                return (
                  <li key={key} className="flex items-center gap-2.5">
                    <p className="min-w-18 text-left">{label}</p>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200">
                      <div
                        className="h-full bg-black transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <p className="min-w-7.5 text-right">
                      {count.toLocaleString()}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>

        <article className="my-12 mb-18 flex flex-col gap-7.5">
          {isLoading && (
            <div className="py-10">
              <PageLoading />
            </div>
          )}
          {!isLoading && isError && (
            <p className="text-text-disabled py-10 text-center">
              리뷰를 불러오지 못했습니다.
            </p>
          )}
          {!isLoading && reviewList && reviewList.length === 0 && (
            <p className="text-text-disabled py-10 text-center">
              상품 리뷰가 없습니다.
            </p>
          )}

          {reviewList?.map((review) => {
            return (
              <div key={review.reviewId}>
                <div className="body1 mb-3 flex justify-between">
                  <p>{review.maskedLoginId}</p>
                  <p className="text-text-disabled">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <ReviewRatings rating={review.rating} />
                <div className="my-1">
                  <p className="body2">{review.content}</p>
                  {review.reply && (
                    <p className="body2 text-text-disabled py-1">
                      ↳ {review.reply}
                    </p>
                  )}
                </div>
                <div className="flex gap-1.25">
                  {(review.imageUrls ?? []).map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="relative h-31.25 w-31.25 border border-black"
                      >
                        <Image
                          src={item}
                          alt="썸네일"
                          fill
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </article>

        <article className="flex w-full justify-center">
          <PageButton
            totalItems={totalElements}
            limit={pageSize}
            pageGroupSize={5}
            onPageChange={(page) => fetchReviewList(page)}
          />
        </article>
      </section>
    </>
  );
}
