"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [isReady, setIsReady] = useState(false);
  const { login, logout } = useAuthStore();

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
          return;
        }

        const data = await res.json();
        login(data.data.accessToken);
      } catch {
        logout();
      } finally {
        setIsReady(true);
      }
    };

    refresh();
  }, []);

  if (!isReady) return null;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
