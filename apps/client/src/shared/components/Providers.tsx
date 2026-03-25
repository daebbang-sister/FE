"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";
import { useRouter } from "next/navigation";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const { login, logout } = useAuthStore();
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60,
          },
        },
      })
  );

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch("/api/proxy/v1/tokens/reissues", {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          logout();
          router.replace("/login");
          return;
        }

        const data = await res.json();
        login(data.data.accessToken);
      } catch {
        logout();
        router.replace("/login");
      }
    };

    refresh();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
