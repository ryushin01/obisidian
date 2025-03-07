"use client";

import { Loading } from "@components/common";
import { getFakeData2, postFakeData1 } from "@services/main";
import { useMutation, useQuery } from "@tanstack/react-query";

type SampleProps = {
  title: string;
  body: string;
  userId: number;
}

export default function SampleTanStackQuery() {
  // useQuery 샘플
  const {
    // 페칭 성공 후 반환 데이터
    data: sampleQueryData,
    // 수동 페칭 메서드
    refetch: sampleQueryRefetch,
    // 페칭의 로딩 여부
    isLoading: sampleQueryIsLoading,
  } = useQuery({
    queryKey: ["sample-query"],
    queryFn: async () => {
      const response = await getFakeData2(1);
      return response?.data;
    },
    // 자동 페칭 제어 옵션: 아래의 조건부 예시처럼 여신 번호가 없으면 자동 페칭을 막는 것으로 활용할 수 있습니다.
    // enabled: loanNo !== "",
    enabled: false,
  });

  // useMutation 샘플
  const {
    // 페칭 성공 후 반환 데이터
    data: sampleMutationData,
    // 수동 페칭 메서드
    mutate: sampleMutationRefetch,
    // 초기 상태로 리셋 메서드
    reset: sampleMutationReset,
    // 페칭의 로딩 여부
    isPending: sampleMutationIsLoading,
  } = useMutation({
    mutationKey: ["sample-mutation"],
    mutationFn: async ({ title, body, userId }: SampleProps) => {
      const response = await postFakeData1(title, body, userId);
      return response?.data;
    },
  });

  console.log(sampleQueryData);
  console.log(sampleMutationData);

  return (
    <>
      {(sampleQueryIsLoading || sampleMutationIsLoading) && <Loading />}
      <button type="button" onClick={sampleQueryRefetch}>query fetch</button>
      <button type="button" onClick={() => sampleMutationRefetch("aaa", "bbb", 1)}>mutation fetch
      </button>
      <button type="button" onClick={sampleMutationReset}>mutation reset</button>
    </>
  );
}
