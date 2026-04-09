"use client";

import {
  fetchCart,
  fetchDeleteAllCarts,
  fetchDeleteCarts,
  fetchUpdateCart,
} from "@/features/cart/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";

export default function useCart() {
  const queryClient = useQueryClient();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({ size: 8 }),
  });

  const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});

  const items = useMemo(() => {
    if (!data?.data?.carts) return [];

    return data.data.carts.map((item) => ({
      ...item,
      checked: checkedMap[item.cartId] ?? true,
    }));
  }, [data, checkedMap]);

  const isAllChecked = items.length > 0 && items.every((item) => item.checked);

  const handleUpdateCart = (
    id: number,
    quantity: number,
    productDetailsId: number
  ) => {
    queryClient.setQueryData(["cart"], (old: unknown) => {
      if (!old) return old;

      const prev = old as {
        data: {
          carts: {
            cartId: number;
            quantity: number;
          }[];
        };
      };

      return {
        ...prev,
        data: {
          ...prev.data,
          carts: prev.data.carts.map((item) =>
            item.cartId === id ? { ...item, quantity } : item
          ),
        },
      };
    });

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      await fetchUpdateCart(id, quantity, productDetailsId);
    }, 500);
  };

  const handleUpdateOption = async (
    cartId: number,
    productDetailsId: number
  ) => {
    const item = items.find((i) => i.cartId === cartId);
    if (!item) return;

    await fetchUpdateCart(cartId, item.quantity, productDetailsId);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const handleToggleAll = () => {
    const next = !isAllChecked;

    const newMap: Record<number, boolean> = {};
    items.forEach((item) => {
      newMap[item.cartId] = next;
    });

    setCheckedMap(newMap);
  };

  const handleCheckItem = (id: string, checked: boolean) => {
    setCheckedMap((prev) => ({
      ...prev,
      [Number(id)]: checked,
    }));
  };

  const handleDeleteItem = async (id: number) => {
    await fetchDeleteCarts([id]);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const handleDeleteSelected = async () => {
    const selectIds = items
      .filter((item) => item.checked)
      .map((item) => item.cartId);

    await fetchDeleteCarts(selectIds);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const handleDeleteAll = async () => {
    await fetchDeleteAllCarts();
    queryClient.invalidateQueries({ queryKey: ["cart"] });
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
