"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "@components";
import { Checkbox } from "@components/button";
import { Sheet } from "react-modal-sheet";

type TSelect = {
  searchMembInfo: TEstmSelectList[];
};

type TEstmSelectList = {
  membNo: string;
  membNm: string;
  trregPssbYn: string;
  cphnNo: string;
  imgSeq: string;
};

type TProps = {
  estmInfoData?: TSelect;
  handleChangeValue: (key: string, value: string) => void;
  updateValid: (type: "selectValid", isValid?: boolean) => void;
  isFormValid: boolean | null;
  membNm: string;
};

export default function EstimateSelect({
  handleChangeValue,
  estmInfoData,
  updateValid,
  isFormValid,
  membNm,
}: TProps) {
  const [showError, setShowError] = useState<boolean | null>(null);
  const [isOpen, setOpen] = useState(false);
  const isIos = sessionStorage.getItem("isIos");

  const handleSelectValue = ({
    membNm,
    membNo,
    trregPssbYn,
    cphnNo,
    imgSeq,
  }: TEstmSelectList) => {
    if (trregPssbYn === "N") {
      return;
    }
    handleChangeValue("membNm", membNm);
    handleChangeValue("mvLwyrMembNo", membNo);
    handleChangeValue("imgSeq", imgSeq);
    handleChangeValue("cphnNo", cphnNo);
  };

  useEffect(() => {
    const isSelectValid = membNm !== "";
    updateValid("selectValid", isSelectValid);

    if (isFormValid === false) {
      setShowError(!isSelectValid);
    }
  }, [membNm, isFormValid, updateValid]);

  return (
    <div className="px-4 py-6">
      <div>
        <Typography
          color={"text-kos-gray-800"}
          type={Typography.TypographyType.H2}
        >
          담당자 정보
        </Typography>
        <div className={`mt-5`}>
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B6}
          >
            담당자 <span className="text-kos-red-500">*</span>
          </Typography>
          <ul className="relative mt-1">
            <li
              className={`p-4 border border-solid rounded-[16px] ${
                showError && membNm == ""
                  ? "border-kos-red-500"
                  : "border-kos-gray-400"
              }`}
              onClick={() => {
                setOpen(true);
              }}
            >
              <div className="flex align-center justify-between">
                <p
                  className={`text-[15px] font-normal ${
                    showError || membNm
                      ? "text-kos-gray-800"
                      : "text-kos-gray-500"
                  }`}
                >
                  {membNm !== ""
                    ? membNm
                    : !showError
                    ? "담당자 선택"
                    : "담당자를 선택해주세요"}
                </p>
                <p
                  className={`w-6 bg-no-repeat bg-down-arrow ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </li>
            <Sheet
              className="border-none w-screen h-full"
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              detent={"content-height"}
              snapPoints={[0.65, 400, 100, 0]}
            >
              <Sheet.Container
                style={{
                  boxShadow: "none",
                  borderRadius: "20px 20px 0 0",
                }}
              >
                <Sheet.Header />
                <div className="py-4 text-center text-lg text-[#2E2E2E] font-semibold">
                  <p>담당자를 선택해주세요</p>
                </div>
                <Sheet.Content
                  className={`relative w-screen ${!!isIos ? "pb-5" : ""}`}
                >
                  <div
                    className={`w-full p-4 pt-0 overflow-y-auto
      ${
        showError && membNm == "" ? "border-kos-red-500" : "border-kos-gray-400"
      }`}
                  >
                    {!!estmInfoData &&
                      estmInfoData.searchMembInfo &&
                      estmInfoData.searchMembInfo?.map(
                        (data: TEstmSelectList) => (
                          <div
                            key={data.membNo}
                            className="flex items-center justify-between"
                            onClick={() => {
                              if (data.trregPssbYn === "Y") {
                                handleSelectValue(data);
                                setOpen(false);
                              }
                            }}
                          >
                            <p
                              className={`pt-5 font-normal ${
                                data.trregPssbYn === "N"
                                  ? "text-kos-gray-400"
                                  : "text-kos-gray-600"
                              } ${
                                data.membNm === membNm &&
                                "text-kos-gray-800 font-semibold"
                              }`}
                            >
                              {data.membNm || ""}
                              {data.trregPssbYn === "N" && (
                                <span className="ml-1">(프로필사진 없음)</span>
                              )}
                            </p>
                            {data.membNm === membNm && (
                              <Checkbox
                                size="Small"
                                id={data.membNo}
                                checked
                                onChange={(prevState) => !prevState}
                              />
                            )}
                          </div>
                        )
                      )}
                  </div>
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop
                onTap={() => setOpen(false)}
                style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
              />
            </Sheet>
          </ul>
        </div>
      </div>
    </div>
  );
}
