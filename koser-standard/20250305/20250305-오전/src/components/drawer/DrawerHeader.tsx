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
      <button type="button" onClick={onClose}>닫기</button>
    </div>
  );
};
