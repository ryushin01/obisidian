type ModalHeaderProps = {
  title: string;
  onClose: () => void;
}

/**
 * @name ModalHeader
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {string} title         - 모달 컴포넌트 타이틀
 * @property {function} onClose     - 모달 닫기 기능
 */
export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="_modal-header">
      <h1>{title}</h1>
      <button type="button" onClick={onClose}>닫기</button>
    </div>
  );
};
