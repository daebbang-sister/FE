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

// #############################

export type ProductSize = {
  productDetailId: number;
  size: string;
  stock: number;
  soldOut: boolean;
};

export type ProductOption = {
  color: string;
  colorCode: string;
  sizes: ProductSize[];
};

export type ProductGallery = {
  imageUrl: string;
  imageOrder: number;
};

export type ProductDetail = {
  id: number;
  categoryName: string;
  productName: string;
  simpleDescription: string;
  mainImageUrl: string;
  originalPrice: number;
  sellingPrice: number;
  discountRate: number;
  gallery: ProductGallery[];
  descriptionHtml: string;
  options: ProductOption[];
  isWished: boolean;
};
