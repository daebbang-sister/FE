"use client";

import PageError from "@/shared/components/layout/PageError";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <PageError error={error} reset={reset} />;
}
