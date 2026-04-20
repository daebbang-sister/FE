"use client";

import {
  Button,
  Dropdown,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@repo/ui";
import { useMemo, useState } from "react";

type ProductOptionSize = {
  size: string;
  soldOut: boolean;
  productDetailId: number;
};
type ProductOption = {
  color: string;
  sizes: ProductOptionSize[];
};
type CartOptionModalProps = {
  isLoading?: boolean;
  isOpen: boolean;
  options: ProductOption[];
  size?: string;
  color?: string;
  onClose: () => void;
  onConfirmOption: (productDetailId: number) => void;
};

export default function CartOptionModal({
  isLoading = false,
  isOpen,
  options,
  size,
  color,
  onClose,
  onConfirmOption,
}: CartOptionModalProps) {
  const [selectedColor, setSelectedColor] = useState(size || "");
  const [selectedSize, setSelectedSize] = useState(color || "");
  const [error, setError] = useState("");

  const colorOptions = useMemo(() => {
    return options.map((opt) => ({
      label: opt.color,
      value: opt.color,
    }));
  }, [options]);

  const sizeOptions = useMemo(() => {
    return (
      options
        .find((opt) => opt.color === selectedColor)
        ?.sizes.map((s) => ({
          label: s.soldOut ? `${s.size} (품절)` : s.size,
          value: s.size,
          disabled: s.soldOut,
        })) ?? []
    );
  }, [options, selectedColor]);

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    setSelectedSize("");
    setError("");
  };

  const handleConfirm = () => {
    if (!selectedColor) {
      setError("컬러를 선택해주세요.");
      return;
    }
    if (!selectedSize) {
      setError("사이즈를 선택해주세요.");
      return;
    }
    const productDetailId = options
      .find((opt) => opt.color === selectedColor)
      ?.sizes.find((s) => s.size === selectedSize)?.productDetailId;
    if (!productDetailId) {
      setError("선택한 옵션 정보를 찾을 수 없습니다.");
      return;
    }
    onConfirmOption(productDetailId);
  };

  const handleClose = () => {
    setSelectedColor("");
    setSelectedSize("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="w-full max-w-97.5">
        <ModalHeader title="옵션 선택" />
        <ModalBody>
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <p className="w-17.5">컬러</p>
                <div className="w-full">
                  <Dropdown
                    options={colorOptions}
                    value={selectedColor}
                    onChange={handleColorChange}
                    placeholder="[필수]컬러 선택"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <p className="w-17.5">사이즈</p>
                <div className="w-full">
                  <Dropdown
                    options={sizeOptions}
                    value={selectedSize}
                    onChange={setSelectedSize}
                    placeholder="[필수]사이즈 선택"
                    disabled={!selectedColor}
                    className="w-full"
                  />
                </div>
              </div>

              {error && <p className="caption1 text-danger-200">{error}</p>}
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="flex gap-2.5">
            <Button variant="stroke" onClick={handleClose}>
              취소
            </Button>
            <Button variant="gray" onClick={handleConfirm}>
              확인
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
