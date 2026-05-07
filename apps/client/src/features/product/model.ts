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

// #############################

export type RatingCounts = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};
export type ReviewSummary = {
  totalCount: number;
  averageRating: number;
  ratingCounts: RatingCounts;
};

type BaseReview = {
  reviewId: number;
  createdAt: string;
  rating: number;
  content: string;
  imageUrls: string[];
  reply: string | null;
  replyUpdatedAt: string | null;
};
export type ReviewList = BaseReview & {
  maskedLoginId: string;
};
export type MyReviewList = BaseReview & {
  productId: number;
  productName: string;
  pointStatus: string;
  expectedPoint: number;
};
export type UpdateReviewData = {
  rating: number;
  content: string;
  keepImageUrls: string[];
};
export type ReviewSubmitParams = UpdateReviewData & {
  images: File[];
};
export type CreateReviewData = {
  rating: number;
  content: string;
  orderDetailId: number;
};
