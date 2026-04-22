"use client";

import { fetchAddCart } from "@/features/cart/api";
import { CartItem } from "@/features/cart/model";
import { deleteWishListAPI, postWishListAPI } from "@/features/mypage/api";
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

type Props = {
  productId: number;
  productName: string;
  simpleDescription: string;
  originalPrice: number;
  sellingPrice: number;
  discountRate: number;
  mainImages: string;
  isWished: boolean;
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
  isWished,
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

  // 찜하기
  // 추후 api 수정 후 변경 예정/ 리뷰 달지 말아주세요~!
  const [isWish, setIsWish] = useState(isWished);
  const handleWishClick = async () => {
    try {
      if (isWish) {
        // console.log("찜하기에서 id는", productId);
        await deleteWishListAPI([productId]);
        setIsWish(false);
      } else {
        await postWishListAPI(productId);
        setIsWish(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        <div
          className={`${isWish ? "bg-neutral-900" : "bg-text-disabled"} group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-900 lg:mx-3.5`}
          onClick={handleWishClick}
        >
          <svg
            className={`${isWish ? "fill-[#FEC300]" : "fill-white"} group-hover:fill-[#FEC300]`}
            width="18"
            height="17"
            viewBox="0 0 18 17"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.401 0C15.7039 0 17.7527 2.70377 17.7014 5.79861C17.6703 7.66352 16.3812 9.56358 14.8368 11.1979C13.2508 12.8762 11.2149 14.4615 9.34375 15.7083L8.85069 16.0365L8.35764 15.7083C6.49154 14.4645 4.44251 12.8942 2.84896 11.2222C1.29676 9.59362 0 7.68741 0 5.78299C0.000269679 2.68329 2.12438 0 5.41146 0C6.67571 9.90596e-05 7.77449 0.573327 8.85417 1.51389C9.97398 0.560519 11.1498 5.00139e-05 12.401 0ZM1.77778 5.78299C1.77778 6.948 2.62522 8.41199 4.13542 9.99653C5.471 11.3978 7.1912 12.752 8.85069 13.8924C10.5052 12.7522 12.2142 11.3842 13.5451 9.97569C15.0506 8.38251 15.9062 6.91453 15.9253 5.7691C15.9637 3.45466 14.5101 1.77778 12.401 1.77778C11.5801 1.77784 10.6227 2.21013 9.47917 3.35243L8.85069 3.97917L8.22222 3.35243C7.05656 2.18799 6.21267 1.77789 5.41146 1.77778C3.28708 1.77778 1.77803 3.47396 1.77778 5.78299Z" />
          </svg>
        </div>
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
