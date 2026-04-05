export type PageResponse<T> = {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type CategoryProduct = {
  id: number;
  categoryName: string;
  productName: string;
  mainImageUrl: string;
  hoverImageUrl: string;
  originalPrice: number;
  sellingPrice: number;
  discountRate: number | null;
  colorCodes: string[];
};
