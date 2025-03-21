import { DrawerHeader, DrawerContent, DrawerFooter } from "@components/drawer";
import "@styles/drawer.css";

type DrawerProps = {
  level: number;
  onClose: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

/**
 * @name Drawer
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {number} level           - 회원 권한 정의
 * @property {function} onClose       - 드로어 닫기 기능
 */
export default function Drawer({
                                 level, onClose, isModalOpen,
                                 openModal,
                                 closeModal,
                               }: DrawerProps) {
  return (
    <>
      <div className="_drawer-backdrop" onClick={onClose} />
      <section className="_drawer-container animate-drawer">
        <div className="_drawer-container-wrap">
          <DrawerHeader onClose={onClose} />
          <DrawerContent
            level={level}
            isModalOpen={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
          <DrawerFooter />
        </div>
      </section>
    </>
  );
}