"use client";

import PageError from "@/shared/components/layout/PageError";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="min-h-[calc(100vh-var(--size-header-h)-var(--size-footer-h))]">
      <PageError error={error} reset={reset} />
    </section>
  );
}
