"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RGSTR_GB_CD } from "@constants";
import { Alert, Button, Divider, Loading } from "@components";
import { useDisclosure, useFetchApi, useVirtualKeyboard } from "@hooks";
import { commaUtil } from "@utils";
import { usePrevEvent } from "@utils/pushState";
import { getCompareWithToday } from "@utils/dateUtil";
import {
  estimateSaveAtom,
  estmInfoAtom,
  routerAtom,
  toastState,
} from "@stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  EstimateInfo,
  EstimateInput,
  EstimateSign,
  EstimateSelect,
} from "@app/my-case/estm/info/common";
import makeSeverForm from "@app/my-case/estm/info/makeServerForm";
import useSaveTrregBfEstm from "@app/my-case/estm/info/useSaveTrregBfEstm";

/**
 * 00 : 최초 적재
 * 01 : 임시 저장
 * 10 : 사전 견적서 발송
 * 20 : 당일 견적서 발송
 * 80 : 견적서 삭제
 * 90 : 견적서 없음
 */
const EstmStatus: TObj = {
  "00": "init",
  "01": "temporary",
  "10": "beforeSend",
  "20": "decide",
  "80": "delete",
};

export default function EstmInfoPage() {
  const callToast = useSetAtom(toastState);
  const pageRouter = useAtomValue(routerAtom);
  const { isOpen: saveModal, open } = useDisclosure();
  const { fetchApi } = useFetchApi();
  const router = useRouter();
  const queryParams = useSearchParams();
  const loanNo = queryParams.get("loanNo");
  const isDDay = queryParams.get("isDDay") === "true";
  const setInfoAtom = useSetAtom(estmInfoAtom);
  const [clientForm, setClientForm] = useAtom(estimateSaveAtom);
  const [isInputLength, setIsInputLength] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [isSelectValid, setIsSelectValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState(false);
  const loanSpecificLastToastDate = localStorage.getItem(`date_${loanNo}`);
  const isSameLoanNo = localStorage.getItem("loanNo") === loanNo;
  const prevPath = sessionStorage.getItem("prevPath");
  const today = new Date().toDateString();
  const beginningViewportHeight = useRef(visualViewport!.height);
  const { expandedRef } = useVirtualKeyboard();

  const { data, isLoading: isCaseDetailLoading } = useQuery({
    queryKey: ["case-detail", loanNo],
    queryFn: (): Promise<TDetailInfo> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchCntrDetail?loanNo=${loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  /* 견적서 등록 여부 */
  const isEstmSend = data?.resEstmRegd?.resData || data?.resEstmCnfm?.resData;

  /* 견적서 최초 데이터 불러오기 */
  const { data: estmInfoData, mutate: getEstmInfoData } = useMutation<
    TData<TEstimateList>
  >({
    mutationKey: ["trreg-searchtrregbfestm"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchtrregbfestm/${loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("initData", res);
      if (res.code === "00") {
        if (res?.data?.searchEstmInfoAndCustInfo?.bizNo === null) {
          router.push(`/my-case/cntr/${loanNo}?regType=${RGSTR_GB_CD["01"]}`);
        }
        setInfoAtom(res.data);
        console.log("estmInfoData", res.data);
      }
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  /* 견적서 저장 */
  const [saveEstmList] = useSaveTrregBfEstm({
    onSuccess: () => router.push(`/my-case/cntr/${loanNo}?regType=01`),
    loanNo: loanNo,
    setIsLoading,
  });

  /* 저장한 견적서 보기 */
  const { mutate: estimateList } = useMutation({
    mutationKey: ["trreg-searchtrregbfestminfo"],
    mutationFn: async () => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchtrregbfestminfo/${loanNo}`,
        method: "post",
      });

      setIsLoading(false);

      return response.json();
    },
    onSuccess: (response) => {
      console.log("견적서 보기", response?.data);

      /** 법무사 고유번호, 휴대폰 번호 포함 불러오기  */
      const getEstimateRes: Record<string, string> = Object.fromEntries(
        Object.entries(response?.data).map(([key, value]) => [
          key,
          value === null
            ? ""
            : key === "mvLwyrMembHpno" ||
              key === "mvLwyrMembNo" ||
              key === "imgSeq" ||
              key === "memo"
            ? String(value)
            : commaUtil(value as number),
        ])
      );

      setClientForm((prev) => ({
        ...prev,
        ...getEstimateRes,
        membNm: getEstimateRes.mvLwyrMembNm,
        cphnNo: getEstimateRes.mvLwyrMembHpno,
        loanNo: prev.loanNo,
        bizNo: prev.bizNo,
      }));
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  /* 견적서 코드 */
  const estmStatus: "init" | "temporary" | "beforeSend" | "decide" | "delete" =
    EstmStatus[estmInfoData?.data?.searchEstmInfoAndCustInfo?.statCd];

  /** clientForm에 담길 value */
  const handleChangeValue = (key: string, value: string) => {
    setClientForm((prev) => ({ ...prev, [key]: value || "" }));
  };

  /** input/select 유효성 검사 */
  const updateValid = (
    type: "inputValid" | "inputLength" | "selectValid",
    isValid?: boolean
  ) => {
    switch (type) {
      case "inputValid":
        setIsInputValid(isValid ?? false);
        break;
      case "inputLength":
        setIsInputLength(isValid ?? false);
        break;
      case "selectValid":
        setIsSelectValid(isValid ?? false);
        break;
      default:
        break;
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    for (const [key, value] of formData.entries()) {
      setClientForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  }

  /** 이전 버튼 이벤트 감지 처리 */
  const onPrevClick = () => {
    if (
      isInputLength &&
      !(estmStatus === "beforeSend") &&
      !(estmStatus === "decide")
    ) {
      open();
    } else if (
      !isInputLength ||
      estmStatus === "beforeSend" ||
      estmStatus === "decide"
    ) {
      router.push(`/my-case/cntr/${loanNo}?regType=01`);
    }
  };

  usePrevEvent(onPrevClick, isInputLength);

  /** 진입 시 store 초기화 */
  useEffect(() => {
    if (
      estmStatus === "temporary" ||
      estmStatus === "beforeSend" ||
      estmStatus === "decide"
    ) {
      estimateList();
    }
  }, [estmStatus, estimateList]);

  // 견적서 등록일
  const estmRegDay = data?.crtDtm!;
  // 견적서 등록일이 과거인지 체크
  const isRegYesterday = getCompareWithToday(estmRegDay) === "past";

  useEffect(() => {
    console.log("견적서 등록 여부 확인 →→→→→", isEstmSend);

    /** 본인부담금 모달 1번 뜨는 처리 **/
    /** 견적서가 이미 등록되어 있어야 하고 최초등록일 다음날부터 재진입시 토스트 팝업 + 여신번호별로 하루에 한번만 뜨게 조건 추가 **/
    if (
      (!loanSpecificLastToastDate || loanSpecificLastToastDate !== today) && // loanNo별로 날짜가 null이거나 오늘과 다를 때
      !isSameLoanNo && // loanNo가 다를 때만 : 여신번호당 하루에 한번씩만 팝업
      isEstmSend && // 견적서가 등록된 경우
      isRegYesterday // 견적서등록이 과거일때
    ) {
      callToast({
        msg: "본인부담금은 오늘자 할인율로 재계산됩니다.",
        status: "notice",
      });
      localStorage.setItem(`date_${loanNo!}`, today); // loanNo별로 오늘 날짜 저장
      localStorage.setItem("loanNo", loanNo!); // loanNo 저장
    }
  }, [isEstmSend]);

  useEffect(() => {
    getEstmInfoData();
  }, [getEstmInfoData]);

  useEffect(() => {
    visualViewport!.addEventListener("resize", () => {
      setIsVirtualKeyboardOpen(
        visualViewport!.height < beginningViewportHeight.current
      );
    });
  }, []);

  return (
    <>
      {(isLoading || isCaseDetailLoading) && <Loading />}
      <form onSubmit={onSubmit} className="w-full h-full flex flex-col">
        {/* 임시저장 모달 */}
        <Alert
          isOpen={saveModal}
          title={<p>임시 저장하시겠습니까?</p>}
          cancelText="삭제"
          confirmText="임시저장"
          cancelCallBack={() => {
            const movePath = `/my-case/cntr/${loanNo}?regType=${RGSTR_GB_CD["01"]}`;
            router.push(prevPath!);

            setTimeout(() => {
              //@ts-ignore
              window.flutter_inappwebview.callHandler("flutterFunc", {
                mode: "BOTTOM_TABVIEW_MOVE",
                data: {
                  type: "1",
                  url: movePath,
                },
              });
            }, 1000);
          }}
          confirmCallBack={() => {
            const serverForm = makeSeverForm({ statCd: "01", clientForm });
            saveEstmList(serverForm);
            // 사건상세로 이동
            const movePath = `/my-case/cntr/${loanNo}?regType=${RGSTR_GB_CD["01"]}`;
            router.push(prevPath!);

            setTimeout(() => {
              //@ts-ignore
              window.flutter_inappwebview.callHandler("flutterFunc", {
                mode: "BOTTOM_TABVIEW_MOVE",
                data: {
                  type: "1",
                  url: movePath,
                },
              });
            }, 1000);
          }}
          bodyText={
            "임시 저장을 사용해 작성한 내용을 저장하고 나중에 다시 작업할 수 있습니다."
          }
        />

        <section className="grow flex flex-col">
          {/* 차주 정보 */}
          <div
            className={`${
              isVirtualKeyboardOpen ? "" : "_header-next-sticky-area"
            }`}
          >
            <EstimateInfo estmInfoData={estmInfoData?.data} />
          </div>
          <div className="grow">
            <div ref={expandedRef} className="h-full">
              {/* 입력 폼 */}
              <EstimateInput
                clientForm={clientForm}
                searchBndDisRt={estmInfoData?.data?.searchBndDisRt}
                handleChangeValue={handleChangeValue}
                updateValid={updateValid}
                isFormValid={isFormValid}
                setIsFormValid={setIsFormValid}
              />

              <Divider />

              {/* 담당자 선택 */}
              <EstimateSelect
                estmInfoData={estmInfoData?.data}
                membNm={clientForm.membNm}
                handleChangeValue={handleChangeValue}
                updateValid={updateValid}
                isFormValid={isFormValid}
              />

              <Divider />

              {/* 안내문 */}
              <EstimateSign
                clientForm={clientForm}
                handleChangeValue={handleChangeValue}
                searchCustEstmInfo={estmInfoData?.data?.searchCustEstmInfo}
              />

              <div className="p-4">
                <Button.CtaButton
                  size="XLarge"
                  state="On"
                  buttonType="submit"
                  onClick={() => {
                    if (isInputValid && isSelectValid) {
                      setIsFormValid(true);
                      setClientForm((prev) => ({ ...prev, loanNo }));
                      router.push(
                        isDDay
                          ? isEstmSend
                            ? `/my-case/estm/info/schdl?loanNo=${loanNo}&isDDay=true`
                            : "/my-case/estm/info/list"
                          : "/my-case/estm/info/list"
                      );
                    } else {
                      setIsFormValid(false);
                    }
                  }}
                >
                  다음
                </Button.CtaButton>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
