"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

type LayoutUIContextType = {
  isSideOpen: boolean;
  isSearchOpen: boolean;
  openSide: () => void;
  closeSide: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  closeAll: () => void;
};

const LayoutUIContext = createContext<LayoutUIContextType | null>(null);

export function LayoutUIProvider({ children }: { children: React.ReactNode }) {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ✅ useCallback으로 함수 안정화
  const openSide = useCallback(() => setIsSideOpen(true), []);
  const closeSide = useCallback(() => setIsSideOpen(false), []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const closeAll = useCallback(() => {
    setIsSideOpen(false);
    setIsSearchOpen(false);
  }, []);

  // ✅ useMemo 필수
  const value = useMemo(
    () => ({
      isSideOpen,
      isSearchOpen,
      openSide,
      closeSide,
      openSearch,
      closeSearch,
      closeAll,
    }),
    [
      isSideOpen,
      isSearchOpen,
      openSide,
      closeSide,
      openSearch,
      closeSearch,
      closeAll,
    ]
  );

  return (
    <LayoutUIContext.Provider value={value}>
      {children}
    </LayoutUIContext.Provider>
  );
}

export function useLayoutUI() {
  const ctx = useContext(LayoutUIContext);
  if (!ctx) throw new Error("LayoutUIProvider 필요");
  return ctx;
}
