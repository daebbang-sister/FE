"use client";

import { useLayoutUI } from "@/shared/context/layout-ui.context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const { isSearchOpen, closeSearch } = useLayoutUI();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }
    router.push(`/production?=${encodeURIComponent(search)}`);
  };

  if (!isSearchOpen) return null;

  return (
    <div className="t-25 fixed z-50 flex w-full items-center justify-between bg-neutral-100 px-10 py-6">
      <div className="w-18"></div>
      <form
        onSubmit={handleSubmit}
        className="border-text-primary flex w-97.5 items-center justify-between border-b p-4"
      >
        <input
          className="flex-1 pr-4 focus:outline-none"
          placeholder="검색어 입력"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="cursor-pointer" onClick={handleSubmit}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1949 19.6131C15.8438 19.6131 19.6124 15.8444 19.6124 11.1956C19.6124 6.54668 15.8438 2.77802 11.1949 2.77802C6.54601 2.77802 2.77734 6.54668 2.77734 11.1956C2.77734 15.8444 6.54601 19.6131 11.1949 19.6131Z"
              stroke="#858A96"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.0488 17.4865L20.3488 20.778"
              stroke="#858A96"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </form>
      <button onClick={closeSearch}>
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
    </div>
  );
}
