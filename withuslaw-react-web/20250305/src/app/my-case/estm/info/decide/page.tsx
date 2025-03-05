"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RGSTR_GB_CD } from "@constants";
import { Divider } from "@components";
import { ModalHeader2, ModalLayout } from "@components/full-modal";
import { useFetchApi } from "@hooks";
import { useMutation } from "@tanstack/react-query";
import {
  EstimateList,
  EstimateMemb,
  EstimateSignList,
} from "@app/my-case/estm/info/common";

export default function DecidePage() {
  const { fetchApi } = useFetchApi();
  const queryParams = useSearchParams();
  const loanNo = queryParams.get("loanNo");
  const isDDay = queryParams.get("isDDay");
  const router = useRouter();

  /* 견적서 확정 불러오기 */
  const { data: getDDayData, mutate: getDDayList } = useMutation({
    mutationKey: ["trreg-searchtrregdecdestm"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchtrregdecdestm/${loanNo}`,
        method: "post",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("견적서 확정 불러오기", res);
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  useEffect(() => {
    getDDayList();
  }, [getDDayList]);

  return (
    <ModalLayout>
      <ModalHeader2
        title="견적서"
        onClick={() =>
          router.push(`/my-case/cntr/${loanNo}?regType=${RGSTR_GB_CD["01"]}`)
        }
        showCloseBtn={true}
      />
      <div className="h-screen overflow-y-scroll pb-[150px]">
        {!!getDDayData && (
          <>
            <EstimateList
              clientForm={getDDayData?.searchEstmInfoAndCustInfo}
              searchCustBankInfo={getDDayData?.searchCustBankInfo}
              searchBndDisRt={getDDayData?.searchBndDisRt}
            />
          </>
        )}

        <Divider />

        <EstimateMemb
          isDDay={isDDay}
          clientForm={getDDayData?.searchEstmInfoAndCustInfo}
          searchDbtrInfo={getDDayData?.searchDbtrInfo}
        />

        <Divider />

        <EstimateSignList clientForm={getDDayData?.searchEstmInfoAndCustInfo} />
      </div>
    </ModalLayout>
  );
}
