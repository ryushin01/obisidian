import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Size } from "@components/Constants";
import { Button } from "@components";
import {useFlutterBridgeFunc} from "@hooks";
import useGeoLocation from "@hooks/useGeoLocation";
import { getCompareWithToday } from "@utils/dateUtil";
import { toastState } from "@stores";
import { useSetAtom } from "jotai";
import { TailSpin } from "react-loader-spinner";
import PayFail from "@app/my-case/PayFail";
import PayProceeding from "@app/my-case/PayProceeding";
import PaySuccess from "@app/my-case/PaySuccess";

declare global {
  interface Window {
    receiveLocationData?: (locationData: {
      latitude: number;
      longitude: number;
    }) => void;
  }
}

/**
 * statCd
 * 00 : 상환금 요청
 * 01 : 버튼 비활성화(지급 처리중(요청상태))
 * 99 : 지급 실패
 * 02 : 상환영수증 등록
 * 03, 04 : 상환영수증 확인 중
 * 05 : 상환영수증 반려
 * 10 : 완료 (상환영수증 승인 완료)
 */

export default function RpyCnclResult({
  statCd,
  handleOpenLocationSheet,
  handlePayRefundRequest,
  handleClickEnrollReceipt,
  loanNo,
  masterStatCd,
  bankCd,
  execDt,
}: {
  statCd: "" | "00" | "01" | "99" | "02" | "03" | "04" | "05" | "10";
  /** 02:설정 의뢰서 등록 10:대출 실행 14:상환금 처리 20:접수번호 등록 40:설정서류 */
  masterStatCd?: string;
  handleOpenLocationSheet: () => void;
  handlePayRefundRequest: () => void;
  handleClickEnrollReceipt: () => void;
  loanNo: string;
  bankCd: string;
  execDt?: string;
}) {
  const callToast = useSetAtom(toastState);
  const location = useGeoLocation();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [isLocationLoaded, setIsLocationLoaded] = useState(false); // location 로드 상태 관리
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  const router = useRouter();

  // 대출실행일이 현재보다 과거이면 true, 같거나 미래이면 false
  const isPast = getCompareWithToday(execDt) === "past";

  useEffect(() => {
    // 위치가 로드되면 상태 업데이트
    if (location.loaded) {
      const savedLocationStatus = localStorage.getItem("isLocationLoaded");
      setIsLocationLoaded(true);
      setIsLoading(false); // 로딩 종료
    } else {
      setIsLoading(true); // 로딩 애니메이션
      localStorage.setItem("isLocationLoaded", "false");
    }
  }, [location.loaded]);

  useEffect(() => {
    if (
      (value?.mode === "IMAGE" || value?.mode === "IMAGE_VIEW") &&
      value?.data?.code === "00"
    ) {
      setTimeout(() => {
        router.refresh();
      }, 500);
    }
  }, [value]);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
  }, []);

  // masterStatCd가 14보다 크고 51보다 작으면 버튼 표시x
  // if (masterStatCd !== undefined && masterStatCd > "14" && masterStatCd < "51")
  //   return "";

  if (statCd === "99") {
    return (
      <div className="flex justify-between">
        <PayFail errCd={statCd} />
        <Button.CtaButton
          size={Size.Small}
          state={"Default"}
          disabled={isPast} // D+1일 이면 비활성화
          onClick={handlePayRefundRequest}
        >
          다시 요청하기
        </Button.CtaButton>
      </div>
    );
  }
  // test
  if (statCd === "02")
    return (
      <div className="px-5">
        <Button.SecondaryButton
          size={Size.Medium}
          disabled={isPast} // D+1일 이면 비활성화
          style={{ width: "100%", padding: "10px 0" }}
          onClick={handleClickEnrollReceipt}
        >
          상환영수증 등록
        </Button.SecondaryButton>
      </div>
    );
  // product
  // if (statCd === "02")
  //   return (
  //     <div className="px-5">
  //       <Button.SecondaryButton
  //         size={Size.Medium}
  //         style={{ width: "100%", padding: "10px 0" }}
  //         onClick={handleClickEnrollReceipt}
  //       >
  //         상환영수증 등록
  //       </Button.SecondaryButton>
  //     </div>
  //   );
  if (statCd === "" || statCd === "01")
    // return <PayProceeding text={"상환금 지급 요청중"} />;
    return "";

  if (statCd === "03" || statCd === "04")
    return (
      <div className="flex w-full justify-between">
        <PayProceeding text={"상환영수증 확인 중"} />
        {/* <div className="basis-1/3">
          <Button.SecondaryButton
            size={Size.Medium}
            style={{ width: "100%", padding: "10px 0px" }}
            onClick={() => {
              //@ts-ignore
              window.flutter_inappwebview.callHandler("flutterFunc", {
                // @ts-ignore
                mode: "IMAGE_VIEW",
                data: {
                  wkCd: "IMAGE_BIZ",
                  attcFilCd:  bankCd  === "020" ? "2" : "3",
                  loanNo: loanNo,
                },
              });
            }}
          >
            영수증확인
          </Button.SecondaryButton>
        </div> */}
      </div>
    );

  if (statCd === "05")
    return (
      <div className="flex justify-between">
        <PayFail text="반려" />
        <Button.CtaButton
          size={Size.Small}
          disabled={isPast} // D+1일 이면 비활성화
          state="None"
          onClick={() => {
            // @ts-ignore
            window.flutter_inappwebview.callHandler("flutterFunc", {
              mode: "IMAGE_VIEW",
              data: {
                wkCd: "IMAGE_BIZ",
                attcFilCd: bankCd === "020" ? "2" : "3",
                loanNo: loanNo,
                returnYn: "Y",
                bankCd: bankCd, //bankCd 추가
              },
            });
          }}
        >
          상환영수증 재등록
        </Button.CtaButton>
      </div>
    );
  // if (statCd === "05")
  //   return (
  //     <div className="flex justify-between">
  //       <PayFail text={"반려"} />
  //       <Button.CtaButton
  //         size={Size.Small}
  //         state="None"
  //         onClick={handleClickEnrollReceipt}
  //       >
  //         상환영수증 재등록
  //       </Button.CtaButton>
  //     </div>
  //   );

  // 상태코드가 "10"이면 완료 페이지 표시
  if (statCd === "10") return <PaySuccess text="완료" />;
  const handleClick = () => {
    const savedLocationStatus = localStorage.getItem("isLocationLoaded");
    const isLocationLoadedFromStorage = savedLocationStatus === "true";

    if (!isLocationLoadedFromStorage) {
      callToast({
        msg: "위치 정보가 확인되지 않습니다.\n다시 시도해주세요.",
        status: "notice",
      });
    } else {
      handleOpenLocationSheet();
      setIsLoading(false); // 바텀 시트가 열린 후 로딩 상태 해제
    }
  };

  return (
    <div className="px-5">
      {/* 버튼 클릭 후 로딩 상태일 때 로딩 애니메이션 표시 */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <TailSpin color="#FABE00" width={50} height={50} />
        </div>
      ) : (
        // 로딩 중이 아닐 때 버튼 표시
        <Button.CtaButton
          size={Size.Medium}
          state="Default"
          disabled={isPast} // D+1일 이면 비활성화
          onClick={handleClick}
        >
          상환금 요청하기
        </Button.CtaButton>
      )}
    </div>
  );
}
