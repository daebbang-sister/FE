"use client";

import { createContext, useContext } from "react";

// 모달에서 공통으로 쓰이는 부분
type ModalContextType = {
  onClose: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal 컴포넌트 안에서 사용해주세요");
  return context;
}

export default ModalContext;
