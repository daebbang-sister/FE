import { getMainNewProducts, getMainProducts } from "@/features/home/api";
import ProductBest from "@/features/home/components/ProductBest";
import MainBanner from "@/features/home/components/MainBanner";
import ProductSection from "@/features/home/components/ProductSection";

export const dynamic = "force-dynamic";

async function getProductsData() {
  const [newProducts, topProducts, bottomProducts] = await Promise.all([
    getMainNewProducts(8),
    getMainProducts(1, 8),
    getMainProducts(2, 8),
  ]);

  return { newProducts, topProducts, bottomProducts };
}
export default async function Page() {
  const { newProducts, topProducts, bottomProducts } = await getProductsData();

  return (
    <section className="w-full">
      <MainBanner />
      <div className="container-wide mt-36 mb-36 space-y-36">
        <ProductSection
          title="신상품"
          description="평일 오전 10시 업데이트"
          moreLink="/products/new"
          products={newProducts}
        />
        <ProductBest />
        <ProductSection
          title="TOP"
          moreLink="/products/top"
          products={topProducts}
        />
        <ProductSection
          title="BOTTOM"
          moreLink="/products/bottom"
          products={bottomProducts}
        />
      </div>
    </section>
  );
}
