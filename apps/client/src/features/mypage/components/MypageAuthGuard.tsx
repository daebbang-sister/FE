"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth.store";

export default function MypageAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
      router.replace("/");
    }
  }, [accessToken, router]);
  if (!accessToken) return null;

  return <>{children}</>;
}
