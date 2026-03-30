"use client";

import { MainProduct } from "@/features/home/model";
import ProductBestCard from "@/features/product/components/product-card/ProductBestCard";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  products: MainProduct[];
};

export default function ProductSlide({ products }: Props) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  return (
    <div ref={emblaRef} className="mb-12 w-full overflow-hidden">
      <div className="flex gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-[0_0_42%] md:flex-[0_0_29%] lg:flex-[0_0_17%]"
          >
            <ProductBestCard
              id={product.id}
              category={product.categoryName}
              title={product.productName}
              primaryImage={product.mainImageUrl}
              originalPrice={`${product.originalPrice.toLocaleString()}원`}
              salePrice={
                product.discountRate
                  ? `${product.sellingPrice.toLocaleString()}원`
                  : undefined
              }
              discount={
                product.discountRate ? `${product.discountRate}%` : undefined
              }
              colors={[]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
