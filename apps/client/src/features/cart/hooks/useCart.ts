import {
  fetchCart,
  fetchDeleteAllCarts,
  fetchDeleteCarts,
} from "@/features/cart/api";
import { CartItem } from "@/features/cart/model";
import { useEffect, useState } from "react";

export default function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

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

  const handleUpdateCart = async (id: number, quantity: number) => {
    // await fetchUpdateCart(id, quantity);
    setItems((prev) =>
      prev.map((item) => (item.cartId === id ? { ...item, quantity } : item))
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
    handleToggleAll,
    handleCheckItem,
    handleDeleteItem,
    handleDeleteSelected,
    handleDeleteAll,
  };
}
