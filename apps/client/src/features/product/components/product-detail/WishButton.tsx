"use client";

import {
  deleteWishListAPI,
  getWishListCheckAPI,
  postWishListAPI,
} from "@/features/mypage/api";
import { ApiError } from "@/shared/lib/error";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  productId: number;
};

export default function WishButton({ productId }: Props) {
  const router = useRouter();
  const [isWished, setIsWished] = useState<boolean>(false);
  const [WishID, setWishID] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wishIdRef = useRef<number | null>(null);
  const lastConfirmedWishedRef = useRef(false);

  useEffect(() => {
    wishIdRef.current = WishID;
  }, [WishID]);

  useEffect(() => {
    const fetchWish = async () => {
      try {
        const result = await getWishListCheckAPI(productId);
        setWishID(result?.wishId);
        setIsWished(result?.isWished);

        wishIdRef.current = result.wishId;
        lastConfirmedWishedRef.current = result.isWished;
      } catch (e) {
        const status = (e as { status?: string | number })?.status;
        if (status === "401" || status === "403") return;
        console.error(e);
      }
    };
    fetchWish();
  }, [productId]);

  const handleWishClick = () => {
    const nextWished = !isWished;
    setIsWished(nextWished);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(async () => {
      try {
        if (nextWished === lastConfirmedWishedRef.current) {
          return;
        }
        if (nextWished) {
          const res = await postWishListAPI(productId);

          setWishID(res.wishId);
          wishIdRef.current = res.wishId;
          lastConfirmedWishedRef.current = true;
          return;
        }

        const currentWishId = wishIdRef.current;

        if (currentWishId === null) {
          console.error("wishId가 없어 위시리스트를 삭제할 수 없습니다.");
          setIsWished(true);
          lastConfirmedWishedRef.current = true;
          return;
        }

        await deleteWishListAPI([currentWishId]);

        setWishID(null);
        wishIdRef.current = null;
        lastConfirmedWishedRef.current = false;
      } catch (err) {
        if (
          err instanceof ApiError &&
          (err.status === "401" || err.status === "403")
        ) {
          const goLogin = confirm(
            "로그인이 필요한 서비스입니다.\n로그인 화면으로 이동하시겠습니까?"
          );
          if (goLogin) {
            router.push("/login");
          }
          setIsWished(lastConfirmedWishedRef.current);
          return;
        }

        setIsWished(lastConfirmedWishedRef.current);
        console.error(err);
      }
    }, 800);
  };

  return (
    <div
      className={`${isWished ? "bg-neutral-900" : "bg-text-disabled"} group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full lg:mx-3.5`}
      onClick={handleWishClick}
    >
      <svg
        className={`${isWished ? "fill-[#FEC300]" : "fill-white"} `}
        width="18"
        height="17"
        viewBox="0 0 18 17"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.401 0C15.7039 0 17.7527 2.70377 17.7014 5.79861C17.6703 7.66352 16.3812 9.56358 14.8368 11.1979C13.2508 12.8762 11.2149 14.4615 9.34375 15.7083L8.85069 16.0365L8.35764 15.7083C6.49154 14.4645 4.44251 12.8942 2.84896 11.2222C1.29676 9.59362 0 7.68741 0 5.78299C0.000269679 2.68329 2.12438 0 5.41146 0C6.67571 9.90596e-05 7.77449 0.573327 8.85417 1.51389C9.97398 0.560519 11.1498 5.00139e-05 12.401 0ZM1.77778 5.78299C1.77778 6.948 2.62522 8.41199 4.13542 9.99653C5.471 11.3978 7.1912 12.752 8.85069 13.8924C10.5052 12.7522 12.2142 11.3842 13.5451 9.97569C15.0506 8.38251 15.9062 6.91453 15.9253 5.7691C15.9637 3.45466 14.5101 1.77778 12.401 1.77778C11.5801 1.77784 10.6227 2.21013 9.47917 3.35243L8.85069 3.97917L8.22222 3.35243C7.05656 2.18799 6.21267 1.77789 5.41146 1.77778C3.28708 1.77778 1.77803 3.47396 1.77778 5.78299Z" />
      </svg>
    </div>
  );
}
