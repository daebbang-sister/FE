// import { getMainProducts } from "@/features/home/api";
import { getCategoryProducts } from "@/features/product/api";
import ProductListGrid from "@/features/product/components/product-list/ProductListGrid";
import ProductListTitle from "@/features/product/components/product-list/ProductListTitle";
import ProductSlide from "@/features/product/components/product-list/ProductSlide";
import { getCategoryId, getCategoryName } from "@/shared/hooks/category";
import { PageLinkButton } from "@/shared/ui/button/PageLinkButton";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    sortType?: string;
    direction?: string;
    page?: string;
    size?: string;
  }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const query = await searchParams;
  const decodedCategory = decodeURIComponent(category);

  const categoryId = getCategoryId(decodedCategory);
  const categoryName = getCategoryName(decodedCategory);
  if (!categoryId || !categoryName) {
    notFound();
  }

  const sortType = query.sortType ?? "NEW";
  const direction = query.direction ?? "DESC";
  const apiPage = Number(query.page ?? "0");
  const pageSize = Number(query.size ?? "1");
  const currentPage = apiPage + 1;

  const products = await getCategoryProducts(
    categoryId,
    sortType,
    direction,
    apiPage,
    pageSize
  );

  const shouldShowBestSlide =
    decodedCategory !== "best" && decodedCategory !== "new";
  // 베스트 상품 api추가 되면 아래코드 형식으로 변경 예정
  // const bestProducts = shouldShowBestSlide ? await getBestProducts() : [];

  return (
    <section className="container-wide">
      <article className="w-full">
        <ProductListTitle title={categoryName} />
        {shouldShowBestSlide && <ProductSlide products={products.content} />}
      </article>

      <article className="container-wide">
        <ProductListGrid products={products} />
      </article>

      <article className="flex justify-center pb-10">
        <PageLinkButton
          totalItems={products.totalElements}
          limit={pageSize}
          currentPage={currentPage}
          pageGroupSize={5}
          basePath={`/products/${category}`}
          searchParams={query}
        />
      </article>
    </section>
  );
}
