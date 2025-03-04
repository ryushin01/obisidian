# (주)뱅크클리어 프로젝트 프론트엔드 개介발 가이드

> 프로젝트 구축을 위한 초기 설정 등의 내용이 포함된 문서입니다. 작성 날짜 기준으로 아직 초고이므로, 추후 추가되거나 변경될 여지가 있습니다. 또한 아래 가이드에 맞는 순서대로 세팅을 진행하셔야 오류 발생률을 줄일 수 있습니다.

***
## 버전 관리

| 버전    | 날짜        | 작성자 | 내용    |
| ----- | --------- | --- | ----- |
| 1.0.0 | 2025.1.9. | 류창선 | 초고 작성 |
***

## 설치 순서 요약본

***
## 세팅 체크 리스트

***
## nvm(Node Version Manager), Node.js, pnpm 설치
```bash
// 1. nvm 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

// 2. Node.js v22.13.0 (LTS) 설치
nvm install 22.13.0

// 3. Node.js 버전 및 현재 nvm의 기본값으로 지정된 Node.js 버전 확인
node -v     # v22.13.0
nvm current # v22.13.0

// 4. pnpm 설치
corepack enable pnpm

// 5. pnpm 버전 확인
pnpm -v
```

## nvm 사용법
```bash
// node 목록 확인
nvm ls

// node 설치
nvm install 17.6.0

// node 설치: 앞에 메이저 버전 번호만 입력하면 해당 버전의 마지막 버전 설치
nvm install 17 // 17.9.1 설치

// 특정 node 버전 사용
nvm use 16.0.0

// 기본값으로 사용할 node 버전 설정
nvm alias default v17.0.0
```
## 프로젝트 초기 세팅
```bash
// 1. Node.js 버전 변경
nvm use 22

// 2. Next.js 설치(TypeScript): 
npx create-next-app@latest --ts

// 3. 초기 설정
// 프로젝트 이름을 정합니다.
What is your project named?                                       project-name

// 정적 도구 분석 툴인 ESLint 사용 유무를 설정합니다.
Would you like to use ESLint?                                     Yes

// CSS Framework인 Tailwind CSS 사용 유무를 설정합니다.
Would you like to use Tailwind CSS?                               Yes

// src 디렉토리를 생성해 public 디렉토리로 분리할지 설정합니다.
Would you like to use `src/` directory?                           Yes

// page routing 대신 app routing을 쓸 것인지 설정합니다.
Would you like to use App Router? (recommended)                   Yes

// 점진적 번들러인 TurboPack을 사용해 보다 빠른 로컬 개발을 할 것인지 설정합니다. 문서 작성일 기준으로 베타 버전이므로 No를 선택합니다.
Would you like to use Turbopack for `next dev`?                   No

// import 경로를 커스터마이징하여 절대 경로로 쓸 것인지 설정합니다.
Would you like to use customize the default import alias (@/*)?   Yes

// 기본으로 @/*를 커스터마이징된 경로로 사용할 것인지 설정합니다.
What import alias would you like configured?                      @/*
```

## 기본 package 설치
```bash
// 1. Node.js 버전 변경
nvm use 22

// 2. 기본 package 설치 
pnpm install
```

## ~~Sass 설치~~ (Tailwind CSS 사용으로 인한 미설치)
```bash
pnpm add --save-dev sass
```

## 추가 package 설치(프로젝트 공통)
```bash
// Axios: HTTP 비동기 통신 라이브러리
pnpm add axios

// env-cmd: 각 스크립트별로 설정된 env의 우선순위 무시
pnpm add env-cmd

// jotai: 전역 상태 관리
pnpm add jotai

// Prettier: 코드 포맷터
pnpm add --save-dev eslint-config-prettier

// react-datepicker
pnpm add react-datepicker

// react-error-boundary: 서버 데이터 연동 시 로딩 및 에러 처리
pnpm add react-error-boundary
```

## package.json 설정
```json
// package.json
{
	"name": "project-name",
	// version 관리는 Major.Minor.Patch 기준
	"version": "0.0.0",
	"scripts": {	
		// pnpm run dev: https 환경의 개발 모드에서 실행 
		"dev": "next dev --experimental-https",
		// pnpm run local: https 환경의 로컬 모드에서 실행하면서 .env.local 파일을 참고
		"local": "env-cmd -f .env.local next dev --experimental-https",
		// pnpm run build: 프로덕션 사용을 위한 애플리케이션 빌드
		"build:dev": "rm -rf ./next && env-cmd -f .env.development next build",  
		"build:local": "rm -rf ./next && env-cmd -f .env.local next build",
		"build:prod": "env-cmd -f .env.production next build",
		// pnpm run lint: ESLint 실행
		"lint": "next lint",
	},
	// 배포 시 포함되는 라이브러리
	"dependencies": {...},
	// 배포 시 미포함되는 라이브러리: pnpm package 설치 시 --save-dev 옵션 필요
	"devDependencies": {...}
}
```

## next.config.ts 설정
```js
// next.config.ts
import type { NextConfig } from "next";  
  
const nextConfig: NextConfig = {  
	// 프로덕션 배포에 필요한 파일만 복사하는 standalone 폴더 자동 생성 기능 활성화
	output: "standalone",
	// 어플리케이션 내에서 문제가 일어날 수 있는 부분에 대한 경고를 알려주는 기능 활성화
	reactStrictMode: true,
	// 프로덕션 빌드 시 ESLint 오류가 있어도 강제 성공 기능 활성화
	eslint: {  
		ignoreDuringBuilds: true,  
	},
};  
  
export default nextConfig;
```

## tsconfig.json 설정
```json
// tsconfig.json
{  
	"compilerOptions": {
		// 최종적으로 컴파일하는 ECMAScript 버전 설정
		"target": "ES2017",
		// 컴파일 과정에서 사용할 라이브러리 파일 설정
		"lib": ["dom", "dom.iterable", "esnext"],
		// TypeScript 컴파일 작업 시 JavaScript 파일도 포함할 수 있는지 지정하는 옵션
		"allowJs": true,
		// 외부 라이브러리 모듈의 .d.ts 파일의 타입 검사를 tsc에게 생략 허가
		"skipLibCheck": true,
		// 모든 엄격한 유형 검사 옵션 활성화
		"strict": true,
		// .js 파일 생성 여부 설정(true 시 미생성)
		"noEmit": true,
		// commonJS 스타일로 export 구문을 사용하여 모듈 내보내기 가능(import * as)
		"esModuleInterop": true,
		// 모듈 시스템 지정(import 문법 설정)
		"module": "esnext",
		// Webpack, ESBuild, SWC 등과 같은 번들러를 통해 번들로 제공하기 때문에 규칙을 완화하도록 설정(모듈 해석 최적화)
		"moduleResolution": "bundler",
		// .json 파일인 모듈의 import 허용 설정
		"resolveJsonModule": true,
		// 프로젝트 내에 모든 소스 코드 파일을 모듈로 만드는 설정
		"isolatedModules": true,
		// JavaScript 파일에서 내보내는 방식을 제어하는 옵션(preserve: jsx를 변경하지 않고 내보내는 값)
		"jsx": "preserve",
		// 증분 컴파일 활성화(수정된 파일만 컴파일)
		"incremental": true,
		"plugins": [  
			{  
				"name": "next"  
			}  
		],
		// import 구문이 모듈 해석 시 기준이 되는 경로 지정
		"baseUrl": ".",
		// baseUrl 기준으로 상대 위치로 가져오기를 매핑하는 설정(alias 설정)
		"paths": {
			"@fonts": ["public/fonts"],
			"@icons": ["public/icons"],
			"@images": ["public/images"],
			"@/*": ["src/*"],
			"@app": ["src/app"],  
			"@app/*": ["src/app/*"],
			"@constants": ["src/constants"],  
			"@constants/*": ["src/constants/*"],
			"@components": ["src/components"],  
			"@components/*": ["src/components/*"],  
			"@hooks": ["src/hooks"],
			"@hooks/*": ["src/hooks/*"],
			"@utils": ["src/utils"],  
			"@utils/*": ["src/utils/*"],
			"@libs": ["src/libs"],  
			"@libs/*": ["src/libs/*"],
			"@services": ["src/services"],
			"@services/*": ["src/services/*"],
			"@stores": ["src/stores"],
			"@stores/*": ["src/stores/*"],
			"@styles": ["src/styles"],  
			"@styles/*": ["src/styles/*"],
		},
	},
	// 컴파일할 파일들을 지정하는 속성
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
	// 컴파일 대상에서 제외할 파일들을 지정하는 속성
	"exclude": ["node_modules"]
}
```

## env 공통 설정
```
// .env                모든 환경에서 공통적으로 적용되는 env
// .env.developmenet   개발 환경에서 적용되는 env
// .env.production     배포 환경에서 적용되는 env
// .env.local          로컬 환경에서 적용되는 env

// NEXT_PUBLIC_ 접두사를 사용해 환경 변수명 지정
NEXT_PUBLIC_AUTH_URI="value"
NEXT_PUBLIC_WOORI_URI="value"
```

## env 개별 설정
```
// .env.local: 차세대 KOS 기준 .env.test 파일과 동일
NEXT_PUBLIC_AUTH_API_URL="https://authdev.kosapp.co.kr"
NEXT_PUBLIC_IMAGE_API_URL="https://imagedev.kosapp.co.kr"
...
```

## gitignore 설정: [generator](https://www.toptal.com/developers/gitignore)
```
// .gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE  
*.idea
*.iml

# etc
pnpm-lock.yaml
```

## ESLint 설정
```json
// eslint.config.mjs
import { dirname } from "path";  
import { fileURLToPath } from "url";  
import { FlatCompat } from "@eslint/eslintrc";  
  
const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);  
  
const compat = new FlatCompat({  
  baseDirectory: __dirname,  
});  
  
const eslintConfig = [  
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),  
];  
  
export default eslintConfig;
```

## Prettier 설정(.prettierrc 파일 생성 후 아래 코드 적용)
```json
// .prettierrc
{  
	// 소스 코드 마지막 세미콜론 추가
	"semi": true,
	// 객체, 배열 마지막 항목에 콤마 처리
	"trailingComma": "all",
	// 문자열을 작은따옴표로 작성할 것인지 설정(true: 작은따옴표, false: 큰따옴표)
	"singleQuote": false,
	// 들여쓰기 칸 설정
	"tabWidth": 2,
	// 줄 끝 문자로 LF(Line Feed) 사용 지정(Git Diff 방지 차원)
	"endOfLine": "lf",
}
```

## IntelliJ에서 파일 저장 시 ESLint, Prettier 설정 적용법
- ESLint: IntelliJ - 설정 - 언어 및 프레임워크 - JavaScript - 코드 품질 도구 - ESLint - `저장 시 eslint --fix 실행` 체크 활성화
- Prettier: IntelliJ - 설정 - 플러그인 - Prettier 설치 - 언어 및 프레임워크 - JavaScript - Prettier - `자동 Prettier 구성` 체크 활성화 - `저장 시 실행` 체크 활성화
- IntelliJ IDEA 파일 저장 시 자동 코드 정렬 기능 활성화: IntelliJ - 설정 - 도구 - 저장 시 액션 - `코드 서식 다시 지정` 체크 활성화


- [ ] index.d.ts
- [ ] docker