"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/features/product/components/ProductCard/ProductCard";
import { Button, TabButton } from "@repo/ui";

export const banners = [
  {
    id: 1,
    title: "BEST ITEM",
    image: "사진1",
  },
  {
    id: 2,
    title: "NEW ITEM",
    image: "사진2",
  },
  {
    id: 3,
    title: "TOP",
    image: "사진3",
  },
  {
    id: 4,
    title: "BOTTOM",
    image: "사진4",
  },
];

export const newProducts = [
  {
    id: "n1",
    category: "outer",
    title: "오버핏 울 코트",
    originalPrice: "129,000원",
    salePrice: "89,000원",
    discount: "31%",
    primaryImage: "/images/product-1.jpg",
    hoverImage: "/images/product-1-hover.jpg",
    colors: ["#111827", "#9ca3af", "#d1d5db"],
  },
  {
    id: "n2",
    category: "top",
    title: "데일리 니트 가디건",
    originalPrice: "59,000원",
    salePrice: "39,000원",
    discount: "34%",
    primaryImage: "/images/product-2.jpg",
    hoverImage: "/images/product-2-hover.jpg",
    colors: ["#000000", "#6b7280", "#d6d3d1"],
  },
];

export const productSections = [
  {
    id: "top",
    title: "TOP",
    products: [
      {
        id: "1",
        category: "top",
        title: "워싱 와이드 데님 팬츠",
        originalPrice: "39,000원",
        salePrice: "27,000원",
        discount: "30%",
        primaryImage: "/images/product-1.jpg",
        hoverImage: "/images/product-1-hover.jpg",
        colors: ["#1f2937", "#9ca3af", "#d1d5db"],
      },
      {
        id: "2",
        category: "top",
        title: "루즈핏 브이넥 니트",
        originalPrice: "29,000원",
        salePrice: "21,000원",
        discount: "27%",
        primaryImage: "/images/product-2.jpg",
        hoverImage: "/images/product-2-hover.jpg",
        colors: ["#111827", "#6b7280", "#d6d3d1"],
      },
    ],
  },
  {
    id: "bottom",
    title: "BOTTOM",
    products: [
      {
        id: "3",
        category: "bottom",
        title: "워싱 와이드 데님 팬츠",
        originalPrice: "39,000원",
        salePrice: "27,000원",
        discount: "30%",
        primaryImage: "/images/product-1.jpg",
        hoverImage: "/images/product-1-hover.jpg",
        colors: ["#1f2937", "#9ca3af", "#d1d5db"],
      },
      {
        id: "4",
        category: "bottom",
        title: "루즈핏 브이넥 니트",
        originalPrice: "29,000원",
        salePrice: "21,000원",
        discount: "27%",
        primaryImage: "/images/product-2.jpg",
        hoverImage: "/images/product-2-hover.jpg",
        colors: ["#111827", "#6b7280", "#d6d3d1"],
      },
    ],
  },
];

export const realtimeBest = {
  id: "realtime-best",
  title: "실시간 베스트",
  tabs: [
    {
      id: "all",
      label: "전체",
      products: [
        {
          id: "rb1",
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
          id: "rb2",
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
          id: "rb3",
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
          id: "rb4",
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
          id: "rb5",
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

export default function Page() {
  const [tab, setTab] = useState(0);
  const activeTab = realtimeBest.tabs[tab];

  return (
    <section className="w-full">
      <div className="grid grid-cols-4 gap-x-5">
        {banners.map((banner) => (
          <div key={banner.id}>
            <div className="aspect-3/3.5 overflow-hidden bg-neutral-200">
              <div className="h-full w-full object-cover">이미지</div>
            </div>
            <p className="font-poppins text-neutral-0/65 relative bottom-12 left-5 text-[32px] leading-none">
              {banner.title}
            </p>
          </div>
        ))}
      </div>

      <div className="container-wide mt-36 mb-36 space-y-36">
        {/* 신상품 */}
        <div>
          <div className="mb-18 text-center">
            <h2 className="title2">신상품</h2>
            <p className="text-text-disabled mt-4">평일 오전 10시 업데이트</p>
          </div>

          <div className="grid grid-cols-4 gap-x-5 gap-y-12">
            {newProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-30 flex justify-center">
            <Link href="/products/new">
              <Button variant="stroke" className="w-[270px]">
                전체 보러 가기
              </Button>
            </Link>
          </div>
        </div>

        {/* 실시간 베스트 */}
        <div>
          <div className="mb-9 text-center">
            <h2 className="title2">{realtimeBest.title}</h2>
            <p className="text-text-disabled mt-4">월요일 오전 10시 업데이트</p>
          </div>

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

          <div className="mt-30 flex justify-center">
            <Link href={`/products/${activeTab.id}`}>
              <Button variant="stroke" className="w-[270px]">
                전체 보러 가기
              </Button>
            </Link>
          </div>
        </div>

        {/* 일반 섹션 */}
        {productSections.map((section) => (
          <div key={section.id}>
            <div className="mb-18 text-center">
              <h2 className="title2">{section.title}</h2>
            </div>

            <div className="grid grid-cols-4 gap-x-5 gap-y-12">
              {section.products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="mt-30 flex justify-center">
              <Link href={`/products/${section.id}`}>
                <Button variant="stroke" className="w-[270px]">
                  전체 보러 가기
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
