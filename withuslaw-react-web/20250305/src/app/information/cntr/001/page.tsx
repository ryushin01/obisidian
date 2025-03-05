"use client";

import React, { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExclamationMarkWithGrayBg } from "@icons";
import { Button, Divider, Header, Input, Typography } from "@components";
import { useSearchRpyAcct } from "@hooks";
import { authAtom, caseDetailAtom, routerAtom } from "@stores";
import { useAtomValue } from "jotai";

const EmptyBox = ({
  isRept = false,
  className,
  children,
}: {
  isRept?: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={`w-full h-full flex flex-col gap-y-3 justify-center items-center grow ${
      className ?? ""
    }`}
  >
    <Image src={ExclamationMarkWithGrayBg} alt="exclamation mark" />
    <Typography type={Typography.TypographyType.H5} color="text-kos-gray-600">
      {children}
    </Typography>
    {isRept && (
      <Link href={"/information/cntr/004"}>
        <Button.SecondaryButton size="Small">
          계좌 등록하기
        </Button.SecondaryButton>
      </Link>
    )}
  </div>
);

export default function IN_CN_001M() {
  const [isLoading, data] = useSearchRpyAcct();
  const { isRept, permCd } = useAtomValue(authAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreviousNextjs = searchParams.get("previousState") === "nextjs";
  const pageRouter = useAtomValue(routerAtom);
  const checkPath = sessionStorage.getItem("saveRoute");
  const { loanNo } = useAtomValue(caseDetailAtom);

  const isWooriAcctExist = !!data?.woori;
  const isOtherBankAcctListExist =
    !!data?.bankList && data?.bankList.length > 0;

  console.log("상환금 수령용 계좌 data", data);

  return (
    <div className="w-full h-full relative flex flex-col grow">
      <Header
        backCallBack={() => {
          if (checkPath === `/my-case/cntr/${loanNo}`) {
            // @ts-ignore
            window.flutter_inappwebview.callHandler("flutterFunc", {
              mode: "GO_MYINFO",
            });
          } else {
            //@ts-ignore
            window.flutter_inappwebview.callHandler("flutterFunc", {
              // @ts-ignore
              mode: "pop",
            });
          }
        }}
        title="상환금 수령용 계좌"
        rightItem={
          (permCd === "00" || permCd === "01") &&
          !!data && (
            <Button.TextButton
              size="Medium"
              state={true}
              onClick={() => router.push("/information/cntr/004")}
            >
              추가
            </Button.TextButton>
          )
        }
      />
      <div className="flex flex-col grow w-full">
        {!isWooriAcctExist && !isOtherBankAcctListExist ? (
          <EmptyBox isRept={isRept}>
            등록된 상환금 수령용 계좌가 없습니다
          </EmptyBox>
        ) : (
          <section className="relative grow">
            <section className="px-4 mt-6">
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.H2}
              >
                우리은행 상환금 수령용 계좌
              </Typography>
            </section>
            {isWooriAcctExist && (
              <section className="py-3">
                <Input.InputContainer className="w-full mt-1 px-4">
                  <Input.Label htmlFor="woori">계좌정보</Input.Label>
                  <div className="flex w-full gap-x-2 ">
                    <div className="basis-5/12">
                      <Input.InputField
                        disabled={true}
                        inputType="text"
                        value={"우리은행"}
                      />
                    </div>
                    <div className="basis-7/12">
                      <Input.InputField
                        inputType="text"
                        disabled={true}
                        name="acct"
                        value={data.woori.acctNo}
                      />
                    </div>
                  </div>
                </Input.InputContainer>
              </section>
            )}
            <Divider />
            <section className="py-3">
              <div className="py-3 px-4">
                <Typography
                  color={"text-kos-gray-800"}
                  type={Typography.TypographyType.H2}
                >
                  타행 상환금 수령용 계좌
                </Typography>
              </div>
              {isOtherBankAcctListExist ? (
                data?.bankList.map((bank, i) => (
                  <div
                    key={bank.acctNo}
                    className={`pb-5 ${
                      i !== 0
                        ? "pt-5 border-t border-t-1 border-kos-gray-200"
                        : ""
                    }`}
                  >
                    <Input.InputContainer className="w-full mt-1 px-4">
                      <Input.Label htmlFor="">계좌정보</Input.Label>
                      <Input.InputGroup>
                        <Input.TextInput value={bank.bankNm ?? ""} disabled />
                        <Input.TextInput value={bank.acctNo ?? ""} disabled />
                      </Input.InputGroup>
                    </Input.InputContainer>
                  </div>
                ))
              ) : (
                <EmptyBox className="mt-9">
                  등록된 타행 계좌는 없습니다
                </EmptyBox>
              )}
            </section>
          </section>
        )}
      </div>
    </div>
  );
}
