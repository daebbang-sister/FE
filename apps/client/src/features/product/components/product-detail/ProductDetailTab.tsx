"use client";

import ProductDetailReview from "@/features/product/components/product-detail/ProductDetailReview";
import ProductDetailImage from "@/features/product/components/product-detail/ProductDetailImage";
import { TabButton } from "@repo/ui";
import { useEffect, useRef, useState } from "react";

type Props = {
  productId: number;
};
export default function ProductDetailTab({ productId }: Props) {
  // 위험한 로직: 탭 컴포넌트의 상태 관리 충돌 가능성 ProductDetailTab
  // 컴포넌트에서 IntersectionObserver와 탭 클릭 핸들러(handleTabChange)가
  // activeTab 상태를 동시에 제어할 수 있는 구조입니다.
  // 탭 클릭으로 스크롤 이동 후 스크롤 위치가 미세하게 변경되거나 사용자 스크롤과 IntersectionObserver가 동시에 작동할 경우,
  // activeTab 상태가 의도치 않게 변경될 수 있는 위험한 로직입니다.
  // 참고해서 추후 변경 예정

  const [activeTab, setActiveTab] = useState(0);

  const infoRef = useRef<HTMLElement | null>(null);
  const reviewRef = useRef<HTMLElement | null>(null);

  const handleTabChange = (index: number) => {
    const target = index === 0 ? infoRef.current : reviewRef.current;

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (!visibleEntry) return;
        if (visibleEntry.target === infoRef.current) {
          setActiveTab(0);
        }
        if (visibleEntry.target === reviewRef.current) {
          setActiveTab(1);
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );
    if (infoRef.current) observer.observe(infoRef.current);
    if (reviewRef.current) observer.observe(reviewRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full max-w-full lg:max-w-194">
      <article className="bg-neutral-0 relative lg:sticky lg:top-25">
        <TabButton
          className="w-full"
          tabs={["상품정보", "리뷰(N)"]}
          size={"L"}
          defaultIndex={0}
          onChange={handleTabChange}
        />
      </article>
      <article ref={infoRef} className="scroll-mt-28">
        <ProductDetailImage />
      </article>

      <article ref={reviewRef} className="scroll-mt-28">
        <ProductDetailReview productId={productId} />
      </article>
    </section>
  );
}
