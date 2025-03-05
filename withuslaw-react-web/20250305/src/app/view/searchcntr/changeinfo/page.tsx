"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@components";
import { ModalHeader, ModalLayout } from "@components/full-modal";
import { useFetchApi } from "@hooks";
import { toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

export default function Page() {
  const { fetchApi } = useFetchApi();
  const queryParams = useSearchParams();
  const loanNo = queryParams.get("loanNo");
  const router = useRouter();
  const [bdayValue, setBdayValue] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isError, setIsError] = useState(false);
  const callToast = useSetAtom(toastState);
  const [body, setBody] = useState({
    loanNo: loanNo,
    dbtrNm: "",
    dbtrBirthDt: "",
  });

  /* 차주명 변경 저장하기 */
  const { data, mutate } = useMutation({
    mutationKey: ["trreg-searchtrregdecdestm"],
    mutationFn: () =>
      fetchApi({
        url: `https://appwooridev.kosapp.co.kr/api/view/chgdbtr`,
        method: "post",
        body: body,
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("차주명 변경 저장하기", res);
      callToast({
        msg: "추가정보 등록이 완료되었습니다.",
        status: "success",
      });
      setTimeout(() => {
        router.push(
          `https://appwooridev.kosapp.co.kr/view/searchcntr/${loanNo}`
        );
      }, 1000);
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  useEffect(() => {
    const updatedBody = {
      loanNo: loanNo,
      dbtrNm: nameInput,
      dbtrBirthDt: bdayValue,
    };

    setBody(updatedBody);
  }, [loanNo, nameInput, bdayValue]);

  return (
    <ModalLayout>
      <ModalHeader
        title="차주 정보 수정"
        onClick={() =>
          router.push(
            `https://appwooridev.kosapp.co.kr/view/searchcntr/${loanNo}`
          )
        }
        showCloseBtn={true}
      />
      <section className="flex flex-col items-center h-screen px-4 pt-6">
        <div className="w-full max-w mt-5 mb-10">
          <Input.InputContainer>
            <Input.Label htmlFor="name">차주명 입력</Input.Label>
            <Input.InputField
              id="name"
              inputType="text"
              placeholder="차주명 입력"
              maxLength={10}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
          </Input.InputContainer>
        </div>
        <div className="w-full max-w mt-1">
          <Input.InputContainer>
            <Input.Label htmlFor="bday">주민등록번호 입력</Input.Label>
            <Input.InputField
              id="bday"
              inputType="number"
              placeholder="주민등록번호 입력"
              maxLength={13}
              thousandSeparator={false}
              leadingZero={true}
              onChange={(e) => {
                if (e.target.value.length < 13) {
                  setIsError(true);
                } else {
                  setIsError(false);
                }
                setBdayValue(e.target.value);
              }}
            />
            {isError && (
              <Input.Description>
                * -부분은 빼고 입력해주세요.
              </Input.Description>
            )}
          </Input.InputContainer>
        </div>
      </section>
      <section className="fixed bottom-0 w-full p-4 bg-kos-white">
        <div className="bottom-0 flex justify-center mt-[15px]">
          <button
            onClick={() => {
              mutate();
            }}
            style={{
              boxShadow:
                "3px 4px 12px 0px rgba(161, 161, 161, 0.10), 14px 16px 21px 0px rgba(161, 161, 161, 0.09), 87px 101px 37px 0px rgba(161, 161, 161, 0.00)",
            }}
            className="_flex-center w-[100px] h-[35px] mt-2 py-3 bg-kos-orange-500 rounded-xl text-base text-kos-white"
          >
            수정
          </button>
        </div>
      </section>
    </ModalLayout>
  );
}
