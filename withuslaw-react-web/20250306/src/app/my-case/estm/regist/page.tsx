"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Size } from "@components/Constants";
import { TypographyType } from "@components/typography/Constant";
import { Button, Divider, Input, Typography } from "@components";
import { TabContainer } from "@components/tab";
import { scrollToInput } from "@utils";
import { toastState } from "@stores";
import { caseDetailAtom } from "@stores/caseDetailStore";
import { useDisclosure, useFetchApi, useVirtualKeyboard } from "@hooks";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Sheet } from "react-modal-sheet";
import RegistModal from "@app/my-case/estm/regist/RegistModal";

export type TFormList = CommonRegistForm & {
  buyerNum: string;
  buyerDenum: string;
};

export type TServerFormList = CommonRegistForm & {
  procGb: string;
  buyGbCd: string;
  buyerNum: number;
  buyerDenum: number;
  buyerTransAprvNo: string;
};

export type TForm = CommonRegistInfo & {
  byrEqtRtReqCvo: TFormList[];
  byrEqtRtResCvo: TFormList[];
};

export type TServerForm = CommonRegistInfo & {
  byrEqtRtReqCvo: TServerFormList[];
};

export default function RegistPage() {
  const queryParams = useSearchParams();
  const loanNo = queryParams.get("loanNo");
  const { fetchApi } = useFetchApi();
  const { isOpen, close, open } = useDisclosure();
  const [caseDetail] = useAtom(caseDetailAtom);
  const { resLndAmtPay } = useAtomValue(caseDetailAtom);
  const callToast = useSetAtom(toastState);
  const [activeIndex, setActiveIndex] = useState(0);
  const buyGbCd = activeIndex === 0 ? "1" : "2";
  const isLndAmtPay = resLndAmtPay.resData;
  const { expandedRef } = useVirtualKeyboard();
  const isIos = sessionStorage.getItem("isIos");
  const router = useRouter();

  // 등기 정보 불러오기 api
  const { data: loanData, mutate: getLoanList } = useMutation({
    mutationKey: [],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchtrregrgstrinfo/${loanNo}`,
        method: "post",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("등기정보 불러오기", res);
    },
  });

  const buyGbCdList = loanData?.byrEqtRtResCvo?.map(
    (item: TServerFormList) => item.buyGbCd
  );
  const result = buyGbCdList?.[0];

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<TForm>({
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      loanNo: loanNo,
      elregId: "",
      docWriteNum: "",
      byrEqtRtReqCvo: [],
    },
  });

  const { replace, fields, append, remove } = useFieldArray({
    name: "byrEqtRtReqCvo",
    control,
  });

  function onClickNext() {
    const { docWriteNum, byrEqtRtReqCvo } = getValues();
    let hasDocWriteNumError = false;

    // 작성번호 유효성 검사
    if (!docWriteNum) {
      setError("docWriteNum", {
        type: "manual",
        message: "번호를 입력해주세요",
      });
      hasDocWriteNumError = true;
    } else {
      clearErrors("docWriteNum");
    }

    // 공동명의 폼 유효성 검사
    if (buyGbCd === "2") {
      byrEqtRtReqCvo.forEach((item, i) => {
        if (item.buyerName.length === 0) {
          setError(`byrEqtRtReqCvo.${i}.buyerName`, {
            type: "manual",
            message: "이름을 입력해주세요",
          });
          hasDocWriteNumError = true;
        }

        if (item.buyerDenum.length === 0) {
          setError(`byrEqtRtReqCvo.${i}.buyerDenum`, {
            type: "manual",
            message: "숫자 입력",
          });
          hasDocWriteNumError = true;
        }

        if (item.buyerNum.length === 0) {
          setError(`byrEqtRtReqCvo.${i}.buyerNum`, {
            type: "manual",
            message: "숫자 입력",
          });
          hasDocWriteNumError = true;
        }

        if (item.buyerBirthDt.length < 6) {
          setError(`byrEqtRtReqCvo.${i}.buyerBirthDt`, {
            type: "manual",
            message: "생년월일 6자리를 입력해주세요",
          });
          hasDocWriteNumError = true;
        }
      });
    }

    if (!hasDocWriteNumError) {
      clearErrors("docWriteNum");
    } else {
      return;
    }

    if (activeIndex !== 0 && activeIndex !== 1) {
      callToast({
        msg: "매수인 지분율을 선택해주세요.",
        status: "notice",
      });
      return;
    }

    open();
  }

  useEffect(() => {
    getLoanList();
  }, [getLoanList]);

  {
    /* NOTE: 20250219 매수인 지분율 홀딩에 따른 주석 처리 */
  }
  // useEffect(() => {
  //   //단독명의 디폴트 제거 - 기획팀 요청
  //   if (loanData?.docWriteNum !== null && !!loanData?.byrEqtRtResCvo) {
  //     const newActiveIndex = result === "1" ? 0 : result === "2" ? 1 : 0;
  //     setActiveIndex(newActiveIndex);
  //     router.refresh();
  //   }
  // }, [loanData?.byrEqtRtResCvo, result]);

  useEffect(() => {
    setValue("elregId", loanData?.elregId ?? "");
    setValue("docWriteNum", loanData?.docWriteNum ?? "");

    if (result === "2") {
      if (!!loanData?.byrEqtRtResCvo) {
        replace(
          loanData?.byrEqtRtResCvo?.reverse().map((el: TServerFormList) => ({
            buyerName: el.buyerName,
            buyerBirthDt: el.buyerBirthDt,
            buyerDenum: el.buyerDenum,
            buyerNum: el.buyerNum,
            buyerNo: el.buyerNo,
          }))
        );
      }
    }
  }, [replace, loanData, setValue, result]);

  return (
    <form
      onSubmit={handleSubmit(onClickNext)}
      className="flex flex-col grow w-full h-full relative"
    >
      <div className="flex flex-col grow h-full w-full">
        <div ref={expandedRef} className="relative grow">
          <section className="px-4 py-6">
            <Input.InputContainer>
              <Input.Label htmlFor="elregId">E-FORM ID</Input.Label>
              <Controller
                control={control}
                name="elregId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.InputField
                    id="elregId"
                    autoFocus={true}
                    inputType="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={true}
                    onFocus={scrollToInput}
                  />
                )}
              />
            </Input.InputContainer>
            <Input.InputContainer className="mt-5">
              <Input.Label htmlFor="docWriteNum">
                작성번호<span className="ml-0.5 text-kos-red-500">*</span>
              </Input.Label>
              <Controller
                control={control}
                name="docWriteNum"
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <Input.InputField
                      id="docWriteNum"
                      styleType={errors.docWriteNum ? "error" : "default"}
                      value={value}
                      placeholder={
                        errors.docWriteNum ? "번호를 입력해주세요" : "번호 입력"
                      }
                      onChange={(e) => {
                        const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                        // 입력값에서 숫자 이외의 문자 제거
                        const filteredValue = e.target.value.replace(
                          regExp,
                          ""
                        );

                        onChange(filteredValue);
                      }}
                      onBlur={onBlur}
                      maxLength={30}
                      thousandSeparator={false}
                      disabled={isLndAmtPay}
                      onFocus={scrollToInput}
                      leadingZero={true}
                    />
                  );
                }}
              />
            </Input.InputContainer>
          </section>

          {/* NOTE: 20250219 매수인 지분율 홀딩에 따른 히든 처리 */}
          <section className="hidden mt-3">
            <Typography
              color={"text-kos-gray-800"}
              type={TypographyType.H1}
              className="px-4"
            >
              매수인 지분율
            </Typography>
            <TabContainer
              defaultIndex={activeIndex}
              onChange={(index: number) => {
                if (isLndAmtPay) return;
                setActiveIndex(index);
                if (index === 0 && loanData?.byrEqtRtReqCvo?.length === 0) {
                  remove();
                  return;
                } else if (fields.length === 0) {
                  append({
                    buyerName: "",
                    buyerBirthDt: "",
                    buyerNum: "",
                    buyerDenum: "",
                    buyerNo: fields.length + 1,
                  });
                  append({
                    buyerName: "",
                    buyerBirthDt: "",
                    buyerNum: "",
                    buyerDenum: "",
                    buyerNo: fields.length + 2,
                  });
                }
                router.refresh();
              }}
            >
              <div className="px-4 mt-3">
                <TabContainer.TabHeader
                  className="flex justify-around"
                  state="ListTab"
                  activeTab={activeIndex}
                  tabNameOptions={[{ name: "단독명의" }, { name: "공동명의" }]}
                />
              </div>
              <TabPanels>
                <TabPanel />
                <TabPanel
                  display={activeIndex !== 1 ? "none" : "block"}
                  className="h-full"
                  padding={"0"}
                >
                  <Divider className="mt-6" />
                  <div>
                    {fields.map((field, i) => (
                      <div
                        key={field.id}
                        className={`px-4 pt-3 pb-5 
                      ${i !== 0 ? "mt-5" : "mt-[15px]"}
                      ${
                        fields.length - 1 &&
                        "border-b border-b-1 border-gray-200"
                      }`}
                      >
                        <div className="flex items-center justify-between">
                          <Controller
                            control={control}
                            name={`byrEqtRtReqCvo.${i}.buyerNo`}
                            render={() => (
                              <Typography
                                color={"text-kos-gray-800"}
                                type={TypographyType.H2}
                              >
                                매수인{field.buyerNo}
                                <span className="text-kos-red-500 ml-1">*</span>
                              </Typography>
                            )}
                          />

                          {isLndAmtPay ? null : i === 0 ? (
                            <Button.TextButton
                              state={true}
                              size={Size.Medium}
                              onClick={() => {
                                if (fields.length === 5) {
                                  callToast({
                                    msg: "매수인 정보는 최대 5개까지 등록 가능합니다.",
                                    status: "notice",
                                  });
                                  return;
                                }
                                const newBuyerNo = fields.length + 1;
                                append({
                                  buyerName: "",
                                  buyerBirthDt: "",
                                  buyerNum: "",
                                  buyerDenum: "",
                                  buyerNo: newBuyerNo,
                                });
                              }}
                            >
                              추가
                            </Button.TextButton>
                          ) : null}
                          {!isLndAmtPay && fields.length > 2 && i >= 2 ? (
                            <Button.TextButton
                              size={Size.Medium}
                              onClick={() => remove(i)}
                            >
                              삭제
                            </Button.TextButton>
                          ) : null}
                        </div>
                        <Input.InputContainer className="mt-3">
                          <Input.Label
                            htmlFor={`byrEqtRtReqCvo.${i}.buyerName`}
                          >
                            이름
                          </Input.Label>
                          <Controller
                            control={control}
                            name={`byrEqtRtReqCvo.${i}.buyerName`}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <Input.InputField
                                id={`byrEqtRtReqCvo.${i}.buyerName`}
                                inputType="text"
                                value={value}
                                styleType={
                                  errors.byrEqtRtReqCvo &&
                                  errors.byrEqtRtReqCvo[i]?.buyerName
                                    ? "error"
                                    : "default"
                                }
                                placeholder={
                                  errors.byrEqtRtReqCvo &&
                                  errors.byrEqtRtReqCvo[i]?.buyerName
                                    ? "이름을 입력해주세요"
                                    : "이름 입력"
                                }
                                onChange={(e) => {
                                  const filteredValue = e.target.value.replace(
                                    /[^ㄱ-ㅎ가-힣a-zA-Z]/g,
                                    ""
                                  );
                                  onChange(filteredValue);
                                }}
                                onBlur={onBlur}
                                maxLength={30}
                                disabled={isLndAmtPay}
                                onFocus={scrollToInput}
                              />
                            )}
                          />
                        </Input.InputContainer>
                        <Input.InputContainer className="mt-5">
                          <Input.Label
                            htmlFor={`byrEqtRtReqCvo.${i}.buyerBirthDt`}
                          >
                            생년월일
                          </Input.Label>
                          <Controller
                            control={control}
                            name={`byrEqtRtReqCvo.${i}.buyerBirthDt`}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <div>
                                <Input.InputField
                                  id={`byrEqtRtReqCvo.${i}.buyerBirthDt`}
                                  inputType="date"
                                  thousandSeparator={false}
                                  value={value}
                                  maxLength={6}
                                  styleType={
                                    errors.byrEqtRtReqCvo &&
                                    errors.byrEqtRtReqCvo[i]?.buyerBirthDt
                                      ? "error"
                                      : "default"
                                  }
                                  placeholder={
                                    errors.byrEqtRtReqCvo &&
                                    errors.byrEqtRtReqCvo[i]?.buyerBirthDt
                                      ? "생년월일 6자리를 입력해주세요"
                                      : "생년월일 입력"
                                  }
                                  onChange={(e) => {
                                    const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                                    // 입력값에서 숫자 이외의 문자 제거
                                    const filteredValue =
                                      e.target.value.replace(regExp, "");

                                    onChange(filteredValue);
                                  }}
                                  onBlur={onBlur}
                                  disabled={isLndAmtPay}
                                  onFocus={scrollToInput}
                                  leadingZero={true}
                                />
                                {errors.byrEqtRtReqCvo &&
                                  errors.byrEqtRtReqCvo[i]?.buyerBirthDt &&
                                  value && (
                                    <Typography
                                      className="text-right mt-1"
                                      color={"text-kos-red-500"}
                                      type={TypographyType.B5}
                                    >
                                      6자리를 입력해주세요
                                    </Typography>
                                  )}
                              </div>
                            )}
                          />
                        </Input.InputContainer>

                        <Input.InputContainer className="mt-5">
                          <Input.Label
                            htmlFor={`byrEqtRtReqCvo.${i}.buyerDenum`}
                          >
                            지분율
                          </Input.Label>
                          <div className="flex items-center">
                            <Controller
                              control={control}
                              name={`byrEqtRtReqCvo.${i}.buyerDenum`}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Input.InputField
                                  id={`byrEqtRtReqCvo.${i}.buyerDenum`}
                                  value={value}
                                  thousandSeparator={false}
                                  styleType={
                                    errors.byrEqtRtReqCvo &&
                                    errors.byrEqtRtReqCvo[i]?.buyerDenum
                                      ? "error"
                                      : "default"
                                  }
                                  placeholder={
                                    errors.byrEqtRtReqCvo &&
                                    errors.byrEqtRtReqCvo[i]?.buyerDenum
                                      ? "숫자 입력"
                                      : "입력"
                                  }
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  maxLength={6}
                                  disabled={isLndAmtPay}
                                  onFocus={scrollToInput}
                                  leadingZero={true}
                                />
                              )}
                            />
                            <p className="shrink-0 mx-2 text-kos-gray-500 text-[17px] font-normal">
                              분의
                            </p>
                            <Controller
                              control={control}
                              name={`byrEqtRtReqCvo.${i}.buyerNum`}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Input.InputField
                                  id={`byrEqtRtReqCvo.${i}.buyerNum`}
                                  value={value}
                                  thousandSeparator={false}
                                  styleType={
                                    errors.byrEqtRtReqCvo &&
                                    errors.byrEqtRtReqCvo[i]?.buyerNum
                                      ? "error"
                                      : "default"
                                  }
                                  placeholder={
                                    errors.byrEqtRtReqCvo &&
                                    errors.byrEqtRtReqCvo[i]?.buyerNum
                                      ? "숫자 입력"
                                      : "입력"
                                  }
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  maxLength={30}
                                  disabled={isLndAmtPay}
                                  onFocus={scrollToInput}
                                  leadingZero={true}
                                />
                              )}
                            />
                          </div>
                        </Input.InputContainer>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </TabContainer>
          </section>
        </div>
        {
          //대출금 또는 상환금 지급 시 미노출
          loanData?.lndAmtPayYn === "N" && (
            <section
              className="relative p-4"
              style={{
                boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)",
              }}
            >
              <Button.CtaButton size="XLarge" state="On" type="submit">
                {loanData?.docWriteNum == null ||
                loanData?.byrEqtRtResCvo == null
                  ? "등록하기"
                  : "수정하기"}
              </Button.CtaButton>
            </section>
          )
        }

        {/* 확인 모달 */}
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
            <Sheet.Content className={`px-4 ${!!isIos ? "pb-5" : ""}`}>
              <RegistModal
                getValues={getValues}
                loanData={loanData}
                caseDetail={caseDetail}
                loanNo={loanNo}
                buyGbCd={buyGbCd}
                onClose={close}
              />
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            onTap={close}
            style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
          />
        </Sheet>
      </div>
    </form>
  );
}
