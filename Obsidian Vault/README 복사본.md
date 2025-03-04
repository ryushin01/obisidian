# 목차
  [1. 프로젝트 폴더 구조](#프로젝트-폴더-구조)
  [2. 네이밍 컨벤션](#네이밍-컨벤션)
  [3. Next.js import 순서](#Next.js-import-순서)
  [4. CSS 속성 선언 순서](#CSS-속성-선언-순서)
  [5.기타](#기타)

# 프로젝트 폴더 구조
```
📦 project
├── public
│ ├── fonts        // 웹 폰트
│ ├── icons        // svg 아이콘
│ └── images       // 이미지 파일
│
├── src
│ ├── app          // 라우팅 관련 파일
│ ├── components   // 공통 컴포넌트
│ ├── constants    // 공통 상수값
│ ├── hooks        // 공통 커스텀 훅
│ ├── libs         // 외부 라이브러리
│ ├── services     // 각종 API 요청
│ ├── stores       // 전역 상태 관리 대상인 state
│ ├── styles       // 전역 및 모듈화된 스타일 파일 
│ ├── types        // 각종 타입스크립트 타입 정의
│ └── utils        // 공통 유틸리티 함수
```

# 네이밍 컨벤션
```js
// 변수명과 함수명은 명확해야 합니다. 예를 들어, 함수의 경우는 함수명만 보고도 어떤 기능을 하는 함수인지 알 수 있어야 합니다. 변수명과 함수명은 둘 모두 camelCase를 따릅니다.
const counter = 0;
const abcdefghijklm = () => {...}; // bad
const selectedIndex = () => {...}; // good

// 상수는 SCREAMING_SNAKE_CASE를 따릅니다. 더불어 매직 넘버(하드 코딩된 일정한 값을 의미하는 숫자나 문자열)는 최대한 상수화합니다.
const ERROR_MESSAGE = 'Error...';

// 변수나 함수명에 고정적인 접두사 또는 단어를 사용합니다. boolean의 경우는 is, has를 사용합니다.
const isReady;
const hasError = () => {...}

// 특정 값을 반환하는 함수는 get을 사용합니다.
const getProductData = () => {...}

// React 상태 변경과 스토어 상태 변경과 관련된 함수는 set을 사용합니다.
const setAccessToken = () => {...}

// 서버로부터 데이터를 가져오는 함수의 경우는 fetch를 사용합니다.
const fetchBankData = () => {...}

// 데이터를 특정 타입으로 변환하는 함수는 to를 중간에 넣도록 합니다.
const numberToString = () => {...}

// 이벤트 및 이벤트 핸들러의 경우는 handler을 사용합니다.
const handleClick = () => {...}

// React 커스텀 훅의 경우는 use를 사용합니다.
const useForm = () => {...}

// 일반적으로 함수명을 지을 때, 쌍으로 사용되는 단어를 활용합니다.
add-remove, begin-end, create-destroy, enable-disable, first-last, lock-unlock, open-close, show-hide, ...

// 배열을 다룰 때에는 List 접미사를, 단일 데이터를 다룰 때는 단수형을 사용합니다.
const [movieList, setMovieList] = useState([]);
return (
	{movieList.map((movie) => (
		....
	))}
)

// React Function Components는 PascalCase를 따릅니다.
const StickyHeader = ( props ) => {
	return (
		...
	)
}

// 두문자어와 이니셜은 모두 대문자로 통일합니다.
import SMSContainer from '...';
const HTTPRequests = [...];

// Sass(SCSS)는 kebab-case를 따릅니다. 단, mix과 함수의 경우는 Javascript의 메서드와 유사하므로 camelCase를 따릅니다.
$primary-color: #000;

.sticky-header {
	position: sticky;
	...
}

@mixin flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Typescript의 interface와 type 앞에 I와 T는 쓰지 않습니다. 즉, 헝가리안 표기법을 사용하지 않습니다. 둘 모두 PascalCase를 따릅니다. 또한 객체일 경우에 interface를 사용하며, 그렇지 않다면 type을 사용합니다.
interface AccountData {...}
type LoginType = {...}
```

# Next.js import 순서와 절대 경로 처리
```tsx
// import 순서는 아래 예시를 참고합니다.
import React, { useState } from 'react';      // 1. React
import { useRouter } from 'next/navigation'   // 2. Next.js
import { ResetIcon } from '@icons';           // 3. 아이콘
import { BankTypeCode } from '@constants';    // 4. 상수
import { Button } from '@components';         // 5. 컴포넌트
import { useFetchApi } from '@hooks';         // 6. 커스텀 훅
import { stringToDate } from '@utils';        // 7. 유틸리티
import { customSwiper } from '@libs';         // 8. 외부 라이브러리 관련
import { authAtom } from '@stores';           // 9. 전역 상태 관리 관련
import { center } from "@styles/common.css";  // 10. 스타일 파일

// tsconfig.json 등에서 alias 지정을 통해 절대 경로로 import하는 것을 원칙으로 합니다.
"paths": {
	...
	"@icons": ["public/icon"],
	"@constants": ["src/constants"],  
	"@components": ["src/components"],
	...
}
```

# CSS 속성 선언 순서
```css
/* 
  1. CSS Framework(Tailwind CSS, UnoCSS, etc), CSS in JS(styled-components, Emotion, vanilla-extract, etc), pre-processor(Sass, Less, etc) 등 다양한 스타일링 방법에서 동일하게 적용하는 규칙입니다.
  2. 전반적으로 블록 엘리먼트부터 인라인 엘리먼트까지 순서대로 기입하는 것을 원칙으로 합니다. 
  3. 논리적인 순서로 기입합니다. 예를 들어, z-index는 position이 먼저 선언되어야 사용할 수 있는 속성이므로, position을 먼저 선언합니다.
  4. border의 경우는 Box Model 범주에 속하나 색상을 함께 선언하는 경우가 대부분이므로 따로 분류합니다.
  5. 예시에 없는 속성의 경우는 개발자 간의 협의를 통해 순서를 정하도록 합니다.
*/ 
1. content
2. display / visibility
3. Flex, Grid(justify-content, align-items, grid-template-columns, etc)
4. position / transform
5. Direction(top, right, bottom, left, translate)
6. z-index
7. overflow
8. Box Model(width, height, padding, margin)
9. border
10. background
11. Text(font-size, line-height, font-weight, etc)
12. Etc(animation, transition, opacity, etc)
```

# 기타
```tsx
// 변수에 var 키워드는 사용하지 않습니다. 값이 변하는 경우에는 let, 그렇지 않으면 const를 사용합니다.
var test   // bad
const test // good
let test   // good

// 변수와 조합해 문자열을 생성하는 경우는 템플릿 리터럴을 사용합니다.
const message = `hello, ${name}!`;    // good
const message = 'hello ' + name + "!" // bad 

// 배열 복사 시 반복문 사용을 지양하고, 스프레드 오퍼레이터를 지향합니다.
const targetArr = [1, 2, 3];
const copyArr = [...targetArr];

// 구조 분해 할당(Destructing)을 적극 사용합니다.
const getFullName = (user) => {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// 함수 내 반환은 1회만 합니다. 단, 예외로 빠져 나가는 경우는 제외합니다. 또한 가독성 이슈로 인해 return 문 전에 한 줄 띄웁니다.
const sampleFunction = (isValid) => {
	...
	// 예외 처리로 Early Return
	if (!isValid) {
		return;
	}
	...
	
	return sampleValue;
}

// 데이터형 확인 시 삼중 등호 연산자(===, !==)만 사용합니다.
const sampleNumber = 777;
// bad
if (sampleNumber != '777') {...}
// good
if (sampleNumber === 777) {...}

// 조건문은 한 줄만 작성하더라도 가독성을 위해 괄호를 생략하지 않습니다.
if (true) {
	console.log('hello');
}

// 간단한 조건문의 경우 삼항 연산자를 사용합니다.
condition ? 'a' : 'b';

// 서버 데이터가 undefined일 경우를 예상하여 옵셔널 체이닝을 사용합니다.
const { data: wishList } = useWishList();
<div>{wishList?.count}</div>

// jsx, tsx에서 태그 안에 children이 없는 경우에는 Self-closing을 사용합니다.
<Header isSticky="yes" />

// CSS shorthand 사용을 지향합니다.
// bad
.target {
	margin-top: 10px;
	margin-right: 20px;
	margin-bottom: 10px;
	margin-left: 20px;
	border-width: 1px;
	border-style: solid;
	border-color: #ff0;
}
// good
.target {
	margin: 10px 20px;
	border: 1px solid #ff0;
}
```