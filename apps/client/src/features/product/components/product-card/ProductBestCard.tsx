import { ProductBestImage } from "@/features/product/ui/product-image/ProductBestImage";
import ProductColorChips from "./ProductColorChips";
import Link from "next/link";
import { DiscountRate } from "@/shared/ui/discount-rate/DiscountRate";

type ProductBestCardProps = {
  id: number;
  category: string;
  colors: string[];
  title: string;
  originalPrice: string;
  salePrice?: string;
  discount?: string;
  primaryImage: string;
};

export default function ProductBestCard({
  id,
  category,
  colors,
  title,
  originalPrice,
  salePrice,
  discount,
  primaryImage,
}: ProductBestCardProps) {
  return (
    <Link
      href={`/products/${category.toLowerCase()}/${id}`}
      className="group block cursor-pointer"
    >
      <ProductBestImage primaryImage={primaryImage} title={title} />
      <h3 className="mt-6 mb-4 truncate">{title}</h3>

      {salePrice ? (
        <div>
          <p className="caption1 text-text-disabled mb-1.5 line-through">
            {originalPrice}
          </p>
          <div className="flex items-center gap-1.25">
            <p className="caption1">{salePrice}</p>
            <DiscountRate>{discount}</DiscountRate>
          </div>
        </div>
      ) : (
        <div>
          <p className="caption1">{originalPrice}</p>
        </div>
      )}

      {colors && (
        <div className="mt-4">
          <ProductColorChips colors={colors} />
        </div>
      )}
    </Link>
  );
}
