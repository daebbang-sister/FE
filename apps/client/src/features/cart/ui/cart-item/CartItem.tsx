"use client";

import { DiscountRate } from "@/shared/ui/discount-rate/DiscountRate";
import { Button, CheckBox, Quantity, XButton } from "@repo/ui";
import Image from "next/image";

type CartItemProps = {
  id: string;
  quantity: number;
  setQuantity: (value: number) => void;
  name: string;
  option: string;
  sellingPrice: number;
  originalPrice: number;
  discountRate: number | null;
  imageUrl?: string;
  checked: boolean;
  onCheckedChange: (id: string, checked: boolean) => void;
  onDeleteItem: () => void;
};

export default function CartItem({
  id,
  quantity,
  setQuantity,
  name,
  option,
  sellingPrice,
  originalPrice,
  discountRate,
  checked,
  // imageUrl,
  onCheckedChange,
  onDeleteItem,
}: CartItemProps) {
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
          src="https://daebbang-sister-image.s3.amazonaws.com/상의1.jpg"
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
              {originalPrice * quantity}won
            </p>
          ) : (
            <p className="caption1">{originalPrice * quantity}won</p>
          )}
          {discountRate ? (
            <div className="mt-1.5 flex items-center gap-1.25">
              <p className="caption1">{sellingPrice * quantity}won</p>
              <DiscountRate>{discountRate * quantity}%</DiscountRate>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div>
          <p className="caption1">{option}</p>
          <div className="mt-3 flex gap-1.75">
            <Quantity
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={99}
            />
            <Button variant="gray" className="caption1 w-auto px-4 py-2.5">
              수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
