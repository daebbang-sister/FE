import { PageButton } from "@repo/ui";
import Image from "next/image";
type Props = {
  rating: number; // 0 ~ 5
};

export default function ProductReview({ rating }: Props) {
  return (
    <>
      <section>
        <h2 className="title2 mb-9">고객 리뷰</h2>

        <article className="flex items-center text-center">
          <div className="w-56.25">
            <p className="mb-1.5 text-[56px] leading-[56px] font-bold">4.7</p>
            <p className="caption1 text-text-disabled">리뷰 100개</p>
          </div>

          <div className="flex-1">
            <ul className="flex flex-col gap-3">
              <li className="flex gap-2.5">
                <p className="min-w-18 text-left">아주 좋아요</p>
                <div className="flex-1 rounded-full bg-neutral-200"></div>
                <p className="min-w-7.5 text-right">999</p>
              </li>
              <li className="flex gap-2.5">
                <p className="min-w-18 text-left">맘에 들어요</p>
                <div className="flex-1 rounded-full bg-neutral-200"></div>
                <p className="min-w-7.5 text-right">2</p>
              </li>
              <li className="flex gap-2.5">
                <p className="min-w-18 text-left">보통이에요</p>
                <div className="flex-1 rounded-full bg-neutral-200"></div>
                <p className="min-w-7.5 text-right">10</p>
              </li>
              <li className="flex gap-2.5">
                <p className="min-w-18 text-left">그냥 그래요</p>
                <div className="flex-1 rounded-full bg-neutral-200"></div>
                <p className="min-w-7.5 text-right">55</p>
              </li>
              <li className="flex gap-2.5">
                <p className="min-w-18 text-left">별로예요</p>
                <div className="flex-1 rounded-full bg-neutral-200"></div>
                <p className="min-w-7.5 text-right">4</p>
              </li>
            </ul>
          </div>
        </article>

        <article className="my-12 flex flex-col gap-7.5">
          <div>
            <div className="body1 mb-3 flex justify-between">
              <p>아이디인데별표처리를곁들인</p>
              <p className="text-text-disabled">2025.09.09</p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const isActive = i < rating;
                return (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.24897 0.487005L4.54019 4.10687L0.717021 4.68922C0.0314143 4.79311 -0.243352 5.67621 0.253844 6.182L3.01982 8.99806L2.36562 12.9761C2.24786 13.6951 2.97272 14.2337 3.57982 13.8975L7 12.0192L10.4202 13.8975C11.0273 14.231 11.7521 13.6951 11.6344 12.9761L10.9802 8.99806L13.7462 6.182C14.2434 5.67621 13.9686 4.79311 13.283 4.68922L9.45981 4.10687L7.75103 0.487005C7.44486 -0.158228 6.55776 -0.16643 6.24897 0.487005Z"
                      fill={isActive ? "#FEC300" : "#E0DFE4"}
                    />
                  </svg>
                );
              })}
            </div>
            <div className="my-1">
              <p className="body2">
                털 부분이 복슬복슬하고 풍성해서 엄청 귀여워요! 핏도 168한테도
                알맞게 예뻣구 생각보다 따뜻해서 한겨울 제외하고는 잘 입고
                다녔어요~ 카키랑 고민했는데 블랙이 여기저기 잘 입고다닐 수 있는
                것 같아요!
              </p>
              <p className="body2 text-text-disabled">
                ㄴ예쁘게 잘 입어주세요^^
              </p>
            </div>
            <div className="flex gap-1.25">
              <div className="relative h-31.25 w-31.25 border border-black">
                <Image
                  src="/images/look1.jpg"
                  alt="썸네일"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="body1 mb-3 flex justify-between">
              <p>아이디인데별표처리******</p>
              <p className="text-text-disabled">2025.09.09</p>
            </div>
            <div>별점</div>
            <div className="my-1">
              <p className="body2">
                털 부분이 복슬복슬하고 풍성해서 엄청 귀여워요! 핏도 168한테도
                알맞게 예뻣구 생각보다 따뜻해서 한겨울 제외하고는 잘 입고
                다녔어요~ 카키랑 고민했는데 블랙이 여기저기 잘 입고다닐 수 있는
                것 같아요!
              </p>
              <p className="body2 text-text-disabled">
                ㄴ예쁘게 잘 입어주세요^^
              </p>
            </div>
            <div className="flex gap-1.25">
              <div className="relative h-31.25 w-31.25 border border-black">
                <Image
                  src="/images/look1.jpg"
                  alt="썸네일"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-31.25 w-31.25 border border-black">
                <Image
                  src="/images/look1.jpg"
                  alt="썸네일"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-31.25 w-31.25 border border-black">
                <Image
                  src="/images/look1.jpg"
                  alt="썸네일"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </article>
        <article className="flex w-full justify-center py-18">
          <PageButton
            totalItems={150} // 전체 아이템 수
            limit={5} // 한 페이지에 보여줄 아이템 수
            pageGroupSize={5} // 한 화면에 보여줄 페이지 버튼 수 (기본 5)
            onPageChange={(page) => console.log(page)} // 페이지 선택 시 호출
          />
        </article>
      </section>
    </>
  );
}
