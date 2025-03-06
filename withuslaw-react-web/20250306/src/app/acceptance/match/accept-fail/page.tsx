"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TypographyType } from "@components/typography/Constant";
import { Input, Typography } from "@components";
import { Checkbox, CtaButton } from "@components/button";
import { useFetchApi } from "@hooks";
import { caseDetailAtom, toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { Sheet } from "react-modal-sheet";

type TSelect = {
  code: string;
  codeNm: string;
};

export type TForm = {
  loanNo: string;
  accClsRsn: string;
};

export default function AcceptFailPage() {
  const router = useRouter();
  const [caseDetail] = useAtom(caseDetailAtom);
  const [body, setBody] = useState({
    loanNo: caseDetail.loanNo,
    accClsRsn: "",
  });
  const callToast = useSetAtom(toastState);
  const defaultSelectValue = "사유 선택";
  const [isChecked, setIsChecked] = useState(false);
  const [currentValue, setCurrentValue] = useState(defaultSelectValue);
  const [reasonInput, setReasonInput] = useState("");
  const [showErrorText, setShowErrorText] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { fetchApi } = useFetchApi();
  const isIos = sessionStorage.getItem("isIos");

  // 사유 선택 리스트
  const { data: withdreawalData, mutate: withdreawalList } = useMutation({
    mutationKey: [""],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchclscode`,
        method: "post",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("사건 철회 리스트", res);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  // 사건 철회 완료
  const { mutate: saveWithdreawalList } = useMutation({
    mutationKey: [""],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/proctrregbfcls`,
        method: "post",
        body: body,
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("철회 완료", res);

      if (res.code === "00") {
        callToast({
          msg: "수임 철회되었습니다.",
          status: "success",
          dim: true,
          afterFunc: () => {
            router.push("/my-case"); // 토스트가 사라진 후 화면 이동
          },
        });
      } else {
        callToast({
          msg: "수임 철회에 실패하였습니다. 다시 시도해주세요.",
          status: "error",
        });
      }
    },
    onError: (error) => {
      console.log("철회 실패", error);

      callToast({
        msg: "수임 철회에 실패하였습니다. 다시 시도해주세요.",
        status: "error",
      });
    },
  });

  const handleAgreeCheck = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleReasonInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let redex = /\s/gi;
    const inputValue = e.target.value.replace(/\s+/g, "");
    setReasonInput(inputValue);

    if (e.target.value.toString().replace(redex, "").length >= 5) {
      e.target.classList.remove("border-kos-gray-400", "border-kos-red-500");
      setShowErrorText(false);
    } else {
      e.target.classList.add("border-kos-gray-400", "border-kos-red-500");
      setShowErrorText(true);
    }

    return e.target.value.replace(redex, "").length < 5;
  };

  const handleOnChageSelectValue = (selectedReason: string) => {
    setCurrentValue(selectedReason);
    setIsChecked(false);
  };

  useEffect(() => {
    const updatedBody = {
      loanNo: caseDetail.loanNo,
      accClsRsn: currentValue === "기타(직접입력)" ? reasonInput : currentValue,
    };

    setBody(updatedBody);
  }, [currentValue, reasonInput, caseDetail.loanNo]);

  return (
    <section className="pb-[114px]">
      <div className="px-4 pt-6 py-7 bg-kos-gray-100">
        <Typography color={"text-kos-gray-800"} type={TypographyType.H2}>
          수임 철회 전 꼭 확인해주세요!
        </Typography>
        <ul className="mt-3">
          <li className="text-kos-gray-700 text-base font-medium leading-[26px]">
            <span className="mr-2">•</span> 반드시 매수인과{" "}
            <b className="text-kos-gray-800 font-semibold">협의 후 철회</b>를
            진행하세요.
          </li>
          <li className="text-kos-gray-700 text-base font-medium leading-[26px]">
            <span className="mr-2">•</span> 사건 철회 후{" "}
            <b className="text-kos-gray-800 font-semibold">재매칭은 불가</b>
            합니다.
          </li>
          <li className="text-kos-gray-700 text-base font-medium leading-[26px]">
            <span className="mr-2">•</span>{" "}
            <b className="text-kos-gray-800 font-semibold">빈번한 철회</b>는
            이용 제한 사유가 될 수 있습니다.
          </li>
        </ul>
      </div>
      <div className="pt-6 px-4 py-3 border-t border-t-8 border-kos-gray-200">
        <Typography color={"text-kos-gray-800"} type={TypographyType.H2}>
          철회 사유 선택
        </Typography>
        <div className="mt-3">
          <Typography color={"text-kos-gray-700"} type={TypographyType.B1}>
            철회 사유는 매수인에게 발송되오니, 신중한 선택 부탁드립니다.
          </Typography>
        </div>
        <div className="mt-6">
          <div>
            <p className="text-kos-gray-600 text-[12px] font-semibold">
              사유선택
            </p>
            <Sheet
              className="border-none"
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              detent={"content-height"}
              snapPoints={[600, 400, 100, 0]}
            >
              <Sheet.Container
                style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
              >
                <Sheet.Header />
                <div className="py-4 text-center text-lg text-kos-gray-800 font-semibold">
                  <p>철회사유를 선택해주세요</p>
                </div>
                <Sheet.Content className={`${!!isIos ? "pb-5" : ""}`}>
                  <div className="w-full p-4 py-0">
                    <div
                      className="flex justify-between items-center"
                      onClick={() => {
                        handleOnChageSelectValue("사유 선택");
                        setOpen(false);
                      }}
                    >
                      <p
                        id="default"
                        className={`py-3 text-kos-gray-600 text-[16px] font-medium ${
                          currentValue === "사유 선택" &&
                          "text-kos-logo-brown font-semibold"
                        }`}
                      >
                        사유선택
                      </p>
                      {currentValue === "사유 선택" && (
                        <Checkbox
                          size="Small"
                          id="default"
                          checked
                          onChange={(prevState) => !prevState}
                        />
                      )}
                    </div>
                    {withdreawalData?.map((data: TSelect) => (
                      <div
                        className="flex justify-between items-center"
                        key={data.code}
                        onClick={() => {
                          handleOnChageSelectValue(data.codeNm);
                          setOpen(false);
                        }}
                      >
                        <p
                          id={data.code}
                          className={`py-3 text-kos-gray-600 text-[16px] font-medium ${
                            currentValue === data.codeNm
                              ? "text-kos-logo-brown font-semibold"
                              : "text-kos-gray-600 font-medium"
                          }`}
                        >
                          {data.codeNm}
                        </p>
                        {currentValue === data.codeNm && (
                          <Checkbox
                            size="Small"
                            id={data.code}
                            checked={true}
                            onChange={(prevState) => !prevState}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop
                onTap={() => setOpen(false)}
                style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
              />
            </Sheet>
            <ul className="mt-1" onClick={() => setOpen(true)}>
              <li
                className="p-4 border border-solid border-kos-gray-400 rounded-[16px] bg-kos-white"
                onClick={() => {
                  withdreawalList();
                }}
              >
                <div className="flex align-center justify-between">
                  <p
                    className={`text-[17px] font-normal ${
                      currentValue === "사유 선택"
                        ? "text-kos-gray-500"
                        : "text-kos-gray-800"
                    }`}
                  >
                    {currentValue}
                  </p>
                  <p
                    className={`w-6 bg-no-repeat bg-down-arrow ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </li>
            </ul>
          </div>

          {/* 기타 선택 시 */}
          {currentValue === "기타(직접입력)" && (
            <div className="mt-6">
              <div className="w-full mt-1">
                <Input.InputContainer className="max-w-md">
                  <Input.Label htmlFor="reason">사유입력</Input.Label>
                  <Input.InputField
                    inputType="text"
                    placeholder="사유 입력"
                    maxLength={100}
                    onChange={handleReasonInput}
                  />
                  {showErrorText && (
                    <Input.Description isError={true}>
                      * 5글자 이상 입력해주세요.
                    </Input.Description>
                  )}
                </Input.InputContainer>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[27px] px-4 pt-6 border-t border-t-8 border-kos-gray-200">
        <label
          htmlFor="agree"
          className={`flex items-start before:w-6 before:h-6 before:mt-1 before:bg-contain before:bg-no-repeat ${
            isChecked
              ? "before:bg-checkbox-big-on"
              : "before:bg-checkbox-big-off"
          }`}
          onChange={handleAgreeCheck}
        >
          <input type="checkbox" id="agree" className="hidden" />
          <div className="ml-2.5">
            <Typography color={"text-kos-gray-700"} type={TypographyType.H3}>
              철회 관련 주의사항을 확인하였고, <br />
              이에 동의합니다.
            </Typography>
          </div>
        </label>
      </div>

      <div className="fixed w-full bottom-0 flex p-4 bg-kos-white shadow-[0px_-4px_20px_0px_rgba(204,_204,_204,_0.3)]">
        <CtaButton
          size="XLarge"
          disabled={
            !isChecked ||
            currentValue === defaultSelectValue ||
            (currentValue === "기타(직접입력)" && reasonInput.length < 5)
          }
          state={"On"}
          onClick={() => {
            saveWithdreawalList();
          }}
        >
          수임철회
        </CtaButton>
      </div>
    </section>
  );
}
