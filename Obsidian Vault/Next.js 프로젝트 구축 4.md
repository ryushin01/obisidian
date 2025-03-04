> 아래 가이드에 맞는 순서대로 세팅을 진행하셔야 오류 발생률을 줄일 수 있습니다.
## Homebrew 및 nvm 설치
```bash
// 1. Homebrew 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

// 2. Homebrew 버전 확인
brew -v

// 3. 버전 확인 실패 시 아래 명령어 차레대로 입력
echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/{계정명}/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/{계정명}/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

// 4. nvm(Node Version Manager) 설치
brew install nvm

// 5. nvm 디렉토리 생성
mkdir ~/.nvm

// 6. 환경 변수 설정
vi ~/.zshrc

// 7. vi: i키 입력해서 INSERT 모드로 전환한 후 아래 명령어 입력
export NVM_DIR=~/.nvm 
source $(brew --prefix nvm)/nvm.sh

// 8. esc 입력해서 INSERT 모드 해제하고 :wq 입력 후 앤터키 입력

// 9. 환경 변수 적용
source ~/.zshrc

// 10. nvm 버전 확인
nvm -v
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