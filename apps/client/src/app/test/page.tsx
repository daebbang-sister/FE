"use client";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@repo/ui";

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent className="w-full max-w-97.5">
          <ModalHeader title="테스트" />
          <ModalBody>
            <h1>바디</h1>
          </ModalBody>
          <ModalFooter>
            <button onClick={() => setIsOpen(false)}>취소</button>
            <button onClick={() => setIsOpen(false)}>확인</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
