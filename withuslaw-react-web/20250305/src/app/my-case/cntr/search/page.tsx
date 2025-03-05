"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CloseWithCircle, MagnifyingOrange } from "@icons";
import { ToastType } from "@components/Constants";
import { useFetchApi } from "@hooks";
import { stringUtil } from "@utils";
import { authAtom, keywordStore, toastState, myCaseFilterStore } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import BackButton from "@app/_components/header/BackButton";
import SearchResultBox from "@app/my-case/cntr/search/SearchResultBox";

type TData = {
  textList: string[];
};

const MAX_LENGTH = 5;

export default function SearchPage() {
  const router = useRouter();
  const authInfo = useAtomValue(authAtom);
  const [filterBody, setFilterBody] = useAtom(myCaseFilterStore);
  const searchParams = useSearchParams();
  const cntrGb = searchParams.get("cntrGb");
  const [searchWords, setSearchWords] = useState("");
  const [isSearchAuto, setIsSearchAuto] = useState(false);
  const setKeyword = useSetAtom(keywordStore);
  const callToast = useSetAtom(toastState);
  const initBody = {
    bizNo: authInfo.bizNo,
    pageNum: 1,
    pageSize: 10,
    cntrGb: cntrGb,
  };
  const { fetchApi } = useFetchApi();
  /* 자동 검색어 추천 */
  const { data, mutate } = useMutation({
    mutationKey: ["auto-search", searchWords],
    mutationFn: (): Promise<TData> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchAutoText`,
        method: "post",
        body: { ...initBody, autoText: searchWords },
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  const handleSearch = (autoText: string) => {
    router.push(`/my-case`);
    setKeyword({ value: autoText });
    setFilterBody({
      startDate: "",
      endDate: "",
      regType: "",
    });
  };

  useEffect(() => {
    const numberRegex = /\d+(\.\d+)?/g;
    if (searchWords.match(numberRegex) && searchWords.length >= MAX_LENGTH) {
      setIsSearchAuto(true);
      mutate();
    } else if (searchWords.length > 0 && searchWords.match(/[가-힣a-zA-Z]/g)) {
      setIsSearchAuto(true);
      mutate();
    } else {
      if (searchWords === "") mutate();
      setIsSearchAuto(false);
    }
  }, [searchWords]);

  return (
    <div className="w-full h-full">
      <header className="h-[60px] pt-5 pb-3 px-2 box-border flex w-full items-center border-b-2 border-kos-orange-500">
        <div className="pl-2 pr-3 flex items-center">
          <BackButton />
        </div>
        <div className="grow flex items-center">
          <input
            type="text"
            // pattern="[가-힣a-zA-Z0-9]+"
            autoFocus={true}
            placeholder="차주명 혹은 여신번호를 입력해주세요"
            value={searchWords}
            onChange={(e) => {
              const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
              if (e.target.value.match(regExp)) {
                setSearchWords(
                  e.target.value.replace(/[^가-힣a-zA-Z0-9]/g, "")
                );
              } else {
                setSearchWords(e.target.value);
              }
            }}
            className="border-none outline-none w-full placeholder:text-kos-gray-600"
          />
        </div>
        <div>
          {isSearchAuto ? (
            <button
              type="button"
              className="_flex-center w-8 h-8"
              onClick={() => setSearchWords("")}
            >
              <Image src={CloseWithCircle} alt="검색 초기화 아이콘" />
            </button>
          ) : (
            <button
              type="button"
              className="_flex-center w-8 h-8"
              onClick={() => {
                let msg =
                  searchWords === ""
                    ? "검색어를 입력해주세요"
                    : searchWords.match(/\d/g) &&
                      searchWords.length < MAX_LENGTH
                    ? "정확한 검색을 위해 5자 이상 입력해주세요"
                    : (searchWords.match(/[가-힣a-zA-Z]/g) &&
                        searchWords.length < 1) ||
                      !stringUtil.isCompleteHangul(searchWords)
                    ? "정확한 검색을 위해 한 글자 이상 입력해주세요"
                    : "";
                if (msg !== "") {
                  callToast({
                    msg,
                    status: ToastType["notice"],
                  });
                }
              }}
            >
              <Image src={MagnifyingOrange} alt="검색하기 아이콘" />
            </button>
          )}
        </div>
      </header>
      <section className="w-full h-full bg-kos-gray-200">
        <SearchResultBox
          handleClickList={handleSearch}
          result={data?.textList}
          isInputText={isSearchAuto}
          searchWords={searchWords}
        />
      </section>
    </div>
  );
}
