"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Header } from "@components";
import { useAddInfoData } from "@libs";
import { useFetchApi, useFlutterBridgeFunc } from "@hooks";
import { useMutation } from "@tanstack/react-query";
import { caseDetailAtom, toastState } from "@stores";
import { getCompareWithToday } from "@utils/dateUtil";
import { useAtomValue, useSetAtom } from "jotai";

export default function HeaderWithoutRightItem() {
  const router = useRouter();
  const pathname = usePathname();
  const acceptanceMatchPageRegex = /^\/(acceptance)+\/(match)+\/(\d+)/;
  const { regType, loanNo, execDt, statCd } = useAtomValue(caseDetailAtom);
  const searchParams = useSearchParams();

  const isPreviousNextjs = searchParams.get("previousState") === `nextjs`;
  const [checkAddInfo, getCheckAddInfo] = useAddInfoData();
  const storage = globalThis?.sessionStorage;
  const callToast = useSetAtom(toastState);
  const prevPath = sessionStorage.getItem("prevPath");
  const getLoanNo = sessionStorage.getItem("setLoanNo");
  const { fetchApi } = useFetchApi();
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  useEffect(() => {
    getCheckAddInfo();
  }, [getCheckAddInfo]);

  const { mutate: deleteImage } = useMutation({
    mutationKey: ["delete-image"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/removeisrnimage`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      if (res.code === "00") {
        console.log("사진 삭제 성공", res.data);
        const getPrevPath = storage.getItem("prevPath");
        const goHome = () => {
          // @ts-ignore
          window.flutter_inappwebview.callHandler("flutterFunc", {
            mode: "GO_HOME",
          });
        };

        getPrevPath === "null" ||
        getPrevPath === "/acceptance/match/case-accept"
          ? goHome()
          : router.back();
      }
    },
    onError: (error) => {
      console.log("사진 삭제 실패", error);
    },
  });

  const headerWithoutRightItemProps = (function () {
    switch (true) {
      case pathname.includes("/home"):
        return {
          isBackButton: false,
          title: "권한설정 안내",
        };

      case pathname === "/my-case":
        return {
          isBackButton: false,
          title: "내 사건",
        };

      case pathname.includes("/acceptance/match/add-info"):
        return {
          isBackButton: true,
          title: "추가정보 등록",
          backCallBack: () => {
            const getPrevPath = sessionStorage.getItem("prevPath");

            if (
              getPrevPath === "/acceptance/match/case-accept" ||
              getPrevPath === "null"
            ) {
              deleteImage();
            } else {
              router.back();
            }
          },
        };

      case pathname === "/acceptance/match/add-info/rept/notice":
        return {
          isBackButton: true,
          title: "추가정보 등록",
          backCallBack: () => {
            // 대표법무사 정보등록 전
            // (permCd === "03" || permCd === "01") &&
            // checkAddInfo?.data?.trregElement?.isrnEntrAprvGbCd !== "03"
            router.push("/");
            //@ts-ignore
            window.flutter_inappwebview.callHandler("flutterFunc", {
              mode: "GO_HOME",
            });
          },
        };

      case pathname === "/acceptance/match/add-info/rept/isrn":
        return {
          isBackButton: true,
          title: "추가정보 등록",
          backCallBack: () => {
            if (pathname.includes("/rept/isrn")) {
              // 등록된 이미지가 있의면, 이미지 삭제 api 호출 아니면 router.back();
              if (value?.mode === "IMAGE" && value?.data?.code === "00") {
                deleteImage();
              } else {
                router.back();
              }
            }
          },
        };

      case pathname === "/acceptance/match/case-accept":
        return {
          isBackButton: false,
          title: "사건수임",
        };

      // case acceptanceMatchPageRegex.test(pathname):
      //   return {
      //     isBackButton: true,
      //     title: "사건수임 상세",
      //   };

      case pathname === "/acceptance/match/accept-get":
        return { isBackButton: false, title: "" };

      case pathname === "/acceptance/match/accept-fail":
        return { title: "수임 철회" };

      case pathname === "/my-case/reg-info":
        return { title: "정보등록" };

      case pathname.includes("/my-case/pay-info"):
        return {
          title: "지급정보",
          isBackButton: true,
          // 팝업으로 진입시 내사건목록으로 그 외에는 사건상세
          backPath: isPreviousNextjs
            ? `/my-case`
            : `/my-case/cntr/${loanNo}?regType=${regType}`,
        };

      case pathname.includes("/my-case/sr-pay-info"):
        return {
          title: "지급정보",
          isBackButton: true,
          // backPath: `/my-case/cntr/${loanNo}?regType=${regType}`,
          backCallBack: () => {
            if (`/my-case/cntr/${loanNo}?regType=${regType}`) {
              router.back();
            }
          },
        };

      case pathname.includes("/my-case/estm/info") &&
        !pathname.includes("/my-case/estm/info/list") &&
        !pathname.includes("/my-case/estm/info/schdl"):
        return {
          title: "견적서",
          // backPath:
          //   prevPath === `/acceptance/match/${loanNo}`
          //     ? `/acceptance/match/accept-get?loanNo=${loanNo}`
          //     : "",
          backCallBack: () => {
            if (prevPath === `/acceptance/match/${loanNo}`) {
              // @ts-ignore
              window.flutter_inappwebview.callHandler("flutterFunc", {
                mode: "BOTTOM_TABVIEW_MOVE",
                data: {
                  type: "1",
                  url: `/my-case/cntr/${loanNo}?regType=${regType}`,
                },
              });
            } else {
              router.back();
              // router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
            }
          },
        };

      case pathname === "/my-case/estm/info/list" &&
        getCompareWithToday(execDt) === "same":
        return {
          isBackButton: true,
          title: "견적서",
          // backPath: `/my-case/estm/info/schdl?loanNo=${
          //   getLoanNo ? getLoanNo : loanNo
          // }&isDDay=true`,
          backCallBack: () => {
            // 대출실행 당일이고, statCd가 03 이상일때 뒤로가기 잔금일정으로
            if (statCd >= "03") {
              // 확정 뒤로가기 > /my-case/estm/info/schdl
              router.push(
                `/my-case/estm/info/schdl?loanNo=${
                  getLoanNo ? getLoanNo : loanNo
                }&isDDay=true`
              );
            } else {
              // 발송/재발송 뒤로가기 > /my-case/estm/info
              router.push(
                `/my-case/estm/info?loanNo=${
                  getLoanNo ? getLoanNo : loanNo
                }&isDDay=true`
              );
            }
          },
        };

      case pathname === "/my-case/estm/info/list" &&
        !(getCompareWithToday(execDt) === "same"):
        return {
          isBackButton: true,
          title: "견적서",
          backPath: `/my-case/estm/info?loanNo=${
            getLoanNo ? getLoanNo : loanNo
          }&isDDay=false`,
        };

      case pathname.includes("/my-case/estm/info/schdl"):
        return {
          isBackButton: true,
          title: "잔금일정",
          backPath: `/my-case/estm/info?loanNo=${
            getLoanNo ? getLoanNo : loanNo
          }&isDDay=true`,
        };

      case pathname === "/my-case/estm/regist":
        return {
          title: "등기정보",
        };

      case pathname.includes("/my-case/pay-request/loan-pay") ||
        pathname.includes("/my-case/pay-request/loan-info"):
        return {
          title: "대출금 요청",
          backPath: `/my-case/cntr/${loanNo}?regType=${regType}`,
        };

      case pathname.includes("/my-case/pay-request/sr-loan-pay") ||
        pathname.includes("/my-case/pay-request/sr-loan-info"):
        return {
          title: "대출금 요청",
        };

      case pathname.includes("/my-case/rpycncl"):
        return {
          title: "상환말소",
          backPath: `/my-case/cntr/${loanNo}?regType=${regType}`,
        };

      case pathname.includes("/my-case/sr-rpycncl"):
        return {
          title: "상환말소",
        };

      case pathname === "/my-case/trreg":
        return {
          title: "접수번호 등록",
        };

      // case pathname === "/information/cntr/004":
      //   return {
      //     title: "상환금 수령용 계좌 등록",
      //     isBackButton: true,
      //     backPath: prevPath?.includes("/my-case/cntr/")
      //       ? `/my-case/cntr/${loanNo}?regType=${regType}`
      //       : "",
      //   };

      case pathname === "/information/cntr/004" ||
        pathname === "/information/cntr/005" ||
        pathname === "/information/cntr/006":
        return {
          title: "상환금 수령용 계좌 등록",
          isBackButton: true,
        };

      case pathname.includes("/my-case/loan-cert/"):
        return {
          // title: "소유권 인증번호 확인",
          title: "대출금 요청",
        };

      case pathname.includes("/information/estm/memb"):
        return {
          title: "법무 수수료 안내용 계좌",
        };

      default:
        return null;
    }
  })();

  if (headerWithoutRightItemProps === null) return null;

  return <Header {...headerWithoutRightItemProps} />;
}
