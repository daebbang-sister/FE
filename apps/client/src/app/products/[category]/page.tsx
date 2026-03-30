import { getMainProducts } from "@/features/home/api";
import ProductListGrid from "@/features/product/components/product-list/ProductListGrid";
import ProductListTitle from "@/features/product/components/product-list/ProductListTitle";
import ProductSlide from "@/features/product/components/product-list/ProductSlide";
import { PageLinkButton } from "@/shared/ui/button/PageLinkButton";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const page = 1;
  const limit = 1;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  // 임시 api
  const products = await getMainProducts(currentPage, limit);

  const shouldShowBestSlide =
    decodedCategory !== "best" && decodedCategory !== "new";
  // 베스트 상품 api추가 되면 아래코드 형식으로 변경 예정
  // const bestProducts = shouldShowBestSlide ? await getBestProducts() : [];

  return (
    <section className="container-wide">
      <article className="w-full">
        <ProductListTitle title={decodedCategory} />
        {shouldShowBestSlide && <ProductSlide products={products} />}
      </article>

      <article className="container-wide">
        <ProductListGrid products={products} />
      </article>

      <article className="flex justify-center pb-10">
        <PageLinkButton
          totalItems={10} // 전체 아이템 수
          limit={limit} // 한 페이지에 보여줄 아이템 수
          currentPage={currentPage}
          pageGroupSize={5} // 한 화면에 보여줄 페이지 버튼 수 (기본 5)
          basePath={`/category/${category}`} // 페이지 선택 시 호출
        />
      </article>
    </section>
  );
}
