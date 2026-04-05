"use client";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};

export function Portal({ children }: PortalProps) {
  if (typeof window === "undefined") return null;

  return createPortal(children, document.body);
}
