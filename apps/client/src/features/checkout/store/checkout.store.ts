import { CheckoutItem } from "@/features/checkout/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CheckoutStore = {
  items: CheckoutItem[];
  setItems: (items: CheckoutItem[]) => void;
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
