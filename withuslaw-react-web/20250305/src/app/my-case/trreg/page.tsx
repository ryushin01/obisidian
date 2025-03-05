"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ExclamationMarkBlue, ExclamationMarkWithGrayBg } from "@icons";
import { RGSTR_GB_CD } from "@constants";
import { Size } from "@components/Constants";
import {
  Button,
  Divider,
  Input,
  Loading,
  SearchBar,
  Typography,
} from "@components";
import { useDisclosure, useFetchApi, useVirtualKeyboard } from "@hooks";
import { scrollToInput, stringUtil } from "@utils";
import { getCompareWithToday } from "@utils/dateUtil";
import { usePayInfoData } from "@libs";
import { caseDetailAtom, toastState } from "@stores";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Sheet } from "react-modal-sheet";
import { hypenTrregNumber } from "@/utils/hypenNumber";

type TForm = {
  regoNm: string;
  regoCd?: string;
  faRgstrUnqNo1?: string; //등기고유번호
  trregNo: string;
  erNums: TSaveList[];
  esNums: TSaveList[];
  bfNums: TSaveList[];
  ersuClsMsg: string;
};
type TRgstrInfo = {
  seq: number;
  rgstrGbCd: string;
  acptGbCd: string;
  rgstrNo: string;
  byrNm: string;
  byrBirthDt: string;
};
type TBuyerInfo = {
  seq: null | number;
  procGb: string;
  buyerGbCd: null | string;
  buyerNo: number;
  buyerBirthDt: string;
  buyerName: string;
  buyerNum: number;
  buyerDenum: number;
  buyerTransAprvNo: string;
};
type TResponse = {
  loanNo: string;
  kndCd: string;
  statCd: string; // '20': 지급 정보 등록 / '30': 등기접수번호 등록 / '40': 설정서류
  regoNm: string;
  ersuClsMsg: string;
  rgstrGbCd: string;
  acptGbCd: string;
  faRgstrUnqNo1: string; //등기고유번호
  rgstrAcptDtm: string;
  rgstrInfoList: TRgstrInfo[];
  buyerInfoList: TBuyerInfo[];
};
type TSaveList = {
  rgstrNo: string;
  /** 01:이전 / 02: 설정 접수번호 03:말소접수번호 */
  acptGbCd: string;
  byrNm: string;
  byrBirthDt: string;
};
type TBody = {
  regoNm: string;
  loanNo: string;
  ersuClsMsg: string;
  saveList: TSaveList[];
};
type TCheckList = {
  checkList: TCheckBody[];
};
type TCheckBody = {
  rgstrNo: string;
  regoCd: string;
  loanNo: string;
  tempUniqNo: string; //등기고유번호
};

/**
 * 지급정보 조회 API -> 상환금 있는 지 여부 체크
 * isDDay 체크
 * 단독명의, 공동명의 체크
 */

export default function MY_TR_001_M() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  // 단독명의 / 공동 명의 여부
  const [isEnrollAtOnce, setIsEntrollAtOnce] = useState(false);
  {
    /* NOTE: 20250219 매수인 지분율 홀딩에 따른 초기값 true 처리 */
  }
  const [isSoleOwnership, setIsSoleOwnership] = useState(true);
  const [regType, setRegType] = useState("01");
  const [isFinish, setIsFinish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, open, close } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    open: openConfirm,
    close: closeConfirm,
  } = useDisclosure();
  const { loanNo, execDt, statCd } = useAtomValue(caseDetailAtom);
  const [form, setForm] = useState<TBody>();
  const [payload, setPayload] = useState<TCheckList | null>(null);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    resetField,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      regoNm: "",
      faRgstrUnqNo1: "",
      trregNo: "",
      ersuClsMsg: "",
      erNums: [{ rgstrNo: "", byrNm: "", byrBirthDt: "", acptGbCd: "03" }],
      esNums: [{ rgstrNo: "", byrNm: "", byrBirthDt: "", acptGbCd: "02" }],
      bfNums: [{ rgstrNo: "", byrNm: "", byrBirthDt: "", acptGbCd: "01" }],
    },
  });

  const {
    fields: endNumFields,
    append: appendEndNum,
    remove: removeEndNum,
  } = useFieldArray({
    control,
    name: "erNums",
  });

  const {
    fields: esNumFields,
    append: appendEsNum,
    remove: removeEsNum,
  } = useFieldArray({
    control,
    name: "esNums",
  });

  const {
    fields: bfNumFields,
    append: appendBfNum,
    remove: removeBfNum,
  } = useFieldArray({
    control,
    name: "bfNums",
  });

  const callToast = useSetAtom(toastState);
  const { expandedRef } = useVirtualKeyboard();
  const { fetchApi } = useFetchApi();
  const isIos = sessionStorage.getItem("isIos");

  // const { data: initRegInfo, isLoading } = useQuery({
  const { data: initRegInfo } = useQuery({
    queryKey: ["search-acptno-reg-info"],
    queryFn: (): Promise<TResponse> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/searchacptnoreginfo/${loanNo}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    enabled: loanNo !== "",
  });

  const { mutate, data } = useMutation({
    mutationKey: ["search-rego"],
    mutationFn: (regoNm: string) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/rego/searchrego`,
        method: "post",
        body: { regoNm },
      })
        .then((res) => res.json())
        .then((res) => res.data),
  });

  const { mutate: checkTrreg } = useMutation({
    mutationKey: ["check-trreg"],
    mutationFn: async (body: TCheckBody[]) => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_KOS_API_URL}/api/auth/iros/searchfidacptnovalidlist`,
        method: "post",
        body: body,
      });

      setIsLoading(false);

      return response.json();
    },
    onSuccess(data, variables, context) {
      const falseCase = data.data.filter((el: any) => el.available === false);

      if (falseCase.length > 0) {
        callToast({
          msg: "등기신청 사건이 존재하지않습니다.\n입력내용을 확인해주세요.",
          status: "error",
          // dim: true,
        });
        /* 불일치 접수번호 노출 임시 주석 */
        // const message = falseCase
        //   .map((item: any) => `접수번호 ${item.rgstrNo}가 일치하지 않습니다.`)
        //   .join("\n");

        // callToast({
        //   msg: message,
        //   status: "error",
        //   dim: true,
        // });
      } else {
        openConfirm();
      }
    },
    onError: (error) => {
      callToast({
        msg: "등기 조회중 오류가 발생하였습니다 .\n다시 시도해주세요.",
        status: "error",
        dim: true,
      });
    },
  });

  const { mutate: saveAcptnoReg } = useMutation({
    mutationKey: ["search-rego"],
    mutationFn: async (body: TBody) => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/saveacptnoreg`,
        method: "post",
        body: body,
      });

      setIsLoading(false);

      return response.json();
    },
    onSuccess(data, variables, context) {
      console.log("저장 결과! ===>", data);
      if (data.code === "00") {
        try {
          closeConfirm();

          callToast({
            msg: "접수번호가 등록되었습니다.",
            status: "success",
            dim: true,
            // afterFunc: move
          });

          setTimeout(() => {
            router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
          }, 3000);
        } catch (error) {
          console.error("callToast 호출 중 에러 발생:", error);
        }
      }
    },
  });

  useEffect(() => {
    setValue("faRgstrUnqNo1", initRegInfo?.faRgstrUnqNo1); // 등기고유번호 set해주기
  }, [initRegInfo]);

  const move = () => {
    router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
  };

  // 지급 내역 조회
  const { repayList, befDbsmtCnclCd } = usePayInfoData({ loanNo });
  const isRequiredErNums = repayList.length > 0;
  const isbefDbsmtCnclCd = befDbsmtCnclCd === "1";
  const regoNmRef = useRef<HTMLInputElement | null>(null);
  const regoNmValueRef = useRef<string>("");

  const [tempValue, setTempValue] = useState(""); // 검색어 임시 저장
  const [finalValue, setFinalValue] = useState(""); // 확정된 값 저장
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (e.type === "compositionstart") {
      setIsComposing(true);
    }
    if (e.type === "compositionupdate") {
      setIsComposing(true);
      regoNmValueRef.current = value;
    }
    if (e.type === "compositionend") {
      setIsComposing(false);
      regoNmValueRef.current = value;
      setValue("regoNm", regoNmValueRef.current); // 조합 중인 값을 업데이트
      return;
    }

    if (isComposing && value === "") {
      mutate("힣"); // 초기화
      setValue("regoNm", value);
      regoNmRef.current?.focus();
      return;
    }
    //if (!value.match(/[ㄱ-ㅎㅏ-ㅣ]/g)) {
    if (!isComposing) {
      clearErrors();
      mutate(value);
      regoNmValueRef.current = value;
      setValue("regoNm", regoNmValueRef.current);
    }
  };

  const handleSearchBarKeyDown = (e: KeyboardEvent) => {
    const value = regoNmValueRef.current;
    if (e.key === "Enter") {
      const msg =
        value === "" ||
        (value.length === 1 && !stringUtil.isCompleteHangul(value))
          ? "검색어를 한 글자 이상 입력해주세요"
          : "";

      if (msg !== "") {
        callToast({
          msg,
          status: "notice",
        });
        return;
      } else {
        search(value);
      }
    }
  };

  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!isComposing) {
      setTempValue(value);
      clearErrors();
      regoNmValueRef.current = value;
      setValue("regoNm", regoNmValueRef.current);
      search(value);
    }
  };

  const search = (value: string) => {
    // 조합 완료 후, 일반 입력 처리
    if (value.match(/[ㄱ-ㅎㅏ-ㅣ]/g) && !stringUtil.isCompleteHangul(value))
      return;
    mutate(value);
  };

  const handleSearchResultClick = (regoNm: string, regoCd: string) => {
    setFinalValue(regoNm); // 확정된 값 저장
    setValue("regoNm", regoNm); // React Hook Form에 반영
    setValue("regoCd", regoCd); // 등기소 코드
    close(); // 검색창 닫기
  };

  // 1. setForm에 데이터 입력
  const onSubmit = (data: TForm) => {
    //이전 건
    if (regType === RGSTR_GB_CD["01"]) {
      setForm({
        regoNm: data.regoNm,
        // ccrstAcptNum: data.ccrstAcptNum!,
        loanNo,
        ersuClsMsg: data.ersuClsMsg,
        saveList: isSoleOwnership
          ? [
              {
                rgstrNo: data.trregNo,
                byrNm: "",
                byrBirthDt: "",
                acptGbCd: "01",
              },
              ...data.erNums,
            ]
          : [...data.bfNums, ...data.erNums],
      });
      /* 이전건 유효성체크 주석처리 */
      // const checkList: TCheckBody[] = data.bfNums.map((bfNum) => ({
      //   rgstrNo: bfNum.rgstrNo, // 등기접수번호
      //   regoCd: data.regoCd!, // 등기소코드
      //   loanNo, // 여신번호
      //   tempUniqNo: data.faRgstrUnqNo1!, // 등기고유번호
      // }));
      // //payload 저장
      // setPayload({
      //   checkList,
      // });
      //유효성 체크
      // checkNums({ checkList });
      openConfirm();
    }

    // 설정 건
    if (regType === RGSTR_GB_CD["02"]) {
      setForm({
        regoNm: data.regoNm,
        loanNo,
        ersuClsMsg: data.ersuClsMsg,
        saveList: [...data.esNums, ...data.erNums],
      });
      const checkList: TCheckBody[] = data.esNums.map((esNum) => ({
        rgstrNo: esNum.rgstrNo, // 등기접수번호
        regoCd: data.regoCd!, // 등기소코드
        loanNo, // 여신번호
        tempUniqNo: data.faRgstrUnqNo1!, // 등기고유번호
      }));
      //payload 저장
      setPayload({
        checkList,
      });
      //유효성 체크
      checkNums({ checkList });
    }

    // 말소 건
    if (regType === RGSTR_GB_CD["03"]) {
      setForm({
        regoNm: data.regoNm,
        loanNo,
        ersuClsMsg: data.ersuClsMsg,
        saveList: [...data.erNums],
      });
      openConfirm();
    }
  };

  // 2. 유효성 체크 API 호출
  const checkNums = (payload: TCheckList) => {
    checkTrreg(payload?.checkList!);
  };

  useEffect(() => {
    console.log("rgstrGbCd", initRegInfo?.rgstrGbCd);
    setRegType(!!initRegInfo?.rgstrGbCd ? initRegInfo?.rgstrGbCd : "01");
    {
      /* NOTE: 20250219 매수인 지분율 홀딩에 따른 주석 처리 */
    }
    // setIsSoleOwnership(
    //   !!initRegInfo?.buyerInfoList && initRegInfo?.buyerInfoList.length === 1
    // );
    // 등기소명
    if (!!initRegInfo?.regoNm && initRegInfo?.regoNm !== "") {
      setValue("regoNm", initRegInfo?.regoNm);
    }

    if (!!initRegInfo?.ersuClsMsg && initRegInfo?.ersuClsMsg !== "") {
      setValue("ersuClsMsg", initRegInfo?.ersuClsMsg);
    }

    // 등기 접수번호 등록이 완료된 상태에서 재진입 시 모든 입력 필드 비활성화 처리
    if (initRegInfo?.statCd != undefined && initRegInfo?.statCd >= "40") {
      console.log("등록 완료된 상태!");
      setIsFinish(true);
    }

    // setValue(
    //   "bfNums",
    //   initRegInfo?.buyerInfoList.map((el) => ({
    //     byrNm: el.buyerName,
    //     byrBirthDt: el.buyerBirthDt,
    //     rgstrNo: "" ,
    //     acptGbCd: "01",
    //   }))
    // );

    // 수정인 경우 기존 데이터를 셋팅 한다.
    if (!!initRegInfo?.rgstrInfoList && initRegInfo?.rgstrInfoList.length > 0) {
      if (isSoleOwnership == false) {
        removeBfNum(0);
      }

      initRegInfo?.rgstrInfoList.map((el) => {
        // 이전접수번호
        if (el.acptGbCd == "01") {
          if (initRegInfo?.buyerInfoList.length == 1) {
            setValue("trregNo", el.rgstrNo);
          } else {
            appendBfNum({
              rgstrNo: el.rgstrNo,
              byrNm: el.byrNm,
              byrBirthDt: el.byrBirthDt,
              acptGbCd: "01",
            });
          }
        }
        // 설정접수번호
        if (el.acptGbCd == "02") {
          appendEsNum({
            rgstrNo: el.rgstrNo,
            byrNm: el.byrNm,
            byrBirthDt: el.byrBirthDt,
            acptGbCd: "02",
          });
        }
        // 말소 접수 번호
        if (el.acptGbCd == "03") {
          appendEndNum({
            rgstrNo: el.rgstrNo,
            byrNm: el.byrNm,
            byrBirthDt: el.byrBirthDt,
            acptGbCd: "03",
          });
        }
      });
    } else {
      // 신규 + 이전등기인 경우
      if (regType === RGSTR_GB_CD["01"]) {
        // 공동명의 경우 첫번째 이전등록 번호입력란을 삭제한다.
        if (isSoleOwnership == false) {
          removeBfNum(0);
        }
        initRegInfo?.buyerInfoList.map(
          (el2) => (
            console.log(
              "buyerName : " +
                el2.buyerName +
                " , buyerBirthDt : " +
                el2.buyerBirthDt
            ),
            appendBfNum({
              rgstrNo: "",
              byrNm: el2.buyerName,
              byrBirthDt: el2.buyerBirthDt,
              acptGbCd: "01",
            })
          )
        );
      }
    }

    // 설정,말소 접수번호가 있을경우 defaultValues 삭제
    if (getValues().esNums.length > 1 && getValues().esNums[0].rgstrNo === "")
      removeEsNum(0);
    if (getValues().erNums.length > 1 && getValues().erNums[0].rgstrNo === "")
      removeEndNum(0);
  }, [initRegInfo]);

  /*
   @ 입력 처리시 (rgstrGbCd)
    01.이전 : 등기소명/이전접수번호/말소접수번호/말소접수번호 등록 불가체크박스
         : 등기정보에서 입력한 매수인 만큼 입력필드 자동 생성
    02.설정 : 등기소명/설정접수번호/말소접수번호/말소접수번호 등록 불가체크박스
    03.말소 : 등기소명/말소접수번호/말소접수번호 등록 불가체크박스
  */

  // if (isLoading) return <Loading />;

  return (
    <>
      {isLoading && <Loading />}
      <form
        className="w-full h-full pt-4 pb-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          type={Typography.TypographyType.H1}
          color="text-kos-gray-800"
          className="px-4"
        >
          등기 완료 확인을 위해 <br />
          접수번호를 입력해주세요
        </Typography>
        {regType === RGSTR_GB_CD["01"] && !isSoleOwnership && (
          <p className="text-kos-blue-500 text-sm flex font-semibold gap-x-2 mt-4 px-4">
            <Image src={ExclamationMarkBlue} alt="exclamation mark" />
            공동명의는 매수인별로 이전접수번호를 입력해주세요.
          </p>
        )}
        <div ref={expandedRef}>
          <Input.InputContainer className="px-4 py-4">
            <Input.Label htmlFor={"regoNm"} required={true}>
              등기소명
            </Input.Label>
            <Controller
              control={control}
              name="regoNm"
              rules={{ required: true }}
              render={({ field: { onBlur } }) => (
                <Input.InputField
                  styleType={errors.regoNm ? "error" : "default"}
                  inputType="text"
                  value={statCd >= "40" ? getValues().regoNm : finalValue} // 확정된 값만 표시
                  placeholder={
                    errors.regoNm ? "등기소명을 입력해주세요" : "등기소명 입력"
                  }
                  onChange={() => {}} // 사용자가 직접 입력 불가
                  onBlur={onBlur}
                  disabled={isFinish === true}
                  readOnly
                  required
                  onClick={open} // 검색창 열기
                />
              )}
            />
          </Input.InputContainer>
          {!(regType === RGSTR_GB_CD["03"]) && (
            <Input.InputContainer className="px-4 py-4 pb-6">
              <Input.Label htmlFor={"faRgstrUnqNo1"} required={false}>
                등기고유번호
              </Input.Label>
              <Controller
                control={control}
                name="faRgstrUnqNo1"
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => {
                  const formatNumber = (value: string) => {
                    // 숫자만 추출하고 14자리까지만 유지
                    const onlyNumbers = value.replace(/\D/g, "").slice(0, 14);

                    return onlyNumbers.replace(
                      /(\d{4})(\d{1,3})(\d*)/,
                      (_: any, p1: any, p2: any, p3: any) => {
                        let result = p1;
                        if (p2) result += `-${p2}`;
                        if (p3) result += `-${p3}`;
                        return result;
                      }
                    );
                  };

                  return (
                    <Input.InputField
                      styleType={"default"}
                      inputType="text"
                      thousandSeparator={false}
                      value={formatNumber(value!)}
                      onClick={() => clearErrors}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(
                          /[^0-9\-\\]/g,
                          ""
                        ); // 숫자만 유지
                        onChange(rawValue);
                      }}
                      onFocus={scrollToInput}
                      onBlur={onBlur}
                      disabled={isFinish === true}
                      maxLength={16}
                    />
                  );
                }}
              />
            </Input.InputContainer>
          )}
          {!(regType === RGSTR_GB_CD["03"]) && <Divider />}

          {regType === RGSTR_GB_CD["01"] &&
            (isSoleOwnership ? (
              <Input.InputContainer className="px-4 py-6">
                <Input.Label htmlFor={"trregNo"} required={true}>
                  이전접수번호
                </Input.Label>
                <Controller
                  control={control}
                  name="trregNo"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input.InputField
                      styleType={errors.trregNo ? "error" : "default"}
                      inputType="number"
                      thousandSeparator={false}
                      value={value}
                      placeholder={
                        errors.trregNo
                          ? "이전접수번호를 입력해주세요"
                          : "번호 입력"
                      }
                      onChange={(e) => {
                        const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                        // 입력값에서 숫자 이외의 문자 제거
                        const filteredValue = e.target.value.replace(
                          regExp,
                          ""
                        );

                        onChange(filteredValue);
                      }}
                      onClick={() => clearErrors}
                      onFocus={scrollToInput}
                      onBlur={onBlur}
                      // required={true}
                      disabled={isFinish === true}
                      maxLength={6}
                      leadingZero={true}
                    />
                  )}
                />
              </Input.InputContainer>
            ) : (
              bfNumFields.map((bfNum, i) => (
                <Input.InputContainer
                  className={`px-4 py-6 ${
                    !!initRegInfo?.buyerInfoList
                      ? i !== initRegInfo?.buyerInfoList.length - 1 &&
                        "border border-b-1 border-kos-gray-200"
                      : ""
                  } `}
                  key={bfNum.byrBirthDt}
                >
                  <Input.Label
                    htmlFor={"bfNums"}
                    required={true}
                    rightItem={
                      <Controller
                        control={control}
                        name={`bfNums.${i}.rgstrNo`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <>
                            {getCompareWithToday(execDt) === "past" || isFinish
                              ? null
                              : i === 0 &&
                                value !== "" && // value가 있을 때 버튼이 보임
                                (isEnrollAtOnce ? (
                                  <Button.TextButton
                                    size={Size.Small}
                                    onClick={() => {
                                      setIsEntrollAtOnce(false);
                                      const resetAllList =
                                        getValues().bfNums.map((el, idx) => ({
                                          ...el,
                                          num: idx === 0 ? el.rgstrNo : "", // 첫번째 인풋 값만 두고 전부 리셋
                                          rgstrNo: idx === 0 ? el.rgstrNo : "", // 첫번째 인풋 값만 두고 전부 리셋
                                        }));
                                      setValue("bfNums", resetAllList);
                                    }}
                                  >
                                    {" "}
                                    개별등록
                                  </Button.TextButton>
                                ) : (
                                  <Button.TextButton
                                    state={true}
                                    size={Size.Small}
                                    onClick={() => {
                                      setIsEntrollAtOnce(true);
                                      const allSameNoList =
                                        getValues().bfNums.map((el) => ({
                                          ...el,
                                          num: getValues().bfNums[i].rgstrNo,
                                          rgstrNo:
                                            getValues().bfNums[i].rgstrNo,
                                        }));
                                      setValue("bfNums", allSameNoList);
                                    }}
                                  >
                                    {" "}
                                    일괄등록
                                  </Button.TextButton>
                                ))}
                          </>
                        )}
                      />
                    }
                  >
                    {" "}
                    이전접수번호 ({bfNum.byrNm}/{bfNum.byrBirthDt})
                  </Input.Label>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name={`bfNums.${i}.rgstrNo`}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input.InputField
                        inputType="number"
                        thousandSeparator={false}
                        value={
                          isEnrollAtOnce
                            ? getValues().bfNums[0].rgstrNo
                            : getValues().bfNums[i].rgstrNo
                        }
                        placeholder={
                          errors?.bfNums?.[i]?.rgstrNo
                            ? "이전접수번호를 입력해주세요"
                            : "번호 입력"
                        }
                        styleType={
                          !isEnrollAtOnce && errors?.bfNums?.[i]?.rgstrNo
                            ? "error"
                            : "default"
                        }
                        onChange={(e) => {
                          const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                          // 입력값에서 숫자 이외의 문자 제거
                          const filteredValue = e.target.value.replace(
                            regExp,
                            ""
                          );

                          onChange(filteredValue);
                        }}
                        onBlur={onBlur}
                        // required={true}
                        disabled={
                          getCompareWithToday(execDt) === "past" ||
                          (isEnrollAtOnce && i !== 0) ||
                          isFinish === true
                        }
                        maxLength={6}
                        onFocus={scrollToInput}
                        leadingZero={true}
                      />
                    )}
                  />
                </Input.InputContainer>
              ))
            ))}
          {regType === RGSTR_GB_CD["02"] &&
            esNumFields.map((esNums, i) => (
              <Input.InputContainer
                className={`px-4 py-6 ${
                  i !== esNumFields.length - 1 &&
                  "border border-b-1 border-kos-gray-200"
                } `}
                key={`${i}${esNums.byrBirthDt}`}
              >
                <Input.Label
                  htmlFor={"trregNo"}
                  required={true}
                  rightItem={
                    getCompareWithToday(execDt) === "past" ||
                    isFinish ? null : i === 0 ? (
                      <Button.TextButton
                        state={true}
                        size={Size.Small}
                        onClick={() => {
                          if (esNumFields.length === 3) {
                            callToast({
                              msg: "설정접수번호는 최대 3개까지 등록 가능합니다",
                              status: "notice",
                            });
                            return;
                          }
                          appendEsNum({
                            rgstrNo: "",
                            byrNm: "",
                            byrBirthDt: "",
                            acptGbCd: "02",
                          });
                        }}
                      >
                        {" "}
                        추가{" "}
                      </Button.TextButton>
                    ) : (
                      <Button.TextButton
                        size={Size.Small}
                        onClick={() => {
                          removeEsNum(i);
                        }}
                      >
                        {" "}
                        삭제{" "}
                      </Button.TextButton>
                    )
                  }
                >
                  설정접수번호
                </Input.Label>
                <Controller
                  control={control}
                  name={`esNums.${i}.rgstrNo`}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input.InputField
                      styleType={errors.esNums && !value ? "error" : "default"}
                      inputType="number"
                      thousandSeparator={false}
                      value={value}
                      placeholder={
                        errors.esNums && !value
                          ? "설정접수번호를 입력해주세요"
                          : "번호 입력"
                      }
                      onChange={(e) => {
                        const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                        // 입력값에서 숫자 이외의 문자 제거
                        const filteredValue = e.target.value.replace(
                          regExp,
                          ""
                        );

                        onChange(filteredValue);
                      }}
                      onBlur={onBlur}
                      // required={true}
                      disabled={isFinish === true}
                      maxLength={6}
                      onFocus={scrollToInput}
                      leadingZero={true}
                    />
                  )}
                />
              </Input.InputContainer>
            ))}
          <Divider />
          {endNumFields.map((el, i) => (
            <Input.InputContainer
              className={`px-4 py-6 ${
                i !== endNumFields.length - 1 &&
                "border border-b-1 border-kos-gray-200"
              } `}
              key={el.id}
            >
              <Input.Label
                htmlFor={"trregNo"}
                required={isRequiredErNums || isbefDbsmtCnclCd}
                rightItem={
                  isChecked ||
                  getCompareWithToday(execDt) === "past" ||
                  isFinish ? null : i === 0 ? (
                    <Button.TextButton
                      state={true}
                      size={Size.Small}
                      onClick={() => {
                        if (endNumFields.length === 8) {
                          callToast({
                            msg: "말소접수번호는 최대 8개까지 등록 가능합니다",
                            status: "notice",
                          });
                          return;
                        }
                        appendEndNum({
                          rgstrNo: "",
                          byrNm: "",
                          byrBirthDt: "",
                          acptGbCd: "03",
                        });
                      }}
                    >
                      {" "}
                      추가{" "}
                    </Button.TextButton>
                  ) : (
                    <Button.TextButton
                      size={Size.Small}
                      onClick={() => removeEndNum(i)}
                    >
                      삭제
                    </Button.TextButton>
                  )
                }
              >
                {" "}
                말소접수번호
              </Input.Label>
              <Controller
                control={control}
                name={`erNums.${i}.rgstrNo`}
                rules={{
                  required:
                    (isRequiredErNums || isbefDbsmtCnclCd) && !isChecked,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div>
                    <Input.InputField
                      styleType={errors.erNums && !value ? "error" : "default"}
                      inputType="number"
                      thousandSeparator={false}
                      // required={isRequiredErNums || isbefDbsmtCnclCd}
                      value={value}
                      disabled={
                        isChecked ||
                        getCompareWithToday(execDt) === "past" ||
                        isFinish === true
                      }
                      placeholder={
                        errors.erNums && !value && !isChecked
                          ? "말소접수번호를 입력해주세요"
                          : "번호 입력"
                      }
                      onChange={(e) => {
                        const regExp = /[^0-9]/g; // 숫자가 아닌 모든 문자

                        // 입력값에서 숫자 이외의 문자 제거
                        const filteredValue = e.target.value.replace(
                          regExp,
                          ""
                        );

                        onChange(filteredValue);
                      }}
                      onBlur={onBlur}
                      maxLength={6}
                      onFocus={scrollToInput}
                      leadingZero={true}
                    />
                    {!value &&
                      (isRequiredErNums || isbefDbsmtCnclCd) &&
                      errors.erNums &&
                      !isChecked && (
                        <div className="text-right mr-1">
                          <label className="text-xs text-kos-red-500">
                            * 선순위 상환 조건은 필수 입력입니다
                          </label>
                        </div>
                      )}
                  </div>
                )}
              />
              {endNumFields.length === 1 && !(isFinish === true) && (
                <Button.Checkbox
                  size={"Big"}
                  fontSize="B4"
                  id={"disable"}
                  label={"말소접수번호 등록 불가"}
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked((prev) => !prev);
                    resetField("erNums");
                    resetField("ersuClsMsg");
                  }}
                />
              )}
            </Input.InputContainer>
          ))}
          {(isChecked || getValues().ersuClsMsg !== "") && (
            <Input.InputContainer className="px-4">
              <Input.Label htmlFor={"ersuClsMsg"} required={true}>
                등록 불가 사유
              </Input.Label>
              <Controller
                control={control}
                name="ersuClsMsg"
                rules={{ required: isChecked }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.InputField
                    inputType="text"
                    value={value}
                    placeholder={
                      errors.ersuClsMsg ? "사유를 입력해주세요" : "사유 입력"
                    }
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 100) {
                        onChange(e); // 변경된 값을 onChange 함수에 전달
                      }
                    }}
                    disabled={isFinish === true}
                    onBlur={onBlur}
                    styleType={errors.ersuClsMsg ? "error" : "default"}
                    maxLength={100}
                    onFocus={scrollToInput}
                  />
                )}
              />
            </Input.InputContainer>
          )}
          {!(isFinish === true) && (
            <footer
              className="fixed w-full left-0 bottom-0 bg-kos-white p-4"
              style={{
                boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)",
              }}
            >
              <Button.CtaButton
                size={Size.XLarge}
                state="On"
                buttonType="submit"
              >
                등록하기
              </Button.CtaButton>
            </footer>
          )}
        </div>

        <Sheet
          className="border-none"
          isOpen={isOpen}
          onClose={() => {
            setTempValue("");
            mutate("힣");
            setValue("regoNm", finalValue);
            close();
          }}
          detent={"content-height"}
          snapPoints={[600, 400, 100, 0]}
        >
          <Sheet.Container
            style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
          >
            <Sheet.Header />
            <Sheet.Content>
              <Typography
                type={Typography.TypographyType.H3}
                color="text-kos-gray-800"
                className="px-4 pb-7 text-center"
              >
                등기소명 검색
              </Typography>
              <div className="px-4 pb-2">
                <SearchBar
                  as="input"
                  placeholder="등기소명을 입력해주세요"
                  ref={regoNmRef}
                  value={tempValue} // 임시 값 표시
                  handleChange={handleSearchBarChange}
                  handleKeyDown={handleSearchBarKeyDown}
                  removeValue={() => {
                    setTempValue("");
                    mutate("힣");
                    // setFinalValue("");
                    // resetField("regoNm");
                  }} // 검색 초기화
                />
              </div>
              <Divider />
              <div className="overflow-y-scroll w-full p-4 h-80 flex flex-col gap-y-2">
                {tempValue === "" ? null : data &&
                  Array.isArray(data) &&
                  data.length > 0 ? (
                  data.map((el: any) => (
                    <div
                      className="py-4 px-5 bg-gray-100 rounded-[20px]"
                      onClick={() => {
                        handleSearchResultClick(el.regoNm, el.regoCd);
                        setTempValue("");
                        mutate("힣");
                      }}
                      key={el.regoCd}
                    >
                      <Typography
                        type={Typography.TypographyType.H5}
                        color="text-kos-gray-900"
                      >
                        {el.regoNm}
                      </Typography>
                      <Typography
                        type={Typography.TypographyType.B5}
                        color="text-kos-gray-700"
                      >
                        {el.regoAddr}
                        {/* [{el.regoCd}] {el.regoAddr} */}
                      </Typography>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-kos-gray-600">
                    <Image src={ExclamationMarkWithGrayBg} alt="알림 아이콘" />
                    조회 결과가 없습니다.
                  </div>
                )}
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            onTap={() => {
              setTempValue("");
              mutate("힣");
              setValue("regoNm", finalValue);
              close();
            }}
            style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
          />
        </Sheet>

        <Sheet
          className="border-none"
          isOpen={isOpenConfirm}
          onClose={() => closeConfirm()}
          detent={"content-height"}
          snapPoints={[600, 400, 100, 0]}
        >
          <Sheet.Container
            style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
          >
            <Sheet.Header />

            <Sheet.Content className={`px-4 ${isIos ? "pb-5" : ""}`}>
              <Typography
                type={Typography.TypographyType.H3}
                color="text-kos-gray-800"
                className="text-center"
              >
                입력된 접수번호를 확인해주세요
              </Typography>

              <article className="rounded-2xl bg-kos-gray-100 p-5 flex flex-col gap-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <Typography
                    type={Typography.TypographyType.B2}
                    color="text-kos-gray-600"
                  >
                    등기소명
                  </Typography>
                  <Typography
                    type={Typography.TypographyType.B1}
                    color="text-kos-gray-800"
                  >
                    {getValues().regoNm}
                  </Typography>
                </div>
                {!(regType === RGSTR_GB_CD["03"]) && (
                  <div className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      등기고유번호
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B1}
                      color="text-kos-gray-800"
                    >
                      {hypenTrregNumber(getValues().faRgstrUnqNo1!)}
                    </Typography>
                  </div>
                )}
                {regType === RGSTR_GB_CD["01"] &&
                  (isSoleOwnership ? (
                    <div className="flex items-center justify-between">
                      <Typography
                        type={Typography.TypographyType.B2}
                        color="text-kos-gray-600"
                      >
                        이전접수번호
                      </Typography>
                      <Typography
                        type={Typography.TypographyType.B1}
                        color="text-kos-gray-800"
                      >
                        {getValues().trregNo}
                      </Typography>
                    </div>
                  ) : (
                    getValues().bfNums.map((el, i) => (
                      <div
                        className="flex items-center justify-between"
                        key={`${i}${el.rgstrNo}`}
                      >
                        <Typography
                          type={Typography.TypographyType.B2}
                          color="text-kos-gray-600"
                        >
                          이전접수번호 ({el.byrNm}/{el.byrBirthDt})
                        </Typography>
                        <Typography
                          type={Typography.TypographyType.B1}
                          color="text-kos-gray-800"
                        >
                          {el.rgstrNo}
                        </Typography>
                      </div>
                    ))
                  ))}
                {regType === RGSTR_GB_CD["02"] &&
                  getValues().esNums.map((el, i) => (
                    <div
                      className="flex items-center justify-between"
                      key={`${i}${el.rgstrNo}`}
                    >
                      <Typography
                        type={Typography.TypographyType.B2}
                        color="text-kos-gray-600"
                      >
                        설정접수번호
                      </Typography>
                      <Typography
                        type={Typography.TypographyType.B1}
                        color="text-kos-gray-800"
                      >
                        {el.rgstrNo}
                      </Typography>
                    </div>
                  ))}
                {getValues().ersuClsMsg === "" ? (
                  getValues()
                    .erNums.filter((el) => el.rgstrNo) // rgstrNo 값이 존재하는 것만 필터링
                    .map((el, i) => (
                      <div
                        className="flex items-center justify-between"
                        key={`${i}${el.rgstrNo}`}
                      >
                        <Typography
                          type={Typography.TypographyType.B2}
                          color="text-kos-gray-600"
                        >
                          말소접수번호
                        </Typography>
                        <Typography
                          type={Typography.TypographyType.B1}
                          color="text-kos-gray-800"
                        >
                          {el.rgstrNo}
                        </Typography>
                      </div>
                    ))
                ) : (
                  <div className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      말소접수번호
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B1}
                      color="text-kos-gray-800"
                    >
                      등록불가
                    </Typography>
                  </div>
                )}
              </article>

              <Typography
                type={Typography.TypographyType.B5}
                color="text-kos-gray-500"
                className="mt-6 text-center"
              >
                등록된 접수번호는 수정이 불가합니다.
              </Typography>

              <footer className="pb-8 pt-4">
                <Button.CtaButton
                  size={Size.XLarge}
                  state="On"
                  onClick={() => form && saveAcptnoReg(form)}
                >
                  확인
                </Button.CtaButton>
              </footer>
            </Sheet.Content>
          </Sheet.Container>

          <Sheet.Backdrop
            onTap={closeConfirm}
            style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
          />
        </Sheet>
      </form>
    </>
  );
}
