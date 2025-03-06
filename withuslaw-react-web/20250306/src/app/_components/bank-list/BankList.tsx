import React, { ReactNode } from "react";
import { BankComponent } from "@components/bank-list/BankComponent";
import { TSelectedBank } from "@hooks/useBankList";

type TProps = {
  bankList: TResBank[];
  handleClickBank: (bank: TResBank) => void;
  isHeightFull?: boolean;
  selectedBankList?: TSelectedBankObj;
  checkedBank?: TSelectedBankObj;
  curSelectedBank: TSelectedBank;
  children?: ReactNode;
};

export default function BankList({
  bankList,
  handleClickBank,
  isHeightFull = false,
  selectedBankList,
  curSelectedBank,
  checkedBank,
  children,
}: TProps) {
  return (
    <div className="w-screen h-full overflow-y-scroll">
      <div
        className={`w-screen grid grid-cols-3 gap-2 px-4 pt-4 ${
          isHeightFull ? "pb-48" : "pb-48"
        }`}
      >
        {bankList.map((bank) => (
          <BankComponent
            key={bank.code}
            bankInfo={bank}
            handleClickBank={handleClickBank}
            checkedBank={checkedBank}
            disabledBankList={selectedBankList}
            curSelectedBank={curSelectedBank}
          />
        ))}
        {children}
      </div>
    </div>
  );
}
