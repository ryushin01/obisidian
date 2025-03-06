import React, { useState } from "react";
import Image from "next/image";
import { Typography } from "@components";
import { TSelectedBank } from "@hooks/useBankList";

type TProps = {
  bankInfo: TResBank;
  handleClickBank: (bank: TResBank) => void;
  disabledBankList?: TSelectedBankObj;
  checkedBank?: TSelectedBankObj;
  curSelectedBank: TSelectedBank;
};

const initBankInfo: TResBank = {
  code: "",
  codeNm: "",
  chgDtm: "",
  chgMembNo: "",
  crtDtm: "",
  crtMembNo: "",
  etc1: "",
  etc2: null,
  etc3: null,
  grpCd: "",
  grpDesc: "",
  grpNm: "",
  num: 0,
  useYn: "",
};

export function BankComponent({
  bankInfo,
  handleClickBank,
  disabledBankList,
  checkedBank,
  curSelectedBank,
}: TProps) {
  const getImgSrcFromCode = (code: string) =>
    `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/image/bankicon/${code}_M.png`;
  const isDisabled = disabledBankList
    ? Object.values(disabledBankList).some(
        (disabledBank) => disabledBank.bankCd === bankInfo.code
      )
    : false;
  const isChecked =
    checkedBank &&
    Object.values(checkedBank).some(
      (checkedBank) =>
        checkedBank.bankCd === bankInfo.code &&
        checkedBank.bankNm === bankInfo.codeNm
    );
  const isSelected =
    curSelectedBank.bankCd === bankInfo.code &&
    curSelectedBank.bankNm === bankInfo.codeNm;

  const defaultColor = "border-kos-gray-100 bg-kos-gray-100 text-kos-gray-700";

  const [color, setColor] = useState(
    isSelected || isChecked
      ? "bg-kos-orange-50 text-kos-orange-500 border-kos-orange-500"
      : isDisabled
      ? "border-kos-transparent bg-kos-white text-kos-gray-700"
      : defaultColor
  );

  return (
    <button
      disabled={isDisabled && !isSelected}
      type="button"
      key={bankInfo.code}
      className={`flex flex-col gap-y-0.5 items-center rounded-2xl py-2.5 w-full border border-1 ${color}`}
      onClick={() => {
        if (isSelected) {
          setColor(defaultColor);
          handleClickBank(initBankInfo);
        } else {
          handleClickBank(bankInfo);
        }
      }}
    >
      <Image
        className={isDisabled && !isSelected ? "grayscale opacity-30" : ""}
        loader={() => getImgSrcFromCode(bankInfo.code)}
        src={getImgSrcFromCode(bankInfo.code)}
        width={36}
        height={36}
        unoptimized
        alt={bankInfo.codeNm}
      />
      <Typography
        type={Typography.TypographyType.B5}
        color={`${isDisabled && !isSelected ? "opacity-30" : ""} text-inherit`}
        className="text-center"
      >
        {bankInfo.codeNm}
      </Typography>
    </button>
  );
}
