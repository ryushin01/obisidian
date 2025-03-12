import { Button } from "@components/button";
import "@styles/button-group.css";

type ButtonGroupProps = {
  size: string;
  data: ButtonGroupDataProps[];
  selectedButtonGroup: boolean[];
  handleButtonGroup: (index: number) => void;
};

type ButtonGroupDataProps = {
  id: number;
  content: string;
  disabled: boolean;
}

/**
 * @name ButtonGroup
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description - 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 *              - aria-selected 속성은 단일 또는 다중 선택 상태를 나타냅니다.
 *              - aria-selected 속성 사용 시 button에 role 속성을 추가해야 오류가 발생하지 않습니다.
 * @property {string} size                    - 버튼 크기
 * @property {string} content                 - 버튼 내부 텍스트 및 웹 접근성 처리
 * @property {boolean} disabled               - 버튼 비활성화 여부
 * @property {boolean[]} selectedButtonGroup  - 선택 유무가 저장된 배열
 * @property {function} handleButtonGroup     - 버튼 그룹 제어 함수
 */

export default function ButtonGroup({
                                      size,
                                      data,
                                      selectedButtonGroup,
                                      handleButtonGroup,
                                    }: ButtonGroupProps) {
  return (
    <div className={`_button-group ${size}`}>
      {data.map((button, index) => {
        const { id, content, disabled } = button;

        return (
          <Button
            key={id}
            shape="outline"
            size="sm"
            color="grayscale"
            onClick={() => handleButtonGroup(index)}
            role="tab"
            aria-selected={selectedButtonGroup[index] || false}
            disabled={disabled}
          >
            {content}
          </Button>

          // <button
          //   key={id}
          //   type="button"
          //   onClick={() => handleButtonGroup(index)}
          //   role="tab"
          //   aria-selected={selectedButtonGroup[index] || false}
          //   aria-label={content}
          //   disabled={disabled}
          // >
          //   {content}
          // </button>
        );
      })}
    </div>
  );
}
