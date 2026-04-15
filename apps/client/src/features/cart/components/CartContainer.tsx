"use client";

import CartHeader from "@/features/cart/components/CartHeader";
import CartList from "@/features/cart/components/CartList";
import CartSummary from "@/features/cart/components/CartSummary";
import useCart from "@/features/cart/hooks/useCart";
import {
  calculateProductsPrice,
  calculateShipping,
} from "@/features/cart/utils";
import { Button } from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartContainer() {
  const {
    items,
    isAllChecked,
    handleUpdateCart,
    handleToggleAll,
    handleCheckItem,
    handleDeleteItem,
    handleDeleteSelected,
    handleDeleteAll,
    handleUpdateOption,
  } = useCart();
  const router = useRouter();

  const totalPrice = calculateProductsPrice(items);
  const shippingFee = calculateShipping(totalPrice);
  const totalPayment = totalPrice + shippingFee;

  const handleOrderSelected = () => {
    const selectedItems = items.filter((item) => item.checked);
    console.log("선택 상품 주문:", selectedItems);
    router.push("/cart/checkout");
  };

  const handleOrderAll = () => {
    console.log("전체 상품 주문", items);
    router.push("/cart/checkout");
  };

  return (
    <div className="page-y container">
      {items && items.length > 0 ? (
        <div className="flex min-h-screen items-start justify-between gap-13.5">
          {/* 왼쪽 */}
          <div className="flex-1">
            <CartHeader
              isAllChecked={isAllChecked}
              onToggleAll={handleToggleAll}
              onDeleteSelected={handleDeleteSelected}
              onDeleteAll={handleDeleteAll}
            />
            <CartList
              items={items}
              onCheckItem={handleCheckItem}
              onUpdateCart={handleUpdateCart}
              onDeleteItem={handleDeleteItem}
              onUpdateOption={handleUpdateOption}
            />
          </div>

          {/* 오른쪽 */}
          <CartSummary
            totalPrice={totalPrice}
            shippingFee={shippingFee}
            totalPayment={totalPayment}
            onOrderSelected={handleOrderSelected}
            onOrderAll={handleOrderAll}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="body1-loose text-center">
            장바구니가 비어있네요.
            <br /> 상품을 구경하시러 가시겠습니까?
          </p>
          <Link href={"/"}>
            <Button variant="stroke">상품 보러가기</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
