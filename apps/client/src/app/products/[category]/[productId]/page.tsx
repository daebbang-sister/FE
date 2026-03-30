import ProdcutCarousel from "@/features/product/components/product-detail/ProdcutCarousel";
import ProductDetailSummary from "@/features/product/components/product-detail/ProductDetailSummary";
import ProductDetailTab from "@/features/product/components/product-detail/ProductDetailTab";

type Props = {
  params: Promise<{
    category: string;
    productId: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { category, productId } = await params;
  {
    /* <p>category: {category}</p>
  <p>productId: {productId}</p> */
  }

  return (
    <section className="container my-15.5">
      <div className="grid grid-cols-1 gap-y-6.25 lg:gap-x-14.5 lg:gap-y-6.25">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <ProdcutCarousel
            images={[
              "/images/look1.jpg",
              "/images/look2.jpg",
              "/images/look3.jpg",
              "/images/look4.jpg",
              "/images/look5.jpg",
            ]}
          />
        </div>
        <aside className="lg:sticky lg:top-39.5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <ProductDetailSummary />
        </aside>
        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <ProductDetailTab />
        </div>
      </div>
    </section>
  );
}
