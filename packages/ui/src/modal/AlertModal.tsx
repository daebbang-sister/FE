import { Button } from "../button/Button";
import { Modal } from "./Modal";
import { Body as ModalBody } from "./Body";
import { Content as ModalContent } from "./Content";
import { Footer as ModalFooter } from "./Footer";
import { Header as ModalHeader } from "./Header";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="w-97.5">
        <ModalHeader title={title} />
        <ModalBody>
          <p className="body1-loose">{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="gray" onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
