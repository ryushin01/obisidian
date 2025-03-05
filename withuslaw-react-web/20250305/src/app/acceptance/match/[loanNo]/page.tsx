"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TypographyType } from "@components/typography/Constant";
import { Header, Typography } from "@components";
import { Checkbox, CtaButton } from "@components/button";
import { useDisclosure, useFetchApi } from "@hooks";
import { commaUtil, formatDate } from "@utils";
import { useMutation } from "@tanstack/react-query";
import { Sheet } from "react-modal-sheet";

type TMutateArgs = {
  statCd: string;
  loanNo: string;
};

type TLoan = {
  loanNo: string;
};

/*
* 사건수임 코드
  00 : 수임 리스트
  10: 수임 상세
  20: 수임 완료 
*
*/

export default function Page({ params }: { params: { loanNo: string } }) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [matchFailAlert, showMatchFailAlert] = useState(false);
  const { fetchApi } = useFetchApi();
  const { isOpen, close, open } = useDisclosure();
  const isIos = sessionStorage.getItem("isIos");

  const handleAgreeCheck = () => {
    setIsChecked((prevState) => !prevState);
  };

  // 사건 수임 상세
  const { data: matchDetailData, mutate: matchDetailList } = useMutation({
    mutationKey: [""],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchtrregbfmatchinfo/${params.loanNo}`,
        method: "post",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log("사건 수임 상세", res);
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  // 사건 수임 완료
  const { mutate: getCompleteList } = useMutation({
    mutationKey: [""],
    mutationFn: (loanNo: TLoan) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/proctrregbfmatchinfo/${params.loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      if (res.code === "00") {
        updateMatchCode({
          loanNo: matchDetailData.loanNo,
          statCd: "20",
        });
        router.push(`/acceptance/match/accept-get?loanNo=${params.loanNo}`);
      } else {
        close();
        showMatchFailAlert(true);
        updateMatchCode({
          loanNo: matchDetailData.loanNo,
          statCd: "00",
        });
      }
      console.log("수임 성공", res);
    },
    onError: (error) => {
      close();
      showMatchFailAlert(true);
      updateMatchCode({
        loanNo: matchDetailData.loanNo,
        statCd: "00",
      });
      console.log("실패", error);
    },
  });

  // 동시성 코드 조회
  const { mutate: updateMatchCode } = useMutation({
    mutationKey: [""],
    mutationFn: ({ loanNo, statCd }: TMutateArgs) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/procconcurrencycontrol/${loanNo}/${statCd}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("동시성 코드 업데이트", res);

      if (res.code === "500") {
        router.push("/acceptance/match/case-accept");
      }
    },
    onError: (error) => {
      console.log("실패", error);
    },
  });

  useEffect(() => {
    matchDetailList();
  }, [matchDetailList]);

  // 이전버튼 인식
  // useHandlePopstate(() => {
  //   updateMatchCode({
  //     loanNo: matchDetailData.loanNo,
  //     statCd: "00",
  //   });
  // });

  return (
    <div>
      {matchFailAlert && (
        <div className="z-40 fixed top-0 w-full h-screen bg-kos-dim-60">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[inherit] max-w-[343px] p-5 bg-kos-white rounded-[20px]">
            <div className="py-3">
              <Typography color="text-kos-gray-800" type={TypographyType.H3}>
                사건수임에 실패하였습니다
              </Typography>
            </div>
            <Typography
              color="text-kos-gray-700"
              type={TypographyType.B1}
              className="mb-5"
            >
              다시 시도해주세요.
            </Typography>
            <CtaButton
              size="XLarge"
              state="On"
              onClick={() => {
                showMatchFailAlert(false);
                setIsChecked(false);
              }}
            >
              확인
            </CtaButton>
          </div>
        </div>
      )}

      {matchDetailData && matchDetailData && (
        <div key={matchDetailData.loanNo}>
          <Header
            isBackButton={true}
            title="사건수임 상세"
            backCallBack={() => {
              updateMatchCode({
                loanNo: matchDetailData.loanNo,
                statCd: "00",
              });
              setTimeout(() => {
                router.back();
              }, 1000);
            }}
          />
          <ul className="w-full p-4">
            <li className="flex items-baseline justify-between">
              <span className="basis-1/4 mr-4 text-[15px] text-[#7D7D7D] font-semibold">
                주소
              </span>
              <span className="text-base text-[#2E2E2E] text-right font-medium break-keep">
                {matchDetailData.dpAddr}
              </span>
            </li>
            <li className="flex items-baseline justify-between mt-2">
              <span className="basis-1/4 text-[15px] text-[#7D7D7D] font-semibold">
                실행일
              </span>
              <span className="text-base text-[#2E2E2E] font-medium">
                {formatDate(matchDetailData.execPlnDt)}
              </span>
            </li>
            <li className="flex items-baseline justify-between mt-2">
              <span className="basis-1/4 text-[15px] text-[#7D7D7D] font-semibold">
                매매금액
              </span>
              <span className="text-base text-[#2E2E2E] font-medium">
                {commaUtil(matchDetailData.slPrc)} 원
              </span>
            </li>
          </ul>
          <ul className="w-full p-4 border-t border-solid border-[#f0f0f0]">
            <li className="flex items-baseline justify-between">
              <span className="basis-1/4 text-[15px] text-[#7D7D7D] font-semibold">
                대출기관
              </span>
              <span className="text-base text-[#2E2E2E] font-medium">
                {matchDetailData.bnkBrnchNm}
              </span>
            </li>
            <li className="flex items-baseline justify-between mt-2">
              <span className="basis-1/4 mr-4 text-[15px] text-[#7D7D7D] font-semibold">
                대출상품
              </span>
              <span className="text-base text-right text-[#2E2E2E] font-medium ios-break-word">
                {matchDetailData.lndPrdtNm}
              </span>
            </li>
            <li className="flex items-baseline justify-between mt-2">
              <span className="basis-1/4 mr-4 text-[15px] text-[#7D7D7D] font-semibold">
                실행금액
              </span>
              <span className="text-base text-right text-[#2E2E2E] font-medium">
                {commaUtil(matchDetailData.execPlnAmt)} 원
              </span>
            </li>
          </ul>
          <ul className="p-4 border-t border-solid border-[#f0f0f0]">
            <li className="flex items-baseline justify-between">
              <span className="basis-1/4 text-[15px] text-[#7D7D7D] font-semibold">
                차주
              </span>
              <span className="text-base text-[#2E2E2E] font-medium">
                수임 후 공개
              </span>
            </li>
            <li className="flex items-baseline justify-between mt-2">
              <span className="basis-1/4 text-[15px] text-[#7D7D7D] font-semibold">
                휴대폰번호
              </span>
              <span className="text-base text-[#2E2E2E] font-medium">
                수임 후 공개
              </span>
            </li>
          </ul>
        </div>
      )}

      <section className="fixed w-full bottom-0 p-4 box-shadow:0px -4px 20px 0px rgba(204, 204, 204, 0.30)">
        <CtaButton size="XLarge" state="On" onClick={open}>
          수임하기
        </CtaButton>
      </section>

      {/* 동의 모달 */}
      <Sheet
        className="border-none"
        isOpen={isOpen}
        onClose={() => {
          close();
          setIsChecked(false);
        }}
        detent={"content-height"}
        snapPoints={[600, 400, 100, 0]}
      >
        <Sheet.Container
          style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
        >
          <Sheet.Header />
          <div className="py-4 text-center text-lg text-kos-gray-800 font-semibold">
            <p>아래 내용을 확인해주세요 </p>
          </div>
          <Sheet.Content className={`${!!isIos ? "pb-5" : ""}`}>
            <ul className="px-4 pb-4 border-b border-solid border-kos-gray-200">
              <li className="flex pl-6 text-kos-gray-700 font-normal leading-[26px] relative before:content-[''] before:absolute before:top-[10px] before:left-[10px] before:w-1 before:h-1 before:rounded-full before:bg-kos-gray-700">
                <span>
                  사건에 따라{" "}
                  <b className="text-gray-700 text-base">
                    설정 법무에 준하는 업무
                  </b>
                  가 수반될 수 있습니다.
                </span>
              </li>
              <li className="flex pl-6 text-kos-gray-700 font-normal leading-[26px] relative before:content-[''] before:absolute before:top-[10px] before:left-[10px] before:w-1 before:h-1 before:rounded-full before:bg-kos-gray-700">
                <span>
                  모든 절차는{" "}
                  <b className="text-kos-gray-700 text-base">코스를 통해</b>{" "}
                  투명하게 진행됩니다.
                </span>
              </li>
              <li className="flex pl-6 text-kos-gray-700 font-normal leading-[26px] relative before:content-[''] before:absolute before:top-[10px] before:left-[10px] before:w-1 before:h-1 before:rounded-full before:bg-kos-gray-700">
                <span>
                  <b className="text-kos-gray-700 text-base">
                    사건 진행의 공유
                  </b>
                  는 필수이며, 미이행 시 이용에 불이익이 있을 수 있습니다.
                </span>
              </li>
              <li className="flex pl-6 text-kos-gray-700 font-normal leading-[26px] relative before:content-[''] before:absolute before:top-[10px] before:left-[10px] before:w-1 before:h-1 before:rounded-full before:bg-kos-gray-700">
                <span>
                  수임철회는 잔금일{" "}
                  <b className="text-kos-gray-700 text-base">4일전까지 가능</b>
                  하며, 철회 후{" "}
                  <b className="text-[#545454] text-base">재매칭은 불가</b>
                  합니다.
                </span>
              </li>
            </ul>
            <div className="px-4 pb-4">
              <div className="flex py-[28px]">
                <Checkbox
                  size="Big"
                  id="agree"
                  checked={isChecked}
                  onChange={handleAgreeCheck}
                />
                <label
                  htmlFor="agree"
                  className="whitespace-normal ml-2.5 text-lg font-semibold text-kos-gray-700"
                >
                  위 사건수임 관련 내용을 확인하였고, 이에 동의합니다.
                </label>
              </div>
              <CtaButton
                size="XLarge"
                state={"On"}
                disabled={!isChecked}
                onClick={() => {
                  getCompleteList({
                    loanNo: matchDetailData.loanNo,
                  });
                }}
              >
                사건 수임하기
              </CtaButton>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onTap={() => {
            close();
            setIsChecked(false);
          }}
          style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
        />
      </Sheet>
    </div>
  );
}
