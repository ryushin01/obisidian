"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BankTypeCode } from "@constants";
import { Input, Loading, Typography } from "@components";
import { CtaButton } from "@components/button";
import { TabContainer } from "@components/tab";
import { BankList } from "@components/bank-list";
import { useBankList, useDisclosure, useFetchApi } from "@hooks";
import { useAddInfoData, useBankListData } from "@libs";
import { toastState } from "@stores";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { Sheet } from "react-modal-sheet";
import { getAddInfoStatus } from "@app/acceptance/match/getAddInfoStatus";

export default function CommisionPage() {
  const router = useRouter();
  const callToast = useSetAtom(toastState);
  const { fetchApi } = useFetchApi();
  const [isError, setIsError] = useState(false);
  const { handleClickBank, curSelectedBank, setCurSelectedBank } =
    useBankList();
  const [acctNo, setAcctNo] = useState<string | null>(null);
  const [bankNm, setBankNm] = useState<string | null>(null);
  const [isPending, bankList] = useBankListData({
    grpCd: "BANK_CMMS",
    bankTypeCodeList: [BankTypeCode.BANK, BankTypeCode.STOCK],
  });
  const { isOpen, open, close } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 추가정보 등록 여부 가져오기
  const [checkAddInfo, getCheckAddInfo] = useAddInfoData();
  const storedData = sessionStorage.getItem("acctinfo");
  const getAccInfo = storedData ? JSON.parse(storedData) : [];
  let prevPath = sessionStorage.getItem("prevPath");

  /** 대표 / 소속직원 상태*/
  const { isFormId, isProfile, isrnEntrSuccess } = getAddInfoStatus(
    checkAddInfo?.data?.trregElement
  );

  const bankItem = bankList[1]
    ?.map((item: TResBank) => item.codeNm)
    .includes(curSelectedBank?.bankNm);

  useEffect(() => {
    const newActiveIndex = bankItem ? 1 : 0;
    setActiveIndex(newActiveIndex);
  }, [bankItem]);

  // checkAddInfo 있으면 bankNm / acctNo 내용 넣어주기.
  useEffect(() => {
    const banks = bankList[0] ?? [];
    const stocks = bankList[1] ?? [];
    const bankAll = banks.concat(stocks);
    const cmmsBank = bankAll.filter(
      (item: any) => item?.code === checkAddInfo?.data?.trregElement?.cmmsBankCd
    );
    setAcctNo(checkAddInfo?.data?.trregElement?.cmmsAcct);
    setCurSelectedBank({
      bankCd: checkAddInfo?.data?.trregElement?.cmmsBankCd,
      bankNm: cmmsBank[0]?.codeNm,
    });
  }, [checkAddInfo]);

  // 페이지 랜더링시 EFORM-ID에서 뒤로가기로 왔고,getAccInfo가 있으면 bankNm / acctNo 내용 넣어주기.
  useEffect(() => {
    if (prevPath === "/acceptance/match/add-info/rept/id" && getAccInfo) {
      setBankNm(getAccInfo[0]?.bankNm);
    }
  }, [bankNm]);

  // checkAddInfo가 저장되고나서 돌아왔을때, curSelectedBank 가 바뀌면 bankNm 바뀔수있게.
  useEffect(() => {
    setBankNm(curSelectedBank.bankNm);
    setCurSelectedBank({
      bankCd: curSelectedBank.bankCd,
      bankNm: curSelectedBank.bankNm,
    });
  }, [curSelectedBank.bankCd]);

  // 수수료 계좌 등록하기
  const { mutate: saveBankData } = useMutation({
    mutationKey: [""],
    mutationFn: async () => {
      setIsLoading(true);

      const response = await fetchApi({
        url:
          checkAddInfo?.data?.trregElement?.cmmsAcctYn === "Y"
            ? `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/modifyacct`
            : `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/saveacct`,
        method: "post",
        body: { bankCd: curSelectedBank.bankCd, acctNo: acctNo },
      });

      return response.json();
    },
    onSuccess: (res) => {
      setIsLoading(false);
      console.log("수수료 계좌 저장", res);
      if (res.code === "00") {
        if (res.data === "99") {
          setIsError(true);
          return;
        }
      }

      if (res.code === "99") {
        callToast({
          msg: "등록에 실패하였습니다. 다시 시도해주세요.",
          status: "error",
        });
        setIsError(false);
        return;
      } else {
        router.push("/acceptance/match/add-info/rept/id");
      }
    },
    onError: (error) => {
      setIsLoading(false);
      onFailed();
    },
  });

  const onFailed = () => {
    callToast({
      msg: "등록에 실패하였습니다.\n 다시 시도해주세요.",
      status: "error",
    });
    setIsError(false);
    return;
  };

  // e-form id 저장
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveBankData();
    sessionStorage.setItem(
      "acctinfo",
      JSON.stringify([
        { bankNm: bankNm, acctNo: acctNo, bankCd: curSelectedBank.bankCd },
      ])
    );
  }

  useEffect(() => {
    getCheckAddInfo();
  }, [getCheckAddInfo]);

  console.log(isError);

  return (
    <>
      {isLoading && <Loading />}
      <form className="py-6 px-4" onSubmit={onSubmit}>
        <Typography
          color={"text-kos-gray-800"}
          type={Typography.TypographyType.H1}
        >
          법무 수수료 안내용 계좌를 <br />
          등록해주세요
        </Typography>
        <Typography
          color={"text-kos-gray-600"}
          type={Typography.TypographyType.B1}
          className="my-3"
        >
          견적서에 포함되어 매수인에게 발송됩니다.
        </Typography>

        {/* 은행선택 */}
        <div className="relative mb-1 text-xs text-kos-gray-600 font-semibold">
          계좌정보
        </div>
        <div className="relative">
          <Input.InputGroup>
            <Input.Dropdown
              placeholder="선택안함"
              value={bankNm ?? ""}
              onClick={() => open()}
            />
            <Input.InputField
              value={acctNo ?? ""}
              placeholder="번호 입력"
              thousandSeparator={false}
              leadingZero={true}
              maxLength={20}
              styleType={isError ? "error" : "default"}
              onChange={(e) => {
                setAcctNo(e.target.value.replace(/[^\d]/g, ""));
                setIsError(false);
              }}
            />
          </Input.InputGroup>
        </div>
        {isError ? (
          <label className="absolute right-5 text-xs text-kos-red-500">
            예금주명이 일치하지 않습니다
          </label>
        ) : (
          ""
        )}

        {/* 다음 / 완료 버튼 */}
        <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
          <CtaButton
            buttonType="submit"
            size="XLarge"
            state={"On"}
            disabled={
              isLoading ||
              acctNo === null ||
              acctNo === "" ||
              curSelectedBank?.bankCd === "" ||
              !curSelectedBank
            }
          >
            {isFormId && isProfile && isrnEntrSuccess ? "완료" : "다음"}
          </CtaButton>
        </div>

        {/* 은행선택 시트 */}
        <Sheet
          className="border-none h-full"
          isOpen={isOpen}
          onClose={close}
          detent={"content-height"}
          snapPoints={[0.87, 400, 100, 0]}
        >
          <Sheet.Container
            className="h-full"
            style={{
              borderRadius: "20px 20px 0 0",
            }}
          >
            <Sheet.Header />
            <Sheet.Content className="px-4 relative h-full">
              <Typography
                type={Typography.TypographyType.H3}
                color="text-kos-black"
                className="text-center"
              >
                금융기관을 선택해주세요
              </Typography>
              <TabContainer
                defaultIndex={activeIndex}
                onChange={(index: number) => {
                  setActiveIndex(index);
                }}
                className="-mx-4 h-full"
              >
                <TabContainer.TabHeader
                  className="h-13 flex justify-around"
                  activeTab={activeIndex}
                  tabNameOptions={[{ name: "은행" }, { name: "증권사" }]}
                />
                <TabPanels
                  className="h-[calc(100%-72px)]"
                  onClick={() => close()}
                >
                  {!isPending &&
                    bankList?.map((result, i) => (
                      <TabPanel className="h-full" key={result[0].code}>
                        <BankList
                          bankList={[...result]}
                          handleClickBank={handleClickBank}
                          selectedBankList={[curSelectedBank]}
                          curSelectedBank={curSelectedBank}
                          isHeightFull={i === 0}
                        ></BankList>
                      </TabPanel>
                    ))}
                </TabPanels>
              </TabContainer>
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
