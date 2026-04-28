"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { refreshToken } from "@/shared/lib/refreshToken";

export default function KakaoLoginPage() {
  const router = useRouter();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        await refreshToken();
        alert("카카오 로그인 되었습니다.");
        router.replace("/");
      } catch (error) {
        console.error(error);
        alert("카카오 로그인에 실패했습니다.");
        router.replace("/login");
      }
    };
    kakaoLogin();
  }, [router]);

  return null;
}
