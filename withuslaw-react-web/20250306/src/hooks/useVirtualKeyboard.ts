import { useRef } from "react";

export default function useVirtualKeyboard() {
  const expandedRef = useRef<HTMLDivElement>(null);
  const screenHeight = screen.height;
  const textFields = document.querySelectorAll("input, textarea");

  textFields.forEach((el) => {
    el.addEventListener("focus", () => {
      /**
       * 0.4: 뷰포트 대비 가상 키보드 높이를 퍼센트로 바꾸기 위한 값
       * ex: iPhone SE(42%), iPhone 15 Pro(43%) 등
       */
      expandedRef.current!.style.paddingBottom = `${Math.ceil(
        screenHeight * 0.4
      )}px`;
    });
    el.addEventListener("blur", () => {
      expandedRef.current!.style.paddingBottom = "0px";
    });
  });

  return { expandedRef };
}
