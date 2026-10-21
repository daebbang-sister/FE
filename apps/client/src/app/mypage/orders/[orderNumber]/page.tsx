"use client";
import { getOrdersDetailAPI } from "@/features/mypage/api";
import MypageTitle from "@/features/mypage/components/MypageTitle";
import OrderActionButtons from "@/features/mypage/components/OrderActionButtons";
import { OrdertDetail } from "@/features/mypage/model";
import { formatDateKR } from "@/features/mypage/utils/formatDateKR";
import { formatOrderStatus } from "@/features/mypage/utils/formatOrderStatus";
import PageLoading from "@/shared/components/layout/PageLoading";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersDetail() {
  const params = useParams<{ orderNumber: string }>();
  const orderNumber = params.orderNumber;

  const [data, setData] = useState<OrdertDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mainImageLoading, setMainImageLoading] = useState(true);

  const fetchGetOrderDetail = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getOrdersDetailAPI(orderNumber);
      // console.log(res, "상세페이지 데이터");
      setData(res);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGetOrderDetail();
  }, [orderNumber]);

  if (isLoading) return <PageLoading />;
  if (!isLoading && isError) return <div> 리뷰를 불러오지 못했습니다.</div>;
  if (!isLoading && data && data.details.length === 0) {
    return (
      <div className="text-text-disabled body1 flex h-full items-center justify-center">
        주문 내역이 없습니다.
      </div>
    );
  }

  return (
    <section>
      <MypageTitle title={"주문상세"} />
      <div className="mb-6 flex items-center gap-1.25">
        <p className="title3">{data && formatDateKR(data.orderedAt)}</p>
        <span className="caption1">(주문번호 : {data?.orderNumber})</span>
      </div>

      <main className="space-y-12">
        <article className="space-y-3">
          {data?.details.map((item) => (
            <div
              key={item.orderDetailId}
              className="border border-neutral-300 p-4"
            >
              <h2 className="caption1 bg-danger-800 text-neutral-0 mb-3 inline-block px-4 py-3">
                {formatOrderStatus(item.status)}
              </h2>
              <div className="flex gap-3">
                <div className="relative h-25 w-25 overflow-hidden">
                  {mainImageLoading && (
                    <div className="animate-shimmer absolute inset-0 z-10 bg-neutral-100" />
                  )}
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    sizes="100px"
                    className={`object-cover object-center transition-opacity duration-500 ${
                      mainImageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoadingComplete={() => setMainImageLoading(false)}
                  />
                </div>

                <ul>
                  <li className="body1 mb-3">{item.productName}</li>
                  <li className="body1 text-text-disabled">
                    {item.color}/{item.size} {item.quantity}개
                  </li>
                  <li className="body1 gap-2 font-bold">
                    {item.originalPrice !== item.discountPrice ? (
                      <del className="caption2 text-text-disabled mt-2 inline-block">
                        {item.originalPrice?.toLocaleString()}won
                      </del>
                    ) : (
                      <div className="h-5" />
                    )}
                    <p>{item.discountPrice?.toLocaleString()}won</p>
                  </li>
                </ul>
              </div>
              <OrderActionButtons
                mode="detail"
                orderNumber={orderNumber}
                status={item.status}
                orderDetailId={item.orderDetailId}
                refetch={fetchGetOrderDetail}
              />
            </div>
          ))}
        </article>

        <article>
          <h2 className="title3 mb-6">주문자 정보</h2>
          <ul className="space-y-4 border-y border-neutral-300 py-6 [&>li]:flex">
            <li className="[&>p:nth-child(1)]:text-text-disabled">
              <p className="w-30">주문자</p>
              <p>홍길동</p>
            </li>
            <li className="[&>p:nth-child(1)]:text-text-disabled">
              <p className="w-30">연락처</p>
              <p>010-****-5678</p>
            </li>
          </ul>
        </article>

        <article>
          <h2 className="title3 mb-6">배송지 정보</h2>
          <ul className="space-y-4 border-y border-neutral-300 py-6 [&>li]:flex">
            <li className="[&>p:nth-child(1)]:text-text-disabled">
              <p className="w-30">주소</p>
              <p>서울시 강서구</p>
            </li>
            <li className="[&>p:nth-child(1)]:text-text-disabled">
              <p className="w-30">수령인</p>
              <p>홍*동</p>
            </li>
            <li className="[&>p:nth-child(1)]:text-text-disabled">
              <p className="w-30">연락처</p>
              <p>010-****-5678</p>
            </li>
            <li className="[&>p:nth-child(1)]:text-text-disabled">
              <p className="w-30">배송메모</p>
              <p>문 앞에 나두고 가주세요</p>
            </li>
          </ul>
        </article>

        <article>
          <h2 className="title3 mb-6">결제 내역</h2>
          <ul className="flex flex-col gap-4 border-y border-neutral-300 py-6 [&>li]:flex [&>li]:justify-between">
            <li>
              <p>상품 가격</p>
              <p>{data?.totalOriginalAmount.toLocaleString()}won</p>
            </li>
            <li>
              <p>할인 금액</p>
              <p>
                {(data?.totalOriginalAmount ?? 0) -
                  (data?.totalSellingAmount ?? 0) >
                0
                  ? `-${(
                      (data?.totalOriginalAmount ?? 0) -
                      (data?.totalSellingAmount ?? 0)
                    ).toLocaleString()}won`
                  : "0won"}
              </p>
            </li>
            <li>
              <p>배송비</p>
              <p>{data?.shippingFee.toLocaleString()}won</p>
            </li>
            <li>
              <p>적립금 사용</p>{" "}
              <p>
                {data?.usedPoint
                  ? `-${data.usedPoint.toLocaleString()}won`
                  : "0won"}
              </p>
            </li>
          </ul>
        </article>
      </main>
      <article className="body1 mt-6 space-y-3">
        <ul className="flex justify-between font-bold">
          <li>총 결제 금액</li>
          <li>{data?.paymentAmount.toLocaleString()}won</li>
        </ul>
        <div className="text-text-disabled text-right">
          신용카드(카드사/일시불)
        </div>
      </article>

      {/* 무통장 입금시, 아직 결제 상태값 없음 */}
      {/* <article className="mt-12">
        <h2 className="title3 mb-6">입금 계좌 안내</h2>
        <ul className="flex flex-col gap-4 border-y border-neutral-300 py-6 [&>li]:flex [&>li]:justify-between">
          <li>
            <p>입금계좌</p>
            <p>국민은행 0000000000-0000000000</p>
          </li>
          <li>
            <p>예금주</p>
            <p>대빵언니</p>
          </li>
          <li>
            <p>입금기한</p>
            <p>2026-04-15 23:59</p>
          </li>
        </ul>
      </article> */}
    </section>
  );
}
