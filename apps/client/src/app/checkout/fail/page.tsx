"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";

export default function CheckoutFailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get("message") ?? "결제에 실패했습니다.";

  return (
    <div className="page-y container flex flex-col items-center justify-center">
      <h2 className="title3">결제 실패</h2>
      <p className="mt-3 mb-9">{message}</p>
      <div className="flex gap-2.5">
        <Button
          variant="stroke"
          onClick={() => router.push("/")}
          className="w-38.75"
        >
          홈으로
        </Button>
        <Button
          variant="black"
          onClick={() => router.back()}
          className="w-38.75"
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
}
