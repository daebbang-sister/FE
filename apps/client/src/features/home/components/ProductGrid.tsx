import { MainProduct } from "@/features/home/model";
import ProductCard from "@/features/product/components/ProductCard/ProductCard";

type Props = {
  products: MainProduct[];
};

export default function ProductGrid({ products }: Props) {
  return (
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
  );
}
