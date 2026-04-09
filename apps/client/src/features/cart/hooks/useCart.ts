"use client";

import {
  fetchCart,
  fetchDeleteAllCarts,
  fetchDeleteCarts,
  fetchUpdateCart,
} from "@/features/cart/api";
import { CartItem } from "@/features/cart/model";
import { useEffect, useRef, useState } from "react";

export default function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const loadCart = async () => {
    const getCartData = await fetchCart({ size: 8 });
    const { carts } = getCartData.data;
    setItems(carts.map((item) => ({ ...item, checked: true })));
  };

  useEffect(() => {
    const load = async () => {
      await loadCart();
    };
    load();
  }, []);

  const isAllChecked = items.length > 0 && items.every((item) => item.checked);

  const handleUpdateCart = (
    id: number,
    quantity: number,
    productDetailsId: number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.cartId === id ? { ...item, quantity } : item))
    );
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      await fetchUpdateCart(id, quantity, productDetailsId);
    }, 500);
  };

  const handleUpdateOption = async (
    cartId: number,
    productDetailsId: number
  ) => {
    await fetchUpdateCart(
      cartId,
      items.find((i) => i.cartId === cartId)!.quantity,
      productDetailsId
    );

    const updated = await fetchCart();
    setItems(
      updated.data.carts.map((item) => ({
        ...item,
        checked: items.find((i) => i.cartId === item.cartId)?.checked ?? true,
      }))
    );
  };

  const handleToggleAll = () => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, checked: !isAllChecked }))
    );
  };

  const handleCheckItem = (id: string, checked: boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        String(item.cartId) === id ? { ...item, checked } : item
      )
    );
  };

  const handleDeleteItem = async (id: number) => {
    await fetchDeleteCarts([id]);
    loadCart();
  };

  const handleDeleteSelected = async () => {
    const selectIds = items
      .filter((item) => item.checked)
      .map((item) => item.cartId);
    await fetchDeleteCarts(selectIds);
    loadCart();
  };

  const handleDeleteAll = async () => {
    await fetchDeleteAllCarts();
    loadCart();
  };

  return {
    items,
    isAllChecked,
    handleUpdateCart,
    handleUpdateOption,
    handleToggleAll,
    handleCheckItem,
    handleDeleteItem,
    handleDeleteSelected,
    handleDeleteAll,
  };
}
