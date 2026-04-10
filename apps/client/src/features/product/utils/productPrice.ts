export const calculateOrderPrice = ({
  originalPrice,
  sellingPrice,
  discountRate,
  quantity,
  savingPercent,
}: {
  originalPrice: number;
  sellingPrice: number;
  discountRate: number;
  quantity: number;
  savingPercent: number;
}) => {
  const safeDiscountRate = discountRate ?? 0;
  const hasDiscount = safeDiscountRate > 0;
  const price = hasDiscount ? sellingPrice : originalPrice;
  const totalPrice = price * quantity;
  const totalSalePrice = (originalPrice - sellingPrice) * quantity;
  const savingPoint = Math.floor(totalPrice * (savingPercent / 100));

  return {
    totalPrice,
    totalSalePrice,
    savingPoint,
    hasDiscount,
  };
};
