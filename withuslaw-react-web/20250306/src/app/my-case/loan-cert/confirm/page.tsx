"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Size, ToastType } from "@components/Constants";
import { Alert, Button, Input, Loading, Typography } from "@components";
import { useDisclosure, useFetchApi } from "@hooks";
import { usePayInfoData } from "@libs";
import { caseDetailAtom, toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import Timer from "@app/my-case/loan-cert/confirm/Timer";
import useTimer from "@app/my-case/loan-cert/confirm/useTimer";

const TIMER_INITIAL_SECONDS = 180;
const INVAID_RESEND_SECONDS = 30;

export default function MY_PR_003P() {
  const { time, reset } = useTimer(TIMER_INITIAL_SECONDS);
  const [authNum, setAuthNum] = useState("");
  const { isOpen, open, close } = useDisclosure();
  const [isError, setIsError] = useState(false);
  const callToast = useSetAtom(toastState);
  const router = useRouter();
  const { loanNo, regType, kndCd, progGbInfo } = useAtomValue(caseDetailAtom);
  const { refetch } = usePayInfoData({ loanNo });
  const [payTp, setpayTp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update the payTp state based on progGbInfo.nextProgNm
    if (progGbInfo.currProgNm === "상환말소") {
      setpayTp("N");
    } else {
      setpayTp("Y");
    }
  }, [progGbInfo.currProgNm]);

  const { fetchApi } = useFetchApi();
  const { mutate: resendSmsAuthNum } = useMutation({
    mutationKey: ["send-sms-auth"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/mesg/smsauthnumsend/${loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      callToast({
        msg: "승인번호가 재전송되었습니다",
        status: ToastType.success,
      });
      setAuthNum("");
      setIsError(false);
    },
  });
  const { mutate: checkSmsAuthNum } = useMutation({
    mutationKey: ["check-sms-auth"],
    mutationFn: async () => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/owshcnfmcmpl`,
        method: "post",
        body: {
          loanNo: loanNo,
          authNum: authNum,
          payTp: payTp,
          kndCd: kndCd, // 1:매매,2:설정,3.말소
        },
      });
      return response.json();
    },

    onSuccess: (res) => {
      console.log(res);
      if (res.code === "00") {
        requestAllPayment();
        // router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
      } else {
        setIsError(true);
      }
    },
  });

  const {
    mutate: requestAllPayment,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["request-all-payment", loanNo],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/SlrDbtrPayReq?loanNo=${loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    gcTime: Infinity,
    onSuccess: (res) => {
      setIsLoading(false);
      if (res.code === "00") router.push(`/my-case/pay-request/loan-info`);
      refetch();
    },
    onError: (error) => {
      setIsLoading(false);
      console.log("error", error);
    },
  });

  const resend = () => {
    if (time > TIMER_INITIAL_SECONDS - INVAID_RESEND_SECONDS) {
      open();
      return;
    }

    reset();
    resendSmsAuthNum();
  };

  const handleAuthenticate = () => {
    // 승인 번호 일치 여부 체크
    checkSmsAuthNum();
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col justify-between grow w-full h-full">
        <div>
          <Typography
            type={Typography.TypographyType.H1}
            color="text-kos-gray-800"
          >
            차주에게 전송된
            <br />
            승인번호 6자리를 입력해주세요
          </Typography>
          <Input.InputContainer className="mt-11 relative">
            <Input.Label
              htmlFor="authNum"
              rightItem={
                <Timer
                  time={time}
                  color={isError ? "text-kos-red-500" : undefined}
                />
              }
            >
              승인번호
            </Input.Label>
            <Input.TextInput
              placeholder="번호입력"
              type="tel"
              isError={isError}
              disabled={time === 0}
              maxLength={6}
              onChange={(e) => setAuthNum(e.target.value)}
              onClick={() => setIsError(false)}
              name="authNum"
              value={authNum}
            />
            {time === 0 && (
              <Input.Description isError={time === 0}>
                입력시간이 초과되었습니다
              </Input.Description>
            )}
            {isError && (
              <Input.Description isError={isError}>
                승인번호가 일치하지 않습니다
              </Input.Description>
            )}
            <Button.SecondaryButton
              size="Medium"
              className={`absolute ${
                time === 0 || isError ? "bottom-[2.2rem]" : "bottom-3"
              } right-2`}
              onClick={resend}
            >
              재전송
            </Button.SecondaryButton>
          </Input.InputContainer>
        </div>
        <footer>
          <Button.CtaButton
            size={Size.XLarge}
            state={"On"}
            disabled={authNum.length !== 6 || isLoading}
            onClick={handleAuthenticate}
          >
            인증하기
          </Button.CtaButton>
        </footer>
        <Alert
          isOpen={isOpen}
          title={"1회 승인번호 발송 후\n30초 이후에 재전송이 가능합니다"}
          confirmText={"확인"}
          confirmCallBack={close}
          bodyText={"잠시 후 다시 요청해주세요."}
        />
      </div>
    </>
  );
}
