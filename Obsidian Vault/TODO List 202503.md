- [ ] 노션 > 어드민 티켓 담당자 할당
- [ ] ==차주 수요일(3월 19일)까지 UI 개발 > 목요일(3월 20일)에 대표님 보고==
- [ ] 차세대 KOS App
	- [ ] blob revokeObjectURL 처리
	- [ ] 바텀시트 인터렉션 오류 수정
 - [ ] 금융기관 화면 업무 분장(UI 개발)
	- 홍다인
		- [ ] 홈
	- 류창선
		- [x] 프로필
		- [x] 비밀번호 변경
		- [x] 의뢰목록
		- [x] 의뢰목록 - 등기자료
		- [x] 전자등기 의뢰 (+ 데스크탑 파일 업로더): ui/request
		- [x] 모바일 전자등기 의뢰 페이지 UI
		- [x] 사진촬영
		- [x] 사진업로드
		- [x] 로그인
		- [x] 공지사항
		- [x] 현황조회
		- [x] 현황조회 - 등기자료
		- [x] 현황조회 - 등기접수증

***
> https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-Base64-Blob-ArrayBuffer-File-%EB%8B%A4%EB%A3%A8%EA%B8%B0-%EC%A0%95%EB%A7%90-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85
***
> https://velog.io/@baby_dev/%EA%B7%B9%ED%95%9C%EC%9D%98-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94-1%ED%8E%B8-Nextjs-13
***
- [ ] 데스크탑 전자등기 의뢰
	- [x] antd List 컴포넌트 대신 커스텀 컴포넌트 개발: 파일명, 용량 / 개별 삭제 버튼
	- [ ] 10개 이하, 10MB 이하 첨부 가능 알림 영역 논의 필요

- [ ] 데이터 페칭 가이드 작성 > 주석 추가
- [ ] 파일 업로드 시 파일 용량 MB 단위로 변경

- [x] 금융기관 / 관리자 GNB 분기 및 색상 분리 (_selected)
	- [ ] 금융기관: main80
	- [ ] 관리자: main100
	- [ ] 법무대리인: gnb 미노출
- [ ] 페이지별 에러 바운더리 처리
- [x] TabGroup 주석
- [ ] pagination props 논의
- [ ] base64 img src
- [x] 디버깅: 모바일 > 드로어 오픈 후 비밀변호 변경 버튼 클릭 시 모달 팝업 미노출
- [x] 모바일 의뢰목록 th 규격 수정
- [x] 접수번호 등록 페이지 내의 설정 접수번호, 말소번호 등록에 대한 자릿수를 현재 6자리에서 10자리까지 입력 가능하도록 처리 요청드립니다.
- [ ] ==3월 24일부터 개발 진행 예정== SR 추가 개발 건
그리고 SR건 관련하여 추가 개발이 업데이트 되었습니다.
피그마 SR 상환말소 페이지내에 ‘2025.03.17’ 로 검색해서 보시면 
A400 판단 여부에 대한 부분이 존재합니다.
해당 로직에 관련된 백엔드는 작업이 완료된 상태입니다.
아래는 api정보입니다.

App-Woori Swagger > CNTR-04.상환/말소 > 3. SR 상환 말소 정보 중 A400 인입 여부 체크
매핑 : /api/reapay/searcha400receiveyn
파라미터 : 여신번호
결과 : “Y” 또는 “N”

api 참고부탁드립니다.

***
- [x] 어드민 폴더 트리
	- 배정관리 assign
		- 전자등기 신규등록: create
		- 전자등기 배정 > 의뢰번호 > ==[RQST_NO]==
	- 등기관리 registration
		- 등기관리 상세 > 의뢰번호 > ==[RQST_NO]==
		- 등기접수증 승인 > acceptance
	- 회원관리 member
		- 회원관리 상세 > 회원번호 > ==[MEMB_NO]==
		- 회원 등록: create
	- 공지관리 notice
		- 공지사항 등록: create
1554 
1109

71%
***

- request-list (page)
	- Main ==<- 반응형 웹 판단 여부 주입==
		- TabGroup (List)
			- ListTable ==주입==
				- Modal



***
- request-list
	- components (local 1depth c.)
		- main
			- heading (common c.)
			- list (TabGroup c.)
				- detail
					- right button
					- page indicator
					- table
					- pagination




Type '(() => void | undefined) | undefined' is not assignable to type '() => void'. Type 'undefined' is not assignable to type '() => void'.





- request-list
	- components (local 1depth c.)
		- main
			- heading (common c.)
			- list (TabGroup c.)
				- detail
					- right button
					- page indicator
					- table
					- pagination


***
- https://hi-zini.tistory.com/entry/%EB%B9%84%EB%8F%99%EA%B8%B0%EC%A0%81-%EB%B0%A9%EC%8B%9D-%EC%B2%98%EB%A6%AC-%EB%B0%A9%EB%B2%95-Callback-Promise-async-await
- https://velog.io/@ko1586/Callback%ED%95%A8%EC%88%98%EB%9E%80-%EB%AD%94%EB%8D%B0
- https://velog.io/@dahyeon405/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC-Callback-Promise-async-await
- https://ko.javascript.info/settimeout-setinterval
- https://velog.io/@jessiii/Uncaught-TypeError-Failed-to-execute-appendChild-on-Node-parameter-1-is-not-of-type-Node.-%ED%95%B4%EA%B2%B0%EB%B2%95feat.-%EB%85%B8%EB%93%9C%EA%B0%9C%EB%85%90
- https://velog.io/@shines/what-is-exhaustive-deps
- https://velog.io/@2pandi/React-exhustive-deps-Eslint-%EA%B7%9C%EC%B9%99-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
- https://velog.io/@wlwl99/Github-Actions-%EB%B9%8C%EB%93%9C-%EC%A4%91-React-Hook-useEffect-has-missing-dependencies-...-Either-include-them-or-remove-the-dependency-array-react-hooksexhaustive-deps
- https://velog.io/@yoojinpark/Javascriptmapfilter
- https://zellwk.com/blog/media-query-units/
- https://quasar.dev/vue-components/responsive#qresponsive-api
- https://juni-official.tistory.com/134
- https://github.com/mozmorris/react-webcam
- https://velog.io/@rlaaltj1765/%EC%9B%B9-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9B%B9%EC%BA%A0-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0
- https://jw910911.tistory.com/181
- https://insengnewbie.tistory.com/410
- https://stackoverflow.com/questions/27420581/get-maximum-video-resolution-with-getusermedia
- https://velog.io/@byeol4001/Base-64%EC%99%80-base64-img-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
- https://kim0617.tistory.com/320
- https://velog.io/@guri/Type-%EC%98%A4%EB%A5%98-Type-undefined-is-not-assignable-to-type
- https://velog.io/@jayone1202/Type-Boolean-void-is-not-assignable-to-type-void
- https://devbirdfeet.tistory.com/133
- https://velog.io/@loopydoopy/Next.js-Next.js-%EB%8F%99%EC%A0%81-%EB%9D%BC%EC%9A%B0%ED%8C%85Dynamic-Routing
- https://velog.io/@tnrud4685/Next.js-%EA%B8%B0%EB%B3%B8-%EB%8B%A4%EC%9D%B4%EB%82%98%EB%AF%B9-%EB%9D%BC%EC%9A%B0%ED%8C%85-13%EB%B2%84%EC%A0%84-%EB%B6%80%ED%84%B0-%EB%8B%AC%EB%9D%BC%EC%A7%84-%EC%A0%90
- https://kofearticle.substack.com/p/korean-fe-article-base64
- https://velog.io/@superlipbalm/base64-encoding
- https://velog.io/@bboyooning/Base64-Javascript%EC%97%90%EC%84%9C-%EB%AC%B8%EC%9E%90%EB%A5%BC-Base64%EB%A1%9C-%EC%9D%B8%EC%BD%94%EB%94%A9-%EB%B3%80%ED%99%98%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%80
- https://developer.mozilla.org/ko/docs/Web/API/Window/atob
- https://jjunnak.tistory.com/5
- https://stackoverflow.com/questions/76423267/next-js-having-trouble-setting-up-an-onclick-handler
- https://velog.io/@1g2g/Next.js-path-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0
- https://velog.io/@ursr0706/CSS-%EC%86%8D%EC%84%B1-%EC%84%A0%ED%83%9D%EC%9E%90#:~:text=%EC%A6%89%2C%20%22value%22%EA%B0%92%EC%9D%84%20%ED%8F%AC%ED%95%A8%ED%95%9C%20%EC%86%8D%EC%84%B1%EA%B0%92%EC%9D%84%20%EA%B0%80%EC%A7%84%20%EC%9A%94%EC%86%8C%EA%B0%80%20%EC%84%A0%ED%83%9D%EB%90%98%EB%8A%94,%EB%92%A4%EC%97%90%20%EA%B3%B5%EB%B0%B1%EB%AC%B8%EC%9E%90%20%EC%99%B8%EC%97%90%20%EB%8B%A4%EB%A5%B8%20%EB%AC%B8%EC%9E%90%EA%B0%80%20%EC%98%A4%EB%A9%B4%20%EC%95%88%EB%90%9C%EB%8B%A4.
- https://codingapple.com/unit/react-if-else-patterns-enum-switch-case/
- https://velog.io/@eggmun/%EC%9B%B9%ED%8C%A9%EC%A1%B4%EC%86%8D%EC%84%B1%EC%98%A4%EB%A5%98
- next.js 페이지 이동 트랜지션
- https://velog.io/@sarajo/Next.js-%ED%8E%98%EC%9D%B4%EC%A7%80-%ED%8A%B8%EB%9E%9C%EC%A7%80%EC%85%98-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-Layout%EA%B3%BC-Template-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0
- https://jjang-j.tistory.com/128
- https://velog.io/@kwaksj329/View-Transitions-API
- https://cathodicpro.tistory.com/entry/%EC%89%AC%EC%9A%B4-NextJS-08-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%95%B1%EA%B3%BC-%EA%B0%99%EC%9D%80-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%84%ED%99%98-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0?category=1197746
- https://yangtinomad.com/entry/Nextjs%EC%9B%B9-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%A0%84%ED%99%98-%ED%9A%A8%EA%B3%BC%EB%A5%BC-%EC%A3%BC%EB%8A%94-%EB%B0%A9%EB%B2%95%EB%93%A4
- https://mingeesuh.tistory.com/entry/Nextjs-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99%EC%8B%9C-%EB%A1%9C%EB%94%A9-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0
- https://blog.kmong.com/next-js-app-router-%EC%9D%B4%EC%A0%9C%EB%8A%94-%EC%95%B1%EB%9D%BC%EC%A0%81-%EC%82%AC%EA%B3%A0%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%98%EB%8B%A4-deep-dive-%EC%8B%9C%EC%9E%91%EB%B6%80%ED%84%B0-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-part-1-6399cea5f11d
- https://velog.io/@springhana/Next-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A1%9C%EB%94%A9-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
- https://lee-yo-han.github.io/nextjs-loading
- https://cocoworld.tistory.com/83
- https://prmblogs.tistory.com/34
- next.js error boundary loading
- https://velog.io/@jay/Next.js-13-master-course-loading-error-UI
- https://nextjs-ko.org/docs/pages/building-your-application/configuring/error-handling
- https://velog.io/@kingyong9169/react-declarative-error-loading-handling
- https://www.lipsum.com/
- ant file upload typescript / antd upload typescript
- https://hee0.tistory.com/34
- https://velog.io/@gunilna/613-%ED%9A%8C%EA%B3%A0-Antd-Upload-customRequest-S3-PresignedURL
- https://programming119.tistory.com/168
- https://seonhoman.tistory.com/41
- https://velog.io/@oo009pbh/react-datepicker-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%95%98%EC%97%AC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
- https://velog.io/@eunddodi/NextJS-%EB%B9%8C%EB%93%9C-%EC%8B%9C-%ED%8A%B9%EC%A0%95-%ED%8F%B4%EB%8D%94-%EC%A0%9C%EC%99%B8%ED%95%98%EA%B8%B0-1o7e3dr9
- https://whitebeen.tistory.com/37
- https://han-py.tistory.com/507
- https://velog.io/@dongdong98/%EC%9A%B0%EB%8B%B9%ED%83%95%ED%83%95-Next.js-%EA%B0%9C%EB%B0%9C%EA%B8%B0-%EC%96%B4%EB%96%BB%EA%B2%8C%EB%93%A0-%EB%B2%88%EB%93%A4-%EC%82%AC%EC%9D%B4%EC%A6%88%EB%A5%BC-%EC%A4%84%EC%97%AC-%EB%B9%8C%EB%93%9C%EB%A5%BC-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%95%B4%EB%B3%B4%EA%B8%B0
- https://mine-it-record.tistory.com/707
- https://fe-developers.kakaoent.com/2024/240418-optimizing-nextjs-cache/
- https://webpack.kr/plugins/ignore-plugin/
- https://velog.io/@buddle6091/%EC%83%9D%EA%B0%81%EB%B3%B4%EB%8B%A4-%EC%96%B4%EB%A0%A4%EC%9A%B4-Webpack-%EB%B2%88%EB%93%A4%EB%A7%81-loader-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC
- https://arrayofsunshine.co.uk/articles/next-js-how-to-ignore-exclude-a-folder-when-running-next-build
- Next build exclude
- https://nextjs-ko.org/docs/pages/api-reference/next-cli
- https://github.com/vercel/next.js/discussions/65322
- https://github.com/vercel/next.js/discussions/51891
- https://github.com/diegomura/react-pdf#readme
- 최적화
- https://velog.io/@baby_dev/%EA%B7%B9%ED%95%9C%EC%9D%98-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94-1%ED%8E%B8-Nextjs-13
- https://velog.io/@rladpwl0512/%EC%9A%B0%EC%95%84%ED%95%9C%ED%85%8C%ED%81%AC%EC%BD%94%EC%8A%A4-%EB%AF%B8%EC%85%98-%EC%84%B1%EB%8A%A5%EC%B5%9C%EC%A0%81%ED%99%94-2-%ED%95%84%EC%9A%94%ED%95%9C-%EA%B2%83%EB%A7%8C-%EC%9A%94%EC%B2%AD%ED%95%98%EA%B8%B0
- <HeaderV1>
