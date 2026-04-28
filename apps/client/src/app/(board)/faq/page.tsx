import BoardTable from "@/features/board/components/BoardTable";
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

export default async function FaqPage({ searchParams }: Props) {
  // api 연결 후 변경 예정 (리뷰X)
  const posts = {
    content: [
      { id: 1, title: "첫 번째 글", author: "관리자", createdAt: "2026-04-27" },
      { id: 2, title: "두 번째 글", author: "관리자", createdAt: "2026-04-26" },
      { id: 3, title: "세 번째 글", author: "관리자", createdAt: "2026-04-25" },
      { id: 4, title: "네 번째 글", author: "관리자", createdAt: "2026-04-25" },
      { id: 5, title: "다섯 번째", author: "관리자", createdAt: "2026-04-25" },
      { id: 6, title: "여섯 번째", author: "관리자", createdAt: "2026-04-25" },
      { id: 7, title: "일곱 번째", author: "관리자", createdAt: "2026-04-25" },
      { id: 8, title: "여덟 번째", author: "관리자", createdAt: "2026-04-25" },
      { id: 9, title: "아홉 번째", author: "관리자", createdAt: "2026-04-25" },
      { id: 10, title: "열 번째", author: "관리자", createdAt: "2026-04-25" },
    ],
    totalElements: 11,
    pageNumber: 0,
    pageSize: 10,
    totalPages: 2,
    last: 0 === Math.ceil(11 / 10) - 1,
  };

  const query = await searchParams;
  const keyword = query.keyword?.trim() ?? "";
  const apiPage = Number(query.page ?? "0");
  const pageSize = 10;
  const currentPage = apiPage + 1;

  return (
    <section className="container">
      <article className="w-full">
        <h2 className="title2 flex justify-center pt-17 pb-9">
          자주 묻는 질문
        </h2>
        <SearchInput value={keyword} query={"faq"} />
      </article>

      <BoardTable data={posts.content} query={"faq"} />

      <article className="mt-30 mb-20 flex justify-center">
        <PageLinkButton
          totalItems={posts.totalElements}
          limit={pageSize}
          currentPage={currentPage}
          pageGroupSize={5}
          basePath="/faq"
          searchParams={query}
        />
      </article>
    </section>
  );
}
