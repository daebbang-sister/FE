export type MainProduct = {
  id: number;
  categoryName: string;
  productName: string;
  mainImageUrl: string;
  hoverImageUrl: string;
  originalPrice: number;
  sellingPrice: number;
  discountRate: number | null;
};
