- 심각도
	- [ ] 치명 (Critical): 서비스 프리징, 데이터 변조 가능
	- [x] 중대 (Major): 완전 기능 오류
	- [ ] 경미 (Minor): 불완전 기능 오류, 인터페이스 오류

- 우선 순위
	- [x] 높음 (High)
	- [ ] 보통 (Medium) 
	- [ ] 낮음 (Low)

- 카테고리: 배포 

- 일시
	- 발생: 2025년 2월 3일 월요일 오전 10:11:12 (#1379)
	- 회복: 2025년 2월 3일 월요일 오후 1:24:12 (#1395) 

- 환경 정보
	- 운영체제: macOS (v15.1.1)
	- 웹 브라우저: Chrome (v132.0.6834.160)
	- 네트워크 상태: 양호
	- 원격 저장소: withuslaw-react-web
	- 개발 환경: React (Next.js)
	- 배포 도구: Jenkins
	
- 버그 설명
	- 사후 서류 제출 페이지 개발 테스트 건으로 배포 실행 후 아래와 같은 콘솔이 출력되며 배포 실패
```shell
if (key == null || signature == null) throw new Error(`Cannot find matching keyid: ${JSON.stringify({ signatures, keys })}`);
```

- 재현 절차
	1. Jenkins 접속
	2. Dashboard 내 Dev_Web_New_App 클릭
	3. 페이지 내 지금 빌드 버튼 클릭

- 시도 방법
	- pnpm 캐시 삭제(pnpm store prune)
	- Dockerfile 빌드 순서 변경 (FROM builder AS runner)
	- package.json 내 packageManager 버전 및 해시 삭제 (pnpm@9.15.3)

- 해결 방법
	- Dockerfile 내 node 버전 수정
```shell
// as-is
FROM node:20-alpine AS base

// to-be
FROM node:21-alpine AS base
```

- 비고
	- Jenkins 배포 속도 저하 이슈 해결 필요

- 첨부 파일
	- N/A