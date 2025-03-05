"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SuccssMark } from "@icons";
import { TypographyType } from "@components/typography/Constant";
import { Loading, Typography } from "@components";
import { CtaButton } from "@components/button";
import { useFetchApi } from "@hooks";
import { useHandlePopstate } from "@utils/prevState";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { caseDetailAtom } from "@/app/_store";

export default function AcceptGetPage() {
  const { fetchApi } = useFetchApi();
  const router = useRouter();
  const loanNoParams = useSearchParams();
  const loanNo = loanNoParams.get("loanNo");
  const previousState = "acceptance/match/accept-get";

  useHandlePopstate(() => {
    router.push("/acceptance/match/case-accept");
  });

  // 정보등록 조회 api
  const { isLoading, data } = useQuery({
    queryKey: ["case-detail", loanNo],
    queryFn: (): Promise<TDetailInfo> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchCntrDetail?loanNo=${loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  // 상환금수령용계좌 등록이 당일인지 체크
  const isDateRfdRegd = data?.resDateRfdRegd?.resData;
  const regType = data?.rgstrGbCd!;

  // 사건상세 링크
  const linkToMycase = `/my-case/cntr/${loanNo}?regType=${regType}`;
  const asPath = isDateRfdRegd ? linkToMycase : "/my-case/estm/info";

  // 버튼클릭시 로컬스토리지에 패스 저장
  const pathSpy = () => {
    const localSt = globalThis?.localStorage;
    const acceptPath = localSt.getItem("getPath");

    if (!localSt) {
      return;
    }

    localSt.setItem("acceptPath", acceptPath!);
    localSt.setItem("getPath", globalThis?.location.pathname);
  };

  const saveLoanNo = () => {
    const sessionSt = globalThis?.sessionStorage;
    sessionSt.setItem("setLoanNo", data?.loanNo!);
  };

  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-150px)]">
      {!loanNo || !regType ? (
        <Loading />
      ) : (
        <>
          <Image src={SuccssMark} width={150} alt="complete icon" />
          <div className="mt-[24px]">
            <Typography color={"text-kos-gray-800"} type={TypographyType.H1}>
              사건수임완료
            </Typography>
          </div>
          <div className="fixed w-full bottom-4 flex p-4">
            <button
              className="w-full rounded-xl mr-2.5 border border-kos-gray-400 bg-kos-white text-kos-gray-600 text-base font-semibold"
              onClick={() => router.push("/acceptance/match/case-accept")}
            >
              확인
            </button>
            <Link
              className={`w-full ${
                !loanNo || !regType ? "pointer-events-none" : ""
              }`}
              href={
                isDateRfdRegd
                  ? ""
                  : {
                      pathname: "/my-case/estm/info",
                      query: {
                        loanNo: loanNo,
                        previousState: previousState,
                      },
                    }
              }
              as={isDateRfdRegd ? asPath : ""}
              onClick={(e) => {
                if (!loanNo || !regType) {
                  e.preventDefault(); // 페이지 이동 막기
                }
                if (loanNo && regType && isDateRfdRegd) {
                  pathSpy();
                  //@ts-ignore
                  window.flutter_inappwebview.callHandler("flutterFunc", {
                    // @ts-ignore
                    mode: "BOTTOM_TABVIEW_MOVE",
                    data: {
                      type: "1",
                      url: `/my-case/cntr/${loanNo}?regType=${regType}`,
                    },
                  });
                }
                if (loanNo && !isDateRfdRegd) {
                  saveLoanNo();
                }
              }}
            >
              <CtaButton size="XLarge" state="On">
                견적서 작성하기
              </CtaButton>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
