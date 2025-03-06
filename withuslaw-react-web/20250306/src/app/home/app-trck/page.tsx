"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CertificationIcon } from "@icons";
import { Button, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";

export default function AppTrckPage() {
  const router = useRouter();

  return (
    <section>
      <div className="px-[34px] py-9 h-[calc(100vh-148px)]">
        <Typography color="text-kos-gray-800" type={TypographyType.H2}>
          더 나은 서비스 제공을 위해 <br />
          권한을 허용해주세요
        </Typography>
        <Typography
          color="text-kos-gray-700"
          type={TypographyType.B1}
          className="mt-4"
        >
          코스의 맞춤 콘텐츠 및 광고를 제공합니다.
        </Typography>
        <Image
          src={CertificationIcon}
          alt="certification img"
          className="mt-[118px]"
          width={315}
          height={184}
        />
      </div>
      {/* TODO:: 확인 누를 시 OS에서 제공하는 알림 허용 창 떠야함 */}
      <div className="relative p-4">
        <Button.CtaButton
          size={"XLarge"}
          state="On"
          onClick={() => router.push("/")}
        >
          확인
        </Button.CtaButton>
      </div>
    </section>
  );
}
