"use client";

import { fetchCart } from "@/features/cart/api";
import CartItem from "@/features/cart/ui/cart-item/CartItem";
import { Button, CheckBox } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CartItemType = {
  id: number;
  quantity: number;
  name: string;
  option: string;
  sellingPrice: number;
  originalPrice: number;
  discountRate: number | null;
  imageUrl?: string;
  checked: boolean;
};
type CartItems = CartItemType[];

const dummyCartItems = [
  {
    id: 1,
    name: "어반 주기자 셔츠 반바지 아이보리",
    option: "아이보리 / FREE",
    sellingPrice: 21300,
    originalPrice: 46000,
    discountRate: 54,
    quantity: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=200",
  },
  {
    id: 2,
    name: "어반 주기자 셔츠 반바지 아이보리2",
    option: "아이보리 / FREE",
    sellingPrice: 21300,
    originalPrice: 46000,
    discountRate: null,
    quantity: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=200",
  },
];

export default function CartPage() {
  console.log("카트 데이터", fetchCart({ cursor: 1, size: 8 }));
  const [items, setItems] = useState<CartItems>(
    dummyCartItems.map((item) => ({ ...item, checked: true }))
  );
  const router = useRouter();
  const isAllChecked = items.length > 0 && items.every((item) => item.checked);

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleAllChecked = () => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, checked: !isAllChecked }))
    );
  };

  const toggleItemChecked = (id: string, checked: boolean) => {
    setItems((prev) =>
      prev.map((item) => (String(item.id) === id ? { ...item, checked } : item))
    );
  };

  const calculateProductsPrice = (items: CartItems) => {
    return items
      .filter((item) => item.checked)
      .reduce((acc, item) => {
        const price =
          item.discountRate !== null ? item.sellingPrice : item.originalPrice;
        return acc + price * item.quantity;
      }, 0);
  };

  const isJeju = true;
  const totalPrice = calculateProductsPrice(items);
  const calculateShipping = (items: CartItems, isJeju: boolean) => {
    if (totalPrice === 0) return 0;
    if (totalPrice >= 70000) {
      return 0;
    } else {
      return isJeju ? 6000 : 3000;
    }
  };

  const shippingFee = calculateShipping(items, isJeju);
  const totalPayment = totalPrice + shippingFee;

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteSelectedItems = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  const deleteAllSelectedItems = () => {
    setItems([]);
  };

  const orderSelectedItems = () => {
    const selectedItems = items.filter((item) => item.checked);
    console.log("선택 상품 주문:", selectedItems);
    router.push("/cart/checkout");
  };

  const orderAllItems = () => {
    console.log("전체 상품 주문", items);
    router.push("/cart/checkout");
  };

  return (
    <div className="page-y container flex min-h-screen items-start justify-between gap-13.5">
      {/* 왼쪽 */}
      <div className="flex-1">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-1.75">
            <CheckBox
              id="all"
              checked={isAllChecked}
              onChange={toggleAllChecked}
            />
            전체 선택
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={deleteSelectedItems}
              className="text-text-disabled hover:text-text-primary transition duration-200"
            >
              선택 삭제
            </button>
            <button
              onClick={deleteAllSelectedItems}
              className="text-text-disabled hover:text-text-primary"
            >
              전체 삭제
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item) => {
            return (
              <CartItem
                key={item.id}
                id={String(item.id)}
                name={item.name}
                option={item.option}
                sellingPrice={item.sellingPrice}
                quantity={item.quantity}
                originalPrice={item.originalPrice}
                discountRate={item.discountRate}
                setQuantity={(q) => updateQuantity(item.id, q)}
                checked={item.checked}
                onCheckedChange={toggleItemChecked}
                onDeleteItem={() => deleteItem(item.id)}
              />
            );
          })}
        </div>
      </div>

      {/* 오른쪽 */}
      <div
        className="border-border-default sticky w-full max-w-112.5 self-start border px-7.5 py-10"
        style={{ top: "calc(var(--size-header-h) + 60px)" }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>상품 합계 금액</span>
            <span>{totalPrice.toLocaleString()}won</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span>{shippingFee.toLocaleString()}won</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="caption1 text-text-disabled">
              ㄴ 기본택배비 3000 / 제주 산간·도서지역 6000
            </span>
            <span className="caption1 text-text-disabled">
              ㄴ 7만원 이상 배송비 무료, 14만원 이상 분리 배송 가능(카톡 문의)
            </span>
          </div>
        </div>
        <div className="title3 border-text-primary mt-6 flex justify-between border-t pt-6">
          <span>결제 예상 금액</span>
          <span>{totalPayment.toLocaleString()}won</span>
        </div>

        <div className="mt-9 flex gap-2.5">
          <Button variant="stroke" onClick={orderSelectedItems}>
            선택 상품 주문
          </Button>
          <Button variant="gray" onClick={orderAllItems}>
            전체 상품 주문
          </Button>
        </div>
      </div>
    </div>
  );
}
