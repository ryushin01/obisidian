"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { NoticeIcon } from "@icons";
import { BankTypeCode } from "@constants";
import { Button, Header, Input, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { BankList } from "@components/bank-list";
import { TabContainer } from "@components/tab";
import { useBankList, useDisclosure, useFetchApi } from "@hooks";
import { useAddInfoData, useBankListData } from "@libs";
import { authAtom, toastState } from "@stores";
import { usePrevEvent } from "@utils/pushState";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { Sheet } from "react-modal-sheet";
import { getAddInfoStatus } from "@app/acceptance/match/getAddInfoStatus";

type TBank = {
  bankCd: string;
  acctNo: string;
};

export default function ReptPage() {
  const { fetchApi } = useFetchApi();
  const [showEdit, setShowEdit] = useState(false);
  const { isOpen, close, open } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState(0);
  const { handleClickBank, curSelectedBank } = useBankList();
  const [acctNo, setAcctNo] = useState<string | null | any>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, bankList] = useBankListData({
    grpCd: "BANK_CMMS",
    bankTypeCodeList: [BankTypeCode.BANK, BankTypeCode.STOCK],
  });
  const searchParams = useSearchParams();
  const { permCd } = useAtomValue(authAtom);
  const isPreviousNextjs = searchParams.get("previousState") === "nextjs";
  const callToast = useSetAtom(toastState);

  // 추가정보 등록 여부 가져오기
  const [checkAddInfo, getCheckAddInfo] = useAddInfoData();
  const authInfo = useAtomValue(authAtom);

  const { isBank, isFormId, isProfile } = getAddInfoStatus(
    checkAddInfo?.data?.trregElement
  );

  const [resCode, setResCode] = useState("");
  // 계좌 정보 조회
  const { data: getCommisionBank, refetch } = useQuery({
    queryKey: ["search-chcmmsacct"],
    queryFn: async () => {
      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/searchcmmsacct`,
        method: "get",
      });
      const res = await response.json();
      const resCode = res.code;
      if (resCode === "00") {
        console.log('resCode : "00"');
        setResCode("00");
      } else if (resCode === "99") {
        console.log('resCode : "99"');
        setResCode("99");
      }
      return res.data;
    },
  });

  //   // 계좌 정보 조회
  //   const { data: getCommisionBank, refetch } = useQuery({
  //     queryKey: ["search-chcmmsacct"],
  //     queryFn: () =>
  //       fetchApi({
  //         url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/searchcmmsacct`,
  //         method: "get",
  //       })
  //         .then((res) => res.json())
  //         .then((res) => res.data),
  //   },
  // );

  const bankItem = bankList[0]
    ?.map((item: TResBank) => item.codeNm)
    .includes(getCommisionBank?.bankNm);

  // 계좌 정보 수정
  const { mutate: editCommisionBank } = useMutation({
    mutationKey: ["acct-modifyacct"],
    mutationFn: (body: TBank) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/modifyacct`,
        method: "post",
        body: body,
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("계좌 정보 수정", res);

      refetch();

      if (res.code === "00") {
        if (res.data == "99") {
          setErrorMessage(res.msg);
          setIsError(true);
          return;
        } else {
          callToast({
            msg: "법무 수수료 안내용 계좌가 수정되었습니다.",
            status: "success",
            dim: true,
          });
        }

        setShowEdit(false);
      }

      if (res.code === "99") {
        callToast({
          msg: "계좌등록에 실패했습니다. 다시 시도해주세요.",
          status: "error",
        });
        setErrorMessage("");
        setIsError(false);
      }
    },
  });

  // 안내용 계좌 수정 저장
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editCommisionBank({
      bankCd:
        curSelectedBank?.bankCd === ""
          ? getCommisionBank?.bankCd
          : curSelectedBank?.bankCd,
      acctNo: acctNo ?? getCommisionBank?.acctNo,
    });
  };

  const onPrevClick = () => {
    setShowEdit(false);
  };

  usePrevEvent(onPrevClick, showEdit);

  useEffect(() => {
    getCheckAddInfo();
  }, [getCheckAddInfo]);

  useEffect(() => {
    const newActiveIndex = bankItem === false ? 1 : 0;
    setActiveIndex(newActiveIndex);
  }, [bankItem]);

  return (
    <>
      <Header
        backCallBack={
          isPreviousNextjs
            ? undefined
            : () => {
                if (showEdit) {
                  setShowEdit(false);
                  setAcctNo(getCommisionBank?.acctNo);
                  curSelectedBank.bankCd === getCommisionBank.bankCd;
                  curSelectedBank.bankNm === getCommisionBank.bankNm;
                  setIsError(false);
                  setErrorMessage("");
                } else {
                  //@ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    // @ts-ignore
                    mode: "pop",
                  });
                }
              }
        }
        title={
          showEdit ? "법무 수수료 안내용 계좌 등록 " : "법무 수수료 안내용 계좌"
        }
        rightItem={
          (permCd === "00" || permCd === "01") && (
            <Button.TextButton
              size={"Medium"}
              state={true}
              onClick={() => setShowEdit(true)}
            >
              {resCode === "99" || showEdit ? "" : "수정"}
            </Button.TextButton>
          )
        }
      />
      {checkAddInfo?.data?.trregElement?.cmmsAcctYn === "N" ||
      resCode === "99" ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
          <Image src={NoticeIcon} alt="notice icon" width={48} height={48} />
          <Typography
            color="text-kos-gray-600"
            type={TypographyType.H5}
            className="mt-3 mb-2.5"
          >
            등록된 법무 수수료 안내용 계좌가 없습니다.
          </Typography>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="px-4">
            <Typography
              color="text-kos-gray-800"
              type={TypographyType.H2}
              className="mt-6 mb-3"
            >
              {showEdit ? (
                <p>
                  법무 수수료 안내용 계좌{" "}
                  <span className="text-red-500">*</span>
                </p>
              ) : (
                "법무 수수료 안내용 계좌"
              )}
            </Typography>
            {showEdit ? (
              <>
                {/* 수수료 계좌 수정 */}
                <Input.InputContainer className="w-full mt-1">
                  <Input.Label htmlFor="">계좌정보</Input.Label>
                  <Input.InputGroup>
                    <Input.Dropdown
                      value={
                        curSelectedBank?.bankCd === ""
                          ? getCommisionBank?.bankNm
                          : curSelectedBank?.bankNm
                      }
                      onClick={() => open()}
                    />
                    <Input.TextInput
                      type="text"
                      value={acctNo ?? getCommisionBank?.acctNo}
                      minLength={1}
                      maxLength={20}
                      onChange={(e) => {
                        setAcctNo(e.target.value.replace(/[^\d-]/g, ""));
                      }}
                      isError={isError}
                    />
                  </Input.InputGroup>
                  <Typography
                    color="text-kos-red-500"
                    type={TypographyType.B5}
                    className="ml-auto"
                  >
                    {errorMessage}
                  </Typography>
                </Input.InputContainer>
              </>
            ) : (
              <>
                {/* 수수료 계좌 조회 */}
                <Input.InputContainer className="w-full mt-1">
                  <Input.Label htmlFor="">계좌정보</Input.Label>
                  <Input.InputGroup>
                    <Input.TextInput
                      value={getCommisionBank?.bankNm || ""}
                      disabled
                      style={{ color: "#7D7D7D" }}
                    />
                    <Input.TextInput
                      value={getCommisionBank?.acctNo || ""}
                      disabled
                      style={{ color: "#7D7D7D" }}
                    />
                  </Input.InputGroup>
                </Input.InputContainer>
              </>
            )}
          </div>
          {showEdit && (
            <div
              className="fixed w-full left-0 bottom-0 bg-kos-white p-4"
              style={{
                boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)",
              }}
            >
              <Button.CtaButton
                type="submit"
                size={"XLarge"}
                state={"On"}
                disabled={
                  (curSelectedBank.bankCd === "" &&
                    (!acctNo || acctNo === "")) ||
                  getCommisionBank?.acctNo === acctNo
                  // || getCommisionBank?.bankCd === curSelectedBank.bankCd
                }
              >
                인증하기
              </Button.CtaButton>
            </div>
          )}
        </form>
      )}

      <Sheet
        className="border-none h-full"
        isOpen={isOpen}
        onClose={close}
        detent={"content-height"}
        snapPoints={[600, 400, 100, 0]}
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
              <TabPanels className="h-full" onClick={() => close()}>
                {!isPending &&
                  bankList?.map((result, i) => (
                    <TabPanel className="h-full" key={result[0].code}>
                      <BankList
                        bankList={[...result]}
                        handleClickBank={handleClickBank}
                        checkedBank={
                          curSelectedBank.bankNm === ""
                            ? [getCommisionBank]
                            : ""
                        }
                        curSelectedBank={curSelectedBank}
                        isHeightFull={i === 0}
                      />
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
    </>
  );
}
