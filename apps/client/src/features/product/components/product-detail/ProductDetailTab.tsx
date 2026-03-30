"use client";

import ProductDetailReview from "@/features/product/components/product-detail/ProductDetailReview";
import ProductDetailImage from "@/features/product/components/product-detail/ProductDetailImage";
import { TabButton } from "@repo/ui";
import { useEffect, useRef, useState } from "react";
export default function ProductDetailTab() {
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
        <ProductDetailReview rating={3} />
      </article>
    </section>
  );
}
