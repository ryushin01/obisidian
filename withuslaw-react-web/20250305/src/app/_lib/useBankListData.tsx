import { BankTypeCode } from "@constants";
import { useFetchApi } from "@hooks";
import { useQueries } from "@tanstack/react-query";

/**
 * 상환금 수령용 계좌 검색법
 * "grpCd": "BANK_RF",
 * "etc1": "0"
 */
/**
 * 법무 수수료 안내용 계좌 검색법
 * "grpCd": "BANK_CMMS",
 * "etc1": "0"|"2"
 */
/**
 * 지급정보등록 검색법
 * "grpCd": "BANK_GB",
 * "etc": "은행"|"증권사"|"보험사"
 */

// 0:은행, 1:저축은행, 2:증권사, 3:카드사&캐피탈, 4:보험사

export default function useBankListData({
  bankTypeCodeList,
  grpCd,
}: {
  bankTypeCodeList: BankTypeCode[];
  grpCd: "BANK_RF" | "BANK_CMMS" | "BANK_GB";
}): [boolean, any[]] {
  const { fetchApi } = useFetchApi();
  const fetchBankList = async (etc1: string) => {
    const res = await fetchApi({
      url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/comm/searchcommcode`,
      method: "post",
      body: {
        grpCd: grpCd,
        etc1: etc1,
        useYn: "Y",
      },
    });
    const json = await res.json();
    const data = await json.data;
    return data;
  };

  const removeEtcFromBankTypeCodeLIst = bankTypeCodeList.filter(
    (bankType) => bankType !== BankTypeCode.ETC
  );

  const results = useQueries({
    queries: removeEtcFromBankTypeCodeLIst.map((etc1) => ({
      queryKey: ["bank", etc1],
      queryFn: () => fetchBankList(etc1),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  return [results.pending, results.data ?? []];
}
