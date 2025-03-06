"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Typography } from "@components";
import { membAtom } from "@stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { WooriHeader } from "@components/woori-layout";
import { TypographyType } from "@components/typography/Constant";
import { CheckboxGroup } from "@components/checkbox";

const CHECK_LIST_DATA = [
  {
    id: "terms-of-uses",
    label: "서비스 이용약관",
    path: "/",
    required: true,
  },
];

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
  const router = useRouter();
  const [isAllCheck, setIsAllCheck] = useState(false);

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
  const loanNo = loanNoParams.loanNo ? loanNoParams.loanNo.toString() : "";
  const params = new URLSearchParams();
  params.append("loanNo", loanNo);

  return (
    <>
      <WooriHeader />

      <form
        id="form1"
        name="form1"
        onSubmit={handleKcbOpen}
        className="flex flex-1"
      >
        <div className="flex flex-1 flex-col justify-between w-full pb-8 px-4">
          <div>
            <Typography
              className="py-6"
              color="text-kos-gray-800"
              type={TypographyType.H2}
            >
              본인 확인이 필요합니다.
            </Typography>

            <CheckboxGroup
              id="all"
              label="전체 동의"
              dataSet={CHECK_LIST_DATA}
              setIsAllCheck={setIsAllCheck}
            />
          </div>

          <div className="w-full">
            <Button.CtaButton
              type="submit"
              size="XLarge"
              state="Woori"
              disabled={!isAllCheck}
            >
              동의하고 계속하기
            </Button.CtaButton>
          </div>
        </div>
        {/*<div className="p-4">*/}
        {/*  <ul>*/}
        {/*    <li className="flex items-center justify-between">*/}
        {/*      <Typography*/}
        {/*        color={"text-kos-brown-500"}*/}
        {/*        type={Typography.TypographyType.H3}*/}
        {/*        className="break-keep"*/}
        {/*      >*/}
        {/*        차주 정보*/}
        {/*      </Typography>*/}

        {/*      <button*/}
        {/*        type="button"*/}
        {/*        onClick={() => {*/}
        {/*          router.push(*/}
        {/*            `/view/searchcntr/changeinfo?${params.toString()}`*/}
        {/*          );*/}
        {/*        }}*/}
        {/*        style={{*/}
        {/*          boxShadow:*/}
        {/*            "3px 4px 12px 0px rgba(161, 161, 161, 0.10), 14px 16px 21px 0px rgba(161, 161, 161, 0.09), 87px 101px 37px 0px rgba(161, 161, 161, 0.00)",*/}
        {/*        }}*/}
        {/*        className="_flex-center w-[100px] h-[35px] mt-2 py-3 bg-kos-orange-500 rounded-xl text-base text-kos-white"*/}
        {/*      >*/}
        {/*        차주명 수정*/}
        {/*      </button>*/}
        {/*    </li>*/}

        {/*    <li*/}
        {/*      className={`flex justify-between items-start transition-all ease-in-out mt-4 py-1.5`}*/}
        {/*    >*/}
        {/*      <Typography*/}
        {/*        color={"text-kos-gray-600"}*/}
        {/*        type={Typography.TypographyType.B2}*/}
        {/*      >*/}
        {/*        차주*/}
        {/*      </Typography>*/}
        {/*      <div className="basis-2/3 flex justify-end text-end items-center gap-2">*/}
        {/*        <Typography*/}
        {/*          color={"text-kos-gray-800"}*/}
        {/*          type={Typography.TypographyType.B1}*/}
        {/*          className="break-keep"*/}
        {/*        >*/}
        {/*          {membData?.dbtrNm}*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}

        {/*    <li*/}
        {/*      className={`flex justify-between items-start transition-all ease-in-out py-1.5`}*/}
        {/*    >*/}
        {/*      <Typography*/}
        {/*        color={"text-kos-gray-600"}*/}
        {/*        type={Typography.TypographyType.B2}*/}
        {/*      >*/}
        {/*        주소*/}
        {/*      </Typography>*/}
        {/*      <div className="basis-2/3 flex justify-end text-end items-center gap-2">*/}
        {/*        <Typography*/}
        {/*          color={"text-kos-gray-800"}*/}
        {/*          type={Typography.TypographyType.B1}*/}
        {/*          className="break-keep"*/}
        {/*        >*/}
        {/*          {membData?.lndThngAddr}*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}

        {/*    <li*/}
        {/*      className={`flex justify-between items-start transition-all ease-in-out py-1.5`}*/}
        {/*    >*/}
        {/*      <Typography*/}
        {/*        color={"text-kos-gray-600"}*/}
        {/*        type={Typography.TypographyType.B2}*/}
        {/*      >*/}
        {/*        대출명*/}
        {/*      </Typography>*/}
        {/*      <div className="basis-2/3 flex justify-end text-end items-center gap-2">*/}
        {/*        <Typography*/}
        {/*          color={"text-kos-gray-800"}*/}
        {/*          type={Typography.TypographyType.B1}*/}
        {/*          className="break-keep"*/}
        {/*        >*/}
        {/*          {membData?.lndPrdtNm}*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}

        {/*    <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">*/}
        {/*      <CtaButton type="submit" size="XLarge" state="On">*/}
        {/*        본인 인증하기*/}
        {/*      </CtaButton>*/}
        {/*    </div>*/}
        {/*  </ul>*/}
        {/*</div>*/}
        <input
          type="hidden"
          name="tc"
          value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"
        />
        <input type="hidden" name="cp_cd" value={`${kcbDataList?.kcbCpCd}`} />
        <input type="hidden" name="mdl_tkn" value={`${kcbDataList?.mdlTkn}`} />
        <input type="hidden" name="loan_no" value={`${loanNoParams.loanNo}`} />
        <input type="hidden" name="target_id" value="" />
      </form>
    </>
  );
}
