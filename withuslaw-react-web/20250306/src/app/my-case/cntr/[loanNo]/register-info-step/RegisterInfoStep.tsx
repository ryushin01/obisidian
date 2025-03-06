import React from "react";
import { RGSTR_GB_CD } from "@constants";
import { Alert } from "@components";
import { useDisclosure, useFetchApi } from "@hooks";
import { caseDetailAtom, estimateSaveAtom, toastState } from "@stores";
import { getCompareWithToday } from "@utils/dateUtil";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import ActivateHeader from "@app/my-case/cntr/[loanNo]/ActivateHeader";
import RegisterInfoStepItem from "@app/my-case/cntr/[loanNo]/register-info-step/RegisterInfoStepItem";

type TProps = {
  regType: string | null;
  loanNo: string;
  resEstmRegd?: TCaseDetailResData;
  resRgstrRegd?: TCaseDetailResData;
  resPayRegd?: TCaseDetailResData;
  resEstmCnfm?: TCaseDetailResData;
  resLndAmtPay?: TCaseDetailResData;
  execDt?: string;
  statCd?: string;
  lndHndgSlfDsc?: string;
};

/**
 * lndHndgSlfDsc 대출 취급 주체 구분 코드
 * 1 은행지점
 * 2 모집인(SR)
 **/

const EsEfRegisterInfo = ({
  isPayRegd,
  isResLndAmtPay,
  isSrCase,
  loanNo,
}: {
  isPayRegd: boolean;
  isResLndAmtPay: boolean;
  isSrCase: boolean;
  loanNo: string;
}) => {
  const { fetchApi } = useFetchApi();
  const { isOpen, open, close } = useDisclosure();
  const { data } = useQuery({
    queryKey: ["search-ask-info"],
    queryFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchAskInfo?loanNo=${loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  const title =
    data?.title && data?.title.includes("\\n")
      ? data.title.split("\\n").join("\n")
      : data?.title;

  return isSrCase ? (
    <RegisterInfoStepItem
      containerClassName="pb-4 pt-5"
      href={"/my-case/sr-pay-info"} //sr-pay-info로 라우팅
      title={"지급정보"}
    />
  ) : isResLndAmtPay ? (
    <RegisterInfoStepItem
      containerClassName="pb-4 pt-5"
      href={"/my-case/pay-info"}
      title={"지급정보"}
    />
  ) : (
    <>
      <RegisterInfoStepItem
        containerClassName="pb-4 pt-5"
        href={
          data?.resData
            ? "/my-case/pay-info".concat(isPayRegd ? "?previousState=true" : "")
            : ""
        }
        bodyTextColor={isPayRegd ? "text-kos-gray-700" : "text-kos-red-500"}
        title={"지급정보"}
        body={isPayRegd ? "수정" : "등록하기"}
        onClick={() => (data.resData ? null : open())}
      />
      <Alert
        isOpen={isOpen}
        title={title}
        confirmText={"확인"}
        confirmCallBack={close}
      />
    </>
  );
};

const BfRegisterInfo = ({
  loanNo,
  execDt,
  regType,
  isEstmRegd,
  isRgstrRegd,
  isPayRegd,
  isBf6100,
  isEstmCnfm,
  isResLndAmtPay,
  isSrCase,
}: {
  loanNo: string;
  execDt?: string;
  regType?: string;
  isEstmRegd: boolean;
  isRgstrRegd: boolean;
  isPayRegd: boolean;
  isBf6100: boolean;
  isEstmCnfm: boolean;
  isResLndAmtPay: boolean;
  isSrCase: boolean;
}) => {
  const callToast = useSetAtom(toastState);

  const resetEstimateSaveAtom = useResetAtom(estimateSaveAtom);
  const isDDay = getCompareWithToday(execDt) === "same";
  const { isOpen: alertOpen, open: openPopup, close } = useDisclosure();

  // const estimateBodyText = (function () {
  //   if (!(getCompareWithToday(execDt) === "future") || !isEstmRegd) {
  //     return isEstmRegd ? "수정" : "등록하기";
  //   } else {
  //     return isEstmCnfm ? "확정" : "미확정";
  //   }
  // })();

  //정보 등록 - 견적서 TEXT
  const estimateBodyText = (function () {
    if (getCompareWithToday(execDt) === "future") {
      // ~ 실행일 D-1 : 견적서 등록 및 수정 가능
      return isEstmRegd ? "수정" : "등록하기";
    } else {
      // 실행당일 : 견적서 등록 미안료시에만 등록하기 노출
      return isEstmRegd ? "" : "등록하기";
    }
  })();

  //정보등록 - 견적서 링크
  const estimateHref = (function () {
    if (getCompareWithToday(execDt) === "future") {
      return `/my-case/estm/info?loanNo=${loanNo}&isDDay=${isDDay}`;
    } else {
      return isEstmCnfm
        ? `/my-case/estm/info/decide?loanNo=${loanNo}&isDDay=${isDDay}`
        : !isEstmRegd
        ? `/my-case/estm/info?loanNo=${loanNo}&isDDay=${isDDay}`
        : "";
    }
  })();

  const estimateBodyTextColor = (function () {
    if (getCompareWithToday(execDt) !== "past") {
      return isEstmRegd ? "text-kos-gray-700" : "text-kos-red-500";
    }
    return "text-kos-brown-100";
  })();

  const openToast = () => {
    if (!isEstmRegd) {
      //견적서 미등록시
      callToast({
        msg: "견적서를 먼저 등록해주세요.",
        status: "notice",
      });
      // } else if (isDDay && !isEstmCnfm) {  //견적서 미확정시
      //   callToast({
      //     msg: "사건 진행에서 견적서를 확정해주세요",
      //     status: "notice",
      //   });
    }
    return;
  };

  return isSrCase ? (
    <RegisterInfoStepItem
      containerClassName="pb-4 pt-5"
      href={"/my-case/sr-pay-info"} //sr-pay-info로 라우팅
      title={"지급정보"}
    />
  ) : isResLndAmtPay ? (
    <div className={`flex divide-x divide-kos-gray-300 py-4`}>
      <RegisterInfoStepItem
        containerClassName="basis-1/3"
        href={`/my-case/estm/info/decide?loanNo=${loanNo}&isDDay=${isDDay}`}
        title="견적서"
      />
      <RegisterInfoStepItem
        containerClassName="basis-1/3"
        href={isEstmRegd ? `/my-case/estm/regist?loanNo=${loanNo}` : ""}
        title="등기정보"
      />
      <RegisterInfoStepItem
        containerClassName="basis-1/3"
        href={isEstmRegd ? "/my-case/pay-info" : ""}
        title="지급정보"
      />
    </div>
  ) : (
    <div className={`flex divide-x divide-kos-gray-300 pt-5 pb-[15px]`}>
      <RegisterInfoStepItem
        containerClassName="basis-1/3"
        href={estimateHref}
        title="견적서"
        body={estimateBodyText}
        bodyTextColor={estimateBodyTextColor}
        onClick={() => {
          if (estimateHref === "") {
            callToast({
              msg: "사건 진행에서 견적서를 확정해주세요.",
              status: "notice",
            });
            return;
          } else {
            resetEstimateSaveAtom();
          }
        }}
      />
      <RegisterInfoStepItem
        containerClassName="basis-1/3"
        // href={isEstmRegd && !(isDDay && !isEstmCnfm) ? `/my-case/estm/regist?loanNo=${loanNo}` : ""}
        href={isEstmRegd ? `/my-case/estm/regist?loanNo=${loanNo}` : ""}
        title="등기정보"
        body={isEstmRegd ? (isRgstrRegd ? "수정" : "등록하기") : "대기"}
        bodyTextColor={
          isEstmRegd
            ? isRgstrRegd
              ? "text-kos-gray-700"
              : "text-kos-red-500"
            : "text-kos-brown-50"
        }
        onClick={() => openToast()}
      />
      <RegisterInfoStepItem
        containerClassName="basis-1/3"
        // href={isEstmRegd && !(isDDay && !isEstmCnfm) ? "/my-case/pay-info".concat(isPayRegd ? "?previousState=true" : "") : ""}
        href={
          isBf6100
            ? ""
            : isEstmRegd
            ? "/my-case/pay-info".concat(isPayRegd ? "?previousState=true" : "")
            : ""
        }
        title="지급정보"
        //당일이면서 statCd가 13이상이면 문구 사라짐
        body={isEstmRegd ? (isPayRegd ? "수정" : "등록하기") : "대기"}
        bodyTextColor={
          isEstmRegd
            ? isPayRegd
              ? "text-kos-gray-700"
              : "text-kos-red-500"
            : "text-kos-brown-50"
        }
        onClick={() => (isBf6100 ? openPopup() : openToast())}
      />
      {/* 6100 수신 전 팝업 */}
      <Alert
        isOpen={alertOpen}
        title={
          <span>
            사건배정 알림톡을 받으신 후<br />
            지급정보 등록이 가능합니다
          </span>
        }
        confirmText={"확인"}
        confirmCallBack={close}
      />
    </div>
  );
};

export default function RegisterInfoStep(props: TProps) {
  const { rgstrGbCd } = useAtomValue(caseDetailAtom);
  const regType = props.regType ?? rgstrGbCd;
  const isBf = regType === RGSTR_GB_CD["01"]; // 이전등기인지 설정 OR 말소인지
  const isSrCase = props.lndHndgSlfDsc === "2"; // sr 구분 (2 = sr / 1 = 기존)

  const allProps = {
    isEstmRegd: props?.resEstmRegd?.resData ?? false,
    isRgstrRegd: props?.resRgstrRegd?.resData ?? false,
    isPayRegd: props?.resPayRegd?.resData ?? false,
    isBf6100: props?.statCd === "01",
    isEstmCnfm: props?.resEstmCnfm?.resData ?? false,
    isResLndAmtPay: props.resLndAmtPay?.resData ?? false,
    loanNo: props.loanNo,
    execDt: props.execDt,
  };

  //정보등록 완료 여부
  let isRgstInfoCmpt = false;
  if (isBf) {
    isRgstInfoCmpt =
      allProps?.isEstmRegd && allProps?.isRgstrRegd && allProps?.isPayRegd;
  } else {
    isRgstInfoCmpt = allProps?.isPayRegd;
  }

  return (
    <div
      className="bg-kos-white relative rounded-[20px]"
      style={{
        boxShadow:
          "3px 4px 12px 0px rgba(161, 161, 161, 0.10), 14px 16px 21px 0px rgba(161, 161, 161, 0.09), 87px 101px 37px 0px rgba(161, 161, 161, 0.00)",
      }}
    >
      {/* SR건 제외 정보등록 영역은 실행당일까지 활성화 - 20240725 수정*/}
      <div
        className={
          getCompareWithToday(props?.execDt) !== "past" &&
          !isRgstInfoCmpt &&
          !isSrCase
            ? "pt-10"
            : ""
        }
      >
        {getCompareWithToday(props?.execDt) !== "past" &&
          !isRgstInfoCmpt &&
          !isSrCase && <ActivateHeader>정보 등록</ActivateHeader>}
        {isBf ? (
          <BfRegisterInfo
            {...allProps}
            isSrCase={isSrCase}
            loanNo={props.loanNo}
          />
        ) : (
          <EsEfRegisterInfo isSrCase={isSrCase} {...allProps} />
        )}
      </div>
    </div>
  );
}
