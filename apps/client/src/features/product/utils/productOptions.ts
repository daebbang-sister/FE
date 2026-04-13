import { ProductOption } from "@/features/product/model";

export const getSelectedOption = ({
  options,
  selectedColor,
}: {
  options: ProductOption[];
  selectedColor: string;
}) => {
  return options.find((item) => item.color === selectedColor) ?? null;
};

export const getSizeOption = (selectedOption: ProductOption | null) => {
  if (!selectedOption) return [];

  return selectedOption.sizes.map((item) => ({
    label: item.soldOut ? `${item.size} (품절)` : item.size,
    value: item.size,
    disabled: item.soldOut,
  }));
};

export const findProductDetailId = ({
  options,
  selectedColor,
  selectedSize,
}: {
  options: ProductOption[];
  selectedColor: string;
  selectedSize: string;
}) => {
  if (!selectedColor || !selectedSize) return null;

  const colorOption = options.find((item) => item.color === selectedColor);
  if (!colorOption) return null;

  const sizeOption = colorOption.sizes.find(
    (item) => item.size === selectedSize
  );

  return sizeOption?.productDetailId ?? null;
};
