"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { CtaButton } from "@components/button";
import { useFetchApi } from "@hooks";
import { estimateSaveAtom } from "@stores";
import { flutterFunc } from "@utils/flutterUtil";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import SchdlTime from "@app/my-case/estm/info/schdl/SchdlTime";
import "swiper/css";

export default function SchdlPage() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const loanNo = queryParams.get("loanNo");
  const [clientForm, setEstimateForm] = useAtom(estimateSaveAtom);
  const [selectedTime, setSelectedTime] = useState(`${clientForm.schdTm}`);
  const [selectedTimeFormchange, setSelectedTimeFormchange] = useState(
    `${clientForm.schdTm}`
  );
  const [isShow, setIsShow] = useState(false);
  const { fetchApi } = useFetchApi();
  const [selectedHourIndex, setSelectedHourIndex] = useState("");
  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState("");

  /* 견적서 최초 데이터 불러오기 */
  const { data: schdlData, mutate: getSchdlData } = useMutation({
    mutationKey: ["trreg-searchtrregbfestm"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchtrregdecdestm/${loanNo}`,
        method: "post",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("schdlData", res);
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  /** 잔금일 포맷 */
  const getDate =
    schdlData?.searchDbtrInfo?.execDtmmdd.slice(0, 3) +
    " " +
    schdlData?.searchDbtrInfo?.execDtmmdd.slice(3);

  /** 시간 저장 */
  const SaveTime = useCallback(() => {
    const formetHour = selectedHourIndex
      ? selectedHourIndex.padStart(2, "0")
      : "00";
    const formetMinute = selectedMinuteIndex
      ? selectedMinuteIndex.padStart(2, "0")
      : "00";

    setSelectedTime(`${formetHour}:${formetMinute}`);
    setSelectedTimeFormchange(`${formetHour}시 ${formetMinute}분`);
  }, [selectedHourIndex, selectedMinuteIndex]);

  useEffect(() => {
    getSchdlData();
  }, [getSchdlData]);

  return (
    <section className="px-4">
      <Typography
        className="pt-9"
        color={"text-kos-gray-800"}
        type={TypographyType.H2}
      >
        잔금시간을 선택해주세요
      </Typography>
      <Input.InputContainer className="mt-6">
        <Input.Label htmlFor="reason">잔금일</Input.Label>
        <Input.InputField
          inputType="text"
          disabled={true}
          value={
            schdlData?.searchDbtrInfo?.textDay == undefined
              ? ""
              : `${getDate} ${schdlData?.searchDbtrInfo?.textDay}`
          }
        />
      </Input.InputContainer>
      <Input.InputContainer className="mt-5">
        <Input.Label htmlFor="reason">잔금시간</Input.Label>
        <div
          onClick={() => {
            setIsShow(true);
            flutterFunc({
              mode: "BOTTOM",
              data: {
                type: "false",
              },
            });
          }}
        >
          <Input.InputField
            inputType="text"
            placeholder="시간 선택"
            readOnly
            value={selectedTimeFormchange}
          />
        </div>
      </Input.InputContainer>

      {isShow && (
        <SchdlTime
          SaveTime={SaveTime}
          setIsShow={setIsShow}
          clientForm={clientForm}
          setSelectedHourIndex={setSelectedHourIndex}
          setSelectedMinuteIndex={setSelectedMinuteIndex}
        />
      )}

      <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white shadow-[0px_-4px_20px_0px_rgba(204,_204,_204,_0.3)]">
        <CtaButton
          size="XLarge"
          disabled={selectedTime === ""}
          state={"On"}
          onClick={() => {
            setEstimateForm((prev) => ({
              ...prev,
              execDtmmdd: getDate,
              schdTm: selectedTime,
            }));
            router.push(`/my-case/estm/info/list?loanNo=${loanNo}&isDDay=true`);
          }}
        >
          다음
        </CtaButton>
      </div>
    </section>
  );
}
