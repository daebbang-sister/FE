"use client";
import React from "react";
import { Portal } from "./Portal";
import ModalContext from "./ModalContext";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, onClose, isOpen }: ModalProps) {
  return (
    <ModalContext.Provider value={{ onClose }}>
      {isOpen && <Portal>{children}</Portal>}
    </ModalContext.Provider>
  );
}
