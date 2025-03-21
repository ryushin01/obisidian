# koser-standard fetching guideline

## 1. API Endpoint 설정
```ts
// .env, .env.development, .env.production
// .env 파일에 API Endpoint를 설정합니다.
NEXT_PUBLIC_APP_URI="https://api.instantwebtools.net/v1"  
NEXT_PUBLIC_ADMIN_URI="https://api.instantwebtools.net/v2"  
NEXT_PUBLIC_API_URI="https://api.instantwebtools.net/v3"  
NEXT_PUBLIC_FAKE_URI="https://jsonplaceholder.typicode.com"
```

## 2. API Endpoint 상수화
```ts
// src/constants/env.ts
// API Endpoint가 필요할 때마다 보일러 플레이트(process.env.)가 발생하기 때문에 환경 변수를 상수로 지정합니다.
export const appURI = process.env.NEXT_PUBLIC_APP_URI;  
  
export const adminURI = process.env.NEXT_PUBLIC_ADMIN_URI;  
  
export const apiURI = process.env.NEXT_PUBLIC_API_URI;  
  
export const fakeURI = process.env.NEXT_PUBLIC_FAKE_URI;
```

## 3. 함수 생성
```ts
// src/services
// 서버 리소스로 접근할 상수화된 API Endpoint 기반 함수를 생성합니다.
// 일반적으로 페이지 단위로 파일을 생성합니다.
// 아래는 메인 페이지에서 유저 정보를 서버로부터 받아야 하는 예시입니다.

// 1) 상수로 만든 API Endpoint를 불러옵니다.
import { authURI } from "@constants/env";

// 2) Axios Instance의 기본 구조를 불러옵니다.
import { axiosBasicInstance } from "@services";

// 3) 서버 통신용 함수를 생성합니다. 프로젝트 내 어디서든 접근이 가능해야 하므로, export를 추가합니다.
export const 
```