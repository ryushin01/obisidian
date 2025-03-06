"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RGSTR_GB_CD } from "@constants";
import { Button, Loading, Typography } from "@components";
import { useFetchApi } from "@hooks";
import { toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import {
  TFormList,
  TServerForm,
  TForm,
  TServerFormList,
} from "@app/my-case/estm/regist/page";

type TProps = {
  getValues: any;
  loanData: TForm;
  caseDetail: TDetailInfo;
  loanNo: string | null;
  buyGbCd: string;
  onClose: () => void;
};

type TJoint = TServerFormList & {
  buyerNum: string;
  buyerDenum: string;
};

export default function RegistModal({
  getValues,
  loanData,
  caseDetail,
  buyGbCd,
  onClose,
}: TProps) {
  const callToast = useSetAtom(toastState);
  const router = useRouter();
  const { fetchApi } = useFetchApi();
  const [isLoading, setIsLoading] = useState(false);

  // 등기 정보 저장하기 api
  const { mutate: saveLoanData } = useMutation({
    mutationKey: [],
    mutationFn: async (body: TServerForm) => {
      setIsLoading(true);

      const response = await fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/trreg/savetrregrgstrinfo`,
        method: "post",
        body: body,
      });

      setIsLoading(false);
      onClose();

      return response.json();
    },
    onSuccess: (res) => {
      console.log("등기정보 저장", res);

      if (res.code === "00") {
        setTimeout(() => {
          router.push(
            `/my-case/cntr/${caseDetail.loanNo}?regType=${RGSTR_GB_CD["01"]}`
          );
        }, 3000);

        if (loanData?.docWriteNum == null || loanData?.byrEqtRtResCvo == null) {
          callToast({
            msg: "등기정보가 등록되었습니다.",
            status: "success",
            dim: true,
          });
        } else {
          callToast({
            msg: "등기정보가 수정되었습니다.",
            status: "success",
            dim: true,
          });
        }
      } else if (res.code === "99") {
        callToast({
          msg: res.msg,
          status: "error",
        });
      } else {
        callToast({
          msg: "등기정보 저장에 실패하였습니다.",
          status: "error",
        });
      }
    },
  });
  // 단독명의 폼
  const singleForm = {
    procGb: "1",
    buyGbCd: "1",
    buyerNo: 1,
    buyerBirthDt: caseDetail?.dbtrBirthDt?.slice(0, 6),
    buyerName: caseDetail?.dbtrNm,
    buyerNum: 1,
    buyerDenum: 1,
    buyerTransAprvNo: "",
  };

  function OnRegistSubmitForm() {
    const { elregId, docWriteNum, byrEqtRtReqCvo } = getValues();

    let jointForm = byrEqtRtReqCvo?.map((item: TJoint) => ({
      procGb: "1",
      buyGbCd: "2",
      buyerNo: item.buyerNo,
      buyerBirthDt: item.buyerBirthDt,
      buyerName: item.buyerName,
      buyerNum: parseInt(item.buyerNum),
      buyerDenum: parseInt(item.buyerDenum),
      buyerTransAprvNo: "",
    }));

    let loanListForm: TServerForm = {
      loanNo: caseDetail.loanNo,
      elregId: elregId,
      docWriteNum: docWriteNum,
      byrEqtRtReqCvo: buyGbCd === "1" ? [singleForm] : jointForm,
    };

    saveLoanData(loanListForm);
    return loanListForm;
  }

  return (
    <>
      {isLoading && <Loading />}
      <Typography
        className="text-center py-3"
        type={Typography.TypographyType.H3}
        color="#333"
      >
        입력된 등기정보를 확인해주세요
      </Typography>
      <ul className="p-5 mb-6 bg-kos-gray-100 rounded-2xl">
        <li className="flex align-center justify-between">
          <Typography
            className="text-center"
            type={Typography.TypographyType.B2}
            color="text-kos-gray-600"
          >
            E-FORM ID
          </Typography>
          <Typography
            className="text-center"
            type={Typography.TypographyType.B1}
            color="text-kos-gray-800"
          >
            {getValues().elregId === "" ? "" : getValues().elregId}
          </Typography>
        </li>
        <li className="flex align-center justify-between mt-2.5">
          <Typography
            className="text-center"
            type={Typography.TypographyType.B2}
            color="text-kos-gray-600"
          >
            작성번호
          </Typography>
          <Typography
            className="text-center"
            type={Typography.TypographyType.B1}
            color="text-kos-gray-800"
          >
            {getValues().docWriteNum === "" ? "" : getValues().docWriteNum}
          </Typography>
        </li>

        {/*NOTE: 20250219 매수인 지분율 홀딩에 따른 주석 처리*/}
        {/*<li className="flex align-center justify-between mt-2.5">*/}
        {/*  <Typography*/}
        {/*    className="text-center"*/}
        {/*    type={Typography.TypographyType.B2}*/}
        {/*    color="text-kos-gray-600"*/}
        {/*  >*/}
        {/*    매수인 지분율 정보*/}
        {/*  </Typography>*/}
        {/*</li>*/}
        {/*{buyGbCd === "1" ? (*/}
        {/*  <li className="flex align-center justify-between mt-2.5">*/}
        {/*    <Typography*/}
        {/*      className="text-center"*/}
        {/*      type={Typography.TypographyType.B2}*/}
        {/*      color="text-kos-gray-600"*/}
        {/*    >*/}
        {/*      매수인 1*/}
        {/*    </Typography>*/}
        {/*    <Typography*/}
        {/*      className="text-center"*/}
        {/*      type={Typography.TypographyType.B1}*/}
        {/*      color="text-kos-gray-800"*/}
        {/*    >*/}
        {/*      {caseDetail?.dbtrNm}({caseDetail?.dbtrBirthDt?.slice(0, 6)}) 1*/}
        {/*      분의 1*/}
        {/*    </Typography>*/}
        {/*  </li>*/}
        {/*) : (*/}
        {/*  getValues().byrEqtRtReqCvo.map((item: TFormList) => (*/}
        {/*    <li*/}
        {/*      className="flex align-center justify-between mt-2.5"*/}
        {/*      key={String(item.buyerNo)}*/}
        {/*    >*/}
        {/*      <Typography*/}
        {/*        className="text-center"*/}
        {/*        type={Typography.TypographyType.B2}*/}
        {/*        color="text-kos-gray-600"*/}
        {/*      >*/}
        {/*        매수인 {String(item.buyerNo)}*/}
        {/*      </Typography>*/}
        {/*      <Typography*/}
        {/*        className="text-center"*/}
        {/*        type={Typography.TypographyType.B1}*/}
        {/*        color="text-kos-gray-800"*/}
        {/*      >*/}
        {/*        {item.buyerName}({item.buyerBirthDt}) {item.buyerDenum} 분의{" "}*/}
        {/*        {item.buyerNum}*/}
        {/*      </Typography>*/}
        {/*    </li>*/}
        {/*  ))*/}
        {/*)}*/}
      </ul>
      <div className="py-4">
        <Button.CtaButton
          onClick={() => {
            OnRegistSubmitForm();
          }}
          size="XLarge"
          state="On"
        >
          확인
        </Button.CtaButton>
      </div>
    </>
  );
}
