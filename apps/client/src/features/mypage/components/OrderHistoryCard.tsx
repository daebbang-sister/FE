import OrderActionButtons from "@/features/mypage/components/OrderActionButtons";
import { OrderItem } from "@/features/mypage/model";
import { formatDateKR } from "@/features/mypage/utils/formatDateKR";
import { formatOrderStatus } from "@/features/mypage/utils/formatOrderStatus";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  orderItem: OrderItem[];
  refetch?: () => Promise<void>;
};
export default function OrderHistoryCard({ orderItem, refetch }: Props) {
  const [mainImageLoading, setMainImageLoading] = useState(true);
  return (
    <section>
      {orderItem.map((item) => (
        <div key={item.orderNumber}>
          <article className="mt-5 flex items-center justify-between py-2">
            <div className="flex gap-1.25">
              <p className="title3">{formatDateKR(item.orderedAt)}</p>
              {item.totalQuantity != 1 && (
                <p className="caption1">
                  제일 최근에 담은 상품 외 {item.totalQuantity - 1}건
                </p>
              )}
            </div>
            <div className="flex cursor-pointer items-center gap-1.5">
              <Link
                href={`/mypage/orders/${item.orderNumber}`}
                className="caption1 text-text-disabled"
              >
                전체보기
              </Link>
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
              {formatOrderStatus(item.orderStatus)}
            </h2>
            <div className="flex gap-3">
              <div className="relative h-25 w-25 overflow-hidden">
                {mainImageLoading && (
                  <div className="animate-shimmer absolute inset-0 z-10 bg-neutral-100" />
                )}
                <Image
                  src={item.representativeImageUrl}
                  alt={item.representativeProductName}
                  fill
                  sizes="100px"
                  className={`object-cover object-center transition-opacity duration-500 ${
                    mainImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoadingComplete={() => setMainImageLoading(false)}
                />
              </div>

              <ul>
                <li className="body1 mb-3">{item.representativeProductName}</li>
                <li className="body1 text-text-disabled mb-5">
                  {item.representativeColor}/{item.representativeSize}{" "}
                  {item.representativeQuantity}개
                </li>
                <li className="body1 gap-2 font-bold">
                  {/* <del className="caption2 text-text-disabled">
                    {item.paymentAmount?.toLocaleString()}won
                  </del> */}
                  <p>{item.representativeUnitPrice?.toLocaleString()}won</p>
                </li>
              </ul>
            </div>
            <OrderActionButtons
              mode="list"
              orderNumber={item.orderNumber}
              status={item.orderStatus}
              refetch={refetch}
            />
          </article>
        </div>
      ))}
    </section>
  );
}
