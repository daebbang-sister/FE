import { CartItem } from "@/features/cart/model";

export function calculateProductsPrice(items: CartItem[]) {
  return items
    .filter((item) => item.checked)
    .reduce((acc, item) => {
      const price =
        item.discountRate !== null ? item.discountPrice : item.originalPrice;
      return acc + price * item.quantity;
    }, 0);
}

export function calculateShipping(totalPrice: number) {
  if (totalPrice === 0) return 0;
  if (totalPrice >= 70000) return 0;
  return 3000;
}
