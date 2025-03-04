# 신협 전자등기 프로젝트

> 개발 후 반드시 lint 실행을 통해 `No ESLint warnings or errors` 문구 출력이 확인된 상태에서 소스 코드를 저장소로 올립니다.
***
## 시작 가이드
### 요구 사항
- Node.js v22.13.0 (LTS)
- nvm v0.40.1 이상
- pnpm v9 이상
### 설치 및 실행
```bash
// nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

// Node.js v22.13.0 (LTS)
nvm install 22

// pnpm
corepack enable pnpm

// package
pnpm install

// run
pnpm run dev
```
***
## 프로젝트 정보
### 기술 스택
![My Skills](https://skillicons.dev/icons?i=react,nextjs,tailwind,js,ts,pnpm,docker)
### 프로젝트 구조
```
📦 project
├── 🗂️ public
│ ├── 🗂️ fonts                // 웹 폰트
│ ├── 🗂️ icons                // svg 아이콘
│ └── 🗂️ images               // 이미지 파일
│ └── 🏙️ logo.svg             // 파비콘
│
├── 🗂️ src
│ ├── 🗂️ app                  // 라우팅 관련 파일
│ │   ├── 🗂️ dashboard        // 대시보드
│ │   ├── 🗂️ request-list     // 의뢰목록
│ │   ├── 🗂️ status-inquiry   // 현황조회
│ │   ├── 🗂️ notice           // 공지사항
│ │   └── 🗂️ temp             // 임시 파일 모음(패키지 적용 샘플 페이지 등)
│ │
│ ├── 🗂️ components           // 공통 컴포넌트
│ ├── 🗂️ constants            // 공통 상수값
│ ├── 🗂️ hooks                // 공통 커스텀 훅
│ ├── 🗂️ libs                 // 외부 라이브러리
│ ├── 🗂️ services             // 각종 API 요청
│ ├── 🗂️ stores               // 전역 상태 관리 대상인 state
│ ├── 🗂️ styles               // 전역 및 모듈화된 스타일 파일
│ ├── 🗂️ types                // 각종 타입스크립트 타입 정의
│ └── 🗂️ utils                // 공통 유틸리티 함수
```
### 주요 패키지
<img src="https://img.shields.io/badge/Axios-5a29e4?style=flat&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/dateFns-770c56?style=flat&logo=dateFns&logoColor=white"/>
<img src="https://img.shields.io/badge/ESLint-4b32c3?style=flat&logo=ESLint&logoColor=white"/>
<img src="https://img.shields.io/badge/Prettier-f7b93e?style=flat&logo=Prettier&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-ff4154?style=flat&logo=ReactQuery&logoColor=white"/>
<img src="https://img.shields.io/badge/Swiper-6332f6?style=flat&logo=Swiper&logoColor=white"/>

***
## 부가 설정
### ![My Skills](https://skillicons.dev/icons?i=idea)
> ***ESLint***
> 
> IntelliJ - 설정 - 언어 및 프레임워크 - JavaScript - 코드 품질 도구 - ESLint - `수동 ESLint 구성` 체크 활성화 - ESLint 패키지 경로 지정 - 구성 파일 경로 지정 - `저장 시 eslint --fix 실행` 체크 활성화

> ***Prettier***
> 
> IntelliJ - 설정 - 플러그인 - Prettier 설치 - 언어 및 프레임워크 - JavaScript - Prettier - `수동 Prettier 구성` 체크 활성화 - Prettier 패키지 경로 지정 - `'코드 서식 다시 지정' 액션 시 실행` 체크 활성화 - `저장 시 실행` 체크 활성화

> ***파일 저장 시 자동 코드 정렬 기능 활성화***
> 
> IntelliJ - 설정 - 도구 - 저장 시 액션 - `코드 서식 다시 지정` 체크 활성화

> ***주석 태그 활용 및 커밋 옵션 제외 처리***
> 
> IntelliJ - 기본 설정 - 설정 - 에디터 - 할일 목록 - 추가 - `NOTE` 패턴 입력 - `색 구성표 TODO 디폴트 색상 사용` 체크 비활성화 - 전경 헥스코드 영역 클릭 - `00a8ff` 헥스 코드 입력 후 선택 - 확인 - 적용 - 확인 
> 
> IntelliJ - 커밋 탭 - 커밋 및 푸시 버튼 우측의 커밋 옵션 표시 - `TODO 확인` 체크 비활성화 
### ![My Skills](https://skillicons.dev/icons?i=vscode)
> ***ESLint***
> 
> Visual Studio Code - 기본 설정 - 확장 - ESLint 검색 후 설치

> ***Prettier***
> 
> Visual Studio Code - 기본 설정 - 확장 - Prettier 검색 후 설치 - 기본 설정 - 설정 - `default formatter` 검색 - 텍스트 편집기 - 셀렉터에서 `Prettier - Code formatter` 선택

> ***파일 저장 시 자동 코드 정렬 기능 활성화***
> 
> Visual Studio Code - 기본 설정 - 설정 - `format on save` 검색 - `Editor: Format On Save` 체크 활성화
