"use client";

import { useState } from "react";

type PaginationProps = {
  totalItems: number;
  limit: number;
  pageGroupSize?: number;
  onPageChange?: (page: number) => void;
  scrollToTop?: boolean;
};

export function PageButton({
  totalItems,
  limit,
  pageGroupSize = 5,
  scrollToTop,
  onPageChange,
}: PaginationProps) {
  const totalPage = Math.ceil(totalItems / limit);
  const [currentPage, setCurrentPage] = useState(1);

  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
    onPageChange?.(page);
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <article className="flex items-center gap-2.5">
      {/* <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button> */}
      <button
        onClick={() => handlePageChange(startPage - 1)}
        disabled={startPage === 1}
        className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-neutral-200"
      >
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.87445 10.3423L0.937937 5.5L5.87445 0.65774C6.02254 0.512473 6.02254 0.254219 5.87445 0.108951C5.72635 -0.0363169 5.46307 -0.0363169 5.31498 0.108951L0.115185 5.22561C0.0329095 5.30631 6.4432e-08 5.40315 6.55868e-08 5.5C6.67417e-08 5.59685 0.0329095 5.69369 0.115185 5.7744L5.33143 10.891C5.47953 11.0363 5.74281 11.0363 5.8909 10.891C6.039 10.7458 6.039 10.4875 5.87445 10.3423Z"
            fill={startPage === 1 ? "#858A96" : "#1D2433"}
          />
        </svg>
      </button>
      {pageNumbers.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            className={`caption1 flex h-6 w-6 items-center justify-center rounded-[3px] ${
              isActive
                ? "bg-text-primary text-white"
                : "bg-neutral-0 text-text-primary"
            }`}
            onClick={() => handlePageChange(page)}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => handlePageChange(endPage + 1)}
        disabled={endPage >= totalPage}
        className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-neutral-200"
      >
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.125552 0.657741L5.06206 5.5L0.125551 10.3423C-0.0225445 10.4875 -0.0225446 10.7458 0.125551 10.891C0.273646 11.0363 0.536927 11.0363 0.685022 10.891L5.88482 5.77439C5.96709 5.69369 6 5.59685 6 5.5C6 5.40316 5.96709 5.30631 5.88482 5.22561L0.668568 0.108952C0.520472 -0.0363168 0.257192 -0.0363169 0.109097 0.108952C-0.0389986 0.254219 -0.0389988 0.512473 0.125552 0.657741Z"
            fill={endPage >= totalPage ? "#858A96" : "#1D2433"}
          />
        </svg>
      </button>
      {/* <button
        onClick={() => handlePageChange(totalPage)}
        disabled={currentPage === totalPage}
      >
        {">>"}
      </button> */}
    </article>
  );
}

{
  /* 
    사용 방법
    "use client";
    
    <PageButton
        totalItems={150}  // 전체 아이템 수
        limit={5}  // 한 페이지에 보여줄 아이템 수
        pageGroupSize={5} // 한 화면에 보여줄 페이지 버튼 수 (기본 5)
        scrollToTop={true}  // 페이지 이동시 스크롤 맨위로 할꺼면
        onPageChange={(page) => console.log(page)}  // 페이지 선택 시 호출
    /> 
  */
}
