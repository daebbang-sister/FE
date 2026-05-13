"use client";

import MypageTitle from "@/features/mypage/components/MypageTitle";
import OrderPurchaseNotice from "@/features/mypage/components/OrderPurchaseNotice";
import FileUploader from "@/shared/components/form/FileUploaderForm";
import { Button } from "@repo/ui";
import { useState } from "react";

export default function OrderRefundPage() {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <section className="space-y-12">
      <MypageTitle title={"반품/교환 신청"} />

      <article>전체 선택</article>

      <article>
        <h2 className="title3 mb-6">반품/교환 선택</h2>
        <div>
          <ul className="space-y-3 [&>li]:space-x-1">
            <li>
              <input
                type="radio"
                name="collection01"
                id="return"
                value="return"
              />
              <label htmlFor="return">반품</label>
            </li>
            <li>
              <input
                type="radio"
                name="collection01"
                id="exchange"
                value="exchange"
              />
              <label htmlFor="exchange">교환</label>
            </li>
          </ul>
        </div>
      </article>

      <article className="space-y-6">
        <h2 className="title3">반품/교환 사유</h2>
        <div>
          <p className="body1 mb-3">
            사유 선택 <span className="text-danger-200">*</span>
          </p>
          <ul className="space-y-3 [&>li]:space-x-1">
            <li>
              <input
                type="radio"
                name="collection02"
                id="reason-not-liked"
                value="상품이 맘에 들지 않아요"
              />
              <label htmlFor="reason-not-liked">상품이 맘에 들지 않아요</label>
            </li>
            <li>
              <input
                type="radio"
                name="collection02"
                id="reason-wrong-option"
                value="옵션을 잘못 선택했어요"
              />
              <label htmlFor="reason-wrong-option">
                옵션을 잘못 선택했어요
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="collection02"
                id="reason-size"
                value="사이즈가 맞지 않아요"
              />
              <label htmlFor="reason-size">사이즈가 맞지 않아요</label>
            </li>
            <li>
              <input
                type="radio"
                name="collection02"
                id="reason-damaged"
                value="상품이 파손 되었거나 불량이에요"
              />
              <label htmlFor="reason-damaged">
                상품이 파손 되었거나 불량이에요
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="collection02"
                id="reason-wrong-item"
                value="다른 상품이 왔거나 구성품이 빠졌어요"
              />
              <label htmlFor="reason-wrong-item">
                다른 상품이 왔거나 구성품이 빠졌어요
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="collection02"
                id="reason-description"
                value="상품 설명이 실제와 달라요"
              />
              <label htmlFor="reason-description">
                상품 설명이 실제와 달라요
              </label>
            </li>
          </ul>
        </div>
        <div>
          <p className="body1 mb-3">상세 사유</p>
          <textarea
            className="h-45 w-full resize-none border border-neutral-300 p-4"
            name=""
            id=""
            placeholder="최대 300자 이하까지 작성 가능합니다."
          ></textarea>
        </div>
        <div>
          <p className="body1 mb-3">사진 등록</p>
          <FileUploader
            images={images}
            onChangeImages={setImages}
            maxCount={5}
          />
        </div>
      </article>

      <article>
        <h2 className="title3 mb-6">수거 방법</h2>
        <div className="space-x-1">
          <input
            type="radio"
            name="collection03"
            id="pickup-request"
            value="pickup"
          />
          <label htmlFor="pickup-request">수거해주세요.</label>
        </div>
      </article>

      <article>
        <h2 className="title3 mb-6">수거지 정보</h2>
        <div className="space-x-1">
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
        </div>
        <ul className="caption2 text-text-disabled space-y-0.5 pt-3">
          <li>* 수거지 정보로 택배기사님이 방문합니다.</li>
          <li>* 수거지 정보는 변경하실 수 없습니다.</li>
        </ul>
      </article>

      <OrderPurchaseNotice />
      <Button variant="gray">반품/교환 신청</Button>
    </section>
  );
}
