"use client";

import { useLayoutUI } from "@/shared/context/layout-ui.context";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Category, FIXED_CATEGORIES } from "@/shared/hooks/category";

type Props = {
  categories: Category[];
};

export default function SideNaviClient({ categories }: Props) {
  const { isSideOpen, closeSide, closeAll } = useLayoutUI();
  const pathname = usePathname();

  useEffect(() => {
    if (isSideOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSideOpen]);
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  return (
    <>
      {/* overlay */}
      <div
        onClick={closeSide}
        className={`bg-neutral-1000/65 fixed inset-0 z-909 transition-opacity ${isSideOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      />

      {/* side panel */}
      <aside
        className={`fixed top-0 left-0 z-910 h-full w-full bg-white px-10 py-12.5 transition-transform duration-300 md:w-116.25 ${isSideOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button className="mb-12" onClick={closeSide}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.8353 17.0395L9.79533 8.99655L17.8353 0.953609C18.0459 0.735584 18.0459 0.389863 17.8353 0.171769C17.6195 -0.0517506 17.2634 -0.0579328 17.0399 0.157963L8.99998 8.20091L0.96008 0.158031C0.742136 -0.0525749 0.396543 -0.0525749 0.17853 0.158031C-0.0449073 0.373927 -0.0510871 0.730157 0.164728 0.953677L8.20463 8.99655L0.164728 17.0394C0.0592583 17.1449 1.40666e-08 17.288 1.40666e-08 17.4372C-6.87243e-05 17.748 0.251796 17.9999 0.562439 18C0.711649 18.0001 0.854747 17.9408 0.96008 17.8351L8.99998 9.7922L17.0399 17.8351C17.1453 17.9409 17.2884 18.0002 17.4377 18C17.5867 17.9999 17.7297 17.9407 17.8352 17.8353C18.0549 17.6155 18.055 17.2592 17.8353 17.0395Z"
              fill="#1D2433"
            />
          </svg>
        </button>

        <article className="flex flex-col gap-9">
          <div>
            <p className="title3 mb-6">SHOP</p>
            <ul className="text-text-disabled [&_a:hover]:text-text-primary flex flex-col gap-4">
              {FIXED_CATEGORIES.map((item) => (
                <li key={item.key}>
                  <Link href={`/products/${item.key}`}>{item.label}</Link>
                </li>
              ))}
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products/${category.categoryName.toLocaleLowerCase()}`}
                  >
                    {category.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="title3 mb-6">COMMUNITY</p>
            <ul className="text-text-disabled [&_a:hover]:text-text-primary flex flex-col gap-4">
              <li>
                <Link href={"/"}>자주 묻는 질문</Link>
              </li>
              <li>
                <Link href={"/notice"}>공지사항</Link>
              </li>
              <li>
                <Link href={"/"}>고객센터</Link>
              </li>
            </ul>
          </div>
        </article>
      </aside>
    </>
  );
}
