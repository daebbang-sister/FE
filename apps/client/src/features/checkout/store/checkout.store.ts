import { CartItem } from "@/features/cart/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CheckoutStore = {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  clear: () => void;
};
export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items) => set({ items }),
      clear: () => set({ items: [] }),
    }),
    {
      name: "checkout-storage",
    }
  )
);
