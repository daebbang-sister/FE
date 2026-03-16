"use client";

import { getMainProducts } from "@/features/home/api";
import SectionLayout from "@/features/home/components/SectionLayout";
import { MainProduct } from "@/features/home/model";
import ProductCard from "@/features/product/components/ProductCard/ProductCard";
import { useEffect, useState } from "react";

export default function BottomProducts() {
  const [bottomProducts, setBottomProducts] = useState<MainProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const bottomProductsData = await getMainProducts(2, 8);
        setBottomProducts(bottomProductsData);
      } catch (_error) {
        console.log("데이터 조회 실패");
      }
    }
    fetchProducts();
  }, []);

  return (
    <SectionLayout title="Bottom" moreLink="/products/bottom">
      <div className="grid grid-cols-4 gap-x-5 gap-y-12">
        {bottomProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.categoryName}
            title={product.productName}
            primaryImage={product.mainImageUrl}
            hoverImage={product.hoverImageUrl ?? product.mainImageUrl}
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
        ))}
      </div>
    </SectionLayout>
  );
}
