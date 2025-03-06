"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { NextArrowIcon } from "@icons";
import { Alert, Button, Header, Loading, Typography } from "@components";
import { useDisclosure, useFetchApi, useFlutterBridgeFunc } from "@hooks";
import {
  authAtom,
  caseDetailAtom,
  estimateSaveAtom,
  estmInfoAtom,
  routerAtom,
  toastState,
} from "@stores";
import { getCompareWithToday } from "@utils/dateUtil";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { Sheet } from "react-modal-sheet";
import CaseDetailAccordion from "@app/my-case/cntr/[loanNo]/CaseDetailAccordion";
import CurrentStep from "@app/my-case/cntr/[loanNo]/CurrentStep";
import NextStep from "@app/my-case/cntr/[loanNo]/NextStep";
import PreviousStep from "@app/my-case/cntr/[loanNo]/PreviousStep";
import RegisterInfoStep from "@app/my-case/cntr/[loanNo]/register-info-step/RegisterInfoStep";

/**
 * SR건 필드 디테일
 * docAmt           SR 실행시 인지세
 * debtDcAmt        SR 실행시 채권할인금액
 * etcAmt           SR 실행시 기타 비용
 * slmnLndProc      SR 대출프로세스(조건부 취급)
 * slmnLndProcNm    SR 대출프로세스 명(조건부 취급 명)
 * slmnCmpyNm       모집인 회사명
 * slmnNm           모집인 명
 * slmnPhno         모집인 연락처
 * sellerNm1        매도인 명
 * sellerBirthDt1   매도인 생년월일
 * sellerNm2        공동매도인 명
 * sellerBirthDt2   공동매도인 생년월일
 * trstNm           수탁자명(신탁사)
 * cnsgnNm          위탁자명(부동산소유자)
 * bnfrNm           우선수익자
 * owshDocStatCd    소유권 서류 상태 코드
 * owshDocStatNm    소유권 서류 상태 명
 **/

/**
 * @name lndHndgSlfDsc
 * @description 대출 취급 주체 구분 코드
 * @summary 1. 은행지점
 *          2. 모집인(SR)
 **/

/**
 * @name slmnLndProc
 * @description 모집인(SR) 대출 프로세스 종류
 * @summary 01. 조건부 취급대상 아님
 *          02. 소유권이전
 *          03. 소유권이전 & 후순위설정
 *          04. 선순위말소/감액
 *          05. 신탁등기 말소
 *          06. 임차인 퇴거
 *          07. 중도금
 *          08. 임차권 및 전세권 말소
 *          09. 임차권 명령 및 압류/가압류 말소
 */

/**
 * @name statCd
 * @description 화면 상태 코드
 * @summary 03. 지급 정보 등록
 *          10. 대출 실행
 *          14. 상환말소
 *          30. 등기접수 번호 등록
 *          40. 사건 종결 (설정 서류)
 */

/**
 * @name currProgCd
 * @description 현재 사건 진행 구분 코드
 * @summary 00. 대출실행 대기중
 *          01. 견적서 확정
 *          02. 대출실행 대기중 ([이전] 견적서가 확정이고 대출이 실행된 당일일 경우)
 *          04. 대출금 요청
 *          05. 상환말소
 *          06. 접수번호 등록
 *          07. 설정서류
 */

export default function MyCaseDetail({
  params,
}: {
  params: { loanNo: string };
}) {
  const searchParams = useSearchParams();
  const callToast = useSetAtom(toastState);
  const setRouter = useSetAtom(routerAtom);
  const resetCaseDetailAtom = useResetAtom(caseDetailAtom);
  const resetEstmInfoAtom = useResetAtom(estmInfoAtom);
  const resetEstimateSaveAtom = useResetAtom(estimateSaveAtom);
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  const {
    isOpen: isOpenAcct,
    open: openAcct,
    close: closeAcc,
  } = useDisclosure();
  const { isOpen: isOpenDateRfd, open: openDateRfd } = useDisclosure();
  const { isOpen: isOpenEltnSecurd, open: openEltnSecurd } = useDisclosure();
  const {
    isOpen: isOpenResExecAmtChngd,
    open: openResExecAmtChngd,
    close,
  } = useDisclosure();
  const {
    isOpen: isOpenResRevisionCheck,
    open: openResRevisionCheck,
    close: closeResRevisionCheck,
  } = useDisclosure();
  const {
    isOpen: isSrCase,
    open: openSrCase,
    close: closeSrCase,
  } = useDisclosure();
  const { fetchApi } = useFetchApi();
  const router = useRouter();
  const regType = searchParams.get("regType");
  const setCaseDetailAtom = useSetAtom(caseDetailAtom);
  const { isOpen, toggle } = useDisclosure();
  const { permCd } = useAtomValue(authAtom);
  const pageRouter = useAtomValue(routerAtom);
  const { slmnLndProc } = useAtomValue(caseDetailAtom);
  const isIos = sessionStorage.getItem("isIos");
  const prevPath = sessionStorage.getItem("prevPath");

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["case-detail", params.loanNo],
    queryFn: (): Promise<TDetailInfo> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchCntrDetail?loanNo=${params.loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  const pathSpy = () => {
    const sessionSt = globalThis?.sessionStorage;
    const saveRoute = sessionSt.getItem("saveRoute");

    if (!sessionSt) {
      return;
    }

    sessionSt.setItem("savePath", saveRoute!);
    sessionSt.setItem("saveRoute", globalThis?.location.pathname);
  };

  const isSr = data?.lndHndgSlfDsc === "2";
  const { mutate } = useMutation({
    mutationKey: ["wk-img-rslt-trans"],
    mutationFn: (body: { loanNo: string; attcFilCd: string; wkCd: string }) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/rgstr/wkimgrsltadminreq`,
        method: "post",
        body: body,
      }).then((res) => res.json()),
    onSuccess(data, variables) {
      if (data.code === "00") {
        if (variables.attcFilCd === "F")
          callToast({
            msg: "주민등록초본이 등록되었습니다",
            status: "success",
            dim: true,
          });
        if (variables.attcFilCd === "G")
          callToast({
            msg: "등기필증이 등록되었습니다",
            status: "success",
            dim: true,
          });
      } else {
        callToast({ msg: data.message, status: "error", dim: true });
      }
    },
  });

  const BADGE_COLOUR: TObj = {
    ["00"]: "blue",
    ["01"]: "blue",
    ["02"]: "red",
    ["03"]: "green",
    ["04"]: "gray",
  };

  type TAdminReq = {
    reqGbCd: string;
    reqGbNm: string;
    procGbCd: string;
    procGbNm: string;
  };
  const [reqAdminF, setReqAdminF] = useState("0");
  const [reqAdminG, setReqAdminG] = useState("0");
  const [reqAdminFNm, setReqAdminFNm] = useState("");
  const [reqAdminGNm, setReqAdminGNm] = useState("");

  // SR건 대출금 지급 여부 체크 및 데이터 리패치
  const chagneValue = (value: boolean) => {
    refetch();
  };

  // 보정서류 등록 여부 조회 -> 서류 전체리스트중에서 주민등록초본, 이전등기필증만 확인
  const { data: modifyDocData, refetch: reAdminReqData } = useQuery({
    queryKey: ["admin-req", params.loanNo],
    queryFn: (): Promise<TAdminReq[]> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchAdminReqInfo?loanNo=${params.loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });
  useEffect(() => {
    // 보정서류 등록 여부 조회 -> 서류 전체리스트중에서 주민등록초본, 이전등기필증만 확인
    if (!!modifyDocData) {
      console.log("보정서류 등록 여부 조회", modifyDocData);
    }
    // 주민등록초본, 이전등기필증만 확인
    if (!!modifyDocData && modifyDocData?.length > 0) {
      const isRes = modifyDocData?.filter((el) => {
        if (el.reqGbCd === "F") {
          setReqAdminF(el.procGbCd);
          setReqAdminFNm(el.procGbNm);
        }
        if (el.reqGbCd === "G") {
          setReqAdminFNm(el.procGbCd);
          setReqAdminGNm(el.procGbNm);
        }
      });
    }
  }, [modifyDocData]);

  const isEstmSend = data?.resEstmRegd?.resData || data?.resEstmCnfm?.resData; // 견적서 등록 여부
  const isBf = data?.rgstrGbCd === "01"; //이전등기 여부
  //정보등록 완료 여부
  const isRgstInfoCmpt =
    isSr ||
    (isBf
      ? data?.resEstmRegd?.resData &&
        data?.resRgstrRegd?.resData &&
        data?.resPayRegd?.resData
      : data?.resPayRegd?.resData);

  useEffect(() => {
    // 미리 저장되어 있던 다른 여신번호 정보가 보이는 현상 해결 위한 상태관리 정보 초기화
    resetEstmInfoAtom();
    resetCaseDetailAtom();
    resetEstimateSaveAtom();

    if (!!data) {
      console.log("사건 상세 data =====>", data);
      setCaseDetailAtom((prev) => ({
        ...data,
        regType: prev.regType ?? regType,
      }));

      /** 0. 실행일  */
      const execDt = data?.execDt;
      /** 1. 상환금 수령용 계좌 등록 여부 */
      const isRfdRegd = data?.resRfdRegd?.resData;
      /** 2. 상환금 수령용 계좌 최초 등록한 당일인지 여부 */
      const isDateRfdRegd = data?.resDateRfdRegd?.resData;
      /** 3. 전자등기 + 자담 건인지 여부 */
      const isEltnSecurd = data?.resEltnSecurd?.resData;
      /** 4. 실행금액 변경 여부 */
      const isResExecAmtChngd = data?.resExecAmtChngd?.resData;
      /** 5. 지급정보 등록 여부 */
      const isPayAmtRegd = data?.resPayRegd?.resData;
      /** 6. SR건 구분 */
      const isSr = data?.lndHndgSlfDsc === "2";

      console.log("전자,자담여부 >> ", isEltnSecurd);

      // 상환금 등록
      if (!isRfdRegd) {
        openAcct();
        return;
      }
      if (isDateRfdRegd) {
        openDateRfd();
        return;
      }

      if (isEltnSecurd && !isPayAmtRegd) {
        //팝업노출 기준이 실행일 이전 -> 대출실행 이전 & 지급정보=N 으로 변경됨
        //전자등기 + 자담, 대환대출, 역전세는 화면에서 지급정보 등록 불가!!
        return openEltnSecurd();
      } else if (isResExecAmtChngd && isPayAmtRegd) {
        return openResExecAmtChngd();
      }

      // SR 건
      if (isSr && data?.statCd < "10") {
        return openSrCase();
      }
    }
  }, [data]);

  useEffect(() => {
    if (
      (value?.mode === "IMAGE" || value?.mode === "IMAGE_VIEW") &&
      value?.data?.code === "00"
    ) {
      // mutate({
      //   loanNo: params.loanNo,
      //   wkCd: value?.data?.data?.wkCd,
      //   attcFilCd: value?.data?.data?.data?.attcFilCd,
      // });

      if (value?.data?.data?.data?.attcFilCd === "F") {
        callToast({
          msg: "주민등록초본이 등록되었습니다.",
          status: "success",
          dim: true,
        });
      } else if (value?.data?.data?.data?.attcFilCd === "G") {
        callToast({
          msg: "등기필증이 등록되었습니다.",
          status: "success",
          dim: true,
        });
      }
      // 보정서류 데이터 다시 가져오기
      reAdminReqData();
    }
  }, [value]);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
  }, []);

  //매매계약서 유무 조회
  const { mutate: searchCntrctYN } = useMutation({
    mutationKey: ["searchCntrctYN"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/searchslcntrctyn/${params.loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      if (res.code === "99") {
        callToast({
          msg: "매매계약서를 불러오는 중 에러가 발생하였습니다.\n다시 시도해주세요.",
          status: "notice",
        });
        return;
      }

      if (res.data === "Y") {
        //@ts-ignore
        window.flutter_inappwebview.callHandler("flutterFunc", {
          // @ts-ignore
          mode: "IMAGE_VIEW",
          data: {
            wkCd: "IMAGE_CUST",
            attcFilCd: "08",
            loanNo: params.loanNo,
          },
        });
      } else if (res.data === "N") {
        callToast({
          msg: "매매계약서가 존재하지 않습니다.\n차주에게 받아서 별도로 처리해주세요.",
          status: "notice",
        });
      }
    },
    onError: (error) => {
      console.log("매매계약서 유무 조회 에러", error);
      callToast({
        msg: "매매계약서를 불러오는 중 에러가 발생하였습니다.\n다시 시도해주세요.",
        status: "notice",
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full fixed top-0 left-0">
      <Header
        // backPath="/my-case"
        backCallBack={() => {
          if (prevPath === `/my-case/estm/info`) {
            // @ts-ignore
            window.flutter_inappwebview.callHandler("flutterFunc", {
              mode: "BOTTOM_TABVIEW_MOVE",
              data: {
                type: "1",
                url: `/my-case`,
              },
            });
          } else {
            router.push("/my-case");
          }
        }}
        title="사건상세"
        rightItem={
          isEstmSend && (
            <Button.TextButton
              size={"Medium"}
              state={true}
              onClick={() => {
                searchCntrctYN();
              }}
            >
              계약서
            </Button.TextButton>
          )
        }
      />
      <main className="bg-kos-gray-100 w-full h-full flex flex-col border-box">
        {isOpen && (
          <div
            className={
              "absolute bg-kos-gray-800 w-full h-full top-0 left-0 opacity-60 z-10"
            }
          />
        )}
        <section className="relative z-20">
          <h2 className="sr-only">차주 상세 정보 영역</h2>
          <CaseDetailAccordion
            isOpenAccordion={isOpen}
            toggleAccordion={toggle}
            detailInfo={data}
          />
        </section>
        <section className={`${isOpen && 'absolute'} grow overflow-y-scroll w-full pt-3 px-4 flex flex-col gap-y-3 pb-40 scroll-p-0`}>
          <h2 className="sr-only">사건 진행 알림 영역</h2>
          <RegisterInfoStep
            regType={regType}
            loanNo={params.loanNo}
            {...data}
          />
          {
            /* 사건 종결이면 사건진행 비노출 */
            data?.progGbInfo?.currProgCd !== "99" && (
              <CurrentStep
                currProgGbNm={data?.progGbInfo.currProgNm ?? ""}
                currProgDesc={data?.progGbInfo.currProgDesc ?? ""}
                {...data}
                onChangeValue={chagneValue}
              />
            )
          }
          {
            /* 정보등록 완료 & 실행당일만 다음단계 영역 노출*/
            isRgstInfoCmpt &&
              getCompareWithToday(data?.execDt) === "same" &&
              data?.progGbInfo.currProgCd !== "99" &&
              data?.progGbInfo.nextProgCd !== "99" &&
              data?.progGbInfo.nextProgCd !== null && (
                <NextStep
                  nextProgGbNm={data?.progGbInfo.nextProgNm}
                  nextProgNum={data?.progGbInfo.nextProgNum}
                />
              )
          }
          {
            /* 정보등록 완료 시 이전단계 영역 노출*/
            isRgstInfoCmpt && (
              <PreviousStep prevProgList={data?.progGbInfo.prevProgList} />
            )
          }

          <Alert
            isOpen={isOpenAcct}
            title={data?.resRfdRegd.title}
            confirmText={"확인"}
            confirmCallBack={() => {
              /* 대표일 경우 상환계좌 등록화면으로 이동, 소속직원은 내사건 목록으로 이동 */
              if (permCd === "00") {
                closeAcc();
                setRouter({
                  prevPage: `/my-case/cntr/${params.loanNo}?regType=${regType}`,
                });
                pathSpy();
                router.push("/information/cntr/001");
              } else {
                const prevPath = localStorage.getItem("putPath");
                if (prevPath === "/") {
                  router.push("/my-case");
                }
                router.back();
              }
            }}
            bodyText={data?.resRfdRegd.body}
          />
          <Alert
            isOpen={isOpenDateRfd}
            title={data?.resDateRfdRegd.title}
            confirmText={"확인"}
            confirmCallBack={() => {
              const prevPath = sessionStorage.getItem("prevPath");
              const checkPath = localStorage.getItem("putPath");
              const getPath = localStorage.getItem("getPath");

              // 내사건목록 또는 홈카드 진입 체크
              if (prevPath === "/my-case") {
                router.back();
              } else if (checkPath === "/") {
                router.push("/my-case");
              } else if (getPath === "/acceptance/match/accept-get") {
                router.push("/my-case");
              } else if (prevPath === "/information/cntr/006") {
                router.push("/my-case");
              }
            }}
          />
          {/* 전자등기 + 자담, 대환대출, 역전세 */}
          <Alert
            isOpen={isOpenEltnSecurd}
            title={data?.resEltnSecurd.title}
            confirmText={"확인"}
            confirmCallBack={() => {
              const prevPath = sessionStorage.getItem("prevPath");
              const checkPath = localStorage.getItem("putPath");

              // 내사건목록 또는 홈카드 진입 체크
              if (prevPath === "/my-case") {
                router.back();
              } else if (checkPath === "/") {
                router.push("/my-case");
              }
            }}
          />
          {/* SR/일반 실행금액변경 팝업 구분 */}
          {data?.lndHndgSlfDsc === "2" ? (
            <Alert
              isOpen={isOpenResExecAmtChngd}
              title={"실행금액이 변경되었습니다"}
              confirmText={"확인"}
              confirmCallBack={() =>
                prevPath === "/my-case/sr-pay-info"
                  ? close()
                  : router.push("/my-case/sr-pay-info?previousState=nextjs")
              }
              bodyText={"지급정보를 확인해주세요."}
            />
          ) : (
            <Alert
              isOpen={isOpenResExecAmtChngd}
              title={"실행금액이 변경되었습니다"}
              confirmText={"확인"}
              confirmCallBack={() =>
                router.push("/my-case/pay-info?previousState=nextjs")
              }
              bodyText={"지급정보를 수정해주세요."}
            />
          )}
          {/* SR건 진입시 팝업 노출 */}
          <Alert
            isOpen={isSrCase}
            title={"대출모집인 취급건으로\n지급정보를 확인해주세요."}
            confirmText={"확인"}
            confirmCallBack={closeSrCase}
          />
        </section>
        {data?.rgstrGbCd === "01" && data?.resPayRegd?.resData && (
          <Button.FullRoundedButton
            bgColor={"bg-kos-brown-100"}
            textColor="text-kos-white"
            className="fixed right-2 bottom-4"
            onClick={openResRevisionCheck}
          >
            보정서류
          </Button.FullRoundedButton>
        )}
      </main>
      <Sheet
        className="border-none"
        isOpen={isOpenResRevisionCheck}
        onClose={closeResRevisionCheck}
        detent={"content-height"}
        snapPoints={[400, 100, 0]}
      >
        <Sheet.Container
          style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
        >
          <Sheet.Header />
          <Sheet.Content>
            <div
              className={`flex flex-col px-4 ${!!isIos ? "pt-2 pb-5" : "py-2"}`}
            >
              <div
                className="py-3 flex justify-between"
                onClick={() => {
                  closeResRevisionCheck();
                  //@ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    // @ts-ignore
                    mode: "IMAGE_VIEW",
                    data: {
                      wkCd: "IMAGE_BIZ",
                      attcFilCd: "F",
                      loanNo: params.loanNo,
                    },
                  });
                }}
              >
                <Typography
                  className="flex justify-between"
                  type={Typography.TypographyType.H5}
                  color="text-kos-gray-800"
                >
                  주민등록초본
                </Typography>
                <Image src={NextArrowIcon} alt="link icon" />
              </div>
              <div
                className="py-3 flex justify-between"
                onClick={() => {
                  closeResRevisionCheck();
                  //@ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    // @ts-ignore
                    mode: "IMAGE_VIEW",
                    data: {
                      wkCd: "IMAGE_BIZ",
                      attcFilCd: "G",
                      loanNo: params.loanNo,
                    },
                  });
                }}
              >
                <Typography
                  className="flex justify-between"
                  type={Typography.TypographyType.H5}
                  color="text-kos-gray-800"
                >
                  이전등기필증
                </Typography>
                <Image src={NextArrowIcon} alt="link icon" />
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={closeResRevisionCheck}
          style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
        />
      </Sheet>
    </div>
  );
}
