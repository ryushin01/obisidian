"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BankTypeCode } from "@constants";
import { Button, Divider, Input, Loading, Typography } from "@components";
import {
  useBankList,
  useDisclosure,
  useFetchApi,
  useSearchRpyAcct,
  useVirtualKeyboard,
} from "@hooks";
import { useBankListData } from "@libs";
import { scrollToInput } from "@utils";
import { authAtom, rpyAcctFormAtom, toastState, infoCntrAtom } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Sheet } from "react-modal-sheet";
import BankTabs from "@app/my-case/pay-info/BankTabs";

type TForm = {
  woori: string;
  acctVerfReqCvos: IAcctVerfRegCvos[];
};
type TAcctVerfResCvo = {
  bankCd: string;
  acctNo: string;
  acnmNo: string;
  rsltCd: string;
  rsltMsg: string;
};

type TRes = {
  acctVerfResCvos: TAcctVerfResCvo[];
};

type Tnewfield = {
  accDsc: string;
  acctNo: string;
  bankCd: string;
  bankNm: string;
  Id?: string;
};

const numberRegEx = /^[0-9]+$/g;

export default function IN_CN_005M() {
  const router = useRouter();
  const { bizNo } = useAtomValue(authAtom);
  const [infoCntr, setInfoCntr] = useAtom(infoCntrAtom);
  const [_, rpyAcctData] = useSearchRpyAcct();
  const isInitData =
    rpyAcctData?.woori === undefined || rpyAcctData.woori.acctNo === "";
  const { open, isOpen, close } = useDisclosure();
  const [rpyAcctForm, setRpyAcctForm] = useAtom(rpyAcctFormAtom);
  const resetRpyAcctForm = useResetAtom(rpyAcctFormAtom);
  const [isFieldActive, setIsFieldActive] = useState(false);
  const [isInitialValue, setIsInitialValue] = useState(false);
  const [curSelectedBankIndex, setCurSelectedBankIndex] = useState(0);
  const lastInputRef = useRef<HTMLInputElement | null>(null);
  const [acctData, setAcctData] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorFields, setErrorFields] = useState<number[]>([]);
  const [selectedBank, setSelectedBank] = useState({
    bankCd: "",
    bankNm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  let prevPath = sessionStorage.getItem("prevPath");
  const [newFields, setNewFields] = useState<Tnewfield[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<TForm>({
    defaultValues: {
      woori: "",
      acctVerfReqCvos: [
        {
          bankCd: "",
          acctNo: "",
          bankNm: "",
          acctDsc: "01",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "acctVerfReqCvos",
  });

  const callToast = useSetAtom(toastState);
  const { fetchApi } = useFetchApi();
  const { expandedRef } = useVirtualKeyboard();
  const [isPending, bankList] = useBankListData({
    grpCd: "BANK_RF",
    bankTypeCodeList: [BankTypeCode.BANK],
  });

  const { mutate: verifyAcctNo } = useMutation({
    mutationKey: ["acct-verify"],
    mutationFn: (body: IAcctVerfRegCvos[]): Promise<TData<TRes>> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/searchacctlstverf`,
        method: "post",
        body: { acnmNo: bizNo, acctVerfReqCvos: body },
      }).then((res) => res.json()),
    onSuccess(data, variables, context) {
      console.log(data);
      const availableAcctNoList = data.data.acctVerfResCvos.filter(
        (el) => el.rsltCd === "02"
      );

      const isNewAcctList = data.data.acctVerfResCvos.filter(
        (li) => li.rsltMsg === "사용가능한 계좌입니다."
      );
      const isNewAcctListSerialized = JSON.stringify(isNewAcctList);

      const queryParams = new URLSearchParams({
        isInitData: isInitData.toString(),
        isNewAcctList: encodeURIComponent(isNewAcctListSerialized),
        // bizNo:bizNo.toString(),
      });

      const allAcct = data.data.acctVerfResCvos;
      const filterAcct = allAcct.filter((acctItem) => acctItem.rsltCd === "01");
      const filterDisavailableAcct = filterAcct.filter(
        (filterItem) => filterItem.rsltMsg === "계좌번호가 유효하지 않습니다."
      );
      const filterDisAcctrsltCd = filterDisavailableAcct.filter(
        (item) => item.rsltCd
      );
      if (filterAcct.length > 0) {
        const rsltCdcheck = filterDisAcctrsltCd?.[0]?.rsltCd;
        setAcctData(rsltCdcheck);
        clearErrors();
        const errorIndexes = filterDisavailableAcct.map((acct) =>
          allAcct.indexOf(acct)
        );
        setErrorFields(errorIndexes);
        setIsError(true);
        filterDisavailableAcct.forEach((disavailableAcc) => {
          setIsError(true);
        });
      }
      if (filterDisavailableAcct.length > 0) {
        return;
      }
      if (data.code === "00") {
        setRpyAcctForm({
          woori: getValues().woori,
          bankList: variables.slice(1),
        });

        router.push(`/information/cntr/006`);
      }
    },
  });

  const onSubmit = (data: TForm) => {
    const isValidInfo = (function () {
      console.log(data);

      // 1. woori 값이 비어있으면 제출 불가
      if (data.woori === "") {
        return false;
      }

      // 2. woori 값이 있고, 추가 필드가 하나라도 입력된 경우 검증
      if (data.acctVerfReqCvos.some((el) => el.bankCd || el.acctNo)) {
        for (let i = 0; i < data.acctVerfReqCvos.length; i++) {
          const el = data.acctVerfReqCvos[i];
          if (
            (el.bankCd === "" && el.acctNo !== "") || // 은행 코드가 없고 계좌 번호만 있는 경우
            (el.bankCd !== "" && el.acctNo === "") || // 은행 코드만 있고 계좌 번호가 없는 경우
            (el.bankCd === "" && el.acctNo === "") // 둘 다 비어 있는 경우
          ) {
            callToast({
              msg: "계좌정보를 전부 입력해주세요",
              status: "notice",
            });
            return false;
          }
        }
      }

      return true; // 모든 조건 통과 시 true 반환
    })();

    if (!isValidInfo) return;

    // 계좌 정보 생성 로직
    const acctVerfReqCvos = data.acctVerfReqCvos.filter(
      (el) => el.bankCd && el.acctNo // 입력된 필드만 필터링
    );

    // woori 데이터와 입력된 필드를 합침
    const formattedData = [
      {
        bankCd: "020",
        acctNo: data.woori,
        bankNm: "우리은행",
        acctDsc: "01",
      },
      ...acctVerfReqCvos,
    ];

    // 기존에 저장된 rpyAcctData와 일치하지 않는 부분만 필터링
    const nonMatchingFields = acctVerfReqCvos.filter((field) => {
      return !rpyAcctData?.bankList.some((cvo) => cvo.bankCd === field.bankCd);
    });

    // Jotai 상태 업데이트
    if (isInitData && nonMatchingFields.length !== 0) {
      setInfoCntr(formattedData); // 기존에 우리은행정보가 없으면 당행 정보도 함께 Jotai에저장
    } else if (nonMatchingFields.length !== 0) {
      setInfoCntr(nonMatchingFields); // 기존에 우리은행정보가 있으면 기존 데이터와 일치하지않는 타행정보(새로작성된필드 값)만 Jotai에 저장
    } else {
      setInfoCntr(formattedData); // 타행없이 당행만 Jotai에 저장
    }

    // API 호출
    verifyAcctNo(formattedData);

    // 세션 스토리지 저장
    sessionStorage.setItem("newfield", JSON.stringify(acctVerfReqCvos));

    // 로컬 스토리지 저장
    localStorage.setItem(
      "addedFieldIndices",
      JSON.stringify(addedFieldIndices)
    );
  };

  useEffect(() => {
    router.refresh();
    if (!!rpyAcctData?.woori?.acctNo && rpyAcctData?.woori?.acctNo !== "")
      setValue("woori", rpyAcctData?.woori?.acctNo);

    setNewFields(JSON.parse(sessionStorage.getItem("newfield") || "[]"));

    // 006 페이지에서 진입인지 아닌지 분기처리
    if (prevPath === "/information/cntr/006") {
      if (newFields != null && newFields.length > 0)
        setValue(
          "acctVerfReqCvos",
          newFields.map((el) => ({ ...el, acctDsc: "01" }))
        );
    } else {
      if (!!rpyAcctData?.bankList && rpyAcctData?.bankList.length > 0)
        setValue(
          "acctVerfReqCvos",
          rpyAcctData?.bankList.map((el) => ({ ...el, acctDsc: "01" }))
        );
    }
  }, [rpyAcctData]);

  useEffect(() => {
    if (rpyAcctForm?.woori !== "") {
      setValue("woori", rpyAcctForm?.woori);
      // setValue(
      //   "acctVerfReqCvos",
      //   rpyAcctForm.bankList.map((el) => ({ ...el, acctDsc: "01" }))
      // );
      // resetRpyAcctForm();
    }
  }, []);

  useEffect(() => {
    if (isInitialValue) {
      setIsFieldActive(true);
    }
  }, [isInitialValue]);

  const isDisabledSubmit = (function () {
    if (isInitData && watch("woori") !== "") return false;
    if (!isInitData) {
      if (rpyAcctData?.woori.acctNo !== watch("woori")) return false;
      if (rpyAcctData.bankList.length !== watch("acctVerfReqCvos").length)
        return false;
      if (
        rpyAcctData.bankList.some(
          (el, i) => el.acctNo !== watch("acctVerfReqCvos")[i].acctNo
        )
      )
        return false;
    }

    return true;
  })();

  const formValues = watch();

  useEffect(() => {
    setIsLoading(true);

    // 맨 처음 등록시 우리은행만 등록해도 isFieldActive ture로 변경
    if (isEmpty) {
      setIsFieldActive(true);
      setIsLoading(false);
      return;
    }

    // 이후 타행은행 정보 한개라도 입력시 isFieldActive ture로 변경
    const validFields = fields.filter((_, index) => {
      const bankNm = formValues.acctVerfReqCvos?.[index]?.bankNm;
      const acctNo = formValues.acctVerfReqCvos?.[index]?.acctNo;
      const inputDisabled = rpyAcctData?.bankList.some(
        (el) => el.bankNm === bankNm
      );

      return (
        bankNm &&
        acctNo &&
        acctNo.length >= 1 &&
        acctNo.length <= 20 &&
        !isNaN(Number(acctNo)) &&
        !inputDisabled // 기존 데이터가 아닌 새 입력 필드
      );
    });

    // 조건에 맞는 필드가 하나라도 있으면 true
    const isValidForm = validFields.length > 0;

    setIsFieldActive(isValidForm);

    setIsLoading(false);
  }, [formValues, fields]);

  const [addedFieldIndices, setAddedFieldIndices] = useState<number[]>([]);
  const [newInputNeeded, setNewInputNeeded] = useState(true);

  //inputField 추가
  const handleAppend = useCallback(() => {
    if (fields.length >= 5) {
      callToast({
        msg: "타행계좌은 최대 5개까지 등록 가능합니다.",
        status: "notice",
      });
      return;
    }
    append({
      bankCd: "",
      acctNo: "",
      bankNm: "",
      acctDsc: "01",
    });

    setAddedFieldIndices((prev) => [...prev, fields.length]);

    // setTimeout(() => {
    //   if (lastInputRef.current) {
    //     lastInputRef.current.focus();
    //   }
    // }, 0);
  }, [append, callToast, fields.length]);

  // inputField 삭제
  const handleRemoveField = (index: number) => {
    setIsError(false); // 에러 리셋
    setErrorFields([]); // 에러 필드 리셋
    remove(index); // 필드 삭제
    setAddedFieldIndices((prev) => prev.filter((i) => i !== index)); // 삭제된 필드 인덱스 제거
    if (fields.length <= 1) {
      setNewInputNeeded(true); // 마지막 필드 삭제 시 새로운 input 필요
    }
  };

  useEffect(() => {
    rpyAcctData?.woori?.acctNo === undefined
      ? setIsEmpty(true)
      : setIsEmpty(false);
  }, [rpyAcctData]);

  //  페이지에 들어왔을때 활성화중인 inputField가 없을때 새로운 inputField 자동 생성
  useEffect(() => {
    const inputDisabled = fields.some(
      (field) => !rpyAcctData?.bankList.some((el) => el.bankNm === field.bankNm)
    );

    // 006페이지에서 진입한게 아닐때, 필드 수가 5보다 작고, inputDisabled가 false이며, newInputNeeded가 true일 때만 새로 추가
    if (
      prevPath != "/information/cntr/006" &&
      fields.length < 5 &&
      !inputDisabled &&
      newInputNeeded
    ) {
      // console.log("newFields.length 0");
      handleAppend();
      setNewInputNeeded(false); // 추가한 후에는 새로운 input 필요 상태를 false로 변경
    }

    const addedFieldIndices = JSON.parse(
      localStorage.getItem("addedFieldIndices") || "[]"
    );
    // 006 페이지에서 진입했을때, addedFieldIndices.length 만큼 필드 추가
    if (prevPath === "/information/cntr/006") {
      if (
        addedFieldIndices.length >= 1 &&
        fields.length < 5 &&
        !inputDisabled &&
        newInputNeeded
      ) {
        console.log("newFields.length 0보다 큼");
        for (let i = 0; i < infoCntr.length; i++) {
          handleAppend();
          setNewInputNeeded(false); // 추가한 후에는 새로운 input 필요 상태를 false로 변경
        }
      }
    }
  }, [fields, rpyAcctData, newInputNeeded, infoCntr]);

  useEffect(() => {
    setValue(
      `acctVerfReqCvos.${curSelectedBankIndex}.bankCd`,
      selectedBank.bankCd
    );
    setValue(
      `acctVerfReqCvos.${curSelectedBankIndex}.bankNm`,
      selectedBank.bankNm
    );
  }, [selectedBank]);

  return (
    <>
      {isLoading && <Loading />}
      <form
        className="flex flex-col grow w-full h-full relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div ref={expandedRef} className="flex flex-col grow h-full w-full">
          <section className="relative grow">
            <section className="px-4 mt-6 flex gap-x-1">
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.H2}
              >
                우리은행 상환금 수령용 계좌
              </Typography>
              <Typography
                color={"text-kos-red-500"}
                type={Typography.TypographyType.H2}
              >
                *
              </Typography>
            </section>
            <section className="py-3">
              <Input.InputContainer className="w-full my-1 px-4">
                <Input.Label htmlFor="woori">계좌정보</Input.Label>
                <div className="flex w-full gap-x-2">
                  <div className="basis-5/12">
                    <Input.InputField
                      disabled={true}
                      inputType="text"
                      value={"우리은행"}
                      onFocus={scrollToInput}
                    />
                  </div>
                  <div className="basis-7/12">
                    <Controller
                      control={control}
                      name="woori"
                      rules={{
                        required: true,
                        minLength: 1,
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState,
                        formState,
                      }) => {
                        const styleType = errorFields.includes(0)
                          ? "error"
                          : "default";
                        return (
                          <div className="relative">
                            <Input.InputField
                              thousandSeparator={false}
                              maxLength={20}
                              disabled={!!rpyAcctData?.woori?.acctNo}
                              leadingZero={true}
                              name="acct"
                              styleType={styleType}
                              value={value ?? ""}
                              placeholder={"계좌번호 입력"}
                              onFocus={scrollToInput}
                              onChange={(e) => {
                                {
                                  const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                                  // 입력값에서 숫자 이외의 문자 제거
                                  const filteredValue = e.target.value.replace(
                                    regExp,
                                    ""
                                  );

                                  onChange(filteredValue);
                                  setIsInitialValue(true);
                                  setIsError(false);
                                  setErrorFields([]);
                                }
                              }}
                              onBlur={({ target: { value } }) => {
                                onChange(value);
                                // setIsFieldActive(!!value);
                              }}
                            />
                            {isError && errorFields.includes(0) && (
                              <label className="block mt-1 text-xs text-kos-red-500 text-right">
                                예금주명이 일치하지 않습니다
                              </label>
                            )}
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </Input.InputContainer>
            </section>
            <Divider />
            <section className="flex flex-col grow py-3 pb-20">
              <div className="py-3 px-4">
                <Typography
                  color={"text-kos-gray-800"}
                  type={Typography.TypographyType.H2}
                >
                  타행 상환금 수령용 계좌
                </Typography>
              </div>
              {/*rpayAcct*/}
              {fields.map((field, i) => (
                <div
                  key={field.id}
                  className={`pb-5 ${
                    i !== 0
                      ? "pt-5 border-t border-t-1 border-kos-gray-200"
                      : ""
                  }`}
                >
                  <Input.InputContainer className="w-full mt-1 px-4">
                    <Input.Label
                      htmlFor=""
                      rightItem={
                        i === 0 ? (
                          <button
                            type="button"
                            className="text-sm font-semibold text-kos-orange-500"
                            onClick={handleAppend}
                          >
                            추가
                          </button>
                        ) : rpyAcctData?.bankList.some(
                            (el) => el.bankCd === field.bankCd
                          ) ? null : (
                          <button
                            type="button"
                            className="text-sm text-kos-gray-500 font-semibold"
                            onClick={() => handleRemoveField(i)}
                          >
                            삭제
                          </button>
                        )
                      }
                    >
                      <div className="flex justify-between">
                        <label
                          htmlFor=""
                          className="text-xs text-kos-gray-600 font-semibold"
                        >
                          계좌정보
                        </label>
                      </div>
                    </Input.Label>
                    <Input.InputGroup>
                      <Controller
                        control={control}
                        name={`acctVerfReqCvos.${i}.bankNm`}
                        render={({
                          field: { onBlur, value },
                          fieldState,
                          formState,
                        }) => {
                          const rsltCd = acctData;
                          const isLastField = i === fields.length - 1;
                          const isDropdownDisabled = rpyAcctData?.bankList.some(
                            (el) => el.bankNm === field.bankNm
                          );
                          // const isDropdownDisabled =
                          //   rsltCd === "01" && isLastField
                          //     ? false
                          //     : rpyAcctData?.bankList.some(
                          //         (el) => el.bankNm === field.bankNm
                          //       );

                          return (
                            <Input.Dropdown
                              value={value ?? ""}
                              onClick={() => {
                                setCurSelectedBankIndex(i);
                                open();
                              }}
                              placeholder={"은행선택"}
                              onBlur={onBlur}
                              required
                              disabled={isDropdownDisabled}
                            />
                          );
                        }}
                        rules={{ required: false }}
                      />
                      <Controller
                        control={control}
                        name={`acctVerfReqCvos.${i}.acctNo`}
                        rules={{ required: false }}
                        render={({
                          field: { onChange, value },
                          fieldState,
                          formState,
                        }) => {
                          const rsltCd = acctData;
                          // const styleType = rsltCd === "01" ? "error" : "default";
                          const styleType = errorFields.includes(i + 1)
                            ? "error"
                            : "default";
                          const isLastField = i === fields.length - 1;
                          const inputDisabled = rpyAcctData?.bankList.some(
                            (el) => el.bankNm === field.bankNm
                          );

                          return (
                            <div className="relative">
                              <Input.InputField
                                styleType={styleType}
                                // autoFocus={!isEmpty}
                                value={value ?? ""}
                                maxLength={20}
                                disabled={inputDisabled}
                                placeholder={"계좌번호 입력"}
                                onFocus={scrollToInput}
                                thousandSeparator={false}
                                leadingZero={true}
                                onChange={(e) => {
                                  const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                                  // 입력값에서 숫자 이외의 문자 제거
                                  const filteredValue = e.target.value.replace(
                                    regExp,
                                    ""
                                  );

                                  onChange(filteredValue);

                                  setIsInitialValue(true);
                                  setIsError(false);
                                  setErrorFields([]);
                                }}
                                onBlur={({ target: { value } }) => {
                                  onChange(value);
                                }}
                                required={
                                  rpyAcctData?.woori === undefined
                                    ? false
                                    : true
                                }
                                ref={
                                  i === fields.length - 1 ? lastInputRef : null
                                }
                              />
                              {isError && errorFields.includes(i + 1) && (
                                <label className="absolute right-0 text-xs text-kos-red-500 mt-1">
                                  예금주명이 일치하지 않습니다
                                </label>
                              )}
                            </div>
                          );
                        }}
                      />
                    </Input.InputGroup>
                  </Input.InputContainer>
                </div>
              ))}
            </section>
          </section>

          <section
            className="fixed w-full bottom-0 flex p-4 bg-kos-white shadow-[0px_-4px_20px_0px_rgba(204,_204,_204,_0.3)]"
            style={{ boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)" }}
          >
            <Button.CtaButton
              buttonType={"submit"}
              size={"XLarge"}
              state={"On"}
              disabled={!isValid || isDisabledSubmit || !isFieldActive}
            >
              인증하기
            </Button.CtaButton>
          </section>
        </div>
        <Sheet
          className="border-none h-full"
          isOpen={isOpen}
          onClose={close}
          detent={"content-height"}
          snapPoints={[0.57, 400, 100, 0]}
        >
          <Sheet.Container
            style={{
              borderRadius: "20px 20px 0 0",
            }}
          >
            <Sheet.Header />
            <Sheet.Content className="relative h-full">
              <Typography
                type={Typography.TypographyType.H3}
                color="text-kos-gray-800"
                className="text-center pt-4"
              >
                은행을 선택해주세요
              </Typography>
              <BankTabs
                grpCd="BANK_RF"
                bankList={bankList[0]}
                close={close}
                selectedBankObj={getValues().acctVerfReqCvos}
                selectedBank={getValues().acctVerfReqCvos[curSelectedBankIndex]}
                saveSelectBank={setSelectedBank}
                bankTypeCodeList={[BankTypeCode.BANK]}
              />
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            onTap={close}
            style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
          />
        </Sheet>
      </form>
    </>
  );
}
