- react-datepicker (v7.6.0)
```tsx
/*
	- https://reactdatepicker.com/
	- 아이콘 위치는 제어 불가능
		- label 태그로 묶은 후 positioning으로 달력 아이콘 위치 고정 처리
			<label htmlFor="datePicker">
				<DatePicker id="datePicker />
				<Image />
			</label>
	- locale="ko" 적용을 위해서는 선행될 작업이 존재
		- pnpm add date-fns
		- import { ko } from "date-fns/esm/locale";
	- 날짜 범위(Date Range) 관련 옵션은 경우의 수가 많으므로 공식 문서 참고 필요
	- 커스텀 헤더 구현 및 한글화 가능하나 일정 상 추후 개발 예정
*/

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerSample = () => {
	const [startDate, setStartDate] = useState(new Date());
	const handleCalendarClose = () => console.log("Calendar closed");  
	const handleCalendarOpen = () => console.log("Calendar opened");
	const isWeekday = (date) => {
	    const day = getDay(date);    
	    return day !== 0 && day !== 6;  
	};
	
  return (
	  // 아이콘 위치 제어 불가능 이슈로 인해 아래와 같이 label 
	  <label htmlFor="datePicker">
<DatePicker 
// 현재 선택된 날짜
selected={startDate} 
// 날짜 변경 세터 함수
onChange={(date) => setStartDate(date)} 
// 아이콘 노출
showIcon
// 커스텀 아이콘 사용
icon={CalendarIcon}
// 아이콘 클릭 시 캘린더 오픈 제어
toggleCalendarOnIconClick
// 캘린더 열림 시 콜백 
onCalendarOpen={handleCalendarOpen}
// 캘린더 닫힘 시 콜백
onCalendarClose={handleCalendarClose}
// 스크롤 시 캘린더 닫힘
closeOnScroll={true}
// 연월일 포맷 정의
dateFormat="yyyy/MM/dd"
// 캘린더 내부 연월일 포맷 정의
dateFormatCalendar="yyyy년 MM월"
// 비활성화 처리
disabled
// 날짜 선택 후 캘린더 닫힘 제어 
shouldCloseOnSelect={false}
// 선택 불가 날짜 설정
excludeDates={[new Date(), subDays(new Date(), 1)]}
// 가능한 날짜만 선택 가능
filterDate={isWeekday}
// 한국 시간 적용
locale="ko"
// 오늘 날짜 기준으로 선택 가능한 이전 날짜 정의
minDate={subDays(new Date(), 5)}
// 오늘 날짜 기준으로 선택 가능한 이후 날짜 정의
maxDate={addDays(new Date(), 3)}
// 가이드 문구
placeholderText="날짜를 선택하세요."
// 클릭 시 오늘 날짜로 이동 제어
todayButton="오늘"
// 캘린더 열림 시 화살표 표시 제거
showPopperArrow={false}
	/>
	
	<Image
		src={CalenderIcon}
		alt="달력 아이콘" 
	/>
</label>
  );
};
```
