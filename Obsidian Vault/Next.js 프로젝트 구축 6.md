> 아래 가이드에 맞는 순서대로 세팅을 진행하셔야 오류 발생률을 줄일 수 있습니다.


## nvm, Node.js, pnpm 설치
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

// node 설치: 앞에 버전 번호만 입력하면 해당 버전의 마지막 버전 설치
nvm install 17 // 17.9.1 설치

// 특정 node 버전 사용
nvm use 16.0.0

// 기본값으로 사용할 node 버전 설정
nvm alias default v17.0.0
```
## Next.js 설치 및 초기 설정
```bash
// 1. Next.js 설치(TypeScript) 
npx create-next-app@latest --ts

// 2. 초기 설정
// ⏷ 프로젝트 이름을 정합니다.
What is your project named?                                       project-name

// ⏷ 정적 도구 분석 툴인 ESLint 사용 유무를 설정합니다.
Would you like to use ESLint?                                     Yes

// ⏷ CSS Framework인 Tailwind CSS 사용 유무를 설정합니다.
Would you like to use Tailwind CSS?                               No

// ⏷ src 디렉토리를 생성해 public 디렉토리로 분리할지 설정합니다.
Would you like to use `src/` directory?                           Yes

// ⏷ page routing 대신 app routing을 쓸 것인지 설정합니다.
Would you like to use App Router? (recommended)                   Yes

// ⏷ import 경로를 커스터마이징하여 절대 경로로 쓸 것인지 설정합니다.
Would you like to use customize the default import alias (@/*)?   Yes

// ⏷ 기본으로 @/*를 커스터마이징된 경로로 사용할 것인지 설정합니다.
What import alias would you like configured?                      @/*
```

## 기본 package 설치
```bash
pnpm install
```

## Sass 설치
```bash
pnpm add sass
```

## Sass 설정
```js
// next.config.js
const path = require('path')
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
```

## tsconfig.json 설정
```json
{  
	"compilerOptions": {
		// ⏷ 최종적으로 컴파일하는 ECMAScript 목표 버전 설정
		"target": "ES2015",
		// ⏷ import 문법 설정
		"module": "esnext",
		// ⏷ 컴파일 과정에서 사용할 라이브러리 파일 설정
		"lib": ["dom", "dom.iterable", "esnext"],
		// ⏷ .js 파일 생성 여부 설정(true 시 미생성)
		"noEmit": true,
		// ⏷ TypeScript 컴파일 작업 시 JavaScript 파일도 포함할 수 있는지 지정하는 옵션
		"allowJs": true,
		// ⏷ 모든 엄격한 유형 검사 옵션 활성화
		"strict": true,
		// ⏷ commonJS 스타일로 export 구문을 사용하여 모듈 내보내기 가능(import * as)
		"esModuleInterop": true,
		// ⏷ Webpack, ESBuild, SWC 등과 같은 번들러를 통해 번들로 제공하기 때문에 규칙을 완화하도록 설정
		"moduleResolution": "bundler",
		// ⏷ .json 파일인 모듈의 import 허용 설정
		"resolveJsonModule": true,
		// ⏷ 프로젝트 내에 모든 소스 코드 파일을 모듈로 만드는 설정
		"isolatedModules": true,
		// ⏷ JavaScript 파일에서 내보내는 방식을 제어하는 옵션(preserve: jsx를 변경하지 않고 내보내는 값)
		"jsx": "preserve",
		// ⏷ 증분 컴파일 활성화(수정된 파일만 컴파일)
		"incremental": true,
		// ⏷ 절대 경로를 위
		"baseUrl": ".",
		// ⏷ 
		"paths": {
			...
		},
	},
	// ⏷ 컴파일할 파일들을 지정하는 속성
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
	// ⏷ 컴파일 대상에서 제외할 파일들을 지정하는 속성
	"exclude": ["node_modules"]
}
```


- [ ] ESLint
- [ ] Prettier
- [ ] next.config.js
- [ ] tsconfig.json
- [ ] .env
- [ ] .gitignore
- [ ] index.d.ts