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
                                     startDate,
                                     endDate,
                                     handleDatePicker,
                                     handleDatesPicker,
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
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Property 1=20, Property 2=calendar-minus-01">
                <path id="Icon"
                      d="M7.5 12.4998H12.5M17.5 6.6665H2.5M13.3333 1.6665V4.1665M6.66667 1.6665V4.1665M6.5 18.3332H13.5C14.9001 18.3332 15.6002 18.3332 16.135 18.0607C16.6054 17.821 16.9878 17.4386 17.2275 16.9681C17.5 16.4334 17.5 15.7333 17.5 14.3332V7.33317C17.5 5.93304 17.5 5.23297 17.2275 4.69819C16.9878 4.22779 16.6054 3.84534 16.135 3.60565C15.6002 3.33317 14.9001 3.33317 13.5 3.33317H6.5C5.09987 3.33317 4.3998 3.33317 3.86502 3.60565C3.39462 3.84534 3.01217 4.22779 2.77248 4.69819C2.5 5.23297 2.5 5.93304 2.5 7.33317V14.3332C2.5 15.7333 2.5 16.4334 2.77248 16.9681C3.01217 17.4386 3.39462 17.821 3.86502 18.0607C4.3998 18.3332 5.09987 18.3332 6.5 18.3332Z"
                      stroke="#505050" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </g>
            </svg>
          }
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
