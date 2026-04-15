import { getCategoryProducts, getNewProducts } from "@/features/product/api";
import ProductListGrid from "@/features/product/components/product-list/ProductListGrid";
import ProductListTitle from "@/features/product/components/product-list/ProductListTitle";
import ProductSlide from "@/features/product/components/product-list/ProductSlide";
import { getCategories } from "@/shared/hooks/category";
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
  const decodedCategory = decodeURIComponent(category).toLowerCase();

  const sortType = query.sortType ?? "NEW";
  const direction = query.direction ?? "DESC";
  const apiPage = Number(query.page ?? "0");
  const pageSize = 2;
  const currentPage = apiPage + 1;

  const isNewCategory = decodedCategory === "new";
  const isBestCategory = decodedCategory === "best";
  const isSpecialCategory = isNewCategory || isBestCategory;
  const shouldShowBestSlide = !isSpecialCategory;

  const result = await (async () => {
    if (isNewCategory) {
      return {
        categoryName: "신상품",
        products: await getNewProducts(direction, apiPage, pageSize),
      };
    }
    if (isBestCategory) {
      notFound();
      // 나중에 best API 생기면 아래처럼 교체
      // return {
      //   categoryName: "베스트",
      //   products: await getBestProducts(direction, apiPage, pageSize),
      // };
    }
    const categories = await getCategories();
    const currentCategory = categories.find(
      (item) => item.categoryName.toLowerCase() === decodedCategory
    );
    if (!currentCategory) {
      notFound();
    }
    return {
      categoryName: currentCategory.categoryName,
      products: await getCategoryProducts(
        currentCategory.id,
        sortType,
        direction,
        apiPage,
        pageSize
      ),
    };
  })();

  const { categoryName, products } = result;

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
