"use client";

import CartHeader from "@/features/cart/components/CartHeader";
import CartList from "@/features/cart/components/CartList";
import CartSummary from "@/features/cart/components/CartSummary";
import useCart from "@/features/cart/hooks/useCart";
import { CartItem } from "@/features/cart/model";
import {
  calculateProductsPrice,
  calculateShipping,
} from "@/features/cart/utils";
import { CheckoutItem } from "@/features/checkout/model";
import { useCheckoutStore } from "@/features/checkout/store/checkout.store";
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
    isLoggedIn,
  } = useCart();
  const router = useRouter();

  const setItem = useCheckoutStore((s) => s.setItems);

  const totalPrice = calculateProductsPrice(items);
  const shippingFee = calculateShipping(totalPrice);
  const totalPayment = totalPrice + shippingFee;

  const toCheckoutItems = (items: CartItem[]): CheckoutItem[] =>
    items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      mainImageUrl: item.mainImageUrl,
      originalPrice: item.originalPrice,
      discountPrice: item.discountPrice,
      discountRate: item.discountRate,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      productDetailId: item.productDetailId,
    }));

  const handleOrderSelected = () => {
    if (!isLoggedIn) {
      alert("로그인 후 결제가 가능합니다.");
      router.push("/login");
      return;
    }
    const selectedItems = items.filter((item) => item.checked);
    setItem(toCheckoutItems(selectedItems));
    router.push("/checkout");
  };

  const handleOrderAll = () => {
    if (!isLoggedIn) {
      alert("로그인 후 결제가 가능합니다.");
      router.push("/login");
      return;
    }
    setItem(toCheckoutItems(items));
    router.push("/checkout");
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
