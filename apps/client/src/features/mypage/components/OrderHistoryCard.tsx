import Image from "next/image";

export default function OrderHistoryCard() {
  return (
    <section>
      <article className="flex items-center justify-between py-6">
        <div className="flex gap-1.25">
          <p className="title3">2025.11.25</p>
          <p className="caption1">제일 최근에 담은 상품명 외 3건</p>
        </div>
        <div className="flex cursor-pointer items-center gap-1.5">
          <p className="caption1 text-text-disabled">전체보기</p>
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.12555 0.657741L5.06206 5.5L0.125551 10.3423C-0.0225446 10.4875 -0.0225446 10.7458 0.125551 10.891C0.273646 11.0363 0.536927 11.0363 0.685022 10.891L5.88481 5.77439C5.96709 5.69369 6 5.59684 6 5.5C6 5.40315 5.96709 5.30631 5.88481 5.2256L0.668567 0.108952C0.520471 -0.0363169 0.257191 -0.0363169 0.109096 0.108952C-0.0389998 0.254219 -0.0390001 0.512473 0.12555 0.657741Z"
              fill="#858A96"
            />
          </svg>
        </div>
      </article>

      <article className="border border-neutral-300 p-4">
        <h2 className="caption1 bg-danger-800 text-neutral-0 mb-3 inline-block px-4 py-3">
          주문 취소
        </h2>
        <div className="flex gap-3">
          <div className="bg-text-disabled relative h-25 w-25">
            <Image
              src="/images/sample.png"
              alt="상품 이미지"
              fill
              className="object-cover"
            />
          </div>
          {/* <div className="bg-text-disabled relative h-25 w-25">
            {mainImageLoading && (
              <div className="absolute inset-0 animate-pulse bg-neutral-200" />
            )}
            <Image
              src={mainImageUrl}
              fill
              alt={productName}
              sizes="10vw"
              className={`object-cover object-center transition-opacity duration-500 ${
                mainImageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoadingComplete={() => setMainImageLoading(false)}
            />
          </div> */}
          <ul>
            <li className="body1 mb-3">이번 주 가장 사랑 받은 인기 아이템</li>
            <li className="body1 text-text-disabled mb-5">화이트/SMALL 1개</li>
            <li className="body1 font-bold">42,600won</li>
          </ul>
        </div>
      </article>
    </section>
  );
}
