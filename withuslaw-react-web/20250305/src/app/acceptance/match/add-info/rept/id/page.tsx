"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Loading, Typography } from "@components";
import { CtaButton } from "@components/button";
import { useFetchApi } from "@hooks";
import { useAddInfoData } from "@libs";
import { toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { getAddInfoStatus } from "@app/acceptance/match/getAddInfoStatus";

export default function IdPage() {
  const router = useRouter();
  const callToast = useSetAtom(toastState);
  const { fetchApi } = useFetchApi();
  const [formId, setFormId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 추가정보 등록 여부 가져오기
  const [checkAddInfo, getCheckAddInfo] = useAddInfoData();

  /** 대표 / 소속직원 상태*/
  const { isBank, isProfile, isrnEntrSuccess } = getAddInfoStatus(
    checkAddInfo?.data?.trregElement
  );

  // eform id 등록하기
  const { mutate: saveEFormId } = useMutation({
    mutationKey: [""],
    mutationFn: async () => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/office/modifyelregid`,
        method: "post",
        body: formId,
      });

      return response.json();
    },
    onSuccess: (res) => {
      setIsLoading(false);
      console.log("eform id 저장", res);

      // 실패 케이스에 해당하는 E-FORM ID 외 라우팅 처리
      if (res.code === "00" && formId !== "aaaaa") {
        router.push("/acceptance/match/add-info/rept/isrn");
      }

      if (res.code === "99") {
        onFailed();
      }
    },
    onError: (error) => {
      console.log("실패", error);
      onFailed();
    },
  });

  const onFailed = () => {
    callToast({
      msg: "등록에 실패하였습니다. 다시 시도해주세요.",
      status: "error",
    });
    return;
  };

  // e-form 값
  const handleFormIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    setFormId(inputValue);
  };

  // e-form id 저장
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveEFormId();
  }

  useEffect(() => {
    getCheckAddInfo();
  }, [getCheckAddInfo]);

  useEffect(() => {
    setFormId(checkAddInfo?.data?.trregElement?.elregId);
  }, [checkAddInfo]);

  return (
    <>
      {isLoading && <Loading />}
      <form className="py-6 px-4" onSubmit={onSubmit}>
        <Typography
          color={"text-kos-gray-800"}
          type={Typography.TypographyType.H2}
        >
          E-FORM ID를 등록해주세요
        </Typography>

        <Typography
          color={"text-kos-gray-600"}
          type={Typography.TypographyType.B1}
          className="mt-3 mb-6"
        >
          E-FORM ID는 근저당 설정 전자등기를 목적으로 수집 및 이용됩니다.
        </Typography>

        <div className="mt-3">
          <div>
            <Input.InputContainer>
              <Input.Label htmlFor="id">E-FORM ID</Input.Label>
              <Input.InputField
                inputType="text"
                required={true}
                minLength={5}
                value={formId}
                onChange={handleFormIdChange}
                placeholder={"E-FORM ID 입력"}
              />
            </Input.InputContainer>
          </div>
        </div>

        {/* 다음 / 완료 버튼 */}
        <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
          <CtaButton
            buttonType="submit"
            size="XLarge"
            state={"On"}
            disabled={formId?.length <= 4 || isLoading}
          >
            {isBank && isProfile && isrnEntrSuccess ? "완료" : "다음"}
          </CtaButton>
        </div>
      </form>
    </>
  );
}
