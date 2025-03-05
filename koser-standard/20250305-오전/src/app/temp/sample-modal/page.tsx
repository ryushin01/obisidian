"use client";

import { Modal } from "@components/modal";
import { useDisclosure } from "@hooks";

export default function SampleModal() {
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useDisclosure();

  return (
    <div>
      <button type="button" className="absolute top-1/2 left-1/2" onClick={openModal}>모달 열기</button>

      {isModalOpen &&
        <Modal title="등기접수증" onClose={closeModal}>
          <div>모달 내용</div>
        </Modal>
      }
    </div>
  );
}
