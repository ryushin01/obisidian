type ModalFooterProps = {
  onClose: () => void;
}

/**
 * @name ModalFooter
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {function} onClose     - 모달 닫기 기능
 */
export default function ModalFooter({ onClose }: ModalFooterProps) {
  return (
    <div className="_modal-footer">
      <button type="button" onClick={onClose}>닫기</button>
    </div>
  );
};
