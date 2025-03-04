- 홈 상단 카드 /  홈 하단 목록 / 알림톡에서도 SR 분기 처리 필요 > 공통 라우팅 모듈 > 사건 상세는 단일 페이지 개발 및 조건부 렌더링 처리
- ==이미지 등록 시 플러터에 lndHndgSlfDsc : ‘2’ 전송==
- ==SR 상환영수증 등록 시, Flutter 호출 시 다음 조건을 반영해 주세요==
	1. bankCd 필드에는 항상 bankNm 값을 입력해주세요. (SR상환말소 정보 조회 API 데이터)
	2. 관리자 반려 후 재등록일 경우, returnYn 필드를 'Y'로 설정해주세요.

요청 데이터 예시

1. 신규 등록 
{
  wkCd: "IMAGE_BIZ",
  attcFilCd: 2,
  loanNo: loanNo,
  bankCd: bankNm,
}

2. 반려 후 재등록
{
  wkCd: "IMAGE_BIZ",
  attcFilCd: 2,
  loanNo: loanNo,
  returnYn: "Y",
  bankCd: bankNm,
}


***


- CNTR-03. 계약정보 조회(이상협 매니저)
	- 사건 상세
	- API : /cntr/searchCntrDetail
```json
	// 응답 필드
	lndHndgSlfDsc(대출 취급 주체 구분 코드)
	docAmt(SR 실행시 인지세)
	debtDcAmt(SR 실행시 채권할인금액)
	etcAmt(SR 실행시 기타 비용)
	slmnLndProc(SR 대출프로세스(조건부 취급))
	slmnLndPRocNm(SR 대출프로세스 명(조건부 취급 명))
	slmnCmpyNm(모집인 회사명)
	slmnNm(모집인 명)
	slmnPhno(모집인 연락처) 
	sellerNm1(매도인) 
	sellerBirthDt1(매도인 생년월일)
	sellerNm2(공동매도인)
	sellerBirthDt2(공동매도인 생년월일)
	trstNm(수탁자명(신탁사))
	cnsgnNm(위탁자명(부동산소유자))
	bnfrNm(우선수익자)
	owshDocStatCd(소유권 서류 상태 코드)
	owshDocStatNm(소유권 서류 상태 명)
```

***

- CNTR-04. 상환/말소(신규 API)(박원준 매니저)
	- 2. SR 상환 말소 정보 조회
	- API : /reapay/searchsrrepayinfo
```json
	// 응답 필드
	loanNo(여신번호)
	totalAmount(총합계금액)
	execDt(실행일)
	adminReqStatCd(관리자 요청 상태코드)
	상환은행리스트 : 영수증 등록 상태코드
```

  ***

- RGSTR-01. 업무 이미지 결과 관리자 요청 등록(박원준 매니저)
	- 01. 업무 이미지 등록 결과 관리자 요청
	- API : /rgstr/wkimgrsltadminreq
```json
// 상환 영수증 등록 시 
    {
	  "loanNo": “여신번호”,
	  "wkCd": "IMAGE_BIZ”,
	  "attcFilCd": "2"
	}

// 요청 시, loanNo에 여신번호를 치환하여 사용 부탁드립니다.
```

***

- RGSTR-03. 등기 접수번호 등록(정가은  매니저)
	- 01. 등기 접수번호 데이터조회
	- API : /trreg/searchacptnoreginfo/{loanNo}
```json
	// 응답 필드
	uptUnqNo(등기고유번호)
```

***
- RGSTR-03. 등기 접수번호 등록(정가은 매니저)
	- 01. 등기 접수번호 등록
	- API : /trreg/saveacptnoreg
```json
	// 요청 필드
	uptUnqNo(등기고유번호)
```

***

- TRN-01. 우리은행 지급정보 등록 (1차 테스트 완료)(송원섭 매니저)
	- 03. 지급정보 조회
	- API : /cntr/searchpayinfolist/{loanNo}
```json
	// 응답 필드
	slmnLndProc(모집인(SR) 대출프로세스)
	sellerNm1(매도인명)
	sellerBirthDt1(매도인 생년월일)
	sellerNm2(공동 매도인명)
	sellerBirthDt2(공동 매도인 생년월일)
	trstNm(수탁자명(신탁사))
	cnsgnNm(위탁자명(부동산소유자))
	bnfrNm(우선 수익자명)
	pwpsNm(매도인(담보제공자))
	pwpsBirthDt(매도인(담보제공자) 생년월일)
	bnkGbCd(은행코드(상환정보))
	bankNm(금융기관(상환정보))
	execAmt(상환금(상환정보))
```
   