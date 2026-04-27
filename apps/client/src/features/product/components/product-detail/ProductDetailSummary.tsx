"use client";

import { fetchAddCart } from "@/features/cart/api";
import { CartItem } from "@/features/cart/model";
import { CheckoutItem } from "@/features/checkout/model";
import { useCheckoutStore } from "@/features/checkout/store/checkout.store";
import { ProductOption } from "@/features/product/model";
import {
  findProductDetailId,
  getSelectedOption,
  getSizeOption,
} from "@/features/product/utils/productOptions";
import { calculateOrderPrice } from "@/features/product/utils/productPrice";
import { useAuthStore } from "@/shared/store/auth.store";
import { DiscountRate } from "@/shared/ui/discount-rate/DiscountRate";
import { AlertModal, Button, Dropdown } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import WishButton from "./WishButton";

type Props = {
  productId: number;
  productName: string;
  simpleDescription: string;
  originalPrice: number;
  sellingPrice: number;
  discountRate: number;
  mainImages: string;
  options: ProductOption[];
};

export default function ProductDetailSummary({
  productId,
  productName,
  simpleDescription,
  originalPrice,
  sellingPrice,
  discountRate,
  mainImages,
  options,
}: Props) {
  // 옵션 선택
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const isOptionSelected = Boolean(selectedColor && selectedSize);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const setItems = useCheckoutStore((s) => s.setItems);
  const { isLoggedIn } = useAuthStore();

  const colorOptions = useMemo(() => {
    return options.map((item) => ({
      label: item.color,
      value: item.color,
    }));
  }, [options]);
  const selectedOption = useMemo(() => {
    return getSelectedOption({ options, selectedColor });
  }, [options, selectedColor]);
  const sizeOptions = useMemo(() => {
    return getSizeOption(selectedOption);
  }, [selectedOption]);

  // 옵션으로 프로젝트 디테일 아이디 찾기
  const selectedProductDetailId = useMemo(() => {
    return findProductDetailId({ options, selectedColor, selectedSize });
  }, [options, selectedColor, selectedSize]);

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    setSelectedSize("");
    setQuantity(1);
  };

  // 옵션 초기화
  const handleResetSelectedOption = () => {
    setSelectedColor("");
    setSelectedSize("");
    setQuantity(1);
  };

  // 수량 조절 함수
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // 결제 가격 계산 & 적립금
  const savingPercent = 5; // 추후-적립금% api
  const orderPrice = calculateOrderPrice({
    originalPrice,
    sellingPrice,
    discountRate,
    quantity,
    savingPercent,
  });

  // 장바구니 담기
  const handleCartClick = async () => {
    if (!selectedColor || !selectedSize) {
      setModalMessage("옵션을 선택해주세요.");
      setIsModalOpen(true);
      return;
    }

    if (!selectedProductDetailId) return;

    try {
      if (isLoggedIn) {
        await fetchAddCart(selectedProductDetailId, quantity);
      } else {
        const baskets = JSON.parse(localStorage.getItem("baskets") ?? "[]");
        const exisringIndex = baskets.findIndex(
          (item: CartItem) =>
            item.productId === selectedProductDetailId &&
            item.color === selectedColor &&
            item.size === selectedSize
        );

        if (exisringIndex !== -1) {
          baskets[exisringIndex].quantity += quantity;
        } else {
          baskets.push({
            cartId: Date.now(),
            productId,
            productDetailsId: selectedProductDetailId,
            quantity,
            productName,
            originalPrice,
            discountPrice: sellingPrice,
            discountRate,
            color: selectedColor,
            size: selectedSize,
            mainImageUrl: mainImages,
            checked: true,
          });
        }
        localStorage.setItem("baskets", JSON.stringify(baskets));
      }
      setModalMessage("장바구니에 담겼습니다.");
    } catch {
      setModalMessage("장바구니 담기에 실패했습니다.");
    } finally {
      setIsModalOpen(true);
    }
  };

  const toCheckoutItem = (): CheckoutItem => {
    if (!selectedProductDetailId) {
      throw new Error("productDetailId is required");
    }

    return {
      productId,
      productName,
      mainImageUrl: mainImages,
      originalPrice,
      discountPrice: sellingPrice,
      discountRate,
      color: selectedColor,
      size: selectedSize,
      quantity,
      productDetailId: selectedProductDetailId,
    };
  };

  // 결제 이동
  const handleBuyClick = () => {
    if (!selectedColor || !selectedSize) {
      setModalMessage("옵션을 선택해주세요.");
      setIsModalOpen(true);
      return;
    }
    const checkoutItem = toCheckoutItem();

    if (!isLoggedIn) {
      setModalMessage("로그인 후 구매가 가능합니다.");
      setIsModalOpen(true);
      return;
    }

    setItems([checkoutItem]);
    router.push("/checkout");
  };

  return (
    <section className="bg-neutral-0 flex w-full flex-col gap-9 border border-neutral-300 px-7.5 py-10 lg:w-112.5">
      <article className="flex flex-col gap-3">
        <p className="body1 text-text-primary">{productName}</p>
        <p className="body1 text-text-disabled">{simpleDescription}</p>
      </article>

      <article className="flex flex-col gap-3">
        {orderPrice.hasDiscount && (
          <div className="body1 text-text-disabled flex justify-between">
            <p>소비자가</p>
            <del>{originalPrice?.toLocaleString()}won</del>
          </div>
        )}
        <div className="body1 flex justify-between">
          <p>{orderPrice.hasDiscount ? "판매가" : "소비자가"}</p>
          <div className="flex gap-1">
            {orderPrice.hasDiscount && (
              <DiscountRate>{discountRate}%</DiscountRate>
            )}
            <p>{sellingPrice?.toLocaleString()}won</p>
          </div>
        </div>
      </article>

      <article className="flex flex-col gap-3">
        <div className="body1 flex items-center justify-between">
          <p className="w-17.5 text-left">컬러</p>
          <div className="flex-1">
            <Dropdown
              options={colorOptions}
              value={selectedColor}
              onChange={handleColorChange}
              placeholder="색상을 선택해주세요"
            />
          </div>
        </div>
        <div className="body1 flex items-center justify-between">
          <p className="w-17.5 text-left">사이즈</p>
          <div className="flex-1">
            <Dropdown
              options={sizeOptions}
              value={selectedSize}
              onChange={setSelectedSize}
              placeholder={
                selectedColor
                  ? "사이즈를 선택해주세요"
                  : "색상을 먼저 선택해주세요"
              }
              disabled={!selectedColor}
            />
          </div>
        </div>
      </article>

      {isOptionSelected && (
        <article className="flex items-center gap-3 bg-neutral-100 p-4">
          <div className="body1 flex-1 text-left">
            <span>{selectedColor}</span>/<span>{selectedSize}</span>
          </div>

          <ul className="bg-neutral-0 flex items-center">
            <li className="cursor-pointer px-3 py-2.5" onClick={handleDecrease}>
              <svg width="10" height="1" viewBox="0 0 10 1" fill="none">
                <rect width="10" height="1" fill="#1D2433" />
              </svg>
            </li>

            <li className="px-1 py-2.5">
              {quantity.toString().padStart(2, "0")}
            </li>

            <li className="cursor-pointer px-3 py-2.5" onClick={handleIncrease}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect y="4.5" width="10" height="1" fill="#1D2433" />
                <rect
                  x="5.5"
                  width="10"
                  height="1"
                  transform="rotate(90 5.5 0)"
                  fill="#1D2433"
                />
              </svg>
            </li>
          </ul>

          <div className="min-w-25 text-right">
            {orderPrice.totalPrice.toLocaleString()}won
          </div>

          <div className="cursor-pointer" onClick={handleResetSelectedOption}>
            <svg
              width="12"
              height="16"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V5.33333C11.1429 4.35556 10.3714 3.55556 9.42857 3.55556H2.57143C1.62857 3.55556 0.857143 4.35556 0.857143 5.33333V14.2222ZM11.1429 0.888889H9L8.39143 0.257778C8.23714 0.0977777 8.01429 0 7.79143 0H4.20857C3.98571 0 3.76286 0.0977777 3.60857 0.257778L3 0.888889H0.857143C0.385714 0.888889 0 1.28889 0 1.77778C0 2.26667 0.385714 2.66667 0.857143 2.66667H11.1429C11.6143 2.66667 12 2.26667 12 1.77778C12 1.28889 11.6143 0.888889 11.1429 0.888889Z"
                fill="#858A96"
              />
            </svg>
          </div>
        </article>
      )}

      <article className="flex flex-col gap-3">
        <div className="body1 flex justify-between">
          <p>총 상품 금액</p>
          <p>{orderPrice.totalPrice.toLocaleString()}won</p>
        </div>
        {orderPrice.hasDiscount && (
          <div className="body1 flex justify-between">
            <p>할인 금액</p>
            <p>{orderPrice.totalSalePrice.toLocaleString()}won</p>
          </div>
        )}
        <div className="bg-text-primary my-3 h-[1] w-full" />
        <div className="body1 flex justify-between">
          <p>결제 예상 금액</p>
          <p className="title3">
            {orderPrice.totalPrice.toLocaleString()}won
            <span>({quantity.toLocaleString()}개)</span>
          </p>
        </div>
        <div className="body1 text-text-disabled flex justify-between">
          <p>예상 적립 금액</p>
          <p>{orderPrice.savingPoint.toLocaleString()}</p>
        </div>
      </article>

      <article className="flex items-center gap-2.5">
        <WishButton productId={productId} />
        <Button
          variant="stroke"
          className="flex-1 lg:min-w-38.75"
          onClick={handleCartClick}
        >
          장바구니
        </Button>
        <Button
          variant="gray"
          className="flex-1 lg:min-w-38.75"
          onClick={handleBuyClick}
        >
          구매하기
        </Button>
      </article>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="알림"
        message={modalMessage}
      />
    </section>
  );
}
