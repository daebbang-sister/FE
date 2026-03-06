import { Badge, ProductImage } from "@/shared/ui";
import { ProductColorChips } from "./ProductColorChips";

type ProductCardProps = {
  colors: string[];
  title: string;
  originalPrice: string;
  salePrice?: string;
  discount?: string;
  primaryImage: string;
  hoverImage: string;
};

export function ProductCard({
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
      <h3 className="mb-4 mt-6">{title}</h3>

      <div className="mb-4">
        {salePrice ? (
          <div>
            <p className="caption1 text-text-disabled line-through mb-1.5">
              {originalPrice}
            </p>
            <div className="flex gap-1.25 items-center">
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
