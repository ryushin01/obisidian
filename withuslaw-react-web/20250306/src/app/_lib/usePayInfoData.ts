"use client";

import { useMemo } from "react";
import { useFetchApi } from "@hooks";
import { useQuery } from "@tanstack/react-query";

export type TPayInfo = {
  bankCd: string;
  bankNm: string;
  gpsInfo: string | null;
  no: number;
  payAmt: number;
  /** 01:buyer 02:seller 03:당행 04:타행 */
  payCd: string;
  payNm: string;
  payReqDt: string;
  /** 00:지급정보등록 01:지급 처리중 99:지급처리 오류 02:지급완료 03:상환금 영수증 처리중 04:상환금 영수증 반려 10:상환금 영수증 처리 완료 */
  statCd: "00" | "01" | "99" | "02" | "03" | "04" | "05" | "10";
  statNm: string;
};
type TDbsmtCnclCd = "1" | "2";
type TResponse = {
  loanNo: string;
  /** 02:설정 의뢰서 등록 10:대출 실행 14:상환금 처리 20:접수번호 등록 40:설정서류 */
  masterStatCd?: string;
  execDt?: string;
  befDbsmtCnclCd: TDbsmtCnclCd;
  repayInfoList: TPayInfo[];
};

/** 지급 정보 조회 */
export default function usePayInfoData({
  loanNo,
  enabled = true,
}: {
  loanNo: string;
  enabled?: boolean;
}) {
  const { fetchApi } = useFetchApi();
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["search-repay-info", loanNo],
    queryFn: (): Promise<TResponse> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/reapay/searchRepayInfo?loanNo=${loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    enabled: loanNo !== "" && enabled,
  });
  const befDbsmtCnclCd = useMemo(() => {
    return data?.befDbsmtCnclCd;
  }, [data]);
  const masterStatCd = useMemo(() => {
    return data?.masterStatCd;
  }, [data]);
  const execDt = useMemo(() => {
    return data?.execDt;
  }, [data]);
  const seller: TPayInfo | undefined = useMemo(() => {
    return data?.repayInfoList?.filter(
      ({ payCd }: { payCd: string }) => payCd === "02"
    )[0];
  }, [data]);
  const buyer = useMemo(() => {
    return data?.repayInfoList?.filter(
      ({ payCd }: { payCd: string }) => payCd === "01"
    )[0];
  }, [data]);
  const repayList = useMemo(() => {
    return data?.repayInfoList
      ? data?.repayInfoList?.filter(
          ({ payCd }: { payCd: string }) => payCd !== "01" && payCd !== "02"
        )
      : [];
  }, [data]);

  return {
    seller,
    buyer,
    befDbsmtCnclCd,
    masterStatCd,
    execDt,
    repayList,
    refetch,
    isFetching,
  };
}
