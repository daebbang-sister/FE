"use client";

import SectionLayout from "@/features/home/components/SectionLayout";
import ProductCard from "@/features/product/components/ProductCard/ProductCard";
import { TabButton } from "@repo/ui";
import { useState } from "react";

export const realtimeBest = {
  id: "realtime-best",
  title: "실시간 베스트",
  tabs: [
    {
      id: "all",
      label: "전체",
      products: [
        {
          id: 1,
          category: "outer",
          title: "오버핏 울 코트",
          originalPrice: "129,000원",
          salePrice: "89,000원",
          discount: "31%",
          colors: ["#000000", "#e5e7eb"],
          primaryImage:
            "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1200",
          hoverImage:
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200",
        },
        {
          id: 2,
          category: "top",
          title: "데일리 니트 가디건",
          originalPrice: "59,000원",
          salePrice: "39,000원",
          discount: "34%",
          colors: ["#9ca3af", "#fcd34d"],
          primaryImage:
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200",
          hoverImage:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200",
        },
      ],
    },
    {
      id: "top",
      label: "상의",
      products: [
        {
          id: 3,
          category: "top",
          title: "베이직 라운드 니트",
          originalPrice: "49,000원",
          salePrice: "29,000원",
          discount: "40%",
          colors: ["#e5e7eb", "#f87171"],
          primaryImage:
            "https://images.unsplash.com/photo-1520975682031-a9c07b7c69c7?q=80&w=1200",
          hoverImage:
            "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=1200",
        },
      ],
    },
    {
      id: "bottom",
      label: "하의",
      products: [
        {
          id: 4,
          category: "bottom",
          title: "와이드 슬랙스 팬츠",
          originalPrice: "79,000원",
          salePrice: "55,000원",
          discount: "30%",
          colors: ["#000000", "#6b7280"],
          primaryImage:
            "https://images.unsplash.com/photo-1520975867597-0af37a22e31e?q=80&w=1200",
          hoverImage:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
        },
      ],
    },
    {
      id: "outer",
      label: "아우터",
      products: [
        {
          id: 5,
          category: "outer",
          title: "프리미엄 울 자켓",
          originalPrice: "139,000원",
          salePrice: "99,000원",
          discount: "28%",
          colors: ["#000000", "#e5e7eb"],
          primaryImage:
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200",
          hoverImage:
            "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200",
        },
      ],
    },
  ],
};

export default function BestProducts() {
  const [tab, setTab] = useState(0);
  const activeTab = realtimeBest.tabs[tab];

  return (
    <SectionLayout
      title="실시간 베스트"
      description="월요일 오전 10시 업데이트"
      moreLink="/products/best"
    >
      <div className="mb-18 flex justify-center">
        <TabButton
          tabs={realtimeBest.tabs.map((tabItem) => tabItem.label)}
          size="M"
          defaultIndex={0}
          onChange={setTab}
        />
      </div>

      <div className="grid grid-cols-4 gap-x-5 gap-y-12">
        {activeTab.products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </SectionLayout>
  );
}
