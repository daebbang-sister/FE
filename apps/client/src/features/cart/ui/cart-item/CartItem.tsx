"use client";

import useProductOptionsQuery from "@/features/cart/hooks/useProductOptionsQuery";
import { DiscountRate } from "@/shared/ui/discount-rate/DiscountRate";
import {
  Button,
  CheckBox,
  Dropdown,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Quantity,
  XButton,
} from "@repo/ui";
import Image from "next/image";
import { useState } from "react";

type CartItemProps = {
  id: string;
  quantity: number;
  setQuantity: (value: number) => void;
  name: string;
  size: string;
  color: string;
  sellingPrice: number;
  originalPrice: number;
  discountRate: number | null;
  imageUrl: string;
  checked: boolean;
  onCheckedChange: (id: string, checked: boolean) => void;
  onDeleteItem: () => void;
  onUpdateOption: () => void;
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onConfirmOption: (
    productDetailId: number,
    color: string,
    size: string
  ) => void;
};

export default function CartItem({
  id,
  quantity,
  setQuantity,
  name,
  size,
  color,
  sellingPrice,
  originalPrice,
  discountRate,
  checked,
  imageUrl,
  onCheckedChange,
  onDeleteItem,
  onUpdateOption,
  isOpen,
  onClose,
  productId,
  onConfirmOption,
}: CartItemProps) {
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedSize, setSelectedSize] = useState(size);
  const [error, setError] = useState("");

  const { data: productOptions = [], isLoading } = useProductOptionsQuery(
    productId,
    isOpen
  );

  const colorOptions = productOptions.map((opt) => ({
    label: opt.color,
    value: opt.color,
  }));

  const sizeOptions =
    productOptions
      .find((opt) => opt.color === selectedColor)
      ?.sizes.map((s) => ({
        label: s.soldOut ? `${s.size} (품절)` : s.size,
        value: s.size,
        disabled: s.soldOut,
      })) ?? [];

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

    const productDetailId = productOptions
      .find((opt) => opt.color === selectedColor)
      ?.sizes.find((s) => s.size === selectedSize)?.productDetailId;

    if (!productDetailId) {
      return;
    }

    onConfirmOption(productDetailId, selectedColor, selectedSize);
    onClose();
  };

  const handleClose = () => {
    setSelectedColor(color);
    setSelectedSize(size);
    setError("");
    onClose();
  };

  return (
    <div className="border-border-default first:border-border-default flex gap-6 border-b pt-6 pb-6 first:border-t last:border-b-0 last:pb-0">
      {/* 왼쪽 */}
      <div className="relative w-full max-w-37.5">
        <div className="absolute top-2.5 left-2.5 z-9">
          <CheckBox
            id={id}
            checked={checked}
            onChange={(e) => onCheckedChange(id, e.target.checked)}
          />
        </div>
        <Image
          alt="상품 이미지"
          src={imageUrl}
          width={150}
          height={200}
          className="object-cover"
        />
      </div>
      {/* 오른쪽 */}
      <div className="w-full">
        <div className="mb-9">
          <div className="mb-3 flex items-center justify-between">
            <h6>{name}</h6>
            <XButton
              onClick={onDeleteItem}
              iconSize={15}
              buttonSize={19}
              className=""
            />
          </div>
          {discountRate ? (
            <p className="caption1 text-text-disabled line-through">
              {originalPrice}won
            </p>
          ) : (
            <p className="caption1">{originalPrice}won</p>
          )}
          {discountRate ? (
            <div className="mt-1.5 flex items-center gap-1.25">
              <p className="caption1">{sellingPrice}won</p>
              <DiscountRate>{discountRate}%</DiscountRate>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div>
          <p className="caption1">
            [옵션: {color} / {size}]
          </p>
          <div className="mt-3 flex gap-1.75">
            <Quantity
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={99}
            />
            <Button
              onClick={onUpdateOption}
              variant="gray"
              className="caption1 w-auto px-4 py-2.5"
            >
              수정
            </Button>
            <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay />
              <ModalContent className="w-full max-w-97.5">
                <ModalHeader title="옵션 변경" />
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
                          />
                        </div>
                      </div>
                      {error && (
                        <p className="caption1 text-danger-200">{error}</p>
                      )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
