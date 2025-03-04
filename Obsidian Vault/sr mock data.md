- [x] 사건 상세
- [x] 사건 목록
- [x] 지급 정보
- [ ] ==대출금 요청: 사건 상세에서 데이터 드리븐==
- [x] 상환말소
- [x] 접수번호 등록

***

- (사건 목록) CNTR-03. 계약정보 조회
	- 경로: data/myCase-searchCntrNoFilt
	- 폴더
		- ==대출 취급 주체 구분 코드(lndHndgSlfDsc) 기준==
		- 1: 은행
		- 2: SR

- (사건 상세) CNTR-03. 계약정보 조회
	- 경로: data/cntr-searchCntrDetail
	- 폴더
		- ==SR 대출 프로세스(slmnLndProc) 기준==
		- 02: 소유권이전
		- 03: 소유권이전 & 후순위설정
		- 05: 신탁등기 말소
		- 07: 중도금

- (상환말소) CNTR-04. 상환/말소 API
	- 경로: data/reapay-searchsrrepayinfo
	- 폴더
		- ==관리자 요청 상태코드(adminReqStatCd) 기준==
		- 00: 관리자 요청 전
		- 01: 관리자 확인 중
		- 02: 관리자 반려
		- 03: 관리자 승인 완료

- (지급 정보) TRN-01. 우리은행 지급정보 등록 (1차 테스트 완료)
	- 경로: data/cntr-searchpayinfolist
	- 폴더
		- ==SR 대출 프로세스(slmnLndProc) 기준==
		- 02: 소유권이전
		- 03: 소유권이전 & 후순위설정
		- 05: 신탁등기 말소
		- 07: 중도금

- (접수번호 등록) RGSTR-03. 등기 접수번호 등록
	- 경로: data/trreg-searchacptnoreginfo
