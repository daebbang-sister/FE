"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  value: string;
};

export default function SearchInput({ value }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState<string>(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }
    router.push(`/products/search?keyword=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-97.5 items-center justify-between border-b border-neutral-300 p-4"
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
    </div>
  );
}
