"use client";

import { MyReviewList } from "@/features/product/model";
import FileUploader from "@/shared/components/form/FileUploaderForm";
import ReviewRatingsButton from "@/shared/ui/review/ReviewRatingsButton";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@repo/ui";
import { useState } from "react";

type ReviewSubmitPayload = {
  rating: number;
  content: string;
  keepImageUrls: string[];
  images: File[];
};
type ReviewModalProps = {
  orderDetailId?: number;
  review?: MyReviewList;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  onSubmit: (payload: ReviewSubmitPayload) => Promise<void>;
};
type ReviewForm = {
  content: string;
  rating: number;
  images: File[];
  imageUrls: string[];
};

export default function ReviewModal(props: ReviewModalProps) {
  const {
    isOpen,
    onClose,
    isLoading = false,
    orderDetailId,
    review,
    onSubmit,
  } = props;
  if (!review && !orderDetailId) {
    throw new Error("review 또는 orderDetailId 중 하나는 필요합니다.");
  }
  if (review && orderDetailId) {
    throw new Error("review와 orderDetailId 동시에 넘기면 안됩니다.");
  }
  const [error, setError] = useState("");

  const getInitialForm = (): ReviewForm => ({
    content: review?.content ?? "",
    rating: review?.rating ?? 0,
    images: [],
    imageUrls: review?.imageUrls ?? [],
  });

  const [form, setForm] = useState<ReviewForm>(() => getInitialForm());

  const handleSubmit = async () => {
    if (form.content.trim().length < 20) {
      setError("리뷰는 최소 20자 이상 작성해주세요.");
      return;
    }
    if (form.rating === 0) {
      setError("별점을 선택해주세요.");
      return;
    }
    await onSubmit({
      rating: form.rating,
      content: form.content,
      keepImageUrls: form.imageUrls,
      images: form.images,
    });
    handleClose();
  };

  const handleClose = () => {
    setError("");
    setForm(getInitialForm());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="w-[92%] max-w-192">
        <ModalHeader title={`리뷰 ${review ? "수정" : "등록"}하기`} />
        <ModalBody>
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            <section className="flex flex-col gap-4">
              {review && <p>상품명 : {review.productName}</p>}
              <div className="flex flex-col gap-3">
                <p>별점 등록({form.rating}/5)</p>
                <ReviewRatingsButton
                  rating={form.rating}
                  onChange={(rating) =>
                    setForm((prev) => ({
                      ...prev,
                      rating,
                    }))
                  }
                />
              </div>
              <div>
                <p className="mb-3">리뷰</p>
                <textarea
                  className="min-h-45 w-full resize-none border border-neutral-300 p-4"
                  value={form.content}
                  maxLength={300}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }));
                    if (error) setError("");
                  }}
                  placeholder="리뷰는 최소 20자, 최대 300자 이하까지 작성가능합니다."
                />
              </div>
              <FileUploader
                imageUrls={form.imageUrls}
                images={form.images}
                onChangeImageUrls={(imageUrls) =>
                  setForm((prev) => ({
                    ...prev,
                    imageUrls,
                  }))
                }
                onChangeImages={(images) =>
                  setForm((prev) => ({
                    ...prev,
                    images,
                  }))
                }
              />
              {error && <p className="caption1 text-danger-200">{error}</p>}
            </section>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="float-right flex w-[50%] gap-2.5">
            <Button variant="stroke" onClick={handleClose}>
              취소
            </Button>
            <Button variant="gray" onClick={handleSubmit}>
              등록
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
