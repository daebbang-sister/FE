import { Button, Dropdown } from "@repo/ui";

export default function ProductDetailSummary() {
  // api 준비 이전 ui 준비단계
  const color = [
    { label: "red", value: "red" },
    { label: "blue", value: "blue" },
    { label: "green", value: "green" },
    { label: "yellow", value: "yellow" },
  ];
  const size = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
  ];

  return (
    <section className="bg-neutral-0 flex w-full flex-col gap-9 border border-neutral-300 px-7.5 py-10 lg:w-112.5">
      <article className="flex flex-col gap-3">
        <p className="body1 text-text-primary">
          이번 주 가장 사랑 받은 인기 아이템
        </p>
        <p className="body1 text-text-disabled">
          탄탄한 니트 소재를 더한 베이직 라운드 니트 & 스트랩 세트
        </p>
      </article>

      <article className="flex flex-col gap-3">
        <div className="body1 text-text-disabled flex justify-between">
          <p>소비자가</p>
          <del>23,000won</del>
        </div>
        <div className="body1 flex justify-between">
          <p>판매가</p>
          <p>21,300won</p>
        </div>
      </article>

      <article className="flex flex-col gap-3">
        <div className="body1 flex items-center justify-between">
          <p className="w-17.5 text-left">컬러</p>
          <div className="flex-1">
            <Dropdown options={color} size="L" placeholder="[필수]컬러 선택" />
          </div>
        </div>
        <div className="body1 flex items-center justify-between">
          <p className="w-17.5 text-left">사이즈</p>
          <div className="flex-1">
            <Dropdown options={size} size="L" placeholder="[필수]사이즈 선택" />
          </div>
        </div>
      </article>

      <article className="flex items-center gap-3 bg-neutral-100 p-4">
        <div className="body1 flex-1 text-left">
          <span>화이트</span>/<span>SMALL</span>
        </div>
        <ul className="bg-neutral-0 flex items-center">
          <li className="cursor-pointer px-3 py-2.5">
            <svg
              width="10"
              height="1"
              viewBox="0 0 10 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="10" height="1" fill="#1D2433" />
            </svg>
          </li>
          <li className="px-1 py-2.5">01</li>
          <li className="cursor-pointer px-3 py-2.5">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="4.5" width="10" height="1" fill="#1D2433" />
              <rect
                x="5.5"
                width="10"
                height="1"
                transform="rotate(90 5.5 0)"
                fill="#1D2433"
              />
            </svg>
          </li>
        </ul>
        <div>23,000won</div>
        <div className="cursor-pointer">
          <svg
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V5.33333C11.1429 4.35556 10.3714 3.55556 9.42857 3.55556H2.57143C1.62857 3.55556 0.857143 4.35556 0.857143 5.33333V14.2222ZM11.1429 0.888889H9L8.39143 0.257778C8.23714 0.0977777 8.01429 0 7.79143 0H4.20857C3.98571 0 3.76286 0.0977777 3.60857 0.257778L3 0.888889H0.857143C0.385714 0.888889 0 1.28889 0 1.77778C0 2.26667 0.385714 2.66667 0.857143 2.66667H11.1429C11.6143 2.66667 12 2.26667 12 1.77778C12 1.28889 11.6143 0.888889 11.1429 0.888889Z"
              fill="#858A96"
            />
          </svg>
        </div>
      </article>

      <article className="flex flex-col gap-3">
        <div className="body1 flex justify-between">
          <p>총 상품 금액</p>
          <p>23,000won</p>
        </div>
        <div className="body1 flex justify-between">
          <p>할인 금액</p>
          <p>3,400won</p>
        </div>
        <div className="bg-text-primary my-3 h-0.25 w-full" />
        <div className="body1 flex justify-between">
          <p>결제 예상 금액</p>
          <p className="title3">
            42,600won<span>(2개)</span>
          </p>
        </div>
        <div className="body1 text-text-disabled flex justify-between">
          <p>예상 적립 금액</p>
          <p>400</p>
        </div>
      </article>

      <article className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-900 lg:mx-3.5">
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.401 0C15.7039 0 17.7527 2.70377 17.7014 5.79861C17.6703 7.66352 16.3812 9.56358 14.8368 11.1979C13.2508 12.8762 11.2149 14.4615 9.34375 15.7083L8.85069 16.0365L8.35764 15.7083C6.49154 14.4645 4.44251 12.8942 2.84896 11.2222C1.29676 9.59362 0 7.68741 0 5.78299C0.000269679 2.68329 2.12438 0 5.41146 0C6.67571 9.90596e-05 7.77449 0.573327 8.85417 1.51389C9.97398 0.560519 11.1498 5.00139e-05 12.401 0ZM1.77778 5.78299C1.77778 6.948 2.62522 8.41199 4.13542 9.99653C5.471 11.3978 7.1912 12.752 8.85069 13.8924C10.5052 12.7522 12.2142 11.3842 13.5451 9.97569C15.0506 8.38251 15.9062 6.91453 15.9253 5.7691C15.9637 3.45466 14.5101 1.77778 12.401 1.77778C11.5801 1.77784 10.6227 2.21013 9.47917 3.35243L8.85069 3.97917L8.22222 3.35243C7.05656 2.18799 6.21267 1.77789 5.41146 1.77778C3.28708 1.77778 1.77803 3.47396 1.77778 5.78299Z"
              fill="#FEC300"
            />
          </svg>
        </div>
        <Button variant="stroke" className="flex-1 lg:min-w-[155px]">
          장바구니
        </Button>
        <Button variant="gray" className="flex-1 lg:min-w-[155px]">
          구매하기
        </Button>
      </article>
    </section>
  );
}
