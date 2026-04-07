"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store";
import { refreshToken } from "@/shared/lib/request";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: ProvidersProps) {
  const [isReady, setIsReady] = useState(false);
  const { logout } = useAuthStore();

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
    const initAuth = async () => {
      try {
        await refreshToken();
      } catch {
        logout();
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, []);

  if (!isReady) return null;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
