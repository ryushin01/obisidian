"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Typography, Profile } from "@components";
import { CtaButton } from "@components/button";
import { useFetchApi, useFlutterBridgeFunc } from "@hooks";
import { useAddInfoData } from "@libs";
import { authAtom, toastState } from "@stores";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

export type TBank = {
  bankCd: string;
  acctNo: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { fetchApi } = useFetchApi();
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  const callToast = useSetAtom(toastState);
  const authInfo = useAtomValue(authAtom);

  // 추가정보 등록 여부 가져오기
  const [checkAddInfo, getCheckAddInfo] = useAddInfoData();

  const handleClickEnrollProfile: any = () =>
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "IMAGE",
      data: {
        wkCd: "IMAGE_CUST",
        attcFilCd: "03",
      },
    });

  // 프로필 이미지 사진 등록
  const { mutate: saveProfileImg } = useMutation({
    mutationKey: [""],
    mutationFn: (imgSeq) =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/modifyimgseq/${imgSeq}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("프로필 사진 등록 완료", res);

      if (res.code === "00") {
        if (authInfo.isRept) {
          router.push("/acceptance/match/add-info/rept/commision");
        } else {
          callToast({
            msg: "추가정보 등록이 완료되었습니다.",
            status: "success",
          });
          setTimeout(() => {
            mutate();
          }, 1000);
        }
      } else {
        onFailed();
      }
    },
    onError: (error) => {
      console.log("실패", error);
      onFailed();
    },
  });
  const { data, mutate } = useMutation({
    mutationKey: ["auth-searchtrregpssbyn"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/auth/searchtrregpssbyn`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("추가정보 등록 여부 조회", res);
      if (res.code === "00") {
        if (res.data?.trregElement?.isrnEntrAprvGbCd === "03") {
          router.push("/acceptance/match/case-accept");
        } else {
          router.push("/acceptance/match/add-info/rept/notice");
        }
      } else {
        router.push("/acceptance/match/add-info/rept/notice");
      }
    },
    onError: (error) => {
      console.log("API Error", error);
    },
  });

  // const move = () => {
  //   mutate
  //   //대표법무사 추가정보 승인 완료시 사건수임으로 이동
  //   //대표법무사 추가정보 승인 미완료시 안내화면으로 이동
  //   // setTimeout(() => {
  //   //   if(checkAddInfo?.data?.trregElement?.isrnEntrAprvGbCd === "03")
  //   //     router.push("/acceptance/match/case-accept");
  //   //   else
  //   //     router.push("/acceptance/match/add-info/rept/notice");
  //   // }, 1000);
  // }

  const onFailed = () => {
    callToast({
      msg: "등록에 실패하였습니다.\n 다시 시도해주세요.",
      status: "error",
    });
  };

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
  }, []);

  return (
    <section className="flex justify-center h-[calc(100vh-100px)]">
      <div className="flex flex-col items-center justify-center">
        <div onClick={handleClickEnrollProfile} className="p-3">
          <Profile
            imgSeq={value?.data?.data?.seqList[0]?.seq ?? ""}
            isProfile={!!value?.data?.data?.seqList[0]?.seq ? "Full" : "Empty"}
          />
        </div>
        <Typography
          type={Typography.TypographyType.H1}
          color="text-kos-gray-800"
          className="p-3 text-center"
        >
          프로필 사진을 등록해주세요
        </Typography>
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-600"
          className="p-3 text-center"
        >
          서비스 안정성을 위해 등기업무 진행 전에 <br />
          매수인에게 알림톡으로 발송됩니다.
        </Typography>
      </div>
      <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
        <CtaButton
          size="XLarge"
          state="On"
          disabled={!!value?.data?.data?.seqList[0]?.seq ? false : true}
          onClick={() => {
            // 프로필 이미지 채워졌을 경우
            if (value?.mode === "IMAGE" && value?.data?.code === "00") {
              saveProfileImg(value?.data?.data?.seqList[0]?.seq);
            }
          }}
        >
          {authInfo.isRept ? "다음" : "등록하기"}
        </CtaButton>
      </div>
    </section>
  );
}
