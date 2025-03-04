> nvm(Node Version Manager)을 통해 Node.js 버전을 설치합니다.
## nvm 설치
```bash
// Node.js의 버전 관리자인 nvm(Node Version Manager)을 설치합니다.


```

## pnpm 설치
```bash
// pnpm 설치
npm install -g pnpm
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

- ESLint
- Prettier
- next.config.js
- tsconfig.json
- .env
- .gitignore
- index.d.ts