import { useFetchApi } from "@hooks";
import { useMutation } from "@tanstack/react-query";

// 추가정보 등록 여부 조회
type UseAddInfoOptions = {
  onSuccess?: (checkAddInfo: TObj) => void;
};

export default function useAddInfo({ onSuccess }: UseAddInfoOptions = {}) {
  const { fetchApi } = useFetchApi();

  const { data, mutate } = useMutation({
    mutationKey: ["auth-searchtrregpssbyn"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/searchtrregpssbyn`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("추가정보 등록 여부 조회", res);
      if (onSuccess) {
        onSuccess(res);
      }
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });
  return [data, mutate];
}
