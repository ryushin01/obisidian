"use client";

import React, { useEffect, useState } from "react";
import { Header, Typography } from "@/app/_components";
import { CtaButton } from "@/app/_components/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { membAtom } from "@/app/_store";
import { useSetAtom } from "jotai";

export interface TInfo {
  loanNo: string;
  dbtrNm: string;
  lndThngAddr: string;
  lndPrdtNm: string;
  mvhhdSbmtYn: string;
  rtalSbmtYn: string;
  rrcpSbmtYn: string;
  RtalSbmtYn: string;
  dbtrHpno: string;
}

type TKcb = {
  chkAuthYn: string;
  kcbCpCd: string;
  mdlTkn: string;
  kcbPopUrl: string;
};

export default function Page() {
  const setMembAtom = useSetAtom(membAtom);
  const loanNoParams = useParams();

  const { data: membData, isSuccess } = useQuery({
    queryKey: ["view-searchcntr"],
    queryFn: (): Promise<any> =>
      fetch(
        `https://appwooridev.kosapp.co.kr/api/view/searchcntr/${loanNoParams.loanNo}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((res) => res.data),
  });

  const { data: kcbDataList, mutate } = useMutation({
    mutationKey: ["auth-searchpopupkcbreq"],
    mutationFn: (): Promise<TKcb> =>
      fetch(`https://apidev.kosapp.co.kr/api/auth/searchpopupkcbreq`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  function callKCBAuth() {
    if (kcbDataList && kcbDataList.kcbPopUrl) {
      const form = document.getElementById("form1") as HTMLFormElement;
      if (form) {
        form.action = kcbDataList.kcbPopUrl;
        form.method = "post";
        form.submit();
      }
    } else {
      console.error("KCB 데이터 또는 kcbPopUrl이 유효하지 않습니다.");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setMembAtom(membData);
    }
  }, [isSuccess]);

  useEffect(() => {
    mutate();
  }, [mutate]);

  // 본인인증 팝업 열기
  const handleKcbOpen = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (kcbDataList?.chkAuthYn === "Y") {
      callKCBAuth();
    }
  };

  return (
    <>
      <Header title="설정 서류 등록" isBackButton={false} />

      <form id="form1" name="form1" onSubmit={handleKcbOpen}>
        <div className="p-4">
          <ul>
            <li>
              <Typography
                color={"text-kos-brown-500"}
                type={Typography.TypographyType.H3}
                className="break-keep"
              >
                차주 정보
              </Typography>
            </li>

            <li
              className={`flex justify-between items-start transition-all ease-in-out mt-4 py-1.5`}
            >
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                차주
              </Typography>
              <div className="basis-2/3 flex justify-end text-end items-center gap-2">
                <Typography
                  color={"text-kos-gray-800"}
                  type={Typography.TypographyType.B1}
                  className="break-keep"
                >
                  {membData?.dbtrNm}
                </Typography>
              </div>
            </li>

            <li
              className={`flex justify-between items-start transition-all ease-in-out py-1.5`}
            >
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                주소
              </Typography>
              <div className="basis-2/3 flex justify-end text-end items-center gap-2">
                <Typography
                  color={"text-kos-gray-800"}
                  type={Typography.TypographyType.B1}
                  className="break-keep"
                >
                  {membData?.lndThngAddr}
                </Typography>
              </div>
            </li>

            <li
              className={`flex justify-between items-start transition-all ease-in-out py-1.5`}
            >
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                대출명
              </Typography>
              <div className="basis-2/3 flex justify-end text-end items-center gap-2">
                <Typography
                  color={"text-kos-gray-800"}
                  type={Typography.TypographyType.B1}
                  className="break-keep"
                >
                  {membData?.lndPrdtNm}
                </Typography>
              </div>
            </li>

            <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
              <CtaButton type="submit" size="XLarge" state="On">
                본인 인증하기
              </CtaButton>
            </div>
          </ul>
        </div>
        <input
          type="hidden"
          name="tc"
          value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"
        />
        <input type="hidden" name="cp_cd" value={`${kcbDataList?.kcbCpCd}`} />
        <input type="hidden" name="mdl_tkn" value={`${kcbDataList?.mdlTkn}`} />
        <input type="hidden" name="target_id" value="" />
      </form>
    </>
  );
}
