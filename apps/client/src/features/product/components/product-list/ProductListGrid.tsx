import { MainProduct } from "@/features/home/model";
import ProductCard from "@/features/product/components/product-card/ProductCard";
import { Dropdown } from "@repo/ui";

type Props = {
  products: MainProduct[];
};

export default function ProductListGrid({ products }: Props) {
  //   console.log(products);
  const phoneOptions = [
    { label: "인기순", value: "인기순" },
    { label: "신상품순", value: "신상품순" },
    { label: "상품명", value: "상품명" },
    { label: "높은 가격순", value: "높은 가격순" },
    { label: "낮은 가격순", value: "낮은 가격순" },
  ];

  return (
    <section className="pb-40">
      <div className="flex items-center justify-between">
        <p className="caption1 text-text-disabled">
          total: {products.length.toLocaleString()}개
        </p>
        <Dropdown
          id="phonePrefixPartialDisabled"
          defaultValue="정렬"
          options={phoneOptions}
          size="M"
          className="ml-auto w-auto"
          menuWidth="w-30 "
        />
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
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
    </section>
  );
}
