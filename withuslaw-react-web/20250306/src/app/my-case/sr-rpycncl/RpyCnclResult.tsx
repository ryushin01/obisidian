import React from "react";
import { Size } from "@components/Constants";
import { CtaButton, SecondaryButton } from "@components/button";
import { getCompareWithToday } from "@utils/dateUtil";
import PayProceeding from "@app/my-case/PayProceeding";
import PaySuccess from "@app/my-case/PaySuccess";

/**
 * @name adminReqStatCd
 * @description 관리자 요청 상태 코드
 * @summary 00: 관리자 요청 전
 *          01: 관리자 확인 중
 *          02: 관리자 반려
 *          03: 관리자 승인 완료
 */

/**
 * @name receiptStatCd
 * @description 영수증 등록 상태 코드
 * @summary 00: 등록된 이미지 없음
 *          01: 등록된 이미지 있음
 */

export default function RpyCnclResult({
  adminReqStatCd,
  execDt,
  bankNm,
  receiptStatCd,
  loanNo,
  handleClickEnrollReceipt,
}: {
  adminReqStatCd: "00" | "01" | "02" | "03";
  execDt?: string;
  bankNm?: string;
  receiptStatCd?: string;
  loanNo?: string;
  handleClickEnrollReceipt?: () => void;
}) {
  // 대출실행일이 현재보다 과거이면 true, 같거나 미래이면 false
  const isPast = getCompareWithToday(execDt) === "past";

  // 상환영수증 확인 중
  if (adminReqStatCd === "01")
    return (
      <div className="flex w-full justify-between">
        <PayProceeding text={"상환영수증 확인 중"} />
      </div>
    );

  // 관리자 승인 완료
  if (adminReqStatCd === "03") return <PaySuccess text="완료" />;

  // 관리자 반려
  if (adminReqStatCd === "02")
    return (
      <div className="px-5">
        {receiptStatCd === "00" ? (
          <CtaButton
            size={Size.Large}
            state="Default"
            disabled={isPast} // D+1일 이면 비활성화
            onClick={handleClickEnrollReceipt}
          >
            {bankNm === "기타" ? "이체" : "상환"}영수증 재등록
          </CtaButton>
        ) : (
          <SecondaryButton
            size={Size.Large}
            disabled={isPast} // D+1일 이면 비활성화
            onClick={handleClickEnrollReceipt}
          >
            {bankNm === "기타" ? "이체" : "상환"}영수증 재등록
          </SecondaryButton>
        )}
      </div>
    );

  // 관리자 요청 전(최초 상태)
  return (
    <div className="px-5">
      {receiptStatCd === "00" ? (
        <CtaButton
          size={Size.Large}
          state="Default"
          disabled={isPast} // D+1일 이면 비활성화
          onClick={handleClickEnrollReceipt}
        >
          {bankNm === "기타" ? "이체" : "상환"}영수증 등록
        </CtaButton>
      ) : (
        <SecondaryButton
          size={Size.Large}
          disabled={isPast} // D+1일 이면 비활성화
          onClick={handleClickEnrollReceipt}
        >
          {bankNm === "기타" ? "이체" : "상환"}영수증 등록
        </SecondaryButton>
      )}
    </div>
  );
}
