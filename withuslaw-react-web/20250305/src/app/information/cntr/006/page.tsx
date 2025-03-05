"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Button, Input, Typography } from "@components";
import { useDisclosure, useFetchApi } from "@hooks";
import { rpyAcctFormAtom, routerAtom, toastState, infoCntrAtom } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

type TParam = {
  bankCd: string;
  bankNm: string;
  acctNo: string;
  acctDsc: string;
};

type TAcctVerfResCvo = {
  bankCd: string;
  acctNo: string;
  acnmNo: string;
  rsltCd: string;
  rsltMsg: string;
};
type TRes = {
  acctVerfResCvos: TAcctVerfResCvo[];
};

export default function IN_CN_006M() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callToast = useSetAtom(toastState);
  const [infoCntr] = useAtom(infoCntrAtom);
  const { fetchApi } = useFetchApi();
  // const rpyAcctForm = useAtomValue(rpyAcctFormAtom);
  const pageRouter = useAtomValue(routerAtom);
  const { isOpen, open } = useDisclosure();
  const bizNo = searchParams.get("bizNo");
  const [isInitData, setIsInitData] = useState("");
  const [isWooriAcctExist, setIsWooriAcctExist] = useState(false);
  const [rpyAcctForm, setRpyAcctForm] = useAtom(rpyAcctFormAtom);

  const { mutate: verifyAcctNo } = useMutation({
    mutationKey: ["acct-verify"],
    mutationFn: (body: IAcctVerfRegCvos[]): Promise<TData<TRes>> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/searchacctlstverf`,
        method: "post",
        body: { acnmNo: bizNo, acctVerfReqCvos: body },
      }).then((res) => res.json()),
    onSuccess(data, variables, context) {
      console.log(data);
      const availableAcctNoList = data.data.acctVerfResCvos.filter(
        (el) => el.rsltCd === "02"
      );

      const isNewAcctList = data.data.acctVerfResCvos.filter(
        (li) => li.rsltMsg === "사용가능한 계좌입니다."
      );

      console.log(isNewAcctList);
    },
  });

  useEffect(() => {
    // rpyAccForm에 woori 정보가 있고, infoCntr에도 "020" 코드가 있으면 우리은행정보 보여주기 -> 상환금계좌 당행 맨 처음 저장할때 해당
    const hasBankCd020 = infoCntr.some((item) => item.bankCd === "020");
    if (rpyAcctForm.woori && hasBankCd020) {
      setIsWooriAcctExist(true);
    }
  }, [rpyAcctForm, infoCntr]);

  const { mutate: initSaveAcctList } = useMutation({
    mutationKey: ["init-save-acctlst"],
    mutationFn: (acctSaveReqCvos: TParam[]): Promise<TData<any>> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/saveacctlst`,
        method: "post",
        body: { acctSaveReqCvos: acctSaveReqCvos },
      }).then((res) => res.json()),
    onSuccess(data) {
      console.log("initSaveAcclst", data);
      if (data.code === "00") {
        open();
      }
      if (data.code === "99") {
        callToast({
          msg: data.msg,
          status: "error",
        });
      }
    },
  });

  const { mutate: modifyAcctList } = useMutation({
    mutationKey: ["modify-acctlst"],
    mutationFn: (body: TModifyAcctNo[]): Promise<TData<any>> =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/acct/modifyacctlst`,
        method: "post",
        body: body,
      }).then((res) => res.json()),
    onSuccess(data) {
      if (data.code === "00") {
        open();
        // router.push("/information/cntr/001");
      }
      if (data.code === "99") {
        callToast({
          msg: data.msg,
          status: "error",
        });
      }
    },
  });

  const handleClick = () => {
    const formattedData = [
      {
        bankCd: "020",
        acctNo: rpyAcctForm.woori,
        bankNm: "우리은행",
        acctDsc: "01",
      },
      ...rpyAcctForm.bankList
        .filter((el) => el.bankCd !== "") // 빈 값인 객체를 필터링
        .map((el) => ({ ...el, acctDsc: "01" })),
    ];

    if (isInitData !== "false") {
      initSaveAcctList(formattedData);
      return;
    }
    modifyAcctList(formattedData);
  };

  return (
    <div className="flex flex-col grow h-full w-full">
      <section className="relative grow">
        <section className="px-4 mt-6 pb-3">
          <Typography
            color={"text-kos-gray-800"}
            type={Typography.TypographyType.H2}
          >
            등록할 계좌정보를 확인해주세요.
          </Typography>
        </section>
        <div className="flex flex-col gap-y-6">
          {isWooriAcctExist ? (
            <Input.InputContainer className="px-4">
              <Input.Label htmlFor="test" required={false}>
                우리은행 상환 계좌정보
              </Input.Label>
              <Input.InputGroup>
                <Input.TextInput disabled={true} value={"우리은행"} />
                <Input.TextInput disabled={true} value={rpyAcctForm.woori} />
              </Input.InputGroup>
            </Input.InputContainer>
          ) : (
            ""
          )}
          {infoCntr.length > 0 &&
            infoCntr
              .filter((bank) => bank.bankCd !== "020")
              .map(
                (
                  bank: { bankCd: string; acctNo: string; bankNm: string },
                  idx
                ) =>
                  bank.bankCd === "" ? (
                    ""
                  ) : (
                    <Input.InputContainer className="px-4" key={idx}>
                      <Input.Label htmlFor="test" required={false}>
                        타행 상환 계좌정보
                      </Input.Label>
                      <Input.InputGroup>
                        <Input.TextInput disabled={true} value={bank.bankNm} />
                        <Input.TextInput disabled={true} value={bank.acctNo} />
                      </Input.InputGroup>
                    </Input.InputContainer>
                  )
              )}
        </div>
        {/*<div className="flex flex-col gap-y-6">*/}
        {/*  <Input.InputContainer className="px-4">*/}
        {/*    <Input.Label htmlFor="test" required={false}>*/}
        {/*      우리은행 상환 계좌정보*/}
        {/*    </Input.Label>*/}
        {/*    <Input.InputGroup>*/}
        {/*      <Input.TextInput disabled={true} value={"우리은행"} />*/}
        {/*      <Input.TextInput disabled={true} value={rpyAcctForm.woori} />*/}
        {/*    </Input.InputGroup>*/}
        {/*  </Input.InputContainer>*/}
        {/*  {rpyAcctForm.bankList.length > 0 &&*/}
        {/*    rpyAcctForm.bankList.map((bank, idx) =>*/}
        {/*      bank.bankCd === "" ? (*/}
        {/*        ""*/}
        {/*      ) : (*/}
        {/*        <Input.InputContainer className="px-4" key={idx}>*/}
        {/*          <Input.Label htmlFor="test" required={false}>*/}
        {/*            타행 상환 계좌정보*/}
        {/*          </Input.Label>*/}
        {/*          <Input.InputGroup>*/}
        {/*            <Input.TextInput disabled={true} value={bank.bankNm} />*/}
        {/*            <Input.TextInput disabled={true} value={bank.acctNo} />*/}
        {/*          </Input.InputGroup>*/}
        {/*        </Input.InputContainer>*/}
        {/*      )*/}
        {/*    )}*/}
        {/*</div>*/}
        <Alert
          isOpen={isOpen}
          title={"계좌 등록 완료되었습니다"}
          confirmText={"확인"}
          confirmCallBack={() =>
            router.push(
              pageRouter.prevPage?.includes("my-case")
                ? pageRouter.prevPage
                : "/information/cntr/001"
            )
          }
          bodyText={
            "은행 전산등록으로 인해\n등록 당일은 해당계좌 업무진행이 불가합니다."
          }
        />
      </section>
      <footer
        className="relative p-4"
        style={{ boxShadow: "0px -4px 20px 0px rgba(204, 204, 204, 0.30)" }}
      >
        <Button.CtaButton
          buttonType={"submit"}
          size={"XLarge"}
          state={"On"}
          onClick={handleClick}
        >
          등록
        </Button.CtaButton>
      </footer>
    </div>
  );
}
