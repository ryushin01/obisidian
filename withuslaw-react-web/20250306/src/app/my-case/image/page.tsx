"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NextArrowIcon } from "@icons";
import { ATTC_FIL_CD, FLUTTER_FUNC_MODE, WK_CD } from "@constants";
import { Size } from "@components/Constants";
import { Badge, Button, Header, Typography } from "@components";
import { useDisclosure, useFetchApi, useFlutterBridgeFunc } from "@hooks";
import { caseDetailAtom, toastState } from "@stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { Sheet } from "react-modal-sheet";

type TResponse = {
  loanNo: string;
  reqGbCd: string;
  reqGbNm: string;
  procGbCd: string;
  procGbNm: string;
};

const STATUS_REQUEST = "00";
const STATUS_CHECKING = "01";
const STATUS_REJECT = "02";
const STATUS_COMPLETED = "03";
const STATUS_BRANCH_SUBMITED = "99";

const BADGE_TITLE: TObj = {
  // [STATUS_REQUEST]: "확인 요청",
  [STATUS_REQUEST]: "확인 중",
  [STATUS_CHECKING]: "확인 중",
  [STATUS_REJECT]: "반려",
  [STATUS_COMPLETED]: "완료",
  [STATUS_BRANCH_SUBMITED]: "영업점 제출",
};
const BADGE_COLOUR: TObj = {
  [STATUS_REQUEST]: "blue",
  [STATUS_CHECKING]: "blue",
  [STATUS_REJECT]: "red",
  [STATUS_COMPLETED]: "green",
  [STATUS_BRANCH_SUBMITED]: "gray",
};

export type TForm = {
  loanNo: string;
  reqGbCdLst: string;
  reqGbCd: string;
};

export default function MY_IM_005M() {
  const router = useRouter();
  const { fetchApi } = useFetchApi();
  const callToast = useSetAtom(toastState);
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  const { loanNo } = useAtomValue(caseDetailAtom);
  const { isOpen, open, close } = useDisclosure();
  const [isChecked, setIsChecked] = useState(false);
  const queryClient = useQueryClient();
  const isIos = sessionStorage.getItem("isIos");

  const handleAgreeCheck = () => {
    setIsChecked((prevState) => !prevState);
  };

  const { data } = useQuery({
    queryKey: ["es-tbs-docs", loanNo],
    queryFn: (): Promise<TData<TResponse[]>> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/estbs/searchestbsdoc/${loanNo}`,
        method: "get",
      }).then((res) => res.json()),
    enabled: loanNo !== "",
  });

  const document4Result =
    !!data?.data && data?.data.length > 0
      ? data?.data?.filter((el) => el.reqGbCd === "4")[0]?.procGbCd
      : "";

  const document8Result =
    !!data?.data && data?.data.length > 0
      ? data?.data?.filter((el) => el.reqGbCd === "8")[0]?.procGbCd
      : "";
  // const document4Result =
  //   !!data?.data && data?.data.length > 0
  //     ? data?.data?.filter((el) => el.reqGbCd === "4")[0]?.procGbCd
  //     : STATUS_REQUEST;

  // const document8Result =
  //   !!data?.data && data?.data.length > 0
  //     ? data?.data?.filter((el) => el.reqGbCd === "8")[0]?.procGbCd
  //     : STATUS_REQUEST;

  const { mutate: submitToBank } = useMutation({
    mutationKey: ["modify-estbs-doc"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/estbs/saveestbsdoc`,
        method: "post",
        body: {
          loanNo: loanNo,
          // reqGbCdLst: [
          //   {
          //     reqGbCd:"4"
          //   },
          //   {
          //     reqGbCd:"8"
          //   }
          // ]
        },
      }).then((res) => res.json()),
    onSuccess(data) {
      if (data.code === "00") {
        callToast({
          msg: "영업점 제출로 등록되었습니다.",
          status: "success",
          dim: true,
        });
        queryClient.invalidateQueries({ queryKey: ["es-tbs-docs", loanNo] });
        close();
      }
    },
    onError(error) {
      console.log("data?.data>>>>>>>", data?.data);
    },
  });

  /** 설정계약서 등록 , 등기필증 등록  */
  // const { mutate: regDocument } = useMutation({
  //   mutationKey: ["wk-img-rslt-trans"],
  //   mutationFn: (body: {
  //     loanNo: string;
  //     attcFilCd: string;
  //     bankCd: string;
  //     wkCd: string;
  //   }) =>
  //     fetchApi({
  //       url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/rgstr/wkimgrsltadminreq`,
  //       method: "post",
  //       body: body,
  //     }).then((res) => res.json()),
  //   onSuccess(data, variables, context) {
  //     console.log("wkimgrsltadminreq 호출 결과 ===>", data);
  //     if (data.code === "00") {
  //       callToast({
  //         msg: "등록되었습니다",
  //         status: "success",
  //         dim: true,
  //       });
  //     } else {
  //       callToast({
  //         msg: "실패되었습니다 " + data.msg,
  //         status: "success",
  //         dim: true,
  //       });
  //     }
  //   },
  //   onError(error, variables, context) {
  //     callToast({
  //       msg: "실패되었습니다 " + error,
  //       status: "success",
  //       dim: true,
  //     });
  //   },
  // });

  const callFlutter8 = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log("document8Result????", document8Result);

    // 미노출 및 반려의 경우 플러터 호출
    if (
      document8Result === "" ||
      document8Result === undefined ||
      document8Result === STATUS_REJECT
    ) {
      // @ts-ignore
      window.flutter_inappwebview.callHandler("flutterFunc", {
        mode: FLUTTER_FUNC_MODE.IMAGE,
        data: {
          wkCd: WK_CD.IMAGE_BIZ,
          attcFilCd: ATTC_FIL_CD[8],
          loanNo: loanNo,
          ...(document8Result === STATUS_REJECT && { returnYn: "Y" }), // 반려일 경우 returnYn 포함
        },
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else if (document8Result === STATUS_BRANCH_SUBMITED) {
      isSubmAlready();
    } else {
      preventDefault(e);
    }
  };

  const callFlutter4 = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log("document4Result????", document4Result);

    // 미노출 및 반려의 경우 플러터 호출
    if (
      document4Result === "" ||
      document4Result === undefined ||
      document4Result === STATUS_REJECT
    ) {
      // @ts-ignore
      window.flutter_inappwebview.callHandler("flutterFunc", {
        mode: FLUTTER_FUNC_MODE.IMAGE,
        data: {
          wkCd: WK_CD.IMAGE_BIZ,
          attcFilCd: ATTC_FIL_CD[4],
          loanNo: loanNo,
          ...(document4Result === STATUS_REJECT && { returnYn: "Y" }), // 반려일 경우 returnYn 포함
        },
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else if (document8Result === STATUS_BRANCH_SUBMITED) {
      isSubmAlready();
    } else {
      preventDefault(e);
    }
  };

  useEffect(() => {
    if (
      (value?.mode === "IMAGE" || value?.mode === "IMAGE_VIEW") &&
      value?.data?.code === "00"
    ) {
      queryClient.invalidateQueries({ queryKey: ["es-tbs-docs", loanNo] });

      // regDocument({
      //   loanNo: loanNo,
      //   wkCd: value?.data?.data?.data?.wkCd,
      //   bankCd: value?.data?.data?.data?.bankCd,
      //   attcFilCd: value?.data?.data?.data?.attcFilCd,
      // });

      // if (value?.data?.code === "00") {
      //   callToast({
      //     msg: "등록되었습니다",
      //     status: "success",
      //     dim: true,
      //   });
      // } else {
      //   callToast({
      //     msg: "실패되었습니다 " + value?.data?.msg,
      //     status: "success",
      //     dim: true,
      //   });
      // }
    }
  }, [value]);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
  }, []);

  console.log("data", data);

  const isSubmAlready = () => {
    callToast({
      msg: "이미 영업점 제출로 등록되었습니다.",
      status: "notice",
    });
    return;
  };

  const preventDefault = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full h-full">
      <Header
        title="설정서류"
        rightItem={
          !(
            document4Result === STATUS_REQUEST ||
            document4Result === STATUS_CHECKING ||
            document4Result === STATUS_COMPLETED ||
            document4Result === STATUS_BRANCH_SUBMITED
          ) &&
          !(
            document8Result === STATUS_REQUEST ||
            document8Result === STATUS_CHECKING ||
            document8Result === STATUS_COMPLETED ||
            document8Result === STATUS_BRANCH_SUBMITED
          ) && (
            <Button.TextButton
              size={Size.Small}
              state={true}
              onClick={() => open()}
            >
              영업점 제출
            </Button.TextButton>
          )
        }
      />

      <section className="w-full flex flex-col px-4">
        <button
          onClick={(e) => callFlutter4(e)}
          className="flex justify-between py-3"
          // onClick={() => {
          //   //@ts-ignore
          //   window.flutter_inappwebview.callHandler("flutterFunc", {
          //     // @ts-ignore
          //     mode: document4Result == null ? FLUTTER_FUNC_MODE.IMAGE : FLUTTER_FUNC_MODE.IMAGE_VIEW,
          //     data: {
          //       wkCd: WK_CD.IMAGE_BIZ,
          //       attcFilCd: ATTC_FIL_CD[4],
          //       loanNo: loanNo,
          //     },
          //   });
          // }}
        >
          <div className="flex gap-x-2 items-center">
            <Typography
              type={Typography.TypographyType.H3}
              color="text-kos-gray-700"
            >
              설정계약서
            </Typography>
            <Badge colorType={BADGE_COLOUR[document4Result]}>
              {document4Result != null && BADGE_TITLE[document4Result]}
            </Badge>
          </div>
          <Image src={NextArrowIcon} alt="arrow link icon" />
        </button>

        <button
          onClick={(e) => callFlutter8(e)}
          className="flex justify-between py-3"
        >
          <div className="flex gap-x-2 items-center">
            <Typography
              type={Typography.TypographyType.H3}
              color="text-kos-gray-700"
            >
              등기필증
            </Typography>
            <Badge colorType={BADGE_COLOUR[document8Result]}>
              {document8Result != null && BADGE_TITLE[document8Result]}
            </Badge>
          </div>
          <Image src={NextArrowIcon} alt="arrow link icon" />
        </button>

        {/* <div className="bg-kos-orange-100 py-1 px-2 break-all">
          flutter :
          <br />
          {JSON.stringify(value?.data?.data)}
        </div> */}
      </section>
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
          <Sheet.Content className={`${!!isIos ? "pb-5" : ""}`}>
            <Typography
              type={Typography.TypographyType.H3}
              color="text-kos-gray-800"
              className="text-center py-4"
            >
              영업점에 직접 제출하셨나요?
            </Typography>
            <ul className="list-disc px-8 text-kos-gray-700 flex flex-col gap-y-4">
              <li>
                <Typography
                  type={Typography.TypographyType.B1}
                  color="text-kos-gray-700"
                >
                  코스를 통해 제출하지 않고
                  <br />
                  <b>영업점에 직접 제출</b>한 것으로 은행에 통지됩니다.
                </Typography>
              </li>
              <li>
                <Typography
                  type={Typography.TypographyType.B1}
                  color="text-kos-gray-700"
                >
                  영업점 제출로 등록하면
                  <br />
                  앱에서는 <b>더 이상 서류 등록이 불가</b>합니다.
                </Typography>
              </li>
              <li>
                <Typography
                  type={Typography.TypographyType.B1}
                  color="text-kos-gray-700"
                >
                  코스를 통해 제출하지 않아 발생되는 문제는
                  <br />
                  <b>코스가 책임지지 않습니다.</b>
                </Typography>
              </li>
            </ul>
            <hr className="my-4" />
            <div className="px-4">
              <Button.Checkbox
                id="validation"
                checked={isChecked}
                onChange={handleAgreeCheck}
                label="위 내용을 확인하였습니다."
                fontSize={"H3"}
                size={"Big"}
              />
              <div className="pt-8 pb-6">
                <Button.CtaButton
                  size={"XLarge"}
                  state="On"
                  disabled={!isChecked}
                  onClick={() => submitToBank()}
                >
                  영업점 제출로 등록하기
                </Button.CtaButton>
              </div>
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
