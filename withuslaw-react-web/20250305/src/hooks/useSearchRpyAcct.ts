import { useFetchApi } from "@hooks";
import { useQuery } from "@tanstack/react-query";

type TAcctInfo = {
  acctNo: string;
  bankCd: string;
  bankNm: string;
};
type TSearchRpyAcctRes = {
  woori: TAcctInfo;
  bankList: TAcctInfo[];
};

export default function useSearchRpyAcct(): [
  boolean,
  TSearchRpyAcctRes | undefined
] {
  const { fetchApi } = useFetchApi();
  const { isLoading, data } = useQuery<TSearchRpyAcctRes>({
    queryKey: ["search-rpy-acct"],
    queryFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/searchrpyacct`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  return [isLoading, data];
}
