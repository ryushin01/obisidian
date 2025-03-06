"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NoticeIcon } from "@icons";
import { Typography } from "@components";
import { CtaButton } from "@components/button";

export default function NoticePage() {
  const router = useRouter();
  return (
    <section className="flex justify-center h-[calc(100vh-100px)]">
      <div className="flex flex-col items-center justify-center">
        <Image src={NoticeIcon} alt="notice icon" width={80} height={80} />
        <Typography
          type={Typography.TypographyType.H1}
          color="text-kos-gray-800"
          className="p-3 text-center leading-8"
        >
          대표법무사의 추가정보가 <br />
          필요합니다.
        </Typography>
        <Typography
          type={Typography.TypographyType.B1}
          color="text-kos-gray-600"
          className="p-3 text-center"
        >
          대표법무사 추가정보 등록이 완료되어야 <br />
          사건수임이 가능합니다.
        </Typography>
      </div>
      <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
        <CtaButton
          size="XLarge"
          state="On"
          onClick={() => {
            router.push("/");
            //@ts-ignore
            window.flutter_inappwebview.callHandler("flutterFunc", {
              mode: "GO_HOME",
              data: {
                type: "0",
                url: "",
              },
            });
          }}
        >
          확인
        </CtaButton>
      </div>
    </section>
  );
}
