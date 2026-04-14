"use client";

import {
  fetchCart,
  fetchDeleteAllCarts,
  fetchDeleteCarts,
  fetchUpdateCart,
} from "@/features/cart/api";
import { useUpdateCartOption } from "@/features/cart/hooks/updateOptionMutation";
import { CartItem } from "@/features/cart/model";
import { useAuthStore } from "@/shared/store/auth.store";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const { isLoggedIn } = useAuthStore();
  const getBaskets = (): CartItem[] =>
    JSON.parse(localStorage.getItem("baskets") ?? "[]");
  const setBaskets = (baskets: CartItem[]) =>
    localStorage.setItem("baskets", JSON.stringify(baskets));

  const loadCart = useCallback(async () => {
    if (isLoggedIn) {
      const getCartData = await fetchCart({ size: 8 });
      const { carts } = getCartData.data;
      setItems(carts.map((item) => ({ ...item, checked: true })));
    } else {
      setItems(getBaskets().map((item) => ({ ...item, checked: true })));
    }
  }, [isLoggedIn]);

  const updateOptionMutation = useUpdateCartOption(loadCart);

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

    if (isLoggedIn) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(async () => {
        await fetchUpdateCart(id, quantity, productDetailsId);
      }, 500);
    } else {
      setBaskets(
        getBaskets().map((item) =>
          item.cartId === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleUpdateOption = (
    cartId: number,
    productDetailsId: number,
    color: string,
    size: string
  ) => {
    if (isLoggedIn) {
      const quantity = items.find((i) => i.cartId === cartId)!.quantity;
      updateOptionMutation.mutate({ cartId, quantity, productDetailsId });
    } else {
      setBaskets(
        getBaskets().map((item) =>
          item.cartId === cartId
            ? { ...item, productDetailsId, color, size }
            : item
        )
      );
      loadCart();
    }
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
    if (isLoggedIn) {
      await fetchDeleteCarts([id]);
      loadCart();
    } else {
      setBaskets(getBaskets().filter((item) => item.cartId !== id));
      loadCart();
    }
  };

  const handleDeleteSelected = async () => {
    if (isLoggedIn) {
      const selectIds = items
        .filter((item) => item.checked)
        .map((item) => item.cartId);
      await fetchDeleteCarts(selectIds);
      loadCart();
    } else {
      const checkedIds = items
        .filter((item) => item.checked)
        .map((item) => item.cartId);
      setBaskets(
        getBaskets().filter((item) => !checkedIds.includes(item.cartId))
      );
      loadCart();
    }
  };

  const handleDeleteAll = async () => {
    if (isLoggedIn) {
      await fetchDeleteAllCarts();
      loadCart();
    } else {
      localStorage.removeItem("baskets");
      loadCart();
    }
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
