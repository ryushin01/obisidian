import { useFetchApi } from "@hooks";
import { authAtom, toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

/** 견적서 저장 api */
export default function useSaveTrregBfEstm({
  loanNo,
  onSuccess,
  setIsLoading,
}: {
  onSuccess: () => void;
  loanNo: string | null;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { fetchApi } = useFetchApi();
  const authInfo = useAtomValue(authAtom);
  const callToast = useSetAtom(toastState);

  const { mutate } = useMutation({
    mutationKey: ["trreg-savetrregbfestm"],
    mutationFn: async (serverForm: TObj) => {
      if (setIsLoading) {
        setIsLoading(true);
      }

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/savetrregbfestm`,
        method: "post",
        body: { ...serverForm, loanNo, bizNo: authInfo.bizNo },
      });

      if (setIsLoading) {
        setIsLoading(false);
      }

      return response.json();
    },
    onSuccess: (res) => {
      if (res.code === "00") {
        onSuccess();
      } else {
        callToast({
          msg: "견적서 저장에 실패하였습니다.",
          status: "error",
        });
      }
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });
  return [mutate];
}
