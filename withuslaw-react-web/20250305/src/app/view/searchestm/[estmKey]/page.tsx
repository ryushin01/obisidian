"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { DownArrow } from "@icons";
import { Loading, Typography } from "@components";
import { formatDate } from "@utils";
import { hypenNumber } from "@utils/hypenNumber";
import { authAtom } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import CurrencyFormat from "react-currency-format";

export default function Page() {
  const estmKeyParams = useParams();
  const { permCd } = useAtomValue(authAtom);
  const [isTaxPaymentOpen, setIsTaxPaymentOpen] = useState(false);
  const [isLegalFeeOpen, setIsLegalFeeOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["view-searchestm"],
    queryFn: async (): Promise<TWebviewEstimate> => {
      const response = await fetch(
        `https://appwooridev.kosapp.co.kr/api/view/searchestm/${estmKeyParams.estmKey}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const responseData = await response.json();
      return responseData.data;
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  // 법무수수료 합계 계산
  let totalFee;

  if (data) {
    totalFee = data?.fee + data?.vat;
  }

  const formatDateString = (dateString: string | undefined) => {
    if (!dateString || dateString.length !== 8) return "";
    const year = dateString.slice(0, 4); // 연도
    const month = dateString.slice(4, 6); // 월
    const day = dateString.slice(6, 8); // 일

    // Date 객체로 변환 (주의: JavaScript의 월은 0부터 시작하므로 month에 -1)
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  /* statCd = 10 : 사전 견적서 | statCd = 20 : 당일 견적서 */

  return (
    <main className="w-full h-full overflow-y-scroll bg-kos-white">
      <Typography
        className="py-5 text-lg font-semibold text-center"
        color={"text-kos-gray-800"}
        type={Typography.TypographyType.H1}
      >
        견적서
        {/* {data?.statCd === "20" ? "당일 견적서" : "사전 견적서"} */}
      </Typography>
      <div className="p-4 border-t border-t-kos-gray-200">
        <section>
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
            className="mt-4 mb-3"
          >
            법무사사무소
          </Typography>
          <div className="flex-col items-center pl-5 pr-5 pt-5 pb-5 mb-[32px] w-500 h-500 bg-kos-gray-100 rounded-xl">
            {data?.statCd != "20" ? (
              <>
                <div className="flex-col items-center justify-around mt-[11px]">
                  <Typography
                    color={"text-kos-gray-800"}
                    type={Typography.TypographyType.H1}
                  >
                    {data?.officeNm}
                  </Typography>
                </div>
                <ul className="flex-col items-start w-full mt-[12px] py-2 border-t border-t-kos-gray-300">
                  {data?.officeAddr && (
                    <>
                      <li className="flex mt-2">
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B2}
                          className="mr-2"
                        >
                          ·
                        </Typography>
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B1}
                        >
                          {data?.officeAddr}
                        </Typography>
                      </li>
                    </>
                  )}
                  {data?.officeTelno && (
                    <>
                      <div className="flex">
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B2}
                          className="mr-2"
                        >
                          ·
                        </Typography>

                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B1}
                        >
                          {hypenNumber(data?.officeTelno!)}
                        </Typography>
                      </div>
                    </>
                  )}
                </ul>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <div className="flex-col items-center justify-around mt-[11px]">
                    <Typography
                      color={"text-kos-gray-600"}
                      type={Typography.TypographyType.B1}
                    >
                      {data?.officeNm}
                    </Typography>
                    <Typography
                      className=" mt-[12px]"
                      color={"text-kos-gray-800"}
                      type={Typography.TypographyType.H1}
                    >
                      {data?.mvLwyrMembNm}
                    </Typography>
                  </div>
                  <div className="rounded-full overflow-hidden">
                    {data?.imgSeq === "" ? (
                      <Image src={""} alt="profile" width={80} />
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/searchview?imgSeq=${data?.imgSeq}`}
                        alt="profile image"
                        width={80}
                        height={80}
                        className="object-cover"
                        unoptimized={true}
                      />
                    )}
                  </div>
                </div>

                <div className="flex-col items-start w-full mt-[12px] py-2 border-t border-t-kos-gray-300">
                  {data?.officeAddr && (
                    <>
                      <div className="flex mt-2">
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B2}
                          className="mr-2"
                        >
                          ·
                        </Typography>
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B1}
                        >
                          {data?.officeAddr}
                        </Typography>
                      </div>
                    </>
                  )}
                  {data?.officeTelno && (
                    <>
                      <div className="flex">
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B2}
                          className="mr-2"
                        >
                          ·
                        </Typography>

                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B1}
                        >
                          {hypenNumber(data?.officeTelno!)}
                        </Typography>
                      </div>
                    </>
                  )}
                  {data?.mvLwyrMembCphnNo && (
                    <>
                      <div className="flex">
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B2}
                          className="mr-2"
                        >
                          ·
                        </Typography>
                        <Typography
                          color={"text-kos-gray-600"}
                          type={Typography.TypographyType.B1}
                        >
                          {hypenNumber(data?.mvLwyrMembCphnNo)}
                        </Typography>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
        <section>
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            견적 내용
          </Typography>
          <ul>
            <li className="flex items-start justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                소재지
              </Typography>
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.B1}
                className="text-end w-60 break-words"
              >
                {data?.rdnmInclAddr}
              </Typography>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                매매금액
              </Typography>
              <div className="text-kos-gray-800 font-medium">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.slPrc}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                잔금일
              </Typography>
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.B1}
              >
                {formatDate(data?.execDt ?? "")}
              </Typography>
            </li>
          </ul>
        </section>
      </div>
      {/* {data?.schdTm && (
          <div className="flex items-center justify-between mt-[9px]">
            <Typography
              color={"text-kos-gray-600"}
              type={Typography.TypographyType.B2}
            >
              잔금일시
            </Typography>
            <Typography
              color={"text-kos-gray-800"}
              type={Typography.TypographyType.B1}
            >
              {data?.schdDtm}
              {data?.schdTm}
            </Typography>
          </div>
        )} */}

      <ul className="pl-4 pr-4 pt-3 pb-2 border-t border-t-kos-gray-200">
        <li className="flex justify-between w-full">
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            제세공과금
          </Typography>
          <div className="flex items-center">
            <div className="text-kos-gray-800 font-semibold">
              <CurrencyFormat
                decimalSeparator={"false"}
                value={`${data?.totalTax}`}
                displayType={"text"}
                thousandSeparator={true}
              />
              원
            </div>
            <button onClick={() => setIsTaxPaymentOpen((prev) => !prev)}>
              <Image
                src={DownArrow}
                className={`${isTaxPaymentOpen ? "rotate-180" : "rotate-0"}`}
                style={{
                  filter:
                    "invert(63%) sepia(92%) saturate(2337%) hue-rotate(360deg) brightness(103%) contrast(103%)"
                }}
                alt="bottom arrow icon"
              />
            </button>
          </div>
        </li>
        {isTaxPaymentOpen && (
          <>
            {/* <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-brown-500"}
                type={Typography.TypographyType.B2}
              >
                제세공과금 합계
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.totalTax}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li> */}
            <li className="flex items-center justify-between mt-5">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                취등록세
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.registTax}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                지방교육세
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.localEduTax}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                농특세
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.specialTax}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                인지세
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.stampTax}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                등기신청수수료
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.rgstrReqFee}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                본인부담금
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.dscntRtAmount}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            {data?.baseDate && (
              <>
                <li className="text-right">
                  <Typography
                    color={"text-kos-gray-500"}
                    type={Typography.TypographyType.B5}
                  >
                    {data?.statCd === "20" ? data?.baseDate : data?.bfBaseDate}{" "}
                    할인율{" "}
                    {data?.statCd === "20" ? data?.disctRt : data?.bfDisctRt}%
                    기준
                  </Typography>
                </li>
              </>
            )}
          </>
        )}
      </ul>

      <ul className="pl-4 pr-4 pt-2 pb-3 border-b border-b-kos-gray-200">
        <li className="flex justify-between w-full">
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            법무수수료
          </Typography>
          <div className="flex items-center">
            <div className="text-kos-gray-800  font-semibold">
              <CurrencyFormat
                decimalSeparator={"false"}
                value={`${totalFee}`}
                displayType={"text"}
                thousandSeparator={true}
              />
              원
            </div>
            <button onClick={() => setIsLegalFeeOpen((prev) => !prev)}>
              <Image
                src={DownArrow}
                className={`${isLegalFeeOpen ? "rotate-180" : "rotate-0"}`}
                style={{
                  filter:
                    "invert(63%) sepia(92%) saturate(2337%) hue-rotate(360deg) brightness(103%) contrast(103%)"
                }}
                alt="bottom arrow icon"
              />
            </button>
          </div>
        </li>
        {isLegalFeeOpen && (
          <>
            {/* <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-brown-500"}
                type={Typography.TypographyType.B2}
              >
                법무수수료 합계
              </Typography>
              <div className="text-kos-gray-800  font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${totalFee}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li> */}
            <li className="flex items-center justify-between mt-5">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                수수료
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.fee}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
            <li className="flex items-center justify-between mt-[9px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                부가세
              </Typography>
              <div className="text-kos-gray-800 font-semibold">
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={`${data?.vat}`}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원
              </div>
            </li>
          </>
        )}
      </ul>

      <div className="pt-4 px-4 pb-6 border-t-1 border-t-kos-gray-200">
        <div className="flex items-center justify-between mt-[9px]">
          <Typography
            color={"text-kos-brown-500"}
            type={Typography.TypographyType.H3}
          >
            총합계
          </Typography>
          <div className="text-kos-gray-800 text-2xl font-bold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${data?.totalAmount}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </div>
        {data?.statCd === "20" && (
          <div className="mt-4 p-5 bg-kos-gray-100 rounded-xl">
            <Typography
              color={"text-kos-brown-500"}
              type={Typography.TypographyType.B4}
            >
              법무수수료 입금 계좌정보
            </Typography>
            <div className="flex items-center mt-[13px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B1}
                className="mr-2"
              >
                {data?.bankNm}
              </Typography>
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B1}
              >
                {data?.acct}
              </Typography>
            </div>
            <div className="flex items-center mt-2">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B1}
                className="mr-2"
              >
                예금주명
              </Typography>
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B1}
              >
                {data?.reptMembNm}
              </Typography>
            </div>
          </div>
        )}
      </div>

      <div className="py-6 px-4">
        <Typography
          color="text-kos-gray-800"
          type={Typography.TypographyType.H2}
        >
          안내사항
        </Typography>
        <Typography
          className="mt-3 break-all"
          color="text-kos-gray-700"
          type={Typography.TypographyType.B1}
        >
          {data?.memo}
        </Typography>
      </div>

      <footer className="text-center w-full bg-kos-brown-300 text-kos-white py-5 px-5 pl-2 pr-2">
        {data?.statCd != "20" && (
          <>
            <Typography
              color="text-kos-white"
              type={Typography.TypographyType.H4}
            >
              국민주택채권은
            </Typography>
            <Typography
              color="text-kos-white"
              type={Typography.TypographyType.H4}
              className="mb-2"
            >
              잔금일자 채권시세에 따라 변동됩니다.
            </Typography>
          </>
        )}
        <Typography color="text-kos-white" type={Typography.TypographyType.B1}>
          {formatDateString(
            data?.statCd === "20" ? data?.execDt : data?.estmRegDt
          )}
        </Typography>
      </footer>
    </main>
  );
}
