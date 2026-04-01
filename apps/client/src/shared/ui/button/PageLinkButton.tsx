import Link from "next/link";

type PaginationProps = {
  totalItems: number;
  limit: number;
  currentPage: number; // UI 기준: 1, 2, 3 ...
  pageGroupSize?: number;
  basePath: string;
  searchParams?: Record<string, string | string[] | undefined>;
};

export function PageLinkButton({
  totalItems,
  limit,
  currentPage,
  pageGroupSize = 5,
  basePath,
  searchParams,
}: PaginationProps) {
  const isInvalidPagination =
    !Number.isFinite(totalItems) ||
    !Number.isFinite(limit) ||
    !Number.isFinite(currentPage) ||
    totalItems <= 0 ||
    limit <= 0 ||
    currentPage <= 0;

  if (isInvalidPagination) return null;

  const totalPages = Math.ceil(totalItems / limit);
  if (totalPages <= 1) return null;

  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const groupStartPage = (currentGroup - 1) * pageGroupSize + 1;
  const groupEndPage = Math.min(groupStartPage + pageGroupSize - 1, totalPages);
  const previousPage = Math.max(1, groupStartPage - 1);
  const nextPage = Math.min(totalPages, groupEndPage + 1);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const visiblePages = Array.from(
    { length: groupEndPage - groupStartPage + 1 },
    (_, index) => groupStartPage + index
  );

  const createPageHref = (uiPage: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else if (value != null) {
          params.set(key, value);
        }
      });
    }
    const pageParam = uiPage - 1;
    params.set("page", String(pageParam));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <article className="flex items-center gap-2.5">
      <Link
        href={createPageHref(previousPage)}
        aria-disabled={!hasPreviousPage}
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
            fill={hasPreviousPage ? "#1D2433" : "#858A96"}
          />
        </svg>
      </Link>

      {visiblePages.map((pageNumber) => {
        const isActive = pageNumber === currentPage;
        return (
          <Link
            key={pageNumber}
            href={createPageHref(pageNumber)}
            aria-current={isActive ? "page" : undefined}
            className={`caption1 flex h-6 w-6 items-center justify-center rounded-[3px] ${
              isActive
                ? "bg-text-primary text-white"
                : "bg-neutral-0 text-text-primary"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}

      <Link
        href={createPageHref(nextPage)}
        aria-disabled={!hasNextPage}
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
            fill={hasNextPage ? "#1D2433" : "#858A96"}
          />
        </svg>
      </Link>
    </article>
  );
}
