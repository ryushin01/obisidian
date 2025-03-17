import { useEffect, useRef } from "react";
import { DrawerContent, DrawerFooter } from "@components/drawer";
import "@styles/account-layer.css";

type AccountLayerProps = {
  level: number;
  onClose: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

/**
 * @name AccountLayer
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {number} level           - 회원 권한 정의
 */
export default function AccountLayer({ level, onClose, isModalOpen, openModal, closeModal }: AccountLayerProps) {
  const targetRef = useRef<HTMLElement>(null);
  const portal = document.querySelector(`#portal`);

  const handleClickOutside = (event: MouseEvent) => {
    if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleClickOutsideOpenModal = () => {
    if (targetRef.current!.contains(portal as Node)) {
      onClose();
    }
  };

  console.log(isModalOpen);

  useEffect(() => {
    document.addEventListener("click", isModalOpen ? handleClickOutsideOpenModal : handleClickOutside);

    // clean-up effect
    return () => {
      document.removeEventListener("click", handleClickOutsideOpenModal);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="_account-layer-wrapper">
      <section ref={targetRef} className="_account-layer">
        <h1 className="_hidden">비밀번호 변경, 로그아웃, 서비스 이용문의 정보 제공 섹션</h1>
        <DrawerContent
          level={level}
          onClose={onClose}
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
        <DrawerFooter />
      </section>
    </div>
  );
}