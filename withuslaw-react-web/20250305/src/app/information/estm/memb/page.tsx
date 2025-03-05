"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { NoticeIcon } from "@icons";
import { Input, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { useFetchApi } from "@hooks";
import { useAddInfoData } from "@libs";
import { useQuery } from "@tanstack/react-query";

export default function ReptPage() {
  const { fetchApi } = useFetchApi();

  // 추가정보 등록 여부 가져오기
  const [checkAddInfo, getCheckAddInfo] = useAddInfoData();

  // 계좌 정보 조회
  const { data: getCommisionBank } = useQuery({
    queryKey: ["search-chcmmsacct"],
    queryFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/searchcmmsacct`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  useEffect(() => {
    getCheckAddInfo();
  }, [getCheckAddInfo]);

  return (
    <>
      {checkAddInfo?.data?.trregElement?.cmmsAcctYn === "N" ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
          <Image src={NoticeIcon} alt="notice icon" width={48} height={48} />
          <Typography
            color="text-kos-gray-600"
            type={TypographyType.H5}
            className="mt-3 mb-2.5"
          >
            등록된 법무 수수료 안내용 계좌가 없습니다
          </Typography>
        </div>
      ) : (
        <div className="px-4">
          <Typography
            color="text-kos-gray-800"
            type={TypographyType.H2}
            className="mt-6 mb-3"
          >
            법무 수수료 안내용 계좌
          </Typography>

          {/* 수수료 계좌 조회 */}
          <Input.InputContainer className="w-full mt-1">
            <Input.Label htmlFor="">계좌정보</Input.Label>
            <Input.InputGroup>
              <Input.TextInput
                style={{ color: "#7D7D7D" }}
                value={getCommisionBank?.bankNm || ""}
                disabled
              />
              <Input.TextInput
                value={getCommisionBank?.acctNo || ""}
                disabled
                style={{ color: "#7D7D7D" }}
              />
            </Input.InputGroup>
          </Input.InputContainer>
        </div>
      )}
    </>
  );
}
