"use client";
import React from "react";
import { Portal } from "./Portal";
import ModalContext from "./ModalContext";
import { Overlay } from "./Overlay";
import { Content } from "./Content";
import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";

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

Modal.Overlay = Overlay;
Modal.Content = Content;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
