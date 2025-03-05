"use client";

import React, { useEffect, useState } from "react";
import { Alert, Button, Typography } from "@components";
import { useDisclosure, useFetchApi, useFlutterBridgeFunc } from "@hooks";
import useGeoLocation from "@hooks/useGeoLocation";
import { usePayInfoData } from "@libs";
import { caseDetailAtom } from "@stores";
import { phoneInquiry } from "@utils/flutterUtil";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import CurrencyFormat from "react-currency-format";
import { Sheet } from "react-modal-sheet";
import PayGroupItem from "@app/my-case/PayGroupItem";
import RpyCnclResult from "@app/my-case/rpycncl/RpyCnclResult";

/**
 * 상환금 요청하기 누르면
 * 1. 위치 인증 권한 체크
 * 2. 클릭한 은행이 상환금 수령용 계좌에 등록되어있는 지 여부 확인
 * 3. 계좌 X 당행 지급 팝업 -> 위치 확인 / 계좌 O - 위치확인 바텀시트
 * 4. 지급 요청
 * 5. 성공 - 상환영수증 등록(Flutter) / 실패 - 상태 표시
 * 6.
 */
type TAcctInfo = {
  acctNo: string;
  bankCd: string;
  bankNm: string;
};
type TSearchRpyAcctRes = {
  woori: TAcctInfo;
  bankList: TAcctInfo[];
};

export default function MY_RP_000M() {
  const location = useGeoLocation();
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  const { fetchApi } = useFetchApi();
  const { loanNo } = useAtomValue(caseDetailAtom);
  const [curBankInfo, setCurBankInfo] = useState({
    rpayBankNm: "",
    rpayBankCd: "",
    bankNm: "",
    bankCd: "",
    acctNo: "",
    payAmt: 0,
    gpsInfo: "",
  });
  const [loanNoData, setLoanNoData] = useState<string | null>(null);
  const isIos = sessionStorage.getItem("isIos");

  useEffect(() => {
    const storage = globalThis?.sessionStorage;

    if (storage) {
      const savedLoanNo = storage.getItem("loanNo");
      if (!loanNo && savedLoanNo) {
        setLoanNoData(savedLoanNo); // loanNo가 없을 경우 이전 값을 불러옴
      }
    }
  }, [loanNo]);

  useEffect(() => {
    if (loanNo) {
      saveLoanNo();
    }
  }, [loanNo, loanNoData]);

  const saveLoanNo = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;

    storage.setItem("loanNo", loanNo!); // 현재 loanNo를 저장
  };

  // 여신번호가 있을때만 조회
  const { repayList, refetch, isFetching, masterStatCd, execDt } =
    usePayInfoData({
      loanNo,
    });
  const [statCdList, setStatCdList] = useState<TObj>(
    repayList.map((el) => ({ [el.bankCd]: el.statCd }))
  );

  /** 수령용 계좌 조회 */
  const { data: rpayAcctList } = useQuery<TSearchRpyAcctRes>({
    queryKey: ["search-rpy-acct-by-loan"],
    queryFn: () =>
      fetchApi({
        url: `${
          process.env.NEXT_PUBLIC_AUTH_API_URL
        }/api/biz/acct/searchrpyacctbyloan/${loanNo ? loanNo : loanNoData}`,
        method: "get",
      })
        .then((res) => res.json())
        .then((res) => res.data),
    enabled: !!loanNo, //여신번호가 있을때만 조회
  });

  /** 상환금 요청 */
  const { mutate: payRefundRequest, data } = useMutation({
    mutationKey: ["pay-refund-req"],
    mutationFn: (body: { bankCd: string; gpsInfo: string }) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/payRefundreq`,
        method: "post",
        body: { ...body, loanNo },
      }).then((res) => res.json()),
    onSuccess(data, variables, context) {
      if (data.code !== "00") {
        openPayFailAlert();
      }
      console.log("상환금 요청!@", data, variables);
      refetch();
    },
  });

  /** 상환영수증 등록 */
  // const { mutate: saveRefundReceipt } = useMutation({
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
  //     }),
  //   onSuccess(data, variables, context) {
  //     const bankCd = variables.bankCd;
  //     setStatCdList((prev) => ({ ...prev, [bankCd]: "03" }));
  //     setTimeout(() => {
  //       refetch();
  //     }, 1000);
  //   },
  // });

  const isLocationLoaded = location.loaded;

  const handlePayRefundRequest = () => {
    const gpsInfo =
      location.loaded && location.coordinates
        ? `${location.coordinates.lat},${location.coordinates.lng}`
        : "";
    setStatCdList((prev) => ({
      ...prev,
      [curBankInfo.bankCd]: "01",
      [curBankInfo.gpsInfo]: gpsInfo,
    }));
    curBankInfo.acctNo === ""
      ? payRefundRequest({
          ...curBankInfo,
          bankCd: curBankInfo.bankCd,
          gpsInfo: gpsInfo,
        })
      : payRefundRequest({
          ...curBankInfo,
          bankCd: curBankInfo.rpayBankCd, // 타행 상환 > 당행 입금: 상환계좌 은행 코드로 변경!
          gpsInfo: gpsInfo,
        });
    closeLocationSheet();
  };

  const {
    isOpen: isOpenLocationSheet,
    open: openLocationSheet,
    close: closeLocationSheet,
  } = useDisclosure();
  const {
    isOpen: isOpenAccountAlert,
    open: openAccountSheet,
    close: closeAccountSheet,
  } = useDisclosure();
  const {
    isOpen: isOpenPayFailAlert,
    open: openPayFailAlert,
    close: closePayFailAlert,
  } = useDisclosure();

  const handleOpenLocationSheet = ({
    bankCd,
    bankNm,
    payAmt,
    payCd,
  }: {
    bankCd: string;
    bankNm: string;
    payAmt: number;
    payCd: string;
  }) => {
    console.log("####bankCd", bankCd);
    console.log("####bankNm", bankNm);
    console.log("####payCd", payCd);

    let rpayAcct = rpayAcctList?.bankList.filter(
      (el) => el.bankCd === bankCd
    )[0];

    if (payCd === "03") {
      rpayAcct = rpayAcctList?.woori;
    }

    if (rpayAcct === undefined) {
      //계좌리스트에 해당 상환계좌가 없을 경우 rpayBankNm, rpayBankCd 에 상환계좌 정보 저장
      setCurBankInfo((prev) => ({
        ...prev,
        rpayBankNm: bankNm,
        rpayBankCd: bankCd,
        bankCd: rpayAcctList?.woori?.bankCd ?? "",
        bankNm: rpayAcctList?.woori?.bankNm ?? "우리은행",
        acctNo: rpayAcctList?.woori?.acctNo ?? "",
        payAmt: payAmt,
      }));
      return openAccountSheet();
    }
    setCurBankInfo((prev) => ({
      ...prev,
      rpayBankNm: bankNm,
      rpayBankCd: bankCd,
      bankCd: bankCd,
      bankNm: bankNm,
      acctNo: rpayAcct.acctNo,
      payAmt: payAmt,
    }));
    openLocationSheet();
  };

  const handleClickEnrollReceipt = (
    bankCd: string // @ts-ignore
  ) =>
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "IMAGE",
      data: {
        wkCd: "IMAGE_BIZ",
        attcFilCd: bankCd === "020" ? "2" : "3",
        loanNo: loanNo,
        bankCd: bankCd,
      },
    });

  useEffect(() => {
    if (!!repayList) {
      repayList.map((el: any) => {
        setStatCdList((prev) => ({ ...prev, [el.bankCd]: el.statCd }));
      });
    }
  }, [JSON.stringify(repayList)]);

  useEffect(() => {
    if (
      (value?.mode === "IMAGE" || value?.mode === "IMAGE_VIEW") &&
      value?.data?.code === "00"
    ) {
      // saveRefundReceipt({
      //   loanNo: loanNo,
      //   wkCd: value?.data?.data?.data?.wkCd,
      //   bankCd: value?.data?.data?.data?.bankCd,
      //   attcFilCd: value?.data?.data?.data?.attcFilCd,
      // });
      const bankCd = value?.data?.data?.data?.bankCd;
      setStatCdList((prev) => ({ ...prev, [bankCd]: "03" }));
      setTimeout(() => {
        refetch();
      }, 500);
    }
  }, [value]);

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
    refetch();
  }, []);

  return (
    <div className="pt-6">
      <header className="flex flex-col px-4 gap-y-4">
        <Typography
          type={Typography.TypographyType.H1}
          color="text-kos-gray-800"
        >
          은행별로
          <br />
          상환금을 요청해주세요
        </Typography>
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-700"
        >
          상환금 지급이 완료되면 상환영수증을 등록해주세요.
        </Typography>
      </header>
      {
        <div className="flex justify-end px-4 pt-4">
          {/* {!repayList.every((el) => el.statCd === "10") && (
            <Button.CtaButton
              size="Small"
              state="None"
              onClick={() => refetch()}
            >
              지급 결과 조회
            </Button.CtaButton>
          )} */}
        </div>
      }

      <section className="flex flex-col w-full divide-y">
        {repayList.map((el) => (
          <PayGroupItem
            key={el.bankCd}
            containerClassName="px-4 py-6"
            label={`${el.bankNm} 상환`}
            payAmt={el.payAmt}
          >
            {/* {masterStatCd !== undefined &&
              masterStatCd > "14" &&
              masterStatCd < "51" && (
                <Typography
                  type={Typography.TypographyType.H6}
                  color="text-kos-gray-500"
                  className="ml-2"
                >
                  {el.statNm}
                </Typography>
              )} */}
            <RpyCnclResult
              statCd={statCdList[el.bankCd]}
              loanNo={loanNo}
              masterStatCd={masterStatCd}
              bankCd={el.bankCd}
              execDt={execDt}
              handleOpenLocationSheet={() =>
                handleOpenLocationSheet({
                  bankCd: el.bankCd,
                  bankNm: el.bankNm,
                  payAmt: el.payAmt,
                  payCd: el.payCd,
                })
              }
              handleClickEnrollReceipt={() =>
                handleClickEnrollReceipt(el.bankCd)
              }
              handlePayRefundRequest={() =>
                payRefundRequest({
                  bankCd: el.bankCd,
                  gpsInfo: el.gpsInfo ?? "",
                })
              }
            />
          </PayGroupItem>
        ))}
      </section>
      {/* 개발단계에서만 사용 */}
      {/* <div className="fixed bottom-8 py-1 w-full px-4 flex bg-amber-300 break-all">
        flutter data data data :
        <br />
        {!!value?.data?.data && JSON.stringify(value?.data?.data?.data)}
      </div> */}

      <Alert
        isOpen={isOpenAccountAlert}
        title={`${curBankInfo.rpayBankNm}은 등록된 계좌가 없습니다.`}
        confirmText={"확인"}
        confirmCallBack={() => {
          closeAccountSheet();
          openLocationSheet();
        }}
        bodyText={`당행계좌(우리 ${rpayAcctList?.woori?.acctNo.replace(
          /\d(?=\d{4})/g,
          "*"
        )})로 상환금이 지급됩니다.`}
      />
      <Alert
        isOpen={isOpenPayFailAlert}
        title={"상환금 지급이 실패되었습니다"}
        confirmText={"문의하기"}
        confirmCallBack={() => phoneInquiry()}
        cancelText={"닫기"}
        cancelCallBack={closePayFailAlert}
        bodyText={
          data?.msg ??
          "상환금을 다시 요청하기 위해 고객센터(1877-2945)로 문의해주세요."
        }
      />
      <Sheet
        className="border-none"
        isOpen={isOpenLocationSheet}
        onClose={closeLocationSheet}
        detent={"content-height"}
        snapPoints={[600, 400, 100, 0]}
      >
        {isLocationLoaded && (
          <Sheet.Container
            style={{ boxShadow: "none", borderRadius: "20px 20px 0 0" }}
          >
            <Sheet.Header />
            <Sheet.Content className={`px-4 ${!!isIos ? "pb-5" : ""}`}>
              <Typography
                type={Typography.TypographyType.H3}
                color="text-kos-gray-800"
                className="text-center py-4"
              >
                해당 위치에서 상환금을 요청하신게 맞나요?
              </Typography>
              <Typography
                type={Typography.TypographyType.B1}
                color="text-kos-gray-700"
              >
                사고 방지를 위해
                <br />
                상환지점 근처에서 상환금을 요청해야 합니다.
              </Typography>
              <div className="p-3 w-full mt-4 mb-6 bg-kos-gray-100 rounded-xl flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <Typography
                    type={Typography.TypographyType.B2}
                    color="text-kos-gray-600"
                  >
                    현재위치
                  </Typography>
                  <Typography
                    type={Typography.TypographyType.B3}
                    color="text-kos-gray-800"
                    className="text-right break-keep"
                    // className="text-center"
                  >
                    {location.address}
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography
                    type={Typography.TypographyType.B2}
                    color="text-kos-gray-600"
                  >
                    지급계좌
                  </Typography>
                  <Typography
                    type={Typography.TypographyType.B3}
                    color="text-kos-gray-800"
                    className="text-center"
                  >
                    {curBankInfo?.bankNm.replace("은행", "")}{" "}
                    {curBankInfo?.acctNo?.replace(/\d(?=\d{4})/g, "*")}
                  </Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography
                    type={Typography.TypographyType.B2}
                    color="text-kos-gray-600"
                  >
                    지급금액
                  </Typography>
                  <Typography
                    type={Typography.TypographyType.B3}
                    color="text-kos-gray-800"
                    className="text-center"
                  >
                    <CurrencyFormat
                      decimalSeparator={"false"}
                      value={curBankInfo.payAmt}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    원
                  </Typography>
                </div>
              </div>
              <footer className="flex gap-2 mb-4">
                <Button.CtaButton
                  size="Large"
                  state="None"
                  onClick={closeLocationSheet}
                >
                  다시 요청
                </Button.CtaButton>
                <Button.CtaButton
                  size="Large"
                  state="Default"
                  onClick={handlePayRefundRequest}
                >
                  네, 맞아요
                </Button.CtaButton>
              </footer>
            </Sheet.Content>
          </Sheet.Container>
        )}
        <Sheet.Backdrop
          onTap={closeLocationSheet}
          style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
        />
      </Sheet>
    </div>
  );
}
