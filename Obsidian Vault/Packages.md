- react-datepicker (v7.6.0)
```tsx
/*
	- https://reactdatepicker.com/
	- locale={ko} 적용을 위해서는 선행될 작업이 존재
		- pnpm add date-fns
		- import { ko } from "date-fns/locale";
	- 날짜 범위(Date Range) 관련 옵션은 경우의 수가 많으므로 공식 문서 참고 필요
	- 커스텀 헤더 구현 및 한글화 가능하나 일정상 추후 개발 예정
*/

import React, { useState } from "react";
import { ko } from "date-fns/esm/locale";
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
		// 아이콘 위치 제어 불가능 이슈로 인해 아래와 같이 label와 positioning으로 구현
		<label htmlFor="datePicker">
			<DatePicker 
				// 라벨링 id
				id="datePicker"
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
				locale={ko}
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
				// 캘린더 노출 위치 설정
				popperPlacement="bottom-start"
				// 연도 선택 드롭다운
				showYearDropdown
				// 월 선택 드롭다운  
				showMonthDropdown
			/>
				
			<Image
				src={CalenderIcon}
				alt="달력 아이콘" 
			/>
		</label>
	);
};
```

```tsx
// 데이터피커 리셋
const reset = () => {  
  setStartDate(null);  
  setEndDate(null);  
};
```


single / dual
- [x] selectsRange prop 유무
- [x] endDate prop 유무
- [x] 날짜 선택 함수 분기


***
- react-drag-drop-files (v2.4.0)
```tsx
/*
	- https://github.com/KarimMokhtar/react-drag-drop-files
	- 
*/
```

***
- 면접 질문
	- 이전 회사 퇴직 사유가 무엇인가
	- React 선택 이유가 무엇인가
	- 네이티브 앱 경험이 있는가
	- 플러터 경험이 있는가
	- 관심 있는 개발 언어나 프레임워크가 무엇이고, 그 이유는
	- 백엔드 이해도는 얼마나 되는가
	- 이전 회사의 개발 규모와 작업 방식은 어떻게 되는가
	- 애자일 방식에 대한 경험이 있는가
	- 스트레스 해소 노하우가 있는가
	- 개발자로 전향한 까닭은 무엇인가
	- 개발자로 전향하면서 후회한 적은 없는가
	- 회사에서 이루고 싶은 목표가 무엇인가
	- 주력 언어는 무엇이고, 수준(초급-중급-고급)은 어느 정도 되며, 그 근거는 무엇인가
	- 기술적 선택이 필요할 때, 의사결정이 맡겨진다면 어떻게 할 것인가
	- 동료 직원과 견해가 다를 때, 어떤 방법으로 해결할 것인가
	- 어드민 개발 경험이 있는가

- 추가 팁
	- 간략한 자기 소개를 준비하셔야 합니다.
	- 웹 배포와 앱 배포 경험에 대해 물으면 못 한다라고 해야 합니다.
	- 