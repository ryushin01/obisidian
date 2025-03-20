// TODO
// [완료] 1. 닫기 기능 개발(닫기 기능 적용 범위: 모달 내부 닫기 버튼, 백드롭 클릭 시 닫기, ESC 키 입력 시 닫기)
// 2. 모달 여닫기 시 내부 컨텐츠 포커싱 및 블러 처리
// 3. 웹 접근성 적용(WAI-ARIA > ARIA-LIVE)

"use client";

import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalHeader } from "@components/modal";
import "@styles/modal.css";

type ModalProps = {
  children: ReactNode;
  title: string;
  onClose: () => void;
  size?:
    "xs" | // 미할당
    "sm" | // 436x202
    "md" | // 640x530
    "lg" | // 700x987
    "xl"   // 1104x800
}

/**
 * @name Modal
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {string} title         - 모달 타이틀
 * @property {function} onClose     - 모달 닫기 기능
 * @property {string} size          - 모달 규격(기본값: xl)
 */
export default function Modal({ children, title, onClose, size = "xl" }: ModalProps) {
  const portal = document.getElementById("portal");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    /**
     * ESC 키 입력 시 Modal을 닫는 함수
     * @param {KeyboardEvent} event   - 키보드 이벤트
     */
    const closedByKeyCode = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closedByKeyCode);

    // clean-up effect
    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", closedByKeyCode);
    };
  }, [onClose]);

  if (!portal) return null;

  return ReactDOM.createPortal(
    <>
      <div className="_modal-backdrop" onClick={onClose} />
      <section className={`_modal-container shadow-modal _${size}`}>
        <div className="_modal-container-wrapper">
          <ModalHeader title={title} onClose={onClose} />
          <div className="_modal-content">
            <div className="_modal-content-inner-wrapper">{children}</div>
          </div>
        </div>
      </section>
    </>,
    portal as Element,
  );
};
