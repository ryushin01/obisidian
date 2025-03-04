대출금 요청에서 진입한 지급정보에서 뒤로가기 경로

내 사건 클릭(my-case) 
-> 목록에서 사건 클릭(my-case/cntr/loanNo?regType=02) 
-> 사건상세에서 대출금 요청 클릭(my-case/pay-request/loan-pay)
-> 대출금 요청에서 수정 클릭(my-case/pay-info?previousState=true)
-> 지급정보에서 뒤로가기 클릭 시 
-> ==이전화면(대출금 요청 화면[MY_PR_002M])으로 이동==
- ~~router.push()~~
- ~~router.replace()~~