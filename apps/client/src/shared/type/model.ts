// page response type
export type PageResponse<T> = {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

// product options type
export type ProductOptionSize = {
  size: string;
  soldOut: boolean;
  productDetailId: number;
};
export type ProductOption = {
  color: string;
  sizes: ProductOptionSize[];
};
