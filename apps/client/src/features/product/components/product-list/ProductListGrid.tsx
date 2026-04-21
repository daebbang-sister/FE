"use client";

import { MainProduct } from "@/features/home/model";
import ProductCard from "@/features/product/components/product-card/ProductCard";
import { PageResponse } from "@/shared/type/model";
import { Dropdown } from "@repo/ui";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type Props = {
  products: PageResponse<MainProduct>;
};

export default function ProductListGrid({ products }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useParams();
  const category = params.category as string;

  //   console.log(products);
  const filterOptions = [
    { label: "인기순", value: "인기순" },
    { label: "신상품순", value: "신상품순" },
    { label: "상품명", value: "상품명" },
    { label: "높은 가격순", value: "높은 가격순" },
    { label: "낮은 가격순", value: "낮은 가격순" },
  ];

  const changeFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let sortType = "NEW";
    let direction = "DESC";

    switch (value) {
      case "인기순":
        sortType = "POPULAR";
        break;
      case "신상품순":
        sortType = "NEW";
        break;
      case "상품명":
        sortType = "NAME";
        direction = "ASC";
        break;
      case "높은 가격순":
        sortType = "PRICE";
        direction = "DESC";
        break;
      case "낮은 가격순":
        sortType = "PRICE";
        direction = "ASC";
        break;
    }
    params.set("sortType", sortType);
    params.set("direction", direction);
    params.set("page", "0");
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="pb-40">
      <div className="flex items-end justify-between">
        <p className="caption1 text-text-disabled">
          total: {products.totalElements}개
        </p>
        {category !== "new" && (
          <Dropdown
            id="phonePrefixPartialDisabled"
            className="ml-auto w-auto"
            menuWidth="w-30 "
            defaultValue="정렬"
            options={filterOptions}
            size="M"
            onChange={changeFilter}
          />
        )}
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {products.content.map((product) => (
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
            colors={product.colorCodes}
          />
        ))}
      </div>
    </section>
  );
}
