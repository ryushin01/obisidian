"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { ExclamationMarkBlue } from "@icons";
import { BankTypeCode } from "@constants";
import { Size, ToastType } from "@components/Constants";
import {
  Alert,
  Button,
  Divider,
  Input,
  Loading,
  Typography,
} from "@components";
import { TypographyType } from "@components/typography/Constant";
import { useDisclosure, useFetchApi, useVirtualKeyboard } from "@hooks";
import { scrollToInput } from "@utils";
import { getCompareWithToday } from "@utils/dateUtil";
import { caseDetailAtom, toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Sheet } from "react-modal-sheet";
import CurrencyFormat from "react-currency-format";
import BankTabs from "@app/my-case/pay-info/BankTabs";

/**
 * 매매 - 매도인, 차주 -> seller, buyer
 * 자가담보 - 차주 -> buyer
 * 전세 - 임대인 -> seller
 * 이주비 - 차주 -> buyer
 * 입주잔금 - 신탁사 -> seller
 */

/**
 *  ('KND_CD', '1', '매매', '매매전세구분코드'),
 ('KND_CD', '2', '전세', '매매전세구분코드'),
 ('KND_CD', '3', '소유권이전없는대출', '매매전세구분코드') 자담,
 ('KND_CD', '4', ' 집단대출(이주비) 대출 신청 건[접수번호만]', '매매전세구분코드'),
 ('KND_CD', '5', '집단대출(이주비) 대출 신청 건', '매매전세구분코드'),
 ('KND_CD', '6', '집단대출', '매매전세구분코드') 입주잔금,
 */

/**
 * PAY_CD
 * 01 : 매수인, 차주
 * 02 : 매도인, 신탁사, 임대인
 * 03 : 당행상환
 * 04 : 타행상환
 */
type TPayCd = "01" | "02" | "03" | "04";

type TServerFormBankList = {
  payCd: TPayCd;
  no: number;
  bankCd: string;
  payAmt: number;
  gpsInfo: string;
};

export default function MY_PI_002M() {
  const searchParmas = useSearchParams();
  const isModify = searchParmas.get("previousState") ?? false;
  const { fetchApi } = useFetchApi();
  const [curSelectedBankIndex, setCurSelectedBankIndex] = useState(0);
  const [selectedBank, setSelectedBank] = useState({ bankCd: "", bankNm: "" });
  const [isBankEmpty, setIsBankEmpty] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loanNo, kndCd, resLndAmtPay, regType, execAmt, statCd, execDt } =
    useAtomValue(caseDetailAtom);
  const isPaid = resLndAmtPay.resData;
  const pathname = usePathname();
  const isIos = sessionStorage.getItem("isIos");
  const callToast = useSetAtom(toastState);
  const {
    isOpen: isOpenConfirm,
    close,
    open: openConfirmSheet,
  } = useDisclosure();
  const {
    isOpen: isOpenBank,
    close: closeBank,
    open: openBank,
  } = useDisclosure();
  const {
    isOpen: isOverAlert,
    close: closeIsOverAlert,
    open: openIsOverAlert,
  } = useDisclosure();
  const router = useRouter();

  /**
   * expandedRef: 가상 키보드 열림 시 하단 영역이 확장되어야 하는 엘리먼트
   */
  const { expandedRef } = useVirtualKeyboard();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      sellerPayAmt: "",
      buyerPayAmt: "",
      bankList: [{ payAmt: "", bankCd: "01", bankNm: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "bankList",
  });

  function moneyStringToNumber(money: string | number) {
    if (money === "") return 0;
    if (typeof money === "number") return money;
    return parseInt(money.replaceAll(",", ""));
  }

  const getTotalAmt = () => {
    const sellerPayAmt = moneyStringToNumber(getValues().sellerPayAmt);
    const buyerPayAmt = moneyStringToNumber(getValues().buyerPayAmt);
    const bankListPayAmt = getTotalRePayAmt();

    return sellerPayAmt + buyerPayAmt + bankListPayAmt;
  };

  const getTotalRePayAmt = () => {
    return getValues().bankList.reduce(
      (acc, bank) => acc + moneyStringToNumber(bank.payAmt),
      0
    );
  };

  const { mutate: savePayInfo } = useMutation({
    mutationKey: ["save-pay-info"],
    mutationFn: async (body: TServerFormBankList[]) => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/payRegInfo`,
        method: "post",
        body: {
          loanNo: loanNo,
          bankList: body,
        },
      });

      setIsLoading(false);

      return response.json();
    },
    onSuccess: (res) => {
      if (res.code === "00") {
        close();
        callToast({
          msg: "지급정보가 "
            .concat(isModify ? "수정" : "등록")
            .concat("되었습니다."),
          status: ToastType.success,
          dim: true,
          afterFunc: move,
        });
      } else {
        close();
        console.log("error", res.msg);
        callToast({
          msg: "지급정보 저장에 실패했습니다.\n다시 시도해주세요.",
          status: "error",
        });
      }
    },
  });

  const move = () => {
    const storage = globalThis?.sessionStorage;
    const prevPath = storage.getItem("prevPath");
    const targetPath: string = "/my-case/pay-request/loan-pay";

    prevPath === targetPath
      ? router.push(targetPath)
      : router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
  };

  const { mutate: getPayInfoList } = useMutation({
    mutationKey: ["pay-info-list"],
    mutationFn: async () => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchpayinfolist/${loanNo}`,
        method: "post",
      });

      setIsLoading(false);

      return response.json();
    },
    onSuccess: (res) => {
      console.log("지급정보등록 조회", res);
      if (res.code === "00" && res?.data?.payList?.length > 0) {
        let notWooriBankList: TPayInfoBank[] = [];
        res?.data?.payList?.map((el: TPayInfoBank) => {
          if (el.payCd === "01") {
            setValue("buyerPayAmt", el.payAmt.toString());
          }
          if (el.payCd === "02") {
            setValue("sellerPayAmt", el.payAmt.toString());
          }
          if (el.payCd === "03" || el.payCd === "04") {
            notWooriBankList.push(el);
          }
        });

        notWooriBankList.length > 0 && setValue("bankList", notWooriBankList);
      }
    },
  });

  // 상태코드 40 보다 크거나 같으면 true
  const isOverForty = statCd >= "40";
  // 대출실행일이 오늘보다 과거이면 true
  const isPast = getCompareWithToday(execDt) === "past";

  function onClickNext() {
    const totalAmt = getTotalAmt();

    if (totalAmt < execAmt) {
      callToast({
        msg: "입력한 금액이 대출금보다 부족합니다.",
        status: "notice",
      });
      return;
    }

    if (totalAmt > execAmt) {
      callToast({
        msg: "입력한 금액이 대출금을 초과하였습니다.",
        status: "notice",
      });
      return;
    }

    /**
     * 상환금 수령용 계좌 또는 상환금 수령용 계좌가 등록되어 있는 타행(우리은행 및 기타 제외 나머지 은행)
     * 으로 입력한 상환금의 각각의 금액이 10억 이상인 경우
     * 타행불가 Alert
     */
    const isOverPayAmt = getValues().bankList.some(
      (bank) =>
        !(bank.bankCd === "020" || bank.bankCd === "888") &&
        moneyStringToNumber(bank.payAmt) >= 1000000000
    );

    if (isOverPayAmt) {
      openIsOverAlert();
      return;
    }

    //상환금 추가 시, 은행 미선택 & 금액 미입력 이면 바텀시트에서 노출 제외
    const bankList = getValues().bankList.filter(
      (bank, idx) => idx === 0 || (bank.bankCd && bank.payAmt)
    );
    setValue("bankList", bankList);

    setIsBankEmpty(false);
    openConfirmSheet();
  }

  function onSubmitForm() {
    const { buyerPayAmt, sellerPayAmt, bankList } = getValues();
    let no = 1;
    let bankListForm: TServerFormBankList[] = [];

    bankListForm.push({
      no: no,
      payCd: "01",
      bankCd: "020", // 우리
      payAmt:
        buyerPayAmt === "" ? 0 : parseInt(buyerPayAmt.replaceAll(",", "")),
      gpsInfo: "23143,3133",
    });

    bankListForm.push({
      no: ++no,
      payCd: "02",
      bankCd: "020", // 우리
      payAmt:
        sellerPayAmt === "" ? 0 : parseInt(sellerPayAmt.replaceAll(",", "")),
      gpsInfo: "23143,3133",
    });

    bankList.map((bank, i) => {
      !!bank.payAmt &&
        !!bank.bankCd &&
        bankListForm.push({
          no: no + i + 1,
          payCd: bank.bankCd === "020" ? "03" : "04",
          bankCd: bank.bankCd, // 우리
          payAmt:
            typeof bank.payAmt === "string"
              ? parseInt(bank.payAmt.replaceAll(",", ""))
              : bank.payAmt,
          gpsInfo: "23143,3133",
        });
    });

    savePayInfo(bankListForm);
    console.log(bankListForm, loanNo);
  }

  useEffect(() => {
    setValue(`bankList.${curSelectedBankIndex}.bankCd`, selectedBank.bankCd);
    setValue(`bankList.${curSelectedBankIndex}.bankNm`, selectedBank.bankNm);
  }, [selectedBank]);

  useEffect(() => {
    getPayInfoList();
  }, [getPayInfoList]);

  return (
    <>
      {isLoading && <Loading />}
      <form
        className="flex flex-col grow w-full h-full relative"
        onSubmit={handleSubmit(onClickNext)}
      >
        <div ref={expandedRef} className="flex flex-col grow h-full w-full">
          <section className="relative grow">
            <section className="px-4 mt-6">
              <Typography color={"text-kos-gray-800"} type={TypographyType.H1}>
                대출금&nbsp;
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={execAmt ?? 0}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원의
                <br />
                지급정보를 입력해주세요
              </Typography>
              <p className="text-kos-blue-500 text-sm flex font-semibold gap-x-2 mt-4">
                <Image src={ExclamationMarkBlue} alt="exclamation mark" />
                지급금이 없을 경우 공란으로 남겨주세요.
              </p>
            </section>
            <section className="px-4 py-6 flex flex-col gap-y-5">
              {(kndCd === "1" ||
                kndCd === "2" ||
                kndCd === "6" ||
                kndCd === "R") && (
                <Input.InputContainer>
                  <Input.Label htmlFor={"sellerPayAmt"}>
                    {kndCd === "1" && "매도인"}
                    {kndCd === "R" && "매도인"}
                    {kndCd === "2" && "임대인"}
                    {kndCd === "6" && "신탁사"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="sellerPayAmt"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        isCurrency={true}
                        placeholder={"금액 입력"}
                        onChange={onChange}
                        onClick={() => clearErrors}
                        onFocus={scrollToInput}
                        onBlur={onBlur}
                        disabled={isPaid || isOverForty || isPast}
                      />
                    )}
                  />
                </Input.InputContainer>
              )}
              {(kndCd === "1" ||
                kndCd === "3" ||
                kndCd === "4" ||
                kndCd === "5") && (
                <Input.InputContainer>
                  <Input.Label htmlFor={"buyerPayAmt"}>차주</Input.Label>
                  <Controller
                    control={control}
                    name="buyerPayAmt"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input.TextInput
                        // autoFocus={true}
                        value={value}
                        isCurrency={true}
                        placeholder={"금액 입력"}
                        onChange={onChange}
                        onClick={() => clearErrors}
                        onFocus={scrollToInput}
                        onBlur={onBlur}
                        disabled={isPaid || isOverForty || isPast} //지급이 되었거나, 상태코드가 40이상이거나, 과거이면 비활성화
                      />
                    )}
                  />
                </Input.InputContainer>
              )}
            </section>
            <Divider />
            <section className="py-3 px-4">
              <div className="py-3">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  상환금{" "}
                  {(kndCd === "2" || kndCd === "4" || kndCd === "5") && (
                    <span className="text-kos-red-500">*</span>
                  )}
                </Typography>
              </div>
              {fields.map((field, i) => (
                <Input.InputContainer
                  key={field.id}
                  className={`pb-5 ${
                    i !== 0
                      ? "pt-5 border-t border-t-1 border-kos-gray-200"
                      : ""
                  }`}
                >
                  <Input.Label
                    htmlFor="test"
                    rightItem={
                      isPaid || isOverForty ? null : i === 0 ? (
                        <div className="flex align-center gap-3">
                          <Button.TextButton
                            size={Size.Small}
                            onClick={() => {
                              resetField("bankList");
                            }}
                          >
                            초기화
                          </Button.TextButton>
                          <Button.TextButton
                            state={true}
                            size={Size.Small}
                            onClick={() => {
                              if (fields.length === 5) {
                                callToast({
                                  msg: "상환금은 최대 5개까지 등록 가능합니다.",
                                  status: "notice",
                                });
                                return;
                              }

                              const { bankCd, payAmt } =
                                getValues().bankList[fields.length - 1];
                              if (bankCd === "" || payAmt === "") {
                                callToast({
                                  msg: "상환정보를 전부 입력해야 추가할 수 있습니다.",
                                  status: "notice",
                                });
                                return;
                              }

                              append({ bankCd: "", bankNm: "", payAmt: "" });
                            }}
                          >
                            추가
                          </Button.TextButton>
                        </div>
                      ) : (
                        <Button.TextButton
                          size={Size.Small}
                          onClick={() => {
                            remove(i);
                          }}
                        >
                          삭제
                        </Button.TextButton>
                      )
                    }
                  >
                    상환정보
                  </Input.Label>
                  <Input.InputGroup>
                    <Controller
                      control={control}
                      name={`bankList.${i}.bankNm`}
                      render={({ field: { onBlur, value } }) => (
                        <Input.Dropdown
                          value={value ?? ""}
                          onClick={() => {
                            clearErrors();
                            setCurSelectedBankIndex(i);
                            // setSelectedBank({ bankCd: "", bankNm: "" });
                            openBank();
                          }}
                          placeholder={"은행선택"}
                          onBlur={onBlur}
                          isError={
                            errors?.bankList?.[i]?.bankNm?.type === "required"
                          }
                          disabled={isPaid || isOverForty || isPast} //지급이 되었거나, 상태코드가 40이상이거나, 과거이면 비활성화
                        />
                      )}
                      rules={{
                        required:
                          kndCd === "2" ||
                          kndCd === "4" ||
                          kndCd === "5" ||
                          !!watch(`bankList.${i}.payAmt`),
                      }}
                    />
                    <Controller
                      control={control}
                      name={`bankList.${i}.payAmt`}
                      rules={{
                        required:
                          kndCd === "2" ||
                          kndCd === "4" ||
                          kndCd === "5" ||
                          !!watch(`bankList.${i}.bankNm`),
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input.TextInput
                          value={value}
                          isCurrency={true}
                          placeholder={
                            errors?.bankList?.[i]?.payAmt?.type === "required"
                              ? "금액을 입력해주세요"
                              : "금액 입력"
                          }
                          onChange={onChange}
                          onClick={() => clearErrors}
                          onFocus={scrollToInput}
                          onBlur={onBlur}
                          isError={
                            errors?.bankList?.[i]?.payAmt?.type === "required"
                          }
                          disabled={isPaid || isOverForty || isPast} //지급이 되었거나, 상태코드가 40이상이거나 과거이면 비활성화
                        />
                      )}
                    />
                  </Input.InputGroup>
                </Input.InputContainer>
              ))}
            </section>
          </section>
          {!isPaid && !isOverForty && !isPast && (
            <section
              className="relative p-4"
              style={{
                boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)",
              }}
            >
              <Button.CtaButton
                buttonType={"submit"}
                size={"XLarge"}
                state="On"
              >
                {isModify ? "수정하기" : "등록하기"}
              </Button.CtaButton>
            </section>
          )}
        </div>
        {/* 입력된 지급정보 확인 */}
        <Sheet
          className="border-none w-screen h-full"
          isOpen={isOpenConfirm}
          onClose={close}
          detent={"content-height"}
          snapPoints={[600, 400, 100, 0]}
        >
          <Sheet.Container
            style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
          >
            <Sheet.Header />
            <Sheet.Content className={`px-4 ${!!isIos ? "pb-5" : ""}`}>
              <header className="w-full text-center pb-4">
                <Typography
                  type={Typography.TypographyType.H3}
                  color="text-kos-black"
                >
                  입력된 지급정보를 확인해 주세요
                </Typography>
              </header>
              <article className="rounded-2xl bg-kos-gray-100 p-5 flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  {(kndCd === "1" || kndCd === "2") && (
                    <>
                      {kndCd === "1" ? (
                        <Typography
                          type={Typography.TypographyType.B2}
                          color="text-kos-gray-600"
                          className="basis-1/3"
                        >
                          매도인
                        </Typography>
                      ) : (
                        <Typography
                          type={Typography.TypographyType.B2}
                          color="text-kos-gray-600"
                          className="basis-1/3"
                        >
                          임대인
                        </Typography>
                      )}
                      <Typography
                        type={Typography.TypographyType.B1}
                        color="text-kos-gray-800"
                      >
                        <CurrencyFormat
                          decimalSeparator={"false"}
                          value={
                            getValues().sellerPayAmt === ""
                              ? "0"
                              : getValues().sellerPayAmt
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        원
                      </Typography>
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  {(kndCd === "1" || kndCd === "3") && (
                    <>
                      <Typography
                        type={Typography.TypographyType.B2}
                        color="text-kos-gray-600"
                        className="basis-1/3"
                      >
                        차주
                      </Typography>
                      <Typography
                        type={Typography.TypographyType.B1}
                        color="text-kos-gray-800"
                      >
                        <CurrencyFormat
                          decimalSeparator={"false"}
                          value={
                            getValues().buyerPayAmt === ""
                              ? "0"
                              : getValues().buyerPayAmt
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        원
                      </Typography>
                    </>
                  )}
                </div>
                <div className="flex justify-between">
                  <Typography
                    type={Typography.TypographyType.B2}
                    color="text-kos-gray-600"
                    className="basis-1/3"
                  >
                    상환금
                  </Typography>
                  <div className="flex flex-col gap-y-2">
                    {getValues().bankList.map((bank) => (
                      <Typography
                        key={bank.bankCd}
                        type={Typography.TypographyType.B1}
                        color="text-kos-gray-800"
                        className="text-end"
                      >
                        {bank.bankNm}&nbsp;
                        <CurrencyFormat
                          decimalSeparator={"false"}
                          value={bank.payAmt === "" ? "0" : bank.payAmt}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        원
                      </Typography>
                    ))}
                  </div>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <Typography
                    type={Typography.TypographyType.H5}
                    color="text-kos-gray-600"
                    className="basis-1/3"
                  >
                    총금액
                  </Typography>
                  <Typography
                    type={Typography.TypographyType.H2}
                    color="text-kos-gray-800"
                  >
                    <CurrencyFormat
                      decimalSeparator={"false"}
                      value={getTotalAmt()}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    원
                  </Typography>
                </div>
              </article>
              {getTotalRePayAmt() > 0 && (
                <p className="text-xs text-kos-gray-600 mt-2">
                  • 계좌를 등록하지 않은 은행의 상환금은 우리은행 계좌로
                  지급됩니다.
                </p>
              )}
              <footer className="p-4 mt-6">
                <Button.CtaButton
                  size={Size.XLarge}
                  state={"On"}
                  onClick={onSubmitForm}
                >
                  확인
                </Button.CtaButton>
              </footer>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            onTap={close}
            style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
          />
        </Sheet>
        <Sheet
          className="border-none w-screen h-full"
          isOpen={isOpenBank}
          onClose={closeBank}
          detent={"content-height"}
          snapPoints={[0.65, 400, 100, 0]}
        >
          <Sheet.Container
            className="w-screen h-full"
            style={{
              borderRadius: "20px 20px 0 0",
            }}
          >
            <Sheet.Header />
            <Sheet.Content className="px-4 relative w-screen h-full">
              <Typography
                type={Typography.TypographyType.H3}
                color="text-kos-black"
                className="text-center"
              >
                금융기관을 선택해주세요
              </Typography>
              <BankTabs
                grpCd="BANK_GB"
                bankList={[]}
                close={closeBank}
                selectedBankObj={getValues().bankList}
                selectedBank={getValues().bankList[curSelectedBankIndex]}
                saveSelectBank={setSelectedBank}
                bankTypeCodeList={[
                  BankTypeCode.BANK,
                  //BankTypeCode.SAVE,
                  BankTypeCode.STOCK,
                  BankTypeCode.INSURANCE,
                  BankTypeCode.ETC,
                ]}
              />
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            onTap={closeBank}
            style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
          />
        </Sheet>
        <Alert
          isOpen={isOverAlert}
          title={"1,000,000,000원(10억 원)이상은 타행계좌로 지급 불가합니다"}
          confirmText={"확인"}
          confirmCallBack={closeIsOverAlert}
          bodyText={
            "당행계좌(우리 ********1234)로 수정하거나 영업점 별도 처리해주세요."
          }
        />
      </form>
      {/* TODO : SR건 데이터에따라 노출 수정 */}
      {/* <form
        className="flex flex-col grow w-full h-full relative"
        onSubmit={handleSubmit(onClickNext)}
      >
        <div ref={expandedRef} className="flex flex-col grow h-full w-full">
          <section className="relative grow">
            <section className="px-4 mt-6">
              <Typography color={"text-kos-gray-800"} type={TypographyType.H1}>
                대출금&nbsp;
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={execAmt ?? 0}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원의
                <br />
                지급정보를 입력해주세요
              </Typography>
              <p className="text-kos-blue-500 text-sm flex items-start font-semibold gap-x-2 mt-4 pr-16">
                <Image src={ExclamationMarkBlue} alt="exclamation mark" />
                대출모집인 취급건으로 지급정보 수정이 불가합니다. &#40;우리은행
                입금 지정 계좌로 대출금 지급&#41;
              </p>
            </section>
            {(kndCd === "2" || kndCd === "6") && (
              <>
                <section className="px-4 py-6 flex flex-col gap-y-5">
                  <Typography
                    color={"text-kos-gray-800"}
                    type={TypographyType.H2}
                  >
                    매도인
                  </Typography>
                  <Input.InputContainer>
                    <Input.Label htmlFor={"sellerPayAmt"}>
                      {kndCd === "2" && "매도인"}
                    </Input.Label>
                    <Controller
                      control={control}
                      name="sellerPayAmt"
                      render={({ field: { value } }) => (
                        <Input.TextInput
                          autoFocus={true}
                          value={value}
                          onClick={() => null}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                    />
                    <Input.Label htmlFor={"sellerPayAmt"}>
                      {kndCd === "2" && "생년월일"}
                    </Input.Label>
                    <Controller
                      control={control}
                      name="sellerPayAmt"
                      render={({ field: { value } }) => (
                        <Input.TextInput
                          autoFocus={true}
                          value={value}
                          onClick={() => null}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                    />
                  </Input.InputContainer>
                </section>
                <div className="border-t border-t-1 border-kos-gray-200 mt-4"></div>
                <section className="px-4 py-6 flex flex-col gap-y-5">
                  <Typography
                    color={"text-kos-gray-800"}
                    type={TypographyType.H2}
                  >
                    &#40;공동&#41; 매도인
                  </Typography>
                  <Input.InputContainer>
                    <Input.Label htmlFor={"sellerPayAmt"}>
                      {kndCd === "6" && "매도인"}
                    </Input.Label>
                    <Controller
                      control={control}
                      name="sellerPayAmt"
                      render={({ field: { value } }) => (
                        <Input.TextInput
                          autoFocus={true}
                          value={value}
                          onClick={() => null}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                    />
                    <Input.Label htmlFor={"sellerPayAmt"}>
                      {kndCd === "6" && "생년월일"}
                    </Input.Label>
                    <Controller
                      control={control}
                      name="sellerPayAmt"
                      render={({ field: { value } }) => (
                        <Input.TextInput
                          autoFocus={true}
                          value={value}
                          onClick={() => null}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                    />
                  </Input.InputContainer>
                </section>
              </>
            )}
            {kndCd === "R" && (
              <section className="px-4 py-6 flex flex-col gap-y-5">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  신탁사
                </Typography>
                <Input.InputContainer>
                  <Input.Label htmlFor={"sellerPayAmt"}>
                    {kndCd === "R" && "수탁자명(신탁사)"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="sellerPayAmt"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Input.Label htmlFor={"sellerPayAmt"}>
                    {kndCd === "R" && "위탁자명(부동산소유자)"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="sellerPayAmt"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Input.Label htmlFor={"sellerPayAmt"}>
                    {kndCd === "R" && "우선 수익자"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="sellerPayAmt"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                </Input.InputContainer>
              </section>
            )}
            {kndCd === "1" && (
              <section className="px-4 py-6 flex flex-col gap-y-5">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  매도인&#40;담보제공자&#41;
                </Typography>
                <Input.InputContainer>
                  <Input.Label htmlFor={"sellerPayAmt"}>
                    {kndCd === "1" && "이름"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="sellerPayAmt"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Input.Label htmlFor={"sellerPayAmt"}>
                    {kndCd === "1" && "생년월일"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="sellerPayAmt"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                </Input.InputContainer>
              </section>
            )}
            {(kndCd === "1" ||
              kndCd === "2" ||
              kndCd === "6" ||
              kndCd === "R") && <Divider />}
            <section className="py-3 px-4">
              <div className="py-3">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  상환금{" "}
                  {(kndCd === "2" || kndCd === "4" || kndCd === "5") && (
                    <span className="text-kos-red-500">*</span>
                  )}
                </Typography>
              </div>
              {fields.map((field, i) => (
                <Input.InputContainer
                  key={field.id}
                  className={`pb-5 ${
                    i !== 0
                      ? "pt-5 border-t border-t-1 border-kos-gray-200"
                      : ""
                  }`}
                >
                  <Input.Label htmlFor="test">상환정보</Input.Label>
                  <Input.InputGroup>
                    <Controller
                      control={control}
                      name={`bankList.${i}.bankNm`}
                      render={({ field: { onBlur, value } }) => (
                        <Input.Dropdown
                          value={value ?? ""}
                          onClick={() => null}
                          placeholder={"우리은행"}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                      rules={{
                        required:
                          kndCd === "2" ||
                          kndCd === "4" ||
                          kndCd === "5" ||
                          !!watch(`bankList.${i}.payAmt`),
                      }}
                    />
                    <Controller
                      control={control}
                      name={`bankList.${i}.payAmt`}
                      rules={{
                        required:
                          kndCd === "2" ||
                          kndCd === "4" ||
                          kndCd === "5" ||
                          !!watch(`bankList.${i}.bankNm`),
                      }}
                      render={({ field: { value } }) => (
                        <Input.TextInput
                          value={value}
                          isCurrency={true}
                          onClick={() => null}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                    />
                  </Input.InputGroup>
                </Input.InputContainer>
              ))}
            </section>
          </section>
        </div>
      </form> */}
    </>
  );
}
