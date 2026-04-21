"use client";
import { Button } from "@repo/ui";

export default function PageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container-wide flex h-full flex-col items-center justify-center gap-8">
      <h2 className="body1">
        {error.message || "페이지에 잠시 오류가 발생했습니다."}
      </h2>
      <div>
        <Button onClick={() => reset()}>다시 시도</Button>
      </div>
    </section>
  );
}
