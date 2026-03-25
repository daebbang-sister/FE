import { getMainProducts } from "@/features/home/api";
import ProductListGrid from "@/features/product/components/product-list/ProductListGrid";
import ProductListTitle from "@/features/product/components/product-list/ProductListTitle";
import ProductSlide from "@/features/product/components/product-list/ProductSlide";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  // 임시 api
  const products = await getMainProducts(1, 8);

  const shouldShowBestSlide =
    decodedCategory !== "실시간 베스트" && decodedCategory !== "신상품";
  // 베스트 상품 api추가 되면 아래코드 형식으로 변경 예정
  // const bestProducts = shouldShowBestSlide ? await getBestProducts() : [];

  return (
    <section className="w-full">
      <article className="w-full">
        <ProductListTitle title={decodedCategory} />
        {shouldShowBestSlide && <ProductSlide products={products} />}
      </article>

      <article className="container-wide">
        <ProductListGrid products={products} />
      </article>

      {/* <PageButton
        totalItems={150} // 전체 아이템 수
        limit={5} // 한 페이지에 보여줄 아이템 수
        pageGroupSize={5} // 한 화면에 보여줄 페이지 버튼 수 (기본 5)
        onPageChange={(page) => console.log(page)} // 페이지 선택 시 호출
      /> */}
    </section>
  );
}
