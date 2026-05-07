"use client";

import { MyReviewList } from "@/features/product/model";
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
import Image from "next/image";
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
  const previewImages = [
    ...form.imageUrls.map((url) => ({
      type: "url" as const,
      src: url,
    })),
    ...form.images.map((file) => ({
      type: "file" as const,
      file,
      src: URL.createObjectURL(file),
    })),
  ];

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
              <div className="flex gap-1">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="image-upload"
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      images: [
                        ...prev.images,
                        ...Array.from(e.target.files ?? []),
                      ],
                    }));
                  }}
                />
                <label
                  htmlFor={
                    previewImages.length >= 4 ? undefined : "image-upload"
                  }
                >
                  <div className="bg-text-primary body1 text-neutral-0 flex h-25 w-25 cursor-pointer flex-col items-center justify-center gap-2">
                    <p>사진 추가</p>
                    <p>({previewImages.length}/4)</p>
                  </div>
                </label>
                {previewImages.map((item) => (
                  <div
                    key={item.src}
                    className="relative h-25 w-25 overflow-hidden"
                  >
                    <p
                      className="absolute top-1.5 right-1.5 cursor-pointer"
                      onClick={() => {
                        if (item.type === "url") {
                          setForm((prev) => ({
                            ...prev,
                            imageUrls: prev.imageUrls.filter(
                              (url) => url !== item.src
                            ),
                          }));
                        } else {
                          setForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((f) => f !== item.file),
                          }));
                        }
                      }}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.03125 0C3.14812 0 0 3.14812 0 7.03125C0 10.9144 3.14812 14.0625 7.03125 14.0625C10.9144 14.0625 14.0625 10.9144 14.0625 7.03125C14.0625 3.14812 10.9144 0 7.03125 0ZM10.2891 4.43625L7.67625 7.04906L9.98813 9.62625C10.0735 9.71466 10.1208 9.83306 10.1197 9.95597C10.1186 10.0789 10.0693 10.1964 9.98241 10.2834C9.8955 10.3703 9.77794 10.4196 9.65503 10.4206C9.53213 10.4217 9.41372 10.3744 9.32531 10.2891L7.01344 7.71187L4.43625 10.2891C4.34784 10.3744 4.22944 10.4217 4.10653 10.4206C3.98363 10.4196 3.86606 10.3703 3.77915 10.2834C3.69224 10.1964 3.64294 10.0789 3.64187 9.95597C3.6408 9.83306 3.68805 9.71466 3.77344 9.62625L6.38625 7.01344L4.07438 4.43625C3.98899 4.34784 3.94174 4.22944 3.94281 4.10653C3.94388 3.98363 3.99318 3.86606 4.08009 3.77915C4.167 3.69224 4.28456 3.64294 4.40747 3.64187C4.53037 3.6408 4.64878 3.68805 4.73719 3.77344L7.04906 6.35063L9.62625 3.77344C9.71466 3.68805 9.83306 3.6408 9.95597 3.64187C10.0789 3.64294 10.1964 3.69224 10.2834 3.77915C10.3703 3.86606 10.4196 3.98363 10.4206 4.10653C10.4217 4.22944 10.3744 4.34784 10.2891 4.43625Z"
                          fill="#1D2433"
                        />
                      </svg>
                    </p>
                    <Image
                      width={100}
                      height={100}
                      src={item.src}
                      alt="preview"
                      className="bg-text-disabled object-cover"
                    />
                  </div>
                ))}
              </div>
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
