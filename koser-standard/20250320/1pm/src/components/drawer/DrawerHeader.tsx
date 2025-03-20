import Image from "next/image";
import { CancelIcon } from "@icons24";
import { IconButton } from "@components/button";

type DrawerHeaderProps = {
  onClose: () => void;
}

/**
 * @name DrawerHeader
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {function} onClose     - 드로어 닫기 기능
 */
export default function DrawerHeader({ onClose }: DrawerHeaderProps) {
  return (
    <div className="_drawer-header">
      <h1 className="_hidden">비밀번호 변경, 로그아웃, 서비스 이용문의 정보 제공 섹션</h1>
      <IconButton
        size="md"
        onClick={onClose}
        icon={
          <Image
            src={CancelIcon}
            alt="드로어 닫기 아이콘"
            width={24}
            height={24}
          />
        }
      />
    </div>
  );
};
