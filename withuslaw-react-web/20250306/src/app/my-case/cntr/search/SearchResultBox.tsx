"use client";

import React, { useState, Key } from "react";
import Image from "next/image";
import { CloseIcon, Magnifying } from "@icons";
import { Alert, Typography } from "@components";
import { useDisclosure, useLocalStorageExpire } from "@hooks";

type TProps = {
  result?: string[];
  isInputText: boolean;
  handleClickList: (autoText: string) => void;
  setActiveTab?: string;
  searchWords?: string;
};

export default function SearchResultBox({
  result,
  isInputText,
  handleClickList,
  setActiveTab,
  searchWords = ''
}: TProps) {
  const SEARCH_MAX_CNT = 20;
  const { isStorageExist, getItem, setItem, removeItem, removeStorage } =
    useLocalStorageExpire({
      key: "searchWords",
      time: 8640000 * 90, // 90일
      maxLength: SEARCH_MAX_CNT,
    });
  const [, setTriggerClient] = useState(false);
  const { isOpen, open, close } = useDisclosure();
  const searchWordList = [...getItem()].slice(SEARCH_MAX_CNT * -1);

  const highlightedText = (text: string, search: string) => {
    if(search !== '' && text.includes(search)) {
      const parts = text.split(new RegExp(`(${search})`, 'gi'));

      return (
        <>
          {parts.map((part, index) => 
            part === search ? (
             <strong key={index}>{part}</strong>
            ) : ( part )
          )}
        </>
      );
    }

    return text;
  }

  // 검색어 입력 || 검색 결과 있는 경우
  if (isInputText || (result && result.length > 0))
    return (
      <div className="w-full h-full bg-kos-white pt-5 px-4">
        {result && result.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {result.map((word) => (
              <li
                key={word as Key}
                onClick={() => {
                  handleClickList(word);
                  isStorageExist && setItem({ type: "array", value: word });
                }}
                className="flex gap-2 items-center"
              >
                <Image src={Magnifying} alt="검색 아이콘" />
                <span>{highlightedText(word, searchWords)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Typography
            type={Typography.TypographyType.H5}
            color="text-kos-gray-800"
          >
            검색 결과가 없습니다.
          </Typography>
        )}
      </div>
    );

  // 자동저장 꺼져 있는 경우
  if (!isStorageExist)
    return (
      <div className="bg-kos-white">
        <div className="flex flex-col gap-2 px-4 pt-4.5 pb-6 border-b border-b-1 border-kos-gray-200">
          <Typography
            type={Typography.TypographyType.H5}
            color="text-kos-gray-800"
          >
            검색어 저장 기능이 꺼져 있습니다.
          </Typography>
          <Typography
            type={Typography.TypographyType.B1}
            color="text-kos-gray-700"
          >
            설정이 초기화 된다면 도움말을 확인해 주세요.
          </Typography>
        </div>
        <footer className="px-4 pt-3 pb-4">
          <button type="button" onClick={open}>
            <Typography
              type={Typography.TypographyType.B4}
              color="text-kos-gray-500"
            >
              자동저장 켜기
            </Typography>
          </button>
        </footer>
        <Alert
          isOpen={isOpen}
          title={
            <p>
              최근 검색어 저장 기능을
              <br />
              사용 하시겠습니까?
            </p>
          }
          cancelText="취소"
          cancelCallBack={close}
          confirmCallBack={() => {
            setItem({ isInit: true, type: "array" });
            close();
          }}
        />
      </div>
    );

  // 최근 검색어
  return (
    <div className="bg-kos-white">
      {isStorageExist && searchWordList.length > 0 ? (
        <div className="pl-4 pt-4.5">
          <Typography
            type={Typography.TypographyType.B4}
            color="text-kos-gray-500"
          >
            최근 검색어
          </Typography>
          <ul className="flex flex-col pt-4 pb-6">
            {searchWordList?.map((word: string) => (
              <li key={word as Key} className="flex items-center py-0.5">
                <div
                  className="grow flex gap-2 items-center"
                  onClick={() => {
                    handleClickList(word);
                    isStorageExist && setItem({ type: "array", value: word });
                  }}
                >
                  <Image src={Magnifying} alt="검색 아이콘" />
                  <span>{word}</span>
                </div>
                <button
                  type="button"
                  className="pr-2"
                  onClick={() => {
                    removeItem({ value: word });
                    setTriggerClient((prev) => !prev);
                  }}
                >
                  <Image src={CloseIcon} alt="닫기 아이콘" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-4 pt-4.5 pb-6 border-b border-b-1 border-kos-gray-200">
          <Typography
            type={Typography.TypographyType.H5}
            color="text-kos-gray-800"
          >
            최근 검색어 내역이 없습니다.
          </Typography>
          <Typography
            type={Typography.TypographyType.B1}
            color="text-kos-gray-700"
          >
            설정이 초기화 된다면 도움말을 확인해 주세요.
          </Typography>
        </div>
      )}

      <footer
        className="px-4 pt-3 pb-4 border-t border-t-1 border-kos-gray-200"
        onClick={open}
      >
        <Typography
          type={Typography.TypographyType.B4}
          color="text-kos-gray-500"
        >
          자동저장 끄기
        </Typography>
      </footer>
      <Alert
        isOpen={isOpen}
        title={
          <p>
            최근 검색어 저장 기능을
            <br />
            사용 중지하시겠습니까?
          </p>
        }
        cancelText="취소"
        cancelCallBack={close}
        confirmCallBack={() => {
          removeStorage();
          close();
        }}
      />
    </div>
  );
}
