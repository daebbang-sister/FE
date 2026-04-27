import { getProductSearch } from "@/features/product/api";
import ProductListGrid from "@/features/product/components/product-list/ProductListGrid";
import { ApiError } from "@/shared/lib/error";
import { PageLinkButton } from "@/shared/ui/button/PageLinkButton";
import SearchInput from "@/shared/ui/input/SearchInput";

type Props = {
  searchParams: Promise<{
    keyword: string;
    sortType?: string;
    direction?: string;
    page?: string;
    size?: string;
  }>;
};

export default async function ProductsSearchPage({ searchParams }: Props) {
  const query = await searchParams;

  const keyword = query.keyword?.trim() ?? "";
  const sortType = query.sortType ?? "NEW";
  const direction = query.direction ?? "DESC";
  const apiPage = Number(query.page ?? "0");
  const pageSize = 8;
  const currentPage = apiPage + 1;

  const result = await (async () => {
    if (!keyword) {
      return {
        products: null,
        isServerError: false,
        isEmpty: true,
      };
    }
    try {
      const products = await getProductSearch(
        keyword,
        sortType,
        direction,
        apiPage,
        pageSize
      );
      return {
        products,
        isServerError: false,
        isEmpty: !products || products.totalElements === 0,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        const status = Number(error.status);
        if (status === 404) {
          return {
            products: null,
            isServerError: false,
            isEmpty: true,
          };
        }
      }
      return {
        products: null,
        isServerError: true,
        isEmpty: false,
      };
    }
  })();
  const { products, isServerError, isEmpty } = result;

  if (isServerError) {
    return (
      <div className="title2 flex items-center">
        검색 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <section className="container-wide">
      <article className="w-full">
        <h2 className="title2 flex justify-center pt-17 pb-9">검색결과</h2>
        <SearchInput value={keyword}></SearchInput>
        {isEmpty && (
          <p className="text-text-disabled my-28 flex justify-center">
            {keyword
              ? `"${keyword}"에 대한 검색 결과가 없습니다.`
              : "검색 키워드를 입력해 주세요."}
          </p>
        )}
      </article>

      {!isEmpty && products && (
        <>
          <article className="container-wide">
            <ProductListGrid products={products} />
          </article>

          <article className="flex justify-center pb-10">
            <PageLinkButton
              totalItems={products.totalElements}
              limit={pageSize}
              currentPage={currentPage}
              pageGroupSize={5}
              basePath="/products/search"
              searchParams={query}
            />
          </article>
        </>
      )}
    </section>
  );
}
