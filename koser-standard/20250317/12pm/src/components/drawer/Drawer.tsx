import { useEffect } from "react";
import ReactDOM from "react-dom";
import { DrawerHeader, DrawerContent, DrawerFooter } from "@components/drawer";
import "@styles/drawer.css";

type DrawerProps = {
  level: number;
  onClose: () => void;
}

/**
 * @name Drawer
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {number} level           - 회원 권한 정의
 * @property {function} onClose       - 드로어 닫기 기능
 */
export default function Drawer({ level, onClose }: DrawerProps) {
  const portal = document.getElementById("portal");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // clean-up effect
    return () => {
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!portal) return null;

  return ReactDOM.createPortal(
    <>
      <div className="_drawer-backdrop" onClick={onClose} />
      <section className="_drawer-container animate-drawer">
        <div className="_drawer-container-wrap">
          <DrawerHeader onClose={onClose} />
          <DrawerContent level={level} />
          <DrawerFooter />
        </div>
      </section>
    </>,
    portal as Element,
  );
}