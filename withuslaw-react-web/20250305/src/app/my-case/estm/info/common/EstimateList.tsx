"use client";

import React from "react";
import { Typography } from "@components";
import { authAtom } from "@stores";
import { useAtomValue } from "jotai";
import CurrencyFormat from "react-currency-format";

type TBank = {
  bankNm: string;
  acct: string;
  reptMembNm: string;
};

type TResultProps = {
  clientForm: TEstimateSaveForm;
  searchCustBankInfo?: TBank;
  searchBndDisRt?: TDisc;
};

export default function EstimateList({
  clientForm,
  searchCustBankInfo,
  searchBndDisRt,
}: TResultProps) {
  const totalFee = clientForm?.totalFee ?? clientForm.fee + clientForm.vat;
  const { permCd } = useAtomValue(authAtom);

  return (
    <div>
      <ul className="p-4 border-b border-b-kos-gray-200">
        <li className="flex items-center justify-between">
          <Typography
            color={"text-kos-brown-500"}
            type={Typography.TypographyType.B1}
          >
            제세공과금
          </Typography>
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.totalTax}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </Typography>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            취등록세
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.registTax}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            지방교육세
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.localEduTax}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            농특세
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.specialTax}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            인지세
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.stampTax}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            등기신청수수료
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.rgstrReqFee}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            본인부담금
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.dscntRtAmount}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
        <li className="text-right">
          <Typography
            color={"text-kos-gray-500"}
            type={Typography.TypographyType.B5}
          >
            {searchBndDisRt?.baseDate} 할인율 {searchBndDisRt?.disctRt}% 기준
          </Typography>
        </li>
      </ul>

      <ul className="p-4 border-b-1 border-b-kos-gray-200">
        <li className="flex items-center justify-between">
          <Typography
            color={"text-kos-brown-500"}
            type={Typography.TypographyType.B1}
          >
            법무수수료
          </Typography>
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${totalFee}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </Typography>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            수수료
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.fee}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
        <li className="flex items-center justify-between mt-2">
          <Typography
            color={"text-kos-gray-600"}
            type={Typography.TypographyType.B2}
          >
            부가세
          </Typography>
          <div className="text-kos-gray-800 font-semibold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.vat}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </li>
      </ul>

      <div className="pt-4 px-4 pb-6 border-t border-t-kos-gray-200">
        <div className="flex items-center justify-between">
          <Typography
            color={"text-kos-brown-500"}
            type={Typography.TypographyType.H3}
          >
            총합계
          </Typography>
          <div className="text-kos-gray-800 text-2xl font-bold">
            <CurrencyFormat
              decimalSeparator={"false"}
              value={`${clientForm.totalAmount}`}
              displayType={"text"}
              thousandSeparator={true}
            />
            원
          </div>
        </div>
        {(permCd === "00" || permCd === "01") && (
          <div className="mt-4 p-5 bg-kos-gray-100 rounded-xl">
            <Typography
              color={"text-kos-blue-500"}
              type={Typography.TypographyType.B4}
            >
              법무 수수료 안내용 계좌정보
            </Typography>
            <div className="flex items-center justify-between mt-[13px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                {searchCustBankInfo?.bankNm}
              </Typography>
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.B1}
              >
                {searchCustBankInfo?.acct}
              </Typography>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                예금주명
              </Typography>
              <Typography
                color={"text-kos-gray-800"}
                type={Typography.TypographyType.B1}
              >
                {searchCustBankInfo?.reptMembNm}
              </Typography>
            </div>
            <div className="text-right">
              <Typography
                color={"text-kos-gray-500"}
                type={Typography.TypographyType.B5}
              >
                계좌정보는 내 정보에서 수정 가능합니다
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
