"use client";

import React, { useEffect, useState } from "react";
import { Input, Tooltip, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { useMoveScroll } from "@hooks";
import { scrollToInput } from "@utils";
import { Controller, useForm } from "react-hook-form";

interface TClientForm extends TEstimateSaveForm {
  [key: string]: string | null | number;

  loanNo: string | null;
  totalAmount: number;
  totalFee: number;
  totalTax: number;
}

type InputField = {
  key: string;
};

type TInputProps = {
  handleChangeValue: (key: string, value: string) => void;
  clientForm: TClientForm;
  searchBndDisRt: TDisc;
  isFormValid: boolean | null;
  updateValid: (type: "inputValid" | "inputLength", isValid?: boolean) => void;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function EstimateInput({
  handleChangeValue,
  clientForm,
  searchBndDisRt,
  isFormValid,
  updateValid,
  setIsFormValid,
}: TInputProps) {
  const { control } = useForm<TEstimateSaveForm>({
    defaultValues: {
      registTax: "",
      localEduTax: "",
      specialTax: "",
      stampTax: "",
      rgstrReqFee: "",
      ntnlHsngFnd: "",
      dscntRtAmount: "",
      fee: "",
    },
  });
  const inputFields = [
    {
      id: "registTax",
      label: "취등록세",
      placeholder: "금액 입력",
      key: "registTax",
    },
    {
      id: "localEduTax",
      label: "지방교육세",
      placeholder: "금액 입력",
      key: "localEduTax",
    },
    {
      id: "specialTax",
      label: "농특세",
      placeholder: "금액 입력",
      key: "specialTax",
    },
    {
      id: "stampTax",
      label: "인지세",
      placeholder: "금액 입력",
      key: "stampTax",
    },
    {
      id: "rgstrReqFee",
      label: "등기신청수수료",
      placeholder: "금액 입력",
      key: "rgstrReqFee",
    },
    {
      id: "ntnlHsngFnd",
      label: "국민주택채권 매입금액",
      placeholder: "금액 입력",
      key: "ntnlHsngFnd",
    },
  ];
  const [showError, setShowError] = useState<boolean | null>(null);
  const { onMoveToScroll } = useMoveScroll();
  const inputRef = {
    0: useMoveScroll(),
    1: useMoveScroll(),
  };
  const findEmptyFieldIndex = (fields: InputField[]) => {
    return fields.findIndex((field) => {
      const fieldValue: any = clientForm[field.key];
      return fieldValue === null || fieldValue === "";
    });
  };
  const emptyFieldIndex = findEmptyFieldIndex(inputFields);

  /** 본인부담금 계산  */
  const getDscntRtAmount = () => {
    const ntnlHsngFndValue = clientForm?.ntnlHsngFnd;

    if (ntnlHsngFndValue && ntnlHsngFndValue.trim() !== "") {
      const getNtnlHsngFndValue = parseFloat(
        ntnlHsngFndValue.replaceAll(",", "")
      );
      const discountRate = searchBndDisRt?.disctRt || 1;

      const roundedAmount =
        searchBndDisRt?.disctRt === null
          ? parseInt(clientForm?.ntnlHsngFnd) / 100
          : Math.round(getNtnlHsngFndValue * discountRate) / 100;
      const formattedAmount = roundedAmount.toFixed();
      handleChangeValue("dscntRtAmount", formattedAmount);
    } else {
      handleChangeValue("dscntRtAmount", "");
    }
  };

  /** input 유효성 검사 / 임시저장 모달 뜨는 조건  */
  const isInputLengthValid = (
    inputFields: InputField[],
    inputCheck: boolean
  ) => {
    if (inputCheck) {
      // 모든 필드가 값으로 채워져 있는지 확인
      return inputFields.every((field) => {
        const fieldValue: any = clientForm[field.key];
        return clientForm.fee && fieldValue !== "";
      });
    } else {
      // 하나 이상의 필드가 빈 값인지 확인
      return inputFields.some((field) => {
        const fieldValue: any = clientForm[field.key];
        return fieldValue.length > 0;
      });
    }
  };

  useEffect(() => {
    getDscntRtAmount();
  }, [clientForm.ntnlHsngFnd, searchBndDisRt?.disctRt]);

  useEffect(() => {
    // 빈 값이 하나라도 있는지 확인하여 inputLength 상태 업데이트
    const isInputLength = isInputLengthValid(inputFields, false);
    updateValid("inputLength", isInputLength);

    // 모든 필드가 값으로 채워져 있는지 확인하여 inputValid 상태 업데이트
    const isInputValid = isInputLengthValid(inputFields, true);
    updateValid("inputValid", isInputValid);

    if (isFormValid === false) {
      setShowError(!isInputValid);
    }
  }, [inputFields, isFormValid, isInputLengthValid]);

  useEffect(() => {
    if (isFormValid === false) {
      onMoveToScroll();

      if (inputRef[0].element.current !== null)
        inputRef[0].element.current.scrollIntoView({
          block: "center",
        });

      if (!inputRef[0].element.current && inputRef[1].element.current != null)
        inputRef[1].element.current.scrollIntoView({
          block: "center",
        });
    }

    setIsFormValid(null);
  }, [isFormValid]);

  // useEffect(() => {
  // if (isFormValid) {
  //   onMoveToScroll();
  //
  //   if (inputRef[0].element.current != null)
  //     inputRef[0].element.current.scrollIntoView({
  //       block: "start",
  //     });
  //
  //   {/* 견적서 내용 없이 다음버튼 클릭시 법무수수료쪽으로 스크롤이 내려가는 에러로 인해 임시 주석처리 */
  //   }
  //   // if (inputRef[1].element.current != null)
  //   //   inputRef[1].element.current.scrollIntoView({
  //   //     block: "start",
  //   //   });
  // }
  // }, [onMoveToScroll]);

  return (
    <ul className="px-4 py-6">
      <Typography color={"text-kos-gray-800"} type={TypographyType.H2}>
        제세공과금
      </Typography>
      {[
        ...inputFields.map((field, index) => (
          <li
            key={field.key}
            className="mt-5"
            ref={index === emptyFieldIndex ? inputRef[0].element : null}
          >
            <Input.InputContainer>
              <Input.Label htmlFor={field.id}>
                {field.label} <span className="text-kos-red-500">*</span>
              </Input.Label>
              <Controller
                control={control}
                name="registTax"
                render={({ field: { onBlur } }) => (
                  <Input.InputField
                    id={field.id}
                    placeholder={
                      showError && clientForm[field.key] === ""
                        ? "금액을 입력해주세요"
                        : field.placeholder
                    }
                    value={clientForm[field.key] ?? ""}
                    styleType={
                      showError && clientForm[field.key] === ""
                        ? "error"
                        : undefined
                    }
                    maxLength={39}
                    onBlur={onBlur}
                    onChange={(e) =>
                      handleChangeValue(field.key, e.target.value)
                    }
                    onFocus={scrollToInput}
                  />
                )}
              />
              {showError && clientForm[field.key] === "" && (
                <div className="text-right">
                  <Typography
                    color={"text-kos-red-500"}
                    type={TypographyType.B5}
                  >
                    금액이 없으면 0을 입력해주세요
                  </Typography>
                </div>
              )}
            </Input.InputContainer>
          </li>
        )),
        <li key="dscntRtAmount" className="mt-5">
          <Input.InputContainer>
            <div className="flex items-center">
              <Typography color={"text-kos-gray-600"} type={TypographyType.B6}>
                본인부담금
              </Typography>
              <Tooltip className="left-[-4px] bottom-[30px]">
                {searchBndDisRt?.baseDate} 할인율 {searchBndDisRt?.disctRt}%
                기준으로 계산됩니다.
              </Tooltip>
            </div>
            <Input.InputField
              disabled={true}
              id="dscntRtAmount"
              // autoFocus={true}
              placeholder="국민주택채권 X 당일 할인율로 자동 계산"
              value={clientForm.dscntRtAmount ?? ""}
              maxLength={30}
              onChange={(e) =>
                handleChangeValue("dscntRtAmount", e.target.value)
              }
            />
          </Input.InputContainer>
          <p className="mt-1 text-kos-gray-500 weight-medium text-[13px] text-right">
            * 소수점 첫째자리에서 반올림
          </p>
        </li>,
        <li
          key="fee"
          className="mt-6"
          ref={clientForm.fee === "" ? inputRef[1].element : null}
        >
          <Typography color={"text-kos-gray-800"} type={TypographyType.H2}>
            법무수수료
          </Typography>
          <Input.InputContainer className="mt-3">
            <Input.Label htmlFor={"fee"}>
              수수료 <span className="text-kos-red-500">*</span>
            </Input.Label>
            <Controller
              control={control}
              name="registTax"
              render={({ field: { onBlur } }) => (
                <Input.InputField
                  id="fee"
                  placeholder="금액 입력"
                  onBlur={onBlur}
                  value={clientForm.fee ?? ""}
                  maxLength={30}
                  styleType={
                    showError && clientForm.fee === "" ? "error" : undefined
                  }
                  onChange={(e) => handleChangeValue("fee", e.target.value)}
                  onFocus={scrollToInput}
                />
              )}
            />
            {showError && clientForm.fee === "" && (
              <div className="text-right">
                <Typography color={"text-kos-red-500"} type={TypographyType.B5}>
                  금액이 없으면 0을 입력해주세요
                </Typography>
              </div>
            )}
          </Input.InputContainer>
        </li>,
      ]}
    </ul>
  );
}
