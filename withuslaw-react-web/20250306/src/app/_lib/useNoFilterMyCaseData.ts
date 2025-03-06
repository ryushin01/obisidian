import { useFetchApi } from "@hooks";
import { authAtom } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

type TVariables = {
  pageNum: number;
  cntrGb: "PROG" | "DONE";
  pageSize: number;
  myCasePgYn: string;
};

export default function useNoFilterMyCaseData({
                                                onSuccess
                                              }: {
  onSuccess: (res: TData<any>, variables?: TVariables) => void;
}): [TData<TMyCaseData> | undefined, (variables: TVariables) => void, boolean] {
  const { fetchApi } = useFetchApi();
  const { bizNo } = useAtomValue(authAtom);
  const { isPending, data, mutate } = useMutation({
    mutationKey: ["my-case-no-filter"],
    mutationFn: async ({
                         pageNum,
                         cntrGb,
                         pageSize,
                         myCasePgYn = "N"
                       }: TVariables): Promise<TData<TMyCaseData>> => {
      const res = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchCntrNoFilt`,
        method: "post",
        body: {
          pageSize: pageSize,
          bizNo: bizNo,
          pageNum: pageNum,
          cntrGb: cntrGb,
          myCasePgYn: myCasePgYn
        }
      });

      return res.json();
    },
    onSuccess(res, variables) {
      onSuccess(res, variables);
    },
    onError(error) {
      console.log("error", error);
    }
  });

  return [data, mutate, isPending];
}
