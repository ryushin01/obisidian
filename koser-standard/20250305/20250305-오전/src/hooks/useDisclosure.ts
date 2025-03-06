import { useState } from "react";

/**
 * @name useDisclosure
 * @version 1.0.0
 * @author 불명 <unknown@bankle.co.kr>
 * @description 차세대 KOS App 프로젝트에서 추출한 커스텀 훅
 */
export default function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
