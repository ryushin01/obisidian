"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CameraTransparent, CloseIcon } from "@icons";
import { Typography } from "@components";
import { CtaButton } from "@components/button";
import { useFlutterBridgeFunc, useFetchApi } from "@hooks";
import { useMutation } from "@tanstack/react-query";
import { toastState } from "@stores";
import { useSetAtom } from "jotai";

export type TBank = {
  bankCd: string;
  acctNo: string;
};

export default function IsrnPage() {
  const router = useRouter();
  const { value, nextjsFunc } = useFlutterBridgeFunc();
  const callToast = useSetAtom(toastState);
  const [profileAdd, setProfileAdd] = useState(false);
  const { fetchApi } = useFetchApi();

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
        router.refresh();
      }
    },
    onError: (error) => {
      console.log("사진 삭제 실패", error);
    },
  });

  const { mutate: reqAdmin } = useMutation({
    mutationKey: ["request-admin"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/biz/office/saveisrnentradminereq`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("관리자 승인 요청", res.data);
      if (res.code === "00") {
        callToast({
          msg: "추가정보 등록이 완료되었습니다. \n 관리자 승인 후 사건수임이 가능합니다.",
          status: "success",
          afterFunc: setTimeout(
            () =>
              //@ts-ignore
              window.flutter_inappwebview.callHandler("flutterFunc", {
                // @ts-ignore
                mode: "GO_HOME",
              }),
            3000
          ),
        });
      }
    },
    onError: (error) => {
      console.log("관리자 승인 요청 실패", error);
      callToast({
        msg: "등록에 실패하였습니다. \n 다시 시도해주세요.",
        status: "error",
      });
      return;
    },
  });

  /** 플러터 이미지 호출 */
  const handleClickEnrollReceipt: any = () =>
    //@ts-ignore
    window.flutter_inappwebview.callHandler(
      "flutterFunc",
      {
        // @ts-ignore
        mode: "IMAGE",
        data: {
          wkCd: "IMAGE_CUST",
          attcFilCd: "07",
        },
      }

      // setProfileAdd(true)
    );

  useEffect(() => {
    window.nextjsFunc = nextjsFunc;
  }, []);

  return (
    <section className="py-6 px-4">
      <Typography
        color={"text-kos-gray-800"}
        type={Typography.TypographyType.H2}
      >
        보험가입증명서를 등록해주세요
      </Typography>

      <Typography
        color={"text-kos-gray-600"}
        type={Typography.TypographyType.B1}
        className="mt-3 mb-6"
      >
        가입기간을 확인해주세요. <br />
        보험가입증명서는 관리자 승인이 필요합니다.
      </Typography>
      <div>
        <div>
          <div className="relative w-[76px] h-[76px] rounded-lg">
            {value?.data?.data?.seqList[0]?.seq ? (
              <>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/api/img/searchview?imgSeq=${value?.data?.data?.seqList[0]?.seq}`}
                  alt="사진 아이콘"
                  unoptimized={true}
                  width={80}
                  height={80}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Image
                  src={CloseIcon}
                  alt="delete icon"
                  width={30}
                  height={30}
                  className="absolute top-0 right-[-5px]"
                  onClick={() => {
                    // 이미지 삭제 api 호출
                    deleteImage();
                  }}
                />
              </>
            ) : (
              <div onClick={handleClickEnrollReceipt}>
                <Image src={CameraTransparent} alt="profile" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
        <CtaButton
          size="XLarge"
          state="On"
          disabled={!!value?.data?.data?.seqList[0]?.seq ? false : true}
          onClick={() => {
            // 보험가입증명서 이미지 채워졌을 경우 관리자 승인 요청 api 호출 후 페이지 이동
            if (value?.mode === "IMAGE" && value?.data?.code === "00") {
              reqAdmin();
            }
          }}
        >
          등록하기
        </CtaButton>
      </div>
    </section>
  );
}
