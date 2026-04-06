"use client";

import { calculateProductsPrice, calculateShipping } from "@/app/cart/utils";
import CartHeader from "@/features/cart/components/CartHeader";
import CartList from "@/features/cart/components/CartList";
import CartSummary from "@/features/cart/components/CartSummary";
import useCart from "@/features/cart/hooks/useCart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    items,
    isAllChecked,
    handleUpdateCart,
    handleToggleAll,
    handleCheckItem,
    handleDeleteItem,
    handleDeleteSelected,
    handleDeleteAll,
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
    <div className="page-y container flex min-h-screen items-start justify-between gap-13.5">
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
  );
}
