import { CartItem } from "@/features/cart/model";
import { ISLAND_ZIP_RANGES } from "@/features/checkout/constants/island";

export function calculateCheckoutProductsPrice(items: CartItem[]) {
  return items.reduce((acc, item) => {
    const price =
      item.discountRate !== null ? item.discountPrice : item.originalPrice;
    return acc + price * item.quantity;
  }, 0);
}

const isIslandRegion = (zipcode: string) => {
  const code = Number(zipcode);

  return ISLAND_ZIP_RANGES.some(
    (range) => code >= range.from && code <= range.to
  );
};

export function calculateCheckoutShipping(
  zipcode: string | undefined,
  orderPrice: number
) {
  if (!zipcode) return 0;
  const isIsland = isIslandRegion(zipcode);

  if (isIsland) {
    return orderPrice >= 100000 ? 0 : 6000;
  }

  return orderPrice >= 50000 ? 0 : 3000;
}
