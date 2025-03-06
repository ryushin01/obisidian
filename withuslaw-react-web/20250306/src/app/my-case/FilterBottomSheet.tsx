"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckBoxSmallOff,
  CheckBoxSmallOn,
  CloseIcon,
  ResetIcon,
} from "@icons";
import { RGSTR_GB_CD } from "@constants";
import { Input, Typography } from "@components";
import { useDatePicker } from "@hooks";
import { stringToDate } from "@utils/dateUtil";
import { Sheet } from "react-modal-sheet";
import { TFilterBody } from "@app/my-case/page";

type TProps = {
  setForm: ({
    startDate,
    endDate,
    regType,
  }: {
    startDate: string;
    endDate: string;
    regType: RGSTR_GB_CD | "";
  }) => void;
  getFilteredData: ({
    pageNum,
    body,
  }: {
    pageNum: number;
    body: TFilterBody;
  }) => void;
  condition: TFillInfo;
  isOpen: boolean;
  close: () => void;
  filterBody: TFilterBody;
};

type TFilterqRegCodeList = {
  text: string;
  code: RGSTR_GB_CD | "";
};

const filterRegCodeList: TFilterqRegCodeList[] = [
  { text: "전체", code: "ALL" },
  { text: "이전", code: RGSTR_GB_CD["01"] },
  { text: "설정", code: RGSTR_GB_CD["02"] },
  { text: "말소", code: RGSTR_GB_CD["03"] },
];

export default function FilterBottomSheet({
  isOpen,
  close,
  setForm,
  getFilteredData,
  condition,
  filterBody,
}: TProps) {
  const { reset, ...datePickerProps } = useDatePicker();

  //등기 유형 전체로 초기설정
  const [selectedRegType, setRegType] = useState(filterBody.regType || "ALL");

  //처음 화면진입시 등기 유형 및 날짜 디폴트 처리
  useEffect(() => {
    setRegType(filterBody.regType || "ALL");

    if (filterBody.startDate === "" && filterBody.endDate === "") {
      reset();
    } else {
      datePickerProps.startDate = filterBody.startDate
        ? stringToDate(filterBody.startDate)
        : null;
      datePickerProps.endDate = filterBody.endDate
        ? stringToDate(filterBody.endDate)
        : null;
    }
  }, [filterBody]);

  const isDisabled = selectedRegType === "";

  const resetFilter = () => {
    reset();
    setRegType("ALL");
  };

  const handleSubmit = () => {
    if (isDisabled) return;

    function getDateString(date: Date | null) {
      if (date && !!date?.getDate()) {
        const mm = date?.getMonth() + 1;
        const dd = date?.getDate();
        return `${date?.getFullYear()}${mm.toString().padStart(2, "0")}${dd
          .toString()
          .padStart(2, "0")}`;
      }
      return "";
    }

    let form = {
      regType: selectedRegType,
      startDate: getDateString(datePickerProps.startDate),
      endDate: getDateString(datePickerProps.endDate),
    };
    setForm(form);
    getFilteredData({ pageNum: 1, body: form });
    close();
  };

  const getAvailable = (regType: RGSTR_GB_CD | ""): boolean => {
    if (regType === "") {
      return false;
    }
    if (!!condition) {
      const key = `${regType.toLowerCase()}Avail`;
      return !Object.values(condition).includes(key);
    }
    return false;
  };

  return (
    <Sheet
      className="border-none"
      isOpen={isOpen}
      onClose={close}
      detent={"content-height"}
      snapPoints={[600, 400, 100, 0]}
    >
      <Sheet.Container
        style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
      >
        <Sheet.Header />
        <Sheet.Content>
          <header
            className="flex items-center border-b border-b-1 border-tab-bg"
            style={{ padding: "12px 15px 12px 16px" }}
          >
            <div className="basis-1/4 flex items-center">
              <button
                type="button"
                className="flex gap-1 items-center"
                onClick={resetFilter}
              >
                <Typography
                  color={"text-kos-gray-700"}
                  type={Typography.TypographyType.B4}
                >
                  초기화
                </Typography>
                <Image src={ResetIcon} alt="초기화 아이콘" />
              </button>
            </div>
            <div className="basis-2/4 flex justify-center">
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.H3}
              >
                필터
              </Typography>
            </div>
            <button
              type="button"
              className="basis-1/4 flex items-center justify-end"
              onClick={close}
            >
              <Image src={CloseIcon} alt="닫기 아이콘" />
            </button>
          </header>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="px-4 pt-6"
          >
            <Input.DateInputGroup condition={condition} {...datePickerProps} />
            <div className="mt-6 mb-3">
              <label
                htmlFor="type"
                className="text-kos-gray-600 text-xs font-semibold"
              >
                등기 유형
              </label>
              <div className="flex gap-x-2">
                {filterRegCodeList.map((regType) => (
                  <button
                    key={regType.code}
                    type="button"
                    className={`p-2 flex gap-1 rounded-xl items-center ${
                      selectedRegType === regType.code
                        ? "bg-kos-orange-50 text-kos-orange-500"
                        : "bg-kos-gray-100 text-kos-gray-600"
                    }`}
                    onClick={() => setRegType(regType.code)}
                  >
                    <Image
                      src={
                        selectedRegType === regType.code
                          ? CheckBoxSmallOn
                          : CheckBoxSmallOff
                      }
                      alt="체크 표시 아이콘"
                    />
                    <span className="font-semibold text-sm">
                      {regType.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isDisabled}
              className={`transition-all duration-200 ${
                isDisabled ? "bg-kos-gray-200" : "bg-kos-orange-500"
              } w-full p-4 my-4 rounded-xl`}
              onClick={handleSubmit}
            >
              <Typography
                color={isDisabled ? "text-kos-gray-600" : "text-kos-white"}
                type={Typography.TypographyType.H5}
              >
                선택완료
              </Typography>
            </button>
          </form>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={close}
        style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
      />
    </Sheet>
  );
}
