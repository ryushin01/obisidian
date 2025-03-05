"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CertificationImg } from "@icons";
import { Button, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";

export default function CommInfoPage() {
  const router = useRouter();

  return (
    <section>
      <div className="px-[34px] py-9 h-[calc(100vh-148px)]">
        <Typography color="text-kos-gray-800" type={TypographyType.H2}>
          중요한 업무 알림을 받기 위해 <br />
          권한을 허용해주세요
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={TypographyType.B1}
          className="mt-4"
        >
          동의 없이 광고 알림은 보내지 않습니다.
        </Typography>
        <Image
          src={CertificationImg}
          alt="certification img"
          className="mt-[63px]"
          width={307}
          height={273}
        />
      </div>
      {/* TODO:: 확인 누를 시 OS에서 제공하는 알림 허용 창 떠야함 */}
      <div className="relative p-4">
        <Button.CtaButton
          size={"XLarge"}
          state="On"
          onClick={() => router.push("/home/app-trck")}
        >
          확인
        </Button.CtaButton>
      </div>
    </section>
  );
}
