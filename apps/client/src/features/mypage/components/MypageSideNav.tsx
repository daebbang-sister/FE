"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchGetUser } from "@/features/mypage/api";
import { UserInfo } from "@/features/mypage/model";

type MenuItem =
  | { type: "link"; href: string; label: string }
  | { type: "divider" };
const menus: MenuItem[] = [
  { type: "link", href: "/mypage/orders", label: "주문조회" },
  { type: "link", href: "/mypage/wish-list", label: "위시리스트" },
  { type: "link", href: "/mypage/review", label: "상품리뷰" },
  { type: "divider" },
  { type: "link", href: "/mypage/points", label: "적립금" },
  { type: "divider" },
  { type: "link", href: "/mypage/profile", label: "회원정보 수정" },
];

export default function MypageSideNav() {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchGetUser();
        setUserInfo(user);
        // console.log("유저 데이터:", user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <aside>
      <div className="mb-6 flex items-center gap-2 md:mb-12">
        <p className="title2">{userInfo?.userName}님</p>
        <div className="bg-text-primary flex items-center gap-1 rounded-full px-1.5 py-1">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0ZM3.37402 2.5V7.5H4.41016V5.87012H5.30762C6.46075 5.87012 7.12382 5.18668 7.12402 4.18555C7.12402 3.19798 6.47446 2.5 5.33496 2.5H3.37402ZM5.1416 3.34961C5.75624 3.34961 6.05371 3.68831 6.05371 4.18555C6.05353 4.68944 5.75605 5.03418 5.1416 5.03418H4.41016V3.34961H5.1416Z"
              fill="#FEC300"
            />
          </svg>
          {/* 적립금 추후 변경 예정 */}
          <p className="caption2 text-brand-700">2000</p>
        </div>
      </div>

      <nav className="caption1 md:title3 mb-12 grid grid-cols-3 gap-x-1 gap-y-1 text-center md:mb-0 md:flex md:flex-col md:gap-6 md:text-left">
        {menus.map((menu, idx) => {
          if (menu.type === "divider") {
            return (
              <hr
                key={idx}
                className="hidden border-t border-neutral-300 md:block"
              />
            );
          }
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`${
                isActive ? "text-text-primary" : "text-text-disabled"
              } hover:text-text-primary bg-neutral-300 py-1.5 md:bg-transparent md:py-0`}
            >
              {menu.label}
            </Link>
          );
        })}

        <p className="text-text-disabled hover:text-text-primary cursor-pointer py-1.5 md:py-0">
          로그아웃
        </p>
      </nav>
    </aside>
  );
}
