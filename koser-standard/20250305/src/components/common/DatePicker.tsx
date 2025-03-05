import { CalendarIcon } from "@icons";
import { ko } from "date-fns/locale";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@styles/datepicker.css";

type DatePickerProps = {
  startDate: Date | null;
  endDate?: Date | null;
  handleDatePicker?: (date: Date | null) => void;
  handleDatesPicker?: (dates: [Date | null, Date | null]) => void;
  isMultiComponent?: boolean;
};

/**
 * @name DatePicker
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {Date} startDate               - 선택된 날짜(시작일)
 * @property {Date} endDate                 - 선택된 날짜(마감일)
 * @property {function} handleDatePicker    - 날짜 선택 함수(단일)
 * @property {function} handleDatesPicker   - 날짜 선택 함수(복합)
 * @property {boolean} isMultiComponent     - 단일 또는 복합 컴포넌트 구분(복합 컴포넌트는 단일 컴포넌트와 다르게 selectsRange, endDate props가 추가되며, 날짜 선택 함수가 다릅니다.
 */
export default function DatePicker({
                                     startDate, endDate, handleDatePicker, handleDatesPicker,
                                     isMultiComponent = false,
                                   }: DatePickerProps) {
  return (
    <>
      <div className="_datepicker">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <ReactDatePicker
          // 한국어 설정
          locale={ko}
          // 연월일 포맷 정의
          dateFormat="yyyy.MM.dd"
          // 달력 내부 연월일 포맷 정의
          dateFormatCalendar="yyyy년 MM월"
          // 현재 선택한 날짜 표시 기준
          selected={startDate}
          // 시작일 정의
          startDate={startDate}
          // 달력 열림 시 기본 화살표 표시 제거
          showPopperArrow={false}
          // 달력 노출 위치 설정
          popperPlacement="bottom-start"
          // 기본 가이드 문구
          placeholderText="날짜 선택"
          // 아이콘 노출
          showIcon
          // 커스텀 아이콘 사용
          icon={CalendarIcon}
          // 아이콘 클릭 시 달력 열림 제어
          toggleCalendarOnIconClick
          // 날짜 변경 함수
          onChange={isMultiComponent ? handleDatesPicker : handleDatePicker}
          // 마감일 정의
          {...(isMultiComponent && { endDate: endDate })}
          // 날짜 선택 범위
          {...(isMultiComponent && { selectsRange: true })}
        />
      </div>
    </>
  );
}
