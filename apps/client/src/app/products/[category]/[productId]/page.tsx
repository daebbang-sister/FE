import { getProductDetail } from "@/features/product/api";
import ProdcutCarousel from "@/features/product/components/product-detail/ProdcutCarousel";
import ProductDetailSummary from "@/features/product/components/product-detail/ProductDetailSummary";
import ProductDetailTab from "@/features/product/components/product-detail/ProductDetailTab";
import { ApiError } from "@/shared/lib/error";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    category: string;
    productId: string;
  }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { category, productId } = await params;
  const id = Number(productId);
  if (!Number.isFinite(id)) {
    notFound();
  }
  let productDetail;
  try {
    productDetail = await getProductDetail(id);
  } catch (error) {
    if (error instanceof ApiError && Number(error.status) === 404) {
      notFound();
    }
    throw error;
  }
  // console.log("제품 정보", productDetail);

  return (
    <section className="container my-15.5">
      <div className="grid grid-cols-1 gap-y-6.25 lg:gap-x-14.5 lg:gap-y-6.25">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <ProdcutCarousel
            mainImages={productDetail.mainImageUrl}
            gallery={productDetail.gallery}
          />
        </div>
        <aside className="lg:sticky lg:top-39.5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <ProductDetailSummary
            productId={productDetail.id}
            mainImages={productDetail.mainImageUrl}
            productName={productDetail.productName}
            simpleDescription={productDetail.simpleDescription}
            originalPrice={productDetail.originalPrice}
            sellingPrice={productDetail.sellingPrice}
            discountRate={productDetail.discountRate}
            options={productDetail.options}
          />
        </aside>
        <div className="min-w-0 lg:col-start-1 lg:row-start-2">
          <ProductDetailTab />
        </div>
      </div>
    </section>
  );
}
