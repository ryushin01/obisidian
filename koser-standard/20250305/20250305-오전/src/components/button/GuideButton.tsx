/*
  NOTE: 이 파일은 컴포넌트 개발 가이드를 위해 작성된 샘플 컴포넌트 파일입니다. 컴포넌트 개발 시 참고만 하시고 실제 개발 단계에서 사용하지 않도록 합니다.
*/

type GuideButtonProps = {
  type?: "button" | "submit" | "reset";
  shape: "solid" | "outline";
  color: "neutral" | "primary" | "secondary";
  size: "medium" | "small" | "large";
  onClick: () => void;
  children: string;
  disabled?: boolean;
};

/**
 * @name GuideButton
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {string} type        - 버튼 타입을 정의합니다.
 * @property {string} shape       - 버튼 형태를 정의합니다.
 * @property {string} color       - 버튼 색상을 정의합니다.
 * @property {string} size        - 버튼 크기를 정의합니다.
 * @property {string} children    - 버튼 내부 텍스트와 웹 접근성 처리에 사용합니다.
 * @property {function} onClick   - 버튼 클릭 시 실행할 함수를 위해 미리 정의합니다.
 * @property {boolean} disabled   - 버튼의 비활성화 상태를 정의합니다.
 */
export default function GuideButton({
                                      type = "button",
                                      shape,
                                      color,
                                      size,
                                      onClick,
                                      children,
                                      disabled,
                                    }: GuideButtonProps) {
  return (
    <button
      type={type}
      className={`${shape} ${color} ${size}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={children}
    >
      <span>
        {children}
      </span>
    </button>
  );
}
