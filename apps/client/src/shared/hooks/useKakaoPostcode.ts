"use client";

import { PostcodeData } from "@repo/types";
import { useCallback } from "react";

/** window.kakao 타입 안전 정의 */
declare global {
  interface Window {
    kakao?: {
      Postcode: new (options: { oncomplete: (data: PostcodeData) => void }) => {
        open: () => void;
      };
    };
  }
}

export function useKakaoPostcode() {
  /** 스크립트 로드 */
  const loadScript = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (typeof window !== "undefined" && window.kakao?.Postcode) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => resolve();

      document.body.appendChild(script);
    });
  }, []);

  /** 팝업 열기 */
  const openPostcode = useCallback(
    async (onComplete: (data: PostcodeData) => void) => {
      await loadScript();

      if (!window.kakao?.Postcode) {
        console.error("Kakao Postcode not loaded");
        return;
      }

      new window.kakao.Postcode({
        oncomplete: onComplete,
      }).open();
    },
    [loadScript]
  );

  return { openPostcode };
}
