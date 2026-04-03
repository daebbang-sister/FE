import { useModalContext } from "./ModalContext";

export function Overlay() {
  const { onClose } = useModalContext();
  return <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />;
}
