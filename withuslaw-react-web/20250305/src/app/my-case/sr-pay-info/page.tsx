"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ExclamationMarkBlue } from "@icons";
import { Divider, Input, Loading, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { useFetchApi } from "@hooks";
import { caseDetailAtom } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import CurrencyFormat from "react-currency-format";
import { useAtomValue } from "jotai";

/**
 * slmnLndProc [모집인(SR) 대출프로세스]
 * 01 : 조건부 취급대상 아님
 * 02 : 소유권이전
 * 03 : 소유권이전 & 후순위설정
 * 04 : 선순위말소/감액
 * 05 : 신탁등기 말소
 * 06 : 임차인 퇴거
 * 07 : 중도금
 * 08 : 임차권 및 전세권 말소
 * 09 : 임차권 명령 및 압류/가압류 말소
 */

export default function MY_PI_002M() {
  const searchParmas = useSearchParams();
  const isModify = searchParmas.get("previousState") ?? false;
  const { fetchApi } = useFetchApi();
  const [isLoading, setIsLoading] = useState(false);
  const { loanNo, regType } = useAtomValue(caseDetailAtom);
  const [procCd, setProcCd] = useState("");
  const [findloanNo, setFindLoanNo] = useState("");
  const [payInfo, setpayInfo] = useState<TSrSvo>({
    slmnLndProc: "",
    sellerNm1: "",
    sellerBirthDt1: "",
    sellerNm2: "",
    sellerBirthDt2: "",
    trstNm: "",
    cnsgnNm: "",
    bnfrNm: "",
    bnkGbCd: "020",
    bankNm: "우리은행",
    execAmt: 0,
  });

  const router = useRouter();

  const {
    control,
    setValue,
    getValues,
    clearErrors,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<TSrSvo>({
    defaultValues: {
      slmnLndProc: "",
      sellerNm1: "",
      sellerBirthDt1: "",
      sellerNm2: "",
      sellerBirthDt2: "",
      trstNm: "",
      cnsgnNm: "",
      bnfrNm: "",
      bnkGbCd: "020",
      bankNm: "우리은행",
      execAmt: 0,
    },
  });

  function moneyStringToNumber(money: string | number) {
    if (money === "") return 0;
    if (typeof money === "number") return money;
    return parseInt(money.replaceAll(",", ""));
  }

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
      if (res.code === "00" && res?.data?.srCvo) {
        setProcCd(res?.data?.srCvo.slmnLndProc);
        setpayInfo(res?.data?.srCvo);
        setFindLoanNo(res?.data?.loanNo);
      } else {
        console.log("지급정보등록 조회 실패", res);
      }
    },
    onError: (error) => {
      console.log("지급정보등록 조회 실패", error);
    },
  });

  useEffect(() => {
    getPayInfoList();
  }, [getPayInfoList]);

  useEffect(() => {
    if (!procCd || !payInfo) return;

    if (procCd === "02" || procCd === "03" || procCd === "09") {
      setValue("sellerNm1", payInfo.sellerNm1);
      setValue("sellerBirthDt1", payInfo.sellerBirthDt1);
      setValue("sellerNm2", payInfo.sellerNm2);
      setValue("sellerBirthDt2", payInfo.sellerBirthDt2);
      setValue("bnkGbCd", payInfo.bnkGbCd);
      setValue("bankNm", payInfo.bankNm);
      setValue("execAmt", payInfo.execAmt);
    } else if (procCd === "05") {
      setValue("trstNm", payInfo.trstNm);
      setValue("cnsgnNm", payInfo.cnsgnNm);
      setValue("bnfrNm", payInfo.bnfrNm);
      setValue("bnkGbCd", payInfo.bnkGbCd);
      setValue("bankNm", payInfo.bankNm);
      setValue("execAmt", payInfo.execAmt);
    } else if (procCd === "07") {
      setValue("sellerNm1", payInfo.sellerNm1);
      setValue("sellerBirthDt1", payInfo.sellerBirthDt1);
      setValue("bnkGbCd", payInfo.bnkGbCd);
      setValue("bankNm", payInfo.bankNm);
      setValue("execAmt", payInfo.execAmt);
    } else {
      setValue("bnkGbCd", payInfo.bnkGbCd);
      setValue("bankNm", payInfo.bankNm);
      setValue("execAmt", payInfo.execAmt);
    }
  }, [procCd, payInfo]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col grow w-full h-full relative">
        <div className="flex flex-col grow h-full w-full">
          <section className="relative grow">
            <section className="px-4 mt-6">
              <Typography color={"text-kos-gray-800"} type={TypographyType.H1}>
                대출금&nbsp;
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={payInfo.execAmt ?? 0}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원의
                <br />
                지급정보를 입력해주세요
              </Typography>
              <p className="text-kos-blue-500 text-sm flex items-start font-semibold gap-x-2 mt-4">
                <Image src={ExclamationMarkBlue} alt="exclamation mark" />
                대출모집인 취급건으로 지급정보 수정이 불가합니다. &#40;우리은행
                입금 지정 계좌로 대출금 지급&#41;
              </p>
            </section>
            {(procCd === "02" || procCd === "03" || procCd === "09") && (
              <>
                <section className="px-4 py-6 flex flex-col gap-y-5">
                  <Typography
                    color={"text-kos-gray-800"}
                    type={TypographyType.H2}
                  >
                    매도인
                  </Typography>
                  <Input.InputContainer>
                    <Input.Label htmlFor={"sellerNm1"}>{"이름"}</Input.Label>
                    <Controller
                      control={control}
                      name="sellerNm1"
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
                    <Input.Label htmlFor={"sellerBirthDt1"}>
                      {"생년월일"}
                    </Input.Label>
                    <Controller
                      control={control}
                      name="sellerBirthDt1"
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
                {payInfo.sellerNm2 && (
                  <section className="px-4 py-6 flex flex-col gap-y-5">
                    <Typography
                      color={"text-kos-gray-800"}
                      type={TypographyType.H2}
                    >
                      &#40;공동&#41; 매도인
                    </Typography>
                    <Input.InputContainer>
                      <Input.Label htmlFor={"sellerNm2"}>{"이름"}</Input.Label>
                      <Controller
                        control={control}
                        name="sellerNm2"
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
                      <Input.Label htmlFor={"sellerBirthDt2"}>
                        {"생년월일"}
                      </Input.Label>
                      <Controller
                        control={control}
                        name="sellerBirthDt2"
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
              </>
            )}
            {procCd === "05" && (
              <section className="px-4 py-6 flex flex-col gap-y-5">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  신탁사
                </Typography>
                <Input.InputContainer>
                  <Input.Label htmlFor={"trstNm"}>
                    {"수탁자명(신탁사)"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="trstNm"
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
                  <Input.Label htmlFor={"cnsgnNm"}>
                    {"위탁자명(부동산소유자)"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="cnsgnNm"
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
                  <Input.Label htmlFor={"bnfrNm"}>{"우선 수익자"}</Input.Label>
                  <Controller
                    control={control}
                    name="bnfrNm"
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
            {procCd === "07" && (
              <section className="px-4 py-6 flex flex-col gap-y-5">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  매도인&#40;담보제공자&#41;
                </Typography>
                <Input.InputContainer>
                  <Input.Label htmlFor={"sellerNm1"}>{"이름"}</Input.Label>
                  <Controller
                    control={control}
                    name="sellerNm1"
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
                  <Input.Label htmlFor={"sellerBirthDt1"}>
                    {"생년월일"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="sellerBirthDt1"
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
            {(procCd === "02" ||
              procCd === "03" ||
              procCd === "05" ||
              procCd === "07" ||
              procCd === "09") && <Divider />}
            <section className="py-3 px-4">
              <div className="py-3">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  상환금{" "}
                </Typography>
              </div>
              <Input.InputContainer key="bankGbCd" className={`pb-5`}>
                <Input.Label htmlFor="test">상환정보</Input.Label>
                <Input.InputGroup>
                  <Controller
                    control={control}
                    name={`bankNm`}
                    render={({ field: { onBlur, value } }) => (
                      <Input.Dropdown
                        value={value ?? ""}
                        onClick={() => null}
                        placeholder={"우리은행"}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`execAmt`}
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        value={moneyStringToNumber(value)}
                        isCurrency={true}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                </Input.InputGroup>
              </Input.InputContainer>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
