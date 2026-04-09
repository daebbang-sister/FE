"use client";
import React, { useEffect } from "react";
import { Portal } from "./Portal";
import ModalContext from "./ModalContext";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, onClose, isOpen }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);
  return (
    <ModalContext.Provider value={{ onClose }}>
      {isOpen && <Portal>{children}</Portal>}
    </ModalContext.Provider>
  );
}
