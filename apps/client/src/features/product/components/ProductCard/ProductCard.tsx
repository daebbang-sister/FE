import { Badge, ProductImage } from "@/shared/ui";
import ProductColorChips from "./ProductColorChips";

type ProductCardProps = {
  colors: string[];
  title: string;
  originalPrice: string;
  salePrice?: string;
  discount?: string;
  primaryImage: string;
  hoverImage: string;
};

export default function ProductCard({
  colors,
  title,
  originalPrice,
  salePrice,
  discount,
  primaryImage,
  hoverImage,
}: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <ProductImage primaryImage={primaryImage} hoverImage={hoverImage} />
      <h3 className="mt-6 mb-4">{title}</h3>

      <div className="mb-4">
        {salePrice ? (
          <div>
            <p className="caption1 text-text-disabled mb-1.5 line-through">
              {originalPrice}
            </p>
            <div className="flex items-center gap-1.25">
              <p className="caption1">{salePrice}</p>
              <Badge>{discount}</Badge>
            </div>
          </div>
        ) : (
          <div>
            <p className="caption1">{originalPrice}</p>
          </div>
        )}
      </div>
      <ProductColorChips colors={colors} />
    </div>
  );
}
