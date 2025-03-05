"use client";

import React from "react";
import Image from "next/image";
import { MarkIcon } from "@icons";
import { Typography } from "@components";
import { CtaButton } from "@components/button";

export default function TermsPage() {
  return (
    <>
      <section className="p-4">
        <Image
          className="mx-auto"
          src={MarkIcon}
          alt="알림 아이콘"
          width={80}
          height={80}
        />
        <Typography
          className="py-6 text-center"
          color="text-kos-black"
          type={Typography.TypographyType.H1}
        >
          계정을 삭제하기 전에
          <br />
          아래 정보를 확인해 주세요
        </Typography>
        <ul className="flex flex-col gap-4 p-5 rounded-2xl bg-kos-gray-100">
          <li className="relative pl-5 before:content-[''] before:absolute before:top-2 before:left-2 before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-kos-gray-700">
            <Typography
              className="text-kos-gray-700"
              color="text-kos-black"
              type={Typography.TypographyType.B4}
            >
              대표 법무사 본인은 소속직원에게 대표 법무사 권한을 위임할 수
              있으며, 이는 코스 관리자(1877-2945)를 통해 진행해주세요.
            </Typography>
          </li>
          <li className="relative pl-5 before:content-[''] before:absolute before:top-2 before:left-2 before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-kos-gray-700">
            <Typography
              className="text-kos-gray-700"
              color="text-kos-black"
              type={Typography.TypographyType.B4}
            >
              삭제 후 회원정보 및 서비스 이용기록은 모두 삭제되며, 복구가
              불가합니다.
            </Typography>
          </li>
          <li className="relative pl-5 before:content-[''] before:absolute before:top-2 before:left-2 before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-kos-gray-700">
            <Typography
              className="text-kos-gray-700"
              color="text-kos-black"
              type={Typography.TypographyType.B4}
            >
              대표 법무사가 계정 삭제 시 소속직원은 모두 일괄 계정 삭제
              처리됩니다.
            </Typography>
          </li>
        </ul>

        <div className="fixed bottom-0 left-0 right-0 p-4 pb-9">
          <CtaButton
            size="XLarge"
            state="On"
            onClick={() => {
              alert("해당 서비스는 준비 중입니다.");
            }}
          >
            계정 삭제하기
          </CtaButton>
        </div>
      </section>
    </>
  );
}
