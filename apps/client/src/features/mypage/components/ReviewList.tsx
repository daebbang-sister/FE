"use client";

import {
  deleteMyReview,
  getMyReviewList,
  updateMyReview,
} from "@/features/mypage/api";
// import { mockMyReviewPage } from "@/features/product/data";
import { MyReviewList, ReviewSubmitParams } from "@/features/product/model";
import PageLoading from "@/shared/components/layout/PageLoading";
import ReviewModal from "@/shared/components/modal/ReviewModal";
import { PageResponse } from "@/shared/type/model";
import ReviewRatings from "@/shared/ui/review/ReviewRatings";
import { PageButton } from "@repo/ui";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/mypage/review?${params.toString()}`);
  };

  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<MyReviewList | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [reviewPage, setReviewPage] =
    useState<PageResponse<MyReviewList> | null>(null);

  const reviewList = reviewPage?.content ?? [];
  const totalElements = reviewPage?.totalElements ?? 0;
  const currentPage = Number(searchParams.get("page") ?? "1");
  const pageSize = 10;

  useEffect(() => {
    fetchMyReview(currentPage);
  }, [currentPage]);

  const fetchMyReview = async (page: number) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getMyReviewList(page - 1, pageSize);
      // console.log(res, "리뷰 데이터");
      setReviewPage(res);
    } catch (error) {
      console.error("리뷰 요약 조회 실패", error);
      setIsError(true);
    } finally {
      setIsError(false);
      setIsLoading(false);
    }
  };

  const fetchDeleteMyReview = async (reviewId: number) => {
    const cof = confirm(
      "리뷰를 삭제하시겠습니까?\n삭제후 해당 상품의 리뷰를 다시 작성할 수 없습니다."
    );
    if (!cof) {
      return;
    }
    try {
      await deleteMyReview(reviewId);
      fetchMyReview(currentPage);
    } catch (error) {
      console.error("리뷰 삭제 실패", error);
    }
  };

  // 상태 업데이트
  const updateReviewState = (
    reviewId: number,
    payload: {
      rating: number;
      content: string;
      imageUrls: string[];
    }
  ) => {
    setReviewPage((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content: prev.content.map((item) =>
          item.reviewId === reviewId
            ? {
                ...item,
                rating: payload.rating,
                content: payload.content,
                imageUrls: payload.imageUrls,
              }
            : item
        ),
      };
    });
  };

  // 업데이트 함수호출
  const handleSubmitReview = async ({
    rating,
    content,
    keepImageUrls,
    images,
  }: ReviewSubmitParams) => {
    if (!selectedReview) return;
    try {
      const hasNewImages = images.length > 0;
      await updateMyReview(
        selectedReview.reviewId,
        { rating, content, keepImageUrls },
        images
      );
      // 새로운 사진 있을시 재호출 통신 (URL때문)
      if (hasNewImages) {
        await fetchMyReview(currentPage);
        return;
      }
      // 추가 사진 없을시 상태만 업데이트
      updateReviewState(selectedReview.reviewId, {
        rating,
        content,
        imageUrls: keepImageUrls,
      });
    } catch (error) {
      console.error(error);
      alert("리뷰 수정에 실패 하였습니다.");
    }
  };

  if (isLoading) return <PageLoading />;
  if (!isLoading && isError) return <div> 리뷰를 불러오지 못했습니다.</div>;
  if (!isLoading && reviewList && reviewList.length === 0) {
    return (
      <div className="text-text-disabled body1 flex h-full items-center justify-center">
        상품 리뷰가 없습니다.
      </div>
    );
  }
  return (
    <>
      <article className="mb-18 flex flex-col">
        {reviewList?.map((review) => {
          return (
            <div
              key={review.reviewId}
              className="border-b border-neutral-300 py-7.5 first:border-t"
            >
              <section className="flex items-start justify-between">
                <div
                  className={` ${review.pointStatus.includes("대기") ? "bg-text-disabled" : "bg-text-primary"} caption1 text-neutral-0 mb-6 inline-block px-4.5 py-2.5`}
                >
                  {review.pointStatus}
                </div>
                {review.pointStatus.includes("대기") && (
                  <div className="caption2 [&>div]:text-neutral-0 flex gap-1 [&>div]:cursor-pointer [&>div]:px-2 [&>div]:py-0.5">
                    <div
                      className="bg-text-disabled"
                      onClick={() => {
                        setIsOptionModalOpen(true);
                        setSelectedReview(review);
                      }}
                    >
                      수정
                    </div>
                    <div
                      className="bg-danger-800"
                      onClick={() => fetchDeleteMyReview(review.reviewId)}
                    >
                      삭제
                    </div>
                  </div>
                )}
              </section>
              <section className="body1 mb-3 flex justify-between">
                <p>[{review.productName}]</p>
                <p className="text-text-disabled">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </section>
              <ReviewRatings rating={review.rating} />
              <section className="my-1">
                <p className="body2">{review.content}</p>
                {review.reply && (
                  <p className="body2 text-text-disabled py-1">
                    ↳ {review.reply}
                  </p>
                )}
              </section>
              <section className="flex gap-1.25">
                {(review.imageUrls ?? []).map((item, index) => {
                  return (
                    <div key={index} className="relative h-31.25 w-31.25">
                      <Image
                        src={item}
                        alt="썸네일"
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </section>
            </div>
          );
        })}
      </article>
      <article className="flex w-full justify-center">
        <PageButton
          totalItems={totalElements}
          limit={pageSize}
          pageGroupSize={5}
          onPageChange={(page) => handlePageChange(page)}
        />
      </article>

      {selectedReview && (
        <ReviewModal
          key={selectedReview?.reviewId}
          review={selectedReview}
          isOpen={isOptionModalOpen}
          onClose={() => setIsOptionModalOpen(false)}
          isLoading={false}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
}
