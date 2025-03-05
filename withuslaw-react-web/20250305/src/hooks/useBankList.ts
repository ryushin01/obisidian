"use client";

import { useState } from "react";

export type TSelectedBank = {
  bankCd: string;
  bankNm: string;
};

export default function useBankList(close?: () => void) {
  const [curSelectedBank, setCurSelectedBank] = useState({
    bankCd: "",
    bankNm: "",
  });
  const [selectedBankList, setSelectedBankList] = useState<TSelectedBank[]>([]);

  const handleClickBank = (el: TResBank) => {
    const selectedBank = { bankCd: el.code, bankNm: el.codeNm };
    setCurSelectedBank(selectedBank);
    setSelectedBankList((prev) => [...prev, selectedBank]);
    close && close();
  };

  return {
    handleClickBank,
    selectedBankList,
    curSelectedBank,
    setCurSelectedBank,
  };
}
