import { NumericFormat, PatternFormat } from "react-number-format";

type NumberFormatProps = {
  value: number,
  mode?: "currency" | "date",
  displayType?: "text" | "input"
};

/**
 * @name NumberFormat
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {number} value         - 표시 값
 * @property {string} mode          - 모드 설정(기본값: currency) > 통화(currency) / 날짜(date)
 * @property {string} displayType   - 표시 타입(기본값: text) > 수정 불가 span 렌더링(text) / 수정 가능 input 렌더링(input)
 */
export default function NumberFormat({ value, mode = "currency", displayType = "text" }: NumberFormatProps) {
  return (
    <>
      {/* 통화 모드 */}
      {mode === "currency" && (
        <NumericFormat
          displayType={displayType}
          value={value}
          // 천 단위 콤마 처리
          thousandSeparator=","
          // 접미사 설정
          suffix={" 원"}
          // 스타일링 클래스
          className="_custom-class"
          // 첫 자리 0 입력 허용
          // allowLeadingZeros
          // 음수 입력 차단
          // allowNegative={false}
        />
      )}

      {/* 날짜 모드 */}
      {mode === "date" && (
        <PatternFormat
          displayType={displayType}
          value={value}
          // 형식 패턴 설정
          format="####-##-##"
          // 스타일링 클래스
          className="_custom-class"
        />
      )}
    </>
  );
}
