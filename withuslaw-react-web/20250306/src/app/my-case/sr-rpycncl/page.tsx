"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ATTC_FIL_CD } from "@/app/Constants";
import { Button, Loading, Typography } from "@components";
import { useFetchApi, useFlutterBridgeFunc } from "@hooks";
import { caseDetailAtom, toastState } from "@stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import PayGroupItem from "@app/my-case/PayGroupItem";
import RpyCnclResult from "@app/my-case/sr-rpycncl/RpyCnclResult";
import PayFail from "@app/my-case/PayFail";

const WK_CD = {
  IMAGE_BIZ: "IMAGE_BIZ",
  IMAGE_CUST: "IMAGE_CUST",
};

export default function SR_RPYCNCL() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchApi } = useFetchApi();
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  const callToast = useSetAtom(toastState);
  const { loanNo, rgstrGbCd } = useAtomValue(caseDetailAtom);

  /**
   * @name adminReqStatCd
   * @description 관리자 요청 상태 코드
   * @summary 00: 관리자 요청 전
   *          01: 관리자 확인 중
   *          02: 관리자 반려
   *          03: 관리자 승인 완료
   */

  // SR 상환 말소 정보 조회
  const { data: srRepayInfo, refetch } = useQuery({
    queryKey: ["search-sr-repay-info"],
    queryFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/reapay/searchsrrepayinfo?loanNo=${loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    enabled: !!loanNo,
  });

  // SR 상환영수증 등록
  const { mutate: saveRefundReceipt } = useMutation({
    mutationKey: ["wk-img-rslt-trans"],
    mutationFn: async (body: {
      loanNo: string;
      wkCd: string;
      attcFilCd: string;
      bankCd: string;
    }) => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/rgstr/wkimgrsltadminreq`,
        method: "post",
        body: body,
      });

      setIsLoading(false);

      return response.json();
    },
    onSuccess(result) {
      // 업로드 사진 등록 > 토스트 팝업 > 사건 상세 이동
      if (result.code === "00") {
        callToast({
          msg: "관리자 확인 후 최종 제출됩니다.",
          status: "success",
          dim: true,
        });

        setTimeout(() => {
          router.push(`/my-case/cntr/${loanNo}?regType=${rgstrGbCd}`);
        }, 3000);
      }
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  let copyArray;
  let isUploadEveryImages;

  if (srRepayInfo !== undefined) {
    // NOTE: 등록하기 버튼 비활성화 처리 로직(1~3)
    // 1. 상환은행 리스트를 복제하여 새로운 배열 생성
    copyArray = [...srRepayInfo.repayBankInfoList];

    // 2. 상환은행 리스트에 은행 2개 이상 존재 시 라스트 인덱스(기타) 제외
    if (srRepayInfo?.repayBankInfoList.length > 1) {
      copyArray.length = copyArray.length - 1;
    }

    // 3. 은행별 이미지 한 장 이상 등록 여부 확인
    isUploadEveryImages = copyArray!.every(
      (item) => item.receiptStatCd === "01"
    );
  }

  useEffect(() => {
    if (
      (value?.mode === "IMAGE" || value?.mode === "IMAGE_VIEW") &&
      value?.data?.code === "00"
    ) {
      setTimeout(() => {
        refetch();
      }, 500);
    }
  }, [value]);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
    refetch();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="pt-5 pb-24">
        <section className="flex flex-col px-4 gap-y-4">
          <Typography
            type={Typography.TypographyType.H1}
            color="text-kos-gray-800"
          >
            각 은행별 대출 잔액이 확인되는
            <br />
            상환영수증을 등록해 주세요
          </Typography>
          <Typography
            type={Typography.TypographyType.B1}
            color="text-kos-gray-700"
          >
            상환내역이 없으실 경우 대출완납증명서와 대출금 이체 영수증을 등록해
            주세요.
          </Typography>
        </section>

        <section className="flex flex-col w-full divide-y">
          <PayGroupItem
            containerClassName="px-4 pt-10 pb-6"
            label="총 대출금"
            payAmt={srRepayInfo?.totalAmount}
          >
            {/* 괸라자 확인 중, 관리자 승인 완료 시 */}
            {(srRepayInfo?.adminReqStatCd === "01" ||
              srRepayInfo?.adminReqStatCd === "03") && (
              <RpyCnclResult
                adminReqStatCd={srRepayInfo?.adminReqStatCd}
                execDt={srRepayInfo?.execDt}
              />
            )}
          </PayGroupItem>
        </section>

        {/* 관리자 요청 전, 관리자 반려 시 */}
        {(srRepayInfo?.adminReqStatCd === "00" ||
          srRepayInfo?.adminReqStatCd === "02") && (
          <section className="pt-3 border-t border-kos-gray-200">
            {/* 관리자 반려 시 */}
            {srRepayInfo?.adminReqStatCd === "02" && (
              <div className="px-4 py-6">
                <PayFail text={"반려"} />
              </div>
            )}

            {srRepayInfo?.repayBankInfoList?.map(
              (bank: { bankNm: string; receiptStatCd: string }) => {
                const { bankNm, receiptStatCd } = bank;

                return (
                  <PayGroupItem
                    key={bankNm}
                    containerClassName="px-4 py-3"
                    label={`${bankNm} 상환`}
                    required={
                      srRepayInfo?.repayBankInfoList.length === 1 ||
                      (srRepayInfo?.repayBankInfoList.length > 1 &&
                        bankNm !== "기타")
                    }
                  >
                    <RpyCnclResult
                      adminReqStatCd={srRepayInfo?.adminReqStatCd}
                      execDt={srRepayInfo?.execDt}
                      bankNm={bankNm}
                      receiptStatCd={receiptStatCd}
                      loanNo={loanNo}
                      handleClickEnrollReceipt={() => {
                        //@ts-ignore
                        window.flutter_inappwebview.callHandler("flutterFunc", {
                          mode: "IMAGE",
                          data: {
                            wkCd: "IMAGE_BIZ",
                            attcFilCd: "2",
                            loanNo: loanNo,
                            bankCd: bankNm,
                            lndHndgSlfDsc: "2",
                            ...(srRepayInfo?.adminReqStatCd === "02" && {
                              returnYn: "Y",
                            }),
                          },
                        });
                      }}
                    />
                  </PayGroupItem>
                );
              }
            )}
          </section>
        )}

        {/* 관리자 요청 전, 관리자 반려 시 */}
        {(srRepayInfo?.adminReqStatCd === "00" ||
          srRepayInfo?.adminReqStatCd === "02") && (
          <section
            className="fixed bottom-0 inset-x-0 z-10 p-4 bg-kos-white"
            style={{
              boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)",
            }}
          >
            <Button.CtaButton
              buttonType={"submit"}
              size={"XLarge"}
              state="On"
              disabled={!isUploadEveryImages}
              onClick={() => {
                saveRefundReceipt({
                  loanNo: loanNo,
                  wkCd: WK_CD["IMAGE_BIZ"],
                  attcFilCd: ATTC_FIL_CD["2"],
                  bankCd: "020",
                });
              }}
            >
              등록하기
            </Button.CtaButton>
          </section>
        )}
      </div>
    </>
  );
}
