"use client";
import { useState } from "react";
import { Modal } from "@repo/ui";

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>모달 열기</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content className="w-full max-w-97.5">
          <Modal.Header title="테스트" />
          <Modal.Body>
            <h1>바디</h1>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setIsOpen(false)}>취소</button>
            <button onClick={() => setIsOpen(false)}>확인</button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
