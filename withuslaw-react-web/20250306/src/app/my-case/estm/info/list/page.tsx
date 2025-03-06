"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RGSTR_GB_CD } from "@constants";
import { Alert, Divider, Loading } from "@components";
import { CtaButton } from "@components/button";
import { useDisclosure, useFetchApi } from "@hooks";
import {
  authAtom,
  estimateSaveAtom,
  estmInfoAtom,
  routerAtom,
  toastState,
} from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  EstimateInfo,
  EstimateMemb,
  EstimateList,
  EstimateSignList,
} from "@app/my-case/estm/info/common";
import makeSeverForm from "@app/my-case/estm/info/makeServerForm";
import useSaveTrregBfEstm from "@app/my-case/estm/info/useSaveTrregBfEstm";

export default function EstimateListPage() {
  const router = useRouter();
  const { fetchApi } = useFetchApi();
  const callToast = useSetAtom(toastState);
  const { isOpen: DDayModal, open, close } = useDisclosure();
  const authInfo = useAtomValue(authAtom);
  const pageRouter = useAtomValue(routerAtom);
  const estmInfoData = useAtomValue(estmInfoAtom);
  const queryParams = useSearchParams();
  const loanNo = queryParams.get("loanNo");
  const isDDay = queryParams.get("isDDay") === "true";
  const [clientForm, setClientForm] = useAtom(estimateSaveAtom);
  const [isLoading, setIsLoading] = useState(false);

  // 현재시간 불러오기
  const currentDate = new Date();
  const hours = currentDate.getHours();
  // 00시 ~ 08시 사이인제 체크
  const isBetween = hours >= 0 && hours < 8;

  // *****00시 ~ 08시에 견적서 페이지 진입시 토스트 팝업 노출****
  useEffect(() => {
    if (isBetween) {
      callToast({
        msg: "견적서 발송은 오전 8시 이후에 가능합니다.",
        status: "notice",
      });
      setTimeout(() => {
        //@ts-ignore
        window.flutter_inappwebview.callHandler("flutterFunc", {
          // @ts-ignore
          mode: "GO_HOME",
        });
      }, 1000);
    }
  }, [hours]);

  /* 견적서 확정하기 */
  const { mutate: saveDecide } = useMutation({
    mutationKey: ["trreg-searchtrregbfestm"],
    mutationFn: async (serverForm: TObj) => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/proctrregdecdestm`,
        method: "post",
        body: { ...serverForm, loanNo, bizNo: authInfo.bizNo },
      });

      setIsLoading(false);
      close();

      return response.json();
    },
    onSuccess: (res) => {
      console.log("schdlData", res);
      const movePath = `/my-case/cntr/${loanNo}?regType=${RGSTR_GB_CD["01"]}`;
      if (res.code === "00") {
        callToast({
          msg: "차주에게 확정된 견적서가 발송되었습니다.",
          status: "success",
          dim: true,
          afterFunc: move(movePath),
        });
      } else if (res.code === "99") {
        callToast({
          msg: res.msg,
          status: "error",
          dim: true,
          afterFunc: move(movePath),
        });
      } else {
        callToast({
          msg: "견적서 저장에 실패하였습니다.",
          status: "error",
        });
      }
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  const move = (movePath: string) => {
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "BOTTOM_TABVIEW_MOVE",
      data: {
        type: "1",
        url: movePath,
      },
    });
    setTimeout(() => {
      router.push(
        `/my-case/cntr/${clientForm.loanNo}?regType=${RGSTR_GB_CD["01"]}`
      );
    }, 3000);
  };

  const move2 = () => {
    router.push(
      `/my-case/cntr/${clientForm.loanNo}?regType=${RGSTR_GB_CD["01"]}`
    );
  };

  /* 견적서 저장 */
  const onSuccess = () => {
    const movePath = `/my-case/cntr/${clientForm.loanNo}?regType=${RGSTR_GB_CD["01"]}`;

    if (estmInfoData.searchEstmInfoAndCustInfo?.statCd === "10") {
      callToast({
        msg: "차주에게 견적서가 재발송되었습니다.",
        status: "success",
        dim: true,
        // afterFunc: move2(),
      });
      setTimeout(() => {
        router.push(
          `/my-case/cntr/${clientForm.loanNo}?regType=${RGSTR_GB_CD["01"]}`
        );
      }, 3000);
    } else {
      callToast({
        msg: "차주에게 견적서가 발송되었습니다.",
        status: "success",
        dim: true,
        afterFunc: move(movePath),
      });
    }
  };

  const [saveEstmList] = useSaveTrregBfEstm({
    onSuccess,
    loanNo: clientForm.loanNo,
    setIsLoading,
  });

  const handleChangeValue = (key: string, value: string) => {
    setClientForm((prev) => ({ ...prev, [key]: value || "" }));
  };

  /** 총 제세공과금 계산  */
  const calculateTotal = () => {
    const taxKeys = [
      "registTax",
      "localEduTax",
      "specialTax",
      "stampTax",
      "rgstrReqFee",
      "dscntRtAmount",
    ];

    const totalTaxValue = getCommonTotal(taxKeys);
    const formattedTotalTax = isNaN(totalTaxValue) ? 0 : totalTaxValue;

    setClientForm((prev) => ({ ...prev, totalTax: formattedTotalTax }));

    const totalAmount = clientForm.totalFee + totalTaxValue;
    const formattedTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;

    setClientForm((prev) => ({
      ...prev,
      totalAmount: formattedTotalAmount,
    }));
  };

  /** 총 금액 계산  */
  const getCommonTotal = (args: string[]) => {
    let total = 0;

    for (const [key, value] of Object.entries(clientForm)) {
      if (args.includes(key) && typeof value === "string") {
        total = total + parseInt(value.replaceAll(",", ""));
      }
    }
    return total;
  };

  /** 총 법무수수료 계산  */
  const calculateFee = () => {
    const feeKeys = ["fee", "vat"];
    const feeValue = parseFloat(clientForm.fee.replaceAll(",", ""));
    const vatValue = isNaN(feeValue) ? "0" : Math.round((feeValue * 10) / 100);
    handleChangeValue("vat", vatValue.toString());

    setClientForm((prev) => ({
      ...prev,
      totalFee: getCommonTotal(feeKeys),
    }));
  };

  useEffect(() => {
    calculateFee();
  }, [clientForm?.fee, clientForm?.totalFee]);

  useEffect(() => {
    calculateTotal();
  }, [
    clientForm?.totalFee,
    clientForm?.registTax,
    clientForm?.localEduTax,
    clientForm?.specialTax,
    clientForm?.stampTax,
    clientForm?.rgstrReqFee,
    clientForm?.dscntRtAmount,
  ]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full h-full flex flex-col">
        <Alert
          isOpen={DDayModal}
          title={<p>견적서를 확정할까요?</p>}
          cancelText="취소"
          cancelCallBack={close}
          confirmText="확정"
          confirmCallBack={() => {
            // 08시 이후에 국민주택채권이 Null 또는 0일 경우
            if (
              estmInfoData.searchBndDisRt?.disctRt === 0 ||
              estmInfoData.searchBndDisRt?.disctRt === null
            ) {
              callToast({
                msg: "견적서 발송은 국민주택채권 할인율이 생성된 후에 가능합니다.",
                status: "notice",
              });
              return;
            }
            const serverForm = makeSeverForm({ statCd: "20", clientForm });
            saveDecide(serverForm);
          }}
          bodyText={
            <span>
              <strong>수정 및 재발송은 불가하오니,</strong> 충분한 검토 후
              발송해주세요.
            </span>
          }
        />

        <section className="grow flex flex-col">
          <EstimateInfo estmInfoData={estmInfoData} />
          <Divider />

          <div className="grow">
            <div className="h-full">
              <EstimateList
                clientForm={clientForm}
                searchCustBankInfo={estmInfoData.searchCustBankInfo}
                searchBndDisRt={estmInfoData.searchBndDisRt}
              />

              <Divider />

              <EstimateMemb clientForm={clientForm} />

              <Divider />

              <EstimateSignList clientForm={clientForm} />

              <div className="p-4">
                {(() => {
                  switch (true) {
                    case estmInfoData.searchEstmInfoAndCustInfo?.statCd ===
                      "10" && !isDDay:
                      return (
                        <CtaButton
                          size="XLarge"
                          state="On"
                          onClick={() => {
                            // 08시 이후에 국민주택채권이 Null 또는 0일 경우
                            if (
                              estmInfoData.searchBndDisRt?.disctRt === 0 ||
                              estmInfoData.searchBndDisRt?.disctRt === null
                            ) {
                              callToast({
                                msg: "견적서 발송은 국민주택채권 할인율이 생성된 후에 가능합니다.",
                                status: "notice",
                              });
                              return;
                            }
                            const serverForm = makeSeverForm({
                              statCd: "10",
                              clientForm,
                            });
                            saveEstmList(serverForm);
                          }}
                        >
                          재발송하기
                        </CtaButton>
                      );
                    case isDDay:
                      return (
                        <CtaButton
                          size="XLarge"
                          state="On"
                          onClick={() => open()}
                        >
                          확정하기
                        </CtaButton>
                      );
                    default:
                      return (
                        <CtaButton
                          size="XLarge"
                          state="On"
                          onClick={() => {
                            // 08시 이후에 국민주택채권이 Null 또는 0일 경우
                            if (
                              estmInfoData.searchBndDisRt?.disctRt === 0 ||
                              estmInfoData.searchBndDisRt?.disctRt === null
                            ) {
                              callToast({
                                msg: "견적서 발송은 국민주택채권 할인율이 생성된 후에 가능합니다.",
                                status: "notice",
                              });
                              return;
                            }
                            const serverForm = makeSeverForm({
                              statCd: "10",
                              clientForm,
                            });
                            saveEstmList(serverForm);
                          }}
                        >
                          발송하기
                        </CtaButton>
                      );
                  }
                })()}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
