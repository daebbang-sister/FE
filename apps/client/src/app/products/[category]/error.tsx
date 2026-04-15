"use client";

import { Button } from "@repo/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container-wide flex flex-col items-center justify-center gap-8">
      <h2 className="body1">상품을 불러오는 중 오류가 발생했습니다.</h2>
      <div>
        <Button onClick={() => reset()}>다시 시도</Button>
      </div>
    </section>
  );
}
